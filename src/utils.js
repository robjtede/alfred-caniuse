const caniuseRoot = 'https://caniuse.com'

const browserIcon = name => {
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

const browserName = (browser, db) => {
  if (browser in db.agents) {
    return db.agents[browser].browser
  } else {
    return browser
  }
}

const featureUrl = featName => `${caniuseRoot}/#feat=${featName}`

module.exports = {
  browserIcon,
  browserName,
  featureUrl
}
