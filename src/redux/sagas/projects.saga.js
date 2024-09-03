import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchProjects() {
  const projectsResponse = yield axios.get(`/api/projects`);
  yield put({ type: "SET_PROJECTS", payload: projectsResponse.data });
}
function* addProject(action) {
  // This should contain two things in an object:
  // projectName: the name of the project
  // user: an object with information about the user.
  // In the future, more might be added here so it's being handled like this.
  const project = action.payload;
  yield axios.post("/api/projects", { project });
  yield put({ type: "FETCH_PROJECTS" });
}

function* projectsSaga() {
  yield takeLatest("FETCH_PROJECTS", fetchProjects);
  yield takeLatest("ADD_PROJECT", addProject);
}

export default projectsSaga;
