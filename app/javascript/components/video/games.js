const games = [
  {
    name: 'Two Truths and a Lie',
    rules: 'One of you says three statements about yourself. ' +
      'Two of these statements must be facts, or "truths," and one must be a lie. ' +
      'The other one will try to guess which statement is the lie. ' +
      'Repeat with roles changed.'
  },
  {
    name: 'Random Treasure Hunt',
    rules: `Find an object nearby that begins with the letter "${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[Math.floor(Math.random() * 24)]}" - whoever gets back first wins`
  },
  {
    name: 'Personal 20 Questions',
    rules: 'One of you picks an object which is meaningful to you, the other one then asks 20 questions (yes, or no answers) to figure out what it is. Once figured out the person will explain why it\'s meaningful to them'
  },
  {
    name: '5 Common Things',
    rules: 'Find 5 things that you all have in common (related to interests, values, previous experiences) etc'
  },
  {
    name: 'Would you rather',
    rules: 'One of you pick two scenarios and others need to say which they prefer. Eg. Would rather eat salad or burrito for lunch everyday for the rest of your life?'
  },
  {
    name: 'Sell your hobby',
    rules: 'One of you \'sells\' their hobby to the rest - you win by getting them to agree that it\'s an awesome hobby'
  },
  {
    name: 'The Bucket List',
    rules: 'Everybody goes round and says something that\'s on their bucket list - you stop once somebody says something that everybody else either has or would like to have on their bucket list.'
  },
  {
    name: 'One story, multiple authors',
    rules: 'One of you starts a story by telling a sentence, others will add a new sentence to it. Keep going till you have a fun climax.'
  },
  {
    name: 'Can you hear me now',
    rules: 'One person is the Describer and the other players are Artists. The Describer must explain to the Artists how to draw an item like a sunflower, kite or calculator using only geometric terms. The artist that guesses the object correctly wins.'
  },
  {
    name: 'Truth or dare',
    rules: 'Players take it in turn and accept either a truth or a dare, the other players then decide what the truth or dare should be. Examples include - what website do you waste most time on? How many browser tabs have you got open right now? Show us the most embarrassing item within arms reach. Make the noise of a 90\'s dial up modem etc'
  },
  // {
  //   name: '',
  //   rules: ''
  // },
  // {
  //   name: '',
  //   rules: ''
  // },
  // {
  //   name: '',
  //   rules: ''
  // },
  // {
  //   name: '',
  //   rules: ''
  // },
  // {
  //   name: '',
  //   rules: ''
  // },
  // {
  //   name: '',
  //   rules: ''
  // },
  // {
  //   name: '',
  //   rules: ''
  // },
  // {
  //   name: '',
  //   rules: ''
  // },
  // {
  //   name: '',
  //   rules: ''
  // },
  // {
  //   name: '',
  //   rules: ''
  // },
  // {
  //   name: '',
  //   rules: ''
  // }
];

export default games;