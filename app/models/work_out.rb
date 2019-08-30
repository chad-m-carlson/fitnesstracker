class WorkOut < ApplicationRecord
  has_and_belongs_to_many :exercises

  def self.find_work_out(date)
    WorkOut.find_by_sql(["
      SELECT e.name, wo.rep_pace, wo.rep_amount, e.id, wo.date, wo.id as workoutID, notes
      FROM work_outs AS wo
      LEFT JOIN exercises AS e
      ON e.id = wo.exercise_id
      WHERE wo.date = '#{date}'
    "])
  end


  def self.create_work_out(workout)
    existing_workout = WorkOut.find_work_out(workout[0][:date])
    if existing_workout.length < 1
      workout.each do |w|
        post_to_db(w)
      end
    end
    # THERE HAS TO BE A BETTER WAY TO COMPARE THESE TWO ARRAYS
    if (existing_workout.length != workout.length) && existing_workout.length >= 1
      @interium = []
      @to_be_saved = []
      existing_workout.each do |ew|
        workout.each do |w|
          if ew[:id] == w["id"]
            @interium << w
          end
        end
      end
      workout.each do |w|
        unless @interium.include? w
          @to_be_saved << w
        end
      end
      @to_be_saved.each do |tbs|
        post_to_db(tbs)
      end
    end
  end

  def self.post_to_db(w)
    WorkOut.find_by_sql(["
    INSERT INTO work_outs (date, exercise_id, rep_pace, rep_amount, notes, created_at, updated_at)
    VALUES (:date, :exercise_id, :rep_pace, :rep_amount,:notes, :created_at, :updated_at)",
      {date: w[:date],
      exercise_id: w[:id],
      rep_pace: w[:rep_pace],
      rep_amount: w[:rep_amount],
      notes: w[:notes],
      created_at: DateTime.now,
      updated_at: DateTime.now
    }])
  end
end


