import React from 'react';
import Quiz from './components/Quiz/Quiz';
import { questions } from './questions';

function App() {
  return (
    <div>
      <Quiz questions={questions} />
    </div>
  );
}

export default App;
