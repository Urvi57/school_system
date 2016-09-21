class School < ActiveRecord::Base
	has_many :classrooms
	has_many :teachers
	has_many :students
	has_and_belongs_to_many :subjects

	validates :name, :address, :city, :zipcode, :state, :phone_no, presence: true
	validates :phone_no, uniqueness: true, length: {minimum:10, maximum:10}
	validates :zipcode, length: {minimum:6, maximum:6}
end
