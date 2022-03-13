export const initialState = {
    photos: []
  }
  
  // The reducer's primary job is to listen to actions
  const reducer = (state, action) => {
    console.log(action)
  
    // Action has a type and a payload
    switch (action.type) {
      case 'SET_PHOTOS':
        return {
          ...state,
          photos: action.photos,
        }
      default:
        return state
    }
  }
  
  export default reducer