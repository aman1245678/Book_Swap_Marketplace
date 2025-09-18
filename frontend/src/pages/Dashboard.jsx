import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";


export default function Dashboard() {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({ title: "", author: "", condition: "", image: "" });

    const loadBooks = () => {
        api.get("/books/my").then((res) => setBooks(res.data));
    };

    useEffect(() => { loadBooks(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/books", form);
        setForm({ title: "", author: "", condition: "", image: "" });
        loadBooks();
    };

    const handleDelete = async (id) => {
        await api.delete(`/books/${id}`);
        loadBooks();
    };

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <h1 className="dashboard-title">My Books</h1>
                <form onSubmit={handleSubmit} className="dashboard-form">
                    <input
                        className="dashboard-input"
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                    <input
                        className="dashboard-input"
                        placeholder="Author"
                        value={form.author}
                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                    />
                    <input
                        className="dashboard-input"
                        placeholder="Condition"
                        value={form.condition}
                        onChange={(e) => setForm({ ...form, condition: e.target.value })}
                    />
                    <input
                        className="dashboard-input"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                    />
                    <button className="dashboard-add-btn">Add Book</button>
                </form>

                <div className="dashboard-books-grid">
                    {books.map((b) => (
                        <div key={b._id} className="dashboard-book-card">
                            <h2 className="dashboard-book-title">{b.title}</h2>
                            <p className="dashboard-book-author">{b.author}</p>
                            <button
                                onClick={() => handleDelete(b._id)}
                                className="dashboard-book-delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
