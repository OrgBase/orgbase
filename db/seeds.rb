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

test1 = User.create!(name: 'Test1', email: 'midhun+1@jally.co', password: 'hodor007', admin: true)
test2 = User.create!(name: 'Test2', email: 'midhun+2@jally.co', password: 'hodor007', admin: true)
test3 = User.create!(name: 'Test3', email: 'midhun+3@jally.co', password: 'hodor007', admin: true)
test4 = User.create!(name: 'Test4', email: 'midhun+4@jally.co', password: 'hodor007', admin: true)
test5 = User.create!(name: 'Test5', email: 'midhun+5@jally.co', password: 'hodor007', admin: true)
test6 = User.create!(name: 'Test6', email: 'midhun+6@jally.co', password: 'hodor007', admin: true)
test7 = User.create!(name: 'Test7', email: 'midhun+7@jally.co', password: 'hodor007', admin: true)

Employee.create!(user: test1,
                 company: company,
                 slug: 'test1',
                 title: 'Test User')
Employee.create!(user: test2,
                 company: company,
                 slug: 'test2',
                 title: 'Test User')
Employee.create!(user: test3,
                 company: company,
                 slug: 'test3',
                 title: 'Test User')
Employee.create!(user: test4,
                 company: company,
                 slug: 'test4',
                 title: 'Test User')
Employee.create!(user: test5,
                 company: company,
                 slug: 'test5',
                 title: 'Test User')
Employee.create!(user: test6,
                 company: company,
                 slug: 'test6',
                 title: 'Test User')
Employee.create!(user: test7,
                 company: company,
                 slug: 'test7',
                 title: 'Test User')


