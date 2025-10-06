export default function SongCard({ song, onClick, label }) {
    return (
        <button
            className="border rounded-lg p-4 w-64 h-40 flex flex-col items-start justify-between hover:shadow-md transition"
            onClick={onClick}
        >
            <div>
                <div className="text-sm text-gray-500">{song.artist}</div>
                <div className="text-lg font-semibold">{song.title}</div>
            </div>
            <div className="text-xs text-gray-400">{label}</div>
        </button>
    );
}