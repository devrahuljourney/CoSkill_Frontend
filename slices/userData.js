import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  email: "",
  password: "",
  confirmPassword: "",
  otp: ""
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
    }
  }
});

export const { signUpData, otp } = userDataSlice.actions;

export default userDataSlice.reducer;
