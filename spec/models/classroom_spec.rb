require 'rails_helper'
RSpec.describe Classroom, type: :model do
  before(:each) do
      @subject=FactoryGirl.create(:subject)
  end
  describe Classroom do
  	context 'validations' do
  	 ["name", "number_of_students"].each do |field|
  	 it "is invalid if #{field} is not present}" do
  		FactoryGirl.build(:classroom, "#{field}".to_sym =>nil).should_not be_valid
  	end
  	 it "should have many students" do
      FactoryGirl.create(:student,:name=>"Prateek",:father_name=>"Shah",:mother_name=>"Rita",
        :phone_no=>"8210101010",:city=>"Udaipur",:zipcode=>"313002",:state=>"Raj")
      FactoryGirl.create(:student,:name=>"sha",:father_name=>"Shah",:mother_name=>"Rita",
        :phone_no=>"8210101010",:city=>"Udaipur",:zipcode=>"313002",:state=>"Raj").should be_valid
    end
  end
    context "associations" do
      it "should return school details"do
        classroom = FactoryGirl.create(:classroom,:name => 'First', :number_of_students => '10')
        classroom.school_details
      end
      it "should return subject details"do
        classroom = FactoryGirl.create(:classroom,:name => 'First', :number_of_students => '10', :subject_ids=>@subject.id)
        classroom.subject_details==@subject
      end
    end
  end
end
end
