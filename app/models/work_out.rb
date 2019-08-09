class WorkOut < ApplicationRecord
  has_and_belongs_to_many :exercises
  has_and_belongs_to_many :reps

  def self.find_work_out
    WorkOut.find_by_sql(["
      SELECT e.name, r.amount, r.pace, e.id
      FROM work_outs AS wo
      LEFT JOIN exercises AS e
      ON e.id = wo.exercise_id
      LEFT JOIN reps AS r
      ON wo.rep_id = r.id
      WHERE wo.workout_id = 100
    "])
  end

end
