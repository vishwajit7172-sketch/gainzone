export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulder' | 'arms' | 'core' | 'calisthenics'

export type Exercise = {
  id: string
  name: string
  muscle: MuscleGroup
  type: 'compound' | 'isolation'
  equipment: 'barbell' | 'dumbbell' | 'machine' | 'bodyweight' | 'cable'
  sets: string
  reps: string
  muscles: string
  steps: string[]
  tip: string
  cues: string[]
}

export const exercises: Exercise[] = [
  {
    id: 'bench',
    name: 'Barbell Bench Press',
    muscle: 'chest',
    type: 'compound',
    equipment: 'barbell',
    sets: '4',
    reps: '6–10',
    muscles: 'Pectoralis Major, Front Delts, Triceps',
    steps: [
      'Lie flat on bench. Retract shoulder blades and create a slight natural arch in your lower back.',
      'Grip bar just outside shoulder width. Wrists straight, elbows at 45–75° from torso.',
      'Unrack the bar and position it over your lower chest / nipple line.',
      'Lower with full control until bar lightly touches your chest.',
      'Press bar upward and slightly back toward the rack in one smooth motion.',
      'Lock out at top without hyperextending elbows.'
    ],
    tip: 'Think about "bending the bar" outward with your hands — it activates your chest more than just pushing.',
    cues: ['Chest up', 'Elbows in', 'Drive feet into floor', 'Squeeze at top']
  },
  {
    id: 'incline',
    name: 'Incline DB Press',
    muscle: 'chest',
    type: 'compound',
    equipment: 'dumbbell',
    sets: '3',
    reps: '8–12',
    muscles: 'Upper Pectoralis, Front Delts',
    steps: [
      'Set bench to 30–45°. Sit back with dumbbells on thighs.',
      'Kick DBs up to shoulder height as you lie back.',
      'Position DBs at chest level, elbows at 70° angle.',
      'Press up and slightly inward — DBs nearly touch at the top.',
      'Lower slowly feeling upper chest stretch.'
    ],
    tip: '30° incline hits upper chest better than 45°, which shifts load to front delts.',
    cues: ['Control descent', 'Touch at top', 'Slight inward arc']
  },
  {
    id: 'squat',
    name: 'Barbell Back Squat',
    muscle: 'legs',
    type: 'compound',
    equipment: 'barbell',
    sets: '4',
    reps: '6–10',
    muscles: 'Quadriceps, Glutes, Hamstrings, Erectors',
    steps: [
      'Set bar on rack at upper-chest height. Step under bar, position across upper traps.',
      'Unrack. Feet shoulder-width, toes angled 15–30° outward.',
      'Take a deep breath, brace your core hard (like taking a punch).',
      'Initiate by pushing knees out over toes as you sit back and down.',
      'Lower until hip crease is below the top of your knee.',
      'Drive through your full foot. Keep knees tracking over toes throughout.'
    ],
    tip: 'Film yourself from the side to check depth. Butt wink = go shallower until you build hip mobility.',
    cues: ['Knees out', 'Chest tall', 'Full breath', 'Drive through heel']
  },
  {
    id: 'rdl',
    name: 'Romanian Deadlift',
    muscle: 'legs',
    type: 'compound',
    equipment: 'barbell',
    sets: '3',
    reps: '10–12',
    muscles: 'Hamstrings, Glutes, Erectors',
    steps: [
      'Stand with feet hip-width, bar in overhand grip at hip height.',
      'Hinge at hips — push hips backward while keeping slight knee bend.',
      'Lower bar along your legs until you feel a deep hamstring stretch.',
      'Stop before your back rounds (typically mid-shin).',
      'Drive hips forward to return to standing. Squeeze glutes hard at top.'
    ],
    tip: 'If you feel it in your lower back, you\'re bending your knees too much. Think "hips back", not "knees bend".',
    cues: ['Hips back', 'Bar close to legs', 'Hamstring stretch', 'Squeeze glutes']
  },
  {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    muscle: 'back',
    type: 'compound',
    equipment: 'barbell',
    sets: '4',
    reps: '4–6',
    muscles: 'Hamstrings, Glutes, Erectors, Traps, Lats',
    steps: [
      'Stand with bar over mid-foot. Feet hip-width, grip just outside legs.',
      'Hinge down, grab bar. Shoulders slightly in front of bar. Lats engaged.',
      'Take a big breath, brace hard. Create tension before the pull.',
      'Push the floor away (leg press cue) while keeping bar close to body.',
      'Lock hips and knees out simultaneously at top. No hyperextension.',
      'Hinge back down to lower. Rerack or touch-and-go.'
    ],
    tip: 'Think "push the floor away" not "pull the bar up" — it keeps your hips lower and back safer.',
    cues: ['Bar over mid-foot', 'Lat spread', 'Big breath', 'Push floor away']
  },
  {
    id: 'pullup',
    name: 'Pull-up',
    muscle: 'back',
    type: 'compound',
    equipment: 'bodyweight',
    sets: '3–4',
    reps: 'Max reps',
    muscles: 'Latissimus Dorsi, Biceps, Rear Delts',
    steps: [
      'Hang from bar, hands slightly wider than shoulders, palms facing away.',
      'Engage core. Pull shoulder blades down and back before pulling with arms.',
      'Drive elbows toward hips — "pull bar to chest" cue.',
      'Pull until chin clearly clears the bar.',
      'Lower yourself fully (3 seconds) to a dead hang.',
      'No kipping unless training for it.'
    ],
    tip: 'Can\'t do one? Use a band for assistance or do negative reps (jump to top, lower for 5 seconds).',
    cues: ['Shoulders down first', 'Elbows to hips', 'Full hang', 'Control descent']
  },
  {
    id: 'row',
    name: 'Barbell Bent-Over Row',
    muscle: 'back',
    type: 'compound',
    equipment: 'barbell',
    sets: '4',
    reps: '8–10',
    muscles: 'Lats, Rhomboids, Rear Delts, Biceps',
    steps: [
      'Hip-hinge to 45–60°. Grip bar just outside shoulder width.',
      'Brace core. Bar hangs at arm\'s length below your chest.',
      'Pull bar to lower abdomen / navel — NOT your chest.',
      'Lead with your elbows, squeeze shoulder blades together at the top.',
      'Lower with control. Maintain the same torso angle throughout.'
    ],
    tip: 'Row to your belly button, not your chest — this maximizes lat engagement vs rear delt.',
    cues: ['Hinge tight', 'Elbows lead', 'Row to navel', 'Squeeze back']
  },
  {
    id: 'ohp',
    name: 'Overhead Press',
    muscle: 'shoulder',
    type: 'compound',
    equipment: 'barbell',
    sets: '4',
    reps: '6–10',
    muscles: 'Deltoids (all heads), Triceps, Upper Traps',
    steps: [
      'Stand with feet shoulder-width. Bar at collar-bone height, grip just outside shoulders.',
      'Big breath and brace your core hard. Glutes squeezed.',
      'Press bar straight up — push your head slightly forward as bar passes face.',
      'Bar ends directly above ears, arms fully locked out.',
      'Lower bar back to collar with control.'
    ],
    tip: 'Lower back arching excessively = weak core, not weak shoulders. Brace harder and reduce weight.',
    cues: ['Core tight', 'Push head through', 'Vertical bar path', 'Full lockout']
  },
  {
    id: 'lateral',
    name: 'Lateral Raise',
    muscle: 'shoulder',
    type: 'isolation',
    equipment: 'dumbbell',
    sets: '3–4',
    reps: '12–20',
    muscles: 'Medial Deltoid',
    steps: [
      'Stand with light DBs at sides, slight elbow bend throughout.',
      'Raise arms outward to shoulder height — lead with your elbows, not your hands.',
      'Think "pour a jug of water" at the top — pinky side slightly higher.',
      'Hold briefly at top. Lower slowly (3–4 counts).',
      'Don\'t shrug or use momentum.'
    ],
    tip: 'Use lighter weight than you think. Most people use far too heavy for laterals — the muscle is tiny.',
    cues: ['Lead with elbows', 'Slow descent', 'No shrug', 'Pinky up']
  },
  {
    id: 'curl',
    name: 'Barbell Curl',
    muscle: 'arms',
    type: 'isolation',
    equipment: 'barbell',
    sets: '3',
    reps: '10–12',
    muscles: 'Biceps Brachii, Brachialis',
    steps: [
      'Stand with barbell, underhand grip shoulder-width.',
      'Pin elbows to sides — they should barely move.',
      'Curl bar up by flexing elbow. No body swing.',
      'Squeeze bicep hard at top for 1 second.',
      'Lower with full control to complete extension.'
    ],
    tip: 'Slow eccentrics (lowering) grow biceps faster than fast ones. Count 3 seconds down every rep.',
    cues: ['Elbows pinned', 'Full range', 'Squeeze at top', '3 count down']
  },
  {
    id: 'tricep',
    name: 'Tricep Pushdown',
    muscle: 'arms',
    type: 'isolation',
    equipment: 'cable',
    sets: '3',
    reps: '12–15',
    muscles: 'Triceps Brachii (all 3 heads)',
    steps: [
      'Stand facing cable machine, rope or bar attachment at upper position.',
      'Grip attachment, elbows at sides, upper arms vertical.',
      'Push attachment downward until arms fully extended.',
      'Flare wrists out at bottom (with rope) for full contraction.',
      'Return slowly to starting position — elbows stay by your side.'
    ],
    tip: 'Lean slightly forward and keep upper arms completely still. Any movement = you\'re cheating.',
    cues: ['Elbows fixed', 'Full extension', 'Wrist flare', 'Control up']
  },
  {
    id: 'plank',
    name: 'Plank',
    muscle: 'core',
    type: 'isolation',
    equipment: 'bodyweight',
    sets: '3',
    reps: '45–60 seconds',
    muscles: 'Transverse Abdominis, Rectus Abdominis, Glutes',
    steps: [
      'Forearms on floor, elbows under shoulders. Up on toes.',
      'Form a straight line from head to heels — no sagging hips.',
      'Engage glutes and core hard. Tuck pelvis slightly.',
      'Look at the floor. Breathe normally.',
      'Hold for the target time without breaking form.'
    ],
    tip: 'A 30-second perfect plank beats a 2-minute sagging one. Quality over time.',
    cues: ['Hips level', 'Glutes squeezed', 'Breathe', 'Head neutral']
  },
  // CALISTHENICS
  {
    id: 'pushup',
    name: 'Push-up',
    muscle: 'calisthenics',
    type: 'compound',
    equipment: 'bodyweight',
    sets: '4',
    reps: '15–20',
    muscles: 'Pectoralis Major, Triceps, Front Delts',
    steps: [
      'High plank position. Hands slightly wider than shoulders.',
      'Keep body rigid — straight line head to heel.',
      'Lower chest to floor with elbows at ~45°.',
      'Push through full hand — especially base of palm.',
      'Lock elbows at top. Squeeze chest.'
    ],
    tip: 'Too easy? Elevate feet or add a weighted vest. Too hard? Start on knees and build to full.',
    cues: ['Rigid body', 'Elbows 45°', 'Full range', 'Squeeze chest']
  },
  {
    id: 'dips',
    name: 'Dips',
    muscle: 'calisthenics',
    type: 'compound',
    equipment: 'bodyweight',
    sets: '3–4',
    reps: '8–15',
    muscles: 'Triceps, Pectoralis Major (lower), Front Delts',
    steps: [
      'Support yourself on parallel bars, arms locked out.',
      'Lean slightly forward to engage chest more (or stay upright for triceps focus).',
      'Lower yourself until upper arms are parallel to floor.',
      'Drive yourself back up to full lockout.',
      'Control the descent — no dropping.'
    ],
    tip: 'Leaning forward = more chest. Staying upright = more triceps. Pick your target.',
    cues: ['Control descent', 'Full lockout', 'Lean for chest', 'Elbows close']
  },
  {
    id: 'muscleup',
    name: 'Muscle-Up',
    muscle: 'calisthenics',
    type: 'compound',
    equipment: 'bodyweight',
    sets: '3',
    reps: '3–8',
    muscles: 'Lats, Chest, Triceps, Biceps',
    steps: [
      'Dead hang from bar. Generate slight body swing (kip).',
      'Explosively pull bar down toward hips (NOT your chin).',
      'As bar reaches chest, transition wrists over bar.',
      'Push up into dip position to complete the move.',
      'Lower under control.'
    ],
    tip: 'Prerequisites: 15 strict pull-ups + 15 dips. Build those first before attempting muscle-ups.',
    cues: ['Explosive pull', 'Bar to hips', 'Fast transition', 'Push through']
  },
  {
    id: 'pistol',
    name: 'Pistol Squat',
    muscle: 'calisthenics',
    type: 'compound',
    equipment: 'bodyweight',
    sets: '3',
    reps: '5–10 each leg',
    muscles: 'Quadriceps, Glutes, Ankle Stability',
    steps: [
      'Stand on one foot, extend other leg forward.',
      'Reach arms forward for counter-balance.',
      'Sit down on one leg as deep as possible — keep heel grounded.',
      'Drive through heel to stand back up.',
      'Switch legs.'
    ],
    tip: 'Use a doorframe for balance assist. Build ankle mobility by doing assisted versions daily.',
    cues: ['Heel planted', 'Arms forward', 'Go deep', 'Drive through heel']
  },
  {
    id: 'lsit',
    name: 'L-Sit',
    muscle: 'calisthenics',
    type: 'isolation',
    equipment: 'bodyweight',
    sets: '3',
    reps: '10–30 seconds',
    muscles: 'Hip Flexors, Core, Triceps',
    steps: [
      'Support yourself on parallel bars or floor with arms locked.',
      'Raise both legs parallel to floor.',
      'Keep toes pointed, legs straight.',
      'Hold position. Breathe normally.',
      'Build time progressively.'
    ],
    tip: 'Start with tucked L-sit (knees bent to chest), then one leg, then both legs extended.',
    cues: ['Arms locked', 'Legs parallel', 'Toes pointed', 'Breathe']
  }
]

