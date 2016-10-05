require 'rails_helper'

RSpec.describe TeachersController, type: :controller do
	before(:each) do
		@school=FactoryGirl.create(:school, :name => 'Anthony', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567890')
		@school1=FactoryGirl.create(:school, :name => 'Alok', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567891')
		@teacher = FactoryGirl.create(:teacher)
		request.env["HTTP_ACCEPT"]='application/json'
	end
	context "index" do
		it "should list of all teachers in the system" do
			teacher1 = FactoryGirl.create(:teacher,:phone_no=>"8348480909",:school_id=>@school1.id)
			get :index
			response.status.should eq 200
			assigns(:teachers).should eq([@teacher,teacher1])
		end
	end
	context "show" do
		it "should return success and return teacher if valid id is passed " do
			teacher1 = FactoryGirl.create(:teacher,:phone_no=>"8348480909",:school_id=>@school1.id)
			get :show ,:id=>teacher1.id
			response.status.should eq 200
			JSON.parse(response.body)["id"].should eq teacher1.id
		end
		it "should not return success if invalid id is passed" do
			get :show ,:id=>1
			response.status.should eq 422
			JSON.parse(response.body)["error"].should_not be_empty
		end
	end
	context "create" do
	  it "should return success and create teacher if valid params are passed" do
	  	teacher_data={:name => "Ritu",  :gender => "Female", :phone_no => "7728309089",:school_id=>@school1.id}
	  	expect{
	  	 	post :create, :teacher=>teacher_data
	  	}.to change(Teacher, :count).by(1)
 	 	  response.status.should eq 200
		end
		it "should not return success if invalid params are passed" do
			post :create, :teacher=>{:name => 'Amit',  :gender => 'Male', :phone_no => '123456789', :school_id => @school.id }
 		 	response.status.should eq 422
 		 	p JSON.parse(response.body)["error"].should_not be_empty
 		end
	end
	context "update" do
	  it "should return success and update the requested teacher if valid params are passed" do
	  		teacher1 = FactoryGirl.create(:teacher,:name => "Ritu",  :gender => "Female", :phone_no => "7728309089", :school_id => @school.id)
	  		expect{
	  		put :update, :id=>teacher1.id, :teacher =>{:phone_no => "9049304025"}
	  		}.to_not raise_error
	  		response.status.should eq 200	
	  		p JSON.parse(response.body)["phone_no"].should eq "9049304025"	
	  end
	  it "should not return success if invalid id passed" do
	   	 	put :update, :teacher=>{:name => @teacher.name,  :gender => @teacher.gender, :phone_no => @teacher.phone_no, :school_id => @school.id}, :id=>1
	   		response.status.should eq 422	
	   		p JSON.parse(response.body)["error"].should_not be_empty
	  end
	  it "should not return success if invalid params were passed" do
	   	 	put :update, :teacher=>{:name => nil,  :gender => @teacher.gender, :phone_no => @teacher.phone_no, :school_id => @school.id}, :id=>@teacher.id
	   		response.status.should eq 422	
	   		p JSON.parse(response.body)["error"].should_not be_empty
	  end
	end
	context "destroy" do
		it "should destroy the requested teacher if valid params are passed" do
			delete :destroy, :id=>@teacher.id
			response.status.should eq 200		
		end
		it "should not return success if invalid params were passed" do
	  	delete :destroy, :id=>1000
			response.status.should eq 422
			p JSON.parse(response.body)["error"].should_not be_empty
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