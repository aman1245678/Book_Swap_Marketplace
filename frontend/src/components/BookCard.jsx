


export default function BookCard({ book, onRequest }) {
    return (
        <div className="book-card">
            {book.image && (
                <img src={book.image} alt={book.title} className="book-card-image" />
            )}
            <h2 className="book-card-title">{book.title}</h2>
            <p className="book-card-author">{book.author}</p>
            <p className="book-card-condition">Condition: {book.condition}</p>
            {onRequest && (
                <button
                    onClick={() => onRequest(book._id)}
                    className="book-card-request-btn"
                >
                    Request
                </button>
            )}
        </div>
    );
}
