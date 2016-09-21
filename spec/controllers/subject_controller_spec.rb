require 'rails_helper'

RSpec.describe SubjectsController, type: :controller do
	context "index" do
		it "should list of all subjects in the system" do
			subject = FactoryGirl.create(:subject)
			get :index
			response.status.should eq 200
		end
	end
	context "show" do
			it "should return success and return subject if valid id is passed " do
				subject = FactoryGirl.create(:subject)
				get :show ,:id=>subject.id
				response.status.should eq 200
			end
			it "should not return success if invalid id is passed" do
				subject = FactoryGirl.create(:subject)
				get :show ,:id=>1
				response.status.should eq 422
			end
		end
	context "new" do
	 	it "should create new subject" do
	 		subject =FactoryGirl.create(:subject)
	 		get :new
	 		response.status.should eq 200
	 	end
	 end
	 context "edit" do
		it "should edit the requested subject" do
			subject =FactoryGirl.create(:subject)
			get :edit, :id=>subject.id
			response.status.should eq 200
		end
	end
	context "create" do
	  	it "should return success and create subject if valid params are passed" do
	  		 post :create, :subject=>{:name => 'Maths'}
 	 		 response.status.should eq 200
		
		 end
		it "should not return success if invalid params are passed" do
			 post :create, :subject=>{:name => nil}
 	 		 response.status.should eq 422
		end
	 end
	 context "update" do
	  	it "should return success and update the requested subject if valid params are passed" do
	  		subject=FactoryGirl.create(:subject)
	  		put :update, :subject=>{:name => subject.name}, :id=>subject.id
	  		response.status.should eq 200		
	  	end
	  	 it "should not return success if invalid params were passed" do
	  	 	subject=FactoryGirl.create(:subject)
	  		put :update, :subject=>{:name => subject.name}, :id=>1
	  		response.status.should eq 422		
	  	end
	  	it "should not return success if invalid params were passed" do
	  	 	subject=FactoryGirl.create(:subject)
	  		put :update, :subject=>{:name => nil}, :id=>subject.id
	  		response.status.should eq 422		
	  	end
	  end
	  context "destroy" do
		it "should destroy the requested subject if valid params are passed" do
			subject=FactoryGirl.create(:subject)
			delete :destroy, :id=>subject.id
			response.status.should eq 200		
		end
		 it "should not return success if invalid params were passed" do
	  	 	subject=FactoryGirl.create(:subject)
			delete :destroy, :id=>1
			response.status.should eq 422
	  	  end
	end
end