class Exercise < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :work_outs
  has_and_belongs_to_many :exercise_category

  def self.add_categories_to_exercise(categories, exercise)
    categories.each do |c|
      ExerciseCategory.find(c).exercises << exercise
    end
  end

  def self.edit_exercise_categories(incoming_exercise)
    exercise = Exercise.find(incoming_exercise[:id])
    existing_categories = exercise.exercise_category.ids
    new_categories = incoming_exercise[:selectedExerciseCategories]
    if existing_categories.sort != new_categories.sort
      existing_categories.each do |c|
        find_by_sql(["
          DELETE FROM exercise_categories_exercises
          WHERE exercise_id = ? AND exercise_category_id = ?
        ", exercise.id, c])
      end
      new_categories.each do |c|
        find_by_sql(["
          INSERT INTO exercise_categories_exercises (exercise_id, exercise_category_id)
          VALUES (:exercise_id, :exercise_category_id)
        ", {exercise_id: exercise.id, exercise_category_id: c}])
      end
    end
  end
  
  # def self.exercise_by_category(category)
  #   Exercise.find_by_sql(["
  #     SELECT id, name, description, video_url, is_active, core, legs, chest, back, arms, shoulders, cardio, superset
  #     FROM exercises
  #     WHERE #{category} = true
  #     AND is_active = true
  #     ORDER BY name
  #   "])
  # end
end
