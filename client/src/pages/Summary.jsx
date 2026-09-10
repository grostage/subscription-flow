import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../App';
import { subscribe } from '../api';
import { formatPaise } from '../lib/format';

function Summary() {
  const navigate = useNavigate();
  const { user, plan, coupon, resetFlow } = useFlow();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // No user/plan in memory (e.g. hard refresh on this step) — bounce back to /profile.
    if (!user || !plan) {
      navigate('/profile', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user || !plan) return null;

  const discountPercent = coupon?.valid ? coupon.discountPercent : 0;
  const finalPrice = Math.round((plan.price * (100 - discountPercent)) / 100);
  const savings = plan.price - finalPrice;

  const handlePurchase = async () => {
    setSubmitting(true);
    setError('');
    try {
      await subscribe({
        userId: user.id,
        planId: plan.id,
        couponCode: coupon?.valid ? coupon.code : undefined,
      });
      resetFlow();
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Could not complete purchase. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="brutal-card">
      <div className="mb-8">
        <div className="inline-block bg-secondary px-3 py-1 border-2 border-brutal-black shadow-brutal-sm mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-white">Step 4 of 4</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Order Summary</h2>
        <p className="text-gray-400">Review your order before completing</p>
      </div>

      {error && (
        <div className="mb-4 py-3 px-4 bg-red-900/40 border-2 border-red-500 text-red-300 text-sm">{error}</div>
      )}

      <div className="space-y-3 mb-8">
        {/* User */}
        <div className="flex justify-between items-center py-3 px-4 bg-dark border-2 border-brutal-black">
          <span className="text-gray-400 text-sm">User</span>
          <div className="text-right">
            <span className="font-medium text-white block">{user.name}</span>
            <span className="text-gray-500 text-xs">@{user.username}</span>
          </div>
        </div>

        {/* Plan */}
        <div className="flex justify-between items-center py-3 px-4 bg-dark border-2 border-brutal-black">
          <span className="text-gray-400 text-sm">Plan</span>
          <span className="font-medium text-white">{plan.name}</span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center py-3 px-4 bg-dark border-2 border-brutal-black">
          <span className="text-gray-400 text-sm">Price</span>
          <span className="font-medium text-white">{formatPaise(plan.price)}</span>
        </div>

        {/* Discount */}
        {coupon?.valid && (
          <div className="flex justify-between items-center py-3 px-4 bg-primary border-2 border-brutal-black">
            <span className="text-brutal-black text-sm font-bold">
              Discount ({coupon.code} · {coupon.discountPercent}% off)
            </span>
            <span className="font-bold text-brutal-black">-{formatPaise(savings)}</span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center py-4 px-4 bg-secondary border-2 border-brutal-black shadow-brutal-lg">
          <span className="text-white text-sm font-bold">Total</span>
          <span className="text-2xl font-bold text-white">{formatPaise(finalPrice)}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={() => navigate('/coupon')} className="btn-outline flex-1">Back</button>
        <button onClick={handlePurchase} disabled={submitting} className="btn-primary flex-1 disabled:opacity-50">
          {submitting ? 'Processing…' : 'Complete Purchase'}
        </button>
      </div>
    </div>
  );
}

export default Summary;
