import { useNavigate } from 'react-router-dom';

/**
 * Summary Page - Step 4/4
 *
 * TODO: Replace the hardcoded DUMMY_ORDER below with real data:
 * - User info from your state/context/localStorage
 * - Selected plan from your state
 * - Applied coupon (if any) from your state
 * - Calculate the final price after discount
 *
 * REQUIREMENTS:
 * - On "Complete Purchase", call POST /api/subscriptions/subscribe
 * - On success, navigate to /profile with a success message
 */

const DUMMY_ORDER = {
  user: { name: 'John Doe', username: 'johndoe' },
  plan: { name: 'Pro', price: '₹2,999' },
  coupon: { code: 'WELCOME10', discount: '10%', savings: '₹300' },
  total: '₹2,699',
};

function Summary() {
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate('/profile');
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

      <div className="space-y-3 mb-8">
        {/* User */}
        <div className="flex justify-between items-center py-3 px-4 bg-dark border-2 border-brutal-black">
          <span className="text-gray-400 text-sm">User</span>
          <div className="text-right">
            <span className="font-medium text-white block">{DUMMY_ORDER.user.name}</span>
            <span className="text-gray-500 text-xs">@{DUMMY_ORDER.user.username}</span>
          </div>
        </div>

        {/* Plan */}
        <div className="flex justify-between items-center py-3 px-4 bg-dark border-2 border-brutal-black">
          <span className="text-gray-400 text-sm">Plan</span>
          <span className="font-medium text-white">{DUMMY_ORDER.plan.name}</span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center py-3 px-4 bg-dark border-2 border-brutal-black">
          <span className="text-gray-400 text-sm">Price</span>
          <span className="font-medium text-white">{DUMMY_ORDER.plan.price}</span>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center py-3 px-4 bg-primary border-2 border-brutal-black">
          <span className="text-brutal-black text-sm font-bold">
            Discount ({DUMMY_ORDER.coupon.code} · {DUMMY_ORDER.coupon.discount} off)
          </span>
          <span className="font-bold text-brutal-black">-{DUMMY_ORDER.coupon.savings}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-4 px-4 bg-secondary border-2 border-brutal-black shadow-brutal-lg">
          <span className="text-white text-sm font-bold">Total</span>
          <span className="text-2xl font-bold text-white">{DUMMY_ORDER.total}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={() => navigate('/coupon')} className="btn-outline flex-1">Back</button>
        <button onClick={handlePurchase} className="btn-primary flex-1">Complete Purchase</button>
      </div>
    </div>
  );
}

export default Summary;
