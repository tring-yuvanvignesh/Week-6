const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('../graphql/Typedef/typedef')
const resolvers = require('../graphql/resolvers/resolvers')

async function startServer(app) {
    const server = new ApolloServer({ typeDefs, resolvers})
    await server.start()
    app.use('/graphql', expressMiddleware(server))
}

module.exports = startServer