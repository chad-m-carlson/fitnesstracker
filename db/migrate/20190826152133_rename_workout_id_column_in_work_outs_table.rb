class RenameWorkoutIdColumnInWorkOutsTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :work_outs, :workout_id, :notes
    change_column :work_outs, :notes, :string
  end
end
