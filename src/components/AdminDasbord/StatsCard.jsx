export default function StatsCard({ title, value, icon }) {
    return (
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
            <div className="text-4xl text-blue-600">{icon}</div>

            <div>
                <p className="text-gray-600 text-sm">{title}</p>
                <h3 className="text-2xl font-semibold">{value}</h3>
            </div>
        </div>
    );
}
