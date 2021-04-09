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
        # render json: {:message => "New Image Created"}
        # send json objects like this
        # render json: {message: "New Image Created"}
        # since I'm not really sending anything back, I will be using head method
        # head returns a response that has no content, just headers
        head :no_content
        # so this means head method is given a stable string as an argument
        # based on the stable string, in this case, no_content, the create method
        # responds with 204 response?
        # is this necessary though?
        # doesn't it automatically respond with 204 if nothing is rendered
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
        # render json: {:message => "Image deleted"}
        head :no_content
    end
end

