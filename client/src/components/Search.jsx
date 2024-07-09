import { useState } from "react"
import { useOutletContext } from "react-router-dom"

function Search(){

    const [searchedUser, setSearchedUser] = useState('')
    const {setHidenav, userFriends, setUserFriends, currentUser} = useOutletContext();
    const [ newFriend, setNewFriend ] = useState(null);
    const [ searchError, setSearchError ] = useState(false);
    const [ added, setAdded ] = useState(false);


    function handleSubmit(e){
        e.preventDefault()

        fetch(`/api/users/${searchedUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"friend_id": currentUser.id})
        })
        .then (res =>{
            if(res.ok ){
                res.json()
                .then(user => {
                    setNewFriend(user);
                    setUserFriends(preFriends => [...preFriends, user]);
                    console.log(`added user:${user.data}`);
                })
                
            }else{
                setSearchError(true)
            }
        })
    }

        return (
        <div id='Search'>
            <h1>Search</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={e => setSearchedUser(e.target.value)} type="text" name="player_id" placeholder="Player ID" value={searchedUser} />
                <button type="submit" name="find_player">Search</button>
            </form>

            {searchError && <div id='search-error'>No user found, make sure you entered the correct ID</div>}


            {newFriend && <div id='search-card'>
                <img src={newFriend.profile_img} alt="searched user\'s profile image"/>
                <h1>{newFriend.username}</h1>
                <button onClick={e => {
                    // setUserFriends(pre => [...pre, newFriend])
                    setSearchedUser('');
                    setNewFriend(null);
                    setAdded(true);
                }}>+</button>
            </div>}
            {added && <div id='friend-added'>Friend successfully added to your chats</div>}
        </div>
    )
        
}

export default Search;