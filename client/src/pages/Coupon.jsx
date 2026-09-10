import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../App';
import { validateCoupon } from '../api';

function Coupon() {
  const navigate = useNavigate();
  const { user, plan, coupon, setCoupon } = useFlow();
  const [code, setCode] = useState(coupon?.code ?? '');
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    // No user/plan in memory (e.g. hard refresh on this step) — bounce back to /profile.
    if (!user || !plan) {
      navigate('/profile', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApply = async () => {
    if (!code.trim()) return;
    setApplying(true);
    setError('');
    try {
      const data = await validateCoupon(code.trim());
      setCoupon(data);
    } catch (err) {
      setCoupon(null);
      setError(err.response?.data?.error || 'Could not validate coupon.');
    } finally {
      setApplying(false);
    }
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCoupon(null);
    setError('');
  };

  const handleSkip = () => {
    setCoupon(null);
    navigate('/summary');
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
            value={code}
            onChange={handleChange}
            placeholder="Enter coupon code"
            className="input-brutal flex-1 uppercase tracking-wider"
          />
          <button onClick={handleApply} disabled={applying || !code.trim()} className="btn-secondary px-6 disabled:opacity-50">
            {applying ? 'Applying…' : 'Apply'}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      {/* Applied coupon result */}
      {coupon?.valid && (
        <div className="flex items-center justify-between p-4 bg-dark border-2 border-brutal-black shadow-brutal-sm mb-8">
          <div className="flex items-center gap-4">
            <div className="px-3 py-2 bg-secondary border-2 border-brutal-black text-center min-w-[72px]">
              <span className="text-white font-black text-lg leading-none block">{coupon.discountPercent}% OFF</span>
            </div>
            <div>
              <p className="text-white font-bold font-mono tracking-widest">{coupon.code}</p>
              <p className="text-gray-400 text-xs">Applied to your order</p>
            </div>
          </div>

          <div className="text-right">
            <span className={`text-xl font-black block ${coupon.remainingUses <= 5 ? 'text-red-400' : 'text-primary'}`}>
              {coupon.remainingUses}
            </span>
            <span className="text-gray-500 text-xs">uses left</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4">
        <button onClick={() => navigate('/plan')} className="btn-outline flex-1">Back</button>
        <button onClick={handleSkip} className="btn-outline flex-1">Skip</button>
        <button onClick={() => navigate('/summary')} className="btn-primary flex-1">Continue</button>
      </div>
    </div>
  );
}

export default Coupon;
