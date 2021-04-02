class CreateAnnotations < ActiveRecord::Migration[6.1]
  def change
    create_table :annotations do |t|
      t.string :body
      t.integer :image_id
    end
  end
end
