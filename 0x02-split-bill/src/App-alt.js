import { useState } from "react";
import { Button } from "./components/Button";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [addFriend, setAddFriend] = useState([]);

  function handleAddFriend(id) {
    setAddFriend(id);
  }

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList onAddFriend={addFriend} />
        {isOpen && <FormAddFriend onSetAddFriend={handleAddFriend} />}
        <Button onClick={handleToggle}>{isOpen ? "Close" : "Open"}</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ onAddFriend }) {
  const friends = initialFriends;
  const newPotos = onAddFriend;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
      {newPotos}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onSetAddFriend }) {
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=");
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriends = {
      name,
      id,
      image: image + id,
      balance: 0,
    };
    setImage("");
    setName("");
    onSetAddFriend(newFriends);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>🌄Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-add-friend">
      <h2>Split a bill with X</h2>
      <label>💰Bill value</label>
      <input type="text" />
      <label>🏃‍♂️Your expense</label>
      <input type="text" />
      <label>💁Friend expense</label>
      <input type="text" disabled />

      <label>🤑Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="X">Friend</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
