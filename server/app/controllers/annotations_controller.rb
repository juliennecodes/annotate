class AnnotationsController < ApplicationController
    # def index
    #     id = params[:id]
    #     image = Image.find_by(id: id)
    #     render json: {annotations: image.annotations}
    #     # send the whole object or just the annotations?
    #     # it might be excessive to send the whole object when the annotation component
    #     # is only concerned with the annotations
    # end
    # # handles get requests to /images/:image_id/annotations
    # this is an error
    # NoMethodError (undefined method `annotations' for nil:NilClass):
    # app/controllers/annotations_controller.rb:5:in `index'
    # I think maybe because I had params[:id]
    # it should have been params[:image_id]
    # because that is what it says in the rails routes
    # the customizable value is :image_id not :id
    # therefore, when you send a request to /images/1/annotations
    # it is not :id that becomes 1
    # it is :image_id that becomes 1

    def index
        image_id = params[:image_id]
        image = Image.find_by(id: image_id)
        render json: {annotations: image.annotations}
        # send the whole object or just the annotations?
        # it might be excessive to send the whole object when the annotation component
        # is only concerned with the annotations
    end
    # handles get requests to /images/:image_id/annotations
end
