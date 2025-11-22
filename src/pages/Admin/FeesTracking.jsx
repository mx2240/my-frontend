// src/pages/Admin/FeeTracking.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { FaMoneyBill, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import { api } from "../../api"; // using centralized API helper

const FeeTracking = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees = async () => {
    try {
      const res = await api("/fees/records");
      if (res.ok && Array.isArray(res.body)) setRecords(res.body);
      else setRecords([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load fee records");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api(`/fees/status/${id}`, "PUT", { status });
      if (res.ok) {
        toast.success("Status updated");
        loadFees();
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating status");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <FaMoneyBill className="text-green-600" /> Fee Tracking
        </h1>

        {records.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No fee records found</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {records.map((r) => (
              <div
                key={r._id}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg">{r.student?.name || "Unnamed Student"}</h3>
                  <p className="text-gray-600 mt-1">
                    {r.fee?.title || "No Fee"} — GH₵{r.fee?.amount || 0}
                  </p>
                  <p className="mt-2">
                    Status:{" "}
                    <span
                      className={`font-bold ${r.status === "paid"
                        ? "text-green-600"
                        : r.status === "pending"
                          ? "text-yellow-500"
                          : "text-red-600"
                        }`}
                    >
                      {r.status?.toUpperCase() || "UNPAID"}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2 mt-4 flex-wrap">
                  <button
                    onClick={() => updateStatus(r._id, "paid")}
                    className="flex items-center gap-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <FaCheck /> Paid
                  </button>
                  <button
                    onClick={() => updateStatus(r._id, "pending")}
                    className="flex items-center gap-2 p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    <FaClock /> Pending
                  </button>
                  <button
                    onClick={() => updateStatus(r._id, "unpaid")}
                    className="flex items-center gap-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <FaTimes /> Unpaid
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default FeeTracking;
