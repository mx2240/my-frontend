import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../fetch";

export default function PaymentCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference");

    useEffect(() => {
        verifyPayment();
    }, []);

    async function verifyPayment() {
        try {
            const res = await api.get(`/paystack/verify?reference=${reference}`);

            if (res.data.ok) {
                toast.success("Payment successful!");
                navigate("/student/dashboard");
            } else {
                toast.error("Payment verification failed");
                navigate("/payment-failed");
            }

        } catch (err) {
            console.error(err);
            toast.error("Payment error");
            navigate("/payment-failed");
        }
    }

    return (
        <div className="p-10 text-center">
            <h2 className="text-xl font-bold">Processing Payment...</h2>
            <p>Please wait</p>
        </div>
    );
}
