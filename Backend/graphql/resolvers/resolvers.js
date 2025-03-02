const db = require('../../DB/db');

const resolvers = {
    Query: {
        user: async (_, { email }) => {
            const userResult = await db.query(
                'SELECT * FROM users WHERE email = $1', 
                [email]
            );

            const user = userResult.rows[0];

            if (user) {
                const personaResult = await db.query(
                    'SELECT * FROM persona WHERE user_id = $1', 
                    [user.id]
                );
                user.persona = personaResult.rows;
            }

            return user;
        },
        users: async () => {
            const usersResult = await db.query('SELECT * FROM users', []);
            return usersResult.rows;
        }
    },

    Mutation: {
        createUser: async (_, { name, email, password }) => {
            const result = await db.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [name, email, password]
            );
            return result.rows[0];
        },

        createPersona: async (_, { user_id, persona_name, quote, description, attitudes, pain, jobs, activities }) => {
            const result = await db.query(
                `INSERT INTO persona (user_id, persona_name, quote, description, attitudes, pain, jobs, activities)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                [user_id, persona_name, quote, description, attitudes, pain, jobs, activities]
            );
            return result.rows[0];
        },

        updatePersonaForCurrentUser: async (_, { id, persona_name, quote, description, attitudes, pain, jobs, activities }) => {
            const result = await db.query(
                `UPDATE persona SET persona_name = $2, quote = $3, description = $4, attitudes = $5, 
                pain = $6, jobs = $7, activities = $8 WHERE id = $1 RETURNING *`,
                [id, persona_name, quote, description, attitudes, pain, jobs, activities]
            );

            if (result.rows.length === 0) {
                throw new Error("Persona not found");
            }

            return result.rows[0];
        },

        deletePersonaForCurrentUser: async (_, { id }) => {
            const result = await db.query(
                `DELETE FROM persona WHERE id = $1 RETURNING *`,
                [id]
            );

            if (result.rows.length === 0) {
                throw new Error("Persona not found or already deleted");
            }

            return result.rows[0];
        }
    }
};

module.exports = resolvers;
