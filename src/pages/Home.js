import React, { Component } from 'react'
import 'node-fetch'
import API_BASE from './../config';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Acordion from './../components/Acordion'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { FormatListBulleted } from '@material-ui/icons';


const notifyError = (message) => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  });

const override = css`
  display: block;
  margin: 0 auto;
  border-color: lightblue;
`;



export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
             bb: {}, // breaking bad
             bcs: {}, // better call saul
             loading: false,

        }
    }

    //https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
      }

    parseData= (data) => {
        
        const aux_bb = [];
        const aux_bcs = [];
        const bb_dict = {'seasons': []};
        const bcs_dict = {'seasons': []};


        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            if (e.series === "Breaking Bad"){
                aux_bb.push(e)
            } else if (e.series === "Better Call Saul"){
              aux_bcs.push(e)

            } else {
                return false
            }
        }
        const temp_bb = aux_bb.map(x => x.season).filter(this.onlyUnique);
        const temp_bcs = aux_bcs.map(x => x.season).filter(this.onlyUnique);
        bb_dict["n_season"] = temp_bb.length;
        bcs_dict["n_season"] = temp_bcs.length;
        for (let i = 0; i < temp_bb.length; i++) {
            const j = i+1;
            const season = `season${j}`;
            bb_dict['seasons'].push(`Temporada ${j}`);
            //bb_dict[season] = aux_bb.filter(x => x.season === j.toString());            
        }
        for (let i = 0; i < temp_bcs.length; i++) {
            const j = i+1;
            const season = `season${j}`;
            bcs_dict['seasons'].push(`Temporada ${j}`);
            //bcs_dict[season] = aux_bcs.filter(x => x.season === j.toString());            
        }

        

        this.setState({bb: bb_dict, bcs: bcs_dict});
        
        return true;

      }


   async  componentDidMount (){
        const url = `${API_BASE}episodes`
        console.log(url)

        this.setState({loading: true});

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
              
              this.parseData(data);
              
              

            } else {
              notifyError(`API error: ${request.status}`);

            }

          } catch (error) {
              notifyError(`Ha ocurrido un error, intente más tarde`);
          }
        this.setState({loading: false});

    }


        

    render() {
        
        return (
            
            <div>
              {!this.state.loading ?
              <div> 
              <Acordion history={this.props.history} data={this.state.bb} serie={"bb"} title="Temporadas Breaking Bad" seasons={this.state.bb.seasons} />
              <Acordion history={this.props.history} data={this.state.bcs} serie={"bcs"} title="Temporadas Better Call Saul" seasons={this.state.bcs.seasons} />
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
