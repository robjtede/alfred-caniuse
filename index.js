'use strict'

const alfy = require('alfy')
const browserslist = require('browserslist')

const { SupportTable } = require('./src/SupportTable')
const { filterFeatures } = require('./src/features')
const { exactMatch, transformRes } = require('./src/utils')

const { browsersListConfig } = process.env

alfy
  .fetch('https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json', {
    // maxAge: 3600 * 12,
    transform: body => {
      console.log(JSON.stringify(transformRes(body)))
      // return transformRes(body)
    }
  })
  .then(res => {
    // console.log(JSON.stringify(res))
    // const match = exactMatch(alfy.input, res.data)
    //
    // if (match) {
    //   const supportTable = new SupportTable({
    //     featureId: match,
    //     db: res,
    //     browsersList: browserslist(browsersListConfig)
    //   })
    //
    //   return alfy.output(supportTable.alfredItems)
    // } else {
    //   const featureSelectionList = filterFeatures(alfy.input, res)
    //   return alfy.output(featureSelectionList)
    // }
  })
  .catch(err => {
    alfy.error(err.message)
  })
