import Image from 'next/image';
import Consumer from '../assets/general/consumer.svg';
import ScanQr from '../assets/help/scan-qr.svg';
import Info from '../assets/help/info.svg';
import Questions from '../assets/help/questions.svg';

const Help = () => <div className="inner">
  <div className="container container--help">
    <div>
      <h1>How it works:</h1>
      <p className="subtitle">I am a ...</p>
      <div className="buttons">
        <button className="button button--danger">
          Consumer
        </button>
        <button className="button button--danger" disabled>
          Professional
        </button>
        <button className="button button--danger" disabled>
          Expert
        </button>
      </div>
    </div>
  </div>

  <div className="container container--help">
    <div className="container__left">
      <h2>Consumer</h2>
        <p className="subtitle">
          We provide the tools to access, understand, and see where medical
          information comes from and how it  change over time.
        </p>
      </div>
      <div className="container__right">
        <Image src={Consumer} height={635} width={783} alt="SnS" />
      </div>
      <div>
        <div className="step bg-light-gray">
          <h3>
            <span className="in-cicle">
              1
            </span>
            Scan the QR code
          </h3>
          <p className="subtitle">
            On the back of the package there is a qr code, which represents a link
            to the homepage containing the information.
          </p>
          <Image src={ScanQr} height={315} width={336} alt="SnS" />
        </div>
        
        <div className="step bg-gray">
          <h3>
            <span className="in-cicle">
              2
            </span>
            Scan the QR code
          </h3>
          <p className="subtitle">
            On the back of the package there is a qr code, which represents a link
            to the homepage containing the information.
          </p>
          <Image src={Info} height={315} width={336} alt="SnS" />
        </div>
        
        <div className="step bg-dark-gray">
          <h3>
            <span className="in-cicle">
              3
            </span>
            Scan the QR code
          </h3>
          <p className="subtitle">
            On the back of the package there is a qr code, which represents a link
            to the homepage containing the information.
          </p>
          <Image src={Questions} height={315} width={336} alt="SnS" />
        </div>
    </div>
  </div>
</div>;

export default Help;
