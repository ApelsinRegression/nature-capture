
import React from 'react';
import { Clock, Heart, Leaf } from 'lucide-react';

const ArticlePage: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: "The Science of Forest Bathing",
      excerpt: "Discover how spending time in forests can reduce stress hormones and boost your immune system.",
      readTime: "5 min read",
      category: "Health",
      image: "/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png",
      featured: true
    },
    {
      id: 2,
      title: "Urban Nature: Finding Green in the City",
      excerpt: "Learn how to connect with nature even in urban environments.",
      readTime: "3 min read",
      category: "Lifestyle",
      image: "/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png"
    },
    {
      id: 3,
      title: "Seasonal Wellness: Spring Awakening",
      excerpt: "How the changing seasons affect our mental health and well-being.",
      readTime: "4 min read",
      category: "Wellness",
      image: "/lovable-uploads/e735c5d5-87ac-488e-8ec4-835f6a0293cb.png"
    },
    {
      id: 4,
      title: "Walking Meditation: Steps to Mindfulness",
      excerpt: "Combine the benefits of walking with mindfulness practices.",
      readTime: "6 min read",
      category: "Mindfulness",
      image: "/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png"
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
          <h1 className="text-3xl font-nunito font-bold text-white mb-2">
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
              <button className="bg-forest-green text-white px-6 py-3 rounded-2xl font-bold hover:bg-bright-green transition-all">
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
