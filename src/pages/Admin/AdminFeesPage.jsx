import React, { useState } from "react";
import fetch from '../../fetch'
import AdminLayout from "../../layouts/AdminLayout";

function CreateFee() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch.post(
                "/fees/create",
                { title, amount, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Fee created successfully!");
            setTitle("");
            setAmount("");
            setDescription("");
        } catch (err) {
            console.log(err);
            alert("Failed to create fee");
        }
        setLoading(false);
    };

    return (
        <AdminLayout>


            <div className="fee-container">
                <h2>Create Fee</h2>

                <form onSubmit={handleSubmit}>
                    <label>Fee Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} required />

                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                    />

                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>

                    <button disabled={loading}>{loading ? "Saving..." : "Create Fee"}</button>
                </form>
            </div>
        </AdminLayout>
    );
}

export default CreateFee;
