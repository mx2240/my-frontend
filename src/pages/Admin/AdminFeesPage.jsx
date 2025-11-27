// import React, { useState } from "react";
// import fetch from '../../fetch'
// import AdminLayout from "../../layouts/AdminLayout";

// function CreateFee() {
//     const [title, setTitle] = useState("");
//     const [amount, setAmount] = useState("");
//     const [description, setDescription] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async e => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const token = localStorage.getItem("token");

//             const res = await fetch.post(
//                 "/fees/create",
//                 { title, amount, description },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             alert("Fee created successfully!");
//             setTitle("");
//             setAmount("");
//             setDescription("");
//         } catch (err) {
//             console.log(err);
//             alert("Failed to create fee");
//         }
//         setLoading(false);
//     };

//     return (
//         <AdminLayout>


//             <div className="fee-container">
//                 <h2>Create Fee</h2>

//                 <form onSubmit={handleSubmit}>
//                     <label>Fee Title</label>
//                     <input value={title} onChange={e => setTitle(e.target.value)} required />

//                     <label>Amount</label>
//                     <input
//                         type="number"
//                         value={amount}
//                         onChange={e => setAmount(e.target.value)}
//                         required
//                     />

//                     <label>Description</label>
//                     <textarea
//                         value={description}
//                         onChange={e => setDescription(e.target.value)}
//                     ></textarea>

//                     <button disabled={loading}>{loading ? "Saving..." : "Create Fee"}</button>
//                 </form>
//             </div>
//         </AdminLayout>
//     );
// }

// export default CreateFee;







import React, { useState, useEffect } from "react";
import fetch from '../../fetch'

export default function AddFee() {
    const [form, setForm] = useState({
        title: "",
        amount: "",
        description: "",
    });

    const [fees, setFees] = useState([]);

    const token = localStorage.getItem("token");

    // Load all fees
    const loadFees = () => {
        fetch
            .get("/api/fees", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setFees(res.data.fees))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadFees();
    }, []);

    const addFee = async (e) => {
        e.preventDefault();

        try {
            await fetch.post(
                "/fees/create",
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setForm({ title: "", amount: "", description: "" });
            loadFees();
            alert("Fee added successfully");
        } catch (err) {
            alert("Error adding fee");
        }
    };

    const deleteFee = async (id) => {
        if (!window.confirm("Delete this fee?")) return;

        try {
            await fetch.delete(
                `/api/fees/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            loadFees();
        } catch (err) {
            alert("Error deleting fee");
        }
    };

    return (
        <div className="fee-page">
            <h2>Add Fee</h2>

            <form onSubmit={addFee} className="fee-form">
                <input
                    type="text"
                    placeholder="Fee title"
                    name="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />

                <input
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    required
                />

                <textarea
                    placeholder="Description (optional)"
                    name="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <button type="submit">Add Fee</button>
            </form>

            <h3>All Fees</h3>
            <table className="fee-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {fees.map((fee) => (
                        <tr key={fee._id}>
                            <td>{fee.title}</td>
                            <td>{fee.amount}</td>
                            <td>{fee.description}</td>
                            <td>
                                <button className="delete-btn" onClick={() => deleteFee(fee._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
