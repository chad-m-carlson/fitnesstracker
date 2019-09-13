class CreateExerciseCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :exercise_categories do |t|
      t.string :category_name

      t.timestamps
    end
    add_reference :exercises, :exercise_category, index: true
    add_column :work_outs, :has_superset, :boolean
  end
end
