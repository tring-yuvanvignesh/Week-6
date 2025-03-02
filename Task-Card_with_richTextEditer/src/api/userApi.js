    import { gql } from "@apollo/client";

    export const CREATE_USER = gql`
        mutation CreateUser($name: String!, $email: String!, $password: String!) {
            createUser(name: $name, email: $email, password: $password) {
                id
                name
                email
            }
        }
    `;

    export const GET_USER = gql`
        query GetUser($email: String!) {
            user(email: $email) {
                id
                name
                email
                password
                persona {
                    id
                    persona_name
                    quote
                    description
                    attitudes
                    pain
                    jobs
                    activities
                }
            }
        }
    `;

    export const GET_USERS = gql`
        query GetUsers {
            users {
                id
                name
                email
            }
        }
    `;  