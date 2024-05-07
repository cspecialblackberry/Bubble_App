import { useQuery } from "@apollo/client"
import {QUERY_USERS} from '../../utils/queries'
import { useState } from "react";

export default function Friends() {
    const {loading, error, data} = useQuery(QUERY_USERS)
    const [users, setUsers] = useState([])

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if(data) {console.log(data)}

    

    return (
      <>
          {users.map((user) => {
            <h2>{user.username}</h2>
          })}
      </>
    );
  }
  