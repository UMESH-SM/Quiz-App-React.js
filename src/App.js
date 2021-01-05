import React, { Component } from "react";
import "./App.css";
import QuizPage from "./Components/QuizPage";

class App extends Component {
  state = {
    start: false,
    categorySet: false,
    category: "",
  };

  handlePlay = () => {
    this.setState({
      categorySet: true,
    });
  };

  handleCategory = (cat) => {
    this.setState({
      category: cat,
      start: true,
    });
  };

  handlePlayAgain = () => {
    this.setState({
      start: false,
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.start ? (
          <QuizPage
            cat={this.state.category}
            onPlayAgain={this.handlePlayAgain}
          />
        ) : (
          <div className="welcomeContainer">
            {this.state.categorySet ? (
              <div className="categoryCard">
                <div className="title">Choose Category</div>
                <div className="cat-row">
                  <div className="cat-col1">
                    <button onClick={() => this.handleCategory("gk")}>
                      General Knowledge
                    </button>
                    <button onClick={() => this.handleCategory("sports")}>
                      Sports
                    </button>
                    <button onClick={() => this.handleCategory("gadgets")}>
                      Gadgets
                    </button>
                    <button onClick={() => this.handleCategory("computer")}>
                      Computer
                    </button>
                  </div>
                  <div className="cat-col2">
                    <button onClick={() => this.handleCategory("s&n")}>
                      Science and Nature
                    </button>
                    <button onClick={() => this.handleCategory("geo")}>
                      Geography
                    </button>
                    <button onClick={() => this.handleCategory("animals")}>
                      Animals
                    </button>
                    <button onClick={() => this.handleCategory("math")}>
                      Mathematics
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="welcomeCard">
                <div className="title">Trivia Quiz</div>
                <button className="play-btn" onClick={this.handlePlay}>
                  Play Now
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
