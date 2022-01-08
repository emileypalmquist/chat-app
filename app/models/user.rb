class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true

  has_many :initiated_chats, foreign_key: :initiator_id, class_name: "Chat", dependent: :destroy
  has_many :receivers, through: :initiated_chats

  has_many :received_chats, foreign_key: :receiver_id, class_name: "Chat", dependent: :destroy
  has_many :initiators, through: :received_chats

  
end
