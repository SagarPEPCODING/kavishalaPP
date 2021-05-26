import { Component } from "react";
import { Context } from "Context/context";

export default class ScrollPopupOpener extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      reached: false,
    };
    this.openPopup = (e) => {
      let someElement = document.querySelector(this.props.selector);
      try {
        if (
          someElement.getBoundingClientRect().top <= 0 &&
          !this.state.reached
        ) {
          this.setState({ reached: true });
          if (!localStorage.getItem("token_decoded")) {
            this.context.ShowLoginForm(true);
          }
        }
      } catch (error) {}
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.openPopup);
  }
  render() {
    return null;
  }
}
