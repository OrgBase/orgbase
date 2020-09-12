setup:
	bundle install
	yarn
	bin/rails db:prepare

up:
	rails s -b 'ssl://localhost:3007?key=localhost.key&cert=localhost.crt'
