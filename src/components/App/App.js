import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/PlayList';
import Spotify from '../../util/spotify';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {searchResults: [],
                    playlistName:'song',
                    playlistTracks: []
                  };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    }



    addTrack(track) {
      let tracks = this.state.playlistTracks;
      if (tracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
      }
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }


 removeTrack (track) {
     let tracks = this.state.playlistTracks;
     let newTrack = tracks.filter(trackIndex => trackIndex.id !== track.id);
     this.setState({playlistTracks: newTrack})
 }

 updatePlaylistName(name) {
   this.setState({playlistName: name});

 }

savePlaylist () {
    let tracks = this.state.playlistTracks
  let trackURIs = this.state.playlistTracks.map(track => track.uri)
  Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });


}

search(searchTerm) {
  console.log(searchTerm);
  Spotify.search(searchTerm).then(results =>{this.setState({searchResults: results})});

}



  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      <PlayList onRemove = {this.removeTrack} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
