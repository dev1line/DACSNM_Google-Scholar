import React, { useRef, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import SearchIcon from '@material-ui/icons/Search'

import {
  Box,
  List,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  root: {
    marginTop:'150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%'
    },
  },
  show: {
    display: 'flex',
    marginTop: '10px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconSearch: {
    color: 'gray',
    borderRadius: '20%',
    fontSize: '60px',
    cursor: 'pointer',
    '&:hover': {
      color: '#AEDE41'
    }
  },
  boxSearch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '40px',
    '& > div > div ': {
      borderRadius: '40px'
    },
    width: '100%'
  },
  pdf: {
    cursor: 'pointer'
  },
  image: {
    maxWidth: '295px',
    width: '100%',
    height: 'auto'
  },
  listRoot: {
    "& > div > li > div > div > p > a": {
      textDecoration: 'none'
    }
  },
  group2: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center',
  },
  group1: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
  }
}))

export default function Home () {
  const dispatch = useDispatch()
  const data = useSelector(state => state.query.data)
  const err = useSelector(state => state.query.err)
  const query = useSelector(state => state.query.query)
  // const deFault = useSelector(state => state.query.default)
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const [p, setP] = useState('')
  const classes = useStyles()
  const typingTimeoutRef = useRef(null)
  console.log('data', data)
  console.log('err', err)
  console.log('query', query)
  useEffect(() => {
    if (localStorage.getItem("show"))  
    setShow(localStorage.getItem("show"))
  },[])
  const handleClick = () => {
    if (value === '') {
      setP('Please fill a search field.')
    } else {
      setP('')
      dispatch({ type: 'GET_QUERY', q: value, query })
      setShow(true)
      localStorage.setItem("show", true);
    }
  }

  const handleChange = e => {
    const q = e.target.value
    setValue(q)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setValue(q)
      console.log(q)
    }, 500)
  }
  if(err) {
    return (
      <Box style={{display:'flex', justifyContent:'center', alignItems:'center', color:'red'}}>
        NO DATA FOR DISPLAY !
      </Box>
    )
  }
  return (
    <Box className={!show ? classes.root :classes.show}>
    <Box className={(!show||show === false) ? classes.group1: classes.group2 }>
          <Box>
            <img src='Google_Scholar.png' alt='gs' className={classes.image} />
          </Box>
        <Box>
          <Typography>{p}</Typography>
        </Box>
        <Box className={classes.boxSearch}>
          <TextField
            style={{
              minWidth: '40vw',
              width: '50%',
              borderRadius: '40px',
              outline: 'none',
              backgroundColor: 'white'
            }}
            type='search'
            variant='outlined'
            value={value}
            onChange={handleChange}
            onKeyDown={handleClick}
          />
          <SearchIcon className={classes.iconSearch} onClick={handleClick} />
        </Box>
      </Box>
      <Box className={classes.showList}>
        <List className={classes.listRoot}>
          {data &&
            data.map((paper, index) => {
              return (
                <Box key={index}>
                  <ListItem>
                    <ListItemText
                      primary={paper.title}
                      secondary={
                        <>
                          <Typography component='span' variant='body2'>
                            {query ? paper.description.slice(0, -2).concat('...'): paper.journal}
                          </Typography>
                          <br />
                          <Typography component='span' variant='body2'>
                            {query ? "": paper.pages}
                          </Typography>
                          <Typography component='span' variant='body2'>
                            {query ? "": paper.volume}
                          </Typography>
                          <br />
                          <Typography component='span' variant='body2'>
                            {paper.authors.join(' - ').slice(0, -1)}
                          </Typography>
                          <br />          
                          <Link
                            to={{
                              pathname: '/paper',
                              state: { paper }
                            }}
                          >
                            <Typography
                              component='span'
                              variant='body2'
                              style={{ color: '#AEDE41' }}
                            >
                              Read more ...
                            </Typography>
                          </Link>         
                       </>
                      }
                    />
                    <ListItemSecondaryAction>
                      {paper.pdf !== undefined ? (
                        <a
                          href={paper.pdf}
                          onClick={console.log('pdf', paper.pdf)}
                        >
                          <PictureAsPdfIcon className={classes.pdf} />
                        </a>
                      ) : (
                        ''
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider variant='inset' component='li' />
                </Box>
              )
            })}
        </List>
      </Box>
    </Box>
  )
}
