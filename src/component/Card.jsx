import React from 'react';
import '../container/home.css'
import { HomeConstants } from '../utils/Constants';


class CharacterCard extends React.Component {

    // Initial State and Binding Methods using in Card Component
    constructor(props) {
        super(props);
    }

    render() {
        const { cardData } = this.props;
        return (
            <div className={'col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3'}>
                <div className="card" >
                    <img className="card-img-top" src={cardData.image} alt="Image" />
                    <div className="textOnImg">
                        <h5 id="card-name"> {cardData.name} </h5>
                        <p id="card-created">{"id: "}{cardData.id} {HomeConstants.createdTime} </p>
                    </div>
                    <div className="card-body">
                        <p className="card-text"> <span className="key">{"STATUS"}</span>  <span className="value">{cardData.status}</span></p>
                        <hr></hr>
                        <p className="card-text"> <span className="key">{"SPECIES"}</span>  <span className="value" >{cardData.species}</span></p>
                        <hr></hr>
                        <p className="card-text">  <span className="key">{"GENDER"}</span> <span className="value" >{cardData.gender}</span></p>
                        <hr></hr>
                        <p className="card-text">  <span className="key">{"ORIGIN"}</span> <span className="value">{cardData.origin.name}</span></p>
                        <hr></hr>
                        <p className="card-text">  <span className="key">{"LAST"} <br></br> {"LOCATION"}</span > <span className="value">{cardData.location.name}</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CharacterCard;