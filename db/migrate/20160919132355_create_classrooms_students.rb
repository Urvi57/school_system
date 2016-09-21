class CreateClassroomsStudents < ActiveRecord::Migration
  def change
    create_table :classrooms_students do |t|
    	t.integer :classroom_id
    	t.integer :student_id
    end
  end
end
