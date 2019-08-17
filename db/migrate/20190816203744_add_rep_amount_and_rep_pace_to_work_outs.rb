class AddRepAmountAndRepPaceToWorkOuts < ActiveRecord::Migration[5.2]
  def change
    add_column :work_outs, :rep_pace, :string
    add_column :work_outs, :rep_amount, :string
  end
end
