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
            // set data to local storage
            localStorage.setItem('user', JSON.stringify(action.payload.user));
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
            else if (target == "QUESTION")
                state.day.dsa.push(tid);
        },
        removeTask: (state, action) => {
            let { target, tid } = action.payload;

            const removeFromArray = (arr, element) => {
                const index = arr.indexOf(element);
                if (index !== -1) {
                    arr.splice(index, 1);
                }
            };

            if (target === "TODO") {
                removeFromArray(state.profile.todos, tid);
            } else if (target === "WORK") {
                removeFromArray(state.day.work, tid);
            } else if (target === "QUESTION") {
                removeFromArray(state.day.dsa, tid);
            }
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.pid = '';
            state.did = '';
            state.dayIndex = null;
            state.user = null;
            state.profile = null;
            state.day = null;
        }
    }
});

export const { login, activate, setProfile, setDay, setDayIndex, addTask, removeTask, logout } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;