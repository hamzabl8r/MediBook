import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get all Appointments
export const getApp = createAsyncThunk(
  "appointement/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/appointement");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Add a new Appointment
export const addAppointement = createAsyncThunk(
  "appointement/add",
  async (newAppointement, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/appointement/add`,
        newAppointement
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  Delete an Appointment
export const deleteAppointement = createAsyncThunk(
  "appointement/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/appointement/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  Edit an existing Appointment
export const updateAppointement = createAsyncThunk(
  "appointement/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/appointement/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Get Appointments by Doctor ID
export const getAppByDoctorId = createAsyncThunk(
  "appointement/getByDoctorId",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/appointement/doctor/${doctorId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  Slice
const appointementSlice = createSlice({
  name: "appointement",
  initialState: {
    appointements: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Appointments
      .addCase(getApp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getApp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointements = action.payload.appointements;
      })
      .addCase(getApp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Appointment
      .addCase(addAppointement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAppointement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointements.push(action.payload.appointement);
      })
      .addCase(addAppointement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Appointment
      .addCase(deleteAppointement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAppointement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointements = state.appointements.filter(
          (app) => app._id !== action.payload.id
        );
      })
      .addCase(deleteAppointement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Appointment
      .addCase(updateAppointement.pending, (state) => {
        state.status = "loading";
      })
      
      .addCase(updateAppointement.fulfilled, (state, action) => {
        state.status = "succeeded";

        const updatedAppointment = action.payload.updatedAppointment;

        const index = state.appointements.findIndex(
          (app) => app.id === updatedAppointment.id
        );

        if (index !== -1) {
          state.appointements[index] = updatedAppointment;
        }
      })
      .addCase(updateAppointement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAppByDoctorId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAppByDoctorId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointements = action.payload.appointements;
      })
      .addCase(getAppByDoctorId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default appointementSlice.reducer;
