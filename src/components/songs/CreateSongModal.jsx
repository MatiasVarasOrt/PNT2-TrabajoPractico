import styles from "../playlist/Modal.module.css";

export default function CreateSongModal({ isOpen, onClose, onCreate, artists = [] }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.songName.value.trim(),
      artistId: e.target.songArtist.value,
      album: e.target.songAlbum.value.trim(),
      image: e.target.songImage.value.trim(),
    };
    
    if (formData.name) {
      onCreate(formData);
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Crear nueva canción</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="songName"
            type="text"
            className={styles.input}
            placeholder="Nombre de la canción"
            required
          />

          <select
            name="songArtist"
            className={styles.input}
            style={{ marginTop: "12px" }}
            required
          >
            <option value="">Seleccionar artista</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>

          <input
            name="songAlbum"
            type="text"
            className={styles.input}
            placeholder="Álbum (opcional)"
            style={{ marginTop: "12px" }}
          />

          <input
            name="songImage"
            type="url"
            className={styles.input}
            placeholder="URL de portada (opcional)"
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
