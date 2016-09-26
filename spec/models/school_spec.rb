require 'rails_helper'

RSpec.describe School, type: :model do
  describe School do
  	context 'validations' do
  		["name", "address", "city", "zipcode", "state", "phone_no"].each do |field|
  			it "is invalid if #{field} is not present}" do
  				FactoryGirl.build(:school, "#{field}".to_sym =>nil).should_not be_valid
  			end
  			it "validates phone_no length" do
    			
    			FactoryGirl.build(:school, phone_no: "1234567899").should be_valid
  			end
        
        it "should have many classrooms" do
          school=FactoryGirl.create(:school)
          FactoryGirl.create(:classroom,:name=>"HJK",:number_of_students=>"5",:school_id=>school.id).should be_valid
         
        end
        it "should have many teachers" do
          school=FactoryGirl.create(:school)
          
          FactoryGirl.create(:teacher,:name=>"Saran",:phone_no=>"8210101010",:proficiency_subject=>"BNM",:school_id=>school.id).should be_valid
         
        end
        it "should have many students" do
          # school=FactoryGirl.create(:school)
          #:name, :father_name, :mother_name, :phone_no, :address, :city, :zipcode, :state, presence: true
          FactoryGirl.create(:student,:name=>"sha",:father_name=>"Shah",:mother_name=>"Rita",
            :phone_no=>"8210101010",:city=>"Udaipur",:zipcode=>"313002",:state=>"Raj").should be_valid
         
        end
  	end
  end
end
end
