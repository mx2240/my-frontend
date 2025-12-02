import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function StudentPaymentPage() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = "https://my-backend-amber.vercel.app";

    const token = localStorage.getItem("studentToken");

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/student/fees/my-fees`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.ok) {
                setFees(res.data.fees);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to load fees");
        } finally {
            setLoading(false);
        }
    };

    // ▶️ Paystack Initiate Payment
    const handlePayNow = async (assignedFeeId) => {
        try {
            const res = await axios.post(
                `${API_BASE}/api/payments/initiate`,
                { assignedFeeId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.ok) {
                window.location.href = res.data.authorization_url; // redirect to paystack
            }
        } catch (err) {
            console.error(err);
            toast.error("Unable to initiate payment");
        }
    };

    if (loading) return <p>Loading fees...</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>My Fees & Payment</h2>

            {fees.length === 0 ? (
                <p>No fees assigned.</p>
            ) : (
                <div style={styles.cardWrapper}>
                    {fees.map((item) => (
                        <div key={item._id} style={styles.card}>
                            <h3>{item.fee.title}</h3>
                            <p><strong>Amount:</strong> GHS {item.fee.amount}</p>
                            <p><strong>Status:</strong>
                                <span
                                    style={{
                                        color: item.status === "paid" ? "green" : "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.status.toUpperCase()}
                                </span>
                            </p>

                            {/* Show Pay Now if unpaid */}
                            {item.status !== "paid" && (
                                <button
                                    style={styles.payBtn}
                                    onClick={() => handlePayNow(item._id)}
                                >
                                    Pay Now
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "30px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial",
    },
    header: {
        marginBottom: "20px",
    },
    cardWrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px",
    },
    card: {
        padding: "20px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    },
    payBtn: {
        padding: "10px 15px",
        background: "green",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },
};

export default StudentPaymentPage;
