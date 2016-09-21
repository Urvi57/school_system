class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :name
      t.string :father_name
      t.string :mother_name
      t.string :phone_no
      t.text :address
      t.string :city
      t.string :zipcode
      t.string :state
      t.timestamps 
    end
  end
end
