const db = require('../../DB/db');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const { authenticateUser } = require('../../authMiddleware/authMiddleware');
require('dotenv').config()


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
            try {
                const existingUser = await db.query('SELECT id FROM users WHERE email = $1', [email]);

                if (existingUser.rows.length > 0) {
                    throw new Error("Email is already in use!");
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const result = await db.query(
                    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                    [name, email, hashedPassword]
                );

                return result.rows[0];
            } catch (error) {
                throw new Error(error.message);
            }
        },

        loginUser: async (_, { email, password }) => {

            const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            const user = userResult.rows[0];

            if (!user) {
                throw new Error("User not found");
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                throw new Error("Invalid password");
            }

            const personaResult = await db.query("SELECT * FROM persona WHERE user_id = $1", [user.id]);
            const personas = personaResult.rows; 

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });

            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    persona: personas, 
                }
            }
        },

        createPersona: async (_, { persona_name, quote, description, attitudes, pain, jobs, activities, image }, { req }) => {
            const user = authenticateUser(req)
        
            const result = await db.query(
                `INSERT INTO persona (user_id, persona_name, quote, description, attitudes, pain, jobs, activities, image)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
                [user.id, persona_name, quote, description, attitudes, pain, jobs, activities, image]
            )
        
            return result.rows[0]
        },
        

        updatePersonaForCurrentUser: async (_, { id, persona_name, quote, description, attitudes, pain, jobs, activities, image }, { req }) => {
            
            const user = authenticateUser(req)
            const checkResult = await db.query("SELECT * FROM persona WHERE id = $1 AND user_id = $2", [id, user.id])
            if (checkResult.rows.length === 0) {
                throw new Error("Unauthorized")
            }
        
            const result = await db.query(
                `UPDATE persona SET persona_name = $2, quote = $3, description = $4, attitudes = $5, 
                 pain = $6, jobs = $7, activities = $8, image = $9 WHERE id = $1 RETURNING *`,
                [id, persona_name, quote, description, attitudes, pain, jobs, activities, image]
            );
        
            if (result.rows.length === 0) {
                throw new Error("Persona not found")
            }
        
            return result.rows[0];
        },
        

        deletePersonaForCurrentUser: async (_, { id }, { req }) => {

            const user = authenticateUser(req);
            const checkResult = await db.query("SELECT * FROM persona WHERE id = $1 AND user_id = $2", [id, user.id]);
            if (checkResult.rows.length === 0) {
                throw new Error("Unauthorized")
            }
            const result = await db.query(
                "DELETE FROM persona WHERE id = $1 RETURNING *",
                [id]
            )
            if (result.rows.length === 0) {
                throw new Error("Persona not found or already deleted")
            }
            return result.rows[0]
        },
        
    }
};

module.exports = resolvers;
