import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import useStyles from './styles'
import { getPost, getPostsBySearch } from '../../state/actions/posts'
import CommentSection from './CommentSection'

const PostDetails = () => {
  const classes = useStyles()
  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') })) // get the reccommended posts by similar tags
    }
  }, [post])

  if (!post) return null

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

  const openPost = (_id) => {
    history.push(`/posts/${_id}`)
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            color="textSecondary"
            gutterBottom
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="textSecondary"
            gutterBottom
          >
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography>{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px' }}></Divider>
          <Typography variant="body1">
            <strong>Realtime Chat - comming soon!</strong>
          </Typography>
          <CommentSection post={post} />
          <Divider style={{ margin: '20px' }}></Divider>
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
          />
        </div>
      </div>
      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  style={{ cursor: 'pointer', margin: '20px' }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography variant="h6" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {name}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {message}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails
