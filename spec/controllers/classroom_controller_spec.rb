require 'rails_helper'

RSpec.describe ClassroomsController, type: :controller do
	before(:each) do
		@school=FactoryGirl.create(:school, :name => 'Anthony', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567890')
		@school1=FactoryGirl.create(:school, :name => 'Alok', :address => 'Hiran Magri', :city => 'Udaipur', :zipcode => '313002', :state => 'Rajasthan', :phone_no => '1234567891')
		@classroom = FactoryGirl.create(:classroom)
		request.env["HTTP_ACCEPT"]='application/json'
		
	end
	context "index" do
		it "should list of all classroom in the system" do
			classroom1 = FactoryGirl.create(:classroom,:name=>"St. Marry",:school_id=>@school1.id)
			get :index
			response.status.should eq 200
			assigns(:classrooms).should eq([@classroom,classroom1])
		end
	end
	context "show" do
		it "should return success and return classroom if valid id is passed " do
			classroom1 = FactoryGirl.create(:classroom,:name=>"Eleven",:school_id=>@school1.id)
			get :show ,:id=>classroom1.id
			response.status.should eq 200
			JSON.parse(response.body)["id"].should eq classroom1.id
		end
		it "should not return success if invalid id is passed" do
			get :show ,:id=>1
			response.status.should eq 422
			JSON.parse(response.body)["error"].should_not be_empty
		end
	end
	context "create" do
	  it "should return success and create classroom if valid params are passed" do
	  	classroom_data={:name => 'Sixth', :number_of_students => '10', :school_id => @school.id } 
	  	expect{
	  	 	post :create, :classroom=>classroom_data
	  	}.to change(Classroom, :count).by(1)
 	 		response.status.should eq 200
		 	end
		it "should not return success if invalid params are passed" do
			post :create 
			response.status.should eq 422
 		 	p JSON.parse(response.body)["error"].should_not be_empty
		end
	 end
	context "update" do
	  it "should return success and update the requested classroom if valid params are passed" do
	  	classroom1 = FactoryGirl.create(:classroom,:name=>"Eleven",:school_id=>@school1.id)
	  	expect{
	  		put :update, :id=>classroom1.id, :classroom =>{:number_of_students => '25'}
	  	}.to_not raise_error
	  	response.status.should eq 200		
	  	p JSON.parse(response.body)["number_of_students"].should eq '25'
	  end
	  it "should not return success if invalid params were passed" do
	  	put :update, :classroom=>{:name => nil, :number_of_students => @classroom.number_of_students, :school_id => @school.id}, :id=>@classroom.id
	    response.status.should eq 422	
	    p JSON.parse(response.body)["error"].should_not be_empty
	  end
	  it "should not return success if invalid id passed" do
	  	put :update, :classroom=>{:name => @classroom.name, :number_of_students => @classroom.number_of_students, :school_id => @school.id}, :id=>1
	    response.status.should eq 422	
	    p JSON.parse(response.body)["error"].should_not be_empty
	  end
	end
	context "destroy" do
		it "should destroy the requested classroom if valid params are passed" do
		delete :destroy, :id=>@classroom.id
		response.status.should eq 200		
		p JSON.parse(response.body)["id"].should eq @classroom.id
		end
	 	it "should not return success if invalid params were passed" do
	 	delete :destroy, :id=>1
	 	response.status.should eq 422
	 	p JSON.parse(response.body)["error"].should_not be_empty
	 	end
	end
	context "GET filtered_index"do
    it"should return all classrooms associated with school id"do
    	get :filtered_index ,:school_id=>@school_id
 			response.status.should eq 200
    end
		# it"should not return students associated with classroom id is not valid"do
		#    get :filtered_index 
		#    response.status.should eq 422
		# end
	end
	context "GET filtered_index"do
    it"should return all classrooms associated with classroom id"do
    	get :filtered_index ,:id=>@classroom.id
 			response.status.should eq 200
    end
		# it"should not return students associated with classroom id is not valid"do
		#    get :filtered_index 
		#    response.status.should eq 422
		# end
	end
end