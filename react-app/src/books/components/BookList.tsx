import React, { useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';
import { useBookProvider } from '../providers/useBookProvider';
import { BookListItem } from './BookListItem';
import { CreateBookModal } from './CreateBookModal';

export function BookList(): React.ReactElement {
  const { books, loadBooks, deleteBook, updateBook, createBook } = useBookProvider();
  
  // Nouveaux états pour la recherche et le tri
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('title');

  useEffect((): void => {
    loadBooks();
  }, []);

  // Filtrage et Tri combinés
  const filteredBooks = books
    .filter((book) =>
      `${book.title} ${book.author.firstName} ${book.author.lastName}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'yearPublished') return b.yearPublished - a.yearPublished; // Plus récent en premier
      if (sortBy === 'author') return a.author.lastName.localeCompare(b.author.lastName);
      return 0;
    });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>Liste des Livres</h2>
        <CreateBookModal onCreate={createBook} />
      </div>

      {/* Barre de recherche et options de tri */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <Input.Search
          placeholder="Rechercher un livre ou un auteur..."
          allowClear
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearchText(e.target.value)}
          style={{ maxWidth: 400 }}
        />
        <Select
          defaultValue="title"
          style={{ width: 200 }}
          onChange={(value: string): void => setSortBy(value)}
          options={[
            { value: 'title', label: 'Trier par Titre (A-Z)' },
            { value: 'yearPublished', label: 'Trier par Année (Récent)' },
            { value: 'author', label: 'Trier par Auteur (A-Z)' },
          ]}
        />
      </div>

      <div style={{ padding: '0 .5rem' }}>
        {filteredBooks.map(book => (
          <BookListItem key={book.id} book={book} onDelete={deleteBook} onUpdate={updateBook} />
        ))}
        {filteredBooks.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>Aucun livre trouvé.</p>}
      </div>
    </div>
  );
}