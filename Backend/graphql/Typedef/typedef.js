const gql = require("graphql-tag");

const typedef = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        persona: [Persona]
    }

    type Persona {
        id: Int!
        user_id: Int!
        persona_name: String!
        quote: String!
        description: String!
        attitudes: String!
        pain: String!
        jobs: String!
        activities: String!
        image: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        users: [User]
        user(email: String!): User
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User
        loginUser(email: String!, password: String!): AuthPayload

        createPersona(
            user_id: Int!, 
            persona_name: String!, 
            quote: String!, 
            description: String!, 
            attitudes: String!, 
            pain: String!, 
            jobs: String!, 
            activities: String!, 
            image: String!
        ): Persona

        updatePersonaForCurrentUser(
            id: Int!, 
            persona_name: String!, 
            quote: String!, 
            description: String!, 
            attitudes: String!, 
            pain: String!, 
            jobs: String!, 
            activities: String!, 
            image: String!
        ): Persona

        deletePersonaForCurrentUser(id: Int!): Persona
    }
`;

module.exports = typedef;
