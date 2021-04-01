class AddNameToImages < ActiveRecord::Migration[6.1]
  def change
    add_column :images, :name, :string
  end
end

# I typed rails g migration add_name_to_images and ended up with this
# class AddNameToImages < ActiveRecord::Migration[6.1]
#   def change
#   end
# end

# I forgot to type name:string
# The correct command was
# rails g migration add_name_to_images name:string
# which creates
# class AddNameToImages < ActiveRecord::Migration[6.1]
#   def change
#     add_column :images, :name, :string
#   end
# end

# typing name:string makes rails add
# add_column :images, :name, :string
# add column is the change, it adds column to images, the column name is name, the column type is string
