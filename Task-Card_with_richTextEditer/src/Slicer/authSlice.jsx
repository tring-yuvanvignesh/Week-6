import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.currentUser = null;
        },

        createPersonaForCurrentUser: (state, action) => {
            const newPersona = action.payload;

            if (!state.currentUser.persona) {
                state.currentUser.persona = [];
            }

            state.currentUser.persona.push(newPersona);
        },

        updatePersonaForCurrentUser: (state, action) => {
            const updatedPersona = action.payload;
            const index = state.currentUser.persona.findIndex(p => p.id === updatedPersona.id);

            if (index !== -1) {
                state.currentUser.persona[index] = updatedPersona;
            }
        },

        deletePersonaForCurrentUser: (state, action) => {
            const personaId = action.payload;
            state.currentUser.persona = state.currentUser.persona.filter(p => p.id !== personaId);
        },

        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
    }
});

export const { logoutUser, createPersonaForCurrentUser, updatePersonaForCurrentUser, deletePersonaForCurrentUser, setUser } = authSlice.actions;
export default authSlice.reducer;
