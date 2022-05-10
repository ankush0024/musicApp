import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
const CLIENT_ID = '6279f77a0a5f4642bf344d73a24d5bf1';
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
function App() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])
  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }
  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })

    setArtists(data.artists.items)
  }
  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
        {artist.name}
      </div>
    ))
  }
  return (
    <div className="App">
      <header className="App-header">
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
          : <div><form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type={"submit"}>Search</button>
          </form>
            {renderArtists()}<button onClick={logout}>Logout</button></div>}
      </header>
    </div>
  );
}

export default App;
