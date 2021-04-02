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
        # render json: {new_image: new_image}
        # can I send it like this {new_image}
        # render json: {message: "New Image Created"}
        render json: {:message => "New Image Created"}
    end
    # handles post requests to /images

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
