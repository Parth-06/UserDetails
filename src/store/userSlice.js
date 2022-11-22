import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    userInfo: [],
    apiData: [],
    registeredUsers: [
      { name: "trial", email: "trial@gmail.com", password: "pass@123" },
    ],
  },
  reducers: {
    //storing data on logged in user
    setuserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    //storing fetched api data to avoid refetching
    setapiData: (state, action) => {
      state.apiData = action.payload;
    },

    //logging out user
    setLogout: (state, action) => {
      return {
        userInfo: action.payload.value,
        apiData: action.payload.value,
        registeredUsers: action.payload.registeredUsers,
      };
    },

    //storing data of all users that are registered
    setRegister: (state, action) => {
      return {
        ...state,
        registeredUsers: [...state.registeredUsers, action.payload],
      };
    },
  },
});

export const { setuserInfo, setapiData, setLogout, setRegister } =
  userSlice.actions;
export default userSlice.reducer;
