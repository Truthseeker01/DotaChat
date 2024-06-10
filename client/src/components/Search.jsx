import { useState } from "react"
import { useOutletContext } from "react-router-dom"

function Search(){

    const [searchedUser, setSearchedUser] = useState('')
    const {setHidenav} = useOutletContext()

    function handlesubmit(e){
        e.preventDefault()
        setSearchedUser(e.target.value)
        setHidenav('hidenav')

        // fetch(`/api/users/${id}`)
        // .then(res => res.json())
        // .then(user => setSearchedUser(user.player_id))
    }

    if (searchedUser == ''){
        return (
        <div id='Search'>
            <h1>Search</h1>
            <form onSubmit={handlesubmit}>
                <input type="text" name="player_id" placeholder="Player ID" />
                <button type="submit" name="find_player">Search</button>
            </form>
            {/* I will need a searchcard here to be rendered based on the search state */}
        </div>
    )} else {
        return (
            <div>
                <h1>Ahmed {'<<add>>'}</h1>
                <button onClick={e => {
                    setHidenav('')
                    setSearchedUser('')
                }}>add</button>
            </div>
    )}
}

export default Search