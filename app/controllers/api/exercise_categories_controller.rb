class Api::ExerciseCategoriesController < ApplicationController
  
  def index
    render json: ExerciseCategory.all
  end

  def show
    exercises = ExerciseCategory.find(params[:id]).exercises.as_json
    exercises.each do |e|
      e["exercise_category"] = params[:id].to_i
    end
    render json: exercises
  end

end
