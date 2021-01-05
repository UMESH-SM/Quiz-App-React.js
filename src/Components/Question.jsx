import React, { Component } from "react";

class Question extends Component {
  render() {
    return (
      <div>
        <div className="question">{this.props.ques}</div>
        <div className="optionsContainer">
          {this.props.opts.map((opt, pos) => {
            return (
              <button
                key={pos}
                className={this.props.ans !== opt ? "options" : "rightOption"}
                onClick={() => this.props.onAnswering(opt)}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Question;
