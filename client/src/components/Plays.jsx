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

    const [fileNames, setFileNames] = useState('No files selected');
    const [ size, setSize ] = useState('')

    function handleVideoUpload(e) {
        const files = e.target.files;
        if (files.length > 0) {
        const names = Array.from(files).map(file => file.name).join(', ');
        const size = Array.from(files).map(file => file.size).join(', ');
        setFileNames(names);
        setSize(size)
        } else {
        setFileNames('');
        setSize('')
        }
    };

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
            <div id='post'>
              <p onClick={e => { setPost(!post); setHidenav(''); }}>{'>'}</p>
              <form onSubmit={handlePost}>
                <input type="text" placeholder="Write your thoughts ... " />
                <input
                  onChange={handleVideoUpload}
                  className="video-upload"
                  type="file"
                  id="videoUpload"
                  name="video"
                  accept="video/*"
                  required
                />
                <label htmlFor="videoUpload" className="file-label">+</label>
                <div className="file-names-container">
                  {fileNames ? (
                    <div className="file-name">
                      <span>{fileNames}</span>
                      {/* <span className="file-size">{(size / 1024).toFixed(2)} KB</span> */}
                    </div>
                  ) : (
                    <span className="no-files">No files selected</span>
                  )}
                </div>
                <button type="submit" name="submit">Post</button>
              </form>
            </div>
          )}
}

export default Plays