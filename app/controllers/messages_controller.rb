class MessagesController < ApplicationController
  def create
    # byebug
    message = Message.create!(message_params)
    chat = Chat.find(params[:chat_id])
    ChatChannel.broadcast_to(chat, {type: 'new_message', new_message: message})
  end

  private

  def message_params
    params.permit(:content, :user_id, :chat_id)
  end
end
