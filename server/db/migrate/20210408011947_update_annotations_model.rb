class UpdateAnnotationsModel < ActiveRecord::Migration[6.1]
  def change
    add_column :annotations, :image, :string
    rename_column :annotations, :body, :text
  end
end
