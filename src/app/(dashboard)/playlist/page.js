"use client";

import { useState } from "react";
import { usePlaylists } from "@/app/contexts/PlaylistContext";
import styles from "../page.module.css";
import Link from "next/link";
import CreatePlaylistModal from "@/components/playlist/CreatePlaylistModal";
import ConfirmDeleteModal from "@/components/shared/ConfirmDeleteModal";

export default function PlaylistsPage() {
  const { playlists, deletePlaylist, createPlaylist } = usePlaylists();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);

  function handleCreate(name) {
    createPlaylist(name);
  }

  function handleDelete(playlist) {
    setPlaylistToDelete(playlist);
    setIsDeleteModalOpen(true);
  }

  function confirmDelete() {
    if (playlistToDelete) {
      deletePlaylist(playlistToDelete.id);
      setPlaylistToDelete(null);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <main className={styles.main}>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>Kapelle</p>
            <h1>Playlists</h1>
            <p className={styles.description}>
              Crea, organiza y gestiona tus playlists personalizadas.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.createButton}
            >
              Crear playlist
            </button>
          </section>

          <section className={styles.sections}>
            {playlists.length === 0 && (
              <div className={styles.emptyState}>
                <p>Aún no creaste ninguna playlist.</p>
              </div>
            )}

            {playlists.length > 0 && (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {playlists.map((p) => (
                  <li
                    key={p.id}
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flex: 1,
                      }}
                    >
                      <Link
                        href={`/playlist/${p.id}`}
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          color: "#f5f5f5",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {p.name}
                      </Link>

                      <span
                        style={{
                          color: "rgba(255, 255, 255, 0.6)",
                          fontSize: "14px",
                        }}
                      >
                        ({p.songs.length} canciones)
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(p)}
                      className={styles.deleteButton}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <CreatePlaylistModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={(name) => handleCreate(name)}
          />

          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setPlaylistToDelete(null);
            }}
            onConfirm={confirmDelete}
            itemName={playlistToDelete?.name}
            itemType="esta playlist"
          />
        </main>
      </div>
    </div>
  );
}
