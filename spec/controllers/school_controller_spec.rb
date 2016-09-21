require 'rails_helper'

RSpec.describe SchoolsController, type: :controller do
	context "index" do
		it "should list of all schools in the system" do
			school = FactoryGirl.create(:school)
			get :index
			response.status.should eq 200
		end
	end
	context "show" do
		it "should return success and return school if valid id is passed " do
			school = FactoryGirl.create(:school)
			get :show ,:id=>school.id
			response.status.should eq 200
		end
		it "should not return success if invalid id is passed" do
			school = FactoryGirl.create(:school)
			get :show ,:id=>1
			response.status.should eq 422
		end
	end
	 context "new" do
	 	it "should create new school" do
	 		school =FactoryGirl.create(:school)
	 		get :new
	 		response.status.should eq 200
	 	end
	 end
	 context "edit" do
		it "should edit the requested school" do
			school =FactoryGirl.create(:school)
			get :edit, :id=>school.id
			response.status.should eq 200
		end
	end
	 context "create" do
	  	it "should return success and create school if valid params are passed" do
	  		 post :create, :school=>{:name => 'Anthony', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567890'}
 	 		 response.status.should eq 200
		
		 end
		it "should not return success if invalid params are passed" do
			 post :create, :school=>{:name => 'Anthony', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567'}
 	 		 response.status.should eq 422
		end
	 end
	 context "update" do
	  	it "should return success and update the requested school if valid params are passed" do
	  		school=FactoryGirl.create(:school)
	  		put :update, :school=>{:name => school.name,:address => school.address, 
	  			:city => school.city, :zipcode => school.zipcode, :state => school.state, 
	  			:phone_no => school.phone_no}, :id=>school.id
	  		response.status.should eq 200		
	  	end
	  	 it "should not return success if invalid id passed" do
	  	 	school=FactoryGirl.create(:school)
	  		put :update, :school=>{:name => school.name,:address => school.address, 
	  			:city => school.city, :zipcode => school.zipcode, :state => school.state, 
	  			:phone_no => school.phone_no}, :id=>1
	  		response.status.should eq 422	
	  	 end
	  	  it "should not return success if invalid param were passed" do
	  	 	school=FactoryGirl.create(:school)
	  		put :update, :school=>{:name => nil,:address => school.address, 
	  			:city => school.city, :zipcode => school.zipcode, :state => school.state, 
	  			:phone_no => school.phone_no}, :id=>school.id
	  		response.status.should eq 422	
	  	 end
	  end
	  context "destroy" do
		it "should destroy the requested subject if valid params are passed" do
			school=FactoryGirl.create(:school)
			delete :destroy, :id=>school.id
			response.status.should eq 200		
		end
		 it "should not return success if invalid id passed" do
	  	 	school=FactoryGirl.create(:school)
			delete :destroy, :id=>1
			response.status.should eq 422
	  	  end
	  	  
	end
end