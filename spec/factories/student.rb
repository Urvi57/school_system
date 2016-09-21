FactoryGirl.define do
  factory :student do
    name "Amit"
    father_name "Jai"
    mother_name "Mamta"
    phone_no "9898989898"
    address "Hiran Magri"
    city "Udaipur"
    zipcode "313001"
    state "Rajasthan"
    before(:create) do |student|
       
        student.school_id=FactoryGirl.create(:school).id
        student.classroom_id=FactoryGirl.create(:classroom,:name=>'Six',:number_of_students=>'5',:school_id=>student.school_id).id
        
    end
    
  end
end