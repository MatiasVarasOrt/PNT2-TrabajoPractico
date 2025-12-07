import styles from "../playlist/Modal.module.css";

export default function CreateArtistModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.artistName.value.trim();
    const image = e.target.artistImage.value.trim();
    
    if (name) {
      onCreate({ name, image: image || undefined });
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Crear nuevo artista</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="artistName"
            type="text"
            className={styles.input}
            placeholder="Nombre del artista"
            required
          />

          <input
            name="artistImage"
            type="url"
            className={styles.input}
            placeholder="URL de la imagen (opcional)"
            style={{ marginTop: "12px" }}
          />

          <div className={styles.buttons}>
            <button type="submit" className={styles.button}>
              Crear
            </button>
            <button 
              type="button" 
              className={`${styles.button} ${styles.buttonSecondary}`} 
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
