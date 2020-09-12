class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    @employee = @user.employee

    if @employee.present?
      @company = @employee.company
      return redirect_to lobby_path(company_slug: @company.slug)
    else
      render layout: 'home'
    end
  end

  def lobby
    @company = Company.find_by(slug: params[:company_slug])
    authorize(@company, :show?)
    @user = current_user
    render layout: 'home'
  end


end
