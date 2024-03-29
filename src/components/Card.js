//https://material-ui.com/components/cards/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// {
//     "episode_id": 1,
//     "title": "Pilot",
//     "season": "1",
//     "air_date": "2008-01-20T00:00:00.000Z",
//     "characters": [
//         "Walter White",
//         "Jesse Pinkman",
//         "Skyler White",
//         "Henry Schrader",
//         "Marie Schrader",
//         "Walter White Jr.",
//         "Domingo Molina",
//         "Bogdan Wolynetz"
//     ],
//     "episode": 1,
//     "series": "Breaking Bad"
// },
export default function SimpleCard(props) {
  const classes = useStyles();
  const e = props.episode;
  if (e){
    return (
        <Card id="panel3a" className={classes.root}>
          <CardContent>
            <Typography id="ac-title" className={classes.title} color="textSecondary" gutterBottom>
            Fecha: {e.air_date.split("T")[0]}
            </Typography>
            <Typography id="ac-title" variant="h5" component="h2">
            Título: {e.title}
            </Typography>
            <Typography id="ac-title" className={classes.pos} color="textSecondary">
              ID capítulo: {e.episode_id}
            </Typography>
            <Typography id="ac-title" variant="body2" component="p">
              Temporada {e.season}
    
            </Typography>
            <Typography id="ac-title" variant="h6" component="h3">
            Personajes
            </Typography>
          </CardContent>
    
    
    
        </Card>
      );

  }
  return (<div></div>);


}
