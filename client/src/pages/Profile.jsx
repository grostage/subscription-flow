import { useNavigate } from "react-router-dom";

/**
 * Profile Page - Step 1/4
 *
 * TODO: Collect user information and save it for later pages:
 * - Username (required, unique)
 * - Name (required)
 * - Age (optional)
 * - Weight in kg (optional)
 * - Height in cm (optional)
 *
 * REQUIREMENTS:
 * - On submit, call POST /api/users to create/login the user
 * - Store user details so other pages can access them
 * - Navigate to /plan on success
 * - Profile data should persist across page refreshes
 *
 * HINT: How will you pass this data to other pages?
 * - Context? LocalStorage? URL params? Something else?
 */
function Profile() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/plan");
  };

  return (
    <div className="brutal-card">
      <div className="mb-8">
        <div className="inline-block bg-secondary px-3 py-1 border-2 border-brutal-black shadow-brutal-sm mb-4">
          <span className="text-xs font-bold uppercase tracking-wider">Step 1 of 4</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Your Profile</h2>
        <p className="text-gray-400">Tell us a bit about yourself to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="label-brutal">
            Username <span className="text-primary">*</span>
          </label>
          <input type="text" id="username" name="username" required className="input-brutal" placeholder="johndoe" />
        </div>

        <div>
          <label htmlFor="name" className="label-brutal">
            Full Name <span className="text-primary">*</span>
          </label>
          <input type="text" id="name" name="name" required className="input-brutal" placeholder="John Doe" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="age" className="label-brutal">Age</label>
            <input type="number" id="age" name="age" min="1" max="150" className="input-brutal" placeholder="25" />
          </div>
          <div>
            <label htmlFor="weight" className="label-brutal">Weight (kg)</label>
            <input type="number" id="weight" name="weight" min="1" step="0.1" className="input-brutal" placeholder="70.5" />
          </div>
          <div>
            <label htmlFor="height" className="label-brutal">Height (cm)</label>
            <input type="number" id="height" name="height" min="1" step="0.1" className="input-brutal" placeholder="175" />
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className="btn-primary w-full text-lg">
            Continue to Plan Selection →
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
