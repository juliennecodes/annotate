class AnnotationsController < ApplicationController
    # handles get requests to /images/:image_id/annotations
    def index
        # params.permit(:image_id)
        # are strong parameters needed if there isn't a form being filled out
        # like, in this case, the parameter is coming solely from the url
        image_id = params[:image_id]
        # image = Image.find_by(id: image_id)
        image = Image.find(image_id)

        render json: {annotations: image.annotations}
    end
    
    # handles post requests to /images/:image_id/annotations
    def create
        # params.permit(:image_id, :visual, :written)
        # image_id = params[:image_id]
        # new_visual_annotation = params[:visual]
        # new_written_annotation = params[:written]
        # image = Image.find_by(id: image_id)
        # image.annotations.create(visual: new_visual_annotation, written: new_written_annotation)
        # is there even a shortcut for this?
        # Image.create(annotation_params);
        # no, this would create a new image
        # how would I be able to pass in the values for annotation then
        # like, how would annotation know which image it belongs to?
        # Annotation.create(annotation_params);
        # so this creates parameters?
        # I looked at the error message
        # the error message had parameters listed, one given by the client but one seems to be coming from rails?
        # there was an annotation object with the written and visual columns filled out
        # okay, what do I make of that
        # there probably is a shortcut but right now, it seems to me I still have to find the image
        # create the annotation through image
        # oh maybe
        # image_id = params[:image_id]
        # image = Image.find_by(id: image_id)
        # image.annotations.create(annotation_params)
        # that didn't work

        image_id = params[:image_id]
        # new_visual_annotation = params[:annotation][:visual]
        # new_written_annotation = params[:annotation][:written]
        # image = Image.find_by(id: image_id)
        # image.annotations.create(visual: new_visual_annotation, written: new_written_annotation)

        # image = Image.find_by(id: image_id)
        # potentially could have returned nil
        # therefore image.annotations.create will error out
        # if you uses find
        # rails will handle a nice error message for you if image.find is nil
        image = Image.find(image_id)

        image.annotations.create(annotation_params)
        
        head :no_content
        # render json: {message: "New annotation created"}
    end
    
    #handles delete requests to /images/:image_id/annotations/:id
    def destroy
        # params.permit(:id)
        annotation_id = params[:id] 
        # annotation = Annotation.find_by(id: annotation_id)
        annotation = Annotation.find(annotation_id)
        annotation.destroy
        head :no_content
        # render json: {message: "Annotation deleted"}
    end

    private
    # def annotation_params
    #     # params.require()
    #     # oh, shoot, do I do :image because I'm creating an annotation through image?
    #     # or :annotation because I'm creating annotation
    #     # params.require(:image).permit(:image_id)
    #     # params.require(:annotation).permit(:visual, :written)
    #     # does accepts_nested_attributes_for come into play here
    #     params.require(:image).permit(:image_id, annotations_attributes: [ :visual, :written ])
    # end

    def annotation_params
        # params.require(:annotation).permit(:visual, :written)
        # this vets information coming in from the client
        # only accepts what is specified
        # requires annotation key in parameters object
        # annotation key points to a hash
        # this only accepts visual key and written key
        # if there were other keys, they are ignored
        # returns an object with vetted information
        # returns an object that only has visual and written keys
        # this object is used to construct object

        # annotation_params = params.require(:annotation).permit(:visual, :written)
        # Rails.logger.info("annotation_params is #{annotation_params}")
        params.require(:annotation).permit(:visual, :written)

    end
end

# what is strong parameter doing?
# I looked at the console
# it had an array of the columns
# [["written", "Honey unit"], ["image_id", 80]]
# previously, they were just parameters like this
# {"visual"=>"data:..}
# oh weird, is it doing anything?
# I forgot to include :image_id in the permit and it still created the annotation

# when you're searching for a model and giving it id
# currently using find_by
# change it to find
# because find_by returns a record or nil if it couldn't find it
# find returns the record if it finds it or raises a record not found exception
