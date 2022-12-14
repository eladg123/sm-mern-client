import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core'
import useStyles from './styles'
import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../state/constants/actionTypes'
import decode from 'jwt-decode'

const Navbar = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const logout = () => {
    dispatch({ type: LOGOUT })
    history.push('/')
    setUser(null)
  }

  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/">
          <img src={memoriesText} alt="icon" height="45px" />
          <img
            className={classes.image}
            src={memoriesLogo}
            alt="memories logo"
            height="40px"
          />
        </Link>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
