import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";

import { updateUserName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateUserName(username));
    setUsername("");
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 input mb-6"
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start Ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
