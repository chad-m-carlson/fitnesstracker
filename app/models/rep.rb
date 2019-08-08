class Rep < ApplicationRecord

  has_many :work_outs
  has_many :exercises, through: :work_outs

end
