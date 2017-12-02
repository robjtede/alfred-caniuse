const Fuse = require('fuse.js')

const { featureUrl } = require('./utils')

const filterFeatures = (input, res) => {
  const features = Object.entries(res.data).map(([name, feature]) => ({
    name,
    feature
  }))

  const fuse = new Fuse(features, {
    keys: [
      {
        name: 'name',
        weight: 0.4
      },
      {
        name: 'feature.title',
        weight: 0.4
      },
      {
        name: 'feature.description',
        weight: 0.2
      }
    ],
    includeScore: true,
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.5,
    distance: 30,
    minMatchCharLength: 1,
    maxPatternLength: 32
  })

  return fuse
    .search(input)
    .filter((val, index) => index < 20)
    .map(result => {
      const { name, feature } = result.item

      return {
        title: feature.title,
        subtitle: feature.description,
        quicklookurl: featureUrl(name),
        autocomplete: name,
        arg: name,
        valid: false
        // debug: result
      }
    })
}

module.exports = {
  filterFeatures
}
