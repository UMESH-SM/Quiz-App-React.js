import React, { Component } from "react";
import Question from "./Question";

const base64 = require("base-64");

class QuizPage extends Component {
  state = {
    questions: [],
    score: 0,
    qnumber: 0,
    goodToGo: false,
    question: "",
    options: [],
    answer: "",
  };

  componentDidMount() {
    let url = "";
    if (this.props.cat === "gk") {
      url = "9";
    } else if (this.props.cat === "sports") {
      url = "21";
    } else if (this.props.cat === "s&n") {
      url = "17";
    } else if (this.props.cat === "math") {
      url = "19";
    } else if (this.props.cat === "geo") {
      url = "22";
    } else if (this.props.cat === "computer") {
      url = "18";
    } else if (this.props.cat === "animals") {
      url = "27";
    } else if (this.props.cat === "gatgets") {
      url = "30";
    } else {
      console.log("Error Occured");
      return false;
    }
    fetch(
      "https://opentdb.com/api.php?amount=10&category=" +
        url +
        "&difficulty=easy&type=multiple&encode=base64"
    )
      .then((res) => res.json())
      .then((data) => this.setState({ questions: data.results }));
  }

  createQuestion(current) {
    let ques = base64.decode(current.question);
    const opt = [];
    let ans = "";
    opt[0] = base64.decode(current.incorrect_answers[0]);
    opt[1] = base64.decode(current.incorrect_answers[1]);
    opt[2] = base64.decode(current.incorrect_answers[2]);
    opt[3] = ans = base64.decode(current.correct_answer);
    opt.sort();
    this.setState({
      question: ques,
      options: opt,
      answer: ans,
      goodToGo: true,
    });
  }

  handleSubmit = (opt) => {
    setTimeout(() => {
      if (this.state.answer === opt) {
        this.setState({
          score: this.state.score + 1,
          qnumber: this.state.qnumber + 1,
          goodToGo: false,
        });
      } else {
        this.setState({
          qnumber: this.state.qnumber + 1,
          goodToGo: false,
        });
      }
    }, 1000);
  };

  render() {
    if (this.state.qnumber < 10) {
      if (this.state.goodToGo) {
        return (
          <div className="container">
            <div className="qnumber">{this.state.qnumber + 1}</div>
            <div className="card">
              <Question
                ques={this.state.question}
                opts={this.state.options}
                ans={this.state.answer}
                onAnswering={this.handleSubmit}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            {this.state.questions[this.state.qnumber] ? (
              this.createQuestion(this.state.questions[this.state.qnumber])
            ) : (
              <div style={{ fontSize: "2em" }}>Loading...</div>
            )}
          </div>
        );
      }
    } else {
      return (
        <div className="container">
          <div className="scoreCard">
            <span className="title">
              Your Score is : <b>{this.state.score}</b>
            </span>
            <button className="playAgain-btn" onClick={this.props.onPlayAgain}>
              Play Again
            </button>
          </div>
        </div>
      );
    }
  }
}

export default QuizPage;
