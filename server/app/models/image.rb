class Image < ApplicationRecord
    has_many :annotations
    validates :name, presence: true
    validates :url, presence: true
    validates :url, format: { with: /^https.*(jpg|jpeg|png|webp)$/, :multiline => true, message: "only allows url addresses of images"}
end