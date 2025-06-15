
import React, { useState, useEffect } from 'react';
import { Book, Sparkles } from 'lucide-react';
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
    <div className="duolingo-card bg-gradient-to-br from-yellow-50 to-green-50 border-4 border-yellow-400 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-nunito font-bold text-bright-green flex items-center">
          <Book className="w-6 h-6 mr-2 text-yellow-500" />
          🌿 Did You Know?
        </h3>
        <button
          onClick={getNewFact}
          className="text-sm bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full px-4 py-2 hover:from-yellow-500 hover:to-orange-500 transition-all transform hover:scale-105 font-bold shadow-md"
        >
          <Sparkles className="w-4 h-4 inline mr-1" />
          New Fact
        </button>
      </div>
      
      <div className="bg-gradient-to-br from-white via-yellow-50 to-green-100 rounded-2xl p-5 border-3 border-green-400 shadow-inner relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 text-2xl opacity-20">✨</div>
        <div className="absolute bottom-2 left-2 text-xl opacity-20">🌟</div>
        
        <div className="relative z-10">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-lg">💚</span>
            </div>
            <p className="text-text-dark text-base leading-relaxed font-medium flex-1">
              {currentFact.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DidYouKnow;
