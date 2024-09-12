import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchProjectItems(action) {
  try {
    const newProjectItems = yield axios.get(
      `/api/projects/items/${action.payload}`
    );
    yield put({ type: "SET_PROJECT_ITEMS", payload: newProjectItems.data });
  } catch (error) {
    console.log("Error fetching project items: ", error);
  }
}
function* addCard(action) {
  try {
    yield axios.post(`/api/projects/items`, action.payload);
    yield put({
      type: "FETCH_PROJECT_ITEMS",
      payload: action.payload.projectId,
    });
  } catch (error) {
    console.log("error adding card: ", error);
  }
}
function* setCardSettings(action) {
  try {
    yield axios.patch(
      `/api/projects/items/${action.payload.id}`,
      action.payload
    );
    yield put({
      type: "FETCH_PROJECT_ITEMS",
      payload: action.payload.projectId,
    });
  } catch (error) {
    console.log("Error setting Card Text! ", error);
  }
}
function* deleteCard(action) {
  try {
    yield axios.delete(`/api/projects/items/${action.payload.id}`);
    yield put({ type: "FETCH_PROJECT_ITEMS", payload: action.payload.projectId });
  } catch (error) {
    console.log("Error Deleteing card: ", error);
  }
}
function* fetchProjectOwner(action) {
  try {
    const owner = yield axios.get(`/api/projects/${action.payload}`);
    yield put({ type: "SET_PROJECT_OWNER", payload: owner.data });
  } catch (error) {
    console.log("Error getting the project owner: ", error);
  }
}
function* searchTMDB(action) {
  try {
    const res = yield axios({
      method: "GET",
      url: "/api/thirdparty/tmdb",
      params: {
        q: action.payload,
      },
    });
    yield put({ type: "SET_TMDB_SEARCH_ITEMS", payload: res.data });
  } catch (error) {
    console.log("Error searching TMDB: ", error);
  }
}

function* projectItemsSaga() {
  yield takeLatest("FETCH_PROJECT_ITEMS", fetchProjectItems);
  yield takeLatest("ADD_CARD", addCard);
  yield takeLatest("SET_CARD_SETTINGS", setCardSettings);
  yield takeLatest("DELETE_CARD", deleteCard);
  yield takeLatest("FETCH_PROJECT_OWNER", fetchProjectOwner);
  yield takeLatest("SEARCH_TMDB", searchTMDB);
}
export default projectItemsSaga;
