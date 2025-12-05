import styles from "./Modal.module.css";

export default function CreatePlaylistModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.playlistName.value.trim();
    if (name) onCreate(name);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Crear nueva playlist</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="playlistName"
            type="text"
            className={styles.input}
            placeholder="Nombre de la playlist"
            required
          />

          <div className={styles.buttons}>
            <button type="submit" className={styles.button}>Crear</button>
            <button type="button" className={`${styles.button} ${styles.buttonSecondary}`} onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
