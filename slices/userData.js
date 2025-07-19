import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  email: "",
  password: "",
  confirmPassword: "",
  otp: "",
  token: null
};

export const userDataSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    signUpData: (state, action) => {
      Object.assign(state, action.payload);
    },
    otp: (state, action) => {
      state.otp = action.payload;
    },
    setToken : (state,action) => {
      state.token = action.payload
    }
  }
});

export const { signUpData, otp, setToken } = userDataSlice.actions;

export default userDataSlice.reducer;
