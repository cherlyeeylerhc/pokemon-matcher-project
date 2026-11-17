import Rectangle from "./Rectangle";

const Barplot = ({ color, data, max = 160 }) => {
  return (
    <div
      style={{
        width: "160px",
        height: "4px",
        backgroundColor: "#e3e3e3",
        borderRadius: "2px",
        overflow: "hidden",
        display: "flex",
        margin: "4px",
      }}
    >
      {data.map((value, i) => (
        <Rectangle key={i} color={color} value={value} max={max} />
      ))}
    </div>
  );
};

export default Barplot;
