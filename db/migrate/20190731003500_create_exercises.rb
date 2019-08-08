class CreateExercises < ActiveRecord::Migration[5.2]
  def change
    create_table :exercises do |t|
      t.string :name
      t.boolean :core
      t.boolean :legs
      t.boolean :chest
      t.boolean :back
      t.boolean :arms
      t.boolean :shoulders
      t.boolean :cardio
      t.boolean :superset
      t.boolean :is_active
      t.text :description
      t.string :video_url

      t.timestamps
    end
  end
end
