export default function PaymentSuccess() {
    return (
        <div className="p-10 text-center">
            <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
            <p>Your fee has been updated.</p>

            <a href="/student/dashboard" className="text-blue-600 underline mt-4 block">
                Go to Dashboard
            </a>
        </div>
    );
}
