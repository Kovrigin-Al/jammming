const clientID = "d5f1c7785a9b4f9ea1d3474d4e68f402";
const redirectURI = "http://localhost:3000/";

let accessToken = "";
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    //check for acces token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      //This clears the parameters, allowing us to grab a new acces token when it's expired
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then(response => response.json())
    .then(jsonResponse => {
        if (!jsonResponse) {return []};
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artist[0].name,
            album: track.album.name,
            uri: track.uri
        }))
})
  },
};

export { Spotify };
