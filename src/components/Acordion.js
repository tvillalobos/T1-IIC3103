// https://material-ui.com/components/accordion/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from "react-router-dom";


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
      if (props.data){
        let toPath = "";
        if (props.serie==="bcs"){
          toPath = `bettercallsaul/season/${sid}`;
        }else {
          toPath = `breakingbad/season/${sid}`;
        }
        props.history.push({
          pathname: toPath,
          state: { data: props.data[`season${sid}`], season: `Temporada ${sid}`}
        });

      }

      


  }
  if (props.seasons){
    return (
        <div className={classes.root}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{props.title}</Typography>
            </AccordionSummary>
            {props.seasons.map(function(s, idx){
             return (
                <AccordionDetails key={idx} className="seasonLabel" onClick={()=>handleClick(idx+1)} >
                <Typography >
                  {s}
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
