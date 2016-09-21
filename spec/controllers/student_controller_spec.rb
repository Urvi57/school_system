require 'rails_helper'

RSpec.describe StudentsController, type: :controller do
	before(:each) do
		@school=FactoryGirl.create(:school, :name => 'Anthony', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567891')
		@classroom=FactoryGirl.create(:classroom, :name => 'First', :number_of_students => '20', :school_id => @school.id)	
	end
	context "index" do
		it "should list of all students in the system" do
			student = FactoryGirl.create(:student)
			 get :index
			 response.status.should eq 200
		end
	end
	context "show" do
		it "should return success and return student if valid id is passed " do
			student = FactoryGirl.create(:student)
			get :show ,:id=>student.id
			response.status.should eq 200
		end
		it "should not return success if invalid id is passed" do
			student = FactoryGirl.create(:student)
			get :show ,:id=>1
			response.status.should eq 422
		end
	end
	context "new" do
	 	it "should create new student" do
	 		student =FactoryGirl.create(:student)
	 		get :new
	 		response.status.should eq 200
	 	end
	 end
	 context "edit" do
		it "should edit the requested student" do
			student =FactoryGirl.create(:student)
			get :edit, :id=>student.id
			response.status.should eq 200
		end
	end
	context "create" do
	  	it "should return success and create student if valid params are passed" do
	  		 post :create, :student=>{:name => 'First', :father_name=>'Mehul', :mother_name=>'Meeta',:phone_no=>'9100001010', :address=>'Sector', :city=>'Udaipur', :zipcode=>'123456', :state=>'Raj',:school_id => @school.id, :classroom_id => @classroom.id }
 	 		 response.status.should eq 200
		
		 end
		 it "should not return success if invalid params are passed" do
		 	 post :create, :student=>{:name => 'Ankit', :father_name=>'Mehul', :mother_name=>'Meeta',:phone_no=>'91000010', :address=>'Sector', :city=>'Udaipur', :zipcode=>'123456', :state=>'Raj',:school_id => @school.id, :classroom_id => @classroom.id }
 	 	 	 response.status.should eq 422
		 end
	 end
	  context "update" do
	  	it "should return success and update the requested student if valid params are passed" do
	  		student=FactoryGirl.create(:student)
	  		put :update, :student=>{:name => student.name, :father_name=>student.father_name, :mother_name=>student.mother_name,:phone_no=>student.phone_no, :address=>student.address, :city=>student.city, :zipcode=>student.zipcode, :state=>student.state,:school_id => @school.id, :classroom_id => @classroom.id }, :id=>student.id
	  		response.status.should eq 200		
	  	end
	  	it  "should not return success if invalid id is passed" do
	  		student = FactoryGirl.create(:student)
	  		put :update, :student=>{:name => student.name, :father_name=>student.father_name, :mother_name=>student.mother_name,:phone_no=>student.phone_no, :address=>student.address, :city=>student.city, :zipcode=>student.zipcode, :state=>student.state,:school_id => @school.id, :classroom_id => @classroom.id }, :id=>student.id+1
	  	end
	    it "should not return success if invalid params were passed" do
	  		student=FactoryGirl.create(:student)
	  	 	put :update, :student=>{:name => nil, :father_name=>student.father_name, :mother_name=>student.mother_name,:phone_no=>student.phone_no, :address=>student.address, :city=>student.city, :zipcode=>student.zipcode, :state=>student.state,:school_id => @school.id, :classroom_id => @classroom.id }, :id=>student.id
			response.status.should eq 422	
	  	end

	  end
	   context "destroy" do
		it "should destroy the requested student if valid id passed" do
			student=FactoryGirl.create(:student)
			delete :destroy, :id=>student.id
			response.status.should eq 200		
		end
	 	 it "should not return success if invalid id passed" do
	   	 	student=FactoryGirl.create(:student)
	 		delete :destroy, :id=>student.id+1
	 		response.status.should eq 422
	  	  end
	  	  
	end
end