import React from 'react'
import { useLocation } from 'react-router-dom';
import {Box,Avatar, Card, CardHeader,makeStyles,Typography, CardContent, CardActions, IconButton} from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import {useSelector} from 'react-redux'
const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    margin:'20px 40px',
    flexWrap:'wrap',
  },
  body: {
    fontSize:'14px'
  },
  avatar: {backgroundColor:'red'},
  picon: {
    margin:0
  },
  cardHeader:{
    [theme.breakpoints.up(768)]: {
      "& > .MuiCardHeader-content > span": {
        fontSize:'22px',
      },
      // "& > .MuiCardHeader-action > p": {
      // },
    },
    [theme.breakpoints.down(768)]: {
      "& > .MuiCardHeader-content > span": {
        fontSize:'16px',
      },
      "& > .MuiCardHeader-action > p": {
        display:'none'
      },
      "& > .MuiCardActions-root MuiCardActions-spacing": {
        display:'flex',
        backgroundColor:'red'
      },
    }  
  },
  cover: {
    [theme.breakpoints.up(768)]: {
      display:'flex',
      // justifyContent: 'center',
      // alignItems: 'center'
      // "& > .MuiCardHeader-action > p": {
      // },
    },
    [theme.breakpoints.down(768)]: {
      display:'flex',
      flexDirection: 'column',
      
    }  
  },
  subcover: {
    [theme.breakpoints.up(768)]: {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center'
      // "& > .MuiCardHeader-action > p": {
      // },
    },
    [theme.breakpoints.down(768)]: {
      display:'flex',
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center'
    }  
  }
}))

function Paper (props) {
  const location = useLocation();
  const paper = location.state.paper;
  console.log(paper);
  const classes = useStyles();
  const query = useSelector(state => state.query.query)
  return (
    <Box className={classes.root}>
      <Card>
        <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {paper && paper.title.slice(0,1)}
          </Avatar>
        }
          action={
            <Typography className={classes.body}>
              {query ? paper && paper.publication : ""}
            </Typography> 
        }
        title={ paper && paper.title}
        subheader={paper && paper.authors[paper.authors.length - 2]}
       />
        <CardContent>
        <Typography className={classes.body}>
            {query && paper && paper.description ? paper.description.slice(0, -2): ""}
        </Typography>
        {query ? 
          <Box>
          <ImportContactsIcon style={{transform:'translate(0,5px)', margin:'0 20px 0 0'}}/>
          <a href={paper.url}>{paper.url}</a>
        </Box> :
        <Typography className={classes.body}>
              { paper && paper.journal}
            </Typography> 
        }

      </CardContent>
      <CardActions >
      <Box className={classes.cover}>
      <Box className={classes.subcover}>
      <IconButton aria-label="add to favorites">
          <FavoriteIcon />
          </IconButton>
          <Typography className={classes.picon}>
          Citiations:
         </Typography>
         <Typography className={classes.picon}>
         {paper.numCitations}
         </Typography>
      </Box>
         <Box className={classes.subcover}>
         <IconButton aria-label="share">
          <ShareIcon />
          </IconButton>
          <Typography className={classes.picon}>
          Year:
         </Typography>
          <Typography className={classes.picon}>
         {paper.year}
         </Typography>
         </Box>
         <Box className={classes.subcover}>
          <IconButton>
          { paper && paper.pdf !== undefined ? (
                          <a
                            href={paper.pdf}
                            onClick={console.log('pdf', paper.pdf)}
                          >
                            <PictureAsPdfIcon className={classes.pdf} />
                          </a>
                        ) : (
                          ''
                        )}
          </IconButton>
         </Box>
        </Box>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Paper
