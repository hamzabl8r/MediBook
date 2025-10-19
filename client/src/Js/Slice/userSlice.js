import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://medibook-1-e9bu.onrender.com/user/register",
        user
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://medibook-1-e9bu.onrender.com/user/login",
        user
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userCurrent = createAsyncThunk(
  "user/current",
  async (thunkAPI) => { 
    try {
      const response = await axios.get(
        "https://medibook-1-e9bu.onrender.com/user/current",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update User 
export const editUser = createAsyncThunk(
  "user/update",
  async ({ id, editprofil }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://medibook-1-e9bu.onrender.com/user/${id}`,
        editprofil
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update user ");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://medibook-1-e9bu.onrender.com/user/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAll",
  async (thunkAPI) => { 
    try {
      const response = await axios.get("https://medibook-1-e9bu.onrender.com/user");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// forgot password 
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://medibook-1-e9bu.onrender.com/user/forgot-password",
        { email }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de l'envoi de l'email"
      );
    }
  }
);
//  reset password 
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://medibook-1-e9bu.onrender.com/user/reset-password/${token}`,
        { password }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const initialState = {
  user: null,
  status: null, 
  error: null,
  message: null,
  userList: [],
};

// ✅ Redux Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // User Registration
      .addCase(userRegister.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      })

      // User Login
      .addCase(userLogin.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      })

      // Get Current User
      .addCase(userCurrent.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(userCurrent.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
      })
      .addCase(userCurrent.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      })

      // Forgot Password (NEW)
      .addCase(forgotPassword.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.msg;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.msg;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload && action.payload.msg) {
          state.error = action.payload.msg;
        } else {
          state.error =
            "An unexpected error occurred. Please check your connection and try again.";
        }
      })

      // Edit User (NEW)
      .addCase(editUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      })
      // get all users
      .addCase(getAllUsers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.userList = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      })

      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userList = action.payload.data;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      });
  },
});

export const { logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;