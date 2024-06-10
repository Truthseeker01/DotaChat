import { useOutletContext } from "react-router-dom"
import PlaysCard from "./PlaysCard"
import { useState } from "react"

function Plays(){

    const [ post, setPost ] = useState(false)
    const {setHidenav} = useOutletContext()

    function handlePost(e){
        e.preventDefault()
        //fetch post to the backend and then setState for frontend

        setPost(!post)
        setHidenav('')
    }

    if (!post){
    return (
        <div id="plays">
            <h1>Plays</h1>
            <button onClick={e => {
                setPost(!post)
                setHidenav('hidenav')
                }}>Post a play</button>
            <PlaysCard />
            <PlaysCard />
            <PlaysCard />
            <PlaysCard />
            <PlaysCard />
            <PlaysCard />
        </div>
    )} else {
        return (
        <div>
            <form onSubmit={handlePost}>
                <input type="text" placeholder="Write your thoughts ... "/>
                <input type="file" id="videoUpload" name="video" accept="video/*" required />
                <button type="submit" name="submit">Post</button>
            </form>
        </div>
    )}
}

export default Plays