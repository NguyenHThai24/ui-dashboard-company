import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialLanguage = Cookies.get("language") || "vi";

const languageSlice = createSlice({
  name: "language",
  initialState: { language: initialLanguage },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload; // Update language
      Cookies.set("language", action.payload, { expires: 365 }); // Store language in cookies with 1-year expiry
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
