class CreateWorkOuts < ActiveRecord::Migration[5.2]
  def change
    create_table :work_outs do |t|
      t.string :date
      t.integer :workout_id
      t.belongs_to :exercise, foreign_key: true
      # t.belongs_to :rep, foreign_key: true

      t.timestamps
    end
  end
end
