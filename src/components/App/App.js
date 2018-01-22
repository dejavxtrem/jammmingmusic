import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/PlayList';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {searchResults: [],
                    playlistName:'song',
                    playlistTracks: [{name: 'bodak yellow',artist:'cardi B',album:'gangstar bitch'},
                                     {name:'lemon',artist:'rihhana',album:'rihanna'}
                  ]
                  };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    }



  addTrack (track) {
     let tracks = this.state.playlistTracks;
    if (!tracks.find(trackIndex=> trackIndex.id === track.id)) {
       tracks.push(track)
       this.setState = ({playlistTracks: track})
    }

  }

 removeTrack (track) {
     let tracks = this.state.playlistTracks;
     let newtrack = tracks.filter(trackIndex => trackIndex.id !== track.id);
     this.setState =({playlistTracks: newtrack})
 }

 updatePlaylistName(name) {
   this.setState({playlistName: name});

 }

savePlaylist () {
  let tracks = this.state.playlistTracks
  let trackURIs = this.state.playlistName
}





  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar/>
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      <PlayList onRemove = {this.removeTrack} onNameChange={this.updatePlaylistName}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
