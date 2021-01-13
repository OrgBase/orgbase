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

ActiveRecord::Schema.define(version: 2021_01_12_160623) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.string "name", null: false
    t.string "icon_url"
    t.string "website"
    t.string "country"
    t.string "slug", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "company_email_domains", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.string "domain"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_company_email_domains_on_company_id"
  end

  create_table "company_participants", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "company_id", null: false
    t.string "role", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_company_participants_on_company_id"
    t.index ["user_id"], name: "index_company_participants_on_user_id"
  end

  create_table "employees", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "company_id", null: false
    t.string "slug", null: false
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_employees_on_company_id"
    t.index ["user_id"], name: "index_employees_on_user_id"
  end

  create_table "game_variants", force: :cascade do |t|
    t.bigint "game_id", null: false
    t.string "variant"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_game_variants_on_game_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "name"
    t.string "game_type"
    t.string "instructions"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "jally_session_settings", force: :cascade do |t|
    t.bigint "jally_session_id", null: false
    t.integer "session_duration_seconds"
    t.integer "room_capacity"
    t.integer "cut_off_seconds"
    t.datetime "scheduled_at"
    t.boolean "recurring"
    t.integer "frequency_length"
    t.string "frequency_unit"
    t.boolean "party"
    t.integer "switch_after_seconds"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["jally_session_id"], name: "index_jally_session_settings_on_jally_session_id"
  end

  create_table "jally_sessions", force: :cascade do |t|
    t.text "slug"
    t.bigint "company_id", null: false
    t.bigint "team_id"
    t.bigint "created_by_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.bigint "starting_game_id"
    t.index ["company_id"], name: "index_jally_sessions_on_company_id"
    t.index ["created_by_id"], name: "index_jally_sessions_on_created_by_id"
    t.index ["slug"], name: "index_jally_sessions_on_slug"
    t.index ["starting_game_id"], name: "index_jally_sessions_on_starting_game_id"
    t.index ["team_id"], name: "index_jally_sessions_on_team_id"
  end

  create_table "room_participants", force: :cascade do |t|
    t.bigint "room_id"
    t.bigint "employee_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["employee_id"], name: "index_room_participants_on_employee_id"
    t.index ["room_id"], name: "index_room_participants_on_room_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.string "slug"
    t.integer "capacity"
    t.string "panel_type"
    t.bigint "panel_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "company_id", null: false
    t.bigint "jally_session_id"
    t.decimal "random_fraction", default: "0.0"
    t.index ["company_id"], name: "index_rooms_on_company_id"
    t.index ["jally_session_id"], name: "index_rooms_on_jally_session_id"
    t.index ["slug"], name: "index_rooms_on_slug", unique: true
  end

  create_table "session_participants", force: :cascade do |t|
    t.bigint "employee_id", null: false
    t.bigint "jally_session_id", null: false
    t.bigint "room_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["employee_id"], name: "index_session_participants_on_employee_id"
    t.index ["jally_session_id"], name: "index_session_participants_on_jally_session_id"
    t.index ["room_id"], name: "index_session_participants_on_room_id"
  end

  create_table "team_members", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.bigint "employee_id", null: false
    t.string "role"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["employee_id"], name: "index_team_members_on_employee_id"
    t.index ["team_id"], name: "index_team_members_on_team_id"
  end

  create_table "teams", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.string "name"
    t.string "slug", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_teams_on_company_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "uid"
    t.string "provider"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "admin"
    t.string "sign_in_token"
    t.datetime "sign_in_token_sent_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "company_email_domains", "companies"
  add_foreign_key "company_participants", "companies"
  add_foreign_key "company_participants", "users"
  add_foreign_key "employees", "companies"
  add_foreign_key "employees", "users"
  add_foreign_key "game_variants", "games"
  add_foreign_key "jally_session_settings", "jally_sessions"
  add_foreign_key "jally_sessions", "companies"
  add_foreign_key "jally_sessions", "teams"
  add_foreign_key "jally_sessions", "users", column: "created_by_id"
  add_foreign_key "rooms", "companies"
  add_foreign_key "rooms", "jally_sessions"
  add_foreign_key "session_participants", "employees"
  add_foreign_key "session_participants", "jally_sessions"
  add_foreign_key "session_participants", "rooms"
  add_foreign_key "team_members", "employees"
  add_foreign_key "team_members", "teams"
  add_foreign_key "teams", "companies"
end
