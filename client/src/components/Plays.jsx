import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PlaysCard from "./PlaysCard";

function Plays() {
  const { setHidenav, currentUser } = useOutletContext();

  const [post, setPost] = useState(false);
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [ content, SetContent ] = useState('');
  const [fileNames, setFileNames] = useState("No files selected");
  const [size, setSize] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        const sortedVideos = data  //.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
        setVideos(sortedVideos);
        console.log(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    console.log(videos)
    fetchVideos();
  }, []);

  const handleVideoUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setFileNames(selectedFile.name);
      setSize(selectedFile.size);
    } else {
      setFileNames("No files selected");
      setSize("");
    }
  };

  async function handleUpload(e){
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("url", `videos/${file.name}`);
    formData.append("file", file);
    formData.append("content", content);
    formData.append("profile_pic", currentUser.profile_img);
    formData.append("uploader_id", currentUser.id);
    formData.append("uploader_name", currentUser.username);

    try {
      const response = await fetch("/api/upload-video", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      const data = await response.json();
      console.log("File uploaded successfully:", data);

      const newVideo = {
        Key: data.key,
        UploaderId: currentUser.id,
        UploaderName: currentUser.username,
        Content: content,
        PorfilePic: currentUser.profile_img,
        Size: file.size,
        LastModified: new Date().toISOString(),
        ObjectUrl: `https://dota-chat.s3.amazonaws.com/${data.key}`,
      };
      setVideos(preVideos => [...preVideos, newVideo]);

      setPost(!post);
      setUploading(false);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError(err);
      setUploading(false);
    }
  };

  const mappedPlays = videos.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified)).map((video) => (
    <PlaysCard key={video.Key} url={video.ObjectUrl} poster_name={video.UploaderName} content={video.Content} profile_pic={video.PorfilePic} />
  ));

  return (
    <div id='plays'>
      {!post ? (
        <div id="plays-main">
          <h1>Plays</h1>
          <button
            onClick={() => {
              setPost(!post);
              setHidenav("hidenav");
            }}
          >
            Post a play
          </button>
          {mappedPlays}
        </div>
      ) : (
        <div id="post">
          <p
            onClick={() => {
              setPost(!post);
              setHidenav("");
            }}
          >
            {" > "}
          </p>
          <form onSubmit={handleUpload}>
            <input onChange={ e => SetContent(e.target.value)} type="text" placeholder="Write your thoughts ..." required />
            <input
              onChange={handleVideoUpload}
              className="video-upload"
              type="file"
              id="videoUpload"
              name="video"
              accept="video/*"
              required
            />
            <label htmlFor="videoUpload" className="file-label">
              +
            </label>
            <div className="file-names-container">
              {fileNames ? (
                <div className="file-name">
                  <span>{fileNames}</span>
                </div>
              ) : (
                <span className="no-files">No files selected</span>
              )}
            </div>
            <button onClick={() => setHidenav('')} type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Post"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Plays;