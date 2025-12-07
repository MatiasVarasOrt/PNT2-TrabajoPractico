"use client";

import { useEffect, useState, useCallback } from "react";
import TopListSection from "@/components/shared/TopListSection";
import CreateSongModal from "@/components/songs/CreateSongModal";
import EditSongModal from "@/components/songs/EditSongModal";
import ConfirmDeleteModal from "@/components/shared/ConfirmDeleteModal";
import styles from "../page.module.css";
import {
  obtenerCanciones,
  crearCancion,
  eliminarCancion,
  actualizarCancion,
} from "@/services/api/songService";
import { getAllArtists } from "@/services/api/artistService";

export default function SongsPage() {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [songToEdit, setSongToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  const fetchSongs = useCallback(async () => {
    try {
      setLoading(true);
      const [songsData, artistsData] = await Promise.all([
        obtenerCanciones(),
        getAllArtists(),
      ]);

      // Guardar artistas para el selector
      setArtists(artistsData);

      // Crear mapa de artistas para lookup rápido
      const artistMap = {};
      artistsData.forEach((artist) => {
        artistMap[artist.id] = artist.name;
      });

      const normalizedSongs = songsData.map((song, index) => ({
        id: song.id,
        name: song.name || "Canción sin nombre",
        artist: artistMap[song.artistaId] || "Artista desconocido",
        subtitle: song.album,
        image: song.image,
        popularity: song.popularity,
        metric: song.duration ? `${song.duration} min` : undefined,
        rank: index + 1,
      }));

      setSongs(normalizedSongs);
      setError(null);
    } catch (err) {
      console.error("Error al cargar canciones:", err);
      setError("No se pudieron cargar las canciones en este momento.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]); //se ejecuta cuando cambia algo en el fecht

  const handleCreateSong = async (data) => {
    try {
      await crearCancion({
        name: data.name,
        artistaId: data.artistId,
        album: data.album || undefined,
        image: data.image || undefined,
      });
      await fetchSongs();
      alert("Canción creada correctamente");
    } catch (err) {
      console.error("No se pudo crear la canción", err);
      alert("No se pudo crear la canción. Prueba nuevamente más tarde.");
    }
  };

  const handleEditSong = (song) => {
    setSongToEdit(song);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (data) => {
    if (!songToEdit) return;

    try {
      await actualizarCancion(songToEdit.id, data);
      await fetchSongs();
      setIsEditModalOpen(false);
      setSongToEdit(null);
      alert("Canción editada correctamente");
    } catch (err) {
      console.error("No se pudo editar la canción", err);
      alert("No se pudo editar la canción");
    }
  };

  const handleDeleteSong = (song) => {
    if (!song?.id) {
      alert("Esta canción no tiene un ID válido.");
      return;
    }
    setSongToDelete(song);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!songToDelete) return;

    try {
      await eliminarCancion(songToDelete.id);
      await fetchSongs();
      setSongToDelete(null);
    } catch (err) {
      console.error("No se pudo eliminar la canción:", err);
      alert("No se pudo eliminar la canción");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <main className={styles.main}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>Kapelle</p>
            <h1>Canciones</h1>
            <p className={styles.description}>
              Gestiona y crea tus canciones favoritas.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.createButton}
            >
              Crear canción
            </button>
          </header>

          {loading && <p style={{ padding: "1rem" }}>Cargando canciones...</p>}

          {error && !loading && (
            <div className={styles.emptyState}>
              <h2>{error}</h2>
              <button className={styles.createButton} onClick={fetchSongs}>
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && (
            <TopListSection
              title="Listado general de canciones"
              items={songs}
              type="track"
              accentColor="#2ecc71"
              onEdit={handleEditSong}
              onDelete={handleDeleteSong}
            />
          )}
        </main>
      </div>

      <CreateSongModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateSong}
        artists={artists}
      />

      <EditSongModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSongToEdit(null);
        }}
        onEdit={handleEditSubmit}
        song={songToEdit}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSongToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={songToDelete?.name}
        itemType="esta canción"
      />
    </div>
  );
}
