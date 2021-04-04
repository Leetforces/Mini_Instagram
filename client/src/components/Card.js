import React from 'react'

const Card = (props) => {
    props=props.value;
    return (
        <div className="myHome">
            <div className="card myHomeCard">
                <h5>{props.postedBy.name}</h5>
                <div className="card-image">
                    <img src={props.photoUrl} alt="" />
                </div>
                <div className="card-content">
                    <h6>{props.title}</h6>
                    <p>{props.body}</p>
                    <input type="text" placeholder="Comment" />
                </div>
                <i className="material-icons myRed">favorite</i>
                
            </div>
        </div>
    )
}

export default Card
