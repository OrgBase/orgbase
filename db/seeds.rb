# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

midhun = User.create!(name: 'Midhun Dandamudi', email: 'midhundandamudi@gmail.com', password: 'password1', admin: true)
company = Company.create!(name: 'Triba',
                          icon_url: 'http://localhost:3007/packs/media/stylesheets/img/orgbase-logo-color-a9e9024512d1c3ee9b24b235dfe27346.svg',
                          slug: 'triba',
                          country: 'USA',
                          website: 'http://localhost:3007/')

Employee.create!(user: midhun,
                 company: company,
                 slug: 'midhun',
                 title: 'Co Founder')

CompanyParticipant.create!(user: midhun,
                           company: company,
                           role: 'admin')

teams = [Team.create!(company: company,
                      name: 'Engineering',
                      slug: 'engineering'),
         Team.create!(company: company,
                      name: 'Product',
                      slug: 'product'),
         Team.create!(company: company,
                      name: 'Design',
                      slug: 'design'),
         Team.create!(company: company,
                      name: 'HR and People Ops',
                      slug: 'hr')
]

30.times.map do
  fake_name = Faker::Name.unique.name
  user = User.create!(name: fake_name,
                      email: Faker::Internet.safe_email(name: fake_name),
                      password: SecureRandom.alphanumeric(8))
  team_idx = [0, 1, 2, 3].sample

  employee = Employee.create!(user: user,
                              company: company,
                              slug: fake_name.parameterize,
                              title: Faker::Company.profession.titleize)
  TeamMember.create!(team: teams[team_idx],
                     employee: employee)

end
