class ChatsController < ApplicationController

  def index
    chats = Chat.where("receiver_id = ? or initiator_id = ?", session[:user_id], session[:user_id])
    render json: chats
  end
end
