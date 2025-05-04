import React from 'react';
import './App.css';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <h1 style={{ padding: '1rem' }}>🧠 MindCare Companion</h1>
      <Dashboard />
    </div>
  );
}


function App() {
  const [mood, setMood] = useState('Happy');
  const [reflection, setReflection] = useState('');
  const [entries, setEntries] = useState([]);

  // Load existing entries from local storage on load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moodEntries')) || [];
    setEntries(saved);
  }, []);

  // Save to local storage whenever entries update
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      mood,
      reflection,
      date: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    setReflection('');
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
      <h1>🧠 MindCare Companion</h1>
      <p>Your mental wellness assistant, here to help you track, reflect, and grow.</p>

      <div style={{ marginTop: '2rem' }}>
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
            rows="4"
            cols="50"
            placeholder="Write your thoughts..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          ></textarea><br /><br />

          <button type="submit">Save Entry</button>
        </form>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>📊 Mood History</h2>
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>
                <strong>{entry.date}:</strong> {entry.mood} – {entry.reflection}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;