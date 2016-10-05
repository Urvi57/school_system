require 'rails_helper'

RSpec.describe SubjectsController, type: :controller do
	before(:each) do
		request.env["HTTP_ACCEPT"]='application/json'
		@subject = FactoryGirl.create(:subject)
	end
	context "index" do
		it "should list of all subjects in the system" do
			subject1 = FactoryGirl.create(:subject,:name=>"Science")
			get :index
			response.status.should eq 200
			assigns(:subjects).should eq([@subject,subject1])
		end
	end
	context "show" do
			it "should return success and return subject if valid id is passed " do
				subject1 = FactoryGirl.create(:subject,:name=>"Science")
				get :show ,:id=>subject1.id
				response.status.should eq 200
				JSON.parse(response.body)["id"].should eq subject1.id
			end
			it "should not return success if invalid id is passed" do
				get :show ,:id=>1
				response.status.should eq 422
				JSON.parse(response.body)["error"].should_not be_empty
			end
		end
	context "create" do
	  it "should return success and create subject if valid params are passed" do
	  	subject_data={:name=>"Science"}
	  	expect{
	  		post :create, :subject=>subject_data
	  	}.to change(Subject, :count).by(1)
 	 		response.status.should eq 200
		end
		it "should not return success if invalid params are passed" do
			 post :create
 	 		 response.status.should eq 422
 	 		 p JSON.parse(response.body)["error"].should_not be_empty
		end
	 end
	 context "update" do
	  	it "should return success and update the requested subject if valid params are passed" do
	  		subject1 = FactoryGirl.create(:subject,:name=>"Science")
	  		expect{
	  		put :update, :id=>subject1.id, :subject =>{:name => 'Social'}
	  		}.to_not raise_error
	  		response.status.should eq 200		
	  		p JSON.parse(response.body)["name"].should eq "Social"
	  	end
	  	 it "should not return success if invalid params were passed" do
	  		put :update, :id=>1, :subject=>{:name => @subject.name}
	  		response.status.should eq 422		
	  		p JSON.parse(response.body)["error"].should_not be_empty
	  	end
	  end
	  context "destroy" do
		it "should destroy the requested subject if valid params are passed" do
			delete :destroy, :id=>@subject.id
			response.status.should eq 200	
			p JSON.parse(response.body)["id"].should eq @subject.id	
		end
		 it "should not return success if invalid params were passed" do
	  	delete :destroy, :id=>1
			response.status.should eq 422
			p JSON.parse(response.body)["error"].should_not be_empty	
	  	end
	end
	
end