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
        u.id AS user_log_id,
        u.created_at
      FROM work_outs AS w
      LEFT JOIN user_logs AS u ON u.work_out_id = w.id
      WHERE w.exercise_id = ? AND u.user_id = ?)
    SELECT e.name, a.id AS workout_id, a.date, a.rep_amount, a.rep_pace, a.weight, a.reps, a.user_log_id AS id, a.notes, workout_notes, e.video_url
    FROM exercises AS e
    LEFT JOIN a ON e.id = a.exercise_id
    WHERE e.id = a.exercise_id AND rep_pace = ? AND date != ? and rep_amount = ?
    ORDER BY  a.created_at desc
    LIMIT 2
    ", exercise_id, user_id[:user_id], rep_pace, date, rep_amount])
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
          COALESCE(u.weight,0) weight,
          u.reps, 
          u.id AS user_log_id
        FROM work_outs AS w
        LEFT JOIN user_logs AS u ON u.work_out_id = w.id
        WHERE w.exercise_id = ? AND u.user_id = ? AND CAST(w.date AS date) > current_date - INTERVAL '2 year')
        SELECT e.name
              , a.id AS workout_id
              , a.date
              , a.rep_amount
              , a.rep_pace
              , a.weight              
              , a.weight * 0.6 AS sixety_max
              , a.weight * 0.7 AS seventy_max
              , a.weight * 0.8 AS eighty_max
              , a.weight * 0.9 AS ninety_max
              , a.reps
              , a.user_log_id AS id
              , a.notes
              , workout_notes
        FROM exercises AS e
        LEFT JOIN a ON e.id = a.exercise_id
        WHERE e.id = a.exercise_id 
        ORDER BY weight DESC
        LIMIT 1
    ", exercise_id, user_id[:user_id]])
  end

  def self.user_logs_by_exercise(exercise_id, user_id)
      find_by_sql(["
        WITH a AS (
          SELECT 
            w.exercise_id, 
            w.rep_amount, 
            w.rep_pace, 
            u.notes,
            u.weight, 
            u.reps, 
            w.date,
            u.id AS user_log_id,
            u.created_at
          FROM work_outs AS w
          LEFT JOIN user_logs AS u ON u.work_out_id = w.id
          WHERE w.exercise_id = :exercise_id AND u.user_id = :user_id)
          ,max_weight AS (SELECT max(u.weight) as max_weight
          							,w.exercise_id
          			FROM work_outs AS w
          			LEFT JOIN user_logs AS u ON u.work_out_id = w.id
          			WHERE w.exercise_id = :exercise_id AND u.user_id = :user_id
          			GROUP BY w.exercise_id
          )
        SELECT e.name
        		, a.date
        		, a.rep_amount
        		, a.rep_pace
        		, a.weight
        		, a.reps
        		, a.user_log_id AS id
        		, a.notes
        		,CASE WHEN  max_weight.max_weight = a.weight THEN 1 END is_max
        FROM exercises AS e
        LEFT JOIN a ON e.id = a.exercise_id
        LEFT JOIN max_weight ON max_weight.exercise_id = a.exercise_id
        WHERE e.id = a.exercise_id
        ORDER BY a.rep_pace, a.created_at desc
        ", :exercise_id => exercise_id, :user_id => user_id[:user_id]
    ])
  end
end
