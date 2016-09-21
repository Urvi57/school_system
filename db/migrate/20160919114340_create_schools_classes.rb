class CreateSchoolsClasses < ActiveRecord::Migration
  def change
    create_table :schools_classes do |t|
    	t.integer :school_id
    	t.integer :classroom_id
    end
  end
end
