class AddNotesColumnToUsersLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :user_logs, :notes, :string
  end
end
