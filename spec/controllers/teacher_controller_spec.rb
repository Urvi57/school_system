require 'rails_helper'

RSpec.describe TeachersController, type: :controller do
	before(:each) do
		@school=FactoryGirl.create(:school, :name => 'Anthony', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567890')
		request.env["HTTP_ACCEPT"]='application/json'
	end
	context "index" do
		it "should list of all teachers in the system" do
			teacher = FactoryGirl.create(:teacher)
			get :index
			response.status.should eq 200
		end
	end
	context "show" do
		it "should return success and return teacher if valid id is passed " do
			teacher = FactoryGirl.create(:teacher)
			get :show ,:id=>teacher.id
			response.status.should eq 200
		end
		it "should not return success if invalid id is passed" do
			teacher = FactoryGirl.create(:teacher)
			get :show ,:id=>1
			response.status.should eq 422
		end
	end
	 context "new" do
	 	it "should create new teacher" do
	 		teacher =FactoryGirl.create(:teacher)
	 		get :new
	 		response.status.should eq 200
	 	end
	 end
	 context "edit" do
		it "should edit the requested teacher" do
			teacher =FactoryGirl.create(:teacher)
			get :edit, :id=>teacher.id
			response.status.should eq 200
		end
	end
	context "create" do
	  	it "should return success and create teacher if valid params are passed" do
	  		 post :create, :teacher=>{:name => 'Amit',  :gender => 'Male', :phone_no => '1234567890', :school_id => @school.id }
 	 		 response.status.should eq 200
		
		 end
		it "should not return success if invalid params are passed" do
			 post :create, :teacher=>{:name => 'Amit',  :gender => 'Male', :phone_no => '123456789', :school_id => @school.id }
 		 		 response.status.should eq 422
		end
	 end
	  context "update" do
	  	it "should return success and update the requested teacher if valid params are passed" do
	  		teacher=FactoryGirl.create(:teacher)
	  		put :update, :teacher=>{:name => teacher.name,  :gender => teacher.gender, :phone_no => teacher.phone_no, :school_id => @school.id}, :id=>teacher.id
	  		response.status.should eq 200		
	  	end
	  	 it "should not return success if invalid id passed" do
	   	 	teacher=FactoryGirl.create(:teacher)
	   		put :update, :teacher=>{:name => teacher.name,  :gender => teacher.gender, :phone_no => teacher.phone_no, :school_id => @school.id}, :id=>1
	   		response.status.should eq 422	
	   	 end
	   	 it "should not return success if invalid params were passed" do
	   	 	teacher=FactoryGirl.create(:teacher)
	   		put :update, :teacher=>{:name => nil,  :gender => teacher.gender, :phone_no => teacher.phone_no, :school_id => @school.id}, :id=>teacher.id
	   		response.status.should eq 422	
	   	 end
	  end
	  context "destroy" do
		it "should destroy the requested teacher if valid params are passed" do
			teacher=FactoryGirl.create(:teacher)
			delete :destroy, :id=>teacher.id
			response.status.should eq 200		
		end
		 it "should not return success if invalid params were passed" do
	  	 	teacher=FactoryGirl.create(:teacher)
			delete :destroy, :id=>1000
			response.status.should eq 422
	  	  end
		end
		context "GET filtered_index"do
    		it"should return all teachers associated with school id"do
      			get :filtered_index ,:school_id=>@school_id
     
      			response.status.should eq 200
    		end
		    # it"should not return students associated with classroom id is not valid"do
		      
		    #    get :filtered_index 
		    #    response.status.should eq 422
		    # end
  end
end