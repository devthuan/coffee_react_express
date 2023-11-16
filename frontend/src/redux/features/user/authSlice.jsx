import { createSlice } from "@reduxjs/toolkit";
import { getItemWithExpiration } from "../../../services/LocalStorage";
const loadState = async () => {
  try {
    const serializedState = await getItemWithExpiration("token");
    if (!serializedState || serializedState === false) {
      return undefined;
    }

    return {
      isLoggedIn: true,
      user: serializedState[1],
    };
  } catch (err) {
    return undefined;
  }
};

const loadPersistedState = async () => {
  return await loadState();
};

const persistedState = await loadPersistedState();

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: [],
};

export const userSlice = createSlice({
  name: "auth",
  initialState: persistedState || initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
