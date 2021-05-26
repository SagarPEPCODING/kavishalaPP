import React, { Component } from "react";
var footer_kavishala = "/images/footer_kavishala.png";
import Languages from "components/Languages";
import { Context } from "Context/context";
import Link from "next/link";

function ChapterLinks({ chapters }) {
  return (
    <div className="container-fluid">
      <div className="row">
        {chapters.map((chapter) => {
          return (
            <div className="col-3 col-lg-1">
              <Link href={`/chapters/chapter-${chapter.toLowerCase()}`}>
                <a>{chapter}</a>
              </Link>
            </div>
          );
        })}
      </div>
      <style jsx>
        {`
          a {
            color: #ccc;
            font-weight: normal;
          }
          a:hover {
            text-decoration: unset;
            color: #fff;
          }
        `}
      </style>
    </div>
  );
}

export default class Footer extends Component {
  static contextType = Context;
  render() {
    return (
      <footer>
        {this.context.state.userAgent === "web" &&
        process.browser &&
        window.location.pathname == "/" ? (
          <Languages />
        ) : null}

        <section className="stats">
          <div className="counter container-fluid">
            <div className="row text-center family">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <span className="number">1+ million</span>
                <div className="statement">monthly audience use Kavishala</div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <span className="number ">1,00,000+</span>
                <div className="statement">
                  interactive poetry and stories available on Kavishala
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <span className="number ">8+</span>
                <div className="statement">
                  minutes Average daily time spent by per user
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="links">
          <ul>
            <li>
              <a
                href="https://twitter.com/kavishala"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/kavishala.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/kavishala.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="http://whatsapp.kavishala.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-whatsapp"></i>
              </a>
            </li>
          </ul>
          <div className="terms family">
            <ul>
              <li>
                <a
                  href="https://kavishala.in/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://kavishala.in/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="https://kavishala.in/privacy-and-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://kavishala.in/Blog"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://kavishala.in/reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="https://kavishala.in/careers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="https://kavishala.in/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="services">
            <div>Chapters:</div>
            <div>
              <b> India:</b>
            </div>
            <div>
              <ChapterLinks
                chapters={[
                  "Gurgaon",
                  "Pune",
                  "Mumbai",
                  "Hyderabad",
                  "Bangalore",
                  "Lucknow",
                  "Rewa",
                  "Indore",
                  "Bhopal",
                  "Ghaziabad",
                  "Hamirpur",
                  "Dehradoon",
                  "Kanpur",
                ]}
              />
              <div>
                <b> UAE:</b>
              </div>
            </div>
          </div>
          {/* <div className="sootradhar-links">
            <h5>Top Poets | Kavishala </h5>
            <ul>
              <li>
                <a href="/sootradhar/ratan-pandoravi">Bhisham Sahni</a>
              </li>
              <li>
                <a href="/sootradhar/khushtar-girami">Ratan Pandoravi</a>
              </li>
              <li>
                <a href="/sootradhar/guru-bhakt-singh-bhakt">Khushtar Girami</a>
              </li>
              <li>
                <a href="/sootradhar/anand-narain-mulla">
                  Guru Bhakt Singh 'Bhakt'
                </a>
              </li>
              <li>
                <a href="/sootradhar/shivmangal-singh-suman">
                  Anand Narain Mulla
                </a>
              </li>
              <li>
                <a href="/sootradhar/pandit-harichand-akhtar">
                  Shivmangal Singh Suman
                </a>
              </li>
              <li>
                <a href="/sootradhar/tilok-chand-mehroom">
                  Pandit Harichand Akhtar
                </a>
              </li>
              <li>
                <a href="/sootradhar/brij-narayan-chakbast">
                  Tilok Chand Mehroom
                </a>
              </li>
              <li>
                <a href="/sootradhar/gieve-patel">Brij Narayan Chakbast</a>
              </li>
              <li>
                <a href="/sootradhar/pandit-brij-mohan-dattatreya-kaifi">
                  Gieve Patel
                </a>
              </li>
              <li>
                <a href="/sootradhar/gopal-mittal">
                  Pandit Brij Mohan Dattatreya Kaifi
                </a>
              </li>
              <li>
                <a href="/sootradhar/nabarun-bhattacharya">Gopal Mittal</a>
              </li>
              <li>
                <a href="/sootradhar/arundhati-roy">Nabarun Bhattacharya</a>
              </li>
              <li>
                <a href="/sootradhar/narendra-mohan">Arundhati Roy</a>
              </li>
              <li>
                <a href="/sootradhar/balachandran-chullikkadu">
                  Narendra Mohan
                </a>
              </li>
              <li>
                <a href="/sootradhar/benjamin-walker">
                  Balachandran Chullikkadu
                </a>
              </li>
              <li>
                <a href="/sootradhar/bibhutibhushan-mukhopadhyay">
                  Benjamin Walker
                </a>
              </li>
              <li>
                <a href="/sootradhar/bibhutibhushan-bandyopadhyay">
                  Bibhutibhushan Mukhopadhyay
                </a>
              </li>
              <li>
                <a href="/sootradhar/raja-mehdi-ali-khan">
                  Bibhutibhushan Bandyopadhyay
                </a>
              </li>
              <li>
                <a href="/sootradhar/namvar-singh">Raja Mehdi Ali Khan</a>
              </li>
              <li>
                <a href="/sootradhar/ahmed-sofa">Namvar Singh</a>
              </li>
              <li>
                <a href="/sootradhar/mahasweta-devi">Ahmed Sofa</a>
              </li>
              <li>
                <a href="/sootradhar/fahmida-riaz">Mahasweta Devi</a>
              </li>
              <li>
                <a href="/sootradhar/ambikagiri-raichoudhury">Fahmida Riaz</a>
              </li>
              <li>
                <a href="/sootradhar/ganesh-gogoi">Ambikagiri Raichoudhury</a>
              </li>
              <li>
                <a href="/sootradhar/atul-chandra-hazarika">Ganesh Gogoi</a>
              </li>
              <li>
                <a href="/sootradhar/amulya-barua">Atul Chandra Hazarika</a>
              </li>
              <li>
                <a href="/sootradhar/jayadeva">Amulya Barua</a>
              </li>
              <li>
                <a href="/sootradhar/tulsidas">Jayadeva</a>
              </li>
              <li>
                <a href="/sootradhar/akka-mahadevi">Tulsidas</a>
              </li>
              <li>
                <a href="/sootradhar/kanaka-dasa">Akka Mahadevi</a>
              </li>
              <li>
                <a href="/sootradhar/purandara-dasa">Kanaka Dasa</a>
              </li>
              <li>
                <a href="/sootradhar/k-s-narasimhaswamy">Purandara Dasa</a>
              </li>
              <li>
                <a href="/sootradhar/v-k-gokak">K. S. Narasimhaswamy</a>
              </li>
              <li>
                <a href="/sootradhar/d-r-bendre">V. K. Gokak</a>
              </li>
              <li>
                <a href="/sootradhar/kuvempu">D. R. Bendre</a>
              </li>
              <li>
                <a href="/sootradhar/amir-khusrau">Kuvempu</a>
              </li>
              <li>
                <a href="/sootradhar/ibn-e-safi">Amir Khusrau</a>
              </li>
              <li>
                <a href="/sootradhar/rajanikanta-sen">Ibn-e-Safi</a>
              </li>
              <li>
                <a href="/sootradhar/ramesh-pokhriyal">Rajanikanta Sen</a>
              </li>
              <li>
                <a href="/sootradhar/u-r-ananthamurthy">Ramesh Pokhriyal</a>
              </li>
              <li>
                <a href="/sootradhar/k-s-nissar-ahmed">U. R. Ananthamurthy</a>
              </li>
              <li>
                <a href="/sootradhar/jim-corbett">K. S. Nissar Ahmed</a>
              </li>
              <li>
                <a href="/sootradhar/samuel-taylor-coleridge">Jim Corbett</a>
              </li>
              <li>
                <a href="/sootradhar/gopalakrishna-adiga">
                  Samuel Taylor Coleridge
                </a>
              </li>
              <li>
                <a href="/sootradhar/kambar">Gopalakrishna Adiga</a>
              </li>
              <li>
                <a href="/sootradhar/vayalar-ramavarma">Kambar</a>
              </li>
              <li>
                <a href="/sootradhar/ayyappa-paniker">Vayalar Ramavarma</a>
              </li>
              <li>
                <a href="/sootradhar/kundurti-anjaneyulu">Ayyappa Paniker</a>
              </li>
              <li>
                <a href="/sootradhar/manik-godghate">Kundurti Anjaneyulu</a>
              </li>
              <li>
                <a href="/sootradhar/mangesh-padgaonkar">Manik Godghate</a>
              </li>
              <li>
                <a href="/sootradhar/dilip-chitre">Mangesh Padgaonkar</a>
              </li>
              <li>
                <a href="/sootradhar/trilochan">Dilip Chitre</a>
              </li>
              <li>
                <a href="/sootradhar/sherjang-garg">Trilochan</a>
              </li>
              <li>
                <a href="/sootradhar/balai-chand-mukhopadhyay">Sherjang Garg</a>
              </li>
              <li>
                <a href="/sootradhar/balamani-amma">Balai Chand Mukhopadhyay</a>
              </li>
              <li>
                <a href="/sootradhar/thamizhachi-thangapandian">
                  Balamani Amma
                </a>
              </li>
              <li>
                <a href="/sootradhar/karmegha-konar">
                  Thamizhachi Thangapandian
                </a>
              </li>
              <li>
                <a href="/sootradhar/thiru-v-kalyanasundaram">Karmegha Konar</a>
              </li>
              <li>
                <a href="/sootradhar/s-abdul-rahman">
                  Thiru. V. Kalyanasundaram
                </a>
              </li>
              <li>
                <a href="/sootradhar/sundara-ramaswamy">S. Abdul Rahman</a>
              </li>
              <li>
                <a href="/sootradhar/kavimani-desigavinayagam-pillai">
                  Sundara Ramaswamy
                </a>
              </li>
              <li>
                <a href="/sootradhar/kannadasan">
                  Kavimani Desigavinayagam Pillai
                </a>
              </li>
              <li>
                <a href="/sootradhar/vaali">Kannadasan</a>
              </li>
              <li>
                <a href="/sootradhar/rajesh-joshi">Vaali</a>
              </li>
              <li>
                <a href="/sootradhar/rahul-sankrityayan">Rajesh Joshi</a>
              </li>
              <li>
                <a href="/sootradhar/bharathidasan">Rahul Sankrityayan</a>
              </li>
              <li>
                <a href="/sootradhar/subramania-bharati">Bharathidasan</a>
              </li>
              <li>
                <a href="/sootradhar/lalitha-lenin">Subramania Bharati</a>
              </li>
              <li>
                <a href="/sootradhar/suryakant-tripathi-nirala">
                  Lalitha Lenin
                </a>
              </li>
              <li>
                <a href="/sootradhar/nawaz-deobandi">
                  Suryakant Tripathi Nirala
                </a>
              </li>
              <li>
                <a href="/sootradhar/reetika-vazirani">Nawaz Deobandi</a>
              </li>
              <li>
                <a href="/sootradhar/mujtaba-hussain">Reetika Vazirani</a>
              </li>
              <li>
                <a href="/sootradhar/r-s-mugali">Mujtaba Hussain</a>
              </li>
              <li>
                <a href="/sootradhar/ghulam-nabi-firaq">R. S. Mugali</a>
              </li>
              <li>
                <a href="/sootradhar/keshavasuta">Ghulam Nabi Firaq</a>
              </li>
              <li>
                <a href="/sootradhar/gajanan-digambar-madgulkar">Keshavasuta</a>
              </li>
              <li>
                <a href="/sootradhar/bhau-panchabhai">
                  Gajanan Digambar Madgulkar
                </a>
              </li>
              <li>
                <a href="/sootradhar/himayat-ali-shair">Bhau Panchabhai</a>
              </li>
              <li>
                <a href="/sootradhar/garimella-satyanarayana">
                  Himayat Ali Shair
                </a>
              </li>
              <li>
                <a href="/sootradhar/bal-sitaram-mardhekar">
                  Garimella Satyanarayana
                </a>
              </li>
              <li>
                <a href="/sootradhar/atmaram-ravaji-deshpande">
                  Bal Sitaram Mardhekar
                </a>
              </li>
              <li>
                <a href="/sootradhar/arun-kolatkar">Atmaram Ravaji Deshpande</a>
              </li>
              <li>
                <a href="/sootradhar/sunita-jain">Arun Kolatkar</a>
              </li>
              <li>
                <a href="/sootradhar/a-k-ramanujan">Sunita Jain</a>
              </li>
              <li>
                <a href="/sootradhar/vairamuthu">A. K. Ramanujan</a>
              </li>
              <li>
                <a href="/sootradhar/suratha">Vairamuthu</a>
              </li>
              <li>
                <a href="/sootradhar/javed-akhtar">Suratha</a>
              </li>
              <li>
                <a href="/sootradhar/vinayak-janardan-karandikar">
                  Javed Akhtar
                </a>
              </li>
              <li>
                <a href="/sootradhar/annabhau-sathe">
                  Vinayak Janardan Karandikar
                </a>
              </li>
              <li>
                <a href="/sootradhar/bidyut-prabha-devi">Annabhau Sathe</a>
              </li>
              <li>
                <a href="/sootradhar/dada-vaswani">Bidyut Prabha Devi</a>
              </li>
              <li>
                <a href="/sootradhar/aadi-sankaracharya">Dada Vaswani</a>
              </li>
              <li>
                <a href="/sootradhar/dorothy-wilde">Aadi Sankaracharya</a>
              </li>
              <li>
                <a href="/sootradhar/amitav-ghosh">Dorothy Wilde</a>
              </li>
              <li>
                <a href="/sootradhar/jhumpa-lahiri">Amitav Ghosh</a>
              </li>
              <li>
                <a href="/sootradhar/rahat-indori">Jhumpa Lahiri</a>
              </li>
              <li>
                <a href="/sootradhar/qateel-shifai">Rahat Indori</a>
              </li>
              <li>
                <a href="/sootradhar/g-a-kulkarni">Qateel Shifai</a>
              </li>
              <li>
                <a href="/sootradhar/gokulananda-mahapatra">G. A. Kulkarni</a>
              </li>
              <li>
                <a href="/sootradhar/asad-bhopali">Gokulananda Mahapatra</a>
              </li>
              <li>
                <a href="/sootradhar/ruth-krauss">Asad Bhopali</a>
              </li>
              <li>
                <a href="/sootradhar/sundri-uttamchandani">Ruth Krauss</a>
              </li>
              <li>
                <a href="/sootradhar/richard-aldington">Sundri Uttamchandani</a>
              </li>
              <li>
                <a href="/sootradhar/kalidas">Richard Aldington</a>
              </li>
              <li>
                <a href="/sootradhar/hasan-abidi">Kalidas</a>
              </li>
              <li>
                <a href="/sootradhar/margaret-walker">Hasan Abidi</a>
              </li>
              <li>
                <a href="/sootradhar/kashmiri-lal-zakir">Margaret Walker</a>
              </li>
              <li>
                <a href="/sootradhar/amritlal-vegad">Kashmiri Lal Zakir</a>
              </li>
              <li>
                <a href="/sootradhar/anwar-jalalpuri">Amritlal Vegad</a>
              </li>
              <li>
                <a href="/sootradhar/mahim-bora">Anwar Jalalpuri</a>
              </li>
              <li>
                <a href="/sootradhar/shamser-bahadur-singh">Mahim Bora</a>
              </li>
              <li>
                <a href="/sootradhar/anuj-lugun">Shamser Bahadur Singh</a>
              </li>
              <li>
                <a href="/sootradhar/kamala-suraiyya">Anuj Lugun</a>
              </li>
              <li>
                <a href="/sootradhar/thirunalloor-karunakaran">
                  Kamala Suraiyya
                </a>
              </li>
              <li>
                <a href="/sootradhar/jatindra-nath-duwara">
                  Thirunalloor Karunakaran
                </a>
              </li>
              <li>
                <a href="/sootradhar/momin-khan-momin">Jatindra Nath Duwara</a>
              </li>
              <li>
                <a href="/sootradhar/swami-vivekanand">Momin Khan Momin</a>
              </li>
              <li>
                <a href="/sootradhar/usama-ibn-munqidh">Swami Vivekanand</a>
              </li>
              <li>
                <a href="/sootradhar/hiren-bhattacharyya">Usama ibn Munqidh</a>
              </li>
              <li>
                <a href="/sootradhar/edappally-raghavan-pillai">
                  Hiren Bhattacharyya
                </a>
              </li>
              <li>
                <a href="/sootradhar/namdev">Edappally Raghavan Pillai</a>
              </li>
              <li>
                <a href="/sootradhar/alauddin-al-azad">Namdev</a>
              </li>
              <li>
                <a href="/sootradhar/swarnakumari-devi">Alauddin Al-Azad</a>
              </li>
              <li>
                <a href="/sootradhar/sarojini-naidu">Swarnakumari Devi</a>
              </li>
              <li>
                <a href="/sootradhar/om-prakash-valmiki">Sarojini Naidu</a>
              </li>
              <li>
                <a href="/sootradhar/nagarjun">Om Prakash Valmiki</a>
              </li>
              <li>
                <a href="/sootradhar/geeta-tripathee">Nagarjun</a>
              </li>
              <li>
                <a href="/sootradhar/neelam-saxena-chandra">Geeta Tripathee</a>
              </li>
              <li>
                <a href="/sootradhar/mahendra-bhatnagar">
                  Neelam Saxena Chandra
                </a>
              </li>
              <li>
                <a href="/sootradhar/satyendranath-dutta">Mahendra Bhatnagar</a>
              </li>
              <li>
                <a href="/sootradhar/abhayadev">Satyendranath Dutta</a>
              </li>
              <li>
                <a href="/sootradhar/anita-desai">Abhayadev</a>
              </li>
              <li>
                <a href="/sootradhar/mary-john-thottam">Anita Desai</a>
              </li>
              <li>
                <a href="/sootradhar/shekhar-kapur">Mary John Thottam</a>
              </li>
              <li>
                <a href="/sootradhar/harindranath-chattopadhyay">
                  Shekhar Kapur
                </a>
              </li>
              <li>
                <a href="/sootradhar/mattie-stepanek">
                  Harindranath Chattopadhyay
                </a>
              </li>
              <li>
                <a href="/sootradhar/vishnu-prabhakar">Mattie Stepanek</a>
              </li>
              <li>
                <a href="/sootradhar/rudra-mohammad-shahidullah">
                  Vishnu Prabhakar
                </a>
              </li>
              <li>
                <a href="/sootradhar/vikram-seth">Rudra Mohammad Shahidullah</a>
              </li>
              <li>
                <a href="/sootradhar/salman-rushdie">Vikram Seth</a>
              </li>
              <li>
                <a href="/sootradhar/pawan-karan">Salman Rushdie</a>
              </li>
              <li>
                <a href="/sootradhar/jyoti-prasad-agarwala">Pawan Karan</a>
              </li>
              <li>
                <a href="/sootradhar/khondakar-ashraf-hossain">
                  Jyoti Prasad Agarwala
                </a>
              </li>
              <li>
                <a href="/sootradhar/vinod-kumar-shukla">
                  Khondakar Ashraf Hossain
                </a>
              </li>
              <li>
                <a href="/sootradhar/edward-fitzgerald">Vinod Kumar Shukla</a>
              </li>
              <li>
                <a href="/sootradhar/pralhad-keshav-atre">Edward FitzGerald</a>
              </li>
              <li>
                <a href="/sootradhar/dorothy-l-sayers">Pralhad Keshav Atre</a>
              </li>
              <li>
                <a href="/sootradhar/pazhavila-rameshan">Dorothy L. Sayers</a>
              </li>
              <li>
                <a href="/sootradhar/gulzar-dehlavi">Pazhavila Rameshan</a>
              </li>
              <li>
                <a href="/sootradhar/harishankar-parsai">Gulzar Dehlavi</a>
              </li>
              <li>
                <a href="/sootradhar/mohan-rana">Harishankar Parsai</a>
              </li>
              <li>
                <a href="/sootradhar/ram-prasad-bismil">Mohan Rana</a>
              </li>
              <li>
                <a href="/sootradhar/shivadin-ram-joshi">Ram Prasad Bismil</a>
              </li>
              <li>
                <a href="/sootradhar/gopal-singh-nepali">Shivadin Ram Joshi</a>
              </li>
              <li>
                <a href="/sootradhar/teji-grover">Gopal Singh Nepali</a>
              </li>
              <li>
                <a href="/sootradhar/sudama-pandey-dhoomil">Teji Grover</a>
              </li>
              <li>
                <a href="/sootradhar/kailash-vajpeyi">Sudama Pandey Dhoomil</a>
              </li>
              <li>
                <a href="/sootradhar/kayyar-kinhanna-rai">Kailash Vajpeyi</a>
              </li>
              <li>
                <a href="/sootradhar/om-prakash-aditya">Kayyar Kinhanna Rai</a>
              </li>
              <li>
                <a href="/sootradhar/gulab-khandelwal">Om Prakash Aditya</a>
              </li>
              <li>
                <a href="/sootradhar/usha-ghanshyam-upadhyay">
                  Gulab Khandelwal
                </a>
              </li>
              <li>
                <a href="/sootradhar/akbar-allahabadi">
                  Usha Ghanshyam Upadhyay
                </a>
              </li>
              <li>
                <a href="/sootradhar/parveen-shakir">Akbar Allahabadi</a>
              </li>
              <li>
                <a href="/sootradhar/balanadarajah-iyer">Parveen Shakir</a>
              </li>
              <li>
                <a href="/sootradhar/kuber-nath-rai">Balanadarajah Iyer</a>
              </li>
              <li>
                <a href="/sootradhar/wasim-barelvi">Kuber Nath Rai</a>
              </li>
              <li>
                <a href="/sootradhar/ada-jafri">Wasim Barelvi</a>
              </li>
              <li>
                <a href="/sootradhar/mir-taqi-mir">Ada Jafri</a>
              </li>
              <li>
                <a href="/sootradhar/shahryar">Mir Taqi Mir</a>
              </li>
              <li>
                <a href="/sootradhar/abhimanyu-anat">Shahryar</a>
              </li>
              <li>
                <a href="/sootradhar/ganga-prasad-vimal">Abhimanyu Anat</a>
              </li>
              <li>
                <a href="/sootradhar/hemant-shesh">Ganga Prasad Vimal</a>
              </li>
              <li>
                <a href="/sootradhar/dom-moraes">Hemant Shesh</a>
              </li>
              <li>
                <a href="/sootradhar/leeladhar-jagudi">Dom Moraes</a>
              </li>
              <li>
                <a href="/sootradhar/kamala-das">Leeladhar Jagudi</a>
              </li>
              <li>
                <a href="/sootradhar/kalpna-singh-chitnis">Kamala Das</a>
              </li>
              <li>
                <a href="/sootradhar/gunturu-seshendra-sarma">
                  Kalpna Singh-Chitnis
                </a>
              </li>
              <li>
                <a href="/sootradhar/yogesh-gaur">Gunturu Seshendra Sarma</a>
              </li>
              <li>
                <a href="/sootradhar/hullad-moradabadi">Yogesh Gaur</a>
              </li>
              <li>
                <a href="/sootradhar/anne-bronte">Hullad Moradabadi</a>
              </li>
              <li>
                <a href="/sootradhar/vinayak-damodar-savarkar">Anne Brontë</a>
              </li>
              <li>
                <a href="/sootradhar/k-satchidanandan">
                  Vinayak Damodar Savarkar
                </a>
              </li>
              <li>
                <a href="/sootradhar/ram-chandra-shukla">K. Satchidanandan</a>
              </li>
              <li>
                <a href="/sootradhar/shail-chaturvedi">Ram Chandra Shukla</a>
              </li>
              <li>
                <a href="/sootradhar/mushtaq-ahmad-yusufi">Shail Chaturvedi</a>
              </li>
              <li>
                <a href="/sootradhar/panayanthitta-kunhiraman-nair">
                  Mushtaq Ahmad Yusufi
                </a>
              </li>
              <li>
                <a href="/sootradhar/muhammad-ibrahim-zauq">
                  Panayanthitta Kunhiraman Nair
                </a>
              </li>
              <li>
                <a href="/sootradhar/nooh-narvi">Muhammad Ibrahim Zauq</a>
              </li>
              <li>
                <a href="/sootradhar/sarvesh-chandausi">Nooh Narvi</a>
              </li>
              <li>
                <a href="/sootradhar/nathuram-sharma">Sarvesh Chandausi</a>
              </li>
              <li>
                <a href="/sootradhar/faiz-ahmad-faiz">Nathuram Sharma</a>
              </li>
              <li>
                <a href="/sootradhar/majrooh-sultanpuri">Faiz Ahmad Faiz</a>
              </li>
              <li>
                <a href="/sootradhar/gopal-prasad-vyas">Majrooh Sultanpuri</a>
              </li>
              <li>
                <a href="/sootradhar/bhikhari-thakur">Gopal Prasad Vyas</a>
              </li>
              <li>
                <a href="/sootradhar/jagdish-gupt">Bhikhari Thakur</a>
              </li>
              <li>
                <a href="/sootradhar/meena-kumari">Jagdish Gupt</a>
              </li>
              <li>
                <a href="/sootradhar/aalok-shrivastav">Meena Kumari</a>
              </li>
              <li>
                <a href="/sootradhar/sharad-joshi">Aalok Shrivastav</a>
              </li>
              <li>
                <a href="/sootradhar/dorothy-hewett">Sharad Joshi</a>
              </li>
              <li>
                <a href="/sootradhar/ibn-e-insha">Dorothy Hewett</a>
              </li>
              <li>
                <a href="/sootradhar/sumitranandan-pant">Ibn e Insha</a>
              </li>
              <li>
                <a href="/sootradhar/kalim-aajiz">Sumitranandan Pant</a>
              </li>
              <li>
                <a href="/sootradhar/majaz-lakhnawi">Kalim Aajiz</a>
              </li>
              <li>
                <a href="/sootradhar/hazari-prasad-dwivedi">Majaz Lakhnawi</a>
              </li>
              <li>
                <a href="/sootradhar/ruskin-bond">Hazari Prasad Dwivedi</a>
              </li>
              <li>
                <a href="/sootradhar/">Ruskin Bond</a>
              </li>
              <li>
                <a href="/sootradhar/vishnu-nagar">विष्णु नागर</a>
              </li>
              <li>
                <a href="/sootradhar/krishnadas">Vishnu Nagar</a>
              </li>
              <li>
                <a href="/sootradhar/obaidullah-aleem">Krishnadas</a>
              </li>
              <li>
                <a href="/sootradhar/magtymguly-pyragy">Obaidullah Aleem</a>
              </li>
              <li>
                <a href="/sootradhar/george-meredith">Magtymguly Pyragy</a>
              </li>
              <li>
                <a href="/sootradhar/paramanandadas">George Meredith</a>
              </li>
              <li>
                <a href="/sootradhar/kumbhandas">Paramanandadas</a>
              </li>
              <li>
                <a href="/sootradhar/t-k-doraiswamy">Kumbhandas</a>
              </li>
              <li>
                <a href="/sootradhar/chanakya">T. K. Doraiswamy</a>
              </li>
              <li>
                <a href="/sootradhar/dhani-dharamdas">Chanakya</a>
              </li>
              <li>
                <a href="/sootradhar/sunderdas">Dhani Dharamdas</a>
              </li>
              <li>
                <a href="/sootradhar/manglesh-dabral">Sunderdas</a>
              </li>
              <li>
                <a href="/sootradhar/friedrich-ruckert">Manglesh Dabral</a>
              </li>
              <li>
                <a href="/sootradhar/dadu-dayal">Friedrich Rückert</a>
              </li>
              <li>
                <a href="/sootradhar/maluk-das">Dadu Dayal</a>
              </li>
              <li>
                <a href="/sootradhar/kavi-gang">Maluk Das</a>
              </li>
              <li>
                <a href="/sootradhar/gul-khan-nasir">Kavi Gang</a>
              </li>
              <li>
                <a href="/sootradhar/giridhar-kavirai">Gul Khan Nasir</a>
              </li>
              <li>
                <a href="/sootradhar/sachidananda-routray">Giridhar Kavirai</a>
              </li>
              <li>
                <a href="/sootradhar/tara-singh">Sachidananda Routray</a>
              </li>
              <li>
                <a href="/sootradhar/mirabai">Tara Singh</a>
              </li>
              <li>
                <a href="/sootradhar/chand-bardai">Mirabai</a>
              </li>
              <li>
                <a href="/sootradhar/viyogi-hari">Chand Bardai</a>
              </li>
              <li>
                <a href="/sootradhar/hh-sheikh-mohammed">Viyogi Hari</a>
              </li>
              <li>
                <a href="/sootradhar/uday-prakash">HH Sheikh Mohammed</a>
              </li>
              <li>
                <a href="/sootradhar/saadat-hasan-manto">Uday Prakash</a>
              </li>
              <li>
                <a href="/sootradhar/rose-auslander">Saadat Hasan Manto</a>
              </li>
              <li>
                <a href="/sootradhar/malik-muhammad-jayasi">Rose Ausländer</a>
              </li>
              <li>
                <a href="/sootradhar/ashok-chakradhar">Malik Muhammad Jayasi</a>
              </li>
              <li>
                <a href="/sootradhar/kavi-bhushan">Ashok Chakradhar</a>
              </li>
              <li>
                <a href="/sootradhar/shyam-narayan-pandey">Kavi Bhushan</a>
              </li>
              <li>
                <a href="/sootradhar/phanishwar-nath-renu">
                  Shyam Narayan Pandey
                </a>
              </li>
              <li>
                <a href="/sootradhar/raskhan">Phanishwar Nath 'Renu'</a>
              </li>
              <li>
                <a href="/sootradhar/bihari-lal">Raskhan</a>
              </li>
              <li>
                <a href="/sootradhar/naresh-mehta">Bihari Lal</a>
              </li>
              <li>
                <a href="/sootradhar/kedarnath-agarwal">Naresh Mehta</a>
              </li>
              <li>
                <a href="/sootradhar/bhartendu-harishchandra">
                  Kedarnath Agarwal
                </a>
              </li>
              <li>
                <a href="/sootradhar/karl-marx">Bhartendu Harishchandra</a>
              </li>
              <li>
                <a href="/sootradhar/prabhu-m-nair">Karl Marx</a>
              </li>
              <li>
                <a href="/sootradhar/kunwar-narayan">Prabhu M Nair</a>
              </li>
              <li>
                <a href="/sootradhar/rajkamal-choudhary">Kunwar Narayan</a>
              </li>
              <li>
                <a href="/sootradhar/e-nesbit">Rajkamal Choudhary</a>
              </li>
              <li>
                <a href="/sootradhar/osbert-sitwell">E. Nesbit</a>
              </li>
              <li>
                <a href="/sootradhar/dharamvir-bharati">Osbert Sitwell</a>
              </li>
              <li>
                <a href="/sootradhar/muktibodh">Dharamvir Bharati</a>
              </li>
              <li>
                <a href="/sootradhar/niarala">Muktibodh</a>
              </li>
              <li>
                <a href="/sootradhar/harivansh-rai-bachchan">Niarala</a>
              </li>
              <li>
                <a href="/sootradhar/ali-haider-multani">
                  Harivansh Rai Bachchan
                </a>
              </li>
              <li>
                <a href="/sootradhar/ebrahim-al-arrayedh">Ali Haider Multani</a>
              </li>
              <li>
                <a href="/sootradhar/nida-fazli">Ebrahim Al-Arrayedh</a>
              </li>
              <li>
                <a href="/sootradhar/jaswant-singh-neki">Nida Fazli</a>
              </li>
              <li>
                <a href="/sootradhar/satinder-sartaaj">Jaswant Singh Neki</a>
              </li>
              <li>
                <a href="/sootradhar/lal-singh-dil">Satinder Sartaaj</a>
              </li>
              <li>
                <a href="/sootradhar/gurdas-ram-alam">Lal Singh Dil</a>
              </li>
              <li>
                <a href="/sootradhar/osho">Gurdas Ram Alam</a>
              </li>
              <li>
                <a href="/sootradhar/sri-sri">Osho</a>
              </li>
              <li>
                <a href="/sootradhar/sukhvinder-amrit">Sri Sri</a>
              </li>
              <li>
                <a href="/sootradhar/ustad-daman">Sukhvinder Amrit</a>
              </li>
              <li>
                <a href="/sootradhar/mohan-singh">Ustad Daman</a>
              </li>
              <li>
                <a href="/sootradhar/harbhajan-singh">Mohan Singh</a>
              </li>
              <li>
                <a href="/sootradhar/munir-niazi">Harbhajan Singh</a>
              </li>
              <li>
                <a href="/sootradhar/anwar-masood">Munir Niazi</a>
              </li>
              <li>
                <a href="/sootradhar/surjit-patar">Anwar Masood</a>
              </li>
              <li>
                <a href="/sootradhar/shiv-kumar-batalvi">Surjit Patar</a>
              </li>
              <li>
                <a href="/sootradhar/maula-shah">Shiv Kumar Batalvi</a>
              </li>
              <li>
                <a href="/sootradhar/fazal-shah-sayyad">Maula Shah</a>
              </li>
              <li>
                <a href="/sootradhar/darshan-singh-awara">Fazal Shah Sayyad</a>
              </li>
              <li>
                <a href="/sootradhar/shah-sharaf">Darshan Singh Awara</a>
              </li>
              <li>
                <a href="/sootradhar/ahmad-rahi">Shah Sharaf</a>
              </li>
              <li>
                <a href="/sootradhar/nanak-singh">Ahmad Rahi</a>
              </li>
              <li>
                <a href="/sootradhar/hashim-shah">Nanak Singh</a>
              </li>
              <li>
                <a href="/sootradhar/sachal-sarmast">Hashim Shah</a>
              </li>
              <li>
                <a href="/sootradhar/charles-cotton">Sachal Sarmast</a>
              </li>
              <li>
                <a href="/sootradhar/penelope-fitzgerald">Charles Cotton</a>
              </li>
              <li>
                <a href="/sootradhar/qadir-yar">Penelope Fitzgerald</a>
              </li>
              <li>
                <a href="/sootradhar/puran-singh">Qadir Yar</a>
              </li>
              <li>
                <a href="/sootradhar/shah-mohammad">Puran Singh</a>
              </li>
              <li>
                <a href="/sootradhar/khawaja-farid">Shah Mohammad</a>
              </li>
              <li>
                <a href="/sootradhar/vir-singh">Khawaja Farid</a>
              </li>
              <li>
                <a href="/sootradhar/dhani-ram-chatrik">Vir Singh</a>
              </li>
              <li>
                <a href="/sootradhar/shah-hussain">Dhani Ram Chatrik</a>
              </li>
              <li>
                <a href="/sootradhar/hazrat-sultan-bahu">Shah Hussain</a>
              </li>
              <li>
                <a href="/sootradhar/mian-muhammad-bakhsh">
                  Hazrat Sultan Bahu
                </a>
              </li>
              <li>
                <a href="/sootradhar/waris-shah">Mian Muhammad Bakhsh</a>
              </li>
              <li>
                <a href="/sootradhar/bulleh-shah">Waris Shah</a>
              </li>
              <li>
                <a href="/sootradhar/thomas-tickell">Bulleh Shah</a>
              </li>
              <li>
                <a href="/sootradhar/robert-bridges">Thomas Tickell</a>
              </li>
              <li>
                <a href="/sootradhar/hem-barua">Robert Bridges</a>
              </li>
              <li>
                <a href="/sootradhar/amrita-pritam">Hem Barua</a>
              </li>
              <li>
                <a href="/sootradhar/muhammad-iqbal">Amrita Pritam</a>
              </li>
              <li>
                <a href="/sootradhar/lord-byron">Muhammad Iqbal</a>
              </li>
              <li>
                <a href="/sootradhar/toru-dutt">Lord Byron</a>
              </li>
              <li>
                <a href="/sootradhar/pablo-neruda">Toru Dutt</a>
              </li>
              <li>
                <a href="/sootradhar/kathy-acker">Pablo Neruda</a>
              </li>
              <li>
                <a href="/sootradhar/john-leland">Kathy Acker</a>
              </li>
              <li>
                <a href="/sootradhar/premchand">John Leland</a>
              </li>
              <li>
                <a href="/sootradhar/padma-sachdev">Premchand</a>
              </li>
              <li>
                <a href="/sootradhar/shamsur-rahman">Padma Sachdev</a>
              </li>
              <li>
                <a href="/sootradhar/buddhadeva-bose">Shamsur Rahman</a>
              </li>
              <li>
                <a href="/sootradhar/kabita-sinha">Buddhadeva Bose</a>
              </li>
              <li>
                <a href="/sootradhar/shankha-ghosh">Kabita Sinha</a>
              </li>
              <li>
                <a href="/sootradhar/nirendranath-chakraborty">Shankha Ghosh</a>
              </li>
              <li>
                <a href="/sootradhar/subhash-mukhopadhyay">
                  Nirendranath Chakraborty
                </a>
              </li>
              <li>
                <a href="/sootradhar/michael-madhusudan-dutt">
                  Subhash Mukhopadhyay
                </a>
              </li>
              <li>
                <a href="/sootradhar/dwijendralal-ray">
                  Michael Madhusudan Dutt
                </a>
              </li>
              <li>
                <a href="/sootradhar/helal-hafiz">Dwijendralal Ray</a>
              </li>
              <li>
                <a href="/sootradhar/nirmalendu-goon">Helal Hafiz</a>
              </li>
              <li>
                <a href="/sootradhar/sunil-gangopadhyay">Nirmalendu Goon</a>
              </li>
              <li>
                <a href="/sootradhar/joy-goswami">Sunil Gangopadhyay</a>
              </li>
              <li>
                <a href="/sootradhar/prabhat-ranjan-sarkar">Joy Goswami</a>
              </li>
              <li>
                <a href="/sootradhar/syed-emdad-ali">Prabhat Ranjan Sarkar</a>
              </li>
              <li>
                <a href="/sootradhar/kusumkumari-das">Syed Emdad Ali</a>
              </li>
              <li>
                <a href="/sootradhar/ashapoorna-devi">Kusumkumari Das</a>
              </li>
              <li>
                <a href="/sootradhar/dinesh-das">Ashapoorna Devi</a>
              </li>
              <li>
                <a href="/sootradhar/abhay-k">Dinesh Das</a>
              </li>
              <li>
                <a href="/sootradhar/jatindranath-sengupta">Abhay K</a>
              </li>
              <li>
                <a href="/sootradhar/akshay-kumar-boral">
                  Jatindranath Sengupta
                </a>
              </li>
              <li>
                <a href="/sootradhar/falguni-roy">Akshay Kumar Boral</a>
              </li>
              <li>
                <a href="/sootradhar/purnendu-patri">Falguni Roy</a>
              </li>
              <li>
                <a href="/sootradhar/chandravati">Purnendu Patri</a>
              </li>
              <li>
                <a href="/sootradhar/arun-mitra">Chandravati</a>
              </li>
              <li>
                <a href="/sootradhar/mohitlal-majumdar">Arun Mitra</a>
              </li>
              <li>
                <a href="/sootradhar/kumud-ranjan-mullick">Mohitlal Majumdar</a>
              </li>
              <li>
                <a href="/sootradhar/premendra-mitra">Kumud Ranjan Mullick</a>
              </li>
              <li>
                <a href="/sootradhar/hason-raja">Premendra Mitra</a>
              </li>
              <li>
                <a href="/sootradhar/jatindramohan-bagchi">Hason Raja</a>
              </li>
              <li>
                <a href="/sootradhar/nabinchandra-sen">Jatindramohan Bagchi</a>
              </li>
              <li>
                <a href="/sootradhar/mahakavi-krittibas-ojha">
                  Nabinchandra Sen
                </a>
              </li>
              <li>
                <a href="/sootradhar/sukumar-ray">Mahakavi Krittibas Ojha</a>
              </li>
              <li>
                <a href="/sootradhar/shakti-chattopadhyay">Sukumar Ray</a>
              </li>
              <li>
                <a href="/sootradhar/ayodhya-prasad-upadhyay">
                  Shakti Chattopadhyay
                </a>
              </li>
              <li>
                <a href="/sootradhar/bishnu-dey">Ayodhya Prasad Upadhyay</a>
              </li>
              <li>
                <a href="/sootradhar/mallika-sengupta">Bishnu Dey</a>
              </li>
              <li>
                <a href="/sootradhar/jaishankar-prasad">Mallika Sengupta</a>
              </li>
              <li>
                <a href="/sootradhar/ramdhari-singh-dinkar">
                  Jaishankar Prasad
                </a>
              </li>
              <li>
                <a href="/sootradhar/maithili-sharan-gupt">
                  Ramdhari Singh Dinkar
                </a>
              </li>
              <li>
                <a href="/sootradhar/william-wordsworth">
                  Maithili Sharan Gupt
                </a>
              </li>
              <li>
                <a href="/sootradhar/william-whitehead">William Wordsworth</a>
              </li>
              <li>
                <a href="/sootradhar/sukanta-bhattacharya">William Whitehead</a>
              </li>
              <li>
                <a href="/sootradhar/jibananda-das">Sukanta Bhattacharya</a>
              </li>
              <li>
                <a href="/sootradhar/kazi-nazrul-islam">Jibananda Das</a>
              </li>
              <li>
                <a href="/sootradhar/ozair-rahman">Kazi Nazrul Islam</a>
              </li>
              <li>
                <a href="/sootradhar/bankimchandra-chatterjee">OZAIR RAHMAN</a>
              </li>
              <li>
                <a href="/sootradhar/rabindranath-tagore">
                  Bankimchandra Chatterjee
                </a>
              </li>
              <li>
                <a href="/sootradhar/suryakumar-pandey">Rabindranath Tagore</a>
              </li>
              <li>
                <a href="/sootradhar/mohit-chattopadhyay">Suryakumar Pandey</a>
              </li>
              <li>
                <a href="/sootradhar/heeraben-pathak">Mohit Chattopadhyay</a>
              </li>
              <li>
                <a href="/sootradhar/neerav-patel">Heeraben Pathak</a>
              </li>
              <li>
                <a href="/sootradhar/manhar-modi">Neerav Patel</a>
              </li>
              <li>
                <a href="/sootradhar/chinu-modi-irshad">Manhar Modi</a>
              </li>
              <li>
                <a href="/sootradhar/jawahar-bakshi">Chinu Modi Irshad</a>
              </li>
              <li>
                <a href="/sootradhar/jagdish-joshi">Jawahar Bakshi</a>
              </li>
              <li>
                <a href="/sootradhar/saumya-joshi">Jagdish Joshi</a>
              </li>
              <li>
                <a href="/sootradhar/rajesh-vyas-miskin">Saumya Joshi</a>
              </li>
              <li>
                <a href="/sootradhar/shayda">Rajesh Vyas Miskin</a>
              </li>
              <li>
                <a href="/sootradhar/madhav-ramanuj">Shayda</a>
              </li>
              <li>
                <a href="/sootradhar/labhshankar-thakar">Madhav Ramanuj</a>
              </li>
              <li>
                <a href="/sootradhar/ravji-patel">Labhshankar Thakar</a>
              </li>
              <li>
                <a href="/sootradhar/bhalan">Ravji Patel</a>
              </li>
              <li>
                <a href="/sootradhar/ankit-trivedi">Bhalan</a>
              </li>
              <li>
                <a href="/sootradhar/gani-dahiwala">Ankit Trivedi</a>
              </li>
              <li>
                <a href="/sootradhar/ashok-chavda-bedil">Gani Dahiwala</a>
              </li>
              <li>
                <a href="/sootradhar/amrut-ghayal">Ashok Chavda Bedil</a>
              </li>
              <li>
                <a href="/sootradhar/vinod-joshi">Amrut Ghayal</a>
              </li>
              <li>
                <a href="/sootradhar/anil-chavda">Vinod Joshi</a>
              </li>
              <li>
                <a href="/sootradhar/mareez">Anil Chavda</a>
              </li>
              <li>
                <a href="/sootradhar/adil-mansuri">Mareez</a>
              </li>
              <li>
                <a href="/sootradhar/manisha-joshi">Adil Mansuri</a>
              </li>
              <li>
                <a href="/sootradhar/esha-dadawala">Manisha Joshi</a>
              </li>
              <li>
                <a href="/sootradhar/kaajal-oza-vaidya">Esha Dadawala</a>
              </li>
              <li>
                <a href="/sootradhar/dula-bhaya-kag">Kaajal Oza Vaidya</a>
              </li>
              <li>
                <a href="/sootradhar/bhanuprasad-bholanath-trivedi">
                  Dula Bhaya Kag
                </a>
              </li>
              <li>
                <a href="/sootradhar/rajendra-anantrai-shukla">
                  Bhanuprasad Bholanath Trivedi
                </a>
              </li>
              <li>
                <a href="/sootradhar/puja-lal-dalwadi">
                  Rajendra Anantrai Shukla
                </a>
              </li>
              <li>
                <a href="/sootradhar/befam">Puja Lal Dalwadi</a>
              </li>
              <li>
                <a href="/sootradhar/balwantray-kalyanray-thakore">Befam</a>
              </li>
              <li>
                <a href="/sootradhar/snehrashmi">
                  Balwantray Kalyanray Thakore
                </a>
              </li>
              <li>
                <a href="/sootradhar/prahlad-jethalal-parekh">Snehrashmi</a>
              </li>
              <li>
                <a href="/sootradhar/ramanbhai-mahipatram-nilkanth">
                  Prahlad Jethalal Parekh
                </a>
              </li>
              <li>
                <a href="/sootradhar/behramji-merwanji-malabari">
                  Ramanbhai Mahipatram Nilkanth
                </a>
              </li>
              <li>
                <a href="/sootradhar/manoj-khanderia">
                  Behramji Merwanji Malabari
                </a>
              </li>
              <li>
                <a href="/sootradhar/vadilal-jechand-dagli">Manoj Khanderia</a>
              </li>
              <li>
                <a href="/sootradhar/apj-abdul-kalam">Vadilal Jechand Dagli</a>
              </li>
              <li>
                <a href="/sootradhar/bankim-chandra-chattopadhyay">
                  A.P.J. Abdul Kalam
                </a>
              </li>
              <li>
                <a href="/sootradhar/ramnarayan-v-pathak-shes">
                  Bankim Chandra Chattopadhyay
                </a>
              </li>
              <li>
                <a href="/sootradhar/karsandas-narasimha-manek">
                  Ramnarayan V Pathak Shes
                </a>
              </li>
              <li>
                <a href="/sootradhar/narmad">Karsandas Narasimha Manek</a>
              </li>
              <li>
                <a href="/sootradhar/ushnas">Narmad</a>
              </li>
              <li>
                <a href="/sootradhar/balmukund-dave">Ushnas</a>
              </li>
              <li>
                <a href="/sootradhar/venibhai-jamnadas-purohit">
                  Balmukund Dave
                </a>
              </li>
              <li>
                <a href="/sootradhar/anil-joshi">Venibhai Jamnadas Purohit</a>
              </li>
              <li>
                <a href="/sootradhar/suresh-dalal">Anil Joshi</a>
              </li>
              <li>
                <a href="/sootradhar/harindra-dave">Suresh Dalal</a>
              </li>
              <li>
                <a href="/sootradhar/sundaram">Harindra Dave</a>
              </li>
              <li>
                <a href="/sootradhar/chandravadan-chimanlal-mehta">Sundaram</a>
              </li>
              <li>
                <a href="/sootradhar/krishnalal-shridharani">
                  Chandravadan Chimanlal Mehta
                </a>
              </li>
              <li>
                <a href="/sootradhar/manilal-bhagwanji-desai">
                  Krishnalal Shridharani
                </a>
              </li>
              <li>
                <a href="/sootradhar/premanand">Manilal Bhagwanji Desai</a>
              </li>
              <li>
                <a href="/sootradhar/akha-bhagat">Premanand</a>
              </li>
              <li>
                <a href="/sootradhar/niranjan-narhari-bhagat">Akha Bhagat</a>
              </li>
              <li>
                <a href="/sootradhar/dayaram">Niranjan Narhari Bhagat</a>
              </li>
              <li>
                <a href="/sootradhar/rajendra-shah">Dayaram</a>
              </li>
              <li>
                <a href="/sootradhar/dheera-bhagat">Rajendra Shah</a>
              </li>
              <li>
                <a href="/sootradhar/gopaldas-neeraj">Dheera Bhagat</a>
              </li>
              <li>
                <a href="/sootradhar/priyakant-premachand-maniyar">
                  Gopaldas Neeraj
                </a>
              </li>
              <li>
                <a href="/sootradhar/ardeshar-khabardar">
                  Priyakant Premachand Maniyar
                </a>
              </li>
              <li>
                <a href="/sootradhar/ramesh-parekh">Ardeshar Khabardar</a>
              </li>
              <li>
                <a href="/sootradhar/umashankar-jethalal-joshi">
                  Ramesh Parekh
                </a>
              </li>
              <li>
                <a href="/sootradhar/makarand-dave">
                  Umashankar Jethalal Joshi
                </a>
              </li>
              <li>
                <a href="/sootradhar/narsinhrao-divetia">Makarand Dave</a>
              </li>
              <li>
                <a href="/sootradhar/damodar-botadkar">Narsinhrao Divetia</a>
              </li>
              <li>
                <a href="/sootradhar/algernon-charles-swinburne">
                  Damodar Botadkar
                </a>
              </li>
              <li>
                <a href="/sootradhar/narsinh-mehta">
                  Algernon Charles Swinburne
                </a>
              </li>
              <li>
                <a href="/sootradhar/balashankar-kantharia">Narsinh Mehta</a>
              </li>
              <li>
                <a href="/sootradhar/kavi-kant">Balashankar Kantharia</a>
              </li>
              <li>
                <a href="/sootradhar/sursinhji-gohil-kalapi">Kavi Kant</a>
              </li>
              <li>
                <a href="/sootradhar/jhaverchand-meghani">
                  Sursinhji Gohil Kalapi
                </a>
              </li>
              <li>
                <a href="/sootradhar/makhanlal-chaturvedi">
                  Jhaverchand Meghani
                </a>
              </li>
              <li>
                <a href="/sootradhar/bharat-bhushan-pant">
                  Makhanlal Chaturvedi
                </a>
              </li>
              <li>
                <a href="/sootradhar/piyush-mishra">Bharat Bhushan Pant</a>
              </li>
              <li>
                <a href="/sootradhar/kedarnath-singh">Piyush Mishra</a>
              </li>
              <li>
                <a href="/sootradhar/mahadevi-verma">Kedarnath Singh</a>
              </li>
              <li>
                <a href="/sootradhar/nanalal-dalpatram-kavi">Mahadevi Verma</a>
              </li>
              <li>
                <a href="/sootradhar/rahi-masoom-raza">
                  Nanalal Dalpatram Kavi
                </a>
              </li>
              <li>
                <a href="/sootradhar/pritish-nandy">Rahi Masoom Raza</a>
              </li>
              <li>
                <a href="/sootradhar/bhagat-singh">Pritish Nandy</a>
              </li>
              <li>
                <a href="/sootradhar/ebenezer-elliott">Bhagat Singh</a>
              </li>
              <li>
                <a href="/sootradhar/jean-ingelow">Ebenezer Elliott</a>
              </li>
              <li>
                <a href="/sootradhar/kunwar-bechain">Jean Ingelow</a>
              </li>
              <li>
                <a href="/sootradhar/atal-bihari-vajpayee">Kunwar Bechain</a>
              </li>
              <li>
                <a href="/sootradhar/william-shakespeare">
                  Atal Bihari Vajpayee
                </a>
              </li>
              <li>
                <a href="/sootradhar/kabeer">William Shakespeare</a>
              </li>
              <li>
                <a href="/sootradhar/sahir-ludhianvi">Kabeer</a>
              </li>
              <li>
                <a href="/sootradhar/pratap-somvanshi">Sahir Ludhianvi</a>
              </li>
              <li>
                <a href="/sootradhar/lata-haya">Pratap Somvanshi</a>
              </li>
              <li>
                <a href="/sootradhar/sachchidananda-vatsyayan-agyeya">
                  Lata Haya
                </a>
              </li>
              <li>
                <a href="/sootradhar/firaq-gorakhpuri">
                  Sachchidananda Vatsyayan "Agyeya"
                </a>
              </li>
              <li>
                <a href="/sootradhar/laxmi-prasad-devkota-nepal">
                  Firaq Gorakhpuri
                </a>
              </li>
              <li>
                <a href="/sootradhar/banira-giri-nepal">
                  Laxmi Prasad Devkota | Nepal
                </a>
              </li>
              <li>
                <a href="/sootradhar/bhanubhakta-acharya-nepal">
                  Banira Giri | Nepal
                </a>
              </li>
              <li>
                <a href="/sootradhar/abul-kalam-azad">
                  Bhanubhakta Acharya | Nepal
                </a>
              </li>
              <li>
                <a href="/sootradhar/bhawani-prasad-mishra">ABUL KALAM AZAD</a>
              </li>
              <li>
                <a href="/sootradhar/dushyant-kumar">Bhawani Prasad Mishra</a>
              </li>
              <li>
                <a href="/sootradhar/manoj-muntashir">Dushyant Kumar</a>
              </li>
              <li>
                <a href="/sootradhar/bashir-badr">Manoj Muntashir</a>
              </li>
              <li>
                <a href="/sootradhar/mirza-ghali" B>
                  Bashir Badr (बशीर बद्र)
                </a>
              </li>
              <li>
                <a href="/sootradhar/subhadra-kumari-chauhan">Mirza Ghalib</a>
              </li>
              <li>
                <a href="/sootradhar/hariom">Subhadra Kumari Chauhan</a>
              </li>
              <li>
                <a href="/sootradhar/kaifi-azmi">Hariom</a>
              </li>
              <li>
                <a href="/sootradhar/pash">Kaifi Azmi</a>
              </li>
              <li>
                <a href="/sootradhar/neelesh-misra">Pash (पाश)</a>
              </li>
              <li>
                <a href="/sootradhar/sadhguru">Neelesh Misra</a>
              </li>
              <li>
                <a href="/sootradhar/nomaan-shauq">Sadhguru</a>
              </li>
              <li>
                <a href="/sootradhar/sohan-lal-dwivedi">
                  Nomaan Shauq (नोमान शौक़)
                </a>
              </li>
              <li>
                <a href="/sootradhar/kumar-vishwas">
                  Sohan Lal Dwivedi (सोहन लाल द्विवेदी)
                </a>
              </li>
            </ul>
          </div> */}
          <div className="social-links container-fluid">
            <div className="row">
              <span>
                <img
                  src={footer_kavishala}
                  alt="Kavishala"
                  style={{ height: 35, marginLeft: 10 }}
                />
              </span>
              <div className="col-lg-4 copyright">&copy; Kavishala</div>
              <div className="col-lg-4 appstores"></div>
            </div>
          </div>
        </section>
        <style jsx>{`
          footer {
            left: 0;
            bottom: 0;
            width: 100%;
          }
          footer .stats {
            background-color: #f4f4f4;
            color: #949494;
          }
          footer .links {
            background-color: #00102c;
          }
          footer .stats .counter .number {
            font-size: 46px;
            font-weight: 400;
          }
          footer .stats .row {
            padding: 2rem 0rem;
          }
          .sootradhar-links h5 {
            color: white;
            margin-top: 10px;
          }
          .sootradhar-links ul {
            text-align: justify;
          }
          .sootradhar-links li {
            padding-right: 5px;
            margin: 0px !important;
          }
          .sootradhar-links li a {
            text-decoration: none;
            color: white;
            font-size: 14px;
          }
          footer .stats .counter .statement {
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
            font-weight: 600;
          }
          footer li {
            display: inline;
            margin: 0rem 2rem 0rem 0rem;
            font-size: 14px;
            font-weight: 500;
          }
          footer ul {
            list-style-type: none;
            padding-left: 0rem;
          }
          footer a {
            color: #fff;
          }
          footer .services {
            border-top: 1px solid white;
            color: white;
            border-bottom: 1px solid white;
          }
          footer .links {
            padding: 1rem 5rem 0rem 5rem;
          }
          footer .social-links {
            color: white;
            margin-top: 1rem;
          }
          @media only screen and (max-width: 1024px) {
            footer .links {
              padding: 1rem 2rem 0rem 1rem;
            }
          }
          @media only screen and (min-width: 1440px) {
            footer .stats .row {
              padding: 2rem 15rem;
            }
          }
          section.links i {
            color: white;
            font-size: 20px;
          }
          .services {
            padding: 20px 0px;
          }
          .social-links .media {
            padding-top: 7px;
          }
          .social-links .copyright {
            padding-top: 7px;
          }
          .social-links .appstores {
            padding-top: 7px;
          }
          .services .languages {
            border-bottom: 1px solid #fff;
            padding-bottom: 10px;
            margin-bottom: 5px;
          }
          footer .links a,
          footer .services .languages {
            color: #ccc;
            font-weight: normal;
          }
          footer .links a:hover {
            text-decoration: unset;
            color: #fff;
          }
        `}</style>
      </footer>
    );
  }
}
