class Api::RepPacesController < ApplicationController
  

  def index
    render json: RepPace.all.order(:pace)
  end

  def create
    pace = RepPace.new(params.require(:rep_pace).permit(:pace))
    if pace.save
      render json: pace
    else
      ender json: { :errors => pace.errors.full_messages }
  end
  end

  def update
  end

  def destroy
  end
end
