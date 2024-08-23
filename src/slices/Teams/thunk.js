import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTeams as getTeamsApi,
  createTeam as createTeamApi,
  updateTeam as updateTeamApi,
} from "../../helpers/fakebackend_helper";

export const getTeams = createAsyncThunk("teams/getTeams", async () => {
  try {
    const response = await getTeamsApi();
    return response;
  } catch (error) {
    console.log("error inside get team thunk", error);
  }
});

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (values) => {
    try {
      const response = await createTeamApi(values);

      return response;
    } catch (error) {
      console.log("error inside create team thunk", error);
    }
  }
);

export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async ({ teamId, values, status }) => {
    try {
      const response = await updateTeamApi(teamId, values, status);
      return response;
    } catch (error) {
      console.log("error inside update team thunk", error);
    }
  }
);
