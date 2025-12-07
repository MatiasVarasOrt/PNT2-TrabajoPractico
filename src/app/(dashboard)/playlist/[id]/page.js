"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePlaylists } from "@/app/contexts/PlaylistContext";
import ConfirmDeleteModal from "@/components/shared/ConfirmDeleteModal";
import styles from "../../page.module.css";

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { playlists, removeFromPlaylist, deletePlaylist } = usePlaylists();
  const [isDeletePlaylistModalOpen, setIsDeletePlaylistModalOpen] =
    useState(false);
  const [isDeleteSongModalOpen, setIsDeleteSongModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return (
      <div className={styles.page}>
        <div className={styles.shell}>
          <main className={styles.main}>
            <section className={styles.hero}>
              <h1>Playlist no encontrada</h1>
              <p className={styles.description}>
                La playlist no existe o fue eliminada.
              </p>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <main className={styles.main}>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>Kapelle</p>
            <h1>Playlist: {playlist.name}</h1>
            {playlist.description && (
              <p className={styles.description}>{playlist.description}</p>
            )}

            <button
              className={styles.deleteButton}
              onClick={() => setIsDeletePlaylistModalOpen(true)}
            >
              Eliminar playlist
            </button>
          </section>

          <section className={styles.sections}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              Canciones
            </h2>

            {playlist.songs.length === 0 && (
              <div className={styles.emptyState}>
                <p>No hay canciones agregadas todavía.</p>
              </div>
            )}

            {playlist.songs.length > 0 && (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {playlist.songs.map((song) => (
                  <li
                    key={song.id}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "background 0.2s ease",
                    }}
                  >
                    <div>
                      <strong
                        style={{
                          fontSize: "16px",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        {song.name}
                      </strong>
                      <span
                        style={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontSize: "14px",
                        }}
                      >
                        {song.artist}
                      </span>
                    </div>
                    <button
                      className={styles.deleteButton}
                      onClick={() => {
                        setSongToDelete(song);
                        setIsDeleteSongModalOpen(true);
                      }}
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeletePlaylistModalOpen}
        onClose={() => setIsDeletePlaylistModalOpen(false)}
        onConfirm={() => {
          deletePlaylist(playlist.id);
          router.push("/playlist");
        }}
        itemName={playlist.name}
        itemType="esta playlist"
      />

      <ConfirmDeleteModal
        isOpen={isDeleteSongModalOpen}
        onClose={() => {
          setIsDeleteSongModalOpen(false);
          setSongToDelete(null);
        }}
        onConfirm={() => {
          if (songToDelete) {
            removeFromPlaylist(playlist.id, songToDelete.id);
            setSongToDelete(null);
          }
        }}
        itemName={songToDelete?.name}
        itemType="esta canción de la playlist"
      />
    </div>
  );
}
