import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";

function ViewProfileCard({setIsViewProfile, isViewProfile}){

    const {selectedFriend} = useOutletContext();
    const [ myVideos, setMyVideos ] = useState([]);

    useEffect(() => {
        async function fetchVideos(){
          try {
            const response = await fetch("/api/videos");
            if (!response.ok) {
              throw new Error("Failed to fetch videos");
            }
            const data = await response.json();
            const filteredVideos = data.filter(v => v.UploaderId === (selectedFriend.friend_id).toString());
            setMyVideos(filteredVideos || []);
            // console.log(filteredVideos)
            // console.log(selectedFriend)
          } catch (error) {
            console.error("Error fetching videos:", error);
          }
        };
        fetchVideos();
      }, [selectedFriend]);

      const mappedVideos = myVideos.map(v => <video key={v.LastModified} controls>
        <source src={v.ObjectUrl} type="video/mp4"/>
    </video>)

    return (
        <div id='view-profile'>
            <div id='view-profile-header'>
                <img id="view-profile-picture" src={selectedFriend.profile_img} />
                <div>
                    <h1>{selectedFriend.username}</h1>
                    <p>ID: {selectedFriend.player_id}</p>
                </div>
                <img id="view-rank-img" src="https://static.wikia.nocookie.net/dota2_gamepedia/images/d/df/SeasonalRankTop1.png"/> 
            </div>
            <div id='view-profile-main'>
                <div id='view-widget'>
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
                <div id="view-last-match">
                    {mappedVideos}
                </div>
            </div>
            <div id='view-profile-footer'>
                <button onClick={e => setIsViewProfile(!isViewProfile)}>BACK</button>
            </div>
        </div>
    )
}

export default ViewProfileCard;