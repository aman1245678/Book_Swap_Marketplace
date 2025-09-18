import { useEffect, useState } from "react";
import api from "../api/axios";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";


export default function Marketplace() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        api.get("/books").then((res) => setBooks(res.data));
    }, []);

    const handleRequest = async (bookId) => {
        await api.post(`/requests/${bookId}`);
        alert("Request sent");
    };

    return (
        <>
            <Navbar />
            <div className="marketplace-container">
                {books.map((book) => (
                    <BookCard key={book._id} book={book} onRequest={handleRequest} />
                ))}
            </div>
        </>
    );
}
