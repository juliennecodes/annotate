class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordNotFound do |e|
        render json: {error: e.to_s}, status: 404
    end
end
