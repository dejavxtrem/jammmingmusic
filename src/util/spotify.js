const client_Id = '3b25943988c64d72b07ccb9a133e506a';
const redirect_uri = 'http://localhost:3000/';
let userToken ;

const Spotify = {
 getAccessToken() {
     if (userToken) {
         return userToken;
    }

    const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const newExpiryTime = window.location.href.match(/expires_in=([^&]*)/);
    if (newAccessToken && newExpiryTime ) {
         userToken = newAccessToken[1];
         const expiresIn = Number(newExpiryTime[1]);
         window.setTimeout(() => userToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
    } else  {
        const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${client_Id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
        window.location = redirectUrl;
    }
},

 search(searchTerm) {
      const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,{
         headers: {Authorization: `Bearer ${accessToken}`}
     }).then(response => {
         if (response.ok) {
             return response.json();
         }
         //throw new Error('Request failed!')
     },networkError =>console.log(networkError.message)
 ).then(jsonResponse => {
       if (!jsonResponse.tracks) {
         return [];
       }
       return jsonResponse.tracks.items.map(track => ({
         id: track.id,
         name: track.name,
         artist: track.artists[0].name,
         album: track.album.name,
         uri: track.uri
       }));

 });

},

savePlaylist(playlistName,trackURIs) {
    if (playlistName && trackURIs) {
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`}
        let userId;
        return  fetch('https://api.spotify.com/v1/me',{headers: headers}).then(response => {
            if(response.ok) {
                return response.json();
            }
            //throw new Error('Request failed!');
        }).then(jsonResponse => {
            userId = jsonResponse.id
             return fetch(`https://api.spotify.com///v1/users/${userId}/playlists`,{
                headers:headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})

            }).then(response => {
                if(response.ok) {
                    return response.json();
                }
                //throw new Error('Request failed!');
            }).then(jsonResponse => {
                let playlistID = jsonResponse.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,{
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackURIs})
            }).then(response =>{
                if(response.ok){
                    return response.json();
                }
                //throw new Error('Request failed!');
            }).then(jsonResponse => {
                let playlistID = jsonResponse.id});
        });
        })
    } else  { return
         }
        }
    }




export default Spotify;
