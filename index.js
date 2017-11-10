const fs = require('fs');

console.log('Please specify user names delimited by comma:')

process.stdin.addListener('data', function(input) {
  const inputNames = createMap(input.toString().toLowerCase().split(','));

  const usersData = getUsersData();
  const venuesData = getVenuesData();

  const filteredUsersData = usersData.filter(o => o.name.toLowerCase() in inputNames);
  console.log(`Found ${filteredUsersData.length} users`);

  if (filteredUsersData.length > 0) {
    check(filteredUsersData, venuesData);
  } else {
    console.log(`All the team goes`);
    check(usersData, venuesData);
  }

  process.stdin.removeListener('data', arguments.callee);
});

function getVenuesData() {
  const venuesRaw = fs.readFileSync('venues.json');
  const venues = JSON.parse(venuesRaw);
  return createVenuesData(venues);
}

function getUsersData() {
  const usersRaw = fs.readFileSync('users.json');
  const users = JSON.parse(usersRaw);
  return createUsersData(users);
}

function check(users, venues) {
  const venuesFit = [];
  const venuesDontFit = {};

  for (let v of venues) {
    let fitsAll = true;
    for (let u of users) {
      let foodFit = doesFoodFit(u, v);
      let drinksFit = doDrinksFit(u, v);
      fitsAll &= drinksFit && foodFit;

      if (!drinksFit || !foodFit) {
        const venueDoesntFit = venuesDontFit[v.name] || { food: [], drinks: [] };
        if (!foodFit) venueDoesntFit.food.push(u.name);
        if (!drinksFit) venueDoesntFit.drinks.push(u.name);
        venuesDontFit[v.name] = venueDoesntFit;
      };
    }

    if (fitsAll) venuesFit.push(v.name);
  }

  if (venuesFit.length > 0)
    console.log(`Places to go:\n\t* ${venuesFit.join('\n\t* ')}`);
  else
    console.log('Nowhere to go, shold hold a home party!');

  console.log('Places to avoid:');
  for (let s in venuesDontFit) {
    let o = venuesDontFit[s];
    let result = `\t* ${s}: `;
    result += o.food.length ? `\n\t\t- There is nothing to eat for: ${o.food.join(', ')}` : '';
    result += o.drinks.length ? `\n\t\t- There is nothing to drink for: ${o.drinks.join(', ')}` : '';
    console.log(result);
  }
}

// user
// {
//   name: 'name',
//   wont_eat: {
//     chinese: true
//   },
//   drinks: {
//     beer: true,
//     cirder: true
//   }
// }
function createUsersData(usersArr) {
  return usersArr.map(u => ({
      name: u.name,
      wont_eat: createMap(u.wont_eat),
      drinks: createMap(u.drinks)
    })
  );
}

// venue
// {
//   name: 'name',
//   food: {
//     mexican: true
//   },
//   drinks: {
//     soft_drinks: true,
//     rum: true,
//     beer: true
//   }
// }
function createVenuesData(venuesArr) {
  return venuesArr.map(u => ({
      name: u.name,
      food: createMap(u.food),
      drinks: createMap(u.drinks)
    })
  );
}

function createMap(arr) {
  return arr.reduce((acc, o) => { acc[createKey(o)] = true; return acc; }, {});
}

function createKey(val) {
  return val.trim().toLowerCase();//.replace(/\s+/g, '_');
}

function doesFoodFit(user, venue) {
  return Object.keys(venue.food).filter(dish => !(dish in user.wont_eat)).length > 0;
}

function doDrinksFit(user, venue) {
  return Object.keys(user.drinks).some(drink => drink in venue.drinks);
}
