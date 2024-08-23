import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getTeams, createTeam, updateTeam } from "./thunk";

export const initialState = {
  teams: [],
  centerUsers: [],
  filteredTeams: [], // centers that gets filtered after searching
  alreadyRegisteredError: null,
  error: "",
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    getUsersByCenter(state, action) {
      state.centerUsers = state.teams?.find(
        (center) => action.payload == center.id
      ).centerUsers;
    },

    searchCenters(state, action) {
      const inputValue = action.payload.toLowerCase();

      if (inputValue === "") {
        state.filteredTeams = [];
      } else {
        state.filteredTeams = state.teams.filter((team) => {
          return Object.values(team).some((teamVal) => {
            return String(teamVal).toLowerCase().includes(inputValue);
          });
        });
      }
    },
    clearAlreadyRegisteredError: (state) => {
      state.alreadyRegisteredError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeams.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.teams = action.payload?.data.teams;
        state.error = "";
      }
    });

    builder.addCase(createTeam.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.teams = [...state.teams, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Team has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateTeam.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedTeam = action.payload.data.updatedTeam;

        // if (updatedCenter.status === 0) {
        //   state.centers = state.centers.filter(
        //     (center) => center.id !== updatedCenter.id
        //   );
        //   state.error = "";
        //   toast.error("Center has been removed !", {
        //     position: "bottom-center",
        //     autoClose: 3000,
        //     theme: "colored",
        //   });
        // } else {
        state.teams = state.teams.map((team) => {
          if (team.id == updatedTeam.id) {
            team = action.payload.data.updatedTeam;
            return team;
          } else {
            return team;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Team details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
      // }
    });
  },
});

export const { searchCenters, clearAlreadyRegisteredError, getUsersByCenter } =
  teamSlice.actions;
export default teamSlice.reducer;
