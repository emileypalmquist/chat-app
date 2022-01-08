class ChatsController < ApplicationController

  def index
    chats = Chat.logged_in_user_chats(session[:user_id])
    render json: chats
  end
end
