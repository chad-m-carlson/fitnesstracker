class WorkOut < ApplicationRecord
  has_and_belongs_to_many :exercises

  def self.find_work_out
    WorkOut.find_by_sql(["
      SELECT e.name, wo.rep_pace, wo.rep_amount, e.id
      FROM work_outs AS wo
      LEFT JOIN exercises AS e
      ON e.id = wo.exercise_id
      WHERE wo.date = '8/17/2019'
    "])
  end

  def self.create_work_out(workout)
    workout.each do |w|
      WorkOut.find_by_sql(["
      INSERT INTO work_outs (date, exercise_id, rep_pace, rep_amount, created_at, updated_at)
      VALUES (:date, :exercise_id, :rep_pace, :rep_amount, :created_at, :updated_at)",
        {date: w[:date],
        exercise_id: w[:exerciseId],
        rep_pace: w[:repPace],
        rep_amount: w[:repAmount],
        created_at: DateTime.now,
        updated_at: DateTime.now
      }])
    end
  end

end
