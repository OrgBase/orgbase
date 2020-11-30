const twoTruthOneLieVariants = ["your hobbies", "your family", "foods you like", "your aspirations",
  "your role models", "your guilty pleasures", "your education", "your fears", "your career", "your accomplishments",
  "your childhood", "movies you like", "books you like", "sports you like", "crazy things that you’ve experienced",
  "nicknames you’ve had", "places you’ve been", "celebrities you’ve encountered", "your friends", "your pet peeves",
  "adventures you’ve had", "your home", "your exercise habits", "your favourite restaurants", "music you like",
  "restaurants you like"]

const wouldYouRatherVariants = ["Would you rather the aliens that make first contact be robotic or organic?",
  "Would you rather be covered in fur or covered in scales?",
  "Would you rather be in jail for a year or lose a year of your life?",
  "Would you rather always be 10 minutes late or always be 20 minutes early?",
  "Would you rather know the history of every object you touched or be able to talk to animals?",
  "Would you rather have an invisibility cloak or a key that opens any door?",
  "Would you rather have all traffic lights you approach be green or never have to stand in line again?",
  "Would you rather live on a sailboat or a stylish renovated travel van for the rest of your life?",
  "Would you rather give up all drinks except for water or give up eating anything that was cooked in an oven?",
  "Would you rather be able to see 10 minutes into your own future or 10 minutes into the future of anyone but yourself?",
  "Would you rather be the first person to explore a planet or be the inventor of a drug that cures a deadly disease?",
  "Would you rather go back to age 5 with everything you know now or know now everything your future self will learn?",
  "Would you rather have unlimited international first-class tickets or never have to pay for food at restaurants?",
  "Would you rather be an average person in the present or a King/Queen of a large country 250 years ago?",
  "Would you rather be forced to dance every time you heard music or be forced to sing along to any song you heard?",
  "Would you rather be an unimportant character in the last movie you saw or an unimportant character in the last book you read?",
  "Would you rather move to a new city or town every month or never be able to leave the city or town you were born in?",
  "Would you rather have 6 fingers on your right hand or 8 toes on your left foot?",
  "Would you rather wake up as a new random person every year and have full control of them for the whole year or wake up as a stranger once a week without having any control over their thoughts or actions?",
  "Would you rather know how above or below average you are at everything or know how above or below average people are at one skill/talent just by looking at them?",
  "Would you rather live until you are 200 but look like you are 200 the whole time even though you are healthy or look like you are 25 all the way until you die at age 60?",
  "Would you rather your only mode of transportation be a donkey or a giraffe?",
  "Would you rather every shirt you ever wear be kind of itchy or only be able to use 1 square of toilet paper whenever you do a number 2?",
  "Would you rather have edible spaghetti hair that regrows every night or sweat mayonnaise?",
  "Would you rather have to read aloud every word you read or sing everything you say out loud?",
  "Would you rather wear a wedding dress/tuxedo every single day or wear a bathing suit every single day?",
  "Would you rather be unable to move your body every time it rains or not be able to stop moving while the sun is out?",
  "Would you rather have all dogs try to attack you when they see you or all birds try to attack you when they see you?",
  "Would you rather have to high five everyone you meet or have to give wedgies to anyone in a green shirt?",
  "Would you rather have skin that changes colour based on your emotions or tattoos appear all over your body depicting what you did yesterday?",
  "Would you rather fall asleep for 10 hours every time you fart ( or teleport to a random place on earth (on land, not water) every time you sneeze?",
  "Would you rather become twice as strong when both of your fingers are stuck in your ears or crawl twice as fast as you can run?",
  "Would you rather have everything you draw become real but be permanently terrible at drawing or be able to fly but only as fast as you can walk?",
  "Would you rather thirty butterflies instantly appear from nowhere every time you sneeze or one very angry squirrel appear from nowhere every time you cough?",
  "Would you rather vomit uncontrollably for one minute every time you hear the happy birthday song or get a headache that lasts for the rest of the day every time you see a bird (including in pictures or a video)?",
  "Would you rather eat a sandwich made from 4 ingredients in your fridge chosen at random or eat a sandwich made by a group of your friends from 4 ingredients in your fridge?",
  "Would you rather everyone be required to wear identical silver jumpsuits or any time two people meet and are wearing an identical article of clothing they must fight to the death?",
  "Would you rather be a famous director or a famous actor?",
  "Would you rather live in a cave or live in a tree house?",
  "Would you rather live without the internet or live without AC and heating?",
  "Would you rather be able to teleport anywhere or be able to read minds?",
  "Would you rather be unable to use search engines or unable to use social media?",
  "Would you rather be an amazing painter or a brilliant mathematician?",
  "Would you rather have a flying carpet or a car that can drive underwater?",
  "Would you rather never be stuck in traffic again or never get another cold?",
  "Would you rather be forced to eat only spicy food or only incredibly bland food?",
  "Would you rather be a bowling champion or a curling champion?",
  "Would you rather be fantastic at riding horses or amazing at driving dirt bikes?",
  "Would you rather never be able to wear trousers or never be able to wear shorts?",
  "Would you rather live the next 10 years of your life in China or Russia?",
  "Would you rather live on the beach or in a cabin in the woods?",
  "Would you rather be lost in a bad part of town or lost in the forest?",
  "Would you rather be completely invisible for one day or be able to fly for one day?",
  "Would you rather never be able to use a touchscreen or never be able to use a keyboard and mouse?",
  "Would you rather get one free round trip international plane ticket every year or be able to fly domestic anytime for free?",
  "Would you rather give up washing for a month or give up the internet for a month?",
  "Would you rather have amazingly fast typing/texting speed or be able to read ridiculously fast?",
  "Would you rather lose your best friend or all of your friends except for your best friend?",
  "Would you rather never have to clean a bathroom again or never have to do dishes again?",
  "Would you rather only wear one colour each day or have to wear seven colours each day?",
  "Would you rather travel the world for a year all expenses paid or have $40,000 to spend on whatever you want?",
  "Would you rather be the absolute best at something that no one takes seriously or be well above average but not anywhere near the best at something well respected?",
  "Would you rather it be impossible for you to be woken up for 11 straight hours every day, but you wake up feeling amazing, or you can be woken up normally but never feel totally rested?",
  "Would you rather super sensitive taste or super sensitive hearing?",
  "Would you rather never lose your phone again or never lose your keys again?",
  "Would you rather lose all your money and valuables or all the pictures you have ever taken?",
  "Would you rather find your true love or a suitcase with five million dollars inside?",
  "Would you rather be alone for the rest of your life or always be surrounded by annoying people?",
  "Would you rather be locked in a room that is constantly dark for a week or a room that is constantly bright for a week?",
  "Would you rather have everything you eat be too salty or not salty enough no matter how much salt you add?",
  "Would you rather never have to work again or never have to sleep again (you won’t feel tired or suffer negative health effects)?",
  "Would you rather never use social media sites/apps again or never watch another movie or TV show?",
  "Would you rather have everything on your phone right now (browsing history, photos, etc.) made public to anyone who searches your name or never use a cell phone again?",
  "Would you rather have everyone laugh at your jokes but not find anyone else’s jokes funny or have no one laugh at your jokes but you still find other people’s jokes funny?",
  "Would you rather wake up in the middle of an unknown desert or wake up in a rowboat on an unknown body of water?",
  "Would you rather have the police hunting you for a murder you didn’t commit or a psychopathic clown hunting you?",
  "Would you rather be constantly tired no matter how much you sleep or constantly hungry no matter how much you eat?",
  "Would you rather live a comfortable and peaceful life in the woods in a small cabin without much human interaction or a life full of conflict and entertainment in a mansion in a city?",
  "Would you rather be so afraid of heights that you can’t go to the second floor of a building or be so afraid of the sun that you can only leave the house on rainy days?",
  "Would you rather get tipsy from just one sip of alcohol and ridiculously drunk from just one alcoholic drink or never get drunk no matter how much alcohol you drank?",
  "Would you rather be reincarnated as a fly or just cease to exist after you die?",
  "Would you rather die in 20 years with no regrets or die in 50 years with many regrets?",
  "Would you rather be transported permanently 500 years into the future or 500 years into the past?",
  "After you die would you rather your body be donated to science or your organs be donated to people who need them?",
  "Would you rather be famous when you are alive and forgotten when you die or unknown when you are alive but famous after you die?",
  "Would you rather go to jail for 4 years for something you didn’t do or get away with something horrible you did but always live in fear of being caught?",
  "Would you rather live your entire life in a virtual reality indistinguishable from the real world apart from the fact that all your wishes are granted or just in the normal real world?",
  "Would you rather have a horrible job, but be able to retire comfortably in 10 years or have your dream job, but have to work until the day you die?",
  "Would you rather lose all of your memories from birth to now or lose your ability to make new long-term memories?",
  "Would you rather always be able to see 5 minutes into the future or always be able to see 100 years into the future?",
  "Would you rather snitch on your best friend for a crime they committed or go to jail for the crime they committed?",
  "Would you rather fight for a cause you believe in, but doubt will succeed or fight for a cause that you only partially believe in but have a high chance of your cause succeeding?",
  "Would you rather your shirts be always two sizes too big or one size too small?",
  "Would you rather not be able to open any closed doors (locked or unlocked) or not be able to close any open doors?",
  "Would you rather blink twice the normal rate or not be able to blink for 5 minutes but then have to close your eyes for 10 seconds every 5 minutes?",
  "Would you rather give up breakfast, lunch, or dinner?",
  "Would you rather Have a dog with a cat’s personality or a cat with a dog’s personality?",
  "Would you rather lose the ability to lie or believe everything you’re told?",
  "Would you rather Be the funniest person in the room or the most intelligent?",
  "Would you rather Run at 100 mph or fly at ten mph?",
  "Would you rather be able to freeze time or travel in time?",
  "Would you rather live without music or without television?",
  "Would you rather wrestle a bear or an alligator?",
  "Would you rather only be able to speak in rhyme or only be able to speak using alliteration?",
  "Would you rather be trapped in a small room with 10,000 tarantulas for 10 minutes, or eat 10 tarantulas in 10 minutes?",
  "Would you rather have a permanent splinter under your big toenail, or have a permanent bad haircut?",
  "Would you rather forget who you are whenever it’s raining, or never be able to remember why you walked into a room?",
  "Would you rather get your salary given to you in pennies or never be able to use contactless payment methods?",
  "Would you rather be able to breathe underwater or fly?",
  "Would you rather invent a new gadget or discover a new species?",
  "Would you rather always have a song stuck in your head or always have an itch that you can’t reach?",
  "Would you rather know all the secrets of space or know all the secrets of the ocean?",
  "Would you rather have every movie spoiled for you before you watch it or not be able to watch a new movie until it’s been out for a year?",
  "Would you rather only be able to to leave your house for 20 minutes a day or only be able to be in your house from 10 minutes before going to bed until ten minutes after you wake up?",
  "Would you rather be a brilliant scientist or a world famous painter?",
  "Would you rather have all eyes on your or blend into the background?",
  "Would you rather be the richest person in the world or the smartest person in the world?",
  "Would you rather eat a piece of food that was really healthy for you but tasted horrible or eat something that tasted great but was bad for you?",
  "Would you rather have a huge imagination or a photographic memory?",
  "Would you rather live to 100 years old or live to 500 years old?",
  "Would you rather only be able to live in a fairly remote area your entire life or only be able to live in the heart of a huge city your entire life?",
  "Would you rather give up all technology (cell phones, computers, etc.) or give up all movies, television, and books?",
  "Would you rather live in a world where people take everything too seriously or a world where people don’t take anything seriously?",
  "Would you rather be liked by everyone you’ve ever met or have everything you’ve ever wanted?",
  "Would you rather have hiccups for the rest of your life or constantly feel like you have to sneeze?",
  "Would you rather be surrounded by people who brag all the time or by people who complain all the time?",
  "Would you rather be a strawberry with human thoughts or a human with strawberry thoughts?",
  "Would you rather speak every language fluently or play every instrument perfectly?",
  "Would you rather have tastebuds on your fingertips or a tongue twice the size?",
  "Would you rather have chopsticks for hands or office chair wheels for feet?",
  "Would you rather have the brains of a squirell (but still be human) or have the brains of a human but be a squirell?",
  "Would you rather fight Mike Tyson once or talk like Mike Tyson for the rest of your life?",
  "Would you rather change gender every time you sneeze or not be able to tell the difference between a muffin and a baby?",
  "Would you rather have a cat with a human face or a dog with human hands?",
  "Would you rather eat ice cream flavored poo, or poo flavored ice cream?",
  "Would you rather become the smartest person in the world by increasing your own intelligence, " +
  "or become the dumbest person in the world because everyone else has increased theirs?",
  "Would you rather be really hairy or really slimy?"
];

