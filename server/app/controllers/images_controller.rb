class ImagesController < ApplicationController
    def index
        images = Image.all
        render json: {:images => images}
    end
    # handles get requests to /images

    def create
        new_image_name = params[:newImageName]
        new_image_url = params[:newImageUrl]
        new_image = Image.create(name: new_image_name, url: new_image_url)
        render json: {:message => "New Image Created"}
    end
    # handles post requests to /images

    def show
        id = params[:id]
        current_image = Image.find_by(id: id)
        render json: {image: current_image}
    end
    # handles get requests to /images/:id

    def destroy
        id = params[:x]
        current_image = Image.find_by(id: id)
        current_image.destroy
        render json: {:message => "Image deleted"}
    end
    #handles delete requests to images/:id
end

