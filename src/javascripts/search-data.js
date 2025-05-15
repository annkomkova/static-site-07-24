import Airtable from 'airtable'

const token =
  'patDfDG5wTN6XCIvH.beebf3cf0ed7a537e2f3ece84e15f386dc6cf12e9bb2e9319e4eca068099394f'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: token
})
var base = Airtable.base('appePrphSXY2TX8TD')

function getPostTeasers() {
  return new Promise((resolve, reject) => {
    const content = []

    base('teasers')
      .select({ maxRecords: 100 })
      .firstPage()
      .then((result) => {
        result.forEach((record) => {
          content.push({
            id: record.id,
            title: record.fields['Title'],
            description: record.fields['Description'],
            tags: record.fields['Tags'],
            image: record.fields['Image'],
            url: record.fields['Url'],
            className: record.fields['Class']
          })
        })

        resolve(content)
      })
  })
}

export { getPostTeasers }
