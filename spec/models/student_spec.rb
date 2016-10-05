require 'rails_helper'
RSpec.describe Student, type: :model do
  describe Student do
    before(:each) do
      @subject=FactoryGirl.create(:subject)
    end
  	context 'validations' do
  		["name", "father_name", "mother_name","phone_no","address","city","zipcode","state"].each do |field|
  			it "is invalid if #{field} is not present}" do
  				FactoryGirl.build(:student, "#{field}".to_sym =>nil).should_not be_valid
  			end
  			it "validates phone_no length" do
          FactoryGirl.build(:student, phone_no: "1234567899").should be_valid
        end
  	end
    context "associations" do
    it "should return school details"do
      student = FactoryGirl.create(:student,:name => "Jaya",:father_name=>"Hitesh",:mother_name=>"Maya", :phone_no=>"8234567890",:address=>"Sector-11",:city=>"Udaipur",:zipcode=>"313002",:state=>"Rajasthan")
      student.school_details
    end
    it "should return classroom details"do
      student = FactoryGirl.create(:student,:name => "Jaya",:father_name=>"Hitesh",:mother_name=>"Maya", :phone_no=>"8234567890",:address=>"Sector-11",:city=>"Udaipur",:zipcode=>"313002",:state=>"Rajasthan", :subject_ids=>@subject.id)
      student.classroom_details
    end
    it "should return subject details"do
      student = FactoryGirl.create(:student,:name => "Jaya",:father_name=>"Hitesh",:mother_name=>"Maya", :phone_no=>"8234567890",:address=>"Sector-11",:city=>"Udaipur",:zipcode=>"313002",:state=>"Rajasthan", :subject_ids=>@subject.id)
      student.subject_details==@subject
    end
  end
  end
end
end