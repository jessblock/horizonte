export const LEVELS = [
  { n: 1, name: 'RECRUTA DE CAMPO', threshold: 0 },
  { n: 2, name: 'EXPLORADOR DE ELITE', threshold: 500 },
  { n: 3, name: 'ESPECIALISTA EM REALIDADES', threshold: 1500 },
  { n: 4, name: 'MESTRE DO HORIZONTE', threshold: 3500 }
]

export const MISSIONS = [
  {
    id: 'BASE',
    label: 'MANUTENÇÃO DE BASE',
    icon: 'Home',
    items: [
      { id: 'base_check', name: 'Check-in Matinal', desc: 'Acordar e organizar o quarto', xp: 10, auto: true, icon: 'Sunrise' },
      { id: 'base_estudo', name: 'Protocolo Estudo', desc: 'Concluir deveres escolares', xp: 30, hasRescue: true, icon: 'BookOpen' },
      { id: 'base_hidro', name: 'Hidro-Estabilização', desc: 'Tomar banho em até 10 min', xp: 50, bonus: true, icon: 'Droplets' },
      { id: 'base_dente', name: 'Protocolo Dental', desc: 'Escovar os dentes manhã e noite', xp: 20, icon: 'Sparkle' },
      { id: 'base_mochila', name: 'Inventário de Combate', desc: 'Arrumar a mochila para o dia seguinte', xp: 25, icon: 'Backpack' },
      { id: 'base_sleep', name: 'Modo Recuperação', desc: 'Dormir no horário, sem tela 30min antes', xp: 40, icon: 'Moon' }
    ]
  },
  {
    id: 'LAB',
    label: 'LABORATÓRIO DE ARTES',
    icon: 'Beaker',
    items: [
      { id: 'lab_fx', name: 'Workshop FX', desc: 'Maquiagem de efeitos com Jess: cortes, cicatrizes', xp: 120, collab: 'Jess', icon: 'Skull' },
      { id: 'lab_ana', name: 'Anatomia Humana', desc: 'Desenho técnico, estilo Da Vinci', xp: 80, icon: 'Bone' },
      { id: 'lab_cust', name: 'Customização', desc: 'Pintura técnica de armaduras e props', xp: 100, icon: 'Palette' },
      { id: 'lab_criatura', name: 'Esboço de Criatura', desc: 'Inventar uma criatura ou personagem em 10 min', xp: 50, quick: true, icon: 'Ghost' },
      { id: 'lab_dino', name: 'Bestiário Pré-Histórico', desc: 'Desenhar 1 dinossauro com nome científico', xp: 60, quick: true, icon: 'Footprints' },
      { id: 'lab_tatic', name: 'Equipamento Tático', desc: 'Projetar 1 item (escudo, capacete, ferramenta)', xp: 60, quick: true, icon: 'Swords' },
      { id: 'lab_engen', name: 'Engenharia de Campo', desc: 'Construir com Lego, sucata ou papelão em 15 min', xp: 70, quick: true, icon: 'Wrench' }
    ]
  },
  {
    id: 'FOCO',
    label: 'PROTOCOLO DE FOCO',
    icon: 'Brain',
    items: [
      { id: 'foco_resp', name: 'Respiração 4-7-8', desc: 'Inspira 4s · segura 7s · expira 8s · 4 ciclos', xp: 20, quick: true, icon: 'Wind' },
      { id: 'foco_pausa', name: 'Pausa Estratégica', desc: 'Sair da tela por 5 min, alongar, beber água', xp: 15, quick: true, icon: 'Pause' },
      { id: 'foco_25', name: 'Sessão de 25min', desc: 'Foco profundo em 1 atividade, sem trocar', xp: 80, icon: 'Timer' }
    ]
  },
  {
    id: 'RADIO',
    label: 'MANUTENÇÃO E CONEXÃO',
    icon: 'Radio',
    items: [
      { id: 'radio_coop', name: 'Missão Co-op', desc: 'Ajudar Pai em tarefa real de casa', xp: 50, collab: 'Pai', icon: 'Users' },
      { id: 'radio_freq', name: 'Frequência Limpa', desc: 'Jantar conversando sobre criação', xp: 40, icon: 'MessageCircle' },
      { id: 'radio_gabi', name: 'Sinal para Gabi', desc: 'Conversar com Gabi por 10 min ou fazer algo juntos', xp: 50, collab: 'Gabi', icon: 'Headphones' },
      { id: 'radio_jess', name: 'Workshop com Jess', desc: 'Mostrar uma criação ou aprender algo novo com Jess', xp: 50, collab: 'Jess', icon: 'Sparkles' }
    ]
  },
  {
    id: 'SHIELD',
    label: 'ESCUDO PROTETOR',
    icon: 'Shield',
    items: [
      { id: 'shield_24', name: 'Curadoria Limpa 24h', desc: 'Consumir 3 conteúdos de FX, anatomia ou arte', xp: 150, streak: true, icon: 'ShieldCheck' }
    ]
  }
]

export const RESCUE_LIBRARY = {
  agitated: {
    label: 'Estou agitado',
    suggestion: 'Respiração 4-7-8: 4 ciclos',
    xp: 20, duration: '3 min',
    why: 'Regulação respiratória acalma o sistema nervoso'
  },
  bored: {
    label: 'Estou entediado',
    suggestion: 'Esboço de Criatura: inventar 1 criatura',
    xp: 50, duration: '10 min',
    why: 'Criação canaliza busca por estímulo'
  },
  intense: {
    label: 'Quero algo intenso',
    suggestion: 'Workshop FX: Treinar efeito de corte com Jess',
    xp: 120, duration: '20 min',
    why: 'Redireciona interesse por intensidade para arte cenográfica'
  },
  sad: {
    label: 'Estou triste',
    suggestion: 'Sinal para Gabi ou Co-op com Pai',
    xp: 50, duration: 'variável',
    why: 'Conexão social regula estado emocional'
  },
  noise: {
    label: 'Detectei Ruído',
    suggestion: 'Equipamento Tático: projetar 1 item',
    xp: 60, duration: '10 min',
    why: 'Substitui consumo passivo por criação ativa'
  }
}

export const MISSION_RESCUES = {
  base_estudo: {
    suggestion: 'Bestiário: desenhar 1 dinossauro',
    xp: 60, duration: '10 min',
    why: 'Energia baixa para leitura? Recarregue com desenho técnico'
  }
}

export const SHOP = [
  { id: 'shop_jantar', cost: 200, name: 'ESCOLHER O JANTAR', desc: 'Você decide o cardápio da família', icon: 'UtensilsCrossed' },
  { id: 'shop_cinema', cost: 500, name: 'CINEMA OU PASSEIO', desc: 'Programa especial no fim de semana', icon: 'Film' },
  { id: 'shop_loot', cost: 1500, name: 'LOOT BOX REAL', desc: 'Material de arte ou action figure novo', icon: 'Package' }
]
