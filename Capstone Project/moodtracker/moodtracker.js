import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function MoodTracker() {
  const [mood, setMood] = useState('');

  const logMood = async () => {
    await addDoc(collection(db, 'moods'), {
      mood,
      timestamp: new Date(),
    });
    alert('Mood logged!');
  };

  return (
    <div>
      <h2>How are you feeling?</h2>
      <select onChange={(e) => setMood(e.target.value)} className="border p-2">
        <option value="">Select</option>
        <option value="happy">😊 Happy</option>
        <option value="sad">😢 Sad</option>
        <option value="neutral">😐 Neutral</option>
      </select>
      <button onClick={logMood} className="ml-2 bg-green-500 text-white px-4 py-1 rounded">Submit</button>
    </div>
  );
}