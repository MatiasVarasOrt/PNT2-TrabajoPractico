import { useState } from "react";
import styles from "../playlist/Modal.module.css";

export default function EditArtistModal({ isOpen, onClose, onEdit, artist }) {
  if (!isOpen || !artist) return null;

  const [name, setName] = useState(artist.name);
  const [image, setImage] = useState(artist.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim()) {
      onEdit({
        name: name.trim(),
        image: image.trim() || artist.image,
      });
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar artista</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="artistName"
            type="text"
            className={styles.input}
            placeholder="Nombre del artista"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            name="artistImage"
            type="url"
            className={styles.input}
            placeholder="URL de la imagen (opcional)"
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
