export default function RankingView({ ranked, onExport, onRestart }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold">Final Ranking</h2>
            <ol className="list-decimal pl-6 space-y-2">
                {ranked.map((s, i) => (
                    <li key={s.id} className="p-2 border rounded">
                        <div className="font-medium">{i + 1}. {s.title}</div>
                        <div className="text-sm text-gray-500">{s.artist}</div>
                    </li>
                ))}
            </ol>
            <div className="flex gap-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={onExport}>Export JSON</button>
                <button className="px-4 py-2 border rounded" onClick={onRestart}>Restart</button>
            </div>
        </div>
    );
}