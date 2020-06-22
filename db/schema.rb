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

ActiveRecord::Schema.define(version: 2020_06_22_192839) do

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "environments", force: :cascade do |t|
    t.string "name", default: "Environment name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "created_by"
    t.string "created_by_name"
  end

  create_table "notes", force: :cascade do |t|
    t.string "title", default: "Note title", null: false
    t.string "description", default: "", null: false
    t.integer "positionX", default: 0, null: false
    t.integer "positionY", default: 65, null: false
    t.boolean "minimized?", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "environment_id", null: false
    t.index ["environment_id"], name: "index_notes_on_environment_id"
  end

  create_table "task_list_items", force: :cascade do |t|
    t.string "description", default: "", null: false
    t.boolean "task_completed?", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "task_list_id", null: false
    t.index ["task_list_id"], name: "index_task_list_items_on_task_list_id"
  end

  create_table "task_lists", force: :cascade do |t|
    t.string "title", default: "Task list title", null: false
    t.integer "positionX", default: 0, null: false
    t.integer "positionY", default: 65, null: false
    t.boolean "minimized?", default: false, null: false
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
    t.string "name", default: "", null: false
    t.string "occupation", default: "", null: false
    t.string "company_name", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "notes", "environments"
  add_foreign_key "task_list_items", "task_lists"
  add_foreign_key "task_lists", "environments"
  add_foreign_key "user_environments", "environments"
  add_foreign_key "user_environments", "users"
end
