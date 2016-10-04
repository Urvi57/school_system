class Classroom < ActiveRecord::Base
	belongs_to :school
	has_and_belongs_to_many :teachers
	has_many :students
	has_and_belongs_to_many :subjects

	validates :name, :number_of_students, presence: true
	validates :name, uniqueness: true

	def school_details
		self.school
	end
	def 
	def subject_details
		self.subjects
	end
	
end
