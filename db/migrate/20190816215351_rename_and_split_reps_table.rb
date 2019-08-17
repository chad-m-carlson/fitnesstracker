class RenameAndSplitRepsTable < ActiveRecord::Migration[5.2]
  def change
    # remove_column :reps, :pace, :string
    # rename_table :reps, :rep_amounts
    create_table :rep_paces do |t|
      t.string :pace
      
      t.timestamps
    end
    
    create_table :rep_amounts do |t|
      t.string :amount
      
      t.timestamps
    end
  end
end
