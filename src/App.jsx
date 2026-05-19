import React, { useState, useMemo, useEffect } from 'react'
import {
  Shield, Zap, Lock, Check, Radio, Beaker, Home, ChevronRight,
  Activity, Cpu, Eye, AlertTriangle, Compass, Heart, Wind,
  Sparkles, ArrowRight, X, Skull, Bell, Brain,
  Sunrise, BookOpen, Droplets, Sparkle, Backpack, Moon,
  Bone, Palette, Ghost, Footprints, Swords, Wrench,
  Pause, Timer, Users, MessageCircle, Headphones, ShieldCheck,
  UtensilsCrossed, Film, Package, Settings, RotateCcw,
  CheckCircle2, Clock, Star, Trophy, Target
} from 'lucide-react'
import { useLocalState } from './useLocalState'
import { LEVELS, MISSIONS, RESCUE_LIBRARY, MISSION_RESCUES, SHOP } from './data'
import {
  CornerBrackets, ScanLine, CategoryEmblem,
  MissionArt, BootHexagon, BlueprintRadar
} from './illustrations.jsx'

const MISSION_ICONS = {
  Sunrise, BookOpen, Droplets, Sparkle, Backpack, Moon,
  Skull, Bone, Palette, Ghost, Footprints, Swords, Wrench,
  Wind, Pause, Timer, Users, MessageCircle, Headphones, Sparkles, ShieldCheck,
  UtensilsCrossed, Film, Package
}

const CAT_ICONS = { Home, Beaker, Radio, Shield, Brain }

const STATE_ICONS = { agitated: Wind, bored: Compass, intense: Sparkles, sad: Heart, noise: AlertTriangle }

// ==================== COMPONENTES ====================

function ProgressRing({ value, max, size = 96 }) {
  const radius = (size - 12) / 2
  const circ = 2 * Math.PI * radius
  const offset = circ - (Math.min(value, max) / max) * circ
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`Progresso: ${value} de ${max} XP`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#1A2420" strokeWidth="6" />
        <circle
          cx={size/2} cy={size/2} r={radius} fill="none"
          stroke="#00FFC2" strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease-out', filter: 'drop-shadow(0 0 4px rgba(0,255,194,0.6))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-accent tabular-nums leading-none text-glow">{value}</span>
        <span className="text-tiny text-ink-tertiary font-mono mt-1">XP</span>
      </div>
    </div>
  )
}

