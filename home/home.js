function Home() {
  return (
    <>
      <header style={{ padding: '10px 16px', background: '#111827', color: '#fff' }}>
        <h1 style={{ margin: 0 }}>CleanSweep Booking</h1>
      </header>

      <main style={{ maxWidth: '900px', margin: '20px auto', padding: '0 12px' }}>
        <section>
          <h2>Welcome to CleanSweep</h2>
          <p>
            If you can see this text, React is working correctly on the Home page.
          </p>
          <p>
            Next step: we&apos;ll hook this page up to your backend API and show real bookings.
          </p>
          <p>
            <a href="../login/login.html">Go to Login page</a>
          </p>
        </section>
      </main>
    </>
  );
}

// Mount React app
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<Home />);
