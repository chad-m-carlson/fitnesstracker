class Api::RepAmountsController < ApplicationController
  def index
    render json: RepAmount.all
  end

  def create
    amount = RepAmount.create(params.require(:rep_amount).permit(:amount))
    if amount.save
      render json: amount
    else
      render json: amount.errors
  end
  end

  def update
  end

  def destroy
  end
end
