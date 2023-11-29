export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Please add items in your packing list</em>
      </p>
    );

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((packedItems / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You're ready to go ! 🛫"
          : `💼 You have ${numItems} items on your list, and you already packed
        ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
