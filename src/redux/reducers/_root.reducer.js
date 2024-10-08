import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import projectItems from "./projectItems.reducer";
import projects from "./projects.reducer";
import isEditing from './isEditing.reducer.js'
import projectOwner from './projectOwner.reducer.js'
import tmdbSearchResults from './tmdbSearchResults.reducer.js'
import isUsingImageUrl from "./isUsingImageUrl.reducer.js";
import imageUrlInput from "./imageUrlInput.reducer.js";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in store.js as rootReducer

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  projectItems,
  projects,
  isEditing,
  projectOwner,
  tmdbSearchResults,
  isUsingImageUrl,
  imageUrlInput,
});

export default rootReducer;
