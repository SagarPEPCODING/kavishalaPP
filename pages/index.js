import React, { Component } from 'react';
import Carousel from 'components/Carousel/Carousel';
import Api from 'Api/Api';
import SEO from 'components/SEO';
import { Context } from 'Context/context';
import SootradharAuthorCircle from 'components/SootradharAuthorCircle';
import CarouselPostsUsers from 'components/CarouselPostsUsers';
import YoutubeVideoCarousel from 'components/YoutubeVideoCarousel';
import Router from 'next/router';

export default class index extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      users: null,
    };
  }

  // static getInitialProps(ctx) {
  //   if (ctx.query.next) {
  //     if (ctx.res) {
  //       ctx.res.writeHead(301, {
  //         Location: ctx.query.next,
  //       });
  //       ctx.res.end();
  //     }
  //   }
  //   return {};
  // }

  componentDidMount() {
    Api.getAllUsers({ sort: 'views' }, 1).then((response) => {
      if (response.status === 200) {
        this.setState({
          users: response.data.results,
        });
      }
    });
  }
  render() {
    return (
      <>
        <SEO category='Best Indian Poetry Platform, Best Poetry Platform, Indian Poetry, Indian Poets, Hindi poetry, poetry in Hindi, English poetry, poetry in English, Odia poetry, poetry in Odia, Punjabi poetry, poetry in Punjabi, Telgi poetry, poetry in Telgi, Tamil poetry, poetry in Tamil, Marathi poetry, poetry in Marathi,  Malyalam poetry, poetry in Malyalam, Gujrati poetry, poetry in Gujrati, Bangla poetry, poetry in bangla, sanskrit poetry, poetry in sanskrit,  Assamese poetry, poetry in Assamese, Urdu poetry, urdu shayari, shayari in urdu, poetry in urdu, Poetry Events, Hindi Kavita, Hindi Kahaniyan, Stories' />
        <main>
          <div id='landing'>
            {this.context.state.userAgent === 'mobile' ? (
              <SootradharAuthorCircle />
            ) : null}
            <Carousel type='Carousel' />
            {this.context.state.userAgent === 'web' ? (
              <div className='fleet-container'>
                <SootradharAuthorCircle />
              </div>
            ) : null}
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-lg-12 pl-0 pr-0'>
                  <div className='landing-posts'>
                    {/* <CarouselPostsUsers
                      filters={{ user: "@kavishalaopinion" }}
                      seeMoreLink={"/@kavishalaopinion"}
                      heading={"Kavishala Opinions"}
                    />
                    <CarouselPostsUsers
                      filters={{ user: "@kavishala-labs" }}
                      seeMoreLink={"/@kavishala-labs"}
                      heading={"Kavishala Labs"}
                    />
                    <CarouselPostsUsers
                      filters={{ user: "@kavishala-interviews" }}
                      seeMoreLink={"/@kavishala-interviews"}
                      heading={"Kavishala Interviews"}
                    />
                    <CarouselPostsUsers
                      filters={{ user: "@kavishala-daily" }}
                      seeMoreLink={"/@kavishala-daily"}
                      heading={"Kavishala Daily"}
                    />
                    <CarouselPostsUsers
                      filters={{ user: "@kavishala-reviews" }}
                      seeMoreLink={"/@kavishala-reviews"}
                      heading={"Kavishala Reviews"}
                    /> */}
                    <CarouselPostsUsers
                      filters={{ recent: true, admin: false }}
                      seeMoreLink={'/post'}
                      heading={'Latest Posts'}
                    />
                    <CarouselPostsUsers
                      filters={{ sort: 'views' }}
                      seeMoreLink={'/authors'}
                      heading={'Trending Authors'}
                      user
                    />
                    <YoutubeVideoCarousel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <style jsx global>{`
          body {
            background-color: #eee;
          }
        `}</style>
        <style jsx>{`
          body {
            font-family: DinRounded, "Source Sans Pro", "Helvetica Neue",
              Helvetica, Arial, sans-serif;
          }
          .carousel-card {
            padding: 5px;
          }
          .container {
            margin-right: auto;
            margin-left: auto;
            padding-left: 10px;
            padding-right: 10px;
          }
          .fleet-container {
            margin: 4% 0% 0% 0%;
          }
          #Hero {
            background-color: #fff;
            background-image: url("../../images/heroBG.png");
            background-position: right top;
            background-repeat: no-repeat;
            background-size: 100%;
            padding: 100px 0 40px;
            /* margin-top: 75px; */
            height: 30rem;
          }
          #landing #Hero .content {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
          }
          #landing #Hero .content > div {
            max-width: 50%;
          }
          #landing #Hero .content .imageContainer {
            margin-top: 110px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
          }
          #landing #Hero .content .imageContainer img {
            width: 100%;
            -ms-flex-item-align: center;
            align-self: center;
          }

          #landing #Hero .content h2 {
            font-size: 60px;
            font-weight: 700;
            line-height: normal;
            text-align: left;
            color: #00102c;
          }
          #landing #Hero .content h3 {
            font-size: 25px;
            line-height: normal;
            font-weight: 400;
            color: #222;
          }
          #landing #Hero .content h4 {
            font-size: 20px;
            line-height: normal;
            font-weight: 400;
            margin-bottom: 40px;
            margin-top: 20px;
          }
          @media (max-width: 991px) {
            #landing #Hero .content h4 {
              font-size: 18px;
            }
          }
          #landing #Hero .content .buttons button {
            width: 170px;
          }
          #landing #Hero .content .buttons :first-child {
            margin-left: 0;
            margin-right: 16px;
            color: #fff;
            background-color: #00102c;
            border-color: #00102c;
          }
          #landing #Hero .content .buttons :last-child {
            margin-left: 0;
            margin-right: 16px;
            color: #fff;
            background-color: #00102c;
            border-color: #00102c;
          }
          #landing #Hero .content .buttons :last-child {
            margin-right: 0;
          }
          .btn .btn-md {
            padding: 5px 25px;
            font-size: 16px;
            line-height: 30px;
            border-radius: 6px;
            margin: 3px 5px;
          }
          @media (max-width: 991px) {
            #landing #Hero {
              background-image: url("../../images/mobile-hero.png");
              margin-top: 36px;
              height: 27rem;
            }
          }
          #landing #Hero .content > div {
            max-width: 100%;
          }
          #landing #Hero .content h2 {
            font-size: 30px;
          }
          #landing #Hero .content h3 {
            font-size: 18px;
          }
          #landing #Hero .content h4 {
            font-size: 14px;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          #landing #Hero .content .buttons button {
            width: 125px;
          }
          }
        `}</style>
      </>
    );
  }
}
