
import React, { useState, useEffect } from 'react';
import { Book } from 'lucide-react';
import { FactsManager } from '../utils/factsManager';

interface NatureFact {
  id: number;
  description: string;
}

const DidYouKnow: React.FC = () => {
  const [currentFact, setCurrentFact] = useState<NatureFact | null>(null);

  useEffect(() => {
    // Get a random fact on component mount
    const fact = FactsManager.getRandomFact();
    setCurrentFact(fact);
  }, []);

  const getNewFact = () => {
    const fact = FactsManager.getRandomFact();
    setCurrentFact(fact);
  };

  if (!currentFact) return null;

  return (
    <div className="duolingo-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-nunito font-bold text-bright-green flex items-center">
          <Book className="w-6 h-6 mr-2" />
          🌿 Did You Know?
        </h3>
        <button
          onClick={getNewFact}
          className="text-sm bg-yellow-accent text-bright-green rounded-full px-3 py-1 hover:bg-bright-green hover:text-white transition-colors font-bold"
        >
          New Fact
        </button>
      </div>
      
      <div className="bg-gradient-to-br from-light-green to-white rounded-2xl p-4 border-2 border-forest-green">
        <p className="text-text-dark text-sm leading-relaxed">
          {currentFact.description}
        </p>
      </div>
    </div>
  );
};

export default DidYouKnow;
