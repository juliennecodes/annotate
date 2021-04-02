class AnnotationsController < ApplicationController
    def index
        image_id = params[:image_id]
        image = Image.find_by(id: image_id)
        render json: {annotations: image.annotations}
    end
    # handles get requests to /images/:image_id/annotations

    def create
        image_id = params[:image_id]
        new_annotation = params[:newAnnotation]
        image = Image.find_by(id: image_id)
        image.annotations.create(body: new_annotation)
    end
    # handles post requests to /images/:image_id/annotations

    def destroy
        # image_id = params[:image_id] #I don't think I need this
        annotation_id = params[:id] 
        # I'm following rails routes here
        # I guess if a delete method makes is being handled by destroy
        # destroy looks at the where the delete request was directed
        # destroy, by convention, handles delete requests to this path
        # /images/:image_id/annotations/:id
        # so whatever the path the request is directed at, gets matched to /images/:image_id/annotations/:id?
        # in /images/25/annotations/3
        # :image_id is 25
        # :id is 3?
        annotation = Annotation.find_by(id: annotation_id)
        annotation.destroy
        render json: {:message => "Annotation deleted"}
    end
    #handles delete requests to /images/:image_id/annotations/:id
end
