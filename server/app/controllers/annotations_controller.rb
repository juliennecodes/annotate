class AnnotationsController < ApplicationController
    # handles get requests to /images/:image_id/annotations
    def index
        image = Image.find(params[:image_id])
        render json: {annotations: image.annotations}
    end
    
    # handles post requests to /images/:image_id/annotations
    def create
        image = Image.find(params[:image_id])
        image.annotations.create(annotation_params)
        head :no_content
    end
    
    #handles delete requests to /images/:image_id/annotations/:id
    def destroy
        annotation = Annotation.find(params[:id])
        annotation.destroy
        head :no_content
    end

    private
    def annotation_params
        params.require(:annotation).permit(:visual, :written)
    end
end
