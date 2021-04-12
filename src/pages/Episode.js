import React, { Component } from 'react'
import 'node-fetch'
import API_BASE from './../config';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Acordion from './../components/Acordion'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { FormatListBulleted, TramRounded } from '@material-ui/icons';
import Card from './../components/Card';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';

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

const override = css`margin: 0 auto; margin-top: 20%`;



export default class Episode extends Component {

    constructor(props) {
        super(props);
        this.state = {
             episode: {},
             loading: true,
             characters: {},


        }
        this.handleClick = this.handleClick.bind(this);
    }


    fetchCharacter = async (name)=>{
        const url = `${API_BASE}characters/?name=${name.replace(" ", "+")}`;
        try {
            const request = await fetch(url, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            });
            if (request.status === 200) {
              const data  = await request.json();
              const aux = this.state.characters;
              aux[data[0].name] = data[0];
              this.setState({characters: aux});
              return 200;


            } else {
            notifyError(`API error: ${request.status}`);
            this.props.history.push("/");
            return request.status;
            

            }

          } catch (error) {
              notifyError(`Ha ocurrido un error, intente más tarde`);
              this.props.history.push("/");
              return false;
          }

    }


    asyncForEach = async (array, callback) => {
      
        let allPass = true;
        for (let index = 0; index < array.length; index++) {
          allPass = await callback(array[index]);
          }
        
        return allPass;
      
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
        const url = `${API_BASE}episodes/${eid}`;

        const episode = await this.fetchURL(url);
        await this.asyncForEach(episode[0].characters, this.fetchCharacter);
        this.setState({episode: episode[0]});
        this.setState({loading: false});
        console.log("STATE:", this.state);
        



    }

    handleClick (c) {
        this.props.history.push(`/characters/${c.char_id}`);

    }

    renderAvatars = ()=>{
        const handler = this.handleClick;
        if(!this.state.loading){
            try{
                const characters = this.state.characters;
                return (
                    <div className="walterjr">
                    {this.state.episode.characters.map(function(c, idx){
                        return (
                            <div className="avatarGroup" onClick={()=>handler(characters[c])} key={idx}>
                                <Avatar key={idx} alt={c} src={characters[c].img}>{c}</Avatar>
                                
                                <span className="avatarSpan" >{c}</span>
                                
                            </div>
                           
                        )
                      })}
                     </div>)

            } catch{
                return <div></div>
            }


            
        }
        return <div></div>

    }

    
    render(){
        
        return (
            
            <Container>
                {this.state.loading===false?
                <div>
                <Card episode={this.state.episode}> </Card>
                {this.renderAvatars()}

               </div>:
                 <ClipLoader
                 css={css`margin: 0 auto; margin-top: 20%;margin-left: 48%`}
                 size={70}
                 color={'#09493d'}
                 loading={this.state.loading}
 
          />
            }
                
            </Container>
          
          
        )
    }
}
