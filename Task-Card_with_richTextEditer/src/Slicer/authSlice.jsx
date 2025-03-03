import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.currentUser = null
        },

        updatePersonaForCurrentUser: (state, action) => {
            const updatedPersona = action.payload

            if (!state.currentUser.personas) {
                state.currentUser.personas = []
            }

            const index = state.currentUser.personas.findIndex(p => p.id === updatedPersona.id)

            if (index !== -1) {
                state.currentUser.personas[index] = updatedPersona
            } else {
                state.currentUser.personas.push(updatedPersona)
            }
        },

        deletePersonaForCurrentUser: (state, action) => {
            const personaId = action.payload;
            state.currentUser.personas = state.currentUser.personas.filter(p => p.id !== personaId)
        },

        setUser: (state, action) => {
            state.currentUser = action.payload
        },

    }
});

export const { logoutUser, updatePersonaForCurrentUser, deletePersonaForCurrentUser, setUser } = authSlice.actions;
export default authSlice.reducer;
