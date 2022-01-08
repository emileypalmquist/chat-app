class ChatChannel < ApplicationCable::Channel
  # def subscribed
  #   chat = Chat.find(params[:chat_id])
  #   stream_for chat
  #   broadcast_to(chat, {type: 'all_messages', messages: chat.messages })
  # end

  # def unsubscribed
  #   puts "handle unsubscribed"
  # end
end