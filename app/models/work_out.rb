class WorkOut < ApplicationRecord
  has_and_belongs_to_many :exercises

  def self.find_work_out
    WorkOut.find_by_sql(["
      SELECT e.name, wo.rep_pace, wo.rep_amount, e.id
      FROM work_outs AS wo
      LEFT JOIN exercises AS e
      ON e.id = wo.exercise_id
      WHERE wo.workout_id = 100
    "])
  end

end
