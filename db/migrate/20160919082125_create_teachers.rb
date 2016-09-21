class CreateTeachers < ActiveRecord::Migration
  def change
    create_table :teachers do |t|
      t.string :name
      t.string :proficiency_subject
      t.string :gender, :limit => 1
      t.string :phone_no
      t.timestamps
    end
  end
end
