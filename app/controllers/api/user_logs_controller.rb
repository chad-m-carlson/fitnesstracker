class Api::UserLogsController < ApplicationController
  before_action :set_user_log, only: [:update]

  def show
    render json: UserLog.where(work_out_date: params[:id], work_out_id: params[:work_out_id], user_id: current_user.id).order(:id)
  end

  def update
    if @user_log.update(user_log_params)
      render json: @user_log
    else
      render json: @user_log.errors, status:422
    end
  end

  def create
    @user_log = UserLog.new(user_log_params)
    @user_log.user_id = current_user.id
    if @user_log.save
      render json: @user_log
    else
      render json: @user_log.errors
    end
  end

  def user_logs_history
    render json: UserLog.find_user_logs_history(params[:id], params[:rep_pace], params[:rep_amount], params[:date], user_id: current_user.id)
  end

  def user_logs_max
    render json: UserLog.user_logs_max(params[:id], user_id: current_user.id)
  end

  private

    def user_log_params
      params.require(:user_log).permit(:weight, :reps, :user_id, :work_out_id, :work_out_date, :notes)
    end

    def set_user_log
      @user_log = UserLog.find(params[:id])
    end

end
