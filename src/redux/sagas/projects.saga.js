import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchProjects(action) {
  const projectsResponse = yield axios.get(`/api/projects/${action.payload}`);
  yield put({ type: "SET_PROJECTS", payload: projectsResponse.data });
}

function* projectsSaga() {
  yield takeLatest("FETCH_PROJECTS", fetchProjects);
}

export default projectsSaga;
