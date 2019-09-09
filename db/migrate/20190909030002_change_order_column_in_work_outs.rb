class ChangeOrderColumnInWorkOuts < ActiveRecord::Migration[5.2]
  def change
    rename_column :work_outs, :order, :exercise_order
  end
end
