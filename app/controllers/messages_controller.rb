class MessagesController < ApplicationController
  def create
    new_message = Message.create(message_params)
    ActionCable.server.broadcast("chat_#{params[:chat_id]}", { type: "new_message", new_message: new_message })
  end

  private

  def message_params
    params.permit(:content, :user_id, :chat_id )
  end
end
