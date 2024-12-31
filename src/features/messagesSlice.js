import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosDB } from '../utilities/axios.js'

const initialState = {
  messageHeadNodes: [],
  currentMessage: [],
  addressBook: [],
  newMessages: 0,
  showCreateMessageForm: false,
  isLoading: false,
}

const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (userID) => {
    try {
      // retrieve all messages where sender or recipient matches using req.user info that is stored at login
      const response = await axiosDB("/messages")
      const { messages } = response.data
      const unread = messages.reduce((acc, message) => (message.read === false && message.recipient._id === userID) ? acc + 1 : acc + 0, 0)
      return { messages, unread }
    } catch (error) {
      throw new Error(error)
    }
  }
)

const fetchCurrentMessage = createAsyncThunk(
  "messages/fetchCurrentMessage",
  async (messageHeadId) => {
    try {
      const response = await axiosDB(`/messages/previous/${messageHeadId}`)
      const { previousMessages } = response.data
      return previousMessages
    } catch (error) {
      throw new Error(error)
    }
  }
)

const fetchUserList = createAsyncThunk(
  "messages, fetchUserList",
  async () => {
    try {
      const response = await axiosDB("/auth/getUserList")
      const { userList } = response.data
      return userList
    } catch (error) {
      console.log(error);
    }
  }
)

const fetchAdminInfo = createAsyncThunk(
  "messages, fetchAdminInfo",
  async () => {
    try {
      const response = await axiosDB("/auth/getAdminInfo")
      const { adminInfo } = response.data
      return adminInfo
    } catch (error) {
      console.log(error);
    }
  }
)

const toggleFlag = createAsyncThunk(
  "messages, toggleFlag",
  async (messageHeadId) => {
    try {
      await axiosDB.patch("/messages/flag", messageHeadId)
      await fetchCurrentMessage(messageHeadId)
    } catch (error) {
      throw new Error(error)
    }
  }
)

const markMessageRead = createAsyncThunk(
  "messages/markMessageRead",
  async (messageHeadId) => {
    try {
      await axiosDB.patch("/messages/read", { _id: messageHeadId })
      await fetchCurrentMessage(messageHeadId)
    } catch (error) {
      throw new Error(error)
    }
  }
)

const markMessageUnread = createAsyncThunk(
  "messages/markMessageUnread",
  async (messageHeadId) => {
    try {
      await axiosDB.patch("/messages/unread", { _id: messageHeadId })
      await fetchCurrentMessage(messageHeadId)
    } catch (error) {
      throw new Error(error)
    }
  }
)

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setCurrentMessage: (state, action) => {
      state.currentMessage = action.payload
    },
    setShowCreateMessageForm: (state, action) => {
      state.showCreateMessageForm = action.payload
    }
  },
  extraReducers: (builder => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messageHeadNodes = action.payload.messages
        state.unread = action.payload.unread
        state.isLoading = false
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })

      .addCase(fetchCurrentMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCurrentMessage.fulfilled, (state, action) => {
        state.currentMessage = action.payload
        state.isLoading = false
      })
      .addCase(fetchCurrentMessage.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })

      .addCase(fetchUserList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.addressBook = action.payload
        state.isLoading = false
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })

      .addCase(fetchAdminInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAdminInfo.fulfilled, (state, action) => {
        state.addressBook = action.payload
        state.isLoading = false
      })
      .addCase(fetchAdminInfo.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })

      .addCase(toggleFlag.pending, (state) => {
        state.isLoading = true
      })
      .addCase(toggleFlag.fulfilled, (state) => {
        state.currentMessage[0].flag = !state.currentMessage[0].flag
        state.isLoading = false
      })
      .addCase(toggleFlag.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })

      .addCase(markMessageRead.pending, (state) => {
        state.isLoading = true
      })
      .addCase(markMessageRead.fulfilled, (state) => {
        state.message = { ...state.message, read: true }
        state.isLoading = false
      })
      .addCase(markMessageRead.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })

      .addCase(markMessageUnread.pending, (state) => {
        state.isLoading = true
      })
      .addCase(markMessageUnread.fulfilled, (state) => {
        state.message = { ...state.message, read: false }
        state.isLoading = false
      })
      .addCase(markMessageUnread.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });



  })
})

export const {
  setCurrentMessage,
  setShowCreateMessageForm
} = messagesSlice.actions
export default messagesSlice.reducer
export {
  fetchMessages,
  fetchCurrentMessage,
  toggleFlag,
  fetchUserList,
  fetchAdminInfo,
  markMessageRead,
  markMessageUnread
}
