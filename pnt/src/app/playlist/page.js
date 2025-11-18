"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { usePlaylists } from "@/app/contexts/PlaylistContext";
import styles from "../page.module.css";
import Link from "next/link";
import CreatePlaylistModal from "@/components/CreatePlaylistModal";


export default function PlaylistsPage() {
  const { playlists, deletePlaylist, createPlaylist } = usePlaylists();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCreate(name) {
    createPlaylist(name);
  }

  return (
    <DashboardLayout>
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

            <ul style={{ marginTop: "1.2rem", listStyle: "none", padding: 0 }}>
              {playlists.map((p) => (
                <li key={p.id} style={{
                    marginBottom: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}>
                    {/* Linkeo a la página individual de la playlist */}
                  <Link
                    href={`/playlist/${p.id}`}     
                    style={{ fontWeight: "bold", marginRight: "1rem" }}
                  >
                    {p.name}
                  </Link>

                  <span style={{ opacity: 0.7 }}>
                    ({p.songs.length} canciones)
                  </span>

                  <button
                    onClick={() => deletePlaylist(p.id)}
                    className={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </section>

            <CreatePlaylistModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onCreate={(name) => handleCreate(name)}
            />


          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
