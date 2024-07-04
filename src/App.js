import { useState } from "react";

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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [toggleList, setToggleList] = useState(false);

  function handleToggleShowFriend() {
    setToggleList((toggle) => !toggle);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friends />
        {toggleList && <AddFriendForm />}
        {/* {toggleList ? (
          <Button>Close</Button>
        ) : (
          <Button onClick={handleToggleShowFriend}>Add Friend</Button>
        )} */}
        <Button onClick={handleToggleShowFriend}>
          {toggleList ? "Close" : "Add Friend"}
        </Button>
      </div>

      <FormSplit />
    </div>
  );
}

function Friends() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((f) => (
        <Friend friend={f} key={f.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You Owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance === 0 && (
        <p className="blue">You and {friend.name} are even</p>
      )}

      <Button>Select</Button>
    </li>
  );
}

function AddFriendForm() {
  return (
    <form className="form-add-friend">
      <label>&#128513; Name</label>
      <input type="text" />
      <label> &#128513; Image URL</label>
      <input type="text" />

      <Button>Add Friends</Button>
    </form>
  );
}

// reuse functions

function FormSplit() {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with (x)</h2>

      <label>💲Bill values</label>
      <input type="text" />

      <label>💲Your expense</label>
      <input type="text" />

      <label>💲X's expense</label>
      <input type="text" disabled />

      <label>😅 Who is paying the bill.</label>
      <select>
        <option hidden>- choose</option>
        <option> - User </option>
        <option> - Friend </option>
      </select>
      <Button>Add Friends</Button>
    </form>
  );
}
