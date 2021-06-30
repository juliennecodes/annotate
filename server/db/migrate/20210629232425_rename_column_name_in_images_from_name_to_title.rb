class RenameColumnNameInImagesFromNameToTitle < ActiveRecord::Migration[6.1]
  def change
    rename_column :images, :name, :title
  end
end
