import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchProjectItems(action) {
  try {
    const newProjectItems = yield axios.get(
      `/api/projects/items/${action.payload}`
    );
    console.log('Fetch Project items Got something!', newProjectItems.data)
    console.log('typeOf x: ', typeof newProjectItems.data[0].x)
    yield put({ type: "SET_PROJECT_ITEMS", payload: newProjectItems.data });
  } catch (error) {
    console.log("Error fetching project items: ", error);
  }
}
function* addCard(action) {
  try {
    yield axios.post(`/api/projects/items`, action.payload);
    yield put({type: 'FETCH_PROJECT_ITEMS', payload: action.payload.projectId})
  } catch (error) {
    console.log("error adding card: ", error);
  }
}

function* projectItemsSaga() {
  yield takeLatest("FETCH_PROJECT_ITEMS", fetchProjectItems);
  yield takeLatest("ADD_CARD", addCard);
}
export default projectItemsSaga;
