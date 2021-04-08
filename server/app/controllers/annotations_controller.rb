class AnnotationsController < ApplicationController
    def index
        image_id = params[:image_id]
        image = Image.find_by(id: image_id)
        render json: {annotations: image.annotations}
    end
    # handles get requests to /images/:image_id/annotations

    def create
        image_id = params[:image_id]
        new_visual_annotation = params[:visualAnnotation]
        new_written_annotation = params[:writtenAnnotation]
        # puts new_annotation_image
        # puts new_annotation_text
        image = Image.find_by(id: image_id)
        # image.annotations.create(body: new_annotation)
        # change annotation model to include image information
        # so annotation should have image and text
        image.annotations.create(visual: new_visual_annotation, written: new_written_annotation)
        # I updated the column names of the annotations modell to visual and written
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
