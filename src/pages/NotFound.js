import React, { Component } from 'react';
import Container from '@material-ui/core/Container';


export default class NotFound extends Component {

    render() {
        return (
            <div className="notFoundDiv">
                <h1>404 Página no encontrada</h1>

                <img alt="404_img" className="notFound" src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/4159.png"/>
                
            </div>
        )
    }
}
