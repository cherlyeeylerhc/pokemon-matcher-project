const Rectangle = ({ color, value, max = 160 }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div
      style={{
        display: "flex",
        width: `${percentage}%`,
        height: "100%",
        backgroundColor: color,
        borderRadius: 2,
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default Rectangle;
