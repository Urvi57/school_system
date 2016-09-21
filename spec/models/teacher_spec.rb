require 'rails_helper'
RSpec.describe Teacher, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
  describe Teacher do
  	context 'validations' do
  		["name", "gender", "phone_no","proficiency_subject"].each do |field|
  			it "is invalid if #{field} is not present}" do
  				FactoryGirl.build(:teacher, "#{field}".to_sym =>nil).should_not be_valid
  			end
  			it "validates phone_no length" do
          FactoryGirl.build(:teacher, phone_no: "1234567899").should be_valid
        end
        
  	end
  end
end
end
