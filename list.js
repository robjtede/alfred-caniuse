'use strict'

// const alfy = require('alfy')
const fzf = require('fuzzysearch')

alfy
  .fetch('https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json', {
    maxAge: 3600 * 12
  })
  .then(({ data }) => {
    const items = Object.entries(data)
      .filter(([name, feat]) => {
        return fzf(alfy.input, name)
      })
      .map(([name, feat]) => {
        const url = `https://caniuse.com/#feat=${name}`

        return {
          title: feat.title,
          subtitle: feat.description,
          quicklookurl: url,
          autocomplete: name,
          arg: url
        }
      })

    alfy.output(items)
  })
  // .then(() => {
  //   // exit quickly
  //   process.exit(0)
  // })
  .catch(err => {
    alfy.error(err.message)
  })
