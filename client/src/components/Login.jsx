import { useState } from "react"
import { useOutletContext } from "react-router-dom"


function Login(){

    const [ username, setUsername ] = useState ('')
    const [ password, setPassword ] = useState ('')
    const [ player_id, setPlayer_id ] = useState ('')
    const [ isClicked, setIsClicked ] = useState(false)

    const{setCurrentUser} = useOutletContext()

    function handleLogin(e){
        e.preventDefault()
        fetch("/api/login", {
            method : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then (res =>{
            if(res.ok ){
                res.json()
                .then(newUser => setCurrentUser(newUser))
            }else{
                alert("Invalid Username or Password")
            }
        })

    }

    function handleSignup(e){
        e.preventDefault()
        fetch("/api/users", {
            method : 'POST',
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify({username, password, player_id})
        })
        .then (res =>{
            if(res.ok ){
                res.json()
                .then(newUser => setCurrentUser(newUser))
            }else{
                alert("Signup Failed")
            }
        })
    }

        if (!isClicked) {
            return(
                <div className="login-div">
                    <h1>DotaChat</h1>
                    <div className="login-div">
                        <h2>LOG IN</h2>
                        <form onSubmit = {handleLogin} >
                            <input onChange ={e => setUsername(e.target.value)} type="'text" name="username" placeholder="Username" value={username}/>
                            <input onChange ={e => setPassword(e.target.value)}type="password" name="password" placeholder="Password" value={password}/>
                            <button className="login-btn" type="submit" name="submit">Log in</button>
                        </form>
                        <br />
                        <div> Don't have an account?&nbsp;
                            <a onClick={e => setIsClicked(!isClicked)} href="#">create one here</a>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="login-div">
                    <h1>DotaChat</h1>
                    <div className="login-div">
                        <h2>SIGN UP</h2>
                        <form onSubmit={handleSignup} >
                            <input onChange ={e => setUsername(e.target.value)} type="'text" name="username" placeholder="Username" value={username} />
                            <input onChange ={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" value={password}/>
                            <input onChange ={e => setPlayer_id(e.target.value)} type="text" name="player_id" placeholder="dota_player_id" value={player_id}/>
                            <button className="login-btn" type="submit" name="submit">Sign up</button>
                        </form>
                        <br />
                        <div> Log in? &nbsp;
                            <a onClick={e => setIsClicked(!isClicked)} href="#">click here</a>
                        </div>
                    </div>
                </div>
        )
        }
}

export default Login