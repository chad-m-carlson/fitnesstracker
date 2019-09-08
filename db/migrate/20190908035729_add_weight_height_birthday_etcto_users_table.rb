class AddWeightHeightBirthdayEtctoUsersTable < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :weight, :integer
    add_column :users, :height_feet, :integer
    add_column :users, :height_inches, :integer
    add_column :users, :birthdate, :string
    add_column :users, :is_male, :boolean
    add_column :users, :is_female, :boolean
    add_column :users, :last_name, :string
    rename_column :users, :name, :first_name

  end
end
