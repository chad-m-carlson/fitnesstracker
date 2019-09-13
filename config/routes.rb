Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    namespace :api do
      resources :exercises, only: [:index, :create, :update, :show]
      resources :rep_amounts, only: [:index, :create, :update]
      resources :rep_paces, only: [:index, :create, :update]
      resources :work_outs do
        resources :exercises
      end
      resources :exercise_categories, only: [:index, :show]
      resources :exercise_categories_exercises, only: [:show]
      resources :user_logs, only: [:index, :create, :update, :show] do
        resources :work_outs, only: [:index, :create, :update, :show]
      end
      get 'exercises_by_category/:id', to: 'exercises#exercises_by_category'
    end

    get '*other', to: 'static#index'
end
