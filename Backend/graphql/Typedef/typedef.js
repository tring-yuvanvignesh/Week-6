const gql = require("graphql-tag"); 

const typedef = gql`
    type User {
        id: Int
        name: String!
        email: String!
        password: String!
        persona: [Persona]
    }

    type Persona {
        user_id: Int!
        persona_name: String!
        quote: String!
        description: String!
        attitudes: String!
        pain: String!
        jobs: String!
        activities: String!
    }   

    type Query {
        users: [User]
        user(email: String!): User
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User
        createPersona(user_id: Int!, persona_name: String!, quote: String!, description: String!, attitudes: String!, pain: String!, jobs: String!, activities: String!): Persona
    }
`

module.exports = typedef