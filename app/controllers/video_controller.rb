class VideoController < ApplicationController
  before_action :authenticate_user!
  layout 'home'

  def join_room
    @user = current_user
    @employee = @user.employee
    @company = @employee&.company

    @room_name = params[:identifier]
    if @room_name == 'new'
      return redirect_to room_path(identifier: "#{@company&.slug}-$-#{@employee.slug}")
    end

    company_slug = @room_name.split('-$-').first
    company = Company.find_by(slug: company_slug)

    if company
      authorize(company, :show?)
    else
      return redirect_to home_path(error_message: "Uh oh! That seems like an invalid room.")
    end

    capacity = params[:capacity] || 2
    client = TwilioService.client(@room_name)
    @room = client.video.rooms.list(unique_name: @room_name).try(:first)

    participant_identity = "#{@user.first_name}-$-#{@employee.slug}"
    connected_participants = @room&.participants&.list({status: 'connected'}) || []
    already_connected = connected_participants.map(&:identity).include?(participant_identity)

    if @room.present? && !already_connected && connected_participants.count >= capacity
      return redirect_to home_path(error_message: "Uh oh! That room is full.")
    end

    # create a room if it doesn't exist
    @room = TwilioService.p2p_room(client, @room_name) if @room.blank?

    @token = TwilioService.jwt_access_token(participant_identity, @room_name)

    render template: 'video/room'
  end
end