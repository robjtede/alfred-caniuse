'use strict'

import * as alfy from '@robjtede/alfy'
import * as browserslist from 'browserslist'

import { SupportTable } from './SupportTable'
import { filterFeatures } from './features'
import { transformRes } from './transform'
import { exactMatch } from './utils'

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
        browsersList: browserslist.default(browsersListConfig)
      })

      return alfy.output(supportTable.alfredItems)
    } else {
      const featureSelectionList = filterFeatures(alfy.input, res)
      return alfy.output(featureSelectionList)
    }
  })
  .catch(alfy.error)
