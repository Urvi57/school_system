require 'rails_helper'

RSpec.describe Student, type: :model do
  describe Student do
  	context 'validations' do
  		["name", "father_name", "mother_name","phone_no","address","city","zipcode","state"].each do |field|
  			it "is invalid if #{field} is not present}" do
  				FactoryGirl.build(:student, "#{field}".to_sym =>nil).should_not be_valid
  			end
  			it "validates phone_no length" do
          FactoryGirl.build(:student, phone_no: "1234567899").should be_valid
        end
        
  	end
  end
end
end