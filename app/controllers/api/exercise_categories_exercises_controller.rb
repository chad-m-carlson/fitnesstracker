class Api::ExerciseCategoriesExercisesController < ApplicationController
  before_action :set_exercise, only: [:show]

  def show
    render json: @exercise.exercise_category
  end

  private

    def set_exercise
      @exercise = Exercise.find(params[:id])
    end
end
