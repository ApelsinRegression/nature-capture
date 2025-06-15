import React from 'react';
import { Clock } from 'lucide-react';

const ArticlePage: React.FC = () => {
  const articles = [
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
            <div 
              key={article.id} 
              className="bg-white rounded-2xl p-4 shadow-lg border-3 border-light-green hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => window.open(article.link, '_blank')}
            >
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
