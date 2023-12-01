import { activate, addTask, login, logout, removeTask, setDay, setDayIndex, setProfile } from "./reducers/userSlice";
import { store } from "./store";

export { store, login, activate, setProfile, setDay, setDayIndex, addTask, removeTask, logout }