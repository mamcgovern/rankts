export default function ProgressBar({ current, total }) {
    const pct = Math.round((current / total) * 100);
    return (
        <div className="w-full">
            <div className="text-sm mb-1">Progress: {current} / {total} ({pct}%)</div>
            <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div style={{ width: `${pct}%` }} className="h-full bg-blue-600" />
            </div>
        </div>
    );
}