class ChatsChannel < ApplicationCable::Channel
  def subscribed
    chat = Chat.find(params[:chat_id])
    stream_from "chat_#{params[:chat_id]}"
    ActionCable.server.broadcast("chat_#{params[:chat_id]}", { type: "all_messages", messages: chat.messages.order(created_at: :desc) })
  end
end