class Subject < ActiveRecord::Base
	has_and_belongs_to_many :schools
	has_and_belongs_to_many :teachers
	has_and_belongs_to_many :classrooms
	has_and_belongs_to_many :students

	validates :name, presence: true
	validates :name, uniqueness: true
end
