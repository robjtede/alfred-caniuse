const { browserIcon, browserName, featureUrl } = require('./utils')

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

  get safeSupport() {
    return this.desiredVersionSupport.every(
      ([version, supported]) => supported === 'y'
    )
  }

  get noSupport() {
    return this.desiredVersionSupport.every(
      ([version, supported]) => supported === 'n'
    )
  }

  get supportString() {
    if (this.safeSupport) {
      return '✅️ Well Supported'
    } else if (this.noSupport) {
      return '❌️ Not Supported'
    } else {
      return '⚠️ Partial support'
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

    return items
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
