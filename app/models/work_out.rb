class WorkOut < ApplicationRecord
  has_and_belongs_to_many :exercises
  has_and_belongs_to_many :reps
end
