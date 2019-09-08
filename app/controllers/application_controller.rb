class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        protected
          def configure_permitted_parameters
            devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :weight, :height_feet, :height_inches, :birthdate, :is_male, :is_female])
         end
end
