import React from 'react'
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js'
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{name: 'name', artist: 'artist', album: 'album', id: 1}, 
        {name: 'name2', artist: 'artist2', album: 'album2', id: 2}],
      playlistName: 'playlistNameHardCoded',
      playlistTracks: [{name: 'nameTracks', artist: 'artistTracks', album: 'albumTraks', id: 21}, 
      {name: 'nameTracks2', artist: 'artistTracks2', album: 'album2Tracks', id: 22}]
      };
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
    }
  
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.some(element => element.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }
  
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
     <SearchBar />
    
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults}
        onAdd={this.addTrack}/>
      <Playlist onRemove={this.removeTrack} 
        playlistName={this.state.playlistName} 
        playlistTracks={this.state.playlistTracks}/>
    </div>  
  </div>
</div>
      )
    
  }
}

