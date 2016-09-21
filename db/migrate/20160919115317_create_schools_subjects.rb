class CreateSchoolsSubjects < ActiveRecord::Migration
  def change
    create_table :schools_subjects do |t|
    	t.integer :school_id
    	t.integer :subject_id	
    end
  end
end
