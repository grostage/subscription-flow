import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Coupon Page - Step 3/4
 *
 * TODO: Allow user to apply a coupon code (optional)
 *
 * REQUIREMENTS:
 * - Call POST /api/coupons/validate to validate the entered code
 * - Show discount info on valid coupon
 * - Show error on invalid coupon
 * - Store the validated coupon for the summary page
 * - If user refreshes on this page, they should go back to /profile
 *
 * HINT: Store the validated coupon info for the summary page
 */

const COUPONS = [
  { code: 'WELCOME10', discount: '10% OFF', description: 'For new members', remaining: 87 },
  { code: 'SUPER50',   discount: '50% OFF', description: 'Limited time deal', remaining: 3 },
];

function Coupon() {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
  };

  return (
    <div className="brutal-card">
      <div className="mb-8">
        <div className="inline-block bg-accent px-3 py-1 border-2 border-brutal-black shadow-brutal-sm mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brutal-black">Step 3 of 4</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Apply Coupon</h2>
        <p className="text-gray-400">Have a promo code? Get a discount on your subscription!</p>
      </div>

      {/* Coupon Input */}
      <div className="mb-6">
        <label htmlFor="coupon" className="label-brutal">Coupon Code</label>
        <div className="flex gap-3">
          <input
            type="text"
            id="coupon"
            value={couponCode}
            onChange={(e) => { setCouponCode(e.target.value); setApplied(false); }}
            placeholder="Enter coupon code"
            className="input-brutal flex-1 uppercase tracking-wider"
          />
          <button onClick={handleApply} className="btn-secondary px-6">Apply</button>
        </div>
      </div>

      {/* Coupon Info Cards */}
      <div className="space-y-3 mb-8">
        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Available Offers:</p>

        {COUPONS.map((c) => (
          <div key={c.code} className="flex items-center justify-between p-4 bg-dark border-2 border-brutal-black shadow-brutal-sm">
            <div className="flex items-center gap-4">
              <div className="px-3 py-2 bg-secondary border-2 border-brutal-black text-center min-w-[72px]">
                <span className="text-white font-black text-lg leading-none block">{c.discount}</span>
              </div>
              <div>
                <p className="text-white font-bold font-mono tracking-widest">{c.code}</p>
                <p className="text-gray-400 text-xs">{c.description}</p>
              </div>
            </div>

            {/* Only show remaining after Apply is clicked */}
            {applied && (
              <div className="text-right">
                <span className={`text-xl font-black block ${c.remaining <= 5 ? 'text-red-400' : 'text-primary'}`}>
                  {c.remaining}
                </span>
                <span className="text-gray-500 text-xs">uses left</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button onClick={() => navigate('/plan')} className="btn-outline flex-1">Back</button>
        <button onClick={() => navigate('/summary')} className="btn-outline flex-1">Skip</button>
        <button onClick={() => navigate('/summary')} className="btn-primary flex-1">Continue</button>
      </div>
    </div>
  );
}

export default Coupon;
