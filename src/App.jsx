import { useState, useEffect } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

export function App() {
  const [fact, setFact] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Para recuperar la cita cada vez que tengamos una nueva
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);

        // const firstthreewords = fact.split(" ").slice(0, 3).join(" ");
      });
  }, []);

  // Para recuperar la imagen a partir de la cita
  useEffect(() => {
    if (!fact) return;
    const firstWord = fact.split(" ")[0];

    fetch(
      `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(`https://cataas.com${url}`);
      });
  }, [fact]);

  return (
    <main>
      <h1>Cats Random Facts</h1>
      <div className="content">
        {fact && <h2>{fact}</h2>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Image extracted using the first word of the following string ${fact}`}
          />
        )}
      </div>
    </main>
  );
}
