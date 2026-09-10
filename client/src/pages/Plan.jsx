import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Plan Page - Step 2/4
 *
 * TODO: Allow user to select a gym subscription plan
 *
 * REQUIREMENTS:
 * - Fetch plans from GET /api/plans and display them
 * - Allow user to select a plan
 * - A plan must be selected to continue
 * - Store the selected plan for the summary page
 * - If user refreshes on this page, they should go back to /profile
 *
 * HINT: How will you store the selected plan for later pages?
 */

const PLANS = [
  {
    id: 1,
    name: 'Basic',
    price: '₹1,499',
    description: 'Gym Access',
    features: [
      'Full gym access (6 AM - 10 PM)',
      'All equipment & machines',
      'Locker room & showers',
      'Free WiFi',
    ],
  },
  {
    id: 2,
    name: 'Pro',
    price: '₹2,999',
    description: 'with Personal Trainer',
    features: [
      'Everything in Basic',
      'Personal trainer (2 sessions/week)',
      'Diet & nutrition consultation',
      'Priority slot booking',
    ],
  },
];

function Plan() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="brutal-card">
      <div className="mb-8">
        <div className="inline-block bg-primary px-3 py-1 border-2 border-brutal-black shadow-brutal-sm mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brutal-black">Step 2 of 4</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h2>
        <p className="text-gray-400">Select the gym membership that fits your fitness goals</p>
      </div>

      <div className="space-y-6 mb-8">
        {PLANS.map((plan) => {
          const isSelected = selectedId === plan.id;
          return (
          <div
            key={plan.id}
            onClick={() => setSelectedId(plan.id)}
            className={`relative p-6 border-2 border-brutal-black cursor-pointer transition-all duration-150
              ${isSelected
                ? 'bg-primary shadow-brutal translate-x-0.5 translate-y-0.5'
                : 'bg-dark-lighter shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5'
              }`}
          >
            {plan.id === 2 && (
              <div className={`absolute -top-3 -left-3 px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 border-brutal-black shadow-brutal-sm ${isSelected ? 'bg-accent text-brutal-black' : 'bg-secondary text-white'}`}>
                Popular
              </div>
            )}

            {/* Selection checkbox */}
            <div className={`absolute top-4 right-4 w-6 h-6 border-2 border-brutal-black flex items-center justify-center transition-colors duration-150
              ${isSelected ? 'bg-brutal-black' : 'bg-transparent'}`}>
              {isSelected && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-2xl font-bold ${isSelected ? 'text-brutal-black' : 'text-white'}`}>{plan.name}</h3>
                <p className={`text-sm ${isSelected ? 'text-brutal-black/70' : 'text-gray-400'}`}>{plan.description}</p>
              </div>
              <div className="text-right pr-10">
                <span className={`text-3xl font-bold ${isSelected ? 'text-brutal-black' : 'text-primary'}`}>{plan.price}</span>
                <span className={`text-sm block ${isSelected ? 'text-brutal-black/70' : 'text-gray-400'}`}>/month</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-brutal-black/20">
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
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
        <button onClick={() => navigate('/coupon')} className="btn-primary flex-1">Continue</button>
      </div>
    </div>
  );
}

export default Plan;
