class ExercisesController < ApplicationController
  def index
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

  def edit
  end

  private
    def exercise_params
      params.require(:exercise).permit(:name, :description, :core, :legs, :chest, :back, :arms, :shoulders, :cardio, :superset, :is_active, :video_url)
    end
end
