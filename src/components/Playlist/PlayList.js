import React from 'react';
import  './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
 constructor (props) {
   super(props)

   this.handleNameChange = this.handleNameChange.bind(this);
 }



handleNameChange(event){
  this.props.onNameChange(event.target.value);
}
    render() {
      return (
          <div className="Playlist">
  <input defaultValue={'New Playlist'} playlistName ={this.props.playlistName} onChange ={this.handleNameChange}/>
  <TrackList playlistTracks={this.props.playlistTracks} onRemove ={this.props.onRemove}/>
  <a className="Playlist-save">SAVE TO SPOTIFY</a>
</div>
      )

    }


}
export default PlayList;