wyr = Game.create!(slug: 'wyr')
GameConfig.create!(game: wyr, name: 'Would you rather...',
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

di = Game.create!(slug: 'di')
GameConfig.create!(game: di, name: 'Desert Island',
                   game_type: 'ice-breaker',
                   instructions: "You’re stranded on an inescapable desert island for the rest of your life... but luckily you’ve got running water, shelter and enough forageable food to keep you alive & healthy. Take it in turns to reveal which 3 things you’d want with you on the island from the category shown and then explain your reasoning.")

di_variants = ["Books", "DVDs", "Music CDs", "Electronics"]

di_variants.each do |v|
  GameVariant.create!(game: di,
                      variant: v,
                      title: 'Your 3 chosen:')
end

ddtq = Game.create!(slug: 'ddtq')
GameConfig.create!(game: ddtq, name: 'Don’t dodge the question!',
                                 game_type: 'ice-breaker',
                                 instructions: 'Take it in turns to share your true, unfiltered answers to the question shown.')

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

charades = Game.create!(slug: 'charades')
GameConfig.create!(game: charades, name: 'Charades',
                   game_type: 'default-game',
                   winner_selection_criteria: "Select the person who guessed correctly first",
                   instructions: "Whoever’s turn it is will be given a film, book or tv show title that they need to “act out” without speaking. Everyone else has to try and guess what it is. \n\n The person who guesses correctly first is awarded a point!")
charades_variants = ['Alice in Wonderland',
'Alien',
'All About Eve',
'Alvin and the Chipmunks',
'Amelie',
'American Beauty',
'American Dad',
'American Gangster',
'American Hustle',
'American Idol',
'American Pie',
'American Pie 2']

charades_variants.each do |v|
  GameVariant.create!(game: charades,
                      variant: v,
                      title: 'Your word/phrase')
end

variants = ['blah blah blah', 'jknkdjf dgfdsdmg dskgg kjsdgio', 'dolfdg joid cbfd dfg', 'dfgsd dsfv']

otol = Game.create!(slug: 'otol')
GameConfig.create!(game: otol, name: 'One truth one lie!',
                   game_type: 'default-game',
                   instructions: "Whoever’s turn it is has to tell one truth and one lie about a specific topic, everyone else has to probe their answers and then guess which one is the lie. \n\n Once everyone has guessed, a point is awarded to everyone who got it right!",
                   winner_selection_criteria: "Select everyone who guessed correctly")

variants.each do |v|
  GameVariant.create!(game: otol,
                      variant: v,
                      title: 'Topic:')
end

# yna = Game.create!(slug: 'yna')
# GameConfig.create!(game: yna, name: 'Yes, No, And!',
#                    game_type: 'default-game',
#                    instructions: "Chat about the topic shown. If you say ‘yes’, ‘no’ or ‘and’ you lose the round and get a penalty point.\n\nThe person with the fewest penalty points at the end of the game is the winner!")

# variants.each do |v|
#   GameVariant.create!(game: otol,
#                       variant: v,
#                       title: 'Topic:')
# end

vm = Game.create!(slug: 'vm')
GameConfig.create!(game: vm, name: 'Vowel Movement',
                   game_type: 'default-game',
                   winner_selection_criteria: "Select the person who guessed correctly first",
                   instructions: "Whoever’s turn it is will be given a word/phrase that they need to say without their lips touching and without their tongue touching the roof of their mouth. Everyone else has to try and guess the word/phrase. \n\n The person who guesses correctly first is awarded a point!")

variants.each do |v|
  GameVariant.create!(game: vm,
                      variant: v,
                      title: 'Your word/phrase:')
end

gw = Game.create!(slug: 'gw')
GameConfig.create!(game: gw, name: 'Guess Who',
                   game_type: 'default-game',
                   winner_selection_criteria: "Select the person who guessed correctly first",
                   instructions: "Whoever’s turn it is will be given the name of a famous person or fictional character. Everyone else then has to ask them questions to figure out who they are e.g. are you a fictional character? The person who’s go it is can only respond to questions with “yes”, “no” or “pass”. \n\n The person who guesses the character correctly first is awarded a point!")

variants.each do |v|
  GameVariant.create!(game: gw,
                      variant: v,
                      title: 'You are:')
end

drawkward = Game.create!(slug: 'drawkward')
GameConfig.create!(game: drawkward, name: 'Drawkward',
                   game_type: 'default-game',
                   winner_selection_criteria: "Select the person who guessed correctly first. The person who’s turn it is will also get a point.. unless nobody guessed correctly",
                   instructions: "Whoever’s turn it is will be given an object. They then need to describe how to draw this using only geometric terms e.g. draw a triangle, then draw multiple rows of small rectangles inside it. \n\n Everybody else attempts to draw what’s being described and shouts out when they think they know what the object is. \n\n Both the person who guesses correctly first and the describer are awarded a point!")

drawkward_variants = %w[Wallet Bird Buttefly Lantern Bed]
drawkward_variants.each do |v|
  GameVariant.create!(game: drawkward,
                      variant: v,
                      title: 'Object to describe geometrically:')
end

pictionary = Game.create!(slug: 'pictionary')
GameConfig.create!(game: pictionary, name: 'pictionary',
                   game_type: 'default-game',
                   winner_selection_criteria: "Select the person who guessed correctly first. The person who’s turn it is will also get a point.. unless nobody guessed correctly",
                   instructions: "Whoever’s turn it is will be given a word/phrase that they need to draw (drawing letters or numbers is not allowed). Everybody else has to guess what the word/phase is. \n\n Both the person who guesses correctly first and the drawer are awarded a point!")

pictionary_variants = %w[Popcorn Vampire Harry\ Potter Duck]
pictionary_variants.each do |v|
  GameVariant.create!(game: pictionary,
                      variant: v,
                      title: 'Your word/phrase:')
end

dok = Game.create!(slug: 'dok')
GameConfig.create!(game: dok, name: 'Drunk or Kid',
                   game_type: 'default-game',
                   winner_selection_criteria: "Select everyone who guessed correctly",
                   instructions: "Whoever’s turn it is has to tell a story about something they did when they were either drunk or a kid e.g. I once left my grandma a 4 minute long voicemail explaining how much I love her. Everyone else then has to guess whether they were drunk or a kid. \n\n Once everyone has guessed, a point is awarded to everyone who got it right!")

dok_variants = ['Your turn!', 'Your turn!', 'Your turn!']
dok_variants.each do |v|
  GameVariant.create!(game: dok,
                      variant: v,
                      title: '')
end

tof = Game.create!(slug: 'tof')
GameConfig.create!(game: tof, name: 'True or False',
                   game_type: 'default-game',
                   winner_selection_criteria: "Select everyone who answered correctly",
                   instructions: "Whoever’s turn it is will be given a statement and told whether this statement is true or false. They must then read the statement out loud, and everyone else has to say whether they think it is true or false. When everyone has responded the actual answer can be revealed. \n\n Each person who gets it right is awarded a point!")

tof_variants = [
    {fact: 'blah blah', hint: 'FALSE'},
    {fact: 'jajj anaka dflkjl', hint: 'true'}
]
tof_variants.each do |v|
  GameVariant.create!(game: tof,
                      variant: v[:fact],
                      hint: v[:hint],
                      title: '')
end

CompanyParticipant.create!(user: midhun,
                           company: company,
                           role: 'admin')

CompanyParticipant.create!(user: alex,
                           company: company,
                           role: 'admin')

# teams = [Team.create!(company: company,
#                       name: 'Engineering',
#                       slug: 'engineering'),
#          Team.create!(company: company,
#                       name: 'Product',
#                       slug: 'product'),
#          Team.create!(company: company,
#                       name: 'Design',
#                       slug: 'design'),
#          Team.create!(company: company,
#                       name: 'HR and People Ops',
#                       slug: 'hr')
# ]

# 30.times.map do
#   fake_name = Faker::Name.unique.name
#   user = User.create!(name: fake_name,
#                       email: Faker::Internet.safe_email(name: fake_name),
#                       password: SecureRandom.alphanumeric(8))
#   team_idx = [0, 1, 2, 3].sample
#
#   employee = Employee.create!(user: user,
#                               company: company,
#                               slug: fake_name.parameterize,
#                               title: Faker::Company.profession.titleize)
#   TeamMember.create!(team: teams[team_idx],
#                      employee: employee)
#
# end
