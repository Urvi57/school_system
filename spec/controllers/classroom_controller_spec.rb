require 'rails_helper'

RSpec.describe ClassroomsController, type: :controller do
	before(:each) do
		@school=FactoryGirl.create(:school, :name => 'Anthony', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567890')
	end
	context "index" do
		it "should list of all classroom in the system" do
			classroom = FactoryGirl.create(:classroom)
			get :index
			response.status.should eq 200
		end
	end
	context "show" do
		it "should return success and return classroom if valid id is passed " do
			classroom = FactoryGirl.create(:classroom)
			get :show ,:id=>classroom.id
			response.status.should eq 200
		end
		it "should not return success if invalid id is passed" do
			classroom = FactoryGirl.create(:classroom)
			get :show ,:id=>1
			response.status.should eq 422
		end
	end
	 context "new" do
	 	it "should create new classroom" do
	 		classroom =FactoryGirl.create(:classroom)
	 		get :new
	 		response.status.should eq 200
	 	end
	 end
	 context "edit" do
		it "should edit the requested classroom" do
			classroom =FactoryGirl.create(:classroom)
			get :edit, :id=>classroom.id
			response.status.should eq 200
		end
	end
	 context "create" do
	  	it "should return success and create classroom if valid params are passed" do
	  		 post :create, :classroom=>{:name => 'First', :number_of_students => '10', :school_id => @school.id }
 	 		 response.status.should eq 200
		
		 end
		it "should not return success if invalid params are passed" do
			 post :create, :classroom=>{:name => nil, :number_of_students => '10', :school_id =>@school.id}
 		 	 response.status.should eq 422
		end
	 end
	 context "update" do
	  	it "should return success and update the requested classroom if valid params are passed" do
	  		classroom=FactoryGirl.create(:classroom)
	  		put :update, :classroom=>{:name => classroom.name, :number_of_students => classroom.number_of_students, :school_id => @school.id}, :id=>classroom.id
	  		response.status.should eq 200		
	  	end
	    it "should not return success if invalid params were passed" do
	  	  	classroom=FactoryGirl.create(:classroom)
	  		put :update, :classroom=>{:name => nil, :number_of_students => classroom.number_of_students, :school_id => @school.id}, :id=>classroom.id
	    	response.status.should eq 422	
	  	end
	  	it "should not return success if invalid id passed" do
	  	  	classroom=FactoryGirl.create(:classroom)
	  		put :update, :classroom=>{:name => classroom.name, :number_of_students => classroom.number_of_students, :school_id => @school.id}, :id=>1
	    	response.status.should eq 422	
	  	end
	  end
	  context "destroy" do
		it "should destroy the requested classroom if valid params are passed" do
			classroom=FactoryGirl.create(:classroom)
			delete :destroy, :id=>classroom.id
			response.status.should eq 200		
		end
	 	 it "should not return success if invalid params were passed" do
	   	 	classroom=FactoryGirl.create(:classroom)
	 		delete :destroy, :id=>1
	 		response.status.should eq 422
	  	  end
	end
end