'use strict'

const alfy = require('alfy')
const browserslist = require('browserslist')

const { SupportTable } = require('./src/support')
const { filterFeatures } = require('./src/features')

const { browsersListConfig } = process.env

alfy
  .fetch('https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json', {
    maxAge: 3600 * 12
  })
  .then(res => {
    if (alfy.input in res.data) {
      const supportTable = new SupportTable({
        featureId: alfy.input,
        db: res,
        browsersList: browserslist(browsersListConfig)
      })

      return alfy.output(supportTable.alfredItems)
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
