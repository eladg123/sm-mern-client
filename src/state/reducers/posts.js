import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  STOP_LOADING,
  LIKE,
  FETCH_POST,
  COMMENT,
} from '../constants/actionTypes'

export default (state = { isLoading: true, posts: [], post: null }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case STOP_LOADING:
      return { ...state, isLoading: false }
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        ),
      }
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload
          }
          return post
        }),
      }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    case FETCH_POST:
      return { ...state, post: action.payload }
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case UPDATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    default:
      return state
  }
}
