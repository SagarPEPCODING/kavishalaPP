import React, { Component } from "react";
import { Popup } from "devextreme-react";
export default class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      link: null,
    };
    this.hidePopup = () => {
      this.setState({ visible: false });
    };
    this.share = (e) => {
      if (navigator.share) {
        navigator
          .share({
            title: this.props.title,
            url: this.state.link,
          })
          .then(() => {
            console.log("Thanks for sharing!");
          })
          .catch((err) => {
            console.log(`Couldn't share because of`, err.message);
          });
      } else {
        this.setState({ visible: true });
      }
    };
  }
  componentDidMount() {
    this.setState({ link: window.location.href });
  }

  render() {
    return (
      <>
        {this.props.type === "button" ? (
          <button className="btn btn-primary" onClick={this.share}>
            <i className="fa fa-share-alt"></i> Share
          </button>
        ) : (
          <i className="fa fa-share-alt" onClick={this.share}></i>
        )}
        {this.state.visible ? (
          <Popup
            visible={this.state.visible}
            onHiding={this.hidePopup}
            closeOnOutsideClick={true}
            width={"auto"}
            height={"auto"}
            className={"share-popup"}
          >
            <div className="social-icons" style={{ fontSize: 20 }}>
              <a
                href={`https://twitter.com/intent/tweet/?text=${this.props.title}&url=${this.state.link}`}
                title="Twitter"
              >
                <img src="/icons/twitter.svg" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${this.state.link}`}
                title="Facebook"
              >
                <img src="/icons/facebook.svg" />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${this.props.title}%20${this.state.link}`}
                title="Whatsapp"
              >
                <img src="/icons/whatsapp.svg" />
              </a>
              <a
                href={`mailto:?subject=${this.props.title}&body=${this.state.link}`}
                title="Mail"
              >
                <img src="/icons/envelope.svg" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${this.state.link}&title=${this.props.title}`}
                title="Linkedin"
              >
                <img src="/icons/linkedin.svg" />
              </a>
            </div>
          </Popup>
        ) : null}

        <style jsx>
          {`
            button,
            button:focus,
            button:active {
              background-color: white !important;
              border: unset;
              color: #00102c !important;
              box-shadow: unset;
            }
            button:hover {
              background-color: #00102c !important;
              color: white !important;
            }
            .social-icons {
              display: flex;
            }
            img {
              height: 35px;
              border-radius: 5px;
            }
            a {
              margin: 5px;
            }
             {
              /* .svg-icon{
              height:35px;
              width:35px;
            }
            .twitter {
              background-color: red;
              -webkit-mask: url("http://localhost:3000/icons/twitter.svg")
                no-repeat center;
              mask: url("http://localhost:3000/icons/twitter.svg") no-repeat
                center;
            } */
            }
          `}
        </style>
      </>
    );
  }
}
