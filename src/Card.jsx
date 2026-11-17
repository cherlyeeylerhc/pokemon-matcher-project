import Barplot from "./Barplot";

const Card = ({ id, name, type, hp, attack }) => {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: 130,
          height: 200,
          backgroundColor: "white",
          borderRadius: 10,
          margin: 8,
          border: "8px solid rgba(156, 156, 156, 0.1)",
          boxShadow: "1px 1px 2px #23232333",
          padding: 26,
          textAlign: "center",
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}/icons/${type.toLowerCase()}.svg`}
          alt={type}
          height={30}
          width={"auto"}
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
          }}
        />
        <h2 style={{ textAlign: "center" }}>{name}</h2>

        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={id}
          height={120}
          style={{ display: "block", margin: "0 auto" }}
        />
        <div class="bar" style={{ display: "flex", alignItems: "center" }}>
          <span style={{ width: "40px", textAlign: "left" }}>HP </span>
          <Barplot color="#98cedd" data={[hp]} />
          <span style={{ width: "30px", textAlign: "right" }}>{hp}</span>
        </div>
        <div class="bar" style={{ display: "flex", alignItems: "center" }}>
          <span style={{ width: "40px", textAlign: "left" }}>ATK</span>
          <Barplot color="#ed8505" data={[attack]} max={150} />
          <span style={{ width: "30px", textAlign: "right" }}>{attack}</span>
        </div>
      </div>
    </>
  );
};

export default Card;

// 小火龍(橘色): #ed8505
// 皮卡丘(淡黃): #fae285
// 妙蛙種子(藍綠): #7abcb3
// 傑尼龜（淡藍): #a1d6d4
