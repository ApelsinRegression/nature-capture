
interface NatureFact {
  id: number;
  description: string;
}

export class FactsManager {
  private static facts: NatureFact[] = [
    { id: 1, description: "Reduces depressive symptoms and stress" },
    { id: 2, description: "Improves cognitive function" },
    { id: 3, description: "Lowers blood pressure and heart rate" },
    { id: 4, description: "7% increase in feelings of worthwhileness" },
    { id: 5, description: "6.4% increase in life satisfaction" },
    { id: 6, description: "2.5% decrease in depression" },
    { id: 7, description: "Significantly lowers stress, anxiety, and depression scores" },
    { id: 8, description: "Boosts immune function" },
    { id: 9, description: "Increases NK cell activity" },
    { id: 10, description: "120+ minutes/week = reduced stress and better mood" },
    { id: 11, description: "Living near green space = lower depression and burnout" },
    { id: 12, description: "Nature visits linked to lower anxiety and depression" },
    { id: 13, description: "Improves cardiovascular and metabolic health" },
    { id: 14, description: "Reduces mental fatigue" },
    { id: 15, description: "Longer, more intense physical activity outdoors" },
    { id: 16, description: "Reduces rumination (linked to depression)" },
    { id: 17, description: "Improves sleep quality" },
    { id: 18, description: "20% reduction in stress levels" },
    { id: 19, description: "Nearby green space = better mental health" },
    { id: 20, description: "5–7% increase in positive affect" },
    { id: 21, description: "Lowers cortisol by up to 16%" },
    { id: 22, description: "Reduces blood pressure by 4–5 mmHg" },
    { id: 23, description: "Reduces heart rate by 3–4 bpm" },
    { id: 24, description: "Decreases inflammation markers" },
    { id: 25, description: "Reduces anxiety by 15–20%" },
    { id: 26, description: "Improves mood scores by 10–15%" },
    { id: 27, description: "25% higher life satisfaction" },
    { id: 28, description: "10% decrease in burnout" },
    { id: 29, description: "20% boost in working memory" },
    { id: 30, description: "10–15% lower risk of cardiovascular disease" },
    { id: 31, description: "30% lower risk of myopia in kids" },
    { id: 32, description: "Increases relaxation response by 10%" },
    { id: 33, description: "12% lower cortisol awakening response" },
    { id: 34, description: "20–30% more daily steps outdoors" },
    { id: 35, description: "10–15% boost in anti-inflammatory response" },
    { id: 36, description: "30% lower risk of depression" },
    { id: 37, description: "18% decrease in anxiety" },
    { id: 38, description: "15 min longer sleep" },
    { id: 39, description: "40% NK cell activity increase" },
    { id: 40, description: "20–25% PTSD symptom reduction" },
    { id: 41, description: "50% boost in creativity" },
    { id: 42, description: "10–20% drop in inflammation markers" },
    { id: 43, description: "7% reduction in cardiovascular death risk" },
    { id: 44, description: "15% more frequent social interaction" },
    { id: 45, description: "15% lower cortisol" },
    { id: 46, description: "8–12% higher well-being scores" },
    { id: 47, description: "20% less fatigue in chronic illness" },
    { id: 48, description: "10–15% increase in mindfulness" },
    { id: 49, description: "4 mmHg lower systolic pressure (green vs urban)" },
    { id: 50, description: "10% improvement in executive functioning" },
    { id: 51, description: "15% better vaccine immune response" },
    { id: 52, description: "15–20% fewer ADHD symptoms in kids" }
  ];

  static getRandomFact(): NatureFact {
    const randomIndex = Math.floor(Math.random() * this.facts.length);
    return this.facts[randomIndex];
  }

  static getRandomFacts(count: number): NatureFact[] {
    const shuffled = [...this.facts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  static getAllFacts(): NatureFact[] {
    return [...this.facts];
  }

  static getFactById(id: number): NatureFact | undefined {
    return this.facts.find(fact => fact.id === id);
  }
}