export const pplProgram = {
  name: 'Push / Pull / Legs',
  days: [
    { day: 'Monday', type: 'Push', focus: 'Chest, Shoulders, Triceps', exercises: ['bench', 'incline', 'ohp', 'lateral', 'tricep'] },
    { day: 'Tuesday', type: 'Pull', focus: 'Back, Biceps, Rear Delts', exercises: ['deadlift', 'pullup', 'row', 'curl'] },
    { day: 'Wednesday', type: 'Legs', focus: 'Quads, Hamstrings, Calves', exercises: ['squat', 'rdl'] },
    { day: 'Thursday', type: 'Rest', focus: 'Recovery', exercises: [] },
    { day: 'Friday', type: 'Push', focus: 'Chest, Shoulders, Triceps', exercises: ['bench', 'lateral', 'ohp', 'tricep'] },
    { day: 'Saturday', type: 'Pull', focus: 'Back, Biceps', exercises: ['pullup', 'row', 'deadlift', 'curl'] },
    { day: 'Sunday', type: 'Rest', focus: 'Full Rest', exercises: [] },
  ]
}

export const calisthenicsProgram = {
  name: 'Calisthenics Fundamentals',
  days: [
    { day: 'Monday', type: 'Push', focus: 'Push Strength', exercises: ['pushup', 'dips', 'plank'] },
    { day: 'Tuesday', type: 'Pull', focus: 'Pull Strength', exercises: ['pullup', 'muscleup'] },
    { day: 'Wednesday', type: 'Legs', focus: 'Lower Body', exercises: ['pistol', 'squat'] },
    { day: 'Thursday', type: 'Rest', focus: 'Active Recovery', exercises: [] },
    { day: 'Friday', type: 'Skills', focus: 'Skill Work', exercises: ['muscleup', 'lsit', 'dips'] },
    { day: 'Saturday', type: 'Full', focus: 'Full Body', exercises: ['pushup', 'pullup', 'pistol', 'plank'] },
    { day: 'Sunday', type: 'Rest', focus: 'Rest', exercises: [] },
  ]
}
