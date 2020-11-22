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
        @company ||= Company.create!(name: playspace_name, website: params[:website])
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
      end
    end

    render json: {
        success: true
    }
  end
end