class CreateClassrooms < ActiveRecord::Migration
  def change
    create_table :classrooms do |t|
      t.string :name
      t.string :number_of_students
      t.integer :school_id
      t.timestamps 
    end
  end
end
