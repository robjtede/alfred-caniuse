export const statsRe = /^([unpay])\s?([xd]\s??[xd]?)?\s?((?:#\d+\s?)*)$/i

export const supportStatuses = {
  u: {
    short: 'u',
    full: 'unknown',
    code: -1,
  },
  n: {
    short: 'n',
    full: 'unsupported',
    code: 0,
  },
  p: {
    short: 'p',
    full: 'polyfillable',
    code: 1,
  },
  a: {
    short: 'a',
    full: 'partial',
    code: 2,
  },
  y: {
    short: 'y',
    full: 'supported',
    code: 3,
  },
}

export const supportStatusModifiers = {
  d: {
    short: 'd',
    full: 'flagged',
    code: 1,
  },
  x: {
    short: 'x',
    full: 'prefixed',
    code: 2,
  },
}

export const transformRes = (res) => {
  const data = res.data

  const stats = transformStats(data)
  res.data = stats

  return res
}

export const transformStats = (stats) => {
  return Object.entries(stats).map(([featureName, featureInfo]) => {
    const stats = transformBrowserStats(featureInfo.stats)
    featureInfo.stats = stats

    return { featureName, featureInfo }
  })
}

export const transformBrowserStats = (browserStats) => {
  return Object.entries(browserStats).map(([browser, versions]) => ({
    browser,
    versions: transformVersionStats(versions),
  }))
}

export const transformVersionStats = (versionStats) => {
  return Object.entries(versionStats).map(([version, supportStr]) => ({
    version,
    support: transformVersionSupportStr(supportStr),
  }))
}

export const transformVersionSupportStr = (supportStr) => {
  // console.log(supportStr)

  const [statsStr, status, modifiersStr, notesStr] = supportStr.match(statsRe)

  const notes = notesStr
    ? notesStr.split(' ').map((val) => Number.parseInt(val.slice(1)))
    : []

  const modifiers = {
    flagged: modifiersStr ? modifiersStr.includes('d') : false,
    prefixed: modifiersStr ? modifiersStr.includes('x') : false,
  }

  return {
    status: supportStatuses[status],
    modifiers,
    notes,
  }
}
