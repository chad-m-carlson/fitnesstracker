class CreateJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_join_table :exercises, :exercise_categories do |t|
      # t.index [:exercise_id, :exercise_category_id]
      # t.index [:exercise_category_id, :exercise_id]
    end
  end
end
