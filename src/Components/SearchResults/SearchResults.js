import React from "react";
import {TrackList} from '../TrackList/TrackList';
import './SearchResults.css'

export class SearchResults extends React.Component {
    
    render() {
        return (
            <div className="SearchResults">
            <h2>Results</h2>
            <TrackList onAdd={this.props.onAdd} 
                tracks={this.props.searchResults}
                isRemoval={false}/>
            </div>
        )
    }
}