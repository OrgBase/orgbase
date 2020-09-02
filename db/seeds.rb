# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

midhun = User.create!(name: 'Midhun Dandamudi', email: 'midhun@jally.co', password: 'hodor007', admin: true)
alex = User.create!(name: 'Alex Zed', email: 'alex@jally.co', password: 'hodor007', admin: true)
company = Company.create!(name: 'Jally',
                          icon_url: '',
                          slug: 'jally',
                          country: 'USA',
                          website: 'http://localhost:3007/')

Employee.create!(user: midhun,
                 company: company,
                 slug: 'midhun',
                 title: 'Co Founder')

Employee.create!(user: alex,
                 company: company,
                 slug: 'alex',
                 title: 'Co Founder')

CompanyParticipant.create!(user: midhun,
                           company: company,
                           role: 'admin')

CompanyParticipant.create!(user: alex,
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
