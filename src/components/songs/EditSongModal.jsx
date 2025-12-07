import { useState } from "react";
import styles from "../playlist/Modal.module.css";

export default function EditSongModal({ isOpen, onClose, onEdit, song }) {
  if (!isOpen || !song) return null;

  const [name, setName] = useState(song.name);
  const [artist, setArtist] = useState(song.artist || "");
  const [album, setAlbum] = useState(song.subtitle || "");
  const [image, setImage] = useState(song.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim()) {
      onEdit({
        name: name.trim(),
        artist: artist.trim() || undefined,
        album: album.trim() || undefined,
        image: image.trim() || undefined,
      });
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar canción</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="songName"
            type="text"
            className={styles.input}
            placeholder="Nombre de la canción"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            name="songArtist"
            type="text"
            className={styles.input}
            placeholder="Artista"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            style={{ marginTop: "12px" }}
          />

          <input
            name="songAlbum"
            type="text"
            className={styles.input}
            placeholder="Álbum (opcional)"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            style={{ marginTop: "12px" }}
          />

          <input
            name="songImage"
            type="url"
            className={styles.input}
            placeholder="URL de portada (opcional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ marginTop: "12px" }}
          />

          <div className={styles.buttons}>
            <button type="submit" className={styles.button}>
              Guardar
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
