import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold mb-8">Typing Speed Test</h1>
      <Link to="/test">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-xl hover:bg-blue-700 transition">
          Start Test
        </button>
      </Link>
    </div>
  );
}

export default Home;
