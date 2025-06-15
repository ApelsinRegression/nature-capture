
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
      
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 border-4 border-green-700 shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-3 right-3 text-3xl opacity-30 text-white">✨</div>
        <div className="absolute bottom-3 left-3 text-2xl opacity-30 text-white">🌟</div>
        
        <div className="relative z-10">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-green-600 text-xl">💚</span>
            </div>
            <p className="text-white text-lg leading-relaxed font-bold font-nunito flex-1">
              {currentFact.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DidYouKnow;
