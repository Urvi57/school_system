require 'rails_helper'
RSpec.describe Subject, type: :model do
  describe Subject do
  	context 'validations' do
  		["name"].each do |field|
  			it "is invalid if #{field} is not present}" do
  				FactoryGirl.build(:subject, "#{field}".to_sym =>nil).should_not be_valid
  			end	
  		end
  	end
end
end