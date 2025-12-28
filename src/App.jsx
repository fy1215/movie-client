import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const handleAdd = async () => {
    await fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: movies.length + 1, title: title, year: year }),
    });
    const res = await fetch("http://localhost:3000/movies");
    const data = await res.json();
    setMovies(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/movies/${id}`, {
      method: "DELETE",
    });

    const res = await fetch("http://localhost:3000/movies");
    const data = await res.json();
    setMovies(data);
  };

  return (
    <div>
      <h1>映画一覧</h1>
      <input
        type="text"
        placeholder="タイトルを入力"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="年を入力"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={() => handleAdd()}>追加</button>

      {movies.map((movie) => (
        <div key={movie.id}>
          {movie.title} ({movie.year})
          <button onClick={() => handleDelete(movie.id)}>削除</button>
        </div>
      ))}
    </div>
  );
}

export default App;
