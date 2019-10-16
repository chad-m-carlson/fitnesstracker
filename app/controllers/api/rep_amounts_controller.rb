class Api::RepAmountsController < ApplicationController
  def index
    render json: RepAmount.all.order(:amount)
  end

  def create
    amount = RepAmount.new(params.require(:rep_amount).permit(:amount))
    if amount.save
      render json: amount
    else
      render json: { :errors => amount.errors.full_messages }
    end
  end

  def update
  end

  def destroy
  end
end
