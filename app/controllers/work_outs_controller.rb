class WorkOutsController < ApplicationController
  def index
  end

  def show
    render json: WorkOut.find_work_out
  end

  def new
  end

  def create
    render json: WorkOut.create_work_out(params[:_json])
  end

  def edit
  end
end
