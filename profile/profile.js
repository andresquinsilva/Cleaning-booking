// profile/profile.js
const API_BASE_URL = 'http://localhost:3000';

function Profile() {
  const [user, setUser] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to view your profile.');
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile data.');
        }
        return response.json();
      })
      .then((data) => {
        // backend returns { user: {...} }
        const userData = data.user || data;
        setUser(userData);
        setName(userData.name || '');
        setEmail(userData.email || '');
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Could not load profile.');
        setLoading(false);
      });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to update your profile.');
      return;
    }

    // Your backend does NOT have /api/users/me.
    // For this version, we just update localStorage and the UI.
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = {
        ...storedUser,
        name,
        email,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess('Profile updated successfully (local changes).');
    } catch (err) {
      console.error(err);
      setError('Failed to update profile.');
    }
  };

  if (loading) {
    return <p style={{ padding: '20px' }}>Loading profile…</p>;
  }

  if (error) {
    return <p style={{ padding: '20px', color: 'red' }}>{error}</p>;
  }

  return (
    <div className="page">
      <div className="card">
        <h1>My Profile</h1>
        <p className="subtitle">
          View and update your CleanSweep account details.
        </p>

        {success && (
          <p style={{ color: 'green', fontSize: '0.9rem', marginBottom: '8px' }}>
            {success}
          </p>
        )}

        <form onSubmit={handleSave}>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="actions">
            <button type="submit" className="primary">
              Save changes
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => (window.location.href = '../home/home.html')}
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Profile />);
