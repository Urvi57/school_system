FactoryGirl.define do
  factory :classroom do
    name "First"
    number_of_students "10"
    school_id {FactoryGirl.create(:school).id}
   
  end
end