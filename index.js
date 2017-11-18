'use strict'

const alfy = require('alfy')
const fzf = require('fuzzysearch')

const getBrowserName = (browser, res) => {
  if (browser in res.agents) {
    return res.agents[browser].browser
  } else {
    return browser
  }
}

const getFirstUnprefixedVersion = stats => {
  const stat = stats.find(([version, compatible]) => compatible.startsWith('y'))

  if (stat) {
    const [version] = stat
    return version
  } else {
    return 'ERROR: probably has always been prefixed'
  }
}

const getCompatibilityString = stats => {
  stats = Object.entries(stats)

  const allSupported = stats.every(
    ([version, compatible]) => compatible === 'y'
  )

  const noneSupported = stats.every(
    ([version, compatible]) => compatible === 'n'
  )

  if (allSupported) {
    return '✅️ Supported in all versions'
  } else if (noneSupported) {
    return '❌️ Not Supported'
  } else {
    return `⚠️ Supported since version ${getFirstUnprefixedVersion(stats)}`
  }
}

const getCompatibility = res => {
  const feature = res.data[alfy.input]

  const items = Object.entries(feature.stats).reduce(
    (items, [browser, versions]) => {
      return [
        ...items,
        {
          title: getBrowserName(browser, res),
          subtitle: getCompatibilityString(versions)
        }
      ]
    },
    []
  )

  return alfy.output([...items])
}

const filterFeatures = res => {
  const items = Object.entries(res.data)
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
        arg: name,
        valid: false
      }
    })

  return alfy.output(items)
}

alfy
  .fetch('https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json', {
    maxAge: 3600 * 12
  })
  .then(res => {
    if (alfy.input in res.data) {
      return getCompatibility(res)
    } else {
      return filterFeatures(res)
    }
  })
  .then(() => {
    // exit quickly
    process.exit(0)
  })
  .catch(err => {
    alfy.error(err.message)
  })
