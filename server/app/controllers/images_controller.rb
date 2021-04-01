class ImagesController < ApplicationController
    def index
        images = Image.all
        render json: {:images => images}
    end
    # handles get requests to /images

    def show
        id = params[:id]
        # does this automatically get the id from the url
        # I'm not sure if I have to post the information from react
        # or if the interpolated url will give enough information
        # how does rails know params refers to the url
        # doesn't params sometimes refer to the information posted in a post request?
        current_image = Image.find_by(id: id)
        render json: {image: current_image}
    end
    # handles get requests to /images/:id
end
