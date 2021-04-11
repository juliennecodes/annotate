class Image < ApplicationRecord
    has_many :annotations
    # accepts_nested_attributes_for :annotations
    validates :name, presence: true
    validates :url, presence: true
    # validates :url, format: { with: /^https.*(jpg|jpeg|png|webp)$/gm, message: "only allows url addresses of images"}
    # I got this error
    # ArgumentError (The provided regular expression is using multiline anchors (^ or $), 
    # which may present a security risk. 
    # Did you mean to use \A and \z, or forgot to add the :multiline => true option?):

    # validates :url, format: { with: /^https.*(jpg|jpeg|png|webp)$/gm, :multiline => true, message: "only allows url addresses of images"}
    #SyntaxError (/Users/julienne/Documents/Coding/zReact-Apps/annotate/server/app/models/image.rb:11: unknown regexp option - g
    # ...^https.*(jpg|jpeg|png|webp)$/gm, :multiline => true, message...
    # I copied what was on regex101, I guess I'll remove it?

    validates :url, format: { with: /^https.*(jpg|jpeg|png|webp)$/, :multiline => true, message: "only allows url addresses of images"}
end
# so validates validates what is going to be recorded in the database
# the server can receive information and create an object out of that information
# but when you add validation, there is the extra step of that object needing to 
# meet the condition that validate is specifying before it is recorded in the database
# presence: true specifies that the value has to be there, the value cannot be nothing
# format: specifies that the value has to match the regex given to with
# so in this
# class Image < ApplicationRecord
#     validates :url, presence: true
# end
# Image model is being validated before being recorded in the database
# the value given to the url has to be something, it cannot be nothing
