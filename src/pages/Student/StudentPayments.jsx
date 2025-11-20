import { FaMoneyBillWave, FaCheck, FaTimes } from "react-icons/fa";

const StudentPayments = () => {
    const payments = [
        { invoice: "INV-001", amount: "₵450", status: "Paid" },
        { invoice: "INV-002", amount: "₵300", status: "Unpaid" },
        { invoice: "INV-003", amount: "₵200", status: "Paid" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Payment History</h1>

            <div className="bg-white shadow rounded-xl p-6">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Invoice</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-3">{item.invoice}</td>
                                <td className="p-3">{item.amount}</td>
                                <td className="p-3">
                                    {item.status === "Paid" ? (
                                        <span className="text-green-600 flex items-center gap-2">
                                            <FaCheck /> Paid
                                        </span>
                                    ) : (
                                        <span className="text-red-600 flex items-center gap-2">
                                            <FaTimes /> Unpaid
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentPayments;
