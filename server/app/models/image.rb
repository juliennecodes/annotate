class Image < ApplicationRecord
    has_many :annotations
    # accepts_nested_attributes_for :annotations
end
