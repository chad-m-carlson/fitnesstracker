class UserLog < ApplicationRecord
  belongs_to :work_out, dependent: :destroy
  belongs_to :user

  def self.find_user_logs_history(exercise_id, rep_pace, rep_amount, date, user_id)
    find_by_sql(["
    WITH a AS (
      SELECT 
        w.id, 
        w.exercise_id, 
        w.rep_amount, 
        w.rep_pace, 
        w.notes AS workout_notes,
        u.notes,
        u.weight, 
        u.reps, 
        w.date,
        u.id AS user_log_id
      FROM work_outs AS w
      LEFT JOIN user_logs AS u ON u.work_out_id = w.id
      WHERE w.exercise_id = ? AND u.user_id = ?)
    SELECT e.name, a.id AS workout_id, a.date, a.rep_amount, a.rep_pace, a.weight, a.reps, a.user_log_id AS id, a.notes, workout_notes
    FROM exercises AS e
    LEFT JOIN a ON e.id = a.exercise_id
    WHERE e.id = a.exercise_id AND rep_pace = ? AND date != ?
    ORDER BY  date DESC
    LIMIT 2
    ", exercise_id, user_id[:user_id], rep_pace, date])
  end

  def self.user_logs_max(exercise_id, user_id)
    find_by_sql(["
      WITH a AS (
        SELECT 
          w.id, 
          w.exercise_id, 
          w.rep_amount, 
          w.rep_pace, 
          w.date,
          w.notes AS workout_notes,
          u.notes,
          u.weight, 
          u.reps, 
          u.id AS user_log_id
        FROM work_outs AS w
        LEFT JOIN user_logs AS u ON u.work_out_id = w.id
        WHERE w.exercise_id = ? AND u.user_id = ?)
        SELECT e.name, a.id AS workout_id, a.date, a.rep_amount, a.rep_pace, a.weight, a.reps, a.user_log_id AS id, a.notes, workout_notes
        FROM exercises AS e
        LEFT JOIN a ON e.id = a.exercise_id
        WHERE e.id = a.exercise_id 
        ORDER BY date DESC, weight DESC, reps DESC
        LIMIT 1
    ", exercise_id, user_id[:user_id]])
  end
end
