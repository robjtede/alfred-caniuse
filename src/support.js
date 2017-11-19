const {
  browserIcon,
  browserName,
  browserType,
  featureUrl,
  marketShare
} = require('./utils')

class SupportItem {
  constructor({ browserId, featureId, db, browsersList }) {
    this.browserId = browserId
    this.featureId = featureId
    this.db = db
    this.browsersList = browsersList
  }

  get versionSupport() {
    return Object.entries(this.db.data[this.featureId].stats[this.browserId])
  }

  get desiredVersionList() {
    const desiredSupport = this.browsersList
      .filter(browser => {
        return browser.split(' ')[0] === this.browserId
      })
      .map(browser => {
        return browser.split(' ')[1]
      })

    return desiredSupport
  }

  get desiredVersionSupport() {
    const versionList = this.desiredVersionList

    return this.versionSupport.filter(([version]) =>
      versionList.includes(version)
    )
  }

  get firstPartialSupportVersion() {
    const [version] =
      this.versionSupport.find(([_, supports]) => {
        return supports.startsWith('a')
      }) || []

    if (version) {
      return version
    } else {
      return
    }
  }

  get firstFullSupportVersion() {
    const [version] =
      this.versionSupport.find(([_, supports]) => {
        return supports.startsWith('y')
      }) || []

    if (version) {
      return version
    } else {
      return
    }
  }

  get safeSupport() {
    return this.desiredVersionSupport.every(
      ([_, supported]) => supported.startsWith('y')
    )
  }

  get noSupport() {
    return this.desiredVersionSupport.every(
      ([_, supported]) => supported.startsWith('n')
    )
  }

  get partialSupport() {
    return this.desiredVersionSupport.every(
      ([_, supported]) => supported.startsWith('p')
    )
  }

  get supportString() {
    if (this.safeSupport) {
      return '✅️ Well supported'
    } else if (this.noSupport) {
      return '❌️ Not supported'
    } else if (this.partialSupport) {
      return `⚠️ Partial support`
    } else {
      if (this.firstFullSupportVersion) {
        return `⚠️ Support in versions >= ${this.firstFullSupportVersion}`
      } else {
        return `⚠️ Partial support in versions >= ${
          this.firstPartialSupportVersion
        }`
      }
    }
  }

  get alfredItem() {
    return {
      title: browserName(this.browserId, this.db),
      subtitle: this.supportString,
      icon: {
        path: `./icons/${browserIcon(this.browserId)}.png`
      },
      valid: false
    }
  }
}

class SupportTable {
  constructor({ featureId, db, browsersList }) {
    if (!(featureId in db.data)) {
      throw new Error(`"${featureId}" is not a valid feature identifier`)
    }

    this.featureId = featureId
    this.db = db
    this.browsersList = browsersList
  }

  get supportItems() {
    const items = Object.entries(this.desiredVersionLists).map(
      ([name, versions]) => {
        return new SupportItem({
          browserId: name,
          featureId: this.featureId,
          db: this.db,
          browsersList: this.browsersList
        })
      }
    )

    const sorted = items.sort((a, b) => {
      const aid = a.browserId
      const bid = b.browserId

      return marketShare(aid, this.db) < marketShare(bid, this.db) ? 1 : -1
    })

    return [
      ...sorted.filter(
        item => browserType(item.browserId, this.db) === 'desktop'
      ),
      ...sorted.filter(
        item => browserType(item.browserId, this.db) === 'mobile'
      )
    ]
  }

  get desiredVersionLists() {
    const desiredSupport = this.browsersList.reduce((acc, info) => {
      const [name, version] = info.split(' ')

      return name in acc
        ? Object.assign({}, acc, { [name]: [version, ...acc[name]] })
        : Object.assign({}, acc, { [name]: [version] })
    }, {})

    return desiredSupport
  }

  get caniuseLinkItem() {
    return {
      title: `Open "${this.featureId}" on caniuse.com`,
      subtitle: 'Show the full compatibility table in your browser',
      icon: {
        path: './icon.png'
      },
      arg: featureUrl(this.featureId)
    }
  }

  get alfredSupportItems() {
    return this.supportItems.map(supportItem => supportItem.alfredItem)
  }

  get alfredItems() {
    return [this.caniuseLinkItem, ...this.alfredSupportItems]
  }
}

module.exports = {
  SupportTable,
  SupportItem
}
