class RepAmountsController < ApplicationController
  def index
    render json: RepAmount.all
  end

  def create
  end

  def update
  end

  def destroy
  end
end
