const schema = `
  directive @uppercase on FIELD_DEFINITION

  type Query {
      hello: String!
      characters(limit: Int = 10, offset: Int): [Character]
      character(id: Int!): Character
    }

  type Character {
      id: String
      name: String
      description: String @uppercase
      modified: String
      thumbnail: String
      resourceURI: String
      urls: [Url]
      #  A resource list of comics in which this character appears.
      comics: [Comic]
      #  A resource list of series in which this character appears.
      series: Resource
      #  A resource list of stories in which this character appears.
      stories: Resource
      #  A resource list of events in which this character appears.
      events: Resource
      # A more detailed list of comic series in which this character appears.
      seriesList: [Serie]
  }

  type Thumbnail {
      path: String
      extension: String
  }

  type Comic {
      name: String
  }

  type Resource {
      available: Int
      collectionURI: String
      items: [Item]
      returned: Int
  }

  type Item {
      resourceURI: String
      name: String
      type: String
  }

  type Url {
      type: String
      url: String
  }

  type Serie {
      id: Int
      title: String
      description: String
      startYear: Int
      endYear: Int
      rating: String
      type: String
      modified: String
  }
`;

export default schema;
