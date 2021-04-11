class ImagesController < ApplicationController
    # handles get requests to /images
    def index
        images = Image.all
        render json: {:images => images}
    end
    
    # handles post requests to /images
    def create
        Image.create(image_params)
        head :no_content
    end
    
    # handles get requests to /images/:id
    def show
        id = params[:id]
        current_image = Image.find(id)
        render json: {image: current_image}
    end
    
    #handles delete requests to images/:id
    def destroy
        id = params[:id]
        current_image = Image.find(id)
        current_image.destroy
        head :no_content
    end

    private
    def image_params
        params.require(:image).permit(:name, :url)
    end
end
