import CloseImg from '../assets/img/close-button.svg';

export const FullscreenImg = (props) => {
  return (
    <div id="fullscreen-img">
      <img src={props.img} className="main-img" />
      <img src={CloseImg} className="close-btn" onClick={() => props.closeFullScreen()} />
    </div>
  );
};
