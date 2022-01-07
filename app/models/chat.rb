class Chat < ApplicationRecord
  belongs_to :initiator, class_name: "User"
  belongs_to :receiver, class_name: "User"
  has_many :messages
  
  # def user(logged_in_user_id)
  #   if (initiator.id != logged_in_user_id) {
  #     initiator
  #   } else {
  #     receiver
  #   }
  # end
end
