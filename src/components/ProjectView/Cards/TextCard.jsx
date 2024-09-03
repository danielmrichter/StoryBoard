export default function TextCard({ item }) {
  return (
    <div i={item.id} style={{ backgroundColor: item.bg_color }}>
      <h1>{item.id}</h1>
    </div>
  );
}
