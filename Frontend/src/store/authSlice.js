import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isAuthenticated: false,
  role: null,
  isLoading: true,
}

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setUser: (state, action) => {
      const user = action.payload
      state.user = user
      state.isAuthenticated = true
      state.role = user?.role || "Student"
      state.isLoading = false
    },
    logoutUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.role = null
      state.isLoading = false
    },
  },
})

export const { setUser, logoutUser, setLoading } = authSlice.actions
export default authSlice.reducer
