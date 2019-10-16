class Api::ExercisesController < ApplicationController
  before_action :set_exercise, only:[:update]

  def index
    render json: Exercise.all.order(:name)
  end

  def show
    # show by workout id
    workout = WorkOut.where(date: params[:work_out_id])
    render json: workout.where(exercise_id: params[:id])
  end
  
  # def exercises_by_category
  #   render json: Exercise.exercise_by_category(params[:id]).order(:name)
  # end

  def new
  end

  def create
    exercise = Exercise.new(exercise_params)
    Exercise.add_categories_to_exercise(params[:selectedExerciseCategories], exercise)
    if exercise.save
      render json: exercise
    else
      render json: exercise.errors, status: 422, message: exercise.errors.messages
    end
  end

  def update
    Exercise.edit_exercise_categories(params)
    if @exercise.update(exercise_params)
      render json: @exercise
    else
      render json: @exercise.errors, status: 422
    end
  end

  def exercise_search
    exercises = Exercise.exercise_search(params[:keyword])
    render json: exercises
  end

  private
    def exercise_params
      params.require(:exercise).permit(:id, 
                                       :name, 
                                       :description, 
                                      #  :core, 
                                      #  :legs, 
                                      #  :chest, 
                                      #  :back, 
                                      #  :arms, 
                                      #  :shoulders, 
                                      #  :cardio, 
                                      #  :superset, 
                                       :is_active, 
                                       :video_url)
    end

    def set_exercise
      @exercise = Exercise.find(params[:id])
    end
end
