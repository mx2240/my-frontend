// src/pages/Admin/AdminFeesPage.jsx
import { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function AdminFeesPage() {
    const [fees, setFees] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);

    // Load all fees
    const loadFees = async () => {
        try {
            const res = await fetch.get("/fees");
            setFees(res.data.fees || []);
        } catch (err) {
            console.log(err);
            toast.error("Failed to load fees");
        }
    };

    useEffect(() => {
        loadFees();
    }, []);

    // Handle input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit new fee
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.amount) {
            return toast.error("Title and Amount are required!");
        }

        try {
            setLoading(true);

            const res = await fetch.post("/fees", formData);
            toast.success("Fee created successfully");

            setFormData({ title: "", amount: "", description: "" });
            loadFees();
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Error creating fee");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Admin – Manage Fees</h2>

            {/* Create Fee Form */}
            <form style={styles.card} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Fee title"
                    value={formData.title}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    style={styles.input}
                />

                <textarea
                    name="description"
                    placeholder="Description (optional)"
                    value={formData.description}
                    onChange={handleChange}
                    style={styles.textarea}
                />

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Saving..." : "Add Fee"}
                </button>
            </form>

            {/* Fee List */}
            <h3 style={{ marginTop: "25px" }}>Existing Fees</h3>

            <div>
                {fees.length === 0 ? (
                    <p>No fees found.</p>
                ) : (
                    fees.map((fee) => (
                        <div key={fee._id} style={styles.feeItem}>
                            <strong>{fee.title}</strong> – GH₵{fee.amount}
                            <p>{fee.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: { padding: "20px" },
    card: {
        display: "flex",
        flexDirection: "column",
        width: "350px",
        gap: "12px",
        padding: "18px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    input: {
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "6px",
    },
    textarea: {
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        minHeight: "80px",
    },
    button: {
        padding: "12px",
        background: "#2563eb",
        color: "#fff",
        borderRadius: "6px",
    },
    feeItem: {
        background: "#f8fafc",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px",
    },
};
