class RemoveExerciseCategoryIdfromExercise < ActiveRecord::Migration[5.2]
  def change
    remove_reference :exercises, :exercise_category, index: true
  end
end
