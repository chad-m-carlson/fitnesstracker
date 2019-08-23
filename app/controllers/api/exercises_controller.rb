class Api::ExercisesController < ApplicationController
  before_action :set_exercise, only:[:update]

  def index
    render json: Exercise.all
  end

  def show
    # show by workout id
    workout = WorkOut.where(date: params[:work_out_id])
    render json: workout.where(exercise_id: params[:id])
  end
  
  def exercises_by_category
    render json: Exercise.exercise_by_category(params[:id])
  end

  def new
  end

  def create
    exercise = Exercise.create(exercise_params)
    if exercise.save
      render json: exercise
    else
      render errors: exercise.errors, status: 204
    end
  end

  def update
    if @exercise.update(exercise_params)
      render json: @exercise
    else
      render json: @exercise.errors, status: 422
    end
  end

  private
    def exercise_params
      params.require(:exercise).permit(:name, :description, :core, :legs, :chest, :back, :arms, :shoulders, :cardio, :superset, :is_active, :video_url)
    end

    def set_exercise
      @exercise = Exercise.find(params[:id])
    end
end