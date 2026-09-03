import Modal from "./Modal";

function RegistrationSuccessModal({ isOpen, onClose, onLogin }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal__success">
        <h2 className="modal__title">Registration successfully completed!</h2>

        <button
          className="modal__switch-button"
          type="button"
          onClick={onLogin}
        >
          Sign in
        </button>
      </div>
    </Modal>
  );
}

export default RegistrationSuccessModal;
