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

    def create
        image_id = params[:image_id]
        # this is the url
        # in /images/:image_id/annotations and /images/25/annotations
        # 25 gets mapped to :image_id
        # you can use that information to query for a specific image
        # that specific image gets a new annotation when you create a new annotation
        image = Image.find_by(id: image_id)

        new_annotation = params[:newAnnotation]
        # move this line after image_id, I'm keeping it here for now because I was writing my train of thoughts
        # and if I insert it where I think this line should rightfully go, it will interrupt what I wrote
        # I'm still not sure how to format things when going back and forth between javascript and rails
        # the request body is in javascript but when it reaches rails, do I keep camel case
        # if I change it to snake case, will rails understand that newAnnotation is new_annotation?

        image.annotations.create(body: new_annotation)
    end
    # handles post requests to /images/:image_id/annotations
end
