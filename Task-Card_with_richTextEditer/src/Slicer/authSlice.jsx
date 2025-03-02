    // import { createSlice } from "@reduxjs/toolkit"

    // const getUsersFromLocalStorage = () => {
    //     const users = localStorage.getItem("users")
    //     return users ? JSON.parse(users) : []
    // };

    // const getCurrentUserFromLocalStorage = () => {
    //     const user = localStorage.getItem("currentUser");
    //     return user ? JSON.parse(user) : null
    // };

    // const authSlice = createSlice({
    //     name: "auth",
    //     initialState: {
    //         users: getUsersFromLocalStorage(),
    //         // currentUserData: getCurrentUserFromLocalStorage(),
    //         currentUser: getCurrentUserFromLocalStorage()
    //     },
    //     reducers: {
    //         registerUser: (state, action) => {

    //             // using users state, users local

    //             const users = getUsersFromLocalStorage()
    //             users.push({ ...action.payload, personas: [] }) // update users state
    //             localStorage.setItem("users", JSON.stringify(users)) // update users local
    //             state.users = users
    //         },

    //         loginUser: (state, action) => {

    //             // using currUser state, users local

    //             const { email, password } = action.payload
    //             const users = getUsersFromLocalStorage()
    //             const user = users.find(user => user.email === email && user.password === password)
                
    //             if (user) {
    //                 state.currentUser = user; // update currUser state
    //                 localStorage.setItem("currentUser", JSON.stringify(user)) // update currUser local
    //             } else {
    //                 alert("Invalid email or password")
    //             }
    //         },

    //         logoutUser: (state) => {
    //             localStorage.removeItem("currentUser")
    //             state.currentUser = null
    //         },
            
    //         updatePersonaForCurrentUser: (state, action) => {

    //                 // using currUser state, currUser local, update users state, user local 

    //                 const updatedPersona = action.payload

    //                 if (!state.currentUser.personas) {
    //                     state.currentUser.personas = []
    //                 }

    //                 const index = state.currentUser.personas.findIndex(p => p.id === updatedPersona.id); // Get particular persona / -1

    //                 // update currUser state
    //                 if (index !== -1) { 
    //                     state.currentUser.personas[index] = updatedPersona
    //                 } else { 
    //                     state.currentUser.personas.push({ ...updatedPersona }) 
    //                 }

    //                 // update in currUser local
    //                 localStorage.setItem("currentUser", JSON.stringify(state.currentUser))

    //                 // update users state
    //                 const users = getUsersFromLocalStorage()
    //                 const updatedUsers = users.map(user => 
    //                     user.email === state.currentUser.email // get the correct user
    //                         ? { ...user, personas: state.currentUser.personas }
    //                         : user
    //                 )

    //                 // update users local
    //                 localStorage.setItem("users", JSON.stringify(updatedUsers))
    //                 state.users = updatedUsers
    //         },
    //         deletePersonaForCurrentUser: (state, action) => {

    //             // using currUser state, users state, currUser local, users local


    //             const Pid = action.payload
    //             const updatedData = state.currentUser.personas.filter( p => p.id !== Pid)

    //             // update curruser state
    //             state.currentUser.personas = updatedData

    //             // update currUser local
    //             localStorage.setItem("currentUser", JSON.stringify({
    //                 ...state.currentUser,
    //                 personas: updatedData
    //             }))

    //             // update users state
    //             const users = getUsersFromLocalStorage()
    //             const updatedUsers = users.map(user =>
    //                 user.email === state.currentUser.email
    //                     ? { ...user, personas: state.currentUser.personas }
    //                     : user
    //             )

    //             // update users local
    //             localStorage.setItem("users", JSON.stringify(updatedUsers))
    //             state.users = updatedUsers
    //         }
    //     }
    // })

    // export const { registerUser, loginUser, logoutUser, updatePersonaForCurrentUser, deletePersonaForCurrentUser } = authSlice.actions
    // export default authSlice.reducer




    import { createSlice } from "@reduxjs/toolkit"

    const getUsersFromLocalStorage = () => {
        const users = localStorage.getItem("users")
        return users ? JSON.parse(users) : []
    };

    const getCurrentUserFromLocalStorage = () => {
        const user = localStorage.getItem("currentUser");
        return user ? JSON.parse(user) : null
    };

    const authSlice = createSlice({
        name: "auth",
        initialState: {
            users: getUsersFromLocalStorage(),
            // currentUserData: getCurrentUserFromLocalStorage(),
            currentUser: getCurrentUserFromLocalStorage(),
            user_apollo: null,
            users_apollo: []
        },
        reducers: {
            registerUser: (state, action) => {

                // using users state, users local

                const users = getUsersFromLocalStorage()
                users.push({ ...action.payload, personas: [] }) // update users state
                localStorage.setItem("users", JSON.stringify(users)) // update users local
                state.users = users
            },

            loginUser: (state, action) => {

                // using currUser state, users local

                const { email, password } = action.payload
                const users = getUsersFromLocalStorage()
                const user = users.find(user => user.email === email && user.password === password)
                
                if (user) {
                    state.currentUser = user; // update currUser state
                    localStorage.setItem("currentUser", JSON.stringify(user)) // update currUser local
                } else {
                    alert("Invalid email or password")
                }
            },

            logoutUser: (state) => {
                localStorage.removeItem("currentUser")
                state.currentUser = null
            },
            
            updatePersonaForCurrentUser: (state, action) => {

                    // using currUser state, currUser local, update users state, user local 

                    const updatedPersona = action.payload

                    if (!state.currentUser.personas) {
                        state.currentUser.personas = []
                    }

                    const index = state.currentUser.personas.findIndex(p => p.id === updatedPersona.id); // Get particular persona / -1

                    // update currUser state
                    if (index !== -1) { 
                        state.currentUser.personas[index] = updatedPersona
                    } else { 
                        state.currentUser.personas.push({ ...updatedPersona }) 
                    }

                    // update in currUser local
                    localStorage.setItem("currentUser", JSON.stringify(state.currentUser))

                    // update users state
                    const users = getUsersFromLocalStorage()
                    const updatedUsers = users.map(user => 
                        user.email === state.currentUser.email // get the correct user
                            ? { ...user, personas: state.currentUser.personas }
                            : user
                    )

                    // update users local
                    localStorage.setItem("users", JSON.stringify(updatedUsers))
                    state.users = updatedUsers
            },
            deletePersonaForCurrentUser: (state, action) => {

                // using currUser state, users state, currUser local, users local


                const Pid = action.payload
                const updatedData = state.currentUser.personas.filter( p => p.id !== Pid)

                // update curruser state
                state.currentUser.personas = updatedData

                // update currUser local
                localStorage.setItem("currentUser", JSON.stringify({
                    ...state.currentUser,
                    personas: updatedData
                }))

                // update users state
                const users = getUsersFromLocalStorage()
                const updatedUsers = users.map(user =>
                    user.email === state.currentUser.email
                        ? { ...user, personas: state.currentUser.personas }
                        : user
                )

                // update users local
                localStorage.setItem("users", JSON.stringify(updatedUsers))
                state.users = updatedUsers
            },
            setUser: (state, action) => {
                state.user_apollo = action.payload;
            },
            setUsers: (state, action) => {
                state.users_apollo = action.payload;
            },
        }
    })

    export const { registerUser, loginUser, logoutUser, updatePersonaForCurrentUser, deletePersonaForCurrentUser, setUser, setUsers } = authSlice.actions
    export default authSlice.reducer
