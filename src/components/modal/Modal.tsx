import "../../styles/modal/Modal.scss";

const Modal = (props: {
  isOpen: boolean;
  message: string;
  onClose: Function;
  onYes: Function;
  yesPlaceholder: string;
  noPlaceholder: string;
}) => {
  const { isOpen, onClose, onYes, message, yesPlaceholder, noPlaceholder } =
    props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-close">
          <button
            type="button"
            className="modal-close-icon"
            onClick={() => onClose()}
          ></button>
        </div>
        <div className="modal-message">
          <span>{message}</span>
        </div>
        <div className="modal-button">
          {noPlaceholder && (
            <button onClick={() => onClose()}>{noPlaceholder}</button>
          )}
          {yesPlaceholder && (
            <button onClick={() => onYes()}>{yesPlaceholder}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
