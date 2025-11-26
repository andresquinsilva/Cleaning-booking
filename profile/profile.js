const API_BASE_URL = 'http://localhost:3000';

function Profile() {
  const [user, setUser] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to view your profile.');
      setLoading(false);
      return;
    }

    // TODO: 
    // 1. Call GET `${API_BASE_URL}/api/auth/me`
    // 2. Pass Authorization: Bearer <token>
    // 3. Set user, name, and email from the response

    setLoading(false);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    // implement update logic here
    // e.g., PATCH /api/users/me or similar endpoint
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
