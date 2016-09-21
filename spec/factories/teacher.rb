FactoryGirl.define do
  factory :teacher do
    name "Amit"
    proficiency_subject "Hindi"
    gender "M"
    phone_no "1234567890"
    school_id {FactoryGirl.create(:school).id}
  end
end