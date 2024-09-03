import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProjectItems(action){
    try {
        const newProjectItems = yield axios.get(`/api/projects/items/${action.payload}`)
        yield put({type: 'SET_PROJECT_ITEMS', payload: newProjectItems.data})
    } catch (error) {
        console.log('Error fetching project items: ', error)
    }
}

function* projectItemsSaga(){
    yield takeLatest('FETCH_PROJECT_ITEMS', fetchProjectItems)
}
export default projectItemsSaga