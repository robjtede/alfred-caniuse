const fzf = require('fuzzysearch')

const { featureUrl } = require('./utils')

const filterFeatures = (input, res) => {
  const items = Object.entries(res.data)
    .filter(([name, feat]) => {
      return fzf(input, name)
    })
    .map(([name, feat]) => {
      return {
        title: feat.title,
        subtitle: feat.description,
        quicklookurl: featureUrl(name),
        autocomplete: name,
        arg: name,
        valid: false
      }
    })

  return items
}

module.exports = {
  filterFeatures
}
