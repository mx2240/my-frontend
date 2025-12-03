export default function PaymentFailed() {
    return (
        <div className="p-10 text-center">
            <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>

            <a href="/student/fees" className="text-blue-600 underline mt-4 block">
                Try Again
            </a>
        </div>
    );
}
