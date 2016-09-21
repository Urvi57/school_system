class CreateTeachersClassrooms < ActiveRecord::Migration
  def change
    create_table :teachers_classrooms do |t|
    	t.integer :teacher_id
    	t.integer :classroom_id
    end
  end
end
