class WorkOut < ApplicationRecord
  belongs_to :exercise
  has_many :user_logs, dependent: :destroy

  def self.find_work_out(date)
    WorkOut.find_by_sql(["
      SELECT e.name, wo.rep_pace, wo.rep_amount, e.id, wo.date, wo.id as workoutID, notes, exercise_order,  video_url
      FROM work_outs AS wo
      LEFT JOIN exercises AS e
      ON e.id = wo.exercise_id
      WHERE wo.date = '#{date}'
      ORDER BY wo.exercise_order, wo.updated_at
    "])
  end

  def self.copy_work_out(date, copy_date)
    WorkOut.find_by_sql(["
      INSERT INTO work_outs (date, notes, exercise_id, created_at, updated_at, rep_pace, rep_amount, exercise_order)
      SELECT '#{copy_date}', notes, exercise_id, NOW(), NOW(), rep_pace, rep_amount, exercise_order
      FROM work_outs
      WHERE date = '#{date}'
      
      "])
  end


  # def self.create_work_out(workout)
  #   existing_workout = WorkOut.find_work_out(workout[:date])
  #   if existing_workout.length < 1
  #     post_to_db(workout)
  #     return
  #   end
  #   # THERE HAS TO BE A BETTER WAY TO COMPARE THESE TWO ARRAYS
  #   if  existing_workout.length >= 1
  #     @interium = []
  #     @to_be_saved = []
  #     existing_workout.each do |ew|
  #       if ew[:id] == workout[:id]
  #         @interium << workout
  #       end
  #     end
  #       unless @interium.include? workout
  #         @to_be_saved << workout
  #       end
  #     @to_be_saved.each do |tbs|
  #       post_to_db(tbs)
  #     end
  #   end
  # end

  # def self.post_to_db(w)
  #   WorkOut.find_by_sql(["
  #   INSERT INTO work_outs (date, exercise_id, rep_pace, rep_amount, notes, exercise_order, created_at, updated_at)
  #   VALUES (:date, :exercise_id, :rep_pace, :rep_amount,:notes, :exercise_order, :created_at, :updated_at)",
  #     {date: w[:date],
  #     exercise_id: w[:id],
  #     rep_pace: w[:rep_pace],
  #     rep_amount: w[:rep_amount],
  #     notes: w[:notes],
  #     exercise_order: w[:exercise_order],
  #     created_at: DateTime.now,
  #     updated_at: DateTime.now
  #   }])
  # end
end


