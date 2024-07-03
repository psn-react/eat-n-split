import { Children } from "react";

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
  return (
    <div className="app">
      <div className="sidebar">
        <Friends />
        <Button>Close</Button>
        <AddFriendForm />
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

function Button({ children }) {
  return <button className="button">{children}</button>;
}

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
        <option disabled hidden>
          - choose
        </option>
        <option> - first </option>
      </select>
      <Button>Add Friends</Button>
    </form>
  );
}
