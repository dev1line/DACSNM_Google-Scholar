import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch} from 'react-redux'
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

const DrawerBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = anchor => (
    <Box
      className={clsx(classes.list)}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button key="Query" onClick={() => dispatch({type:"DEFAULT"})}>
            <ListItemIcon>
             <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Query"/>
          </ListItem>
          <ListItem button key="User" onClick={() => dispatch({type:'USER'})} >
            <ListItemIcon>
             <MailIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>
      </List>
    </Box>
  )

  return (
          <React.Fragment key={"left"}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          
            <Drawer open={state["left"]} onClose={toggleDrawer("left", false)}>
              {list("left")}
            </Drawer>
          </React.Fragment>
  )
}

export default DrawerBar
