const Sequelize = require('sequelize')
const db = require('../db')

const Beers = db.define('beer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/figmtn.jpeg'
  },
  IBU: {
    type: Sequelize.STRING
  },
  ABV: {
    type: Sequelize.STRING
  }
})

module.exports = Beers
