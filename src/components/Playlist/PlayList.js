import React from 'react';
import  './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
 constructor (props) {
   super(props)

   this.handleNameChange = this.handleNameChange.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.handlePressKey = this.handlePressKey.bind(this);
 }

 handleClick(event) {
     event.target.setSelectionRange(0, event.target.value.length);
   }

handleNameChange(event){
  this.props.onNameChange(event.target.value);
}

handlePressKey (event) {
  if (event.key === 'Enter' && event.target.value) {
     this.props.onSave();
   }
}
    render() {
      return (
          <div className="Playlist">
  <input defaultValue={'New Playlist'} playlistname ={this.props.playlistName} onChange ={this.handleNameChange} onClick={this.handleClick} onKeyPress={this.handlePressKey}/>
  <TrackList tracks={this.props.playlistTracks} onRemove ={this.props.onRemove}/>
  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
      )

    }


}
export default PlayList;
