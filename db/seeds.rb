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
test_user = User.create!(name: 'Test User', email: 'test@jally.co', password: 'hodor007', admin: false)
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

Employee.create!(user: test_user,
                 company: company,
                 slug: 'test',
                 title: 'Test User')

wyr = Game.create!(name: 'Would you rather...',
             game_type: 'ice-breaker',
             instructions: 'Take it in turns to reveal which option you’d choose, and why')

wyr_variants = ["Would you rather work 80 hours one week and have the next week off or work 40 hours both weeks, spread across seven days including weekends?",
            "Would you rather do something you love and make just enough money to get by or do something you hate but make millions?",
            "Would you rather live in a big city or a small town?",
            "Would you rather get paid your entire salary plus benefits all at once for the year or get paid little by little throughout the year?",
            "Would you rather run a country or a business?",
            "Would you rather eat the oldest thing in your fridge or do a deep clean of your neighbour’s bathroom?"]

wyr_variants.each do |v|
  GameVariant.create!(game: wyr,
                      variant: v)
end

ddtq = Game.create!(name: 'Don’t dodge the question!',
                   game_type: 'ice-breaker',
                   instructions: 'Take it in turns to share your true, unfiltered answers to the question shown')

ddtq_variants = ["What’s the best trip (travel) you ever had?",
                "What’s your favorite thing about the place you live?",
                "If you could live anywhere in the world for a year, where would it be?",
                "Where is your favorite vacation spot?",
                "What’s your favorite seat on an airplane?",
                "Have you ever been on a cruise?"]

ddtq_variants.each do |v|
  GameVariant.create!(game: ddtq,
                      variant: v)
end

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
