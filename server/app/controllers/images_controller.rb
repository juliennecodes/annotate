class ImagesController < ApplicationController
    def index
        images = Image.all
        render json: {images: images}
    end
    
    def create
        Image.create(image_params)
        head :no_content
    end
    
    def show
        image = Image.find(params[:id])

        if(image.annotations.length > 0) 
            annotations = Annotation.where(image: image)
        else
            annotations = []
        end

        render json: {
            image: image,
            annotations: annotations
        }
    end
    
    def destroy
        current_image = Image.find(params[:id])
        current_image.destroy
        head :no_content
    end

    private
    def image_params
        params.require(:image).permit(:title, :url)
    end
end
