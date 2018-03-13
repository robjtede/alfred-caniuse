export const caniuseRoot = 'https://caniuse.com'

export const browserIcon = name => {
  const icons = {
    firefox: 'firefox',
    and_ff: 'firefox',
    and_chr: 'chrome',

    chrome: 'chrome',

    ie: 'ie',
    ie_mob: 'ie',

    edge: 'edge',

    safari: 'safari',
    ios_saf: 'safari',

    opera: 'opera',
    op_mini: 'opera',
    op_mob: 'opera',

    and_qq: 'qq',
    and_uc: 'uc',
    android: 'android',
    baidu: 'baidu',
    samsung: 'samsung',
    bb: 'other'
  }

  return name in icons ? icons[name] : 'other'
}

export const browserName = (name, db) => {
  if (name in db.agents) {
    return db.agents[name].browser
  } else {
    return name
  }
}

export const featureUrl = featName => `${caniuseRoot}/#feat=${featName}`

export const marketShare = (browserId, db) => {
  return Object.entries(db.agents[browserId].usage_global).reduce(
    (tot, [version, share]) => tot + share,
    0
  )
}

export const browserType = (name, db) => {
  return db.agents[name].type
}

export const exactMatch = (input, db) => {
  const truncated = input.slice(0, input.length - 1)

  if (input.endsWith('!') && truncated in db) {
    return truncated
  } else {
    return false
  }
}

export const stripE = str => {
  return Number.parseInt(str.slice(1), 10)
}

export const sortByEra = (a, b) => {
  return stripE(a) - stripE(b)
}
