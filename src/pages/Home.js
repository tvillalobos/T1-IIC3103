import React, { Component } from 'react'
import 'node-fetch'
import API_BASE from './../config';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Acordion from './../components/Acordion';
import Container from '@material-ui/core/Container';
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
            
            <Container>
              {!this.state.loading ?
              <div> 
              <div className="imgGroup">
              <img id="bb-img" alt="Breaking Bad.png" src="https://imagenes.20minutos.es/files/article_amp/uploads/2019/10/22/breakingBad.jpg"/>
              <Acordion history={this.props.history} data={this.state.bb} serie={"bb"} title="Temporadas Breaking Bad" seasons={this.state.bb.seasons} />
              </div>
              <div className="imgGroup">
              <img id="bcs-img" alt="Better Call Saul.png" src="                data:image/jpeg;base64,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"/>
              <Acordion history={this.props.history} data={this.state.bcs} serie={"bcs"} title="Temporadas Better Call Saul" seasons={this.state.bcs.seasons} />
              </div>
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
