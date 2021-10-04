import React, { useEffect, useState } from "react";
import axios from "axios";

function Users(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const result = await axios("https://jsonplaceholder.typicode.com/posts");
      setUsers(result.data);
    }

    getUsers();
  }, [users]);
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
