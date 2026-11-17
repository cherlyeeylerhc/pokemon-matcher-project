import { useState } from "react";
import "./index.css";
import Card from "./Card";
import { getMultiplier } from "./typeChart";

const pokemon = [
  { id: 1, name: "Bulbasaur", type: "Grass", hp: 45, attack: 49 },
  { id: 4, name: "Charmander", type: "Fire", hp: 39, attack: 52 },
  { id: 7, name: "Squirtle", type: "Water", hp: 44, attack: 48 },
  { id: 25, name: "Pikachu", type: "Electric", hp: 35, attack: 55 },
  { id: 6, name: "Charizard", type: "Fire", hp: 78, attack: 84 },
  { id: 9, name: "Blastoise", type: "Water", hp: 79, attack: 83 },
  { id: 3, name: "Venusaur", type: "Grass", hp: 80, attack: 82 },
  { id: 150, name: "Mewtwo", type: "Psychic", hp: 106, attack: 110 },
  { id: 39, name: "Jigglypuff", type: "Normal", hp: 115, attack: 45 },
  { id: 143, name: "Snorlax", type: "Normal", hp: 160, attack: 110 },
  { id: 94, name: "Gengar", type: "Ghost", hp: 60, attack: 65 },
  { id: 131, name: "Lapras", type: "Water", hp: 130, attack: 85 },
  { id: 133, name: "Eevee", type: "Normal", hp: 55, attack: 55 },
  { id: 149, name: "Dragonite", type: "Dragon", hp: 91, attack: 134 },
  { id: 59, name: "Arcanine", type: "Fire", hp: 90, attack: 110 },
  { id: 65, name: "Alakazam", type: "Psychic", hp: 55, attack: 50 },
  { id: 68, name: "Machamp", type: "Fighting", hp: 90, attack: 130 },
  { id: 76, name: "Golem", type: "Rock", hp: 80, attack: 120 },
  { id: 130, name: "Gyarados", type: "Water", hp: 95, attack: 125 },
  { id: 148, name: "Dragonair", type: "Dragon", hp: 61, attack: 84 },
];

const typeAdvantage = {
  Normal: [],
  Grass: ["Water", "Rock", "Ground"],
  Fire: ["Grass"],
  Water: ["Fire", "Rock", "Ground"],
  Electric: ["Water"],
  Rock: ["Fire"],
  Poison: ["Grass"],
  Ground: ["Fire", "Electric", "Rock", "Ground"],
  Fighting: ["Normal", "Rock"],
  Psychic: ["Poison", "Fighting"],
  Ghost: ["Psychic", "Ghost"],
  Dragon: ["Dragon"],
};

// Sprite image URL pattern:
// `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

// Title
function App() {
  const [mode, setMode] = useState("findCounter");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const getMatchScore = (candidate, target, currentMode) => {
    let typeMultiploer = 1.0;
    if (currentMode === "findCounter") {
      typeMultiploer = getMultiplier(candidate.type, target.type);
    } else {
      typeMultiploer = getMultiplier(target.type, candidate.type);
    }
    if (typeMultiploer === 0.0) return -999;
    const candidatePower = candidate.hp + candidate.attack;
    const targetPower = target.hp + target.attack;
    const statRatio = candidatePower / targetPower;
    return typeMultiploer * statRatio;
  };

  const getProcessedPokemon = () => {
    if (!selectedPokemon) return pokemon;
    const targetPokemon = pokemon.find((p) => p.id === selectedPokemon);
    if (!targetPokemon) return pokemon;

    return (
      pokemon
        .filter((p) => p.id !== selectedPokemon)
        .map((p) => {
          // Explicitly check the type multiplier to filter out disadvantageous matchups
          let typeMultiplier = 1.0;
          if (mode === "findCounter") {
            typeMultiplier = getMultiplier(p.type, targetPokemon.type);
          } else {
            typeMultiplier = getMultiplier(targetPokemon.type, p.type);
          }

          const candidatePower = p.hp + p.attack;
          const targetPower = targetPokemon.hp + targetPokemon.attack;
          const statRatio = candidatePower / targetPower;
          const score =
            typeMultiplier === 0.0 ? -999 : typeMultiplier * statRatio;

          return { ...p, score, typeMultiplier };
        })
        // Ensure the match has a neutral or advantageous type advantage (>= 1.0)
        .filter((p) => p.score > 0 && p.typeMultiplier >= 1.0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    );
  };

  const processedList = getProcessedPokemon();
  const selectedCardObj = pokemon.find((p) => p.id === selectedPokemon);
  return (
    <>
      <div id="hero">
        <h1>Pokématch test</h1>
      </div>
      {/* Mode Switcher Buttons */}
      <div className="button-container">
        <button
          className={`mode-btn ${mode === "findCounter" ? "active" : ""}`}
          onClick={() => {
            setMode("findCounter");
            setSelectedPokemon(null);
          }}
        >
          Find Counters
        </button>
        <button
          className={`mode-btn ${mode === "findTargets" ? "active" : ""}`}
          onClick={() => {
            setMode("findTargets");
            setSelectedPokemon(null);
          }}
        >
          Find Easy Targets
        </button>
      </div>

      {/* Instructions / Active Selection Feedback */}
      {!selectedPokemon && (
        <div className="status-banner" style={{ margin: "0" }}>
          {mode === "findCounter"
            ? "Select an opponent Pokémon to find the best counters:"
            : "Select your Pokémon to find who you can easily defeat:"}
        </div>
      )}
      {/* Reset Button*/}
      {selectedPokemon && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            className="mode-btn"
            onClick={() => setSelectedPokemon(null)}
            style={{}}
          >
            Show All Pokémon
          </button>
        </div>
      )}
      {/* Highlighted Selected Card Display*/}
      {selectedCardObj && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p style={{ fontWeight: "bold", color: "3b4cca" }}>
            Currently Selected:
          </p>
          <div
            style={{
              display: "inline-block",
              border: "4px solid #ed8505",
              borderRadius: "15px",
              padding: "5px",
              backgroundColor: "#98cedd",
            }}
          >
            <Card
              id={selectedCardObj.id}
              name={selectedCardObj.name}
              type={selectedCardObj.type}
              hp={selectedCardObj.hp}
              attack={selectedCardObj.attack}
            />
          </div>
          {/* Explanatory header text for what is displayed below */}

          <p style={{ margin: "30px" }}></p>
          <p
            style={{
              textAlign: "center",
              color: "#6390F0 ",
              textShadow: "2px 2px #fae285",
              webkitTextStroke: "0.1px #a1d6d4",
              fontWeight: "700",
              fontSize: "22px",
              marginTop: "10px",
            }}
          >
            {mode === "findCounter"
              ? `🔥 Best Counters Against ${selectedCardObj.name}🔥`
              : `🎯 Easy Targets For ${selectedCardObj.name}🎯 `}
          </p>
        </div>
      )}
      {/* Render Cards Grid */}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {processedList.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPokemon(p.id)}
            style={{ cursor: "pointer" }}
          >
            <Card
              id={p.id}
              name={p.name}
              type={p.type}
              hp={p.hp}
              attack={p.attack}
            />
          </div>
        ))}
        <div id="hero"></div>
      </div>
    </>
  );
}

export default App;
