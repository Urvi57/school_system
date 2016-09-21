class CreateTeachersStudents < ActiveRecord::Migration
  def change
    create_table :teachers_students do |t|
    	t.integer :teacher_id
    	t.integer :student_id
    end
  end
end
