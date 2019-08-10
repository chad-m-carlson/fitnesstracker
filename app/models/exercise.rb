class Exercise < ApplicationRecord
  validates :name, presence: true

  has_many :work_outs
  has_many :reps, through: :work_outs
  
  def self.exercise_by_category(category)
    Exercise.find_by_sql(["
      SELECT id, name, description, video_url, is_active, core, legs, chest, back, arms, shoulders, cardio, superset
      FROM exercises
      WHERE #{category} = true
    "])
  end
end
