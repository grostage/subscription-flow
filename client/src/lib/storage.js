// Only the logged-in user is persisted across a hard refresh — this is what
// simulates the "remember me" auto-login flow described in the spec.
// Selected plan / applied coupon are intentionally kept in memory only
// (see FlowContext in App.jsx) so a refresh mid-flow bounces back to /profile.
const USER_KEY = 'eazygym_user';

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}
