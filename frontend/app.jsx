import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currJoke: "",
      jokeID: ""
    }
    this.loadJoke = this.loadJoke.bind(this);
    this.loadNewJoke = this.loadNewJoke.bind(this);
    this.updateID = this.updateID.bind(this);
    this.loadJokeByID = this.loadJokeByID.bind(this);
  }

  componentDidMount() {
    this.loadJoke();
  }

  loadJoke() {
    fetch("https://jokes-api.herokuapp.com/api/joke").then((res) => {
      return res.json();
    }).then((json) => {
      let joke = json.value.joke;
      this.setState({
        currJoke: joke
      });
      // console.log(json.value.joke);
    }).catch((err) => {
      console.log('Error: ' + err);
    })
  }
  
  loadJokeByID() {
    let id = this.state.jokeID;

    fetch(`https://jokes-api.herokuapp.com/api/joke/${id}`).then((res) => {
      return res.json();
    }).then((json) => {
      let joke = json.value.joke;
      this.setState({
        currJoke: joke
      }, () => console.log(this.state))
      // console.log(json.value.joke);
    }).catch((err) => {
      console.log('Error: ' + err);
    })
  }

  loadNewJoke(e) {
    e.preventDefault();
    this.loadJoke();
  }

  updateID(e) {
    let val = e.currentTarget.value;
    this.setState({
      jokeID: val
    })
  }

  render() {

    let {currJoke, jokeID} = this.state;

    return(
      <div>
        <p>{currJoke ? currJoke : ""}</p>
        <button onClick={this.loadNewJoke}>New Joke!</button>
        <br/>
        <input onChange={this.updateID} value={jokeID} placeholder="Enter Joke ID"/>
        <button onClick={this.loadJokeByID}>Click to load joke by ID</button>
      </div>
    )
  }
}

export default App;