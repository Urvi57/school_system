class Teacher < ActiveRecord::Base
	belongs_to :school
	has_and_belongs_to_many :students
	has_and_belongs_to_many :classrooms
	has_and_belongs_to_many :subjects

	validates :name, :gender, :phone_no, presence: true
	validates :phone_no, uniqueness: true, length: {minimum:10, maximum:10}
end
