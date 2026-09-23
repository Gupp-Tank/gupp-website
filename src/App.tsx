import { useEffect, useState } from 'react'
import './index.css'

type Step = 'photo' | 'diagnose' | 'action'

function App() {
  const [dark, setDark] = useState(false)
  const [step, setStep] = useState<Step>('photo')
  const [compatibility, setCompatibility] = useState<'safe' | 'check'>('safe')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const nextStep = () => {
    setStep((current) => (current === 'photo' ? 'diagnose' : current === 'diagnose' ? 'action' : 'photo'))
  }

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="bubbles" aria-hidden="true">{Array.from({ length: 11 }, (_, i) => <i key={i} />)}</div>

      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Gupp home">
          <img src="/branding/icon.png" alt="" />
          <span>gupp<span className="brand-dot">.</span></span>
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#score">Health Score</a>
          <a href="#compatibility">Compatibility</a>
        </div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>
            <span>{dark ? '☼' : '☾'}</span>
          </button>
          <a className="nav-cta" href="#download">Get Gupp <span>↗</span></a>
        </div>
      </nav>

      <section className="hero section-pad" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> THE CALM IN YOUR TANK</div>
          <h1>Know your tank.<br /><em>Really</em> know it.</h1>
          <p className="hero-lede">Point your phone at your aquarium and get an exact answer about its health, your fish, and what to do next.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#download">Start with Gupp <span>↗</span></a>
            <a className="text-link" href="#how"><span className="play">▶</span> See how it works</a>
          </div>
          <div className="hero-trust"><span className="avatars"><b>J</b><b>M</b><b>S</b></span><span>Trusted by 12,000+ aquarists</span><span className="stars">★★★★★</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-ring ring-back" />
          <div className="hero-ring ring-front" />
          <div className="photo-frame"><img src="/aquarium-hero.png" alt="A vibrant planted freshwater aquarium" /><div className="scan-line" /><span className="scan-label">SCANNING TANK <i /></span></div>
          <div className="float-card health-mini"><span className="mini-label">TANK HEALTH</span><strong>98</strong><span className="out-of">/100</span><div className="mini-wave"><i /></div><small>Looking crystal clear</small></div>
          <div className="float-card ph-card"><span className="ph-dot" /><span>pH <strong>7.2</strong></span><small>ideal range</small></div>
          <div className="water-swoop" />
        </div>
      </section>

      <div className="ticker" aria-label="Gupp features"><span>150+ species covered</span><i /> <span>Computer vision + Gemini</span><i /> <span>Exact dosing, zero guesswork</span><i /> <span>Made for freshwater</span></div>

      <section className="manifesto section-pad"><p className="section-kicker">A BETTER WAY TO KEEP FISH</p><h2>Less <span>what if?</span><br />More <strong>look at that.</strong></h2><p className="manifesto-copy">Fishkeeping should feel like a quiet ritual, not a chemistry exam. Gupp turns the invisible into something you can see, understand, and act on.</p></section>

      <section className="how section-pad" id="how">
        <div className="section-heading"><div><p className="section-kicker">FROM PHOTO TO PEACE OF MIND</p><h2>Three steps.<br /><span>Zero spiraling.</span></h2></div><p className="side-note">No test strips. No confusing charts. Just a clear next move.</p></div>
        <div className="process">
          <div className="process-rail"><span className={step === 'photo' ? 'active' : ''}>01</span><i /><span className={step === 'diagnose' ? 'active' : ''}>02</span><i /><span className={step === 'action' ? 'active' : ''}>03</span></div>
          <div className="process-stage">
            {step === 'photo' && <div className="stage-content photo-stage"><div className="camera-window"><img src="/aquarium-hero.png" alt="Aquarium ready to scan" /><span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" /><span className="target">+</span></div><div><span className="step-number">01 / POINT</span><h3>Give Gupp a look.</h3><p>Open the camera, point at your tank, and let Gupp see what you see.</p></div></div>}
            {step === 'diagnose' && <div className="stage-content diagnose-stage"><div className="diagnose-visual"><div className="diagnose-ring"><strong>98</strong><small>HEALTH SCORE</small></div><span className="diagnose-tag tag-one">Clear water</span><span className="diagnose-tag tag-two">Fish look active</span></div><div><span className="step-number">02 / UNDERSTAND</span><h3>Get the full picture.</h3><p>Gupp reads water clarity, plant health, and fish behavior in seconds.</p></div></div>}
            {step === 'action' && <div className="stage-content action-stage"><div className="dose-ticket"><span className="ticket-label">TODAY'S ACTION</span><strong>2.4<span>ml</span></strong><p>Gupp Plant Fuel</p><div className="ticket-wave" /></div><div><span className="step-number">03 / TAKE ACTION</span><h3>Know exactly what to do.</h3><p>Exact doses and simple next steps, tailored to your tank. No guessing.</p></div></div>}
            <button className="stage-next" onClick={nextStep} aria-label="Next step">{step === 'action' ? 'Replay' : 'Next'} <span>→</span></button>
          </div>
        </div>
      </section>

      <section className="score-section" id="score"><div className="score-water" /><div className="score-copy section-pad"><p className="section-kicker light">THE NUMBER THAT CHANGES EVERYTHING</p><h2>Meet your tank's<br /><em>North Star.</em></h2><p>A single, living score that makes aquarium health feel simple. Watch it respond as your tank gets happier.</p><a className="button button-light" href="#download">See your score <span>↗</span></a></div><div className="score-orb"><div className="orb-glow" /><div className="orb-number"><strong>98</strong><span>/100</span><small>HEALTH SCORE</small></div><div className="orb-wave" /></div></section>

      <section className="compat section-pad" id="compatibility"><div className="compat-intro"><p className="section-kicker">BEFORE YOU BRING HOME A ROOMMATE</p><h2>Good vibes<br /><span>only.</span></h2><p>Gupp checks species compatibility before you buy, so your tank stays a community—not a conflict zone.</p></div><div className="compat-check"><div className="fish-row"><div className="fish fish-tetra">◒</div><span>Neon tetra</span><b>+</b><div className="fish fish-betta">◓</div><span>Betta</span></div><div className={`compat-result ${compatibility}`}><span className="result-icon">{compatibility === 'safe' ? '✓' : '?'}</span><div><strong>{compatibility === 'safe' ? 'A peaceful match' : 'Let Gupp check'}</strong><small>{compatibility === 'safe' ? 'Compatible temperaments · Similar water needs' : 'See the full compatibility picture before you decide'}</small></div></div><button className="check-button" onClick={() => setCompatibility(compatibility === 'safe' ? 'check' : 'safe')}>{compatibility === 'safe' ? 'Check another pairing' : 'Run compatibility check'} <span>→</span></button></div></section>

      <section className="proof section-pad"><div className="proof-quote"><span className="quote-mark">“</span><blockquote>Finally, an answer that doesn't make me feel like I need a degree in marine biology.</blockquote><p>— Maya R. · Gupp community</p></div><div className="proof-stats"><div><strong>12k<span>+</span></strong><small>HAPPY AQUARISTS</small></div><div><strong>150<span>+</span></strong><small>SPECIES COVERED</small></div><div><strong>4.9<span>★</span></strong><small>APP STORE RATING</small></div></div></section>

      <section className="download section-pad" id="download"><div className="download-water" /><div className="download-content"><img className="download-logo" src="/branding/icon.png" alt="Gupp" /><p className="section-kicker light">YOUR TANK HAS QUESTIONS</p><h2>Gupp has<br /><em>answers.</em></h2><p>Start keeping with confidence. Your aquarium expert is one download away.</p><div className="store-buttons"><a href="#download" className="store-button"><span className="store-icon">●</span><span><small>Download on the</small><strong>App Store</strong></span></a><a href="#download" className="store-button"><span className="store-icon">▶</span><span><small>GET IT ON</small><strong>Google Play</strong></span></a></div></div></section>

      <footer><a className="brand" href="#top"><img src="/branding/icon.png" alt="" /><span>gupp<span className="brand-dot">.</span></span></a><span>Made for the curious aquarist.</span><div><a href="#how">About</a><a href="#download">Support</a><a href="#download">Instagram</a></div></footer>
    </main>
  )
}

export default App
