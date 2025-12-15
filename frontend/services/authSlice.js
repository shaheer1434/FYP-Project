import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  refreshToken: null,
  user: null,
  permissions: [],
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
 loginSuccess: (state, action) => {
  const userData = action.payload; // not action.payload.data

  state.token = userData?.token || null;
  state.refreshToken = null;
  state.user = userData?.user
    ? JSON.parse(userData.user)
    : null; // parse stringified JSON
  state.permissions = userData?.permissions ? JSON.parse(userData.permissions) : [];
  state.isAuthenticated = true;

  localStorage.setItem("authToken", state.token || "");
  localStorage.setItem("userId", state.user?.userId?.toString() || "");
},


    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.permissions = [];
      state.isAuthenticated = false;

      // remove local storage items
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
    },

    setTokenFromStorage: (state) => {
      const token = localStorage.getItem("authToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (token) {
        state.token = token;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { loginSuccess, logout, setTokenFromStorage } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const loggedUser = (state) => state.auth.user;
// export const userPermissions = (state) => state.auth.permissions;

export default authSlice.reducer;
