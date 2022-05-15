/** @format */

import express from "express";
import cors from "cors";
import lyricsFinder from "lyrics-finder";
import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.post("/login", async (req, res) => {
  const { code } = req.body;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });
  try {
    const {
      body: { access_token, refresh_token, expire_in },
    } = await spotifyApi.authorizationCodeGrant(code);

    res.json({ access_token, refresh_token, expire_in });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.get("/lyrics", async (req, res) => {
  const { artist, track } = req.query;
  const lyrics = (await lyricsFinder(artist, track)) || "No Lyric Found";
  res.json({ lyrics });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Listening on port", PORT);
});
