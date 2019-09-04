class UserLog < ApplicationRecord
  belongs_to :work_out
  belongs_to :user
end
