class AnnotationsController < ApplicationController
    # handles get requests to /images/:image_id/annotations
    def index
        image_id = params[:image_id]
        image = Image.find_by(id: image_id)
        render json: {annotations: image.annotations}
    end
    
    # handles post requests to /images/:image_id/annotations
    def create
        image_id = params[:image_id]
        new_visual_annotation = params[:visualAnnotation]
        new_written_annotation = params[:writtenAnnotation]
        image = Image.find_by(id: image_id)
        image.annotations.create(visual: new_visual_annotation, written: new_written_annotation)
        head :no_content
    end
    
    #handles delete requests to /images/:image_id/annotations/:id
    def destroy
        annotation_id = params[:id] 
        annotation = Annotation.find_by(id: annotation_id)
        annotation.destroy
        # render json: {:message => "Annotation deleted"}
        head :no_content
    end
end
