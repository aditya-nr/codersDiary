import { createSlice } from "@reduxjs/toolkit";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        isLoggedIn: false,
        pid: "",
        did: "",
        dayIndex: null,
        user: null,
        profile: null,
        day: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        activate: (state, action) => {
            state.user.activated = true;
        },
        setProfile: (state, action) => {
            let profile = action.payload.profile;
            delete profile.days;
            state.profile = profile;
            state.pid = profile._id;
        },
        setDay: (state, action) => {
            state.day = action.payload.day;
            state.did = action.payload.day._id;
        },
        setDayIndex: (state, action) => {
            state.dayIndex = action.payload;
        },
        addTask: (state, action) => {
            let { target, tid } = action.payload;
            if (target == "TODO")
                state.profile.todos.push(tid);
            else if (target == "WORK")
                state.day.work.push(tid);
            else if (target == "QUESTIONS")
                state.day.dsa.push(tid);
        }
    }
});

export const { login, activate, setProfile, setDay, setDayIndex, addTask } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;