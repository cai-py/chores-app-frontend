import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const UserModal = ({ isOpen, onClose, choreId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://chores-app-api-3550fe946076.herokuapp.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("Users:", users);
  }, [users]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>List of Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.userName}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close Modal</button>
    </Modal>
  );
};

export default UserModal;


{/* <button onClick={onClose}>Close Modal</button> */}