function Badge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-bg-elevated text-ink-secondary border-bg-elevated',
    accent: 'bg-accent text-bg-base border-accent',
    success: 'bg-success-bg text-success border-success/30',
    warning: 'bg-warning-bg text-warning border-warning/30',
    info: 'bg-info-bg text-info border-info/30',
    danger: 'bg-danger-bg text-danger border-danger/30'
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-tiny font-semibold border ${styles[variant]}`}>
      {children}
    </span>
  )
}

function LiveClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="font-mono text-tiny text-ink-tertiary tabular-nums">
      {now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}

// ==================== APP ====================

export default function App() {
  const [xp, setXp] = useLocalState('xp', 340)
  const [streak, setStreak] = useLocalState('streak', 7)
  const [shields, setShields] = useLocalState('shields', 1)
  const [completedToday, setCompletedToday] = useLocalState('completedToday', ['base_check'])
  const [pending, setPending] = useLocalState('pending', [
    { id: 1, missionId: 'lab_fx', name: 'Workshop FX: Corte com látex', xp: 120, time: '14:22' },
    { id: 2, missionId: 'lab_ana', name: 'Anatomia: Estudo do crânio', xp: 80, time: '16:05' }
  ])
  const [purchased, setPurchased] = useLocalState('purchased', [])
  const [commandUnlocked, setCommandUnlocked] = useLocalState('commandUnlocked', false)

  const [tab, setTab] = useState('missions')
  const [showSelfReport, setShowSelfReport] = useState(false)
  const [rescue, setRescue] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [commandPin, setCommandPin] = useState('')
  const [showInstall, setShowInstall] = useState(false)
  const [bootSequence, setBootSequence] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setBootSequence(false), 1800)
    return () => clearTimeout(t)
  }, [])

  const currentLevel = useMemo(() => LEVELS.filter(l => xp >= l.threshold).pop(), [xp])
  const nextLevel = useMemo(() => LEVELS.find(l => l.threshold > xp), [xp])
  const xpToNext = nextLevel ? nextLevel.threshold - xp : 0
  const ringMax = nextLevel ? nextLevel.threshold - currentLevel.threshold : 1
  const ringValue = xp - currentLevel.threshold

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      window.deferredPrompt = e
      setShowInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const installApp = async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt()
      await window.deferredPrompt.userChoice
      window.deferredPrompt = null
      setShowInstall(false)
    }
  }

  const showFeedback = (msg, kind = 'success') => {
    setFeedback({ msg, kind })
    setTimeout(() => setFeedback(null), 2800)
  }

  const completeMission = (mission) => {
    if (completedToday.includes(mission.id)) return
    if (mission.auto) {
      setXp(xp + mission.xp)
      setCompletedToday([...completedToday, mission.id])
      showFeedback(`+${mission.xp} XP creditados`)
    } else {
      const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      setPending([...pending, { id: Date.now(), missionId: mission.id, name: mission.name, xp: mission.xp, time }])
      setCompletedToday([...completedToday, mission.id])
      showFeedback('Reportado ao Comando')
    }
  }

  const acceptRescue = () => {
    setRescue(null)
    setTab('missions')
    showFeedback('Rota alternativa aceita')
  }

  const handleSelfReport = (key) => {
    const r = RESCUE_LIBRARY[key]
    setRescue({ trigger: `Você reportou: ${r.label}`, context: 'Sinal recebido.', ...r })
    setShowSelfReport(false)
  }

  const approvePending = (item) => {
    setXp(xp + item.xp)
    setPending(pending.filter(p => p.id !== item.id))
    showFeedback(`+${item.xp} XP validados`)
  }

  const rejectPending = (item) => {
    setPending(pending.filter(p => p.id !== item.id))
    setCompletedToday(completedToday.filter(id => id !== item.missionId))
  }

  const buy = (item) => {
    if (xp < item.cost) return
    setXp(xp - item.cost)
    setPurchased([...purchased, { ...item, time: Date.now() }])
    showFeedback(`${item.name} resgatado`)
  }

  const resetAll = () => {
    if (!confirm('Resetar todos os dados? Esta ação não pode ser desfeita.')) return
    localStorage.clear()
    location.reload()
  }

  if (bootSequence) {
    return (
      <div className="fixed inset-0 bg-bg-base flex items-center justify-center overflow-hidden">
        <div className="text-center animate-fadeIn relative">
          <BootHexagon size={140} />
          <p className="text-tiny text-accent font-mono mt-4 tracking-[0.4em]">INICIALIZANDO</p>
          <h1 className="text-xl font-bold text-ink-primary tracking-[0.2em] mt-2 text-glow">OPERAÇÃO HORIZONTE</h1>
          <div className="mt-5 flex justify-center gap-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 bg-accent" style={{ animation: `pulse-subtle 1s ease-in-out infinite ${i * 0.2}s` }} />
            ))}
          </div>
          <p className="text-micro text-ink-muted font-mono mt-6 tracking-[0.3em]">v.0.1.0 · CLASSIFICADO</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base text-ink-primary relative">
      <ScanLine />
      {/* Skip link para leitores de tela */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-bg-base focus:px-4 focus:py-2 focus:rounded">
        Pular para conteúdo principal
      </a>

      {/* ============ RESCUE BANNER ============ */}
      {rescue && (
        <div
          role="alert"
          aria-live="assertive"
          className="sticky top-0 z-40 bg-bg-surface border-b-2 border-accent shadow-lg animate-fadeIn safe-top relative"
        >
          <CornerBrackets color="#00FFC2" size="lg" />
          <div className="max-w-2xl mx-auto px-4 py-3 relative">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-11 h-11 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                <Compass className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="accent">Rota Alternativa</Badge>
                </div>
                <h2 className="text-body font-bold text-ink-primary leading-snug">{rescue.trigger}</h2>

                <div className="mt-3 bg-bg-elevated rounded-lg p-3 border border-bg-elevated">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-tiny text-ink-tertiary uppercase tracking-wide mb-1 font-semibold">Sugestão</p>
                      <p className="text-small font-semibold text-ink-primary leading-snug">{rescue.suggestion}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-accent tabular-nums">+{rescue.xp}</div>
                      <div className="text-tiny text-ink-tertiary">XP</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-tiny text-ink-tertiary mt-2 pt-2 border-t border-bg-base">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" />{rescue.duration}</span>
                  </div>
                  <p className="text-tiny text-ink-secondary mt-1.5">{rescue.why}</p>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={acceptRescue}
                    className="flex-1 bg-accent text-bg-base px-4 py-3 rounded-md text-small font-bold hover:bg-accent-strong active:scale-[0.98] transition flex items-center justify-center gap-2"
                  >
                    Aceitar missão
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setRescue(null)}
                    className="px-4 py-3 rounded-md text-small font-medium text-ink-secondary hover:text-ink-primary hover:bg-bg-elevated transition"
                  >
                    Agora não
                  </button>
                </div>
              </div>
              <button
                onClick={() => setRescue(null)}
                aria-label="Fechar alerta"
                className="icon-btn shrink-0 text-ink-tertiary hover:text-ink-primary -mt-1 -mr-1"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ HEADER ============ */}
      <header className="safe-top bg-bg-surface border-b border-bg-elevated relative">
        {/* Status bar HUD */}
        <div className="relative border-b border-hud-line/40 bg-bg-base/40">
          <div className="max-w-2xl mx-auto px-4 py-1.5 flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-2 text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-subtle" />
              <span>LINK</span>
              <span className="text-ink-muted">·</span>
              <span className="tabular-nums text-ink-secondary">47.831 / -18.918</span>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <span>144.7MHz</span>
              <span className="text-ink-muted">·</span>
              <LiveClock />
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-4 relative">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Eye className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-tiny text-ink-tertiary uppercase tracking-wider font-mono">Operação Horizonte</p>
                <h1 className="text-body font-bold text-ink-primary leading-tight">Guardião</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LiveClock />
              <button
                onClick={() => setShowSelfReport(!showSelfReport)}
                aria-expanded={showSelfReport}
                aria-label="Reportar estado emocional"
                className="flex items-center gap-1.5 bg-bg-elevated hover:bg-bg-elevated/70 active:scale-95 transition px-3 py-2 rounded-md text-tiny font-semibold text-accent border border-accent/30"
              >
                <Heart className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Como estou?</span>
              </button>
            </div>
          </div>

          {/* Self-report panel */}
          {showSelfReport && (
            <div className="mb-4 bg-bg-elevated rounded-lg p-4 animate-fadeIn border border-accent/20" role="dialog" aria-label="Relatório de estado">
              <div className="flex items-center justify-between mb-3">
                <p className="text-small font-semibold text-ink-primary">Como você está agora?</p>
                <button
                  onClick={() => setShowSelfReport(false)}
                  aria-label="Fechar"
                  className="icon-btn text-ink-tertiary hover:text-ink-primary -mt-2 -mr-2"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(RESCUE_LIBRARY).map(([key, r]) => {
                  const Icon = STATE_ICONS[key]
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelfReport(key)}
                      className="flex items-center gap-2.5 bg-bg-surface hover:bg-bg-base hover:border-accent/50 active:scale-[0.98] transition p-3 rounded-md border border-bg-elevated text-left"
                    >
                      {Icon && <Icon className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />}
                      <span className="text-small text-ink-primary font-medium">{r.label}</span>
                    </button>
                  )
                })}
              </div>
              <p className="text-tiny text-ink-tertiary mt-3 italic">Reportar é uma missão de coragem.</p>
            </div>
          )}

          {/* Hero status */}
          <div className="bg-bg-elevated rounded-xl p-4 flex items-center gap-4">
            <ProgressRing value={ringValue} max={ringMax} size={96} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="accent">Nível {currentLevel.n}</Badge>
              </div>
              <h2 className="text-lg font-bold text-ink-primary leading-tight">{currentLevel.name}</h2>
              {nextLevel && (
                <p className="text-tiny text-ink-secondary mt-1">
                  <span className="text-accent font-semibold tabular-nums">{xpToNext} XP</span> até {nextLevel.name}
                </p>
              )}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-bg-surface rounded-md px-2.5 py-1.5">
                  <p className="text-tiny text-ink-tertiary">Streak</p>
                  <p className="text-small font-bold text-ink-primary tabular-nums">{streak} dias</p>
                </div>
                <div className="bg-bg-surface rounded-md px-2.5 py-1.5">
                  <p className="text-tiny text-ink-tertiary">Escudos</p>
                  <p className="text-small font-bold text-ink-primary tabular-nums flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-accent" aria-hidden="true" /> {shields}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending alert */}
          {tab === 'missions' && pending.length > 0 && (
            <button
              onClick={() => setTab('command')}
              className="w-full mt-3 bg-info-bg border border-info/40 rounded-lg p-3 flex items-center justify-between hover:bg-info-bg/70 active:scale-[0.99] transition group"
            >
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-info animate-pulse-subtle" aria-hidden="true" />
                <span className="text-small font-semibold text-info">
                  {pending.length} {pending.length === 1 ? 'missão aguardando' : 'missões aguardando'} validação
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-info group-hover:translate-x-0.5 transition" aria-hidden="true" />
            </button>
          )}
        </div>
      </header>

      {/* ============ MAIN ============ */}
      <main id="main" className="max-w-2xl mx-auto px-4 py-5 pb-32 animate-slideUp">
        {/* ===== MISSIONS ===== */}
        {tab === 'missions' && (
          <div className="space-y-6">
            {MISSIONS.map((cat) => {
              const catCompleted = cat.items.filter(m => completedToday.includes(m.id)).length
              const catTotal = cat.items.length
              const catPct = Math.round((catCompleted / catTotal) * 100)
              return (
                <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="shrink-0">
                      <CategoryEmblem category={cat.id} size={56} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 id={`cat-${cat.id}`} className="text-body font-bold text-ink-primary leading-tight">{cat.label}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-tiny text-ink-tertiary font-mono">
                          <span className="tabular-nums">{catCompleted}/{catTotal}</span> · {catPct}%
                        </p>
                        <div className="flex-1 h-px bg-gradient-to-r from-hud-line/60 to-transparent" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {cat.items.map((m) => {
                      const done = completedToday.includes(m.id)
                      const pendingThis = pending.some(p => p.missionId === m.id)
                      return (
                        <article
                          key={m.id}
                          aria-label={`Missão: ${m.name}`}
                          className={`card-interactive rounded-lg p-3.5 relative ${
                            done && !pendingThis
                              ? 'bg-bg-surface/40 opacity-60'
                              : pendingThis
                                ? 'bg-info-bg/40 border border-info/30'
                                : 'bg-bg-surface border border-bg-elevated'
                          }`}
                        >
                          {!done && !pendingThis && <CornerBrackets color="#00FFC2" size="sm" />}
                          <div className="flex items-start gap-3">
                            <div className={`shrink-0 ${done ? 'opacity-40' : ''}`}>
                              <MissionArt id={m.id} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-small font-bold text-ink-primary leading-snug">{m.name}</h3>
                              <p className="text-tiny text-ink-secondary mt-1 leading-relaxed">{m.desc}</p>
                              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                {m.streak && <Badge variant="accent">Streak</Badge>}
                                {m.auto && <Badge variant="success">Automática</Badge>}
                                {m.bonus && <Badge variant="warning">Bônus</Badge>}
                                {m.quick && <Badge variant="info">Rápida</Badge>}
                                {m.collab && <Badge variant="default">Com {m.collab}</Badge>}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              {done && !pendingThis ? (
                                <div className="w-9 h-9 rounded-full bg-success-bg border border-success/40 flex items-center justify-center" aria-label="Concluída">
                                  <CheckCircle2 className="w-5 h-5 text-success" aria-hidden="true" />
                                </div>
                              ) : pendingThis ? (
                                <div className="w-9 h-9 rounded-full bg-info-bg border border-info/40 flex items-center justify-center" aria-label="Aguardando validação">
                                  <Clock className="w-5 h-5 text-info animate-pulse-subtle" aria-hidden="true" />
                                </div>
                              ) : (
                                <div className="text-right">
                                  <div className="text-lg font-bold text-accent tabular-nums leading-none">+{m.xp}</div>
                                  <div className="text-tiny text-ink-tertiary mt-0.5">XP</div>
                                </div>
                              )}
                            </div>
                          </div>

                          {!done && (
                            <div className="mt-3 pt-3 border-t border-bg-elevated flex items-center justify-between gap-2">
                              {m.hasRescue && MISSION_RESCUES[m.id] ? (
                                <button
                                  onClick={() => setRescue({ trigger: 'Sem energia para esta missão?', context: '', ...MISSION_RESCUES[m.id] })}
                                  className="text-tiny font-semibold text-accent hover:text-accent-strong flex items-center gap-1.5 py-2"
                                >
                                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                                  Rota alternativa
                                </button>
                              ) : <span />}
                              <button
                                onClick={() => completeMission(m)}
                                className="bg-accent text-bg-base px-4 py-2.5 rounded-md text-tiny font-bold hover:bg-accent-strong active:scale-95 transition flex items-center gap-1.5 ml-auto"
                              >
                                Concluir
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          )}
                          {pendingThis && (
                            <div className="mt-3 pt-3 border-t border-info/20 text-tiny text-info flex items-center gap-1.5 font-medium">
                              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                              Aguardando validação do Comando
                            </div>
                          )}
                        </article>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        {/* ===== SHOP ===== */}
        {tab === 'shop' && (
          <div>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-ink-primary leading-tight">Mercado</h2>
                <p className="text-small text-ink-secondary mt-1">Troque XP por recompensas reais.</p>
              </div>
              <div className="text-right">
                <p className="text-tiny text-ink-tertiary uppercase tracking-wide">Saldo</p>
                <p className="text-lg font-bold text-accent tabular-nums flex items-center gap-1 justify-end">
                  <Zap className="w-4 h-4" aria-hidden="true" />{xp}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {SHOP.map((item) => {
                const canAfford = xp >= item.cost
                const SIcon = item.icon ? MISSION_ICONS[item.icon] : Package
                return (
                  <article key={item.id} className={`rounded-lg p-4 ${canAfford ? 'bg-bg-surface border border-accent/30' : 'bg-bg-surface/40 border border-bg-elevated opacity-70'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`shrink-0 w-14 h-14 rounded-md flex items-center justify-center ${canAfford ? 'bg-accent/10 border border-accent/30' : 'bg-bg-elevated/40'}`}>
                        <SIcon className={`w-6 h-6 ${canAfford ? 'text-accent' : 'text-ink-tertiary'}`} aria-hidden="true" strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-body font-bold text-ink-primary leading-tight">{item.name}</h3>
                        <p className="text-small text-ink-secondary mt-1">{item.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-bg-elevated gap-2">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-accent" aria-hidden="true" />
                        <span className="text-body font-bold text-ink-primary tabular-nums">{item.cost}</span>
                        <span className="text-tiny text-ink-tertiary">XP</span>
                      </div>
                      <button
                        onClick={() => buy(item)}
                        disabled={!canAfford}
                        className={`px-4 py-2.5 rounded-md text-small font-bold transition ${
                          canAfford
                            ? 'bg-accent text-bg-base hover:bg-accent-strong active:scale-95'
                            : 'bg-bg-elevated text-ink-tertiary cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Resgatar' : <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" aria-hidden="true" />Bloqueado</span>}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>

            {purchased.length > 0 && (
              <div className="mt-8">
                <h3 className="text-small font-bold text-ink-secondary mb-3 uppercase tracking-wide">Histórico recente</h3>
                <ul className="space-y-2">
                  {purchased.slice(-5).reverse().map((p, i) => (
                    <li key={i} className="bg-bg-surface/60 rounded-md p-3 flex justify-between items-center text-small">
                      <span className="text-ink-primary">{p.name}</span>
                      <span className="text-tiny text-ink-tertiary tabular-nums">{new Date(p.time).toLocaleDateString('pt-BR')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ===== COMMAND ===== */}
        {tab === 'command' && (
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-ink-primary leading-tight">Comando</h2>
              <p className="text-small text-ink-secondary mt-1">Painel da Jess e do Pai. Validação em lote.</p>
            </div>

            {!commandUnlocked ? (
              <div className="bg-bg-surface rounded-xl p-5 border border-bg-elevated max-w-sm mx-auto">
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-4 mx-auto">
                  <Lock className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-ink-primary text-center mb-1">Acesso restrito</h3>
                <p className="text-small text-ink-secondary text-center mb-4">Digite o código de 4 dígitos</p>
                <label htmlFor="pin-input" className="sr-only">PIN de acesso</label>
                <input
                  id="pin-input"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={commandPin}
                  onChange={(e) => setCommandPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="0000"
                  className="w-full bg-bg-input border-2 border-bg-elevated rounded-md px-4 py-3.5 text-center text-2xl tracking-[0.6em] font-mono focus:border-accent focus:outline-none tabular-nums"
                  autoComplete="off"
                />
                <button
                  onClick={() => {
                    if (commandPin === '2026') { setCommandUnlocked(true); setCommandPin('') }
                    else showFeedback('Código incorreto', 'error')
                  }}
                  className="w-full mt-3 bg-accent text-bg-base py-3.5 rounded-md text-body font-bold hover:bg-accent-strong active:scale-[0.98] transition"
                >
                  Autenticar
                </button>
                <p className="text-tiny text-ink-tertiary text-center mt-3">PIN padrão: <span className="font-mono">2026</span></p>
              </div>
            ) : (
              <>
                <div className="bg-bg-surface rounded-xl border border-bg-elevated mb-4 overflow-hidden">
                  <div className="px-4 py-3 bg-bg-elevated/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle" aria-hidden="true" />
                      <h3 className="text-small font-bold text-ink-primary">Fila de validação</h3>
                      <Badge variant="default">{pending.length}</Badge>
                    </div>
                    <span className="text-tiny text-ink-tertiary tabular-nums">{new Date().toLocaleDateString('pt-BR')}</span>
                  </div>
                  {pending.length === 0 ? (
                    <div className="p-6 text-center">
                      <div className="flex justify-center mb-3">
                        <BlueprintRadar size={140} />
                      </div>
                      <p className="text-body font-semibold text-ink-primary">Fila limpa</p>
                      <p className="text-small text-ink-tertiary mt-1 font-mono">SEM SINAL · SEM PENDÊNCIAS</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-bg-elevated">
                      {pending.map((p) => (
                        <li key={p.id} className="p-4">
                          <div className="mb-3">
                            <p className="text-small font-bold text-ink-primary leading-snug">{p.name}</p>
                            <div className="flex items-center gap-2 mt-1 text-tiny text-ink-tertiary">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" />{p.time}</span>
                              <span>·</span>
                              <span className="text-accent font-semibold tabular-nums">+{p.xp} XP</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => approvePending(p)}
                              className="flex-1 bg-success-bg border border-success/40 text-success py-2.5 rounded-md text-small font-bold hover:bg-success-bg/70 active:scale-[0.98] transition flex items-center justify-center gap-1.5"
                            >
                              <Check className="w-4 h-4" aria-hidden="true" />Aprovar
                            </button>
                            <button
                              onClick={() => rejectPending(p)}
                              className="flex-1 bg-bg-elevated border border-bg-elevated text-ink-secondary py-2.5 rounded-md text-small font-medium hover:bg-bg-elevated/70 active:scale-[0.98] transition"
                            >
                              Rejeitar
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-bg-surface rounded-md p-3 border border-bg-elevated">
                    <p className="text-tiny text-ink-tertiary uppercase tracking-wide">XP total</p>
                    <p className="text-lg font-bold text-accent tabular-nums mt-1">{xp}</p>
                  </div>
                  <div className="bg-bg-surface rounded-md p-3 border border-bg-elevated">
                    <p className="text-tiny text-ink-tertiary uppercase tracking-wide">Streak</p>
                    <p className="text-lg font-bold text-ink-primary tabular-nums mt-1">{streak}d</p>
                  </div>
                  <div className="bg-bg-surface rounded-md p-3 border border-bg-elevated">
                    <p className="text-tiny text-ink-tertiary uppercase tracking-wide">Pendentes</p>
                    <p className="text-lg font-bold text-ink-primary tabular-nums mt-1">{pending.length}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={resetAll}
                    className="w-full bg-danger-bg/50 border border-danger/30 text-danger py-2.5 rounded-md text-small font-semibold hover:bg-danger-bg transition flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />Resetar todos os dados
                  </button>
                  <button
                    onClick={() => setCommandUnlocked(false)}
                    className="w-full text-tiny font-semibold text-ink-tertiary hover:text-ink-secondary py-2"
                  >
                    Bloquear Comando
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* ============ BOTTOM NAV ============ */}
      <nav
        className="fixed bottom-0 inset-x-0 bg-bg-surface/95 backdrop-blur-md border-t border-bg-elevated safe-bottom z-30"
        role="navigation"
        aria-label="Navegação principal"
      >
        <div className="max-w-2xl mx-auto grid grid-cols-3">
          {[
            { id: 'missions', label: 'Missões', icon: Target },
            { id: 'shop', label: 'Mercado', icon: Package },
            { id: 'command', label: 'Comando', icon: Lock }
          ].map(t => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={active ? 'page' : undefined}
                className={`relative py-3 flex flex-col items-center gap-1 transition-colors ${
                  active ? 'text-accent' : 'text-ink-tertiary'
                }`}
              >
                {active && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-accent rounded-b-full" aria-hidden="true" />}
                <Icon className="w-5 h-5" aria-hidden="true" strokeWidth={active ? 2 : 1.75} />
                <span className={`text-tiny ${active ? 'font-bold' : 'font-medium'}`}>{t.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* ============ TOAST ============ */}
      {feedback && (
        <div className="fixed bottom-24 inset-x-4 z-50 max-w-sm mx-auto animate-slideUp" role="status" aria-live="polite">
          <div className={`rounded-lg px-4 py-3 shadow-2xl flex items-center gap-2.5 ${
            feedback.kind === 'error'
              ? 'bg-danger-bg border-2 border-danger text-danger'
              : 'bg-success-bg border-2 border-success text-success'
          }`}>
            {feedback.kind === 'error'
              ? <AlertTriangle className="w-5 h-5 shrink-0" aria-hidden="true" />
              : <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />}
            <span className="text-small font-semibold">{feedback.msg}</span>
          </div>
        </div>
      )}

      {/* ============ INSTALL PROMPT ============ */}
      {showInstall && (
        <div className="fixed bottom-24 inset-x-4 z-50 max-w-sm mx-auto bg-bg-surface border-2 border-accent rounded-lg p-3 shadow-2xl animate-slideUp">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-small font-bold text-ink-primary">Instalar app</p>
              <p className="text-tiny text-ink-secondary mt-0.5">Adicionar à tela inicial</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <button onClick={installApp} className="bg-accent text-bg-base px-3 py-2 rounded-md text-tiny font-bold">
                Instalar
              </button>
              <button onClick={() => setShowInstall(false)} className="text-tiny text-ink-tertiary">
                Agora não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
