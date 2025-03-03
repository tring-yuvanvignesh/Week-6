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
                    image
                }
            }
        }
    `;

export const CREATE_PERSONA = gql`
  mutation CreatePersona(
    $persona_name: String!,
    $quote: String!,
    $description: String!,
    $attitudes: String!,
    $pain: String!,
    $jobs: String!,
    $activities: String!,
    $image: String!,
    $user_id: Int! 
  ) {
    createPersona(
        persona_name: $persona_name,
        quote: $quote,
        description: $description,
        attitudes: $attitudes,
        pain: $pain,
        jobs: $jobs,
        activities: $activities,
        image: $image,
        user_id: $user_id 
    ) {
      id
      persona_name
      quote
      description
      attitudes
      pain
      jobs
      activities
      image
      user_id
    }
  }
`;

export const UPDATE_PERSONA = gql`
        mutation UpdatePersona(
            $id: Int!
            $persona_name: String!
            $quote: String!
            $description: String!
            $attitudes: String!
            $pain: String!
            $jobs: String!
            $activities: String!
            $image: String!
        ) {
            updatePersonaForCurrentUser(
            id: $id
            persona_name: $persona_name
            quote: $quote
            description: $description
            attitudes: $attitudes
            pain: $pain
            jobs: $jobs
            activities: $activities
            image: $image
            ) {
            id
            persona_name
            quote
            description
            attitudes
            pain
            jobs
            activities
            image
            }
  }
`;

export const DELETE_PERSONA = gql`
        mutation DeletePersona($id: ID!) {
            deletePersonaForCurrentUser(id: $id) {
            id
            }
        }
`;


export const LOGIN_USER = gql`
        mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
            id
            name
            email
            persona {
                id
                persona_name
                quote
                description
                attitudes
                pain
                jobs
                activities
                image
            }
        }}
    }
`;