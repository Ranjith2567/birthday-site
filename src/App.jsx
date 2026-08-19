import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('gift');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      {/* Background Music Element */}
      <audio ref={audioRef} src="/birthday.mp3" loop />

      {/* Global Floating Music Toggle Button */}
      {currentPage !== 'gift' && (
        <button className="music-toggle-btn" onClick={toggleMusic}>
          {isPlaying ? '🎵 Music: ON' : '🔇 Play Music'}
        </button>
      )}

      {/* PAGE 1: GIFT BOX UNBOXING */}
      {currentPage === 'gift' && (
        <div className="gift-page">
          <div className="gift-container">
            <div className="gift-box" onClick={() => { 
              setCurrentPage('award'); 
              if (audioRef.current) {
                audioRef.current.play().catch(e => console.log(e));
                setIsPlaying(true);
              }
            }}>
              <div className="gift-box-body"></div>
              <div className="gift-box-lid"></div>
              <div className="gift-ribbon"></div>
              <div className="gift-bow"></div>
            </div>
            
            <h2 className="gift-text">
              Click here... a little surprise is waiting just for you! ✨💖
            </h2>
            
            <button className="open-btn" onClick={() => { 
              setCurrentPage('award'); 
              if (audioRef.current) {
                audioRef.current.play().catch(e => console.log(e));
                setIsPlaying(true);
              }
            }}>
              Open Surprise
            </button>
          </div>
        </div>
      )}

      {/* PAGE 2: WORLD'S BEST AKKA AWARD INTRO */}
      {currentPage === 'award' && (
        <AkkaAwardIntro onNext={() => setCurrentPage('intro')} />
      )}

      {/* PAGE 3: CINEMATIC INTRO */}
      {currentPage === 'intro' && (
        <CinematicIntro onNext={() => setCurrentPage('wheel')} />
      )}

      {/* PAGE 4: WHEEL OF COUPONS */}
      {currentPage === 'wheel' && (
        <WheelOfCoupons onNext={() => setCurrentPage('jar')} />
      )}

      {/* PAGE 5: MEMORY JAR (AKKA-THAMBI) */}
      {currentPage === 'jar' && (
        <MemoryJar onNext={() => setCurrentPage('photos')} />
      )}

      {/* PAGE 6: POLAROID PHOTO WALL (10 PHOTOS) */}
      {currentPage === 'photos' && (
        <PolaroidPhotoWall onNext={() => setCurrentPage('dobLock')} />
      )}

      {/* PAGE 7: AESTHETIC MAGIC DOB LOCK */}
      {currentPage === 'dobLock' && (
        <DobLockScreen onUnlock={() => setCurrentPage('cake')} />
      )}

      {/* PAGE 8: VIRTUAL CAKE CUTTING */}
      {currentPage === 'cake' && (
        <CakeCuttingScreen onRestart={() => setCurrentPage('gift')} />
      )}
    </>
  );
}

// ==========================================
// PAGE 2: WORLD'S BEST AKKA AWARD COMPONENT
// ==========================================
function AkkaAwardIntro({ onNext }) {
  return (
    <div className="award-page">
      <div className="award-card">
        <div className="award-badge">🏆 OFFICIAL CERTIFICATE 🏆</div>
        <h1 className="award-title">World's Best Award</h1>
        <p className="award-subtitle">This prestigious award is proudly presented to</p>
        <h2 className="recipient-name">Priya💖</h2>
        <p className="award-desc">
          For being an incredible backbone, an unmatched secret-keeper, 
          and the absolute best sister in the entire universe! 
          (Even with all the endless fights! 😂)
        </p>
        
        <button className="next-page-btn" onClick={onNext}>
          Let's See Your Surprises! ➡️
        </button>
      </div>
    </div>
  );
}

