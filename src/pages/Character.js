import React, { Component } from 'react'
import 'node-fetch'
import API_BASE from './../config';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Acordion from './../components/Acordion'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { FormatListBulleted, TramRounded } from '@material-ui/icons';
import Card from './../components/CharCard';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';




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
const notifyError = (message) => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  });

const override = css`
  display: block;
  margin: 0 auto;
  border-color: lightblue;
`;



export default class Character extends Component {

    constructor(props) {
        super(props);
        this.state = {
             character: {},
             loading: true,


        }
    }



   async fetchURL(url){
    

    try {
        const request = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (request.status === 200) {
          const response  = await request.json();

          return response;


        } else {
            notifyError(`API error: ${request.status}`);
            this.props.history.push("/");

        }

      } catch (error) {
          notifyError(`Ha ocurrido un error, intente más tarde`);
          this.props.history.push("/");
      }
    

   }


   async  componentDidMount (){

        const paths = this.props.location.pathname.split("/");
        const eid = paths[2]
        const url = `${API_BASE}characters/${eid}`;
        

        const character = await this.fetchURL(url);
        const url2 = `${API_BASE}quote?author=${character[0].name.replace(" ", "+")}`;
        const quotes = await this.fetchURL(url2);
        this.setState({character: character[0], quotes: quotes});
        this.setState({loading: false});
        
        



    }

    handleClick = (s, n)=>{

        

    }



    
    render(){
        
        return (
            
            <div className="pageDiv">
                {this.state.loading===false?
                <div className="charDiv">
                <Card history={this.props.history} character={this.state.character}> </Card>

                <div className="quotesDiv">
                <h4>Frases</h4>
                {this.state.quotes.map((q,idx)=>{
                  return <div key={idx} className="quoteDiv">
                    {`"${q.quote}"`}
                  </div>
                })}
                </div>

               </div>:
                <ClipLoader
                css={css`margin: 0 auto; margin-top: 20%;margin-left: 48%`}
                size={70}
                color={'#09493d'}
                loading={this.state.loading}

         />
            }
                
            </div>
          
          
        )
    }
}
