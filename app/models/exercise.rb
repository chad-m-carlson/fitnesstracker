class Exercise < ApplicationRecord

  has_many :work_outs
  has_many :reps, through: :work_outs
  
end
