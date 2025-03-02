const db = require('../../DB/db')

const resolvers = {
    Query: {
        user: async(_, { email }) => {
            const userResult = await db.query(
                'SELECT * FROM users WHERE email = $1', [email]
            )

            const user = userResult.rows[0];

            const persona = await db.query(
                'select * from persona where user_id = $1', [user.id]
            )

            user.persona = persona.rows
            return user;
        },
        users: async () => {
            const users = await db.query(
                'SELECT * FROM users ',[]
            )
            return users.rows
        }
    },

    Mutation: {
        createUser: async (_, { name, email, password }) => {
            const result = await db.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [name, email, password]
              );
              return result.rows[0]
        },
        createPersona: async (_, { user_id, persona_name, quote, description, attitudes, pain, jobs, activities}) => {
            const result = await db.query(
                `Insert into persona (user_id, persona_name, quote, description, attitudes, pain, jobs, activities) values ($1,$2,$3,$4,$5,$6,$7,$8)`,
                [ user_id, persona_name, quote, description, attitudes, pain, jobs, activities ]
            )
            return result.rows[0]
        }
    }
}

module.exports = resolvers