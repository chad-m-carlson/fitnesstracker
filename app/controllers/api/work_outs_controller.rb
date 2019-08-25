class Api::WorkOutsController < ApplicationController
  before_action :set_workout, only: [:edit, :destroy]
  
  def index
  end

  def show
    render json: WorkOut.find_work_out(params[:id])
  end

  def create
    render json: WorkOut.create_work_out(params[:_json])
  end

  def edit
  end

  def destroy
    @workout.delete
  end

  private

  def set_workout
    @workout = WorkOut.find(params[:id])
  end

end
