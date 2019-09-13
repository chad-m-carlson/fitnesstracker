class ExerciseCategory < ApplicationRecord
  validates :category_name, uniqueness: true
  has_and_belongs_to_many :exercises
end
