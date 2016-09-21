require 'rails_helper'
RSpec.describe Classroom, type: :model do
  describe Classroom do
  	context 'validations' do
  		["name", "number_of_students"].each do |field|
  			it "is invalid if #{field} is not present}" do
  				FactoryGirl.build(:classroom, "#{field}".to_sym =>nil).should_not be_valid
  			end
  			
        # it "should have many students" do
        #   classroom=FactoryGirl.create(:classroom)
        #   #:name, :father_name, :mother_name, :phone_no, :address, :city, :zipcode, :state, presence: true
        #   FactoryGirl.create(:student,:name=>"sha",:father_name=>"Shah",:mother_name=>"Rita",
        #     :phone_no=>"8210101010",:city=>"Udaipur",:zipcode=>"313002",:state=>"Raj",:classroom_id=>classroom.id).should be_valid
         
        # end
  	end
  end
end
end
