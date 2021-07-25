class Api::WorkOutsController < ApplicationController
  before_action :set_workout, only: [:update, :destroy]

  def index
  end

  def show
    render json: WorkOut.find_work_out(params[:id])
  end

  def create
    workout = WorkOut.new(workout_params)
    if workout.save
      render json: workout
    else
      render json: workout.errors, status:422
    end
  end

  def update
    if @workout.update(workout_params)
      render json: @workout
    else
      render json: @workout.errors, status:422
    end
  end

  def destroy
    @workout.delete
  end

  def copy_work_out
    WorkOut.copy_work_out(params[:date], params[:copy_date])
  end

  private

  def set_workout
    @workout = WorkOut.find(params[:id])
  end

  def workout_params
    params.require(:work_out).permit(:date, :exercise_id, :rep_pace, :rep_amount, :notes, :exercise_order, :has_superset)
  end

end
