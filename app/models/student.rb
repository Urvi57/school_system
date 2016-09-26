class Student < ActiveRecord::Base
	belongs_to :school
	belongs_to :classroom
	has_and_belongs_to_many :teachers
	has_and_belongs_to_many :subjects

	validates :name, :father_name, :mother_name, :phone_no, :address, :city, :zipcode, :state, presence: true
	validates :phone_no, length: {minimum:10,maximum:10}
	
end
