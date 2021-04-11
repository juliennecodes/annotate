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

        # Rails.logger.info(image_params)
        # produces
        # {"name"=>"Fry", "url"=>"https://i.pinimg.com/564x/64/a9/30/64a93049ac617f6b8ff20724babdbe08.jpg"}

        # create an image only using the things in the image params
        # otherwise, you might get information that would modify things you don't want modified
        # don't take on faith somebody is not sending you bad stuff
        # if information is coming from an outside source
        # whatever might be in here, these things have to be here and this is what I want to have
        # anything else, pay no attention
        # robustness principle
        # liberal in what you accept but be conservative in what you do

        # client sends information to server
        # server accepts information
        # rails, through strong params, vets information
        # rails requires image key
        # image key points to a hash
        # rails permits name key and url key in the image hash
        
        head :no_content
        # render json: {message: "New image created"}
    end
    
    # handles get requests to /images/:id
    def show
        # params.permit(:id)
        # don't have to use this because params is coming from url
        # use strong params for forms
        # use strong params for query params
        # so index page - list all things in there, entries, 
        # when you narrow it down, filter by 
        # in the case, use strong params
        id = params[:id]
        # current_image = Image.find_by(id: id)
        # returns 200 ok even if Image.find_by is nil

        current_image = Image.find(id)
        # returns 404 if Image.find is nil

        render json: {image: current_image}
    end
    
    #handles delete requests to images/:id
    def destroy
        # params.permit(:id)
        id = params[:id]
        # current_image = Image.find_by(id: id)
        current_image = Image.find(id)
        current_image.destroy
        head :no_content
        # render json: {message: "Image deleted"}
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

        # params_debug = params
        # params[:name] = "Bender"
        # Rails.logger.info("params is #{params}")
        # result = params.require(:image).permit(:name, :url)
        # Rails.logger.info("result is #{result}")
        # result
        # after running require and permit, unpack the image hash and discarded everything else

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

# whatever params you start with has an im
# permit - selecting stuff out of parameters

# if the active model has field 1 and field 2, but the input coming in has more than those two things, mechanism for rails, just care about field 1 and field 2
# strong parameters only permits given specific form fields
# params object has method require that accept a stable string
# require makes sure that the stable string is in the parameter, 
# so in the parameters object, you see, the parameters given by the client
# there is also the parameter 

# if image model has action column, it would have overwritten that unintentionally

# params is a hash
# things in top level of hash are piece sof information rails is tracking
# you choose the things you unpack

# XHR - async calls

# best practice is to send things in a container
# when you submit a form, logically that is something
# what is image, it has name and url
# having logical grouping makes it easy to pull things out

# hash that has a hash
# image returns a hash
# that hash has two keys, name and url
# dot calls methods
# square brackets access keys
# image[:name]
# params[:image][:name]
# params[:image][:url]

# keep in mind - rails - two identities
# rails as magic
# rails as you programmed it

# nested strong parameters used when form for image has field for parameter
# when you're creating an image and you're also creating an annotation at the same time
# and it is handled by the create method in images controller
# that is when nested strong parameters come into play
# it is when you're creating annotations in the same form as creating new images
# because you're creating annotations in the form that is handled by images controller
# you don't need nested strong parameters when you're creating annotations in the form that is handled by annotations controller

# for example, you have comment
# in images controller, you would have name and url and the comment would have written annotation
# written annotation would be nested
# images controller is requiring certain parameters to be part of annotation

# if your record is invalid state, run all validations and one of them failed validations, then, rails has a check along the way that says I will not record it in the database
# caveat - bypass this but normally, you wouldn't

# validates sets a particular that has to be applies
# Person.create
# create method runs all the validations you have
# validations true for all methods
# validations apply to any method that has an impact on the database
# runs through all the validations
# after it runs through the validations, you have the ability to check if the model is valid or not
# to do that, .valid? method

# model is the instance - result of Person.create
# class is the description
# Person is a class
# model is an instance of a class Person
# model is an instance

# instance is created through Person.create
# instance is validated through the create method
# as a result, the instance takes note of the validation result
# valid? returns true if there are no validation errors
# valid? returns false if there are validation errors

# validates sets up validations
# by default validates nil
# always going to be valid method
# the difference is whether there are any logic that could set the result to false

# class Person < ApplicationRecord
#     validates :name, presence: true
# end
# when you do something with Person
# check to see if :name is present, meaning :name is not nil
# when you do something with Person, name cannot be nil, 
# name has to be present or else that something cannot happen
# Person.create creates an object but it doesn't get recorded in the database
