require 'rails_helper'
RSpec.describe Teacher, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
  describe Teacher do
    before(:each) do
      @subject=FactoryGirl.create(:subject)
    end
  	context 'validations' do
  		["name", "gender", "phone_no"].each do |field|
  			it "is invalid if #{field} is not present}" do
  				FactoryGirl.build(:teacher, "#{field}".to_sym =>nil).should_not be_valid
  			end
  			it "validates phone_no length" do
          FactoryGirl.build(:teacher, phone_no: "1234567899").should be_valid
        end
    end
    context "associations" do
      it "should return school details"do
        teacher = FactoryGirl.create(:teacher,:name => 'Amit',  :gender => 'M', :phone_no => '1234567892',:subject_ids=>@subject.id)
        teacher.school_details
      end
      it "should return classroom details"do
        teacher = FactoryGirl.create(:teacher,:name => 'Amit',  :gender => 'M', :phone_no => '1234567892', :subject_ids=>@subject.id)
        teacher.classroom_details
      end
      it "should return subject details"do
        teacher = FactoryGirl.create(:teacher,:name => 'Amit',  :gender => 'M', :phone_no => '1234567892', :subject_ids=>@subject.id)
        teacher.subject_details==@subject
      end
    end
  end
 end
end
