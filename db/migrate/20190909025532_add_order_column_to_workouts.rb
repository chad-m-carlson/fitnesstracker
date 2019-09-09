class AddOrderColumnToWorkouts < ActiveRecord::Migration[5.2]
  def change
    add_column :work_outs, :order, :integer

  end
end
