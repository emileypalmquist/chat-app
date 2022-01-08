Rails.application.routes.draw do
  resources :messages, only: [:create]
  resources :chats, only: [:index]
  resources :users, only: []
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  mount ActionCable.server => '/cable'
end
