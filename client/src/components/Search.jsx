import { useState } from "react"
import { useOutletContext } from "react-router-dom"

function Search(){

    const [searchedUser, setSearchedUser] = useState('')
    const {setHidenav, setUserFriends, currentUser} = useOutletContext()

    function handlesubmit(e){
        e.preventDefault()
        setHidenav('hidenav')
        
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
                .then(user => setUserFriends(preFriends => [...preFriends, user]))
            }else{
                alert("Can't find player")
            }
        })
    }

    // if (searchedUser == ''){
        return (
        <div id='Search'>
            <h1>Search</h1>
            <form onSubmit={handlesubmit}>
                <input onChange={e => setSearchedUser(e.target.value)} type="text" name="player_id" placeholder="Player ID" value={searchedUser} />
                <button type="submit" name="find_player">Search</button>
            </form>
            {/* I will need a searchcard here to be rendered based on the search state */}
        </div>
    // )} else {
    //     return (
    //         <div>
    //             <h1>Ahmed {'<<add>>'}</h1>
    //             <button onClick={e => {
    //                 setHidenav('')
    //                 setSearchedUser('')
    //             }}>add</button>
    //         </div>
    // )}
        )
}

export default Search