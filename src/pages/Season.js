import React, { Component } from 'react'
import 'node-fetch'
import API_BASE from '../config';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Acordion from '../components/Acordion2'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Container from '@material-ui/core/Container';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: lightblue;
`;

const notifyError = (message) => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  });

export default class BBSeason extends Component {

    constructor(props) {
        super(props)
        this.state = {
             episodes: [],
             season: "",
             serie:"",
             loading: true,
             series: {"breakingbad": {
                    filter: "Breaking+Bad",
                    abrev: "bb"
             },
            "bettercallsaul":{
                filter: "Better+Call+Saul",
                abrev: "bcs"
            }
            }

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
        const season = paths[3]
        const serie = paths[1]
        const url = `${API_BASE}episodes/?series=${this.state.series[serie].filter}`;

        const data = await this.fetchURL(url);
        console.log("DATA:", data);
        const episodes = data.filter(x=>x.season === season);

        this.setState({episodes, season, serie});
        this.setState({loading: false});
        console.log("STATE:", this.state);
        



    }




    render() {
        return (
            <Container id="bbCon">
                
                {this.state.loading===false?
                <Acordion history={this.props.history} serie={this.state.series[this.state.serie].abrev} title={"Temporada" + this.state.season} seasons={this.state.episodes} />:
                <ClipLoader
                css={css`margin: 0 auto; margin-top: 20%;margin-left: 48%`}
                size={70}
                color={'#09493d'}
                loading={this.state.loading}
                id="loader"
         />}
            </Container>
        )
    }
}
