const client_Id = '3b25943988c64d72b07ccb9a133e506a';
const redirect_uri = 'http://localhost:3000/';


let usertoken ;

const Spotify = {



search(searchTerm) {
    fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,{
        headers: headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        thow new Error('Request failed!')
    },networkError =>console.log(networkError.message)
).then(jsonResponse=> (console.log(jsonResponse));
)

}




 getAcccessToken() {
     if (usertoken) {
         return usertoken;
    }
    const newAccessToken = window.location.href.match(access_token=([^&]*);
    const newExpiryTime = window.location.href.match(expires_in=([^&]*));
    if (newAccessToken && newExpiryTime ) {
         accessToken = newAccessToken[1];
         expiresIn = Number(newExpiryTime[1]);
         window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
    } else  {
        const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        window.location = redirectUrl;
    }
 }
}


export default Spotify;
