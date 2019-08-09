class Exercise < ApplicationRecord
  validates :name, presence: true

  has_many :work_outs
  has_many :reps, through: :work_outs
  
end
