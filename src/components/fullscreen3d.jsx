import CloseImg from '../assets/img/close-button.svg';

export const Fullscreen3d = (props) => {
  return (
    <div id="fullscreen-img" className="fullscreen-3d">
      {props.component}
      <img src={CloseImg} className="close-btn" onClick={() => props.closeFullScreen()} />
    </div>
  );
};
