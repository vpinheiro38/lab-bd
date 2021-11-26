import "../stylesheets/home.css";

function Modal({ children, closeModal, modalState, clickAction, title }) {
  if (!modalState) {
    return null;
  }
  return (
    <div class="modal is-active">
      <div class="modal-background" onClick={closeModal}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{title}</p>
          <button
            class="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section class="modal-card-body">{children}</section>
        <footer class="modal-card-foot">
          <button class="button is-success" onClick={clickAction}>
            Salvar
          </button>
          <button class="button" onClick={closeModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;