const tenQuestionsVariants = ["one of your favourite hobbies", "one of your favourite meals", "your favourite actor",
  "your favourite movie", "your favourite book", "your favourite sport", "your favourite city",
  "your favourite country", "your favourite well-known restaurant", "your favourite musician", "your favourite animal"]

const drawkwardVariants = ["a fruit", "an animal", "a household appliance",
  "a gadget", "something you’d find in the kitchen", "a cartoon character"]

const chainTheNameVariants = ["Mike Tyson, Tom Cruise", "Brad Pitt, Penelope Cruz",
  "Mark Zuckerberg, Zayn Malik", "Roger Federer, Frank Sinatra", "Yoko Ono, Oscar Wilde",
  "Arethra Franklin, Florence Nightingale", "Muhammad Ali, Ariana Grande",
  "Stephen Hawking, Harry Windsor", "Harry Potter, Pippa Middleton",
  "Hillary Clinton, Clint Eastwood"]

const yesNoVariants = ["families", "hobbies", "jobs", "favourite things", "aspirations",
  "favourite foods", "dream dinner party guests", "values", "idea of a perfect day",
  "number one obsession at the moment", "favourite movies", "most treasured memories",
  "favourite travel destination", "favourite tv programmes", "daily routine",
  "friends", "easiest memory", "favourite books"]

