class ChangeWorkOutdateColumnTypeInUserLogsTable < ActiveRecord::Migration[5.2]
  def change
    change_column :user_logs, :work_out_date, :string
  end
end
