Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

    resources :exercises, only: [:index, :create, :update, :show]
    resources :reps, only: [:index, :create, :update, :show]
    resources :work_outs
end
