class Chat < ApplicationRecord
  belongs_to :initiator, class_name: "User"
  belongs_to :receiver, class_name: "User"
  has_many :messages

  def self.logged_in_user_chats(user_id)
    where("initiator_id = ? or receiver_id = ?", user_id, user_id).order(created_at: :desc)
  end

  # def user
  #   byebug
  # end
end
