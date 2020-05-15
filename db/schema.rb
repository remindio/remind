# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_15_221714) do

  create_table "environments", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "created_by"
    t.string "created_by_name"
  end

  create_table "notes", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "environment_id", null: false
    t.index ["environment_id"], name: "index_notes_on_environment_id"
  end

  create_table "task_list_items", force: :cascade do |t|
    t.string "description"
    t.boolean "task_completed?"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "task_list_id", null: false
    t.index ["task_list_id"], name: "index_task_list_items_on_task_list_id"
  end

  create_table "task_lists", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "environment_id", null: false
    t.index ["environment_id"], name: "index_task_lists_on_environment_id"
  end

  create_table "user_environments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "environment_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["environment_id"], name: "index_user_environments_on_environment_id"
    t.index ["user_id"], name: "index_user_environments_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "profile_url"
    t.string "company_name"
    t.string "occupation"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "notes", "environments"
  add_foreign_key "task_list_items", "task_lists"
  add_foreign_key "task_lists", "environments"
  add_foreign_key "user_environments", "environments"
  add_foreign_key "user_environments", "users"
end
