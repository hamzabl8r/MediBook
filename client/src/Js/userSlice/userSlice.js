import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk("user/register" , async (user)=>{
    try {
        const response = await axios.post("http://localhost:5000/user/register" , user);
        return response.data;
    } catch (error) {
        console.log(error)
    }
});

export const userLogin = createAsyncThunk("user/login", async (user) => {
  try {
    const response = await axios.post("http://localhost:5000/user/login", user);
    console.log("login succ");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const userCurrent = createAsyncThunk("user/current", async () => {
  try {
    const response = await axios.get("http://localhost:5000/user/current" , {
      headers:{
        Authorization : localStorage.getItem("token"),
      }
    });
    console.log(" succ");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
// const initialState = {
//   user: null,
//   status: null,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [userRegister.pending]: (state) => {
//       state.status = "pending";
//     },
//     [userRegister.fulfilled]: (state, action) => {
//       state.status = "success";
//       state.user = action.payload.data.user;
//       localStorage.setItem("token", action.payload.data.token);
//     },
//     [userRegister.rejected]: (state) => {
//       state.status = "fail";
//     },
//     [userLogin.pending]: (state) => {
//       state.status = "pending";
//     },
//     [userLogin.fulfilled]: (state, action) => {
//       state.status = "success";
//       state.user = action.payload.data.user;
//       localStorage.setItem("Token " , action.payload.data.token)
//     },
//     [userLogin.rejected]: (state) => {
//       state.status = "fail";
//     },
//   },

// });

const initialState = {
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
      // .addCase(forgotPassword.pending, (state) => {
      //   state.status = "pending";
      //   state.error = null;
      // })
      // .addCase(forgotPassword.fulfilled, (state, action) => {
      //   state.status = "success";
      //   state.message = action.payload;
      // })
      // .addCase(forgotPassword.rejected, (state, action) => {
      //   state.status = "fail";
      //   state.error = action.payload;
      // })

      // Edit User (NEW)
      // .addCase(editUser.pending, (state) => {
      //   state.status = "pending";
      //   state.error = null;
      // })
      // .addCase(editUser.fulfilled, (state, action) => {
      //   state.status = "success";
      //   state.user = action.payload;
      // })
      // .addCase(editUser.rejected, (state, action) => {
      //   state.status = "fail";
      //   state.error = action.payload;
      // })

      // get all users
      // .addCase(getuser.pending, (state) => {
      //   state.status = "pending";
      //   state.error = null;
      // })
      // .addCase(getuser.fulfilled, (state, action) => {
      //   state.status = "success";
      //   state.userList = action.payload.data?.users || [];
      // })
      // .addCase(getuser.rejected, (state, action) => {
      //   state.status = "fail";
      //   state.userList = [];
      //   state.error = action.payload;
      // })

      // delete user
      // .addCase(deleteuser.pending, (state) => {
      //   state.status = "pending";
      //   state.error = null;
      // })
      // .addCase(deleteuser.fulfilled, (state, action) => {
      //   state.status = "success";
      //   state.userList = action.payload.data;
      // })
      // .addCase(deleteuser.rejected, (state, action) => {
      //   state.status = "fail";
      //   state.error = action.payload;
      // });
  },
});

export const { logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;

// Action creators are generated for each case reducer function

