import { useState } from "react";
import { Item } from "./Item";

export function PackingList({ items, onRemove, onClearList, onPacked }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
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
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by alphabetic</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={() => onClearList()}>Clear List</button>
        </div>
      </ul>
    </div>
  );
}
