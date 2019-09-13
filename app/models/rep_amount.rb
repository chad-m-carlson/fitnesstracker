class RepAmount < ApplicationRecord
  validates :amount, presence: true
  validates :amount, uniqueness: true
end
