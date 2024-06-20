import { useOutletContext } from "react-router-dom"


function PlaysCard({url, poster_name, content, profile_pic}){
 
    return (
        <div id="playscard">
            <div id="playscard-div">
                <img src={profile_pic} />
                <h2>{poster_name}</h2>
            </div>
            <p>{content}</p>
            <video width='auto' height='auto' controls>
                <source src={url} type="video/mp4"/>
            </video>
        </div>
    )
}

export default PlaysCard;