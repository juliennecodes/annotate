class HomeController < ApplicationController
  def x
    object = {x: "server response"}
    render json: object
  end
end
