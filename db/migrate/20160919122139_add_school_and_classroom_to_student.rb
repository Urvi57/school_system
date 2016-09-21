class AddSchoolAndClassroomToStudent < ActiveRecord::Migration
  def change
      add_column :students, :school_id, :integer
      add_column :students, :classroom_id, :integer
  end
end
