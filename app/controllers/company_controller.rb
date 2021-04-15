class CompanyController < ApplicationController
  before_action :authenticate_user!
  layout 'home'

  def join_company
    @user = current_user
    playspace_name = params[:playspace_name]
    company_id = params[:company_id]

    ActiveRecord::Base.transaction do
      @company = Company.find(company_id) if company_id.present?
      if playspace_name.present?
        invite_code = SecureRandom.urlsafe_base64(8)
        while Company.find_by(invite_code: invite_code).present?
          invite_code = SecureRandom.urlsafe_base64(8)
        end
        @company ||= Company.create!(name: playspace_name, website: params[:website], invite_code: invite_code)

        email_domain = @user.email.split('@').last

        CompanyEmailDomain.where(
            company: @company,
            domain:email_domain).first_or_create unless EmailProvidersService.free_email_provider(email_domain)

        Slack.new_playspace({
                                name: playspace_name,
                                email: @user.email
                            })
      end

      if @company
        @employee = Employee.create(
            user: @user,
            company: @company,
            title: 'Team Member'
        )
        invitees = params[:invitees]
        invitees&.each do |invitee|
          JallySessionService.create_account_and_send_invite(invitee, @company, @user)
        end
      end
    end

    render json: {
        success: true
    }
  end

  def accept_invitation
    @user = current_user
    return redirect_to home_path(error_message: "Uh oh! You can only join one Playspace with your Jally account") if @user.company.present?

    invite_code = params[:invite_code]
    company = Company.find_by(invite_code: invite_code) if invite_code.present?

    return redirect_to home_path(error_message: "Uh oh! That's an invalid invite code") if company.nil?

    @employee = Employee.create(
        user: @user,
        company: company,
        title: 'Team Member'
    )

    redirect_to home_path
  end
end