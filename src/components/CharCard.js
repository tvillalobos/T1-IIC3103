import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';



// {
//     "char_id": 1,
//     "name": "Walter White",
//     "occupation": [
//         "High School Chemistry Teacher",
//         "Meth King Pin"
//     ],
//     "img": "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
//     "status": "Presumed dead",
//     "nickname": "Heisenberg",
//     "appearance": [
//         1,
//         2,
//         3,
//         4,
//         5
//     ],
//     "portrayed": "Bryan Cranston",
//     "category": "Breaking Bad",
//     "better_call_saul_appearance": []
//breakingbad/season/${s}
// }
const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 500,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const c = props.character;
  const handleClick = (s, n) => {
      if (s==="bb"){
          props.history.push(`/breakingbad/season/${n}`);

      } else{
        props.history.push(`/bettercallsaul/season/${n}`);
      }
  }
  return (
    <Card id="char-card" className={classes.root}>
      
        <CardMedia
          className={classes.media}
          image={c.img}
          title={c.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {c.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Nickname: {c.nickname}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Status: {c.status}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Ocupacion/es: {c.occupation}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Actor/Actriz: {c.portrayed}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Apariciones Breaking Bad: {c.appearance.map((s,idx)=>{
                return <span onClick={()=>handleClick("bb",s)} id="seasonLink1" key={idx}>{s}</span> 
            })}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Apariciones Better Call Saul: {c.better_call_saul_appearance.map((s,idx)=>{
                return <span onClick={()=>handleClick("bcs",s)} id="seasonLink2" key={idx}>{s}</span> 
            })}
          </Typography>
        </CardContent>
     
 
    </Card>
  );
}
