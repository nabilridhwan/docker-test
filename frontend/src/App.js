import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";

function App() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/test")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email }),
        }).then((res) => {
            if (res.ok) {
                // Reload the page
                window.location.reload();
            }
        });
    };
    return (
        <div className="App">
            <h1>Dockerization Test</h1>

            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>

                {data.map((user) => (
                    <tr key={user.id}>
                        <td>{user.user_id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </table>

            <div>
                <h3>Add User</h3>
                <i>Data should persist even after restarting containers</i>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button>Add</button>
                </form>
            </div>
        </div>
    );
}

export default App;