const atoZVariants = ["a country", "an animal", "a famous actor/actress", "a famous sports star",
  "a city", "something you love", "a movie", "a band/singer", "a vegetable", "a job title",
  "a celebrity", "a song", "a body part", "a household item", "a drink brand", "a company",
  "a physical activity / sport"]

const twentyOneVariants = ["1. Instead of saying the number 10, you have to say “Octopus”\n" +
"2. You have to sing rather than say the number 21",
  "1. Instead of saying the number 10, you have to say a word which rhymes with 10\n" +
  "2. Every time you say a number divisible by 6 you have to clap",
  "1. Instead of saying the number 10, you have to knock twice on your desk\n" +
  "2. Instead of saying the number 12, you have to say 11 (13 still comes next)",
  "1. You have to say the number 1 in a different language\n" +
  "2. You have to duck out of view when saying the number 15",
  "1. Instead of saying the number 8, you have to moo\n" +
  "2. You have to say the number 9 in roman numeral form (IX)",
  "1. Instead of saying the number 5, you have to say \"cinco de mayo\"\n" +
  "2. Instead of saying the number 21, you have to say the name of a celebrity crush",
  "1. Instead of saying the number 3 normally, you have to whisper it\n" +
  "2. You have to replace every multiple of 7 (including 7) with a movie quote",
  "1. Every time you say a multiple of 4 you have to bow\n" +
  "2. Instead of saying the number 17, you have to say “20 minus 3”",
  "1. You have to say the number 21 in slow motion\n" +
  "2. Instead of saying the number 10, you have to wink 10 times",
  "1. Instead of saying the number 5, you have to high five your camera (just don't break it!)\n" +
  "2. Instead of saying the number 21, you have to give a 21 gun salute (open to interpretation!)"]

