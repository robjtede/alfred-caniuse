const { browserIcon, featureUrl } = require('./utils')

const browserName = (browser, res) => {
  if (browser in res.agents) {
    return res.agents[browser].browser
  } else {
    return browser
  }
}

const firstUnprefixedVersion = versionSupport => {
  const stat = versionSupport.find(([version, compatible]) => compatible.startsWith('y'))

  if (stat) {
    const [version] = stat
    return version
  } else {
    return 'ERROR: probably has always been prefixed'
  }
}

const compatibilityString = stats => {
  const [browser, versions] = stats
  const versionSupport = Object.entries(versions)

  const allSupported = versionSupport.every(
    ([version, compatible]) => compatible === 'y'
  )

  const noneSupported = versionSupport.every(
    ([version, compatible]) => compatible === 'n'
  )

  if (allSupported) {
    return '✅️ Supported in all versions'
  } else if (noneSupported) {
    return '❌️ Not Supported'
  } else {
    return `⚠️ Supported since version ${firstUnprefixedVersion(
      versionSupport
    )}`
  }
}

const supportInformation = (stats, res) => {
  return {
    // firstAnySupport: '0',
    // firstUnprefixedSupport: firstUnprefixedVersion(stats),
    compatibilityString: compatibilityString(stats)
  }
}

const supportTable = (input, res) => {
  const feature = res.data[input]

  const items = Object.entries(feature.stats).reduce(
    (supportListAcc, stats) => {
      const [browser, versionSupport] = stats
      const supportInfo = supportInformation(stats, res)

      return [
        ...supportListAcc,
        {
          title: browserName(browser, res),
          subtitle: supportInfo.compatibilityString,
          icon: {
            path: `./icons/${browserIcon(browser)}.png`
          },
          valid: false
        }
      ]
    },
    []
  )

  return [
    {
      title: 'Open on caniuse.com',
      subtitle: 'Show the full compatibility table in your browser',
      icon: {
        path: './icon.png'
      },
      arg: featureUrl(input)
    },
    ...items
  ]
}

module.exports = {
  supportTable
}
