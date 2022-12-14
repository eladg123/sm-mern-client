import * as api from '../../api/index'
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  STOP_LOADING,
  START_LOADING,
  FETCH_POST,
  LIKE,
  COMMENT,
} from '../constants/actionTypes'

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchPosts(page)
    dispatch({ type: FETCH_ALL, payload: data })
    dispatch({ type: STOP_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchPost(id)
    dispatch({ type: FETCH_POST, payload: data })
    dispatch({ type: STOP_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery)
    dispatch({ type: FETCH_BY_SEARCH, payload: data })
    dispatch({ type: STOP_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.createPost(post)
    history.push(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)
    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const commentPost = (value, postId) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, postId)
    dispatch({ type: COMMENT, payload: data })
    return data.comments
  } catch (error) {
    console.log(error)
  }
}
