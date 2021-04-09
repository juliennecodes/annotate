class ImagesController < ApplicationController
    # handles get requests to /images
    def index
        images = Image.all
        render json: {:images => images}
    end
    
    # handles post requests to /images
    def create
        new_image_name = params[:newImageName]
        new_image_url = params[:newImageUrl]
        new_image = Image.create(name: new_image_name, url: new_image_url)
        render json: {message: "New image created"}
    end
    
    # handles get requests to /images/:id
    def show
        id = params[:id]
        current_image = Image.find_by(id: id)
        render json: {image: current_image}
    end
    
    #handles delete requests to images/:id
    def destroy
        id = params[:id]
        current_image = Image.find_by(id: id)
        current_image.destroy
        render json: {message: "Image deleted"}
    end
end

