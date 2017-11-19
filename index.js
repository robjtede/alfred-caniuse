'use strict'

const alfy = require('alfy')
const fzf = require('fuzzysearch')
const browserslist = require('browserslist')

const { supportTable } = require('./src/support')
const { filterFeatures } = require('./src/features')

alfy
  .fetch('https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json', {
    maxAge: 3600 * 12
  })
  .then(res => {
    if (alfy.input in res.data) {
      const supportList = supportTable(alfy.input, res)
      return alfy.output(supportList)
    } else {
      const featureSelectionList = filterFeatures(alfy.input, res)
      return alfy.output(featureSelectionList)
    }
  })
  .then(() => {
    // quick exit
    process.exit(0)
  })
  .catch(err => {
    alfy.error(err.message)
  })
