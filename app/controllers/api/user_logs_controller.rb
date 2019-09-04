class Api::UserLogsController < ApplicationController

  def create
    @user_log = UserLog.new(user_log_params)
    @user_log.user_id = current_user.id
    binding.pry
    if @user_log.save
      render json: @user_log
    else
      render json: @user_log.errors
  end
end

  private

    def user_log_params
      params.require(:user_log).permit(:weight, :reps, :user_id, :work_out_id, :@user)
    end
end
