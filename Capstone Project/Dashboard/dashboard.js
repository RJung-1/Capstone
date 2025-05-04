import React, { useState, useEffect } from 'react';

const moodGoals = {
  Happy: "Celebrate your day by sharing joy with someone else.",
  Okay: "Take a short walk or do something relaxing.",
  Stressed: "Take 10 minutes to breathe and unplug from tech.",
  Sad: "Reach out to a friend or write down your thoughts.",
};

export default function Dashboard() {
  const [mood, setMood] = useState('Happy');
  const [reflection, setReflection] = useState('');
  const [goal, setGoal] = useState(moodGoals['Happy']);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moodEntries')) || [];
    setEntries(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    setGoal(moodGoals[mood]);
  }, [mood]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      mood,
      reflection,
      goal,
      date: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    setReflection('');
    setGoal(moodGoals[mood]);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>🌤️ Daily Check-In</h2>
      <form onSubmit={handleSubmit}>
        <label>How are you feeling today?</label><br />
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option>Happy</option>
          <option>Okay</option>
          <option>Stressed</option>
          <option>Sad</option>
        </select><br /><br />

        <label>Reflection:</label><br />
        <textarea
          required
          rows="3"
          cols="50"
          placeholder="Write your thoughts..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        ></textarea><br /><br />

        <label>Goal for today:</label><br />
        <textarea
          rows="2"
          cols="50"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        ></textarea><br /><br />

        <button type="submit">Save Entry</button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <h2>📊 Mood History</h2>
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          <ul>
            {entries.map((entry, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <strong>{entry.date}</strong><br />
                Mood: {entry.mood}<br />
                Reflection: {entry.reflection}<br />
                Goal: {entry.goal || "(No goal set)"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}