const dontDodgeVariants = ["What songs make you feel like you could take on a whole army with just a pointy stick?",
  "What song would you want played at your funeral?",
  "You are 1 of 2,000,000 people asked. You get to have whatever item you want as long as no one else chooses it. What do you choose?",
  "What is something that you just cannot understand the popularity of?",
  "What's something that's heavily outdated but you love using anyway (assuming you could, in theory, replace that thing)?",
  "What’s the most recent life-changing purchase you made?",
  "What makes you optimistic about the future?",
  "David Attenborough is watching from a safe distance as you go about your day to day life, what cool facts does he tell the audience about you and your habitat?",
  "Why do you like to be alive?",
  "You go to sleep on the 31st of December 2020 and wake up the next day but when you check your phone, it says January 1st 2020, after the first couple of days you realise it's just like groundhog day, what do you do with the information you have about 2020?",
  "You gain control of JK Rowling's twitter account for a day. What unnecessary piece of information do you add to Harry Potter lore?",
  "What do you KNOW is true without evidence? What are you certain of, right down to your bones, without proof?",
  "You're given the option to drop what you have and return to the year 2010 as yourself at that age, but with all the experience you’ve gained since then. Do you take it? Why or why not?",
  "You can't time travel, but your phone has the internet from 5 years in the future. What do you search for first?",
  "The words 'Low Battery' appear right before your eyes, you take off your VR headset and realised your whole life was just a VR simulation which you've been playing for only a few minutes. How do you react?",
  "300-400 years ago, pirates were a terrifying force to be reckoned with. Now they’re family friendly figures of fun. What will be their modern day equivalent a few centuries from now?",
  "What song is a 10/10, yet hardly anyone has heard of it?",
  "There’s a population of 7.5 billion humans and 19 billion chickens at any given time. If there was a chicken rebellion how would you prepare to fight off your 2.7 chickens (give or take a few)?",
  "If you could telepathically say something that all 7.8 Billion people on earth could hear at once what would it be?",
  "What do you use to remind yourself that everything isn't that bad?",
  "If scientists invented a teleportation system but the death rate was 3 per million would you use it? Why or why not?",
  "You get a billion dollars if you can start a massive argument at your family's Christmas dinner. What's your game plan?",
  "How do you deal with an overly friendly neighbour who asks too many questions about your life when you happen to be outdoors at the same time?",
  "You have been accepted for an experiment: you must stay in a room with nothing but bed/toilet/food/water and no human contact for one month. If you succeed for the whole month without giving up, you get $5,000,000. Do you accept? And what are your coping strategies to avoid mental breakdown?",
  "What really obvious thing have you only just realised?",
  "You have 5 minutes to hide a paperclip in your home. A detective has 24 hours to find it, If they don't, you get $10,000. Where are you going to hide the paperclip?",
  "You are offered $1,000,000 USD if you can hide a pair of car keys from the entirety of the FBI force for 7 days. Where do you hide the keys?",
  "What’s the most amazing thing about the world?",
  "What is something about yourself that sounds made up, but is 100% real?",
  "If you could choose anyone (alive, dead, or fictional) to be the next President of the United States, who would you choose and why?",
  "What are you still a bit pissed off about?",
  "You have died and find that instead of going to heaven, you've only levelled up to Earth 2.0. What are some things that make Earth 2.0 better but not quite heaven?",
  "What’s a small act of kindness you were once shown, that you’ll never forget?",
  "From right now your need for sleep is gone. You can now stay awake till your eventual death whilst still maintaining perfect physical and mental health. How would you spend the extra time?",
  "what scientific experiment would you run if money and ethics weren't an issue?",
  "You are given 300 million to make a movie but it has to fail miserably at the box office or else you die. What do you make?",
  "You accidentally put in an hour more community service than needed, now you have to do 1 hour of community disservice. What do you do?",
  "What do you think is scarier, the idea that we are alone in the universe or the idea that we aren’t? Why?",
  "You're being interrogated and so far you've held strong. What song do they play on repeat that breaks you?",
  "What Movie Will You Always Recommend To People?",
  "What book would you recommend to people who haven't finished a book since school?",
  "What food combination do most people think is really weird but you secretly (or openly) love?",
  "“Free Candy” is often joked about being written on the side of sketchy white vans to lure children in. As an adult, what phrase would have to be written on there for you to hop on in?",
  "Time freezes for 48 hours and you’re the only thing not affected. What do you choose to do?",
  "What's the most unexplainable thing that's ever happened to you?",
  "What’s the craziest thing that’s ever happened to you?",
  "The year is 2030 and President Kanye West is impeached. What led to these events?",
  "What is something that your parents did that you swore never to repeat to your own kids?",
  "If \"Bullshit\" means fake and \"Batshit\" means crazy, what do the other \"shits\" of the animal kingdom mean? Give two examples",
  "Your brain is reaching maximum storage capacity. What do you delete to free up space?",
  "In what movie did you like the bad guy more than the good guy?",
  "What is an adult problem you were not prepared for?",
  "You’re a brand and marketing strategist for Corona beer. The coronavirus hits. What’s your plan?",
  "You are sent back to the day the titanic set sail with nothing but a 3rd class ticket (and food water etc) your task is to stop the titanic from sinking, how do you do this?",
  "What's the weirdest compliment you've ever been given?",
  "If someone borrowed your body for a week, what quirks would you tell them about so they are prepared?",
  "What is most useless item you carry with you all the time?",
  "What is your \"I was into X before it was cool\" thing?",
  "You're tired from the human race, so you decide to help an advanced alien civilisation destroy the Earth, what tips would you give them?",
  "What is the dumbest idea you have ever had that actually worked?",
  "What is something that you just cannot understand the popularity of?",
  "What is a movie ending that makes you cry, no matter how many times you've watched it before?",
  "The 16 year old version of you just moved in and is now your new roommate. What's the first thing you two would fight about?",
  "The internet is scheduled to go down forever. You have a week to prepare and download anything from the web you think is necessary to have for the rest of your life. What do you download and why?",
  "What's one of the dumbest things you've ever spent money on?",
  "Which character death in a film/book/tv show etc hit you differently, and why?",
  "If \"retirement\" in the future means you donate your body and organs at age 40 but will be kept alive artificially in a perfectly simulated environment where you live worry-free, would you do it? Why or why not?",
  "What’s an insult that sounds like a compliment?",
  "Which fictional character's death have you not gotten over?",
  "What’s the most evil prank have you pulled off?",
  "You are transported to year 0, with any object from the present with you. Which item do you choose to make people lose their minds the most?",
  "What movie did you start watching then said “Screw that, I'm not finishing this\"?",
  "What is the greatest design flaw of the human body?",
  "What’s the worst birthday gift you ever got?",
  "Chocolate is now illegal. What’s its street name?",
  "What is the most useless fact you know?",
  "What exists seemingly for the sole purpose of pissing people off?",
  "You wake up, it’s 2050, what do you google first?",
  "What is the best animated movie and why?",
  "If you had a chance to broadcast one song to all the 7.8 billion people on this planet, which song would you choose?",
  "What for you is the adult version of “there is no Santa Claus”?"]

const vowelVariants = [
  'movie',
  'tv programme',
  'savoury food',
  'country',
  'city',
  'colour',
  'restaurant',
  'sweet food',
  'car',
  'hobby',
  'sport',
  'board game',
  'book',
  'song',
  'artist',
  'instrument',
  'actor',
  'actress',
  'smell',
  'animal',
  'type of pet',
  'dinoaur',
  'item of clothing',
  'brand',
  'company',
  'charity',
  'exercise'
]

const getRandomVariant = (variants, randomFraction=Math.random()) => {
  return variants[Math.floor( randomFraction * variants.length)]
}

const games = (randomFraction) => [
  {
    name: 'Two Truths and a Lie',
    rules: `Take it in turns to tell two truths and one lie about ${getRandomVariant(twoTruthOneLieVariants, randomFraction)}, ` +
      'everyone else has to guess which one is the lie',
    weight: 10
  },
  {
    name: 'Scavenger Hunt',
    rules: 'First person to find and then bring back an object beginning with the letter ' +
     `"${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[Math.floor(randomFraction * 24)]}" ` +
      'wins….. hurry!',
    weight: 5
  },
  {
    name: 'Would you rather',
    rules: `${getRandomVariant(wouldYouRatherVariants, randomFraction)} Take it in turns to reveal which one you’d choose, and why.`,
    weight: 20
  },
  {
    name: '10 Questions',
    rules: `Take it in turns to think of ${getRandomVariant(tenQuestionsVariants, randomFraction)}, ` +
      'everyone else can then ask 10 questions (yes or no answers only) to figure out what it is.',
    weight: 7
  },
  {
    name: 'Drawkward',
    rules: `Take it in turns to think of ${getRandomVariant(drawkwardVariants, randomFraction)}. ` +
      'Once you’ve chosen, you have to describe it using only geometric terms, so that everyone else can draw it ' +
      '(grab a pen and paper or use a programme like paint). The game ends when someone successfully guesses what ' +
      'it is based on what they’ve drawn.',
    weight: 5
  },
  {
    name: 'Chain the name',
    rules: 'Take it in turns to say the first and last name of a well-known celebrity, fictional character ' +
      'or individual everyone participating knows. The only rule is that the first name has to start with the ' +
      'same letter as the first letter of the last name before it. If it takes you longer than 5 seconds to ' +
      'think of a name that works, you lose!\n' +
      `Get started with ${getRandomVariant(chainTheNameVariants, randomFraction)}...`,
    weight: 8
  },
  {
    name: 'Yes! No!',
    rules: `Time to have a chat about your ${getRandomVariant(yesNoVariants, randomFraction)}. ` +
      'There’s just one catch, if you say either ‘yes’ or ‘no’, you lose!',
    weight: 7
  },
  {
    name: 'A to Z',
    rules: `Work together to name ${getRandomVariant(atoZVariants, randomFraction)} for each letter of the alphabet. ` +
      'The aim is to go from ‘a’ all the way to ‘z’. If you can’t think of one along the way then you both lose... ' +
      'unless one doesn’t actually exist for the letter in question (ask the internet)!',
    weight: 10
  },
  {
    name: 'Dum didum dum di dum dum 🎶🎤',
    rules: 'Take it in turns to pick a song. You then have to sing it without using the lyrics, ' +
      'and everyone else has to guess the name of the song. If the song is guessed correctly, you all win!',
    weight: 3
  },
  {
    name: 'Virtual band practice',
    rules: 'Unleash your inner musicians and create a melody together. Use whatever you’ve got around, ' +
      'ding your cups, knock your desks, sing your heart out (if you back yourself!)',
    weight: 3
  },
  {
    name: 'Movie Mash Up',
    rules: 'Take it in turns to think of two movies you like. You then have to describe a mashed ' +
      'together version of these two movies without mentioning titles or any character names. ' +
      'Everyone else has to correctly guess the two movies that form the mash up.',
    weight: 5
  },
  {
    name: '21',
    rules: 'Together, you have to count to 21 one digit at a time, with each player taking alternate turns.' +
      ' There is a catch though, you will have to follow some counterintuitive rules as you do this, ' +
      'and everytime you reach 21, the person who landed on it gets to add an additional rule ' +
      "into the mix. Repeat until someone slips up! " +
      `We’ll give you your first two rules... \n ${getRandomVariant(twentyOneVariants, randomFraction)}`,
    weight: 10
  },
  {
    name: 'Don\'t Dodge The Question',
    rules: "Take it in turns to share your true, unflitered answer to the following question:\n\n" +
      `${getRandomVariant(dontDodgeVariants, randomFraction)}`,
    weight: 15
  },
  {
    name: 'Vowel movement',
    rules: `Take it in turns to name your favourite ${getRandomVariant(vowelVariants, randomFraction)} ` +
      "without your lips touching. Everyone else has to guess what it is!",
    weight: 5
  },
];

const getGame = (i, randomFraction=Math.random()) => {
  return games(randomFraction)[i];
}

const getRandomGameIndex = (randomFraction=Math.random()) => {
  const allGames = games(randomFraction)
  const sumOfWeights = allGames.reduce(function(sum, game) {
    return sum + game.weight;
  }, 0);

  const randomNumber = Math.floor(Math.random() * (sumOfWeights + 1))

  let cumulativeWeight = 0;

  for(let i=0; i<allGames.length; i++) {
    cumulativeWeight += allGames[i].weight
    if(cumulativeWeight >= randomNumber) {
      return i
    }
  }
}

export {
  getGame,
  getRandomGameIndex
};