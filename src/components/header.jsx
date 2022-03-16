import { Link } from 'react-router-dom';

export const Header = (props) => {
  return (
    <header id="header" className="scroller">
      <div className="intro">
        <div className="overlay">
          <div className="contain">
            <div className="intro-text">
              <h1>{props.data ? props.data.title : 'Loading'}</h1>
              <p>{props.data ? props.data.paragraph : 'Loading'}</p>
              <Link to="/mint" className="btn btn-custom">
                Pre-sale is live now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
