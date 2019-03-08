'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Beers} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const beers = await Promise.all([
    Beers.create({
      name: '6th Anniversary',
      ABV: '14',
      IBU: '31',
      description:
        'Barrel-aged in apple-pear brandy, grape brandy and whiskey barrels, our 6th Anniversary Grand Cru Ale celebrates the moment when everything comes together.  Like a perfect celebration, the flavors in this beer meld effortlessly for an experience you’ll never forget.  Notes of marshmallow, vanilla, whiskey, almonds, honey, pears, figs and gentle toasted oak hold their own in this full-textured medley.'
    }),
    Beers.create({
      name: 'Agua Santa',
      ABV: '4.9',
      IBU: '9',
      imageUrl: '/aguasanta.png',
      description:
        'This Mexican inspired lager is best defined by the word "crisp". Both dry and refreshing Agua Santa focuses on high quality pilsner malt, flaked maize, and traditional German noble hops. Agua Santa is a brilliant pale straw color with the subtle aroma of floral meadows and a hint of sweet corn. So call up your friends, get the barbecue fired up, and prepare to relajarse, Salud!'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${beers.length} beers`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
