"use client";
import { useState } from "react";
import styles from "./Modal.module.css";

export default function AddToPlaylistModal({
  track,
  playlists,
  onSelect,         // callback para agregar track a playlist existente
  onCreatePlaylist, // Nuevo callback para crear playlist
  onClose,
}) {
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");

  if (!track) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <h3 style={{ marginBottom: "1rem" }}>
          Agregar "{track.title || track.name}" a playlist
        </h3>

        {/* UI para crear nueva playlist  */}
        {creating ? (
          <>
            <input
              type="text"
              placeholder="Nombre de la playlist"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={styles.input}
            />

            <button
              className={styles.button}
              onClick={() => {
                if (!newName.trim()) return;
                const newPlaylistId = onCreatePlaylist(newName);
                onSelect(newPlaylistId); // agrega el track automáticamente
                onClose();
              }}
            >
              Crear y agregar
            </button>

            <button
              onClick={() => setCreating(false)}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            {/* --- Lista de playlists existentes --- */}
            {playlists.length === 0 ? (
              <p style={{ marginBottom: "0.8rem" }}>
                No tenés playlists todavía.
              </p>
            ) : (
              playlists.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelect(p.id);
                    onClose();
                  }}
                  className={styles.optionButton}
                >
                  {p.name}
                </button>
              ))
            )}

            <button
              onClick={() => setCreating(true)}
              className={styles.button}
            >
              + Nueva Playlist
            </button>

            <button
              onClick={onClose}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