// ==========================================
// PAGE 5: MEMORY JAR COMPONENT
// ==========================================
function MemoryJar({ onNext }) {
  const [currentSlip, setCurrentSlip] = useState(null);
  const [isPopped, setIsPopped] = useState(false);

  const slips = [
    "Evlo thaan sanda pottalum, unkitta ennala pesama iruka mudiyathu! My forever favourite person akka! 🫶💖",
    "Sila neram romba strict-a irunthalum, en life-la eppavume enaku periya back-bone ah irukkurathu nee thaan! 💪❤️",
    "Naan eppo life-la down aanaalum, 'Naan iruken nu sollura , paathukalam' nu nee solra antha oru vaartha pothum akka enaku! 🫂✨",
    "Sila neram amma mathiri thittuva, aana en mela irukra antha unmaiyana paasatha unna thavira intha ulagathula yaraalum thara mudiyathu! 🥺💖",
    "Naan veliya romba paasam kaatama irukkalam... aana unmaiyileye intha thambikku eppavume romba pudicha uyir nee thaan akka! 🌍🫂"
  ];

  const openJar = () => {
    setIsPopped(false);
    
    setTimeout(() => {
      const randomSlip = slips[Math.floor(Math.random() * slips.length)];
      setCurrentSlip(randomSlip);
      setIsPopped(true);
    }, 300);
  };

  return (
    <div className="jar-page">
      <div className="floating-hearts">
        <span>💖</span>
        <span>✨</span>
        <span>💕</span>
        <span>🫶</span>
        <span>✨</span>
        <span>💖</span>
        <span>💗</span>
        <span>✨</span>
      </div>

      <h2 className="jar-title">Reasons Why You're My Favourite Person 🫙 💖</h2>
      <p className="jar-subtitle">Click the jar to pull out a secret note! 👇✨</p>

      <div className="jar-container" onClick={openJar}>
        <div className={`paper-slip ${isPopped ? 'pop-up' : ''}`}>
          {currentSlip}
        </div>

        <div className="glass-jar">
          <div className="jar-lid"></div>
          <div className="jar-body">
            <div className="jar-reflection"></div>
            <div className="little-stars">✨💖✨</div>
          </div>
        </div>
      </div>

      {currentSlip && (
        <button className="next-page-btn" onClick={onNext} style={{ marginTop: '40px' }}>
          Next Surprise ➡️
        </button>
      )}
    </div>
  );
}
// ==========================================
// PAGE 6: STACKED POLAROID PHOTO WALL (FIXED)
// ==========================================
function PolaroidPhotoWall({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = [
    { id: 1, src: "/images/photo1.jpg", caption: "Our endless silly fights! 🐱🐭", rot: "-3deg" },
    { id: 2, src: "/images/photo2.jpg", caption: "Always my backbone! 💪❤️", rot: "4deg" },
    { id: 3, src: "/images/photo3.jpg", caption: "Partners in crime forever 🤫", rot: "-2deg" },
    { id: 4, src: "/images/photo4.jpg", caption: "That random trip/outing! 🌍", rot: "5deg" },
    { id: 5, src: "/images/photo5.jpg", caption: "Pure smiles & happiness 😊", rot: "-4deg" },
    { id: 6, src: "/images/photo6.jpg", caption: "Trouble-maker at home! 😂", rot: "3deg" },
    { id: 7, src: "/images/photo7.jpg", caption: "My favourite person 🫶", rot: "-5deg" },
    { id: 8, src: "/images/photo8.jpg", caption: "Unconditional love always 💖", rot: "2deg" },
    { id: 9, src: "/images/photo9.jpg", caption: "Crazy memories together ✨", rot: "-3deg" },
    { id: 10, src: "/images/photo10.jpg", caption: "Best Akka in the world! 👑💖", rot: "4deg" },
    { id: 11, src: "/images/photo11.jpg", caption: "Thank you for everything! 🫂✨", rot: "-2deg" },
    { id: 12, src: "/images/photo12.jpg", caption: "Happy Birthday Akka! 🎉🎂", rot: "0deg" }
  ];

  const handleNextPhoto = () => {
    if (currentIndex < photos.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="polaroid-page stack-layout">
      <h2 className="polaroid-title">Our Sweet Memories Wall 📸✨</h2>
      <p className="polaroid-subtitle">
        {currentIndex < photos.length 
          ? "Tap the photo to reveal the next one! 👇" 
          : "You've seen all the memories! 💖"}
      </p>

      <div className="polaroid-grid">
        {photos.map((item, index) => {
          const isSwiped = index < currentIndex;
          const isTop = index === currentIndex;
          const offset = Math.max(0, index - currentIndex);
          
          if (offset > 4) return null;

          return (
            <div 
              key={item.id}
              className={`polaroid-card ${isSwiped ? 'swiped' : ''} ${isTop ? 'top-card' : ''}`}
              onClick={isTop ? handleNextPhoto : null}
              style={{
                zIndex: photos.length - index,
                '--rot': item.rot,
                '--offset': offset,
              }}
            >
              <div className="polaroid-img-box">
                <img src={item.src} alt={`Memory ${item.id}`} onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=60";
                }} />
              </div>
              <p className="polaroid-caption">{item.caption}</p>
            </div>
          );
        })}

        {currentIndex >= photos.length && (
          <div className="stack-finish">
            <button className="next-page-btn pop-in-btn" onClick={onNext}>
              Unlock Final Surprise 🔓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
// ==========================================
// PAGE 7: AESTHETIC MAGIC DOB LOCK 
// ==========================================
function DobLockScreen({ onUnlock }) {
  const [dobInput, setDobInput] = useState('');
  const [lockState, setLockState] = useState('idle'); 
  const cardRef = useRef(null);

  const correctDob = "21-09-2003";

  const handleCheck = (e) => {
    e.preventDefault();
    if (lockState !== 'idle') return;

    setLockState('checking'); 

    setTimeout(() => {
      if (dobInput.trim() === correctDob || dobInput.trim() === "21092003") { 
        setLockState('unlocked');
        
        if(cardRef.current) {
          cardRef.current.style.pointerEvents = 'none';
        }
        
        setTimeout(() => {
          onUnlock();
        }, 2000);
      } else {
        setLockState('error');
        setTimeout(() => setLockState('idle'), 2000);
      }
    }, 1500); 
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || lockState === 'unlocked') return;
    const card = cardRef.current;
    const xAxis = (window.innerWidth / 2 - e.clientX) / 25; 
    const yAxis = (window.innerHeight / 2 - e.clientY) / 25;
    card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || lockState === 'unlocked') return;
    const card = cardRef.current;
    card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s ease';
  };

  const handleMouseEnter = () => {
    if (!cardRef.current || lockState === 'unlocked') return;
    cardRef.current.style.transition = 'none'; 
  };

  return (
    <div className="aesthetic-dob-page" 
         onMouseMove={handleMouseMove} 
         onMouseLeave={handleMouseLeave} 
         onMouseEnter={handleMouseEnter}>
         
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="magical-light-dust"></div>

      <div ref={cardRef} className={`aesthetic-dob-card ${lockState === 'error' ? 'error-shake' : ''} ${lockState === 'unlocked' ? 'card-opened' : ''}`}>
        
        <div className="aesthetic-content">
          <div className={`lock-icon-cute ${lockState === 'checking' ? 'heart-beat' : ''}`}>
            {lockState === 'unlocked' ? '🔓💖' : lockState === 'checking' ? '⏳' : '🔒✨'}
          </div>
          
          <h2 className="aesthetic-title">
            {lockState === 'unlocked' ? 'MAGIC UNLOCKED!' : 'Final Secret Lock'}
          </h2>
          <p className="aesthetic-subtitle">
            {lockState === 'unlocked' 
              ? 'Yay! Get ready for the final celebration...' 
              : 'Type the day my favourite person was born to reveal the magic! 💖'}
          </p>

          <form onSubmit={handleCheck} className="aesthetic-form">
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="DD-MM-YYYY" 
                value={dobInput}
                onChange={(e) => setDobInput(e.target.value)}
                className={`aesthetic-input ${lockState === 'error' ? 'input-error' : ''} ${lockState === 'unlocked' ? 'input-success' : ''}`}
                disabled={lockState !== 'idle'}
              />
            </div>
            
            <button 
              type="submit" 
              className={`aesthetic-btn ${lockState === 'checking' ? 'btn-checking' : ''} ${lockState === 'unlocked' ? 'btn-success' : ''}`} 
              disabled={lockState !== 'idle'}
            >
              <span className="btn-text">
                {lockState === 'idle' && 'Unlock Surprise 🌸'}
                {lockState === 'checking' && 'Checking... 👀'}
                {lockState === 'unlocked' && 'Opening... ✨'}
                {lockState === 'error' && 'Oops! Wrong 🙈'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
// ==========================================
// PAGE 8: VIRTUAL CAKE CUTTING (WITH LAYER DROP ANIMATION)
// ==========================================
function CakeCuttingScreen({ onRestart }) {
  const [step, setStep] = useState('lit'); // 'lit', 'blown', 'cut'
  const [showConfetti, setShowConfetti] = useState(false);

  const blowCandles = () => {
    setStep('blown');
    setShowConfetti(true);
  };

  const cutCake = () => {
    setStep('cut');
  };

  return (
    <div className="cake-page">
      {showConfetti && <Confetti />}

      <div className="cake-container">
        
        {/* Title drops in last, exactly above the cake! */}
        <h2 className="cake-title-dynamic">
          {step === 'lit' && "Happy Birthday 💖🎂"}
          {step === 'blown' && "Yay! Now let's cut the cake! 🎉"}
          {step === 'cut' && "Time to Celebrate! ✨"}
        </h2>

        <div className={`cake-wrapper ${step === 'cut' ? 'cake-is-cut' : ''}`}>
          
          {/* Cake Layers dropping one by one */}
          <div className="cake-bottom layer-anim"></div>
          
          <div className="cake-middle layer-anim"></div>
          
          <div className="cake-top layer-anim">
            <div className="icing"></div>
            <div className="icing-drip drip-1"></div>
            <div className="icing-drip drip-2"></div>
            <div className="icing-drip drip-3"></div>
            <div className="icing-drip drip-4"></div>
            <div className="icing-drip drip-5"></div>
          </div>
          
          {/* Candle dropping after the cake */}
          <div className="candle layer-anim">
            {step === 'lit' ? (
              <div className="flame"></div>
            ) : (
              <div className="smoke"></div>
            )}
          </div>
        </div>

        {/* Plate appears first */}
        <div className="plate plate-anim"></div>

        {/* Action Buttons appear at the very end */}
        <div className="cake-actions actions-anim">
          {step === 'lit' && (
            <button className="cake-btn blow-btn" onClick={blowCandles}>
              Blow Candles 🌬️
            </button>
          )}
          
          {step === 'blown' && (
            <button className="cake-btn cut-btn" onClick={cutCake}>
              Cut the Cake 🔪
            </button>
          )}

          {step === 'cut' && (
            <div className="final-message">
              <p className="sweet-note">Wishing you the most magical and happiest year ahead! Evlo periya aala aanalum, you're always my favourite person.🫂💖</p>
              <button className="cake-btn restart-btn" onClick={onRestart}>
                🔄 Replay Memories
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 100% CRASH-FREE & FIXED ALIGNMENT CONFETTI
// ==========================================
function Confetti() {
  const pieces = React.useMemo(() => {
    const colors = ['#ff4081', '#ffd700', '#00e676', '#00b0ff', '#ea80fc', '#ff9a9e'];
    
    return Array.from({ length: 80 }).map((_, i) => {
      const type = i % 10 === 0 ? 'balloon' : i % 6 === 0 ? 'heart' : 'paper';
      
      const style = {
        position: 'absolute', /* 🚀 ITHU THAAN FIX! */
        top: '-50px',
        left: `${Math.random() * 100}%`, /* Random width generation */
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: type === 'balloon' ? `${4 + Math.random() * 3}s` : `${3 + Math.random() * 3}s`, 
      };

      if (type === 'paper') {
        style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        style.transform = `rotate(${Math.random() * 360}deg)`;
      }

      return { id: i, type, style };
    });
  }, []); 

  return (
    <div className="confetti-container">
      {pieces.map((piece) => {
        if (piece.type === 'paper') {
          return <div key={piece.id} className="confetti-piece paper" style={piece.style} />;
        } else if (piece.type === 'heart') {
          return <div key={piece.id} className="confetti-piece heart" style={piece.style}>💖</div>;
        } else {
          return <div key={piece.id} className="confetti-piece balloon" style={piece.style}>🎈</div>;
        }
      })}
    </div>
  );
}
// ==========================================
// PAGE 4: WHEEL OF COUPONS COMPONENT
// ==========================================
function WheelOfCoupons({ onNext }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);

  const segments = [
    "Chocolate 🍫",
    "Surprise Gift 🎁",
    "Ice Cream Treat 🍦",
    "Pani Puri Date 😋",
    "Biriyani Treat 🍗",
    "Cafe Treat ☕"
  ];

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    
    const prizeIndex = Math.floor(Math.random() * segments.length);
    const segmentDegree = 360 / segments.length;
    
    const baseSpin = rotation + 1800; 
    const currentMod = baseSpin % 360;
    const targetMod = 360 - (prizeIndex * segmentDegree); 
    
    let extraSpin = targetMod - currentMod;
    if (extraSpin < 0) extraSpin += 360;
    
    const randomJitter = Math.floor(Math.random() * 30) - 15; 
    const finalRotation = baseSpin + extraSpin + randomJitter;
    
    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(segments[prizeIndex]);
    }, 5000); 
  };

  return (
    <div className="wheel-page">
      <h2 className="wheel-title">Spin the Wheel of Treats! 🎡</h2>
      
      <div className="wheel-container">
        <div className="wheel-arrow">▼</div>
        <div 
          className="wheel" 
          style={{ 
            transform: `rotate(${rotation}deg)`, 
            transition: 'transform 5s cubic-bezier(0.15, 0.9, 0.25, 1)' 
          }}
        >
          {segments.map((seg, i) => (
            <div key={i} className="wheel-segment" style={{ transform: `rotate(${i * 60}deg)` }}>
              <span className="wheel-text">{seg}</span>
            </div>
          ))}
        </div>
        <button className="spin-btn" onClick={spinWheel} disabled={spinning}>
          SPIN
        </button>
      </div>

      {result && (
        <div className="wheel-result">
          <h3>Yay! You won:</h3>
          <p className="winning-prize">{result}</p>
          <button className="next-page-btn" onClick={onNext}>
            Next Surprise ➡️
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// PAGE 3: CINEMATIC INTRO COMPONENT
// ==========================================
function CinematicIntro({ onNext }) {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const timer = setTimeout(() => {
      const F = (id) => document.getElementById(id);
      const Fe = F("tree");
      if (!Fe) return;
      const M = Fe.getContext("2d");
      const sa = F("wish");
      const wr = F("hero");
      const ii = F("eyebrow");
      const ni = F("hint");
      const Ji = F("motes");
      const ft = F("target");
      const fe = F("targetHeart");
      const Ne = ft.querySelector(".heart__glow");
      const os = F("aim");
      const rt = F("archery");
      const oa = F("bow");
      const ct = F("arrow");
      const aa = F("strL");
      const ua = F("strR");
      const as = F("serving");
      const he = F("flood");
      const lr = F("field");
      const tn = F("camera");
      const en = F("fgrid");
      const rn = F("kEyebrow");
      const nn = F("kSub");
      const Br = F("barTop");
      const Yr = F("barBot");
      const sn = F("uline").querySelector(".uline__path");
      const Le = F("bloom");
      
      const Qe = F("nextBtn"); 

      const us = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let si = 0;
      function zt(o) {}

      const C = (o, t) => o + Math.random() * (t - o);
      const ls = (o) => o[Math.random() * o.length | 0];
      const Gt = (o, t, e) => o < t ? t : o > e ? e : o;
      const qt = (o) => o < 0 ? 0 : o > 1 ? 1 : o;
      const fr = (o, t, e) => o + (t - o) * e;
      const fs = (o) => 1 - Math.pow(1 - o, 3);
      const la = (o) => 1 + 2.70158 * Math.pow(o - 1, 3) + 1.70158 * Math.pow(o - 1, 2);

      function fa(o, t) {
        const e = parseInt(o.slice(1), 16),
              r = Gt((e >> 16) + t, 0, 255),
              i = Gt((e >> 8 & 255) + t, 0, 255),
              n = Gt((e & 255) + t, 0, 255);
        return `rgb(${r | 0},${i | 0},${n | 0})`;
      }

      const br = [
        { c0: '#ffffff', c1: '#ffffff' }, 
        { c0: '#ffffff', c1: '#ffb6c1' }, 
        { c0: '#ffe1ec', c1: '#ff80aa' }, 
        { c0: '#ffd0e0', c1: '#f4577f' }, 
        { c0: '#ffffff', c1: '#ffffff' }, 
        { c0: '#ffd2e6', c1: '#e84d9a' }
      ];

      const H = { trunkStart: .1, branchSpan: 1.8, bloomT0: 1.25, bloomSpan: 2, petalT0: 2.45, noteStart: .45, done: 4.6 };
      const xt = 168;

      function Nr(o, t, e, r, i) {
        o.beginPath();
        o.moveTo(t, e + i * .28);
        o.bezierCurveTo(t, e, t - r * .5, e, t - r * .5, e + i * .28);
        o.bezierCurveTo(t - r * .5, e + i * .6, t - r * .16, e + i * .8, t, e + i);
        o.bezierCurveTo(t + r * .16, e + i * .8, t + r * .5, e + i * .6, t + r * .5, e + i * .28);
        o.bezierCurveTo(t + r * .5, e, t, e, t, e + i * .28);
        o.closePath();
      }

      function on({ c0: o, c1: t }, e) {
        const r = document.createElement("canvas");
        r.width = r.height = xt;
        const i = r.getContext("2d"),
              n = xt * .62,
              s = xt * .58,
              a = xt / 2,
              u = xt * .17;
        i.save();
        i.shadowColor = "rgba(150,38,72,0.32)";
        i.shadowBlur = xt * .085;
        i.shadowOffsetY = xt * .05;
        i.fillStyle = t;
        Nr(i, a, u, n, s);
        i.fill();
        i.restore();
        const l = i.createRadialGradient(a - n * .2, u + s * .2, s * .04, a, u + s * .42, s * .92);
        l.addColorStop(0, o);
        l.addColorStop(.55, t);
        l.addColorStop(1, fa(t, -26));
        Nr(i, a, u, n, s);
        i.fillStyle = l;
        i.fill();
        i.save();
        Nr(i, a, u, n, s);
        i.clip();
        const f = i.createLinearGradient(0, u, 0, u + s);
        f.addColorStop(0, "rgba(255,255,255,0)");
        f.addColorStop(.65, "rgba(110,16,46,0)");
        f.addColorStop(1, "rgba(110,16,46,0.26)");
        i.fillStyle = f;
        i.fillRect(0, 0, xt, xt);
        i.globalAlpha = .55;
        i.fillStyle = "#ffffff";
        i.beginPath();
        i.ellipse(a - n * .15, u + s * .24, n * .17, s * .11, -.5, 0, Math.PI * 2);
        i.fill();
        i.restore();
        if (!e) return r;
        const c = document.createElement("canvas");
        c.width = c.height = xt;
        const d = c.getContext("2d");
        return d.filter = "blur(2.6px)", d.drawImage(r, 0, 0), d.filter = "none", d.globalCompositeOperation = "source-atop", d.globalAlpha = .42, d.fillStyle = "#fff3ea", d.fillRect(0, 0, xt, xt), c;
      }

      function Xr(o) {
        const e = document.createElement("canvas");
        e.width = e.height = 128;
        const r = e.getContext("2d"),
              i = r.createRadialGradient(128 / 2, 128 / 2, 0, 128 / 2, 128 / 2, 128 / 2);
        return i.addColorStop(0, `rgba(${o},0.9)`), i.addColorStop(.45, `rgba(${o},0.22)`), i.addColorStop(1, `rgba(${o},0)`), r.fillStyle = i, r.fillRect(0, 0, 128, 128), e;
      }

      function ha() {
        const t = document.createElement("canvas");
        t.width = t.height = 64;
        const e = t.getContext("2d"),
              r = 64 / 2,
              i = e.createRadialGradient(r, r, 0, r, r, r);
        i.addColorStop(0, "rgba(255,255,255,0.95)");
        i.addColorStop(.25, "rgba(255,236,200,0.5)");
        i.addColorStop(1, "rgba(255,236,200,0)");
        e.fillStyle = i;
        e.beginPath();
        e.arc(r, r, r, 0, 6.2832);
        e.fill();
        e.fillStyle = "rgba(255,255,255,0.95)";
        e.translate(r, r);
        for (let n = 0; n < 2; n++) e.beginPath(), e.moveTo(0, -r), e.quadraticCurveTo(0, 0, r, 0), e.quadraticCurveTo(0, 0, 0, r), e.quadraticCurveTo(0, 0, -r, 0), e.quadraticCurveTo(0, 0, 0, -r), e.fill(), e.rotate(Math.PI / 4), e.scale(.5, .5);
        return t;
      }

      let oe = { crisp: [], soft: [] }, hs = [], cs = null;
      function ca() {
        oe = { crisp: br.map(o => on(o, !1)), soft: br.map(o => on(o, !0)) };
        hs = [Xr("255,255,255"), Xr("255,196,214"), Xr("255,240,245")];
        cs = ha();
      }

      function rr(o, t, e, r, i, n) {
        M.save();
        M.translate(t, e);
        i && M.rotate(i);
        M.globalAlpha = n;
        M.drawImage(o, -r * .5, -r * .47, r, r);
        M.restore();
      }

      let ds = null;
      function da() {
        const o = [];
        let t = 1e9, e = -1e9, r = 1e9, i = -1e9;
        for (let l = 0; l <= 160; l++) {
          const f = l / 160 * Math.PI * 2,
                c = 16 * Math.pow(Math.sin(f), 3),
                d = 13 * Math.cos(f) - 5 * Math.cos(2 * f) - 2 * Math.cos(3 * f) - Math.cos(4 * f);
          o.push([c, d]), c < t && (t = c), c > e && (e = c), d < r && (r = d), d > i && (i = d);
        }
        const n = (t + e) / 2, s = (r + i) / 2, a = (e - t) / 2, u = (i - r) / 2;
        ds = o.map(([l, f]) => [(l - n) / a, (f - s) / u]);
      }

      function an(o, t) {
        let e = !1;
        const r = ds;
        for (let i = 0, n = r.length - 1; i < r.length; n = i++) {
          const s = r[i][0], a = r[i][1], u = r[n][0], l = r[n][1];
          a > t != l > t && o < (u - s) * (t - a) / (l - a) + s && (e = !e);
        }
        return e;
      }

      let D = 0, R = 0, Ae = 1, Pt = 0, Lt = 0, sr = 0, lt = 0, Oi = 0, ce = [], Ct = [], Xe = [], ve = [], oi = [], ai = [], de = [], _e = null, ze = null, hr = null;
      const un = (o, t) => {
        const e = 1 - t, r = e * e, i = 2 * e * t, n = t * t;
        return { x: r * o.x1 + i * o.cx + n * o.x2, y: r * o.y1 + i * o.cy + n * o.y2 };
      };

      function _a(o, t, e, r, i) {
        const n = M.createLinearGradient(o, t, e, r);
        return n.addColorStop(0, `hsl(348 26% ${26 + i * 3}%)`), n.addColorStop(1, `hsl(346 24% ${40 + i * 5}%)`), n;
      }

      function ki() {
        ce = []; Ct = []; Xe = []; ve = []; de = []; oi = []; ai = []; da();
        const o = D / R > 1.2;
        Pt = D * (o ? .57 : .5);
        Lt = R * (o ? .37 : .38);
        lt = Math.min(R * .33, D * .34);
        sr = lt * 1.16;
        Oi = R * .93;
        _e = M.createLinearGradient(0, 0, 0, R);
        _e.addColorStop(0, "#fff3e9");
        _e.addColorStop(.46, "#ffe7d6");
        _e.addColorStop(.78, "#fcd9c4");
        _e.addColorStop(1, "#f3c4b5");
        ze = M.createRadialGradient(Pt, Lt, lt * .1, Pt, Lt, lt * 1.55);
        ze.addColorStop(0, "rgba(255,219,170,0.6)");
        ze.addColorStop(.5, "rgba(255,170,150,0.2)");
        ze.addColorStop(1, "rgba(255,170,150,0)");
        hr = M.createRadialGradient(Pt, R * 1.02, lt * .2, Pt, R * 1.02, lt * 1.6);
        hr.addColorStop(0, "rgba(255,205,165,0.5)");
        hr.addColorStop(1, "rgba(255,205,165,0)");

        for (let p = 0; p < 11; p++) oi.push({ x: C(0, D), y: C(0, R), r: C(D * .05, D * .17), vy: C(-6, -16), drift: C(-.3, .3), phase: C(0, 6.28), alpha: C(.05, .13), sprite: ls(hs) });
        const t = o ? 18 : 15;
        for (let p = 0; p < t; p++) {
          const y = Math.random();
          ai.push({ x: C(0, D), y: C(-R * .1, R * 1.1), depth: y, idx: Math.random() * br.length | 0, box: fr(Math.min(D, R) * .025, Math.min(D, R) * .075, y), vy: fr(7, 20, y), sway: C(8, 22), phase: C(0, 6.28), rot: C(-.4, .4), vrot: C(-.5, .5), baseA: fr(.16, .5, y), soft: y < .45 });
        }

        const e = Pt, r = R * 1, i = Lt + lt * .62, n = Math.max(9, D * .024), s = lt * .6, a = (p, y, v = .9) => an((p - Pt) / (sr * v), (Lt - y) / (lt * v));
        function u(p, y, v, w, x, P, b) {
          let S = p + Math.cos(v) * w, T = y + Math.sin(v) * w, O = !1;
          if (!a(S, T)) {
            let N = 0, X = 1;
            for (let et = 0; et < 12; et++) {
              const St = (N + X) / 2;
              a(p + Math.cos(v) * w * St, y + Math.sin(v) * w * St) ? N = St : X = St;
            }
            S = p + Math.cos(v) * w * N;
            T = y + Math.sin(v) * w * N;
            O = !0;
          }
          const L = (p + S) / 2, B = (y + T) / 2, E = v + Math.PI / 2, Y = C(-1, 1) * w * .12, W = x * .66;
          return ce.push({ x1: p, y1: y, cx: L + Math.cos(E) * Y, cy: B + Math.sin(E) * Y, x2: S, y2: T, w0: x, w1: W, t0: b, dur: Math.max(.14, .32 - P * .03), depth: P, grad: _a(p, y, S, T, P) }), { ex: S, ey: T, w1: W, clipped: O };
        }
        function l(p, y, v, w, x, P, b) {
          const S = u(p, y, v, w, x, P, b);
          if (S.clipped || P >= 6 || w < lt * .06) return;
          const T = b + (.32 - P * .03) * .6, O = Math.random() < .55 ? 2 : 3;
          for (let L = 0; L < O; L++) {
            const B = .6 * (L - (O - 1) / 2) + C(-.22, .22), E = -.06 + C(-.05, .05);
            l(S.ex, S.ey, v + B + E, w * C(.74, .84), S.w1, P + 1, T + L * .03);
          }
        }
        u(e, r, -Math.PI / 2, r - i, n, 0, H.trunkStart);
        ce[0].dur = .55;
        const f = H.trunkStart + .36, c = 3;
        for (let p = 0; p < c; p++) {
          const y = -Math.PI / 2 + .62 * (p - (c - 1) / 2) + C(-.12, .12);
          l(e, i, y, s, n * .7, 1, f + p * .05);
        }
        const d = ce.reduce((p, y) => Math.max(p, y.t0 + y.dur), 0),
              _ = (H.branchSpan - H.trunkStart) / (d - H.trunkStart);
        for (const p of ce) p.t0 = H.trunkStart + (p.t0 - H.trunkStart) * _;

        const m = Math.round(Gt(sr * lt / 56, 250, 440)),
              h = Gt(Math.min(D, R) * .115, 30, 74);
        let g = 0;
        for (; Ct.length < m && g < m * 50;) {
          g++;
          const p = C(-1.06, 1.06), y = C(-1.06, 1.06);
          if (!an(p, y)) continue;
          const v = Pt + p * sr, w = Lt - y * lt, x = qt(Math.hypot(p, y + 1) / 2.4), P = H.bloomT0 + x * (H.bloomSpan * .82) + C(0, H.bloomSpan * .18), b = Math.random() < .42;
          Ct.push({ x: v, y: w, idx: Math.random() * br.length | 0, soft: b, box: h * (b ? C(.6, .85) : C(.78, 1.12)), rot: C(-.55, .55), sway: C(0, 6.28), t0: P });
        }
        Ct.sort((p, y) => p.soft === y.soft ? p.y - y.y : p.soft ? -1 : 1);
      }

      function _s() {
        M.globalAlpha = 1, M.fillStyle = _e, M.fillRect(0, 0, D, R), M.save(), M.globalCompositeOperation = "lighter", M.globalAlpha = 1, M.fillStyle = hr, M.fillRect(0, 0, D, R), M.restore();
      }

      function ps(o, t) {
        if (t <= 0) return;
        M.save(), M.globalCompositeOperation = "lighter";
        const e = Pt, r = Lt - lt * .35, i = Math.hypot(D, R) * 1.1, n = 9, s = Math.sin(o * .07) * .18;
        for (let a = 0; a < n; a++) {
          const u = -Math.PI / 2 + s + (a - (n - 1) / 2) * .2, l = .035 + .02 * (.5 + .5 * Math.sin(o * .5 + a * 1.7)), f = u - l, c = u + l, d = M.createLinearGradient(e, r, e + Math.cos(u) * i, r + Math.sin(u) * i);
          d.addColorStop(0, `rgba(255,232,190,${.1 * t})`), d.addColorStop(.5, `rgba(255,214,170,${.05 * t})`), d.addColorStop(1, "rgba(255,214,170,0)"), M.fillStyle = d, M.beginPath(), M.moveTo(e, r), M.lineTo(e + Math.cos(f) * i, r + Math.sin(f) * i), M.lineTo(e + Math.cos(c) * i, r + Math.sin(c) * i), M.closePath(), M.fill();
        }
        M.restore();
      }

      function ms(o) {
        const t = qt((o - H.bloomT0) / (H.bloomSpan * .9));
        t <= 0 || (M.save(), M.globalAlpha = t, M.globalCompositeOperation = "lighter", M.fillStyle = ze, M.fillRect(0, 0, D, R), M.restore());
      }

      function gs(o, t) {
        M.save(), M.globalCompositeOperation = "lighter";
        for (const e of oi) e.y += e.vy * t, e.x += Math.sin(o * .3 + e.phase) * e.drift, e.y < -e.r && (e.y = R + e.r, e.x = C(0, D)), M.globalAlpha = e.alpha, M.drawImage(e.sprite, e.x - e.r, e.y - e.r, e.r * 2, e.r * 2);
        M.restore();
      }

      function Tr(o, t, e) {
        const r = qt((o - .2) / 1.4);
        if (!(r <= 0)) for (const i of ai) i.depth >= .6 === e && (i.y -= i.vy * t, i.x += Math.sin(o * .5 + i.phase) * i.sway * t, i.rot += i.vrot * t, i.y < -i.box && (i.y = R + i.box, i.x = C(0, D)), rr((i.soft ? oe.soft : oe.crisp)[i.idx], i.x, i.y, i.box, i.rot, i.baseA * r));
      }

      function ys(o) {
        M.lineCap = "round", M.lineJoin = "round";
        for (const t of ce) {
          const e = qt((o - t.t0) / t.dur);
          if (e <= 0) continue;
          const r = fs(e);
          M.strokeStyle = t.grad;
          const i = 12, n = Math.max(1, Math.ceil(i * r));
          let s = un(t, 0);
          for (let a = 1; a <= n; a++) {
            const u = Math.min(r, a / i), l = un(t, u);
            M.lineWidth = fr(t.w0, t.w1, u), M.beginPath(), M.moveTo(s.x, s.y), M.lineTo(l.x, l.y), M.stroke(), s = l;
          }
        }
      }

      function xs(o) {
        const t = 1 + Math.sin(o * .8) * .012;
        for (const e of Ct) {
          const r = qt((o - e.t0) / .6);
          if (r <= 0) continue;
          const i = Math.max(0, la(r));
          let n = qt(r * 1.7);
          e.soft && (n *= .8);
          const a = qt((o - e.t0 - .6) / .7) * Math.sin(o * 1.5 + e.sway) * (e.box * .05),
                u = (1 - fs(r)) * e.box * .45,
                l = Pt + (e.x - Pt) * t + a,
                f = Lt + (e.y - Lt) * t - u;
          rr((e.soft ? oe.soft : oe.crisp)[e.idx], l, f, e.box * i, e.rot + a * .012, n);
        }
      }

      function pa(o, t) {
        if (o > H.bloomT0 + H.bloomSpan * .45 && de.length < 9 && Math.random() < .5) {
          const r = Ct[Math.random() * Ct.length | 0];
          r && de.push({ x: r.x, y: r.y, size: C(.6, 1.3) * (Math.min(D, R) * .05), age: 0, life: C(.7, 1.2), rot: C(0, 6.28) });
        }
        M.save(), M.globalCompositeOperation = "lighter";
        for (let r = de.length - 1; r >= 0; r--) {
          const i = de[r];
          i.age += t;
          const n = i.age / i.life;
          if (n >= 1) { de.splice(r, 1); continue; }
          const s = Math.sin(n * Math.PI);
          rr(cs, i.x, i.y, i.size * (.6 + .4 * s), i.rot + n * 1.2, s);
        }
        M.restore();
      }

      function ln() {
        const o = Ct[Math.random() * Ct.length | 0];
        o && Xe.push({ x: o.x + C(-8, 8), y: o.y + C(-8, 8), vy: C(14, 30), vx: C(-8, 8), sway: C(.6, 1.4), phase: C(0, 6.28), box: o.box * C(.34, .6), idx: o.idx, rot: C(0, 6.28), vrot: C(-1.4, 1.4), age: 0, land: Oi + C(-6, R * .05) });
      }

      function ma(o, t) {
        for (let e = Xe.length - 1; e >= 0; e--) {
          const r = Xe[e];
          if (r.age += t, r.vy += 8 * t, r.x += (r.vx + Math.sin(o * r.sway + r.phase) * 16) * t, r.y += r.vy * t, r.rot += r.vrot * t, r.y >= r.land) {
            ve.push({ x: Gt(r.x, 6, D - 6), y: r.land, box: r.box, idx: r.idx, rot: r.rot, a: C(.7, .95) });
            ve.length > 90 && ve.shift();
            Xe.splice(e, 1);
            continue;
          }
          const i = r.age < .3 ? r.age / .3 : 1;
          rr(oe.crisp[r.idx], r.x, r.y, r.box, r.rot, i);
        }
      }

      function vs() {
        for (const o of ve) rr(oe.crisp[o.idx], o.x, o.y, o.box, o.rot, o.a);
      }

      function Ri(o) {
        if (sa) sa.classList.toggle("is-in", o);
      }

      let cr = 0, dr = 0, we = 0, ui = 0, Sr = !1;
      window.bdayDone = !1;

      function ws(o) {
        cr || (cr = o, dr = o);
        const t = (o - cr) / 1e3,
              e = Math.min(.05, (o - dr) / 1e3);
        dr = o;
        const r = qt((t - H.bloomT0) / H.bloomSpan);
        _s(), ps(t, r), ms(t), gs(t, e), Tr(t, e, !1), ys(t), xs(t), pa(t, e), t > H.petalT0 && o - ui > 150 && (ln(), ln(), ui = o), ma(t, e), vs(), Tr(t, e, !0), Ri(t >= H.noteStart), !window.bdayDone && t >= H.done && (window.bdayDone = !0), !Sr && t >= H.done + 1 && (Sr = !0, Ma()), we = requestAnimationFrame(ws);
      }

      function ga() {
        cr = 0, dr = 0, ui = 0, Sr = !1, window.bdayDone = !1, zt("grow"), ki(), we || (we = requestAnimationFrame(ws));
      }

      function bs() {
        ki(), _s(), ps(0, 1), ms(H.done), gs(0, 0), Tr(99, 0, !1), ys(99), xs(99);
        for (let o = 0; o < 40; o++) {
          const t = Ct[Math.random() * Ct.length | 0];
          t && ve.push({ x: Gt(t.x + C(-D * .3, D * .3), 6, D - 6), y: Oi + C(-6, R * .05), box: t.box * .5, idx: t.idx, rot: C(0, 6.28), a: .85 });
        }
        vs(), Tr(99, 0, !0), Ri(!0), window.bdayDone = !0;
      }

      function Ts(o) {
        const t = [...o.textContent];
        return o.textContent = "", t.map(e => {
          const r = document.createElement("span");
          return r.className = "hl__ch", r.textContent = e === " " ? " " : e, o.appendChild(r), r;
        });
      }

      const Ss = Ts(F("wLine1")),
            Ps = Ts(F("wLine2")),
            xa = [...Ss, ...Ps];

      function va() {
        Ji.innerHTML = "";
        for (let o = 0; o < 12; o++) {
          const t = document.createElement("span");
          t.className = "mote";
          const e = C(4, 12);
          t.style.width = t.style.height = `${e}px`;
          t.style.left = `${C(4, 96)}%`;
          t.style.top = `${C(10, 96)}%`;
          Ji.appendChild(t);
          gsap.set(t, { opacity: C(.25, .7) });
          gsap.to(t, { y: -C(40, 140), x: C(-30, 30), duration: C(7, 14), repeat: -1, yoyo: !0, ease: "sine.inOut", delay: -C(0, 8) });
          gsap.to(t, { opacity: C(.1, .5), duration: C(2.5, 5), repeat: -1, yoyo: !0, ease: "sine.inOut" });
        }
      }

      const wa = F("tip");
      let Ai = 1, Pr = 0, Ze = 0, Je = 120, Tt = 0, Cs = 0, Ms = 1;
      const ir = 96, kr = { val: ir };

      function Di() {
        const o = kr.val;
        aa.setAttribute("y2", o);
        ua.setAttribute("y2", o);
        as.setAttribute("cy", o);
      }

      function Ei() {
        const o = D * .24, t = R * .76, e = D * .5, r = R * .33, i = Math.atan2(e - o, t - r);
        Cs = -Math.sin(i);
        Ms = Math.cos(i);
        kr.val = ir;
        Di();
        gsap.set(rt, { rotation: 0, scale: 1, x: 0, y: 0 });
        rt.style.left = "0px";
        rt.style.top = "0px";
        gsap.set(ct, { x: 0, y: 0 });
        const n = rt.getBoundingClientRect(),
              s = oa.getBoundingClientRect(),
              a = as.getBoundingClientRect(),
              u = ct.getBoundingClientRect();
        Ai = s.width / 460;
        const l = s.left - n.left + .5 * s.width,
              f = s.top - n.top + 240 / 300 * s.height,
              c = a.left - n.left + .5 * a.width,
              d = a.top - n.top + .5 * a.height;
        Pr = c - (u.left - n.left + .5 * u.width);
        Ze = d - (u.top - n.top + 205 / 220 * u.height);
        rt.style.left = o - l + "px";
        rt.style.top = t - f + "px";
        gsap.set(rt, { transformOrigin: `${l}px ${f}px`, rotation: i * 180 / Math.PI });
        gsap.set(ct, { x: Pr, y: Ze });
        Je = Math.min(s.height * .72, R * .16, 132);
        Tt = 0;
      }

      function Me(o) {
        Tt = Gt(o, 0, Je);
        gsap.set(ct, { x: Pr, y: Ze + Tt });
        kr.val = ir + Tt / Ai;
        Di();
        gsap.set(os, { opacity: .55 * (Tt / Je) });
      }

      let Ue = null;
      function ba() {
        gsap.set(fe, { scale: 1 });
        gsap.set(Ne, { scale: 1, opacity: .7 });
        Ue = gsap.timeline({ repeat: -1, repeatDelay: .5 });
        Ue.to(fe, { scale: 1.07, duration: .13, ease: "power2.out" }, 0)
          .to(Ne, { scale: 1.15, opacity: .9, duration: .13, ease: "power2.out" }, 0)
          .to(fe, { scale: 1, duration: .2, ease: "power2.in" }, .13)
          .to(fe, { scale: 1.05, duration: .12, ease: "power2.out" }, .3)
          .to(fe, { scale: 1, duration: .5, ease: "power2.inOut" }, .42)
          .to(Ne, { scale: 1, opacity: .7, duration: .7, ease: "power2.inOut" }, .3);
      }

      function Ta() {
        Ue && (Ue.kill(), Ue = null);
        gsap.set(fe, { scale: 1 });
      }

      function Sa(o) {
        return `<svg viewBox="0 0 24 22" width="100%" height="100%"><path d="M12 20C5.5 15 1.5 11.4 1.5 6.9 1.5 3.6 4 1.5 7 1.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3 0 5.5 2.1 5.5 5.4C23.5 11.4 19.5 15 12 20Z" fill="${o}"/></svg>`;
      }

      function Pa() {
        const o = ft.getBoundingClientRect(),
              t = wr.getBoundingClientRect(),
              e = o.left - t.left + o.width / 2,
              r = o.top - t.top + o.height * .42,
              i = ["#ff6f97", "#ffffff", "#ff8fae", "#ffffff", "#e23b67"],
              n = document.createDocumentFragment(),
              s = [];
        for (let a = 0; a < 12; a++) {
          const u = a < 8,
                l = document.createElement("span");
          l.className = "burst";
          const f = u ? C(12, 22) : C(4, 8);
          l.style.cssText = `position:absolute;left:${e}px;top:${r}px;width:${f}px;height:${f}px;margin:${-f / 2}px 0 0 ${-f / 2}px;pointer-events:none;z-index:4;`;
          u ? l.innerHTML = Sa(ls(i)) : (l.style.borderRadius = "50%", l.style.background = "radial-gradient(circle,#fff,rgba(255,210,150,0) 70%)");
          n.appendChild(l);
          s.push({ el: l, heart: u });
        }
        wr.appendChild(n);
        s.forEach(({ el: a, heart: u }) => {
          const l = C(-Math.PI, 0),
                f = C(u ? 70 : 40, u ? 190 : 120);
          gsap.to(a, { x: Math.cos(l) * f, y: Math.sin(l) * f - C(10, 50), rotation: C(-120, 120), scale: u ? C(.7, 1.2) : C(.4, 1), duration: C(.7, 1.15), ease: "power2.out" });
          gsap.to(a, { opacity: 0, duration: .5, delay: C(.35, .6), ease: "power1.in", onComplete: () => a.remove() });
        });
      }

      function Os() {
        const o = wa.getBoundingClientRect(),
              t = ft.getBoundingClientRect(),
              e = o.left + o.width / 2,
              r = o.top + o.height / 2,
              i = t.left + t.width / 2,
              n = t.top + t.height / 2,
              s = Math.hypot(i - e, n - r),
              a = Math.min(R * .26, R - n - t.height * .4),
              u = i,
              l = n + a,
              f = Math.hypot(Math.max(u, D - u), Math.max(l, R - l)),
              c = Math.hypot(D / 2, R / 2);
        return { arrowStartY: Ze + Tt, arrowFlyY: Ze + Tt - s, drawnNock: ir + Tt / Ai, fallPx: a, fx: u - D / 2, fy: l - R / 2, floodScale: f * 1.12 / 70, bloomScale: c * 1.2 / 30 };
      }

      let Ot = null;
      function ks(o) {
        const t = gsap.timeline({
          paused: !0,
          onComplete: () => {
            gsap.set(lr, { autoAlpha: 0 });
            ga();
            gsap.to(Le, { autoAlpha: 0, duration: 1.15, ease: "power2.out" });
          }
        });
        return t.set(ft, { y: 0, scaleX: 1, scaleY: 1, opacity: 1 })
                .set(ct, { opacity: 1, x: Pr, y: o.arrowStartY, scaleY: 1 })
                .set([he, Le], { autoAlpha: 0, scale: .001, x: 0, y: 0 })
                .set(he, { x: o.fx, y: o.fy })
                .set(lr, { autoAlpha: 0 })
                .set(".blob", { opacity: 0 })
                .set(tn, { scale: 1, yPercent: 0 })
                .set(en, { xPercent: 0, yPercent: 0 })
                .set(Br, { yPercent: -100 })
                .set(Yr, { yPercent: 100 })
                .set(rn, { opacity: 0, y: 12 })
                .set(nn, { opacity: 0, y: 12 })
                .set(xa, { transformPerspective: 620, transformOrigin: "50% 100%", yPercent: 135, rotationX: -82 })
                .set(sn, { drawn: 0 }),
               t.fromTo(kr, { val: o.drawnNock }, { val: ir, duration: .5, ease: "elastic.out(1,0.34)", onUpdate: Di }, 0)
                .to(ct, { y: o.arrowFlyY, duration: .26, ease: "power2.in" }, 0)
                .to(ct, { scaleY: 1.16, duration: .14, ease: "power2.in" }, 0)
                .to(ct, { scaleY: 1, duration: .1, ease: "power1.out" }, .16)
                .to(os, { opacity: 0, duration: .18 }, 0)
                .to([ii, ni], { opacity: 0, duration: .2, ease: "power1.out" }, 0),
               t.add(Pa, .26)
                .to(ft, { x: 7, y: -9, duration: .06, ease: "power2.out" }, .26)
                .to(ft, { x: 0, y: 0, duration: .32, ease: "power2.out" }, .32)
                .to(ft, { scale: 1.14, duration: .06, ease: "power2.out" }, .26)
                .to(ft, { scale: 1, duration: .26, ease: "power2.inOut" }, .32)
                .to(ct, { rotation: "+=4", duration: .05, yoyo: !0, repeat: 4, ease: "sine.inOut" }, .27)
                .set(ct, { rotation: 0 }, .52)
                .to(ct, { opacity: 0, duration: .16, ease: "power1.out" }, .56),
               t.to(ft, { y: o.fallPx, scaleX: .84, scaleY: 1.3, duration: .34, ease: "power1.in" }, .64)
                .to(ft, { scaleX: 1.4, scaleY: .6, duration: .07, ease: "power2.out" }, .98)
                .set(he, { autoAlpha: 1 }, 1)
                .fromTo(he, { scale: .02 }, { scale: o.floodScale, duration: 0.65, ease: "power2.inOut" }, 1)
                .to(ft, { opacity: 0, duration: .18, ease: "power1.out" }, 1.06),
               t.set(lr, { autoAlpha: 1 }, 1.32)
                .set(wr, { autoAlpha: 0 }, 1.33)
                .to(".blob", { opacity: 1, duration: .8, ease: "power2.out" }, 1.34)
                .set(he, { autoAlpha: 0 }, 1.36),
               t.fromTo(tn, { scale: 1, yPercent: 0 }, { scale: 1.07, yPercent: -1.3, duration: 2.6, ease: "none" }, 1.38)
                .fromTo(en, { xPercent: 0, yPercent: 0 }, { xPercent: -1.5, yPercent: -1.0, duration: 2.6, ease: "none" }, 1.38),
               t.to(Br, { yPercent: 0, duration: .6, ease: "power2.out" }, 1.5)
                .to(Yr, { yPercent: 0, duration: .6, ease: "power2.out" }, 1.5),
               t.to(rn, { opacity: 1, y: 0, duration: .45, ease: "power3.out" }, 1.54)
                .to(Ss, { yPercent: 0, rotationX: 0, duration: .55, ease: "power3.out", stagger: .033 }, 1.68)
                .to(Ps, { yPercent: 0, rotationX: 0, duration: .55, ease: "power3.out", stagger: .033 }, 2.06)
                .to(sn, { drawn: 1, duration: .45, ease: "power2.inOut" }, 2.54)
                .to(nn, { opacity: 1, y: 0, duration: .45, ease: "power3.out" }, 2.74),
               t.to(Br, { yPercent: -100, duration: .5, ease: "power2.in" }, 3.32)
                .to(Yr, { yPercent: 100, duration: .5, ease: "power2.in" }, 3.32)
                .set(Le, { autoAlpha: 1 }, 3.42)
                .fromTo(Le, { scale: .02 }, { scale: o.bloomScale, duration: .58, ease: "power2.in" }, 3.42), t;
      }

      let ae = !1, tr = !1, Rs = 0, As = 0, Ds = 0;
      function Es() {
        ae || (ae = !0, tr = !1, Ta(), zt("release"), zt("whoosh"), Ot = ks(Os()), Ot.play(0));
      }

      function Ca() {
        const o = Tt;
        gsap.to({ d: o }, { d: 0, duration: .55, ease: "elastic.out(1,0.4)", onUpdate() { Me(this.targets()[0].d); } });
      }

      function Fs() {
        ae || (si = performance.now(), zt("draw"), gsap.to({ d: Tt }, { d: Je * .94, duration: .62, ease: "power2.inOut", onUpdate() { Me(this.targets()[0].d); }, onComplete: () => gsap.delayedCall(.16, Es) }));
      }

      if (rt) {
        rt.addEventListener("pointerdown", o => {
          if (!ae) {
            tr = !0;
            try { rt.setPointerCapture(o.pointerId); } catch {}
            Rs = o.clientX; As = o.clientY; Ds = Tt;
            o.preventDefault();
          }
        });
        rt.addEventListener("pointermove", o => {
          if (!tr) return;
          const t = (o.clientX - Rs) * Cs + (o.clientY - As) * Ms;
          Me(Ds + t);
        });
        function Ls() {
          tr && (tr = !1, Tt > Je * .26 ? Es() : Ca());
        }
        rt.addEventListener("pointerup", Ls);
        rt.addEventListener("pointercancel", Ls);
        rt.addEventListener("keydown", o => {
          ae || (o.key === "Enter" || o.key === " ") && (o.preventDefault(), Fs());
        });
      }

      function zs() {
        gsap.set(wr, { autoAlpha: 1 });
        Ei();
        Me(0);
        gsap.set([ii, ni], { opacity: 0, y: 14 });
        gsap.set(ft, { opacity: 0, y: 10, scaleX: .9, scaleY: .9 });
        gsap.set(rt, { opacity: 0, scale: .85 });
        gsap.set(Ne, { opacity: 0, scale: 1 });
        gsap.set(ct, { opacity: 1 });
        gsap.timeline({ onComplete: ba })
            .to(ft, { opacity: 1, y: 0, scaleX: 1, scaleY: 1, duration: .8, ease: "power3.out" }, .1)
            .to(Ne, { opacity: .7, duration: .8, ease: "power2.out" }, .2)
            .to(rt, { opacity: 1, scale: 1, duration: .8, ease: "power3.out" }, .28)
            .to(ii, { opacity: 1, y: 0, duration: .7, ease: "power3.out" }, .4)
            .to(ni, { opacity: 1, y: 0, duration: .7, ease: "power3.out" }, .7);
      }

      function Ma() {
        if (Qe) {
          Qe.hidden = !1;
          requestAnimationFrame(() => Qe.classList.add("is-shown"));
        }
      }

      function Bs() {
        Ae = Math.min(window.devicePixelRatio || 1, 2);
        D = Fe.clientWidth;
        R = Fe.clientHeight;
        Fe.width = Math.round(D * Ae);
        Fe.height = Math.round(R * Ae);
        M.setTransform(Ae, 0, 0, Ae, 0, 0);
        ca();
        ki();
        if (us) { bs(); return; }
        if (ae && Ot) {
          const o = Ot.time(),
                t = Ot.isActive();
          Ot = ks(Os());
          Ot.pause(o);
          t && Ot.play(o);
        } else {
          Ei();
          Me(0);
        }
      }

      let Ur = 0;
      const handleResize = () => {
        Ur || (Ur = requestAnimationFrame(() => { Ur = 0; Bs(); }));
      };
      window.addEventListener("resize", handleResize);

      Bs();
      if (us) {
        bs();
      } else {
        va();
        document.fonts && document.fonts.ready.then(() => { Ei(); Me(0); });
        zs();
      }

    }, 100);

    return () => {};
  }, []);

  return (
    <div className="scene">
      <canvas id="tree" className="tree"></canvas>

      <div id="hero" className="hero">
        <div className="hero__bg"></div>
        <div id="motes" className="hero__motes"></div>
        <p id="eyebrow" className="hero__eyebrow">a little something, for you</p>
        
        <div className="targetWrap">
          <div id="target" className="target">
            <div className="heart__glow"></div>
            <div id="targetHeart" className="target__heart">
              <svg viewBox="0 0 24 22" width="100%" height="100%">
                <path d="M12 20C5.5 15 1.5 11.4 1.5 6.9 1.5 3.6 4 1.5 7 1.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3 0 5.5 2.1 5.5 5.4C23.5 11.4 19.5 15 12 20Z" fill="#ff4081"/>
              </svg>
            </div>
          </div>
        </div>

        <div id="archery" className="archery" tabIndex="0">
          <svg id="bow" className="bow" viewBox="0 0 460 300">
             <path id="strL" stroke="#f9e2d2" strokeWidth="2" d="M230,240 L10,50" />
             <path id="strR" stroke="#f9e2d2" strokeWidth="2" d="M230,240 L450,50" />
             <circle id="serving" cx="230" cy="240" r="4" fill="#f9e2d2" />
             <path d="M10,50 Q230,200 450,50" fill="none" stroke="#8b5a2b" strokeWidth="8" strokeLinecap="round"/>
          </svg>
          <div id="aim" className="aim"></div>
          <div id="arrow" className="arrow">
             <svg id="tip" viewBox="0 0 24 100">
               <rect x="11" y="10" width="2" height="90" fill="#8b5a2b"/>
               <polygon points="12,0 0,20 24,20" fill="#ffcf6a"/>
             </svg>
          </div>
        </div>
        <p id="hint" className="hero__hint">PULL & RELEASE</p>
      </div>

      <div id="flood" className="flood"></div>
      
      <div id="field" className="field">
        <div className="blob blob--1"></div>
        <div className="blob blob--2"></div>
        <div className="blob blob--3"></div>
        <div id="fgrid" className="fgrid"></div>
        <div className="fvignette"></div>
        
        <div id="camera" className="camera">
          <p id="kEyebrow" className="kEyebrow">make a wish...</p>
          <div className="headline">
            <span id="wLine1" className="hl__line">Happy</span>
            <span id="wLine2" className="hl__line">Birthday</span>
            <span id="uline" className="uline" style={{display: 'block'}}>
              <svg viewBox="0 0 100 10" preserveAspectRatio="none" style={{ width: '100%', height: '10px', display: 'block' }}>
                <path className="uline__path" d="M0,5 Q50,0 100,5" fill="none" stroke="#ffcf6a" strokeWidth="2"/>
              </svg>
            </span>
          </div>
          <p id="kSub" className="kSub">to someone worth celebrating</p>
        </div>
      </div>

      <div id="barTop" className="bar bar--top"></div>
      <div id="barBot" className="bar bar--bot"></div>
      <div id="bloom" className="bloom"></div>
      
      <div id="wish" className="wish">
        <p className="wish__eyebrow">...and make it count</p>
        <div className="wish__heroWrap">
          <h1 className="wish__hero">Happy Birthday</h1>
        </div>
        <span className="wish__rule"></span>
        <p className="wish__sub">here's to a year that blooms</p>
      </div>

      <button id="nextBtn" className="replay" hidden onClick={onNext}>
        Next ➡️
      </button>

      <div className="grade">
        <div className="grade__vignette"></div>
        <div className="grade__grain"></div>
      </div>
    </div>
  );
}

