import {createContext, useContext, useReducer} from "react";

const initialState = {
  account: "",
  role: "",
  user: null,
  unauthorizedAlertShown: false,
}
const authReducer = (state, action) => {
  if (action.type === "LOG_IN_USER") {
    return {
      ...state,
      account: action.payload.account,
      role: action.payload.role,
      user: action.payload.user
    }
  }
  if (action.type === "SIGN_UP_USER") {
    return {
      ...state,
      account: action.payload.account,
      role: action.payload.role,
      user: action.payload.user
    }
  }
  if (action.type === "LOG_OUT_USER") {
    return {
      ...initialState,
    }
  }
  if (action.type === "SHOW_UNAUTHORIZED_ALERT") {
    return {
      ...state,
      unauthorizedAlertShown: true,
    }
  }
  if (action.type === "CLOSE_UNAUTHORIZED_ALERT") {
    return {
      ...state,
      unauthorizedAlertShown: false,
    }
  }
}
const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, initialState)

  const logInUser = (data) => {
    dispatch({ type: "LOG_IN_USER", payload: data })
  }
  const signUpUser = () => {
    dispatch({ type: "SIGN_UP_USER" })
  }
  const logOutUser = () => {
    dispatch({ type: "LOG_OUT_USER" })
  }

  const showUnauthorizedAlert = (duration = 5000) => {
    setTimeout(() => {
      dispatch({ type: "CLOSE_UNAUTHORIZED_ALERT"})
    }, duration)
    dispatch({ type: "SHOW_UNAUTHORIZED_ALERT" })
  }

  const closeUnauthorizedAlert = () => {
    dispatch({ type: "CLOSE_UNAUTHORIZED_ALERT"})
  }


  return (
    <AuthContext.Provider value={{
      ...state,
      logInUser,
      signUpUser,
      logOutUser,
      showUnauthorizedAlert,
      closeUnauthorizedAlert
    }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthContext = createContext({})
const useAuthProvider = () => useContext(AuthContext)

export { AuthProvider, useAuthProvider }