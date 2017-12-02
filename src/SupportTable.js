const { browserType, featureUrl, marketShare } = require('./utils')
const { SupportItem } = require('./SupportItem')

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
