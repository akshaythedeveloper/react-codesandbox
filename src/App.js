import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(false);

  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error(`HTTP Error happened ${response.status}`);
      }
      const users = await response.json();
      setData(users);
    } catch (error) {
      console.log(`Error fetching data: ${error.message}`);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => getUsers(), 2000);
    return setLoading(true);
  }, [toggle]);

  return (
    <div className={styles.App}>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <ul
          style={{
            listStyleType: "none",
            backgroundColor: "#f1f1f1",
            padding: "20px",
          }}
        >
          {data.map((user) => (
            <li
              style={{
                backgroundColor: "lightgray",
                margin: "10px",
                borderRadius: "20px",
                padding: "20px",
              }}
              key={user.id}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
      <div hidden={loading}>
        <button
          onClick={handleToggle}
          style={{
            height: "40px",
            width: "160px",
            backgroundColor: "blue",
            color: "white",
            cursor: "pointer",
            borderRadius: "10px",
          }}
        >
          Reload Data
        </button>
      </div>
    </div>
  );
}
