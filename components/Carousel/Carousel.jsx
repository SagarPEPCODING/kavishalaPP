import React, { Component } from 'react';
import { Gallery } from 'devextreme-react';
import Api from 'Api/Api';
import './Carousel.css';
import Line from 'components/Shimmer/Line';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import img from '../../public/Saved_Pictures/download1.jpg';
// import Image from 'next/image';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      sliderimages: null,
      source: '',
      screenwidth: 0,
      flexDirection: 'row',
      widhtCarousel: 0,
      heightCarousel: 350,
    };
    this.renderItem = (e) => {
      return (
        <a href={e.data.url} target='_blank'>
          <LazyLoadImage alt={e.data.name} src={e.data.image} />
        </a>
      );
    };
  }

  detectMob = () => {
    return window.innerWidth <= 800 && window.innerHeight <= 600;
  };

  componentDidMount() {
    let screenWidth = window.innerWidth;

    this.setState({ screenwidth: screenWidth });

    let widhtCarousel = 900;
    let flexDirection = 'row';

    if (screenWidth <= 792) {
      flexDirection = 'column';
      this.setState({ flexDirection: 'column' });
      this.setState({ widhtCarousel: 'auto' });
      this.setState({ heightCarousel: 220 });
    }

    if (screenWidth <= 875 && screenWidth > 792) {
      flexDirection = 'row';
      widhtCarousel = 600;
      this.setState({ flexDirection: flexDirection });
      this.setState({ widhtCarousel: widhtCarousel });
    }

    if (screenWidth <= 1120 && screenWidth > 875) {
      flexDirection = 'row';
      widhtCarousel = 600;
      this.setState({ flexDirection: flexDirection });
      this.setState({ widhtCarousel: widhtCarousel });
    }

    if (screenWidth <= 1116 && screenWidth > 1120) {
      flexDirection = 'row';
      widhtCarousel = 750;
      this.setState({ flexDirection: flexDirection });
      this.setState({ widhtCarousel: widhtCarousel });
    }

    if (screenWidth < 1220 && screenWidth > 1116) {
      flexDirection = 'row';
      widhtCarousel = 800;
      this.setState({ flexDirection: flexDirection });
      this.setState({ widhtCarousel: widhtCarousel });
    }

    if (screenWidth >= 1220) {
      flexDirection = 'row';
      widhtCarousel = 900;
      this.setState({ flexDirection: flexDirection });
      this.setState({ widhtCarousel: widhtCarousel });
    }

    var source = 'web';
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      source = 'mobile';
      this.setState({ source: source });
    }

    let ans = this.detectMob;

    this.setState({ source: source });
    Api.getCarouselImage(source, this.props.type).then((response) => {
      if (response.status === 200) {
        this.setState({ images: response.data });
      }
    });

    Api.getSideSliderImage(source).then((response) => {
      if (response.status === 200) {
        this.setState({ sliderimages: response.data });
      } else {
        console.log(response);
      }
    });
  }

  render() {
    let flexDirection = this.state.flexDirection;
    return (
      <>
        {this.state.images ? (
          this.state.images.length ? (
            <div
              className='CorouselContainer'
              style={{
                width: '100%',
                display: 'flex',
                height: 'auto',
              }}
            >
              <Gallery
                dataSource={this.state.images}
                itemComponent={this.renderItem}
                visible={true}
                height={350}
                width={this.state.widhtCarousel}
                // showNavButtons={true}
                swipeEnabled={true}
                // showIndicator={this.props.type !== 'Sidebanner'}
                // loop={true}
                slideshowDelay={3000}
              />
              {this.state.sliderimages !== null &&
                this.state.sliderimages.length > 0 && (
                  <div className='containerOFSlider'>
                    {this.state.source === 'mobile' ||
                    this.state.screenwidth <= 800 ? (
                      <div className='flexs second ContainerImages CarouselContainerSecmobile'>
                        <Gallery
                          dataSource={this.state.sliderimages}
                          itemComponent={this.renderItem}
                          visible={true}
                          height={100}
                          width={this.state.widhtCarousel}
                          showNavButtons={true}
                          swipeEnabled={true}
                          // showIndicator={this.props.type !== 'Sidebanner'}
                          loop={true}
                          slideshowDelay={3000}
                          orientation='vertical'
                        />
                      </div>
                    ) : (
                      <div className='flexs second ContainerImages CarouselContainerSec'>
                        {this.state.sliderimages &&
                          this.state.sliderimages.map((value, index) => {
                            return (
                              <div className='containerOfLinkandImage'>
                                <a href={value.url} key={index}>
                                  <img
                                    src={value.image}
                                    className='width100 imgOfSideCarousel'
                                    alt={value.alt}
                                  ></img>
                                </a>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                )}
            </div>
          ) : null
        ) : (
          <Line height={'425px'} width={'auto'} />
        )}
      </>
    );
  }
}
