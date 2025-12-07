"use client";

import { useState, useEffect } from "react";
import ArtistCard from "@/components/artists/ArtistCard";
import CreateArtistModal from "@/components/artists/CreateArtistModal";
import EditArtistModal from "@/components/artists/EditArtistModal";
import {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
} from "@/services/api/artistService";
import styles from "../page.module.css";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [artistToEdit, setArtistToEdit] = useState(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const data = await getAllArtists();
      setArtists(data);
    } catch (err) {
      console.error("Error al cargar artistas:", err);
    }
  };

  const handleCreate = async (data) => {
    const newArtist = {
      name: data.name,
      image: data.image,
      followers: 0,
    };

    try {
      await createArtist(newArtist);
      await fetchArtists();
    } catch (err) {
      console.error("Error al crear artista:", err);
      alert(
        "No se pudo crear el artista. Revisa la consola para más detalles."
      );
    }
  };

  const handleEdit = (artist) => {
    setArtistToEdit(artist);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (data) => {
    if (!artistToEdit) return;

    const updated = {
      name: data.name,
      image: data.image,
      followers: artistToEdit.followers || 0,
    };

    try {
      await updateArtist(artistToEdit.id, updated);
      await fetchArtists();
      setIsEditModalOpen(false);
      setArtistToEdit(null);
    } catch (err) {
      console.error("Error al actualizar artista:", err);
      alert("No se pudo guardar el artista. Revisa la consola.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este artista?")) {
      await deleteArtist(id);
      fetchArtists();
    }
  };

  try {
    return (
      <div className={styles.page}>
        <div className={styles.shell}>
          <main className={styles.main}>
            <header className={styles.hero}>
              <p className={styles.eyebrow}>Kapelle</p>
              <h1>Artistas</h1>
              <p className={styles.description}>
                Estos son los artistas más relevantes del momento, junto con sus
                canciones más populares.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className={styles.createButton}
              >
                Crear Artista
              </button>
            </header>

            <div className={styles.sections}>
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </main>
        </div>

        <CreateArtistModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreate}
        />

        <EditArtistModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setArtistToEdit(null);
          }}
          onEdit={handleEditSubmit}
          artist={artistToEdit}
        />
      </div>
    );
  } catch (error) {
    console.error("Error al cargar la página de artistas:", error || e);
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.emptyState}>
            <h1>{error || "Error al cargar los artistas"}</h1>
            <p>No se pudo obtener la información desde Kapelle.</p>
          </div>
        </main>
      </div>
    );
  }
}
