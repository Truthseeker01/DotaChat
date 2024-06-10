import { NavLink } from "react-router-dom"


function UserProfile(){

    return (
        <div id='profile'>
            <div id='profile-header'>
                <img id="profile-picture" src="https://gkartcore.com/cdn/shop/files/Screenshot2023-11-17202111.png?v=1700252600&width=1445" />
                <div>
                    <h1>Username </h1>
                    <p>ID: 123456789</p>
                </div>
                <img id="rank-img" src="https://static.wikia.nocookie.net/dota2_gamepedia/images/d/df/SeasonalRankTop1.png"/> 
            </div>
            <div id='profile-main'>
                {/* <nav>
                    <a className="nav">ONE</a>
                    <a className="nav">TWO</a>
                    <a className="nav">THREE</a>
                    <a className="nav">FOUR</a>
                    <a className="nav">FIVE</a>
                </nav> */}
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
                <div id="last-match">
                    {/* Last Match Played */}
                    <div id="build">
                        <h3>Build:</h3>
                        <img src="https://notagamer.net/wp-content/uploads/2020/01/49a4e220bd5d0a58d660cb84dd846728.jpg" />
                        <img src="https://notagamer.net/wp-content/uploads/2020/01/49a4e220bd5d0a58d660cb84dd846728.jpg" />
                        <img src="https://notagamer.net/wp-content/uploads/2020/01/49a4e220bd5d0a58d660cb84dd846728.jpg" />
                        <img src="https://notagamer.net/wp-content/uploads/2020/01/49a4e220bd5d0a58d660cb84dd846728.jpg" />
                        <img src="https://notagamer.net/wp-content/uploads/2020/01/49a4e220bd5d0a58d660cb84dd846728.jpg" />
                        <img src="https://notagamer.net/wp-content/uploads/2020/01/49a4e220bd5d0a58d660cb84dd846728.jpg" />
                    </div>
                    <img src="https://i.pinimg.com/originals/ff/6c/c5/ff6cc5ac55458adf530ffc23c9f1f50b.gif"/>
                    <p>K/D/A: 21/0/11</p>
                </div>
            </div>
            <div id='profile-footer'>
                <button>LOG OUT</button>
            </div>
        </div>
    )
}

export default UserProfile