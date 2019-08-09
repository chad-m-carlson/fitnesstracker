class WorkOutsController < ApplicationController
  def index
  end

  def show
    render json: WorkOut.find_work_out
  end

  def new
  end

  def create
  end

  def edit
  end
end
