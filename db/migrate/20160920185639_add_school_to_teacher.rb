class AddSchoolToTeacher < ActiveRecord::Migration
  def change
  	 add_column :teachers, :school_id, :integer
      
  end
end
