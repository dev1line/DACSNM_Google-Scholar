import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom'
import DrawerBar from '../Drawer/index'
import { useDispatch } from 'react-redux'
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
}))

const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <DrawerBar/>
          <Typography className={classes.title} variant='h6' noWrap>
            Google Scholar Mini
          </Typography>
          <Box className={classes.grow} />
          <Box>
          <Link exact="true" to="/">
            <IconButton
              edge='end'
              color='inherit'
            >
              <ExitToAppIcon style={{color:'white'}} />
            </IconButton>
          </Link>
          <IconButton
              edge='end'
              color='inherit'
              onClick={() => {
                localStorage.clear();
                dispatch({type:'DEFAULT'});
              }}
            >
              <ExitToAppIcon style={{color:'red'}}  />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Navbar
