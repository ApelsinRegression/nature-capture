interface NatureFact {
  id: number;
  description: string;
}

export class FactsManager {
  private static facts: NatureFact[] = [
    { id: 1, description: "Reduces Anxiety and Stress: Being in nature lowers anxiety levels and reduces stress and feelings of anger more effectively than indoor exercise." },
    { id: 2, description: "Improves Physical Health: Outdoor activities like walking, biking, and hiking increase physical activity, helping maintain a healthy weight and reducing risks of heart disease." },
    { id: 3, description: "Lowers Cortisol Levels: Time outdoors decreases the stress hormone cortisol, leading to lower heart rate and blood pressure." },
    { id: 4, description: "Boosts Immune System: Exposure to sunlight increases vitamin D production, essential for immune function, and phytoncides from plants enhance immune response." },
    { id: 5, description: "Enhances Mental Health: Regular access to green spaces is linked to lower depression risk, improved concentration, and better mood." },
    { id: 6, description: "Improves Sleep Quality: Natural light exposure helps regulate circadian rhythms, promoting better sleep patterns." },
    { id: 7, description: "Increases Attention Span: Nature has a restorative effect on attention and focus, even with just a few minutes of exposure." },
    { id: 8, description: "Promotes Social Connection: Outdoor activities foster social interactions, improving life satisfaction and emotional well-being." },
    { id: 9, description: "Better Eyesight in Children: Time outdoors helps prevent myopia and supports healthy eye development by encouraging focus on distant objects." },
    { id: 10, description: "Longer Life Span and Reduced Chronic Disease Risk: Living near green spaces correlates with longer life expectancy and lower mortality from chronic diseases." },
    { id: 11, description: "Children in Green Spaces Have Lower Mental Disorder Risk: A Danish study of 900,000 residents showed children living near green areas had reduced mental health issues later in life." },
    { id: 12, description: "Spending 120 Minutes Weekly Outdoors: Research suggests at least 120 minutes per week in nature is associated with significant health benefits." },
    { id: 13, description: "Nature as Therapy (Ecotherapy): Nature therapy is emerging to aid mental health and pain management by fostering connection with the natural world." },
    { id: 14, description: "Outdoor Air Quality is Better Than Indoors: Pollutants and allergens are often 2 to 5 times higher indoors than outside, making outdoor air healthier for breathing." },
    { id: 15, description: "Nature Helps Regulate Internal Clocks: Exposure to natural light aligns the body’s circadian rhythm with day-night cycles, improving sleep and alertness." },
    { id: 16, description: "Green Spaces Include Water for Enhanced Benefits: Health effects are stronger when green spaces also have water features, adding to relaxation and restoration." },
    { id: 17, description: "Outdoor Exercise Lasts Longer and Is More Intense: People tend to exercise longer and harder when outdoors compared to indoor workouts." },
    { id: 18, description: "Nature Exposure Improves Mindfulness: Being in green spaces reduces rumination and increases positive emotions, fostering mindfulness." },
    { id: 19, description: "Social Events in Nature Boost Community Bonds: Activities like picnics, hikes, or outdoor festivals enhance social connections and community well-being." },
    { id: 20, description: "Reno, Nevada, Recognized for Outdoor Lifestyle: Reno was named the happiest city partly due to its residents’ easy access to parks and outdoor activities, illustrating nature’s impact on happiness." }
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
