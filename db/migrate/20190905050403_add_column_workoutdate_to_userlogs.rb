class AddColumnWorkoutdateToUserlogs < ActiveRecord::Migration[5.2]
  def change
    add_column :user_logs, :work_out_date, :integer
  end
end
