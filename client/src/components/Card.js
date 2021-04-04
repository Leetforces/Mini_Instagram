import React from 'react'

const Card = () => {
    return (
        <div className="myHome">
            <div className="card myHomeCard">
                <h5>Manish</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1507187632231-5beb21a654a2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fHdhbGxwYXBlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                </div>
                <div className="card-content">
                    <h6>Title</h6>
                    <p>About Post</p>
                    <input type="text" placeholder="Comment" />
                </div>
                <i className="material-icons myRed">Favorite</i>
                
            </div>
        </div>
    )
}

export default Card
