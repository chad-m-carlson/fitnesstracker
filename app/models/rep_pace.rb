class RepPace < ApplicationRecord
  validates :pace, presence: true
  validates :pace, uniqueness: true
end
