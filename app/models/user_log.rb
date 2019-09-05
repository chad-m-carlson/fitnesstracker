class UserLog < ApplicationRecord
  belongs_to :work_out, dependent: :destroy
  belongs_to :user
end
