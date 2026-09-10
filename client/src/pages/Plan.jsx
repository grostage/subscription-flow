import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../App';
import { getPlans } from '../api';
import { formatPaise } from '../lib/format';

// Copy for pre-seeded plans is kept client-side since the DB only stores name/price.
const PLAN_COPY = {
  Basic: {
    description: 'Gym Access',
    features: ['Full gym access (6 AM - 10 PM)', 'All equipment & machines', 'Locker room & showers', 'Free WiFi'],
  },
  Pro: {
    description: 'with Personal Trainer',
    features: [
      'Everything in Basic',
      'Personal trainer (2 sessions/week)',
      'Diet & nutrition consultation',
      'Priority slot booking',
    ],
  },
};

function Plan() {
  const navigate = useNavigate();
  const { user, plan, setPlan } = useFlow();
  const [plans, setPlans] = useState([]);
  const [selectedId, setSelectedId] = useState(plan?.id ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // No user in memory (e.g. hard refresh on this step) — bounce back to /profile.
    if (!user) {
      navigate('/profile', { replace: true });
      return;
    }
    getPlans()
      .then(setPlans)
      .catch(() => setError('Could not load plans. Please try again.'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = () => {
    const selected = plans.find((p) => p.id === selectedId);
    if (!selected) return;
    setPlan(selected);
    navigate('/coupon');
  };

  if (loading) {
    return (
      <div className="brutal-card">
        <p className="text-gray-400">Loading plans…</p>
      </div>
    );
  }

  return (
    <div className="brutal-card">
      <div className="mb-8">
        <div className="inline-block bg-primary px-3 py-1 border-2 border-brutal-black shadow-brutal-sm mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brutal-black">Step 2 of 4</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h2>
        <p className="text-gray-400">Select the gym membership that fits your fitness goals</p>
      </div>

      {error && (
        <div className="mb-4 py-3 px-4 bg-red-900/40 border-2 border-red-500 text-red-300 text-sm">{error}</div>
      )}

      <div className="space-y-6 mb-8">
        {plans.map((p) => {
          const isSelected = selectedId === p.id;
          const copy = PLAN_COPY[p.name] || { description: '', features: [] };
          return (
            <div
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`relative p-6 border-2 border-brutal-black cursor-pointer transition-all duration-150
                ${
                  isSelected
                    ? 'bg-primary shadow-brutal translate-x-0.5 translate-y-0.5'
                    : 'bg-dark-lighter shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5'
                }`}
            >
              {p.name === 'Pro' && (
                <div
                  className={`absolute -top-3 -left-3 px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 border-brutal-black shadow-brutal-sm ${
                    isSelected ? 'bg-accent text-brutal-black' : 'bg-secondary text-white'
                  }`}
                >
                  Popular
                </div>
              )}

              {/* Selection checkbox */}
              <div
                className={`absolute top-4 right-4 w-6 h-6 border-2 border-brutal-black flex items-center justify-center transition-colors duration-150
                ${isSelected ? 'bg-brutal-black' : 'bg-transparent'}`}
              >
                {isSelected && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`text-2xl font-bold ${isSelected ? 'text-brutal-black' : 'text-white'}`}>{p.name}</h3>
                  <p className={`text-sm ${isSelected ? 'text-brutal-black/70' : 'text-gray-400'}`}>{copy.description}</p>
                </div>
                <div className="text-right pr-10">
                  <span className={`text-3xl font-bold ${isSelected ? 'text-brutal-black' : 'text-primary'}`}>
                    {formatPaise(p.price)}
                  </span>
                  <span className={`text-sm block ${isSelected ? 'text-brutal-black/70' : 'text-gray-400'}`}>/month</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-brutal-black/20">
                <ul className="space-y-2">
                  {copy.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center gap-2 text-sm ${isSelected ? 'text-brutal-black' : 'text-gray-300'}`}>
                      <span className={`font-bold ${isSelected ? 'text-brutal-black' : 'text-primary'}`}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button onClick={() => navigate('/profile')} className="btn-outline flex-1">Back</button>
        <button onClick={handleContinue} disabled={!selectedId} className="btn-primary flex-1 disabled:opacity-50">
          Continue
        </button>
      </div>
    </div>
  );
}

export default Plan;
