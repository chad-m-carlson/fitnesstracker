class RepsController < ApplicationController
  
  def index
    render json: Rep.all
  end

  def show
  end

  def new
  end

  def create
  end

  def edit
  end
end
