import { useState, useEffect } from 'react';

const mockPreferences = {
  not_in_bed: true,
  time_to_sleep: false,
  put_away_phone: true,
  get_up: false
};

export default function NotificationsView() {
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setTimeout(() => {
      setPreferences(mockPreferences);
      setLoading(false);
    }, 500);
  }, []);


  const handleToggle = (type) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

 
  if (loading) {
    return (
      <div className="p-4 space-y-4 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {Object.entries(preferences).map(([type, value]) => (
        <div 
          key={type}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div>
            <h3 className="font-medium">
              {type.replace(/_/g, ' ').toUpperCase()}
            </h3>
          </div>
          
    
          <button
            onClick={() => handleToggle(type)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              value ? 'bg-black' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${
                value ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}