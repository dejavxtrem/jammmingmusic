import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
     this.state= {
       searchTerm: ""
     }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
     this.handleKeyPress = this.handlePressKey.bind(this);
     this.handleClick = this.handleClick.bind(this);

  }

  handleTermChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  search() {
    this.state.searchTerm && this.props.onSearch(this.state.searchTerm);
  }

  handleClick(event) {
    event.target.setSelectionRange(0, event.target.value.length);
  }

  handlePressKey(event) {
    if (event.key === 'Enter' && event.target.value) {
      this.search();
    }
  }

   render () {
       return (
          <div className="SearchBar">
  <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handlePressKey} onClick={this.handleClick}/>
  <a onClick={this.search}>SEARCH</a>
    </div>
       )
   }
}
  export default SearchBar;
