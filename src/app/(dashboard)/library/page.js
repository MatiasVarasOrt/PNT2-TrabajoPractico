"use client";

import styles from "../page.module.css";
import { useLibrary } from "@/app/contexts/LibraryContext";

export default function LibraryPage() {
  const { libraryItems, removeFromLibrary } = useLibrary();
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <main className={styles.main}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>Kapelle</p>
            <h1>Mi Biblioteca</h1>
            <p className={styles.description}>
              Todo lo que guardaste en un solo lugar.
            </p>
          </header>

          {libraryItems.length === 0 && (
            <div className={styles.emptyState}>
              <h2>No guardaste nada todavía.</h2>
            </div>
          )}

          {libraryItems.length > 0 && (
            <div className={styles.sections}>
              <ul className={styles.itemList}>
                {libraryItems.map((item) => (
                  <li key={item.id} className={styles.itemCard}>
                    <div className={styles.itemContent}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.itemImage}
                        />
                      )}
                      <div className={styles.itemInfo}>
                        <strong className={styles.itemTitle}>
                          {item.name}
                        </strong>
                        <span className={styles.itemSubtitleText}>
                          {item.artist}
                        </span>
                      </div>
                    </div>
                    <button
                      className={styles.deleteButton}
                      onClick={() => removeFromLibrary(item.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
