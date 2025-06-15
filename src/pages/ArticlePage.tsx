
import React from 'react';
import { Clock } from 'lucide-react';

const ArticlePage: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: "The Science of Forest Bathing",
      excerpt: "Discover how spending time in forests can reduce stress hormones and boost your immune system.",
      readTime: "5 min read",
      category: "Health",
      image: "/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png",
      featured: false,
      link: "https://www.nationalgeographic.com/travel/article/forest-bathing-japan-health-benefits"
    },
    {
      id: 2,
      title: "Urban Nature: Finding Green in the City",
      excerpt: "Learn how to connect with nature even in urban environments.",
      readTime: "3 min read",
      category: "Lifestyle",
      image: "/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png",
      link: "https://www.unicef.org/parenting/childrens-mental-health/how-nature-can-help-childrens-mental-health"
    },
    {
      id: 3,
      title: "Seasonal Wellness: Spring Awakening",
      excerpt: "How the changing seasons affect our mental health and well-being.",
      readTime: "4 min read",
      category: "Wellness",
      image: "/lovable-uploads/e735c5d5-87ac-488e-8ec4-835f6a0293cb.png",
      link: "https://www.mentalhealth.org.uk/our-work/research/nature-how-connecting-nature-benefits-our-mental-health"
    },
    {
      id: 4,
      title: "Walking Meditation: Steps to Mindfulness",
      excerpt: "Combine the benefits of walking with mindfulness practices.",
      readTime: "6 min read",
      category: "Mindfulness",
      image: "/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png",
      link: "https://www.psychologytoday.com/us/blog/the-athletes-way/201909/green-exercise-how-nature-walks-improve-mental-health"
    },
    {
      id: 5,
      title: "A lower connection to nature is related to lower mental health",
      excerpt: "Explores how a stronger connection to nature reduces stress and anxiety and improves well-being.",
      readTime: "6 min read",
      category: "Mental Health",
      image: "/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png",
      featured: true,
      link: "https://www.nature.com/articles/s41598-024-56968-5"
    },
    {
      id: 6,
      title: "Nature: How connecting with nature benefits our mental health",
      excerpt: "Mental Health Foundation overview of how nature connection boosts happiness and life satisfaction.",
      readTime: "5 min read",
      category: "Wellness",
      image: "/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png",
      link: "https://www.mentalhealth.org.uk/our-work/research/nature-how-connecting-nature-benefits-our-mental-health"
    },
    {
      id: 7,
      title: "Associations between Nature Exposure and Health: A Review",
      excerpt: "Narrative review summarizing evidence on cognitive, mental, and physical health benefits of nature exposure.",
      readTime: "8 min read",
      category: "Science",
      image: "/lovable-uploads/e735c5d5-87ac-488e-8ec4-835f6a0293cb.png",
      link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8125471/"
    },
    {
        id: 8,
        title: "Nature's impact on human health and wellbeing: the scale matters",
        excerpt: "Discusses how different scales of nature contact influence health outcomes.",
        readTime: "7 min read",
        category: "Research",
        image: "/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png",
        link: "https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1563340/full"
    },
    {
        id: 9,
        title: "3 ways getting outside into nature helps improve your health",
        excerpt: "Simple explanations on how nature improves mental and physical wellness.",
        readTime: "4 min read",
        category: "Health",
        image: "/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png",
        link: "https://health.ucdavis.edu/blog/cultivating-health/3-ways-getting-outside-into-nature-helps-improve-your-health/2023/05"
    },
    {
        id: 10,
        title: "Ecopsychology: How Immersion in Nature Benefits Your Health",
        excerpt: "Yale Environment 360 article on nature reducing stress and improving mood.",
        readTime: "6 min read",
        category: "Psychology",
        image: "/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png",
        link: "https://e360.yale.edu/features/ecopsychology-how-immersion-in-nature-benefits-your-health"
    },
    {
        id: 11,
        title: "Spending at least 120 minutes a week in nature is associated with good health and well-being",
        excerpt: "Study showing 2+ hours weekly in nature improves health and well-being.",
        readTime: "5 min read",
        category: "Well-being",
        image: "/lovable-uploads/e735c5d5-87ac-488e-8ec4-835f6a0293cb.png",
        link: "https://www.nature.com/articles/s41598-019-44097-3"
    },
    {
        id: 12,
        title: "Nurtured by nature",
        excerpt: "American Psychological Association overview of nature connectedness and mental health benefits.",
        readTime: "4 min read",
        category: "Psychology",
        image: "/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png",
        link: "https://www.apa.org/monitor/2020/04/nurtured-nature"
    },
    {
        id: 13,
        title: "How Nature Can Improve Your Mental Health",
        excerpt: "Harvard Health Publishing article on nature’s role in reducing anxiety and depression.",
        readTime: "5 min read",
        category: "Mental Health",
        image: "/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png",
        link: "https://www.health.harvard.edu/blog/how-nature-can-improve-your-mental-health-2020063019933"
    },
    {
        id: 14,
        title: "The Science of Nature and Mental Health",
        excerpt: "Scientific American article explaining mechanisms behind nature’s mental health benefits.",
        readTime: "7 min read",
        category: "Science",
        image: "/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png",
        link: "https://www.scientificamerican.com/article/the-science-of-nature-and-mental-health/"
    },
    {
        id: 15,
        title: "Why Spending Time Outdoors Is Good for Your Brain",
        excerpt: "National Geographic article on cognitive and emotional benefits of nature walks.",
        readTime: "6 min read",
        category: "Cognitive Science",
        image: "/lovable-uploads/e735c5d5-87ac-488e-8ec4-835f6a0293cb.png",
        link: "https://www.nationalgeographic.com/science/article/why-spending-time-outdoors-is-good-for-your-brain"
    },
    {
        id: 16,
        title: "Nature and Mental Health: An Ecosystem Service Perspective",
        excerpt: "Frontiers in Psychology article on how nature exposure supports mental well-being.",
        readTime: "8 min read",
        category: "Psychology",
        image: "/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png",
        link: "https://www.frontiersin.org/articles/10.3389/fpsyg.2019.02772/full"
    },
    {
        id: 17,
        title: "How Nature Can Help Us Heal",
        excerpt: "NPR story on forest therapy and nature’s healing power.",
        readTime: "4 min read",
        category: "Healing",
        image: "/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png",
        link: "https://www.npr.org/sections/health-shots/2019/10/02/765969992/how-nature-can-help-us-heal"
    },
    {
        id: 18,
        title: "The Benefits of Being Outdoors",
        excerpt: "Mayo Clinic overview of physical and mental benefits from outdoor activity.",
        readTime: "3 min read",
        category: "Health",
        image: "/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png",
        link: "https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/nature/art-20048397"
    },
    {
        id: 19,
        title: "Nature as Medicine: How Spending Time Outdoors Boosts Health",
        excerpt: "TIME magazine article summarizing recent research.",
        readTime: "5 min read",
        category: "Research",
        image: "/lovable-uploads/e735c5d5-87ac-488e-8ec4-835f6a0293cb.png",
        link: "https://time.com/5939939/nature-health-benefits/"
    },
    {
        id: 20,
        title: "Why We Need Nature for Mental Health",
        excerpt: "The Guardian article on nature’s role in reducing anxiety and depression.",
        readTime: "6 min read",
        category: "Mental Health",
        image: "/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png",
        link: "https://www.theguardian.com/society/2020/mar/12/why-we-need-nature-for-mental-health"
    },
    {
        id: 21,
        title: "How Nature Can Help You Sleep Better",
        excerpt: "National Sleep Foundation article on natural light and sleep regulation.",
        readTime: "4 min read",
        category: "Sleep",
        image: "/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png",
        link: "https://www.sleepfoundation.org/sleep-hygiene/how-nature-can-help-you-sleep-better"
    },
    {
        id: 22,
        title: "Green Exercise: How Nature Walks Improve Mental Health",
        excerpt: "Psychology Today article on exercise in natural settings.",
        readTime: "5 min read",
        category: "Exercise",
        image: "/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png",
        link: "https://www.psychologytoday.com/us/blog/the-athletes-way/201909/green-exercise-how-nature-walks-improve-mental-health"
    },
    {
        id: 23,
        title: "The Healing Power of Nature",
        excerpt: "TED Ideas article on how nature exposure reduces stress and improves health.",
        readTime: "5 min read",
        category: "Healing",
        image: "/lovable-uploads/e735c5d5-87ac-488e-8ec4-835f6a0293cb.png",
        link: "https://ideas.ted.com/the-healing-power-of-nature/"
    },
    {
        id: 24,
        title: "How Spending Time in Nature Can Boost Your Immune System",
        excerpt: "Cleveland Clinic article explaining immune benefits.",
        readTime: "4 min read",
        category: "Health",
        image: "/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png",
        link: "https://health.clevelandclinic.org/how-spending-time-in-nature-can-boost-your-immune-system/"
    },
    {
        id: 25,
        title: "Nature Therapy: The Science Behind Forest Bathing",
        excerpt: "National Geographic article on Japanese forest bathing and health.",
        readTime: "6 min read",
        category: "Therapy",
        image: "/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png",
        link: "https://www.nationalgeographic.com/travel/article/forest-bathing-japan-health-benefits"
    },
    {
        id: 26,
        title: "Why Nature Is Good for Your Mental Health",
        excerpt: "BBC Future article on science behind nature’s mental health effects.",
        readTime: "7 min read",
        category: "Mental Health",
        image: "/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png",
        link: "https://www.bbc.com/future/article/20211012-why-nature-is-good-for-your-mental-health"
    },
    {
        id: 27,
        title: "How Nature Can Help Children’s Mental Health",
        excerpt: "UNICEF article on benefits of green space for kids.",
        readTime: "5 min read",
        category: "Children",
        image: "/lovable-uploads/e735c5d5-87ac-488e-8ec4-835f6a0293cb.png",
        link: "https://www.unicef.org/parenting/childrens-mental-health/how-nature-can-help-childrens-mental-health"
    },
    {
        id: 28,
        title: "The Psychological Benefits of Nature: Research and Practice",
        excerpt: "Psychology Today overview of nature’s impact on well-being.",
        readTime: "6 min read",
        category: "Psychology",
        image: "/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png",
        link: "https://www.psychologytoday.com/us/blog/urban-survival/201905/the-psychological-benefits-nature-research-and-practice"
    },
    {
        id: 29,
        title: "How Being Outdoors Can Help You Feel Happier",
        excerpt: "Greater Good Magazine article on nature and happiness.",
        readTime: "4 min read",
        category: "Happiness",
        image: "/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png",
        link: "https://greatergood.berkeley.edu/article/item/how_being_outdoors_can_help_you_feel_happier"
    }
  ];

  const tips = [
    { icon: "🌱", text: "Start with just 10 minutes outside daily" },
    { icon: "🌳", text: "Trees release chemicals that boost immunity" },
    { icon: "☀️", text: "Morning sunlight helps regulate sleep cycles" },
    { icon: "🦋", text: "Nature sounds reduce cortisol levels" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-b-3xl mb-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png" 
              alt="Leaf" 
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-2xl font-nunito font-black text-white mb-2">
            📚 Nature Wisdom
          </h1>
          <p className="text-light-green">Discover the science behind nature's healing power</p>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
          <h2 className="text-xl font-nunito font-bold text-bright-green mb-4 text-center">
            🌟 Daily Nature Tips
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {tips.map((tip, index) => (
              <div key={index} className="bg-light-green rounded-2xl p-3 text-center">
                <div className="text-2xl mb-2">{tip.icon}</div>
                <p className="text-xs font-semibold text-bright-green">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {articles.filter(article => article.featured).map(article => (
        <div key={article.id} className="px-6 mb-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-forest-green">
            <div className="relative h-48">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-forest-green text-white px-3 py-1 rounded-full text-sm font-bold">
                ⭐ Featured
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-3">
                <span className="bg-yellow-accent text-bright-green px-3 py-1 rounded-full text-sm font-bold">
                  {article.category}
                </span>
                <div className="flex items-center text-text-dark">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{article.readTime}</span>
                </div>
              </div>
              <h3 className="text-xl font-nunito font-bold text-bright-green mb-2">
                {article.title}
              </h3>
              <p className="text-text-dark mb-4">{article.excerpt}</p>
              <button 
                onClick={() => window.open(article.link, '_blank')}
                className="bg-forest-green text-white px-6 py-3 rounded-2xl font-bold hover:bg-bright-green transition-all"
              >
                Read More 📖
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Article List */}
      <div className="px-6">
        <h2 className="text-2xl font-nunito font-bold text-bright-green mb-4">
          More Articles
        </h2>
        <div className="space-y-4">
          {articles.filter(article => !article.featured).map(article => (
            <div key={article.id} className="bg-white rounded-2xl p-4 shadow-lg border-3 border-light-green">
              <div className="flex space-x-4">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-light-green text-bright-green px-2 py-1 rounded-full text-xs font-bold">
                      {article.category}
                    </span>
                    <div className="flex items-center text-text-dark">
                      <Clock className="w-3 h-3 mr-1" />
                      <span className="text-xs">{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-bright-green mb-1 text-sm">
                    {article.title}
                  </h3>
                  <p className="text-text-dark text-xs">{article.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
