require 'rails_helper'

RSpec.describe SchoolsController, type: :controller do
	before(:each) do
		request.env["HTTP_ACCEPT"]='application/json'
		@school = FactoryGirl.create(:school)
	end
	context "index" do
		it "should list of all schools in the system" do
			school1 = FactoryGirl.create(:school,:phone_no=>"8929303030")
			get :index
			response.status.should eq 200
			assigns(:schools).should eq([@school,school1])
		end
	end
	context "show" do
		it "should return success and return school if valid id is passed " do
			school1 = FactoryGirl.create(:school,:phone_no=>"8929303030")
			get :show ,:id=>school1.id
			response.status.should eq 200
			JSON.parse(response.body)["id"].should eq school1.id
		end
		it "should not return success if invalid id is passed" do
			get :show ,:id=>1
			response.status.should eq 422
			JSON.parse(response.body)["error"].should_not be_empty
		end
	end
	context "create" do
	  	it "should return success and create school if valid params are passed" do
	  	 school_data={:name => 'Anthony', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567890'} 
	  	 expect{
	  	 post :create, :school=>school_data
	  	 }.to change(School, :count).by(1)
 	 		 response.status.should eq 200
		end
		it "should not return success if invalid params are passed" do
			 post :create, :school=>{:name => 'DPS', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '12345'}
			 response.status.should eq 422
			 p JSON.parse(response.body)["error"].should_not be_empty
		end
	 end
	 context "update" do
	  	it "should return success and update the requested school if valid params are passed" do
	  		school1 = FactoryGirl.create(:school,:phone_no=>"8929303030")
	  		expect{
	  			put :update, :id=>school1.id, :school =>{:state => "Maharashtra"}
	  		}.to_not raise_error
	  		response.status.should eq 200		
	  		p JSON.parse(response.body)["state"].should eq "Maharashtra"
	  	end
	  	it "should not return success if invalid id passed" do
	  	 	put :update, :school=>{:name => @school.name,:address => @school.address, 
	  			:city => @school.city, :zipcode => @school.zipcode, :state => @school.state, 
	  			:phone_no => @school.phone_no}, :id=>1
	  		response.status.should eq 422	
	  		p JSON.parse(response.body)["error"].should_not be_empty
	    end
	  	it "should not return success if invalid param were passed" do
	  	 	put :update, :school=>{:name => nil,:address => @school.address, 
	  			:city => @school.city, :zipcode => @school.zipcode, :state => @school.state, 
	  			:phone_no => @school.phone_no}, :id=>@school.id
	  		response.status.should eq 422	
	  		p JSON.parse(response.body)["error"].should_not be_empty
	  	end
	  end
	  context "destroy" do
		it "should destroy the requested school if valid params are passed" do
			delete :destroy, :id=>@school.id
			response.status.should eq 200		
		end
		it "should not return success if invalid id passed" do
	  	delete :destroy, :id=>1
			response.status.should eq 422
	  end
	end
end