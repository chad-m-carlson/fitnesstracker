class Exercise < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :work_outs
  has_and_belongs_to_many :exercise_category
  
  def self.exercise_by_category(category)
    Exercise.find_by_sql(["
      SELECT id, name, description, video_url, is_active, core, legs, chest, back, arms, shoulders, cardio, superset
      FROM exercises
      WHERE #{category} = true
      AND is_active = true
      ORDER BY name
    "])
  end
end
