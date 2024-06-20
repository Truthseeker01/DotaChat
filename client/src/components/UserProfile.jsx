import { useOutletContext } from "react-router-dom"
import Home from "./Home"
import { useEffect } from "react"
import { useState } from "react"


function UserProfile(){

    const { currentUser, setCurrentUser, setHidenav } = useOutletContext();
    const [ isLoggingout, setIsLoggingOut ] = useState(false);
    const [ myVideos, setMyVideos ] = useState([]);

    useEffect(() => {
        async function fetchVideos(){
          try {
            const response = await fetch("/api/videos");
            if (!response.ok) {
              throw new Error("Failed to fetch videos");
            }
            const data = await response.json();
            const filteredVideos = data.filter(v => v.UploaderId === (currentUser.id).toString());
            setMyVideos(filteredVideos || []);
            console.log(data)
          } catch (error) {
            console.error("Error fetching videos:", error);
          }
        };
        fetchVideos();
      }, [currentUser]);

      const mappedVideos = myVideos.map(v => <video key={v.LastModified} controls>
        <source src={v.ObjectUrl} type="video/mp4"/>
    </video>)

    function handleLogout(){
        setIsLoggingOut(true)

        setTimeout(() => {
            fetch('/api/logout', {
                method: 'DELETE'
            })
            setCurrentUser(null);
        }, 2000)
    }

    useEffect(() => {
        if (currentUser !==  null) {
            setHidenav('');
            setIsLoggingOut(false);
        }
    }, [currentUser])

    if (currentUser !== null){
        return (
            <div id='profile'>
                <div id='profile-header'>
                    <img id="profile-picture" src={currentUser.profile_img} />
                    <div>
                        <h1>{currentUser.username} </h1>
                        <p>ID: {currentUser.player_id} </p>
                    </div>
                    <img id="rank-img" src="https://static.wikia.nocookie.net/dota2_gamepedia/images/d/df/SeasonalRankTop1.png"/> 
                </div>
                <div id='profile-main'>
                    <div id='widget'>
                        <div className="widget">
                            <p>Matches</p>
                            <span>1000</span>
                        </div>
                        <div className="widget">
                            <p>Wins</p>
                            <span>734</span>
                        </div>
                        <div className="widget">
                            <p>Commends</p>
                            <span>4125</span>
                        </div>
                        <div className="widget">
                            <p>Match MVPs</p>
                            <span>245</span>
                        </div>
                    </div>
                    <h3>posts</h3>
                    <div id="last-match">
                        {mappedVideos}
                    </div>
                </div>
                <div id='profile-footer'>
                    <button onClick={handleLogout} disabled={isLoggingout}> {(isLoggingout) ? 'Logging out ...' :'LOG OUT'}</button>
                </div>
            </div>
        )} else {
            return (
                <Home />
            )
        }
}

export default UserProfile;