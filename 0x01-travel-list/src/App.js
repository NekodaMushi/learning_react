import { useEffect, useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 2, description: "Chargers", quantity: 1, packed: true },
//   { id: 2, description: "Pants", quantity: 4, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState(() => {
    const saveItems = localStorage.getItem("items");
    return saveItems ? JSON.parse(saveItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItems(itemId) {
    setItems((items) => items.filter((item) => item.id !== itemId));
  }

  function handleToggleItem(itemId) {
    setItems(
      (items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, packed: !item.packed } : item
        )
      // crossed line
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemove={handleRemoveItems}
        onPacked={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Going Away 🌐</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(3);

  function handleSubmit(e) {
    e.preventDefault();
    // initialItems.append(setDescription());
    // console.log(e);
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="text.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onRemove, onPacked }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  return (
    <div>
      <ul
        className="list"
        style={items.length <= 8 ? { minHeight: "65vh" } : {}}
      >
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemove={onRemove}
            onPacked={onPacked}
          />
        ))}

        <div className="actions">
          <select value={sortBy}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
        </div>
      </ul>
    </div>
  );
}

function Item({ item, onRemove, onPacked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onPacked(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onRemove(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
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
