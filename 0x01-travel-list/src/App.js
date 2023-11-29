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

  // const [packed, setItems] = useState(false);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItems(itemId) {
    setItems((items) => items.filter((item) => item.id !== itemId));
  }

  function handleToggleItem(itemId) {
    setItems((items) =>
      items.map((item) =>
      item.id === itemId ? {...item, packed: !pack}
      )
    );
    // crossed line
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
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🌐</h1>;
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
  return (
    <div>
      <ul className="list">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemove={onRemove}
            onPacked={onPacked}
          />
        ))}
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
          onPacked;
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onRemove(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

// setItems((items) => {
//   items.map((item) =>
//     item.id === itemId ? { ...item, packed: !item.packed } : item
//   );
