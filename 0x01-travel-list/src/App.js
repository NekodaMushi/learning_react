import { useEffect, useState } from "react";
import Form from "./components/Form";
// import PackingList from "./components/tempPackingList";
import Item from "./components/Item";
import Stats from "./components/Stats";

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

  function handleClearList() {
    const confirmation = window.confirm(
      "Are you sure you want to delete all items ?"
    );
    if (confirmation) setItems([]);
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
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Going Away 🌐</h1>;
}
