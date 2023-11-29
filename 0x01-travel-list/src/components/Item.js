import React from "react";

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
export default Item;
