class AddColumnDefaultsToExercises < ActiveRecord::Migration[5.2]
  def change
    change_column_default :exercises, :core, false
    change_column_default :exercises, :legs, false
    change_column_default :exercises, :chest, false
    change_column_default :exercises, :back, false
    change_column_default :exercises, :arms, false
    change_column_default :exercises, :shoulders, false
    change_column_default :exercises, :cardio, false
    change_column_default :exercises, :superset, false
    change_column_default :exercises, :is_active, true
  end
end
