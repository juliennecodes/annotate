class ImagesController < ApplicationController
    # handles get requests to /images
    def index
        images = Image.all
        render json: {:images => images}
    end
    
    # handles post requests to /images
    def create
        # new_image_name = params[:newImageName]
        # new_image_url = params[:newImageUrl]
        # new_image = Image.create(name: new_image_name, url: new_image_url)
        Image.create(image_params)
        # so, here, umm, strong parameter is asking the object, which object?
        # asking the object to assign all the attributes based on that hash
        # this is what the strong parameters hash looks like
        # {"name"=>"Fry", 
        # "url"=>"https://i.pinimg.com/564x/64/a9/30/64a93049ac617f6b8ff20724babdbe08.jpg", 
        # "image"=>{"url"=>"https://i.pinimg.com/564x/64/a9/30/64a93049ac617f6b8ff20724babdbe08.jpg", 
        # "name"=>"Fry"}}
        # so that hash is given to Image.create
        # Image.create creates a record of Image in the database using information in the strong parameter hash?
        # oh nevermind, that's mass assignment
        # so, umm, the strong parameter method image_params, returns a hash
        # that hash is accepted in mass assignment
        # mass assignment accepts a hash with 
        # oh wait, I think the hash is the parameters, of which strong parameters is only a part of
        # name and url comes from the client
        # the image key has a hash value
        # the hash value has the permitted attributes and their values
        # that permitted hash is the one used by Image.create
        # so Image.create is only using permitted values
        # ok
        render json: {message: "New image created"}
    end
    
    # handles get requests to /images/:id
    def show
        params.permit(:id)
        id = params[:id]
        current_image = Image.find_by(id: id)
        render json: {image: current_image}
    end
    
    #handles delete requests to images/:id
    def destroy
        params.permit(:id)
        id = params[:id]
        current_image = Image.find_by(id: id)
        current_image.destroy
        render json: {message: "Image deleted"}
    end

    private
    def image_params
        # params.require(:image).permit(:newImageName, :newImageUrl)
        # how does rails know that newImageName goes to name?
        # or do I rename newImageName to name?
        # that didn't work
        # ActionController::ParameterMissing (param is missing or the value is empty: image
        # I wish the documents showed which long form the short hand is replacing
        params.require(:image).permit(:name, :url)
        # maybe, the params has to align with the column names?
        # oh cool, it works now
        # the parameters have to be the same name as the column names
    end

end

# mass assignment
# rails term for passing a hash of values
# hash of values from form parameters to an object to be assigned as attributes
# new, create, update - primary methods that use mass assignment
# ask the object to assign all attributes based on that hash
# rails allows you to assign values to this object all at once instead of having to assign the values one by one
# this introduces security issues where anybody can just provide form parameters that was not originally intended

# strong parameters
# by default, rails will not allow you to mass assign your parameters to one of your objects
# instead, you have to tell the objects what is permitted
# on params, you would call permit and tell it what attributes are available for mass assignment
# permit is a way of marking what is allowed

# require
# require ensures that the parameter is set
# require raises an error is a parameter is not there
# if it is not there, it returns back the hash