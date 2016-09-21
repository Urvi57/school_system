class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
      t.string :name
      t.text :address
      t.string :city
      t.string :zipcode
      t.string :state
      t.string :phone_no		
      t.timestamps 
    end
  end
end
