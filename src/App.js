import { useQuery } from "@apollo/client";
import "./App.css";
import { gql } from "@apollo/client";
import { useState } from "react";

const ANIME = gql`
  query Anime($query: String!) {
    Media(search: $query, type: ANIME) {
      id
      title {
        romaji
        native
      }
      coverImage {
        large
      }
      averageScore
    }
  }
`;

function App() {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const { loading, error, data } = useQuery(ANIME, {
    variables: { query },
    skip: !query, //skip query if query is empty
  });

  const handleForm = (e) => {
    e.preventDefault();
    
    setQuery(input);
  };

  return (
    <div className="App">
      <form action="GET" onSubmit={handleForm}>
        <label>
          Search anime:{" "}
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="e.g One Piece..."
          />
        </label>
        <button className="form-btn" type="submit">
          Search
        </button>
      </form>

      <div className="results">
        {data ? (
          <>
            <div>
              <h2>Title: {data.Media.title.romaji}</h2>
              <h2>Score: {data.Media.averageScore / 10}</h2>
            </div>
            <img src={data.Media.coverImage.large} alt="" />
          </>
        ) : !data && loading ? (
          <p>Loading...</p>
        ) : (
          !data &&
          !loading &&
          error && <p style={{ color: "red" }}>{error.message}</p>
        )}
      </div>
    </div>
  );
}

export default App;
