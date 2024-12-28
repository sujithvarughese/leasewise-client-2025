import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from "./features/messagesSlice.js"
export const store = configureStore({
  reducer: {
    messages: messagesReducer
  }
})