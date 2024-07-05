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

  const [friends, setFriends ]= useState(initialFriends);
  const [toggleForm, setToggleForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);



  function handleToggleShowFriend() {
    setToggleForm((toggle) => !toggle)
  }

  function handleAddFriend (newFriend){
    setFriends(friends => [...friends,newFriend]);
    setToggleForm(false);
  }

  function handleSetSelectedFriend(friend){
    setSelectedFriend((current) => friend.id === current?.id ? null : friend);
    setToggleForm(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friends friends={friends} onSelection={handleSetSelectedFriend} selectedFriend={selectedFriend}/>
        {toggleForm && <AddFriendForm onAddFriend={handleAddFriend} />}
      
        <Button onClick={handleToggleShowFriend}>
          {toggleForm ? "Close" : "Add"}
        </Button>
      </div>

      { selectedFriend && <FormSplit selectedFriend={selectedFriend}/> }
    </div>
  );
}

function Friends({friends,onSelection, selectedFriend}) {

  return (
    <ul>
      {friends.map((f) => (
        <Friend friend={f} key={f.id} onSelection={onSelection} selectedFriend={selectedFriend}  />
      ))}
    </ul>
  );
}

function Friend({ friend,onSelection ,selectedFriend}) {

  const isSelected = selectedFriend?.id === friend.id;
  // const isSelected = true;

  return (
    <li className={isSelected? "selected": ""}>
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

      
      <Button onClick={() => onSelection(friend)}>
        
        {isSelected ? "Close": "Select"}
        </Button>

    </li>
  );
}

function AddFriendForm({onAddFriend}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://random-image-pepebigotes.vercel.app/api/random-image");

  function handleSubmit(e){
    e.preventDefault();
  
    if(!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      id: id,
      image: `${image}?=${id}`,
      balance:0,
    }

    onAddFriend(newFriend);
  
    setName('');
    setImage('https://random-image-pepebigotes.vercel.app/api/random-image');

  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>&#128513; Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

      <label> &#128513; Image URL</label>
      <input type="text" value={image} onChange={e => setImage(e.target.value)}/>

      <Button>Add Friends</Button>
    </form>
  );
}

// reuse functions

function FormSplit({selectedFriend}) {

  const [bill,setBill] = useState("");
  const [paidByUser,setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying,setWhoIsPaying] = useState("user");

  return (
    <form className="form-split-bill">
      <h2>Split the bill with - {selectedFriend.name}</h2>

      <label>💲Bill values</label>
      <input type="text" value={bill} onChange={e => setBill(Number(e.target.value))}/>

      <label>💲Your expense</label>
      <input type="text" value={paidByUser} onChange={e => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))}/>

      <label>💲{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>😅 Who is paying the bill.</label>
      <select value={whoIsPaying} onChange={e => setWhoIsPaying(e.target.value)}>
        <option hidden>- choose</option>
        <option> - User </option>
        <option> -  {selectedFriend.name} </option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
