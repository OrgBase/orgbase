# Jally :fire: :fire: :fire:

#### Setup instructions
Make sure you have `ruby 2.6.5` and postgres installed.

1. `git clone git@github.com:OrgBase/orgbase.git`
2. `cd orgbase`
3. Ask someone on the team for master.key and production.key files and add them to the repo. NEVER push them to git or anywhere. They should only live on your local machine.
3. `bundle install`
4. `yarn`
5. `rails db:setup`
6. `rails db:migrate`
7. `openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt`
8. `make up`

Happy coding!
