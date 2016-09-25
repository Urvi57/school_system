# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


 School.create([{name: 'ABS Public School', address: 'hiram mangri sec-6', phone_no: '9876543210', city: 'Udaipur', state: 'Rajasthan', zipcode: '313001'}])
 Classroom.create([{name: 'First Class', number_of_students: '20', school_id: '1'}, 
	{name: 'Second Class', number_of_students: '20', school_id: '1'},
	{name: 'six Class', number_of_students: '20', school_id: '1'}])

 Teacher.create([{name: 'Pradeep', subject_ids:[1], gender: 'Male', phone_no: '9876543211', school_id: '1',classroom_ids:[1,2] }])
 Student.create([{name: 'Bharti', father_name: 'Kumar', mother_name: 'Radha', phone_no: '9876543210', address: 'Sector 9', city: 'Udaipur', state: 'Rajasthan', zipcode: '313001', school_id: '1' ,classroom_id: '1'}])
Subject.create([{name: 'rails', school_ids:[1], classroom_ids:[1,2]}])