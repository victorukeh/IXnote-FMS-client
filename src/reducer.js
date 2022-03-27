export const initialState = {
  posts: [],
  file: [],
  query: null,
  searchQuery: null,
  wait: false,
  run: false,
}

const reducer = (state, action) => {
  console.log(action)

  // Action has a type and a payload
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.posts,
      }
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.items,
      }
    case 'SET_FILE':
      return {
        ...state,
        file: action.file,
      }
    case 'SET_QUERY':
      return {
        ...state,
        query: action.query,
      }
    case 'SET_SEARCHQUERY':
      return {
        ...state,
        searchQuery: action.searchQuery,
      }
    case 'SET_WAIT':
      return {
        ...state,
        wait: action.wait,
      }
    case 'SET_RUN':
      return {
        ...state,
        run: action.run,
      }
    default:
      return state
  }
}

export default reducer
