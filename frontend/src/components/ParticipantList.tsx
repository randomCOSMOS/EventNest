export default function ParticipantList({ participants }: { participants: any[] }) {
  return (
    <div className="mt-2">
      <h4 className="font-semibold mb-2">Participants</h4>
      {participants.length === 0 ? (
        <div className="text-gray-500">No participants yet.</div>
      ) : (
        <ul className="list-disc pl-5">
          {participants.map((p, i) => (
            <li key={p.id + '-' + i}>{p.name} ({p.email})</li>
          ))}
        </ul>
      )}
    </div>
  );
}
