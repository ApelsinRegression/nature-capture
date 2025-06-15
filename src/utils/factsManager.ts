
interface NatureFact {
  id: number;
  title: string;
  description: string;
}

export class FactsManager {
  private static facts: NatureFact[] = [
    {
      id: 1,
      title: "Mental Health Improvement",
      description: "Spending time in nature reduces depressive symptoms and stress with moderate effect sizes; nature exposure improves quality of life and mood in adults with mental illness."
    },
    {
      id: 2,
      title: "Enhanced Cognitive Function",
      description: "Nature exposure improves cognitive functioning and brain function, and decreases blood pressure and heart rate."
    },
    {
      id: 3,
      title: "Life Satisfaction Boost",
      description: "Higher nature connectedness is associated with a 7% increase in feelings of worthwhileness, 6.4% increase in life satisfaction, and 2.5% decrease in depression."
    },
    {
      id: 4,
      title: "Stress and Anxiety Relief",
      description: "Frequent nature exposure correlates strongly with lower stress, anxiety, and depression scores."
    },
    {
      id: 5,
      title: "Immune System Enhancement",
      description: "Forest bathing trips reduce pro-inflammatory cytokines and increase anti-inflammatory cytokines, improving immune function."
    },
    {
      id: 6,
      title: "Natural Killer Cell Activity",
      description: "Exposure to nature increases natural killer (NK) cell activity, which plays a role in immune defense."
    },
    {
      id: 7,
      title: "Weekly Nature Dose",
      description: "Spending at least 120 minutes per week in nature is linked to significant health benefits including reduced stress and improved mood."
    },
    {
      id: 8,
      title: "Green Space Benefits",
      description: "Living near green spaces is associated with lower depression and burnout symptoms and higher life satisfaction."
    },
    {
      id: 9,
      title: "Pandemic Nature Connection",
      description: "Nature visits increased during the COVID-19 pandemic, with forest visits linked to lower depression and anxiety over time."
    },
    {
      id: 10,
      title: "Multiple Health Functions",
      description: "Nature exposure improves cardiovascular, metabolic, respiratory, and endocrine functions, contributing to faster healing and longer life expectancy."
    },
    {
      id: 11,
      title: "Mental Illness Symptom Reduction",
      description: "A meta-analysis found a moderate effect size for nature exposure reducing symptoms of mental illness compared to controls."
    },
    {
      id: 12,
      title: "Attention Restoration",
      description: "Nature exposure improves attention restoration and reduces mental fatigue."
    },
    {
      id: 13,
      title: "Enhanced Outdoor Exercise",
      description: "Outdoor exercise tends to be longer and more intense than indoor exercise, enhancing physical health benefits."
    },
    {
      id: 14,
      title: "Reduced Rumination",
      description: "Exposure to natural environments reduces rumination, a risk factor for depression."
    },
    {
      id: 15,
      title: "Better Sleep Quality",
      description: "Time in nature improves sleep quality by regulating circadian rhythms."
    },
    {
      id: 16,
      title: "Urban Stress Reduction",
      description: "Nature exposure is associated with a 20% reduction in self-reported stress levels in urban residents."
    },
    {
      id: 17,
      title: "Proximity Mental Health Benefits",
      description: "Green space within 50 meters of residence shows the strongest association with better mental health outcomes."
    },
    {
      id: 18,
      title: "Positive Affect Increase",
      description: "Nature connectedness correlates with a 5–7% increase in positive affect and well-being."
    },
    {
      id: 19,
      title: "Cortisol Level Reduction",
      description: "Forest environments reduce cortisol levels by up to 16%, lowering stress."
    },
    {
      id: 20,
      title: "Blood Pressure Benefits",
      description: "Spending 30 minutes walking in a park reduces blood pressure by about 4–5 mmHg."
    },
    {
      id: 21,
      title: "Heart Rate Improvement",
      description: "Nature exposure reduces heart rate by approximately 3–4 beats per minute."
    },
    {
      id: 22,
      title: "Inflammation Reduction",
      description: "Immune markers such as IL-6 and TNFα decrease after forest bathing, indicating reduced inflammation."
    },
    {
      id: 23,
      title: "Anxiety Symptom Relief",
      description: "Spending time in nature reduces anxiety symptoms by about 15–20%."
    },
    {
      id: 24,
      title: "Mood Score Enhancement",
      description: "Nature exposure improves mood scores by 10–15% in experimental studies."
    },
    {
      id: 25,
      title: "Higher Life Satisfaction",
      description: "People who spend more time outdoors report 25% higher life satisfaction."
    },
    {
      id: 26,
      title: "Burnout Prevention",
      description: "Nature exposure is linked to a 10% decrease in symptoms of burnout."
    },
    {
      id: 27,
      title: "Working Memory Boost",
      description: "Walking in nature for 20 minutes improves working memory by 20% compared to urban walks."
    },
    {
      id: 28,
      title: "Cardiovascular Disease Prevention",
      description: "Exposure to green space reduces the risk of cardiovascular disease by 10–15%."
    },
    {
      id: 29,
      title: "Children's Eye Health",
      description: "Children spending more time outdoors have a 30% lower risk of developing myopia."
    },
    {
      id: 30,
      title: "Nervous System Relaxation",
      description: "Nature exposure increases parasympathetic nervous system activity by 10%, promoting relaxation."
    },
    {
      id: 31,
      title: "Stress Response Improvement",
      description: "Time in nature reduces cortisol awakening response by 12%, indicating lower stress."
    },
    {
      id: 32,
      title: "Increased Physical Activity",
      description: "Outdoor physical activity increases daily step count by 20–30% compared to indoor activity."
    },
    {
      id: 33,
      title: "Anti-inflammatory Benefits",
      description: "Nature exposure improves immune function by increasing anti-inflammatory cytokines by 10–15%."
    },
    {
      id: 34,
      title: "Depression Risk Reduction",
      description: "Spending 2 hours per week in nature reduces the risk of depression by 30%."
    },
    {
      id: 35,
      title: "Clinical Anxiety Improvement",
      description: "Nature exposure decreases self-reported anxiety scores by 18% in clinical populations."
    },
    {
      id: 36,
      title: "Sleep Duration Enhancement",
      description: "Time in natural environments improves sleep duration by 15 minutes on average."
    },
    {
      id: 37,
      title: "Long-lasting Immune Benefits",
      description: "Forest bathing increases NK cell activity by 40%, lasting up to 30 days post-exposure."
    },
    {
      id: 38,
      title: "PTSD Symptom Relief",
      description: "Nature exposure reduces symptoms of PTSD by 20–25% in some studies."
    },
    {
      id: 39,
      title: "Creativity Enhancement",
      description: "Walking in nature improves creativity by 50% compared to urban walking."
    },
    {
      id: 40,
      title: "Inflammation Marker Reduction",
      description: "Spending time in nature reduces inflammation markers by 10–20%."
    },
    {
      id: 41,
      title: "Mortality Risk Reduction",
      description: "Nature exposure is associated with a 7% reduction in mortality risk due to cardiovascular diseases."
    },
    {
      id: 42,
      title: "Social Interaction Boost",
      description: "Time outdoors improves social interaction frequency by 15%, enhancing emotional well-being."
    },
    {
      id: 43,
      title: "Chronic Stress Relief",
      description: "Exposure to green spaces decreases cortisol levels by 15%, reducing chronic stress."
    },
    {
      id: 44,
      title: "Subjective Well-being",
      description: "Nature exposure improves subjective well-being scores by 8–12%."
    },
    {
      id: 45,
      title: "Chronic Illness Fatigue Relief",
      description: "Spending time in nature reduces fatigue by 20% in adults with chronic illness."
    },
    {
      id: 46,
      title: "Mindfulness Enhancement",
      description: "Nature-based activities increase mindfulness scores by 10–15%."
    },
    {
      id: 47,
      title: "Superior Blood Pressure Benefits",
      description: "Walking in green environments reduces systolic blood pressure by 4 mmHg more than urban walks."
    },
    {
      id: 48,
      title: "Executive Function in Aging",
      description: "Nature exposure is linked to a 10% improvement in executive functioning in older adults."
    },
    {
      id: 49,
      title: "Vaccine Response Enhancement",
      description: "Spending time in nature improves immune responses to vaccines by 15%."
    },
    {
      id: 50,
      title: "ADHD Symptom Relief",
      description: "Regular nature exposure reduces symptoms of ADHD by 15–20% in children."
    }
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
