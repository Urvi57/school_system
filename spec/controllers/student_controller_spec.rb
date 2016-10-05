require 'rails_helper'

RSpec.describe StudentsController, type: :controller do
	 before(:each) do
	  @school=FactoryGirl.create(:school, :name => 'Anthony', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567891')
		@classroom=FactoryGirl.create(:classroom, :name => 'First', :number_of_students => '20', :school_id => @school.id)	
		@school1=FactoryGirl.create(:school, :name => 'DPS', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567899')
		request.env["HTTP_ACCEPT"]='application/json'
	end
	context "index" do
		it "should list of all students in the system" do
			student1 = FactoryGirl.create(:student,:name=>"Sanjay",:school_id => @school.id)
			student2 = FactoryGirl.create(:student,:name=>"Ankit",:school_id => @school1.id )
			get :index
			response.status.should eq 200
			assigns(:students).should eq([student1,student2])
		end
	end
	context "show" do
		it "should return success and return student if valid id is passed " do
			student1 = FactoryGirl.create(:student,:name=>"Sanjay",:school_id => @school.id, :classroom_id => @classroom.id )
			get :show ,:id=>student1.id
			response.status.should eq 200
			JSON.parse(response.body)["id"].should eq student1.id
		end
		it "should not return success if invalid id is passed" do
			get :show ,:id=>1
			response.status.should eq 422
			JSON.parse(response.body)["error"].should_not be_empty
		end
	end
	context "create" do
	  it "should return success and create student if valid params are passed" do
	  	student_data={:name => 'Sanjay', :father_name=>'Mehul', :mother_name=>'Meeta',:phone_no=>'9100001010', :address=>'Sector', :city=>'Udaipur', :zipcode=>'123456', :state=>'Raj',:school_id => @school.id, :classroom_id => @classroom.id }
	  	expect{
	  	 	post :create, :student=>student_data
	  	}.to change(Student, :count).by(1)
 	 		response.status.should eq 200
		end
		it "should not return success if invalid params are passed" do
			post :create 
 	 		response.status.should eq 422
 	 		p JSON.parse(response.body)["error"].should_not be_empty
		end
	end
	context "update" do
	  it "should return success and update the requested student if valid params are passed" do
	  	@student4 = FactoryGirl.create(:student,:school_id=>@school1.id,:classroom_id=>@classroom.id)
	  	p @student4
	  	put :update,:id=>@student4.id, :student =>{:name=>"Shreya"}
	    response.status.should eq 200	
	  	p JSON.parse(response.body)["name"].should eq "Shreya"
	  end
	  it "should not return success if invalid id is passed" do
	  	@student4 = FactoryGirl.create(:student,:school_id=>@school1.id,:classroom_id=>@classroom.id)
	  	put :update,:id=>@student4.id+1
	  	response.status.should eq 422	
	    p JSON.parse(response.body)["error"].should_not be_empty
	  end
	end
	context "destroy" do
		it "should destroy the requested student if valid id passed" do
			student = FactoryGirl.create(:student)
			delete :destroy, :id=>student.id
			response.status.should eq 200		
			p JSON.parse(response.body)["id"].should eq student.id
		end
	  it "should not return success if invalid id passed" do
	  	student = FactoryGirl.create(:student)
	   	delete :destroy, :id=>student.id+1
	 		response.status.should eq 422
	 		p JSON.parse(response.body)["error"].should_not be_empty
	  end
	end
	context "GET filtered_index"do
    it"should return all students associated with classroom id"do
      get :filtered_index ,:classroom_id=>@classroom_id
	    response.status.should eq 200
    end
    # it"should not return students associated with classroom id is not valid"do
    #    get :filtered_index 
    #    response.status.should eq 422
    # end
  end
end