import styles from "../playlist/Modal.module.css";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, itemName, itemType = "este elemento" }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Confirmar eliminación</h2>
        
        <p>
          ¿Estás seguro de que deseas eliminar {itemName ? <strong>"{itemName}"</strong> : itemType}?
        </p>

        <div className={styles.buttons}>
          <button 
            type="button"
            className={styles.button}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{ background: "#e74c3c" }}
          >
            Eliminar
          </button>
          <button 
            type="button" 
            className={`${styles.button} ${styles.buttonSecondary}`} 
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
