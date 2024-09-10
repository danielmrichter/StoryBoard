const projectOwner = (state = '', action) => {
    switch (action.type) {
        case 'SET_PROJECT_OWNER':
            return action.payload
        default:
            return state;
    }
}

export default projectOwner