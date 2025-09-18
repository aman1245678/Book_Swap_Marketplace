import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";


export default function Requests() {
    const [incoming, setIncoming] = useState([]);
    const [mine, setMine] = useState([]);

    const load = () => {
        api.get("/requests/received").then((res) => setIncoming(res.data));
        api.get("/requests/my").then((res) => setMine(res.data));
    };

    useEffect(() => { load(); }, []);

    const updateStatus = async (id, status) => {
        await api.put(`/requests/${id}`, { status });
        load();
    };

    return (
        <>
            <Navbar />
            <div className="requests-container">
                <div className="requests-column">
                    <h2 className="requests-title">Requests for My Books</h2>
                    {incoming.map((r) => (
                        <div key={r._id} className="request-card">
                            <p><b>{r.requester.name}</b> requested <b>{r.book.title}</b></p>
                            <p className="request-status">Status: {r.status}</p>
                            {r.status === "pending" && (
                                <div className="request-actions">
                                    <button
                                        onClick={() => updateStatus(r._id, "accepted")}
                                        className="request-accept-btn"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => updateStatus(r._id, "declined")}
                                        className="request-decline-btn"
                                    >
                                        Decline
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="requests-column">
                    <h2 className="requests-title">My Requests</h2>
                    {mine.map((r) => (
                        <div key={r._id} className="request-card">
                            <p>You requested <b>{r.book.title}</b></p>
                            <p className="request-status">Status: {r.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
