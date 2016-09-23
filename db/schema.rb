# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160923104724) do

  create_table "classrooms", force: :cascade do |t|
    t.string   "name",               limit: 255
    t.string   "number_of_students", limit: 255
    t.integer  "school_id",          limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "classrooms_schools", force: :cascade do |t|
    t.integer "classroom_id", limit: 4
    t.integer "school_id",    limit: 4
  end

  create_table "classrooms_students", force: :cascade do |t|
    t.integer "classroom_id", limit: 4
    t.integer "student_id",   limit: 4
  end

  create_table "classrooms_subjects", force: :cascade do |t|
    t.integer "classroom_id", limit: 4
    t.integer "subject_id",   limit: 4
  end

  create_table "classrooms_teachers", force: :cascade do |t|
    t.integer  "classroom_id", limit: 4
    t.integer  "teacher_id",   limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schools", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.text     "address",    limit: 65535
    t.string   "city",       limit: 255
    t.string   "zipcode",    limit: 255
    t.string   "state",      limit: 255
    t.string   "phone_no",   limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schools_students", force: :cascade do |t|
    t.integer "school_id",  limit: 4
    t.integer "student_id", limit: 4
  end

  create_table "schools_subjects", force: :cascade do |t|
    t.integer "school_id",  limit: 4
    t.integer "subject_id", limit: 4
  end

  create_table "students", force: :cascade do |t|
    t.string   "name",         limit: 255
    t.string   "father_name",  limit: 255
    t.string   "mother_name",  limit: 255
    t.string   "phone_no",     limit: 255
    t.text     "address",      limit: 65535
    t.string   "city",         limit: 255
    t.string   "zipcode",      limit: 255
    t.string   "state",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "school_id",    limit: 4
    t.integer  "classroom_id", limit: 4
  end

  create_table "students_subjects", force: :cascade do |t|
    t.integer "student_id", limit: 4
    t.integer "subject_id", limit: 4
  end

  create_table "students_teachers", force: :cascade do |t|
    t.integer "student_id", limit: 4
    t.integer "teacher_id", limit: 4
  end

  create_table "subjects", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "subjects_teachers", force: :cascade do |t|
    t.integer "teacher_id", limit: 4
    t.integer "subject_id", limit: 4
  end

  create_table "teachers", force: :cascade do |t|
    t.string   "name",                limit: 255
    t.string   "proficiency_subject", limit: 255
    t.string   "gender",              limit: 255
    t.string   "phone_no",            limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "school_id",           limit: 4
  end

end
