class CreateUserLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :user_logs do |t|
      t.integer :weight
      t.integer :reps
      t.belongs_to :work_out, foreign_key: true
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
