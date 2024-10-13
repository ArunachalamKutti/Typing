import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

function Leaderboard() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const q = query(collection(db, 'results'), orderBy('wpm', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const resultsData = [];
      querySnapshot.forEach((doc) => {
        resultsData.push(doc.data());
      });
      setResults(resultsData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-4xl font-bold text-center mb-8">Leaderboard</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Rank</th>
            <th className="py-2">User</th>
            <th className="py-2">WPM</th>
            <th className="py-2">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{result.userId}</td>
              <td className="py-2">{result.wpm}</td>
              <td className="py-2">{result.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
