class AddColumnToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :sign_in_count, :integer, :null => false, :default => 0
  end
end
