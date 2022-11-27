import React, { useEffect, useState } from 'react'
import {
  Grow,
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch } from '../../state/actions/posts'
import Pagination from '../Pagination/Pagination'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import useStyles from './styles'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const query = useQuery()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost() //search post when you enter the enter keyboard
    }
  }

  const handleAdd = (tag) => {
    setTags([...tags, tag])
  }
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search: search, tags: tags.join(',') })) // we cant pass an array through the params so we pass it through string
      history.push(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`,
      )
    } else {
      history.push('/')
    }
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
