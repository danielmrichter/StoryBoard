const imageUrlInput = (state = '', action) => {
    switch (action.type) {
        case 'SET_IMAGE_URL_INPUT':
            return action.payload
        case "CLEAR_SETTINGS_REDUCERS":
            return ''
        default:
            return state
    }
}
export default imageUrlInput