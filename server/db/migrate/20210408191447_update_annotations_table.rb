class UpdateAnnotationsTable < ActiveRecord::Migration[6.1]
  def change
    rename_column :annotations, :text, :written
    rename_column :annotations, :image, :visual
  end
end
