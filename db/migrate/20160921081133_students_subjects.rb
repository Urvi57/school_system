class StudentsSubjects < ActiveRecord::Migration
  def change
  	create_table :students_subjects do |t|
    	t.integer :student_id
    	t.integer :subject_id
    end
  end
end
