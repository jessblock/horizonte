import React from 'react'

// Cores teal
const C = {
  neon: '#00FFC2',
  bright: '#5EFFD4',
  dim: '#5EAA94',
  line: '#2A6B57',
  faint: '#1F4538'
}

// ============================================================
// PRIMITIVAS HUD
// ============================================================

export function CornerBrackets({ color = C.neon, size = 'sm' }) {
  const s = size === 'sm' ? 8 : 12
  const w = size === 'sm' ? 1 : 1.5
  return (
    <>
      <div className="absolute top-0 left-0 pointer-events-none" style={{ width: s, height: s, borderTop: `${w}px solid ${color}`, borderLeft: `${w}px solid ${color}`, animation: 'cornerPulse 2s ease-in-out infinite' }} />
      <div className="absolute top-0 right-0 pointer-events-none" style={{ width: s, height: s, borderTop: `${w}px solid ${color}`, borderRight: `${w}px solid ${color}`, animation: 'cornerPulse 2s ease-in-out infinite 0.5s' }} />
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: s, height: s, borderBottom: `${w}px solid ${color}`, borderLeft: `${w}px solid ${color}`, animation: 'cornerPulse 2s ease-in-out infinite 1s' }} />
      <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width: s, height: s, borderBottom: `${w}px solid ${color}`, borderRight: `${w}px solid ${color}`, animation: 'cornerPulse 2s ease-in-out infinite 1.5s' }} />
      <style>{`@keyframes cornerPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>
    </>
  )
}

export function ScanLine() {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      <div className="absolute left-0 right-0 h-20" style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,194,0.05) 50%, transparent 100%)',
        animation: 'scan 8s linear infinite'
      }} />
      <style>{`@keyframes scan { 0% { transform: translateY(-10vh); opacity: 0; } 10%, 90% { opacity: 1; } 100% { transform: translateY(110vh); opacity: 0; } }`}</style>
    </div>
  )
}

// ============================================================
// EMBLEMAS POR CATEGORIA - sem frame retangular, ilustração pura
// ============================================================

export function CategoryEmblem({ category, size = 48 }) {
  const common = { width: size, height: size, viewBox: '0 0 48 48' }

  if (category === 'BASE') {
    return (
      <svg {...common} aria-hidden="true">
        <polygon points="24,6 40,18 40,40 8,40 8,18" fill="none" stroke={C.neon} strokeWidth="1.5" />
        <polygon points="24,6 40,18 8,18" fill="none" stroke={C.bright} strokeWidth="1.2" />
        <rect x="18" y="28" width="12" height="12" fill="none" stroke={C.dim} strokeWidth="0.8" />
        <line x1="24" y1="28" x2="24" y2="40" stroke={C.line} strokeWidth="0.5" />
        <circle cx="24" cy="34" r="0.8" fill={C.neon} />
      </svg>
    )
  }

  if (category === 'LAB') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M 18 8 L 18 20 L 10 40 L 38 40 L 30 20 L 30 8 Z" fill="none" stroke={C.neon} strokeWidth="1.5" />
        <line x1="16" y1="8" x2="32" y2="8" stroke={C.bright} strokeWidth="2" />
        <line x1="12" y1="32" x2="36" y2="32" stroke={C.dim} strokeWidth="0.6" strokeDasharray="2,1.5" />
        <circle cx="20" cy="35" r="1.2" fill={C.neon} opacity="0.7" />
        <circle cx="28" cy="36" r="0.8" fill={C.neon} opacity="0.5" />
        <circle cx="24" cy="16" r="1" fill={C.bright} />
      </svg>
    )
  }

  if (category === 'FOCO') {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="24" cy="24" r="18" fill="none" stroke={C.neon} strokeWidth="1.5" />
        <circle cx="24" cy="24" r="12" fill="none" stroke={C.dim} strokeWidth="0.8" strokeDasharray="2,1.5" />
        <circle cx="24" cy="24" r="6" fill="none" stroke={C.bright} strokeWidth="1.2" />
        <circle cx="24" cy="24" r="2" fill={C.neon} />
        <line x1="24" y1="2" x2="24" y2="8" stroke={C.neon} strokeWidth="1.5" />
        <line x1="24" y1="40" x2="24" y2="46" stroke={C.neon} strokeWidth="1.5" />
        <line x1="2" y1="24" x2="8" y2="24" stroke={C.neon} strokeWidth="1.5" />
        <line x1="40" y1="24" x2="46" y2="24" stroke={C.neon} strokeWidth="1.5" />
      </svg>
    )
  }

  if (category === 'RADIO') {
    return (
      <svg {...common} aria-hidden="true">
        <rect x="20" y="32" width="8" height="10" fill="none" stroke={C.neon} strokeWidth="1.2" />
        <line x1="24" y1="32" x2="24" y2="24" stroke={C.neon} strokeWidth="1.2" />
        <circle cx="24" cy="22" r="2" fill={C.bright} />
        <path d="M 14 18 Q 24 4 34 18" fill="none" stroke={C.neon} strokeWidth="1.5" />
        <path d="M 8 16 Q 24 -4 40 16" fill="none" stroke={C.dim} strokeWidth="1" opacity="0.7" />
        <path d="M 2 14 Q 24 -10 46 14" fill="none" stroke={C.line} strokeWidth="0.8" opacity="0.5" />
      </svg>
    )
  }

  if (category === 'SHIELD') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M 24 4 L 40 8 L 40 26 Q 40 38 24 44 Q 8 38 8 26 L 8 8 Z" fill="none" stroke={C.neon} strokeWidth="1.5" />
        <path d="M 24 8 L 36 11 L 36 26 Q 36 35 24 40 Q 12 35 12 26 L 12 11 Z" fill="none" stroke={C.dim} strokeWidth="0.6" strokeDasharray="2,1.5" />
        <line x1="24" y1="14" x2="24" y2="32" stroke={C.bright} strokeWidth="2" />
        <line x1="16" y1="23" x2="32" y2="23" stroke={C.bright} strokeWidth="2" />
        <circle cx="24" cy="23" r="2" fill={C.bright} />
      </svg>
    )
  }
  return null
}

// ============================================================
// ILUSTRAÇÃO POR MISSÃO - 40x40, sem frame
// ============================================================

function Art({ children, size = 40 }) {
  return <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">{children}</svg>
}

const MISSION_ART = {
  // BASE
  base_check: (
    <Art>
      <circle cx="20" cy="22" r="6" fill="none" stroke={C.neon} strokeWidth="1.3" />
      <line x1="4" y1="22" x2="36" y2="22" stroke={C.bright} strokeWidth="1.2" />
      <line x1="20" y1="10" x2="20" y2="14" stroke={C.neon} strokeWidth="1" />
      <line x1="10" y1="14" x2="12.5" y2="16.5" stroke={C.dim} strokeWidth="0.8" />
      <line x1="30" y1="14" x2="27.5" y2="16.5" stroke={C.dim} strokeWidth="0.8" />
      <line x1="8" y1="22" x2="12" y2="22" stroke={C.dim} strokeWidth="0.8" />
      <line x1="28" y1="22" x2="32" y2="22" stroke={C.dim} strokeWidth="0.8" />
    </Art>
  ),
  base_estudo: (
    <Art>
      <path d="M 6 12 L 20 16 L 34 12 L 34 30 L 20 34 L 6 30 Z" fill="none" stroke={C.neon} strokeWidth="1.3" />
      <line x1="20" y1="16" x2="20" y2="34" stroke={C.bright} strokeWidth="1.2" />
      <line x1="10" y1="18" x2="18" y2="20" stroke={C.dim} strokeWidth="0.6" />
      <line x1="10" y1="22" x2="18" y2="24" stroke={C.dim} strokeWidth="0.6" />
      <line x1="10" y1="26" x2="18" y2="28" stroke={C.dim} strokeWidth="0.6" />
      <line x1="22" y1="20" x2="30" y2="18" stroke={C.dim} strokeWidth="0.6" />
      <line x1="22" y1="24" x2="30" y2="22" stroke={C.dim} strokeWidth="0.6" />
    </Art>
  ),
  base_hidro: (
    <Art>
      <path d="M 20 6 Q 12 20 12 26 Q 12 34 20 34 Q 28 34 28 26 Q 28 20 20 6 Z" fill="none" stroke={C.neon} strokeWidth="1.4" />
      <path d="M 17 24 Q 17 28 20 28" fill="none" stroke={C.bright} strokeWidth="1" />
    </Art>
  ),
  base_dente: (
    <Art>
      <rect x="6" y="18" width="20" height="4" fill="none" stroke={C.neon} strokeWidth="1.2" />
      <rect x="26" y="16" width="8" height="8" fill="none" stroke={C.neon} strokeWidth="1.2" />
      <line x1="27" y1="18" x2="27" y2="22" stroke={C.bright} strokeWidth="0.7" />
      <line x1="29" y1="18" x2="29" y2="22" stroke={C.bright} strokeWidth="0.7" />
      <line x1="31" y1="18" x2="31" y2="22" stroke={C.bright} strokeWidth="0.7" />
      <line x1="33" y1="18" x2="33" y2="22" stroke={C.bright} strokeWidth="0.7" />
      <circle cx="12" cy="12" r="1" fill={C.neon} opacity="0.7" />
      <circle cx="18" cy="10" r="0.8" fill={C.neon} opacity="0.5" />
    </Art>
  ),
  base_mochila: (
    <Art>
      <rect x="10" y="12" width="20" height="22" fill="none" stroke={C.neon} strokeWidth="1.3" />
      <path d="M 14 12 Q 14 8 20 8 Q 26 8 26 12" fill="none" stroke={C.neon} strokeWidth="1.2" />
      <rect x="14" y="20" width="12" height="6" fill="none" stroke={C.bright} strokeWidth="1" />
      <line x1="16" y1="30" x2="24" y2="30" stroke={C.dim} strokeWidth="0.8" />
      <circle cx="20" cy="20" r="0.8" fill={C.neon} />
    </Art>
  ),
  base_sleep: (
    <Art>
      <path d="M 26 12 Q 16 12 16 20 Q 16 28 26 28 Q 20 24 20 20 Q 20 16 26 12 Z" fill="none" stroke={C.neon} strokeWidth="1.4" />
      <path d="M 26 12 Q 16 12 16 20 Q 16 28 26 28 Q 20 24 20 20 Q 20 16 26 12 Z" fill={C.neon} opacity="0.1" />
      <circle cx="32" cy="12" r="1" fill={C.bright} />
      <circle cx="34" cy="20" r="0.8" fill={C.bright} />
      <circle cx="30" cy="30" r="0.9" fill={C.bright} />
    </Art>
  ),

  // LAB
  lab_fx: (
    <Art>
      <path d="M 20 6 Q 10 6 10 18 Q 10 26 12 28 L 12 32 L 16 32 L 16 30 L 24 30 L 24 32 L 28 32 L 28 28 Q 30 26 30 18 Q 30 6 20 6 Z" fill="none" stroke={C.neon} strokeWidth="1.4" />
      <circle cx="15" cy="18" r="2.2" fill="none" stroke={C.bright} strokeWidth="0.9" />
      <circle cx="25" cy="18" r="2.2" fill="none" stroke={C.bright} strokeWidth="0.9" />
      <circle cx="15" cy="18" r="0.9" fill={C.bright} />
      <circle cx="25" cy="18" r="0.9" fill={C.bright} />
      <path d="M 18 24 L 20 26 L 22 24" fill="none" stroke={C.dim} strokeWidth="0.7" />
    </Art>
  ),
  lab_ana: (
    <Art>
      <path d="M 8 14 Q 6 12 8 10 Q 10 8 12 10 Q 14 12 12 14 L 26 22 Q 28 20 30 22 Q 32 24 30 26 Q 28 28 26 26 L 12 18 Q 10 20 8 18 Q 6 16 8 14 Z" fill="none" stroke={C.neon} strokeWidth="1.3" />
    </Art>
  ),
  lab_cust: (
    <Art>
      <ellipse cx="20" cy="22" rx="14" ry="11" fill="none" stroke={C.neon} strokeWidth="1.4" />
      <circle cx="20" cy="22" r="3" fill="none" stroke={C.dim} strokeWidth="0.9" />
      <circle cx="12" cy="18" r="1.5" fill={C.bright} />
      <circle cx="26" cy="16" r="1.5" fill={C.bright} opacity="0.7" />
      <circle cx="28" cy="24" r="1.5" fill={C.bright} opacity="0.6" />
      <circle cx="14" cy="26" r="1.5" fill={C.bright} opacity="0.8" />
      <line x1="30" y1="12" x2="34" y2="8" stroke={C.bright} strokeWidth="1.5" />
    </Art>
  ),
  lab_criatura: (
    <Art>
      <path d="M 6 20 Q 20 8 34 20 Q 20 32 6 20 Z" fill="none" stroke={C.neon} strokeWidth="1.4" />
      <circle cx="20" cy="20" r="6" fill="none" stroke={C.dim} strokeWidth="1" />
      <circle cx="20" cy="20" r="3" fill={C.bright} />
      <circle cx="20" cy="20" r="1" fill="#0A0F0D" />
      <path d="M 20 26 Q 22 30 20 34" fill="none" stroke={C.dim} strokeWidth="0.7" />
      <path d="M 16 26 Q 14 30 16 34" fill="none" stroke={C.dim} strokeWidth="0.7" />
      <path d="M 24 26 Q 26 30 24 34" fill="none" stroke={C.dim} strokeWidth="0.7" />
    </Art>
  ),
  lab_dino: (
    <Art>
      <path d="M 6 28 L 10 20 Q 12 12 20 10 Q 28 10 30 16 L 34 16 L 32 20 L 28 20 L 26 24 L 28 28 L 24 28 L 22 24 L 16 24 L 14 28 Z" fill="none" stroke={C.neon} strokeWidth="1.4" />
      <circle cx="26" cy="14" r="0.9" fill={C.bright} />
    </Art>
  ),
  lab_tatic: (
    <Art>
      <line x1="8" y1="8" x2="32" y2="32" stroke={C.neon} strokeWidth="1.4" />
      <line x1="32" y1="8" x2="8" y2="32" stroke={C.neon} strokeWidth="1.4" />
      <line x1="6" y1="10" x2="12" y2="4" stroke={C.bright} strokeWidth="1.8" />
      <line x1="34" y1="10" x2="28" y2="4" stroke={C.bright} strokeWidth="1.8" />
      <circle cx="20" cy="20" r="3" fill="none" stroke={C.bright} strokeWidth="1" />
      <circle cx="20" cy="20" r="1" fill={C.bright} />
    </Art>
  ),
  lab_engen: (
    <Art>
      <circle cx="16" cy="20" r="7" fill="none" stroke={C.neon} strokeWidth="1.3" />
      <circle cx="16" cy="20" r="3" fill="none" stroke={C.bright} strokeWidth="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180
        const x1 = 16 + Math.cos(rad) * 7
        const y1 = 20 + Math.sin(rad) * 7
        const x2 = 16 + Math.cos(rad) * 10
        const y2 = 20 + Math.sin(rad) * 10
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.neon} strokeWidth="1.1" />
      })}
      <line x1="26" y1="12" x2="34" y2="4" stroke={C.bright} strokeWidth="1.5" />
      <circle cx="32" cy="6" r="2" fill="none" stroke={C.bright} strokeWidth="1" />
    </Art>
  ),

  // FOCO
  foco_resp: (
    <Art>
      <circle cx="20" cy="20" r="14" fill="none" stroke={C.dim} strokeWidth="0.6" strokeDasharray="2,1.5" />
      <circle cx="20" cy="20" r="10" fill="none" stroke={C.neon} strokeWidth="1" />
      <circle cx="20" cy="20" r="6" fill="none" stroke={C.bright} strokeWidth="1.2" />
      <circle cx="20" cy="20" r="2" fill={C.bright} />
    </Art>
  ),
  foco_pausa: (
    <Art>
      <rect x="12" y="12" width="6" height="16" fill="none" stroke={C.neon} strokeWidth="1.3" />
      <rect x="22" y="12" width="6" height="16" fill="none" stroke={C.neon} strokeWidth="1.3" />
    </Art>
  ),
  foco_25: (
    <Art>
      <circle cx="20" cy="20" r="12" fill="none" stroke={C.neon} strokeWidth="1.3" />
      <line x1="20" y1="20" x2="20" y2="12" stroke={C.bright} strokeWidth="1.4" />
      <line x1="20" y1="20" x2="26" y2="20" stroke={C.bright} strokeWidth="1.2" />
      <circle cx="20" cy="20" r="1" fill={C.bright} />
      {[0, 90, 180, 270].map((a, i) => {
        const rad = (a * Math.PI) / 180
        const x1 = 20 + Math.cos(rad) * 12
        const y1 = 20 + Math.sin(rad) * 12
        const x2 = 20 + Math.cos(rad) * 10
        const y2 = 20 + Math.sin(rad) * 10
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.dim} strokeWidth="0.9" />
      })}
    </Art>
  ),

  // RADIO
  radio_coop: (
    <Art>
      <circle cx="12" cy="14" r="3" fill="none" stroke={C.neon} strokeWidth="1.1" />
      <path d="M 8 20 L 8 28 L 16 28 L 16 20" fill="none" stroke={C.neon} strokeWidth="1.1" />
      <circle cx="28" cy="14" r="3" fill="none" stroke={C.neon} strokeWidth="1.1" />
      <path d="M 24 20 L 24 28 L 32 28 L 32 20" fill="none" stroke={C.neon} strokeWidth="1.1" />
      <line x1="16" y1="24" x2="24" y2="24" stroke={C.bright} strokeWidth="1.2" strokeDasharray="1.5,1" />
    </Art>
  ),
  radio_freq: (
    <Art>
      <path d="M 6 12 L 34 12 L 34 26 L 20 26 L 16 32 L 16 26 L 6 26 Z" fill="none" stroke={C.neon} strokeWidth="1.3" />
      <circle cx="14" cy="19" r="1" fill={C.bright} />
      <circle cx="20" cy="19" r="1" fill={C.bright} />
      <circle cx="26" cy="19" r="1" fill={C.bright} />
    </Art>
  ),
  radio_gabi: (
    <Art>
      <path d="M 6 22 Q 6 10 20 10 Q 34 10 34 22" fill="none" stroke={C.neon} strokeWidth="1.4" />
      <rect x="4" y="20" width="6" height="10" fill="none" stroke={C.bright} strokeWidth="1.1" />
      <rect x="30" y="20" width="6" height="10" fill="none" stroke={C.bright} strokeWidth="1.1" />
    </Art>
  ),
  radio_jess: (
    <Art>
      <path d="M 20 6 L 22 14 L 30 16 L 22 18 L 20 26 L 18 18 L 10 16 L 18 14 Z" fill="none" stroke={C.neon} strokeWidth="1.2" />
      <path d="M 20 6 L 22 14 L 30 16 L 22 18 L 20 26 L 18 18 L 10 16 L 18 14 Z" fill={C.bright} opacity="0.2" />
      <circle cx="10" cy="30" r="1" fill={C.bright} />
      <circle cx="32" cy="30" r="1" fill={C.bright} />
      <circle cx="30" cy="8" r="0.8" fill={C.neon} />
    </Art>
  ),

  // SHIELD
  shield_24: (
    <Art>
      <path d="M 20 4 L 32 8 L 32 20 Q 32 30 20 36 Q 8 30 8 20 L 8 8 Z" fill="none" stroke={C.neon} strokeWidth="1.4" />
      <path d="M 14 20 L 19 25 L 28 14" fill="none" stroke={C.bright} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </Art>
  )
}

export function MissionArt({ id }) {
  return MISSION_ART[id] || (
    <Art>
      <circle cx="20" cy="20" r="8" fill="none" stroke={C.neon} strokeWidth="1.2" />
      <text x="18" y="23" fontSize="6" fill={C.neon} fontFamily="monospace">?</text>
    </Art>
  )
}

// ============================================================
// BOOT HEXAGON
// ============================================================
export function BootHexagon({ size = 140 }) {
  return (
    <svg viewBox="0 0 140 140" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.neon} stopOpacity="0.9" />
          <stop offset="100%" stopColor={C.bright} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <g style={{ transformOrigin: 'center', animation: 'rot 24s linear infinite' }}>
        <polygon points="70,10 122,40 122,100 70,130 18,100 18,40" fill="none" stroke="url(#hexGrad)" strokeWidth="1.5" />
      </g>
      <g style={{ transformOrigin: 'center', animation: 'rotR 32s linear infinite' }}>
        <polygon points="70,25 108,47 108,93 70,115 32,93 32,47" fill="none" stroke={C.dim} strokeWidth="0.8" strokeDasharray="3,2" />
      </g>
      <circle cx="70" cy="70" r="14" fill="none" stroke={C.neon} strokeWidth="1" />
      <circle cx="70" cy="70" r="6" fill={C.neon} opacity="0.3" />
      <circle cx="70" cy="70" r="3" fill={C.neon} style={{ animation: 'blink 3s ease-in-out infinite' }} />
      <line x1="70" y1="50" x2="70" y2="60" stroke={C.neon} strokeWidth="1" />
      <line x1="70" y1="80" x2="70" y2="90" stroke={C.neon} strokeWidth="1" />
      <line x1="50" y1="70" x2="60" y2="70" stroke={C.neon} strokeWidth="1" />
      <line x1="80" y1="70" x2="90" y2="70" stroke={C.neon} strokeWidth="1" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 70 + Math.cos(rad) * 60
        const y1 = 70 + Math.sin(rad) * 60
        const x2 = 70 + Math.cos(rad) * 66
        const y2 = 70 + Math.sin(rad) * 66
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.bright} strokeWidth="1.2" />
      })}
      <style>{`
        @keyframes rot { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes rotR { from { transform: rotate(0); } to { transform: rotate(-360deg); } }
        @keyframes blink { 0%, 90%, 100% { opacity: 1; } 95% { opacity: 0.3; } }
      `}</style>
    </svg>
  )
}

// ============================================================
// RADAR (estado vazio do Comando)
// ============================================================
export function BlueprintRadar({ size = 140 }) {
  return (
    <svg viewBox="0 0 140 140" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id="sweep2" x1="50%" y1="50%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={C.neon} stopOpacity="0.5" />
          <stop offset="100%" stopColor={C.neon} stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="70" cy="70" r="64" fill="none" stroke={C.line} strokeWidth="0.6" />
      <circle cx="70" cy="70" r="48" fill="none" stroke={C.line} strokeWidth="0.5" strokeDasharray="2,2" />
      <circle cx="70" cy="70" r="30" fill="none" stroke={C.line} strokeWidth="0.5" />
      <circle cx="70" cy="70" r="12" fill="none" stroke={C.neon} strokeWidth="0.9" />
      <line x1="70" y1="6" x2="70" y2="134" stroke={C.line} strokeWidth="0.5" />
      <line x1="6" y1="70" x2="134" y2="70" stroke={C.line} strokeWidth="0.5" />
      <g style={{ transformOrigin: 'center', animation: 'rotR2 5s linear infinite' }}>
        <path d="M 70 70 L 70 6 A 64 64 0 0 1 132 60 Z" fill="url(#sweep2)" />
        <line x1="70" y1="70" x2="70" y2="6" stroke={C.bright} strokeWidth="1.5" />
      </g>
      <circle cx="70" cy="70" r="2.5" fill={C.bright} style={{ animation: 'blink2 3s ease-in-out infinite' }} />
      <style>{`
        @keyframes rotR2 { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes blink2 { 0%, 90%, 100% { opacity: 1; } 95% { opacity: 0.3; } }
      `}</style>
    </svg>
  )
}
