import React from "react";

class AutocorrectTextarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      data: props.corrections,
    };

    this.getContent = this.getContent.bind(this);
  }

  getContent(e) {
    const d = e.target.value;
    const { data } = this.state;
    let content = d;

    if (!d.split(" ").slice(-1).join('')) {
      content = d
        .split(" ")
        .map((item) => {
          if (data[item]) {
            return data[item];
          }
          return item;
        })
        .join(" ");
    }
    this.setState({
      content,
    });
  }

  render() {
    return (
      <div className="text-center">
        <textarea
          data-testid="textarea"
          rows={10}
          cols={80}
          className="card"
          onChange={(e) => this.getContent(e)}
          value={this.state.content}
        />
      </div>
    );
  }
}

export default AutocorrectTextarea;
