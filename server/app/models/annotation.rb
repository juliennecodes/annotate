class Annotation < ApplicationRecord
    belongs_to :image
    validates :visual, presence: true
    validates :written, presence: true
    validates :image_id, presence: true
end
