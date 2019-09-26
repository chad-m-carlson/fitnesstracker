class UserLog < ApplicationRecord
  belongs_to :work_out, dependent: :destroy
  belongs_to :user

  def self.find_user_logs_history(exercise_id, rep_pace, user_id)
    find_by_sql(["
    WITH a AS (
      SELECT 
        w.id, 
        TO_CHAR(u.updated_at, 'MM/DD/YY') as date,
        TO_CHAR(u.updated_at, 'MM/DD/YY HH:MM:SS') AS time, 
        w.exercise_id, 
        w.rep_amount, 
        w.rep_pace, 
        u.notes,
        u.weight, 
        u.reps, 
        u.id AS user_log_id
      FROM work_outs AS w
      LEFT JOIN user_logs AS u ON u.work_out_id = w.id
      WHERE w.exercise_id = ? AND u.user_id = ?)
    SELECT e.name, a.id AS workout_id, a.date, a.rep_amount, a.rep_pace, a.weight, a.reps, a.user_log_id AS id, a.notes
    FROM exercises AS e
    LEFT JOIN a ON e.id = a.exercise_id
    WHERE e.id = a.exercise_id AND rep_pace = ?
    ORDER BY time DESC
    LIMIT 2
    ", exercise_id, user_id[:user_id], rep_pace])
  end

  def self.user_logs_max(exercise_id, user_id)
    find_by_sql(["
    WITH a AS (
      SELECT 
        w.id, 
        TO_CHAR(u.updated_at, 'MM/DD/YY') AS date, 
        w.exercise_id, 
        w.rep_amount, 
        w.rep_pace, 
        u.notes,
        u.weight, 
        u.reps, 
        u.id AS user_log_id
      FROM work_outs AS w
      LEFT JOIN user_logs AS u ON u.work_out_id = w.id
      WHERE w.exercise_id = ? AND u.user_id = ?)
      SELECT e.name, a.id AS workout_id, a.date, a.rep_amount, a.rep_pace, a.weight, a.reps, a.user_log_id AS id, a.notes
      FROM exercises AS e
      LEFT JOIN a ON e.id = a.exercise_id
      WHERE e.id = a.exercise_id 
      ORDER BY weight DESC
      LIMIT 1
    ", exercise_id, user_id[:user_id]])
  end
end
