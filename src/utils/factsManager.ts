
interface NatureFact {
  id: number;
  title: string;
  description: string;
}

const NATURE_FACTS: NatureFact[] = [
  {
    id: 1,
    title: "Reduces Anxiety and Stress",
    description: "Being in nature lowers anxiety levels and reduces stress and feelings of anger more effectively than indoor exercise."
  },
  {
    id: 2,
    title: "Improves Physical Health",
    description: "Outdoor activities like walking, biking, and hiking increase physical activity, helping maintain a healthy weight and reducing risks of heart disease."
  },
  {
    id: 3,
    title: "Lowers Cortisol Levels",
    description: "Time outdoors decreases the stress hormone cortisol, leading to lower heart rate and blood pressure."
  },
  {
    id: 4,
    title: "Boosts Immune System",
    description: "Exposure to sunlight increases vitamin D production, essential for immune function, and phytoncides from plants enhance immune response."
  },
  {
    id: 5,
    title: "Enhances Mental Health",
    description: "Regular access to green spaces is linked to lower depression risk, improved concentration, and better mood."
  },
  {
    id: 6,
    title: "Improves Sleep Quality",
    description: "Natural light exposure helps regulate circadian rhythms, promoting better sleep patterns."
  },
  {
    id: 7,
    title: "Increases Attention Span",
    description: "Nature has a restorative effect on attention and focus, even with just a few minutes of exposure."
  },
  {
    id: 8,
    title: "Promotes Social Connection",
    description: "Outdoor activities foster social interactions, improving life satisfaction and emotional well-being."
  },
  {
    id: 9,
    title: "Better Eyesight in Children",
    description: "Time outdoors helps prevent myopia and supports healthy eye development by encouraging focus on distant objects."
  },
  {
    id: 10,
    title: "Longer Life Span and Reduced Chronic Disease Risk",
    description: "Living near green spaces correlates with longer life expectancy and lower mortality from chronic diseases."
  },
  {
    id: 11,
    title: "Children in Green Spaces Have Lower Mental Disorder Risk",
    description: "A Danish study of 900,000 residents showed children living near green areas had reduced mental health issues later in life."
  },
  {
    id: 12,
    title: "Spending 120 Minutes Weekly Outdoors",
    description: "Research suggests at least 120 minutes per week in nature is associated with significant health benefits."
  },
  {
    id: 13,
    title: "Nature as Therapy (Ecotherapy)",
    description: "Nature therapy is emerging to aid mental health and pain management by fostering connection with the natural world."
  },
  {
    id: 14,
    title: "Outdoor Air Quality is Better Than Indoors",
    description: "Pollutants and allergens are often 2 to 5 times higher indoors than outside, making outdoor air healthier for breathing."
  },
  {
    id: 15,
    title: "Nature Helps Regulate Internal Clocks",
    description: "Exposure to natural light aligns the body's circadian rhythm with day-night cycles, improving sleep and alertness."
  },
  {
    id: 16,
    title: "Green Spaces Include Water for Enhanced Benefits",
    description: "Health effects are stronger when green spaces also have water features, adding to relaxation and restoration."
  },
  {
    id: 17,
    title: "Outdoor Exercise Lasts Longer and Is More Intense",
    description: "People tend to exercise longer and harder when outdoors compared to indoor workouts."
  },
  {
    id: 18,
    title: "Nature Exposure Improves Mindfulness",
    description: "Being in green spaces reduces rumination and increases positive emotions, fostering mindfulness."
  },
  {
    id: 19,
    title: "Social Events in Nature Boost Community Bonds",
    description: "Activities like picnics, hikes, or outdoor festivals enhance social connections and community well-being."
  },
  {
    id: 20,
    title: "Reno, Nevada, Recognized for Outdoor Lifestyle",
    description: "Reno was named the happiest city partly due to its residents' easy access to parks and outdoor activities, illustrating nature's impact on happiness."
  }
];

export class FactsManager {
  static getRandomFact(): NatureFact {
    const randomIndex = Math.floor(Math.random() * NATURE_FACTS.length);
    return NATURE_FACTS[randomIndex];
  }

  static getAllFacts(): NatureFact[] {
    return NATURE_FACTS;
  }

  static getFactById(id: number): NatureFact | undefined {
    return NATURE_FACTS.find(fact => fact.id === id);
  }
}
