// components/Card.tsx
export function Card({ title, value }: { title: string, value: string }) {
    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
    )
}
