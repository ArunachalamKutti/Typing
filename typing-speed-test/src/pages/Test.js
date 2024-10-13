import { useNavigate } from 'react-router-dom';
import TypingTest from '../components/TypingTest';

function Test() {
  const navigate = useNavigate();

  const handleComplete = (wpm, accuracy) => {
    // Navigate to results page with state
    navigate('/results', { state: { wpm, accuracy } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <TypingTest onComplete={handleComplete} />
    </div>
  );
}

export default Test;
