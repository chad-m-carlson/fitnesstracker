class ExercisesController < ApplicationController
  before_action :set_exercise, only:[:update]

  def index
    render json: Exercise.all
  end

  def show
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
