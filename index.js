'use strict'

const alfy = require('alfy')
const browserslist = require('browserslist')

const { SupportTable } = require('./src/SupportTable')
const { filterFeatures } = require('./src/features')
const { transformRes } = require('./src/transform')
const { exactMatch } = require('./src/utils')

const { browsersListConfig } = process.env

alfy
  .fetch('https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json', {
    maxAge: 3600 * 12
  })
  .then(res => {
    // console.log(JSON.stringify(res))
    const match = exactMatch(alfy.input, res.data)

    if (match) {
      const supportTable = new SupportTable({
        featureId: match,
        db: res,
        browsersList: browserslist(browsersListConfig)
      })

      return alfy.output(supportTable.alfredItems)
    } else {
      const featureSelectionList = filterFeatures(alfy.input, res)
      return alfy.output(featureSelectionList)
    }
  })
  .catch(alfy.error)
