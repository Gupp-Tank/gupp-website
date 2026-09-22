import './index.css'

function App() {
  return (
    <>
      <img className="logo" src="/branding/icon.png" alt="Gupp" />
      <h1>Gupp Tank</h1>
      <p>AI-powered aquarium management. The public site is coming soon.</p>
      <div className="links">
        <a href="https://docs.gupp.app" target="_blank" rel="noreferrer">
          Documentation
        </a>
        <a
          className="secondary"
          href="https://github.com/Gupp-Tank"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </>
  )
}

export default App
