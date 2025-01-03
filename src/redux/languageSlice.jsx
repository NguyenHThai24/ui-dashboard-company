import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialLanguage = Cookies.get("language") || "vi";

const languageSlice = createSlice({
  name: "language",
  initialState: { language: initialLanguage },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload; 
      Cookies.set("language", action.payload, { expires: 1 }); 
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
