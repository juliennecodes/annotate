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

    # def destroy
    #     # id = params[:id]
    #     # id = params[:deleteImageId]
    #     id = params[:x]
    #     # current_image = Image.find_by(id: 9)
    #     current_image = Image.find_by(id: id)
    #     current_image.destroy
    #     render json: {}
    #     # what response should I give for delete requests?
    #     # I'm not rendering anything :S
    #     # if I respond with 200, does rails an exception if the current image can't be destroyed
    #     # I don't want to respond with 200 if there is an error in the line before
    #     # Where are res.status anyways? Are they in the header?
    #     # I just searched it, it's the first thing
    #     # so the main things are status and crlf (carriage return line feed)
    #     # the headers are under status
    #     # the message body is under crlf
    # end
    # #handles delete requests to images/:id

    # def delete_image
    #     id = params[:x] #using :image_id instead of :id just for precaution
    #     current_image = Image.find_by(id: id)
    #     current_image.destroy
    #     render json: {:message => "Image deleted"}
    # end

    # Testing paths
        def destroy
        id = params[:x]
        current_image = Image.find_by(id: id)
        current_image.destroy
        render json: {:message => "Image deleted"}
    end
    #handles delete requests to images/:id


end

