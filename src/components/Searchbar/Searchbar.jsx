import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error(
        'Sorry, there are no images matching your search query. Please try again.',
        { theme: 'colored' }
      );
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLable}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          // autocomplete="off"
          // autoFocus
          placeholder="Search images and photos"
          value={query}
          name="search"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
