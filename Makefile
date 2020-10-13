setup:
	bundle install
	yarn
	bin/rails db:prepare

up:
	@foreman start -p 3007 --procfile Procfile.dev
