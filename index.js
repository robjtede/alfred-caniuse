'use strict'

const fs = require('fs')

const alfy = require('alfy')
const fzf = require('fuzzysearch')

const getFeatureUrl = (featName) => `https://caniuse.com/#feat=${featName}`

const getBrowserName = (browser, res) => {
  if (browser in res.agents) {
    return res.agents[browser].browser
  } else {
    return browser
  }
}

const getBrowserIcon = name => {
  const icons = {
    and_ff: 'firefox',
    firefox: 'firefox',
    and_chr: 'chrome',

    chrome: 'chrome',

    ie: 'ie',
    ie_mob: 'ie',

    edge: 'edge',

    ios_saf: 'safari',
    safari: 'safari',

    op_mini: 'opera',
    op_mob: 'opera',
    opera: 'opera',

    and_qq: 'qq',
    and_uc: 'uc',
    android: 'android',
    baidu: 'baidu',
    samsung: 'samsung',
    bb: 'other'
  }
  
  return name in icons ? icons[name] : 'other'
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
          subtitle: getCompatibilityString(versions),
          icon: {
            path: `./icons/${getBrowserIcon(browser)}.png`
          },
          valid: false
        },
      ]
    },
    []
  )

  return alfy.output([
    {
      title: 'Open on caniuse.com',
      subtitle: 'Show the full compatibility table in your browser',
      icon: {
        path: './icon.png'
      },
      arg: getFeatureUrl(alfy.input)
    },
    ...items
  ])
}

const filterFeatures = res => {
  const items = Object.entries(res.data)
    .filter(([name, feat]) => {
      return fzf(alfy.input, name)
    })
    .map(([name, feat]) => {
      return {
        title: feat.title,
        subtitle: feat.description,
        quicklookurl: getFeatureUrl(name),
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
    // quick exit
    process.exit(0)
  })
  .catch(err => {
    alfy.error(err.message)
  })
