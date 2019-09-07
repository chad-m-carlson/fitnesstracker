class Api::RepPacesController < ApplicationController
  def index
    render json: RepPace.all
  end

  def create
    pace = RepPace.create(params.require(:rep_pace).permit(:pace))
    if pace.save
      render json: pace
    else
      render json: pace.errors
  end
  end

  def update
  end

  def destroy
  end
end
