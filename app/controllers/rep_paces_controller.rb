class RepPacesController < ApplicationController
  def index
    render json: RepPace.all
  end

  def create
  end

  def update
  end

  def destroy
  end
end
