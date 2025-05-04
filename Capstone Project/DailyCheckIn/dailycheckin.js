import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function DailyCheckIn() {
  const [energy, setEnergy] = useState(5);
  const [stress, setStress] = useState(5);

  const handleSubmit = async () => {
    await addDoc(collection(db, 'checkins'), {
      energy,
      stress,
      timestamp: new Date(),
    });
    alert('Check-in complete!');
  };

  return (
    <div className="mt-4">
      <h2>Daily Check-In</h2>
      <label>Energy: {energy}</label>
      <input type="range" min="1" max="10" value={energy} onChange={(e) => setEnergy(e.target.value)} />
      <br />
      <label>Stress: {stress}</label>
      <input type="range" min="1" max="10" value={stress} onChange={(e) => setStress(e.target.value)} />
      <br />
      <button onClick={handleSubmit} className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Submit</button>
    </div>
  );
}