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
        annotation_id = params[:id] 
        annotation = Annotation.find_by(id: annotation_id)
        annotation.destroy
        render json: {:message => "Annotation deleted"}
    end
    #handles delete requests to /images/:image_id/annotations/:id
end
