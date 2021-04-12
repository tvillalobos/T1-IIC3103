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

const override = css`margin: 0 auto; margin-top: 20%`;



export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
             loading: true,
             characters: [],
             change: false,
             pages: new Array(100).fill(0),


        }
        this.handleClick = this.handleClick.bind(this);
    }



    asyncForEach = async (array, callback) => {
      
        let list = [];
        let aux = [];
        for (let index = 0; index < array.length; index++) {

        console.log("Pagina:", index, "personajes:", (index+1)*10);
        
          list = await callback(index);
          if(list.length===0){
            console.log("PARE!:");
              break;
          }

          aux = aux.concat(list);
          
          }
        this.setState({characters: aux})
        return true;
      
    }


   fetchURL= async (n)=>{
    
    let params = this.props.location.search.split("=");

    const name = params[1];
    let url = ""
    if(n===0){
        url = `${API_BASE}characters?name=${name}`;

    }else{
        url = `${API_BASE}characters?name=${name}&offset=${n*10}&limit=${n*10}`;
    }


    
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

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
        this.onRouteChanged();
        }
    }


    // refreshPage = () => {
    //     window.location.reload(false);
    //   }
    async onRouteChanged() {

        this.setState({loading: true});
        const chars = await this.asyncForEach(this.state.pages, this.fetchURL)
        this.setState({loading: false});
    }



   async  componentDidMount (){

        


    this.setState({loading: true});
    const chars = await this.asyncForEach(this.state.pages, this.fetchURL)
    this.setState({loading: false});
  
        



    }

    handleClick (c) {
        this.props.history.push(`/characters/${c.char_id}`);

    }

    renderAvatars = ()=>{
        const handler = this.handleClick;
        if(this.state.characters.length){
            try{
                const characters = this.state.characters;
                return (
                    <div className="charsDiv">
                    {this.state.characters.map(function(c, idx){
                        return (
                            <div className="avatarGroup" onClick={()=>handler(c)} key={idx}>
                                <Avatar key={idx} alt={c.name} src={c.img}>{c.name}</Avatar>
                                
                                <span className="avatarSpan" >{c.name}</span>
                                
                            </div>
                           
                        )
                      })}
                     </div>)

            } catch{
                return <div></div>
            }


            
        }
        
        return <div>No hay personajes que coincidan con la busqueda :(</div>
        

    }

    
    render(){
        
        return (
            
            
            <Container id="search-con">
                {this.state.loading===false?
                <div>
                <Typography variant="h3" component="h3">
                Busqueda por personaje
                </Typography>
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
