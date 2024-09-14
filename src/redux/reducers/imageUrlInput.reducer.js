const imageUrlInput = (state = '', action) => {
    switch (action.type) {
        case 'SET_IMAGE_URL_INPUT':
            return action.payload
        default:
            return state
    }
}
export default imageUrlInput