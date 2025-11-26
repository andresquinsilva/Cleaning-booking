// home/home.js
const API_BASE_URL = 'http://localhost:3000';

function useAuth() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    window.location.href = '../login/login.html';
  };

  return { user, token, signOut };
}

function Home() {
  const { user, token, signOut } = useAuth();
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [form, setForm] = React.useState({
    address: '',
    serviceType: 'standard',
    date: '',
    timeSlot: '8-10',
  });

  // Load "my bookings"
  React.useEffect(() => {
    if (!token) return;

    const fetchBookings = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_BASE_URL}/api/bookings/mine`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to load bookings.');
          return;
        }

        setBookings(data);
      } catch (err) {
        console.error(err);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('You must be logged in to create a booking.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Could not create booking.');
        return;
      }

      setBookings((prev) => [...prev, data]);

      setForm({
        address: '',
        serviceType: 'standard',
        date: '',
        timeSlot: '8-10',
      });
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Could not delete booking.');
        return;
      }

      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <>
      <header>
        <div className="brand">
          <div className="logo-circle">CS</div>
          <div className="brand-text">
            <div>CleanSweep</div>
            <small>Home Cleaning Booking</small>
          </div>
        </div>

        <nav>
          <a href="./home.html">Home</a>

          {!user && <a href="../login/login.html">Login</a>}
          {user && <a href="../profile/profile.html">My Profile</a>}

          {user ? (
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          ) : (
            <a href="../login/login.html">Sign in</a>
          )}
        </nav>
      </header>

      <main className="main">
        {/* HERO */}
        <section className="section hero">
          <h1>
            Welcome
            {user && user.name ? `, ${user.name}` : ''} to CleanSweep
          </h1>
          <p>Book professional home cleaning in just a few clicks.</p>

          {!user && (
            <div className="cta-row">
              <a className="primary-cta" href="../login/signup.html">
                Create an account
              </a>
              <a className="secondary-cta" href="../login/login.html">
                Sign in
              </a>
            </div>
          )}
        </section>

        {error && <div className="error-msg">{error}</div>}

        {/* LOGGED-IN VIEW */}
        {user && (
          <>
            <section className="section">
              <h2>Create a new booking</h2>
              <form className="booking-form" onSubmit={handleCreateBooking}>
                <div className="field">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={form.address}
                    onChange={handleFormChange}
                    placeholder="123 Main St, Toronto"
                  />
                </div>

                <div className="field">
                  <label htmlFor="serviceType">Service Type</label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleFormChange}
                  >
                    <option value="standard">Standard clean</option>
                    <option value="deep">Deep clean</option>
                    <option value="move-out">Move-out clean</option>
                    <option value="recurring">Recurring clean</option>
                  </select>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="date">Date</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      value={form.date}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="timeSlot">Time Slot</label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={form.timeSlot}
                      onChange={handleFormChange}
                    >
                      <option value="8-10">8–10 AM</option>
                      <option value="10-12">10–12 PM</option>
                      <option value="12-2">12–2 PM</option>
                      <option value="2-4">2–4 PM</option>
                      <option value="4-6">4–6 PM</option>
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? 'Saving…' : 'Book cleaning'}
                </button>
              </form>
            </section>

            <section className="section">
              <h2>Your bookings</h2>
              {loading && bookings.length === 0 ? (
                <p>Loading bookings…</p>
              ) : bookings.length === 0 ? (
                <p>You don&apos;t have any bookings yet. Create one above.</p>
              ) : (
                <div className="booking-grid">
                  {bookings.map((b) => (
                    <article key={b._id} className="booking-card">
                      <header className="booking-header">
                        <h3>{b.serviceType} clean</h3>
                        <span className="badge badge-status">
                          {b.status || 'scheduled'}
                        </span>
                      </header>
                      <div className="booking-meta">
                        <div>
                          <strong>Date:</strong>{' '}
                          {new Date(b.date).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Time:</strong> {b.timeSlot}
                        </div>
                        <div>
                          <strong>Address:</strong> {b.address}
                        </div>
                      </div>
                      <div className="booking-actions">
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDeleteBooking(b._id)}
                        >
                          Cancel booking
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* LOGGED-OUT LANDING SECTION */}
        {!user && (
          <section className="info-section">
            <h2>Why book with CleanSweep?</h2>
            <div className="info-grid">
              <article className="info-card">
                <h3>Book in minutes</h3>
                <p>
                  Pick a date, time slot, and service. No calls or back-and-forth.
                </p>
                <ul>
                  <li>Simple online booking</li>
                  <li>Instant confirmation</li>
                  <li>Track all bookings in one place</li>
                </ul>
              </article>

              <article className="info-card">
                <h3>Trusted cleaners</h3>
                <p>
                  Professional, background-checked cleaners for your home or condo.
                </p>
                <ul>
                  <li>Standard & deep cleaning</li>
                  <li>Move-out services</li>
                  <li>Weekly & monthly visits</li>
                </ul>
              </article>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<Home />);
