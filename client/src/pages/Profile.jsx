import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../App';
import { createUser, getUser } from '../api';
import { formatPaise } from '../lib/format';

function Profile() {
  const navigate = useNavigate();
  const { user, setUser, resetFlow } = useFlow();
  const [subscription, setSubscription] = useState(null);
  const [checkingReturning, setCheckingReturning] = useState(!!user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ username: '', name: '', age: '', weight: '', height: '' });

  // "Remember me" auto-login: if a user is already saved locally, re-fetch
  // their latest profile + active subscription from the server.
  useEffect(() => {
    if (!user) {
      setCheckingReturning(false);
      return;
    }
    let cancelled = false;
    getUser(user.username)
      .then((data) => {
        if (cancelled) return;
        setUser(data.user);
        setSubscription(data.subscription);
      })
      .catch(() => {
        if (cancelled) return;
        setUser(null); // saved user no longer exists server-side — show the form again
      })
      .finally(() => {
        if (!cancelled) setCheckingReturning(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        username: form.username.trim(),
        name: form.name.trim(),
        age: form.age ? Number(form.age) : null,
        weight: form.weight ? Number(form.weight) : null,
        height: form.height ? Number(form.height) : null,
      };
      const data = await createUser(payload);
      setUser(data.user);
      resetFlow();

      if (data.existing) {
        setSubscription(data.subscription);
      } else {
        navigate('/plan');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDifferentUsername = () => {
    setUser(null);
    setSubscription(null);
    setForm({ username: '', name: '', age: '', weight: '', height: '' });
  };

  if (checkingReturning) {
    return (
      <div className="brutal-card">
        <p className="text-gray-400">Loading your profile…</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="brutal-card">
        <div className="mb-8">
          <div className="inline-block bg-secondary px-3 py-1 border-2 border-brutal-black shadow-brutal-sm mb-4">
            <span className="text-xs font-bold uppercase tracking-wider">Welcome back</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-400">Good to see you again, @{user.username}</p>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-center py-3 px-4 bg-dark border-2 border-brutal-black">
            <span className="text-gray-400 text-sm">Age</span>
            <span className="font-medium text-white">{user.age ?? '—'}</span>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-dark border-2 border-brutal-black">
            <span className="text-gray-400 text-sm">Weight</span>
            <span className="font-medium text-white">{user.weight ? `${user.weight} kg` : '—'}</span>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-dark border-2 border-brutal-black">
            <span className="text-gray-400 text-sm">Height</span>
            <span className="font-medium text-white">{user.height ? `${user.height} cm` : '—'}</span>
          </div>

          {subscription ? (
            <div className="flex justify-between items-center py-4 px-4 bg-primary border-2 border-brutal-black shadow-brutal-lg mt-4">
              <div>
                <span className="text-brutal-black text-sm font-bold block">Active Plan</span>
                <span className="text-brutal-black/70 text-xs">{subscription.plan_name}</span>
              </div>
              <span className="text-2xl font-bold text-brutal-black">{formatPaise(subscription.final_price)}</span>
            </div>
          ) : (
            <div className="py-4 px-4 bg-dark border-2 border-dashed border-gray-600 text-center mt-4">
              <p className="text-gray-400 text-sm mb-3">No active subscription yet.</p>
              <button onClick={() => navigate('/plan')} className="btn-primary">
                Choose a Plan →
              </button>
            </div>
          )}
        </div>

        {subscription && (
          <button onClick={() => navigate('/plan')} className="btn-outline w-full mb-3">
            Change Plan
          </button>
        )}
        <button onClick={handleUseDifferentUsername} className="text-gray-500 text-sm underline w-full text-center">
          Not you? Use a different username
        </button>
      </div>
    );
  }

  return (
    <div className="brutal-card">
      <div className="mb-8">
        <div className="inline-block bg-secondary px-3 py-1 border-2 border-brutal-black shadow-brutal-sm mb-4">
          <span className="text-xs font-bold uppercase tracking-wider">Step 1 of 4</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Your Profile</h2>
        <p className="text-gray-400">Tell us a bit about yourself to get started</p>
      </div>

      {error && (
        <div className="mb-4 py-3 px-4 bg-red-900/40 border-2 border-red-500 text-red-300 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="label-brutal">
            Username <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="input-brutal"
            placeholder="johndoe"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="name" className="label-brutal">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="input-brutal"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="age" className="label-brutal">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              min="1"
              max="150"
              className="input-brutal"
              placeholder="25"
              value={form.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="weight" className="label-brutal">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              min="1"
              step="0.1"
              className="input-brutal"
              placeholder="70.5"
              value={form.weight}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="height" className="label-brutal">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              min="1"
              step="0.1"
              className="input-brutal"
              placeholder="175"
              value={form.height}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={loading} className="btn-primary w-full text-lg disabled:opacity-50">
            {loading ? 'Please wait…' : 'Continue to Plan Selection →'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
