class AnnotationsController < ApplicationController
    def index
        annotations = Annotation.where(image_id: params[:imageId])
        render json: { annotations: annotations }
    end

    def create
        image = Image.find(params[:imageId])
        image.annotations.create(annotation_params)
        head :no_content
    end
    
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
