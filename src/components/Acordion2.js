// https://material-ui.com/components/accordion/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


export default function SimpleAccordion(props) {
  const classes = useStyles();
  

  const handleClick = (sid) => {
      props.history.push(`/episodes/${sid}`);
      


  }
  if (props.seasons){
    return (
        <div className={classes.root}>
          <Accordion expanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Episodios {props.title}</Typography>
            </AccordionSummary>
            {props.seasons.map(function(e, idx){
             return (
                <AccordionDetails key={idx} className="seasonLabel" onClick={()=>handleClick(e.episode_id)} >
                <Typography >
                  {`Episodio ${e.episode_id}: ${e.title}`}
                </Typography>
              </AccordionDetails>
    
             )
           })}
    
          </Accordion>
    
    
        </div>
      );

  }
  return <div></div>


}
