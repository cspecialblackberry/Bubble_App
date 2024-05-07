import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';
import { useState, useEffect } from "react";

export default function Friends() {
  const { loading, error, data } = useQuery(QUERY_USERS);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(prevUsers => [...prevUsers, ...data.users]);
    }
  }, [data]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {users.map((user) => (
        <h2 key={user._id}>{user.username}</h2>
      ))}
    </>
  );
}