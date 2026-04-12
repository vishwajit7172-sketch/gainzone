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
  // ── CHEST ──────────────────────────────────────────────
  {
    id: 'bench',
    name: 'Barbell Bench Press',
    muscle: 'chest', type: 'compound', equipment: 'barbell',
    sets: '4', reps: '6–10', muscles: 'Pectoralis Major, Front Delts, Triceps',
    steps: ['Lie flat on bench. Retract shoulder blades and arch lower back slightly.','Grip bar just outside shoulder width. Wrists straight, elbows at 45–75°.','Unrack and position bar over lower chest.','Lower with full control until bar touches chest.','Press upward and slightly back in one smooth motion.','Lock out at top without hyperextending elbows.'],
    tip: 'Think "bend the bar" outward — it activates your chest more than just pushing.',
    cues: ['Chest up', 'Elbows in', 'Drive feet into floor', 'Squeeze at top']
  },
  {
    id: 'incline',
    name: 'Incline DB Press',
    muscle: 'chest', type: 'compound', equipment: 'dumbbell',
    sets: '3', reps: '8–12', muscles: 'Upper Pectoralis, Front Delts',
    steps: ['Set bench to 30–45°. Sit back with dumbbells on thighs.','Kick DBs up to shoulder height as you lie back.','Position DBs at chest level, elbows at 70°.','Press up and slightly inward — DBs nearly touch at top.','Lower slowly feeling upper chest stretch.'],
    tip: '30° incline hits upper chest better than 45°, which shifts load to front delts.',
    cues: ['Control descent', 'Touch at top', 'Slight inward arc']
  },
  {
    id: 'chest_fly',
    name: 'Cable Chest Fly',
    muscle: 'chest', type: 'isolation', equipment: 'cable',
    sets: '3', reps: '12–15', muscles: 'Pectoralis Major (sternal head)',
    steps: ['Set both cables to shoulder height. Stand in center.','Grab handles, step forward into a split stance.','With slight elbow bend, bring hands together in front of chest in an arc.','Squeeze chest hard at the peak contraction.','Return slowly with arms wide — feel the stretch.'],
    tip: 'Cables keep constant tension throughout the full range — far better than dumbbells for flies.',
    cues: ['Slight elbow bend', 'Hug a tree', 'Squeeze at center', 'Slow return']
  },
  {
    id: 'pec_deck',
    name: 'Pec Deck Machine',
    muscle: 'chest', type: 'isolation', equipment: 'machine',
    sets: '3', reps: '12–15', muscles: 'Pectoralis Major, Anterior Deltoid',
    steps: ['Sit with back flat against pad. Adjust seat so handles are at chest height.','Place forearms on pads with elbows at 90°.','Drive elbows together in front of chest — squeeze hard.','Hold contraction 1 second at peak.','Return slowly, feeling the chest stretch.'],
    tip: 'Great finishing movement. Keep your back pressed into the pad throughout — no leaning forward.',
    cues: ['Back on pad', 'Drive elbows', 'Full squeeze', 'Slow return']
  },
  {
    id: 'chest_press_machine',
    name: 'Chest Press Machine',
    muscle: 'chest', type: 'compound', equipment: 'machine',
    sets: '3', reps: '10–12', muscles: 'Pectoralis Major, Triceps, Front Delts',
    steps: ['Adjust seat so handles are at mid-chest height.','Sit with back flat. Grip handles, elbows at 45–60°.','Press forward until arms nearly locked out.','Return handles slowly — do not let weight stack touch.','Keep tension throughout the entire set.'],
    tip: 'Machines are great for beginners or end-of-workout burnouts. No stabilizer fatigue.',
    cues: ['Back flat', 'Controlled press', 'No lockout', 'Tension always']
  },

  // ── BACK ───────────────────────────────────────────────
  {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    muscle: 'back', type: 'compound', equipment: 'barbell',
    sets: '4', reps: '4–6', muscles: 'Hamstrings, Glutes, Erectors, Traps, Lats',
    steps: ['Bar over mid-foot. Feet hip-width, grip just outside legs.','Hinge down, grab bar. Shoulders slightly in front of bar. Lats engaged.','Big breath, brace hard. Create tension before the pull.','Push the floor away while keeping bar close to body.','Lock hips and knees simultaneously at top. No hyperextension.','Hinge back down to lower.'],
    tip: 'Think "push the floor away" not "pull the bar up" — keeps hips lower and back safer.',
    cues: ['Bar over mid-foot', 'Lat spread', 'Big breath', 'Push floor away']
  },
  {
    id: 'pullup',
    name: 'Pull-up',
    muscle: 'back', type: 'compound', equipment: 'bodyweight',
    sets: '3–4', reps: 'Max reps', muscles: 'Latissimus Dorsi, Biceps, Rear Delts',
    steps: ['Hang from bar, hands slightly wider than shoulders, palms away.','Pull shoulder blades down before pulling with arms.','Drive elbows toward hips — "pull bar to chest" cue.','Pull until chin clears the bar.','Lower fully (3 seconds) to dead hang.'],
    tip: 'Can\'t do one? Use a band or do negative reps (jump to top, lower 5 seconds).',
    cues: ['Shoulders down first', 'Elbows to hips', 'Full hang', 'Control descent']
  },
  {
    id: 'row',
    name: 'Barbell Bent-Over Row',
    muscle: 'back', type: 'compound', equipment: 'barbell',
    sets: '4', reps: '8–10', muscles: 'Lats, Rhomboids, Rear Delts, Biceps',
    steps: ['Hip-hinge to 45–60°. Grip bar just outside shoulder width.','Brace core. Bar hangs at arm\'s length.','Pull bar to lower abdomen — NOT your chest.','Lead with elbows, squeeze shoulder blades at top.','Lower with control. Maintain torso angle throughout.'],
    tip: 'Row to belly button, not chest — maximizes lat engagement vs rear delt.',
    cues: ['Hinge tight', 'Elbows lead', 'Row to navel', 'Squeeze back']
  },
  {
    id: 'lat_pulldown',
    name: 'Lat Pulldown',
    muscle: 'back', type: 'compound', equipment: 'machine',
    sets: '3–4', reps: '10–12', muscles: 'Latissimus Dorsi, Biceps, Rear Delts',
    steps: ['Sit at machine, thighs secured under pads. Grip bar wider than shoulders.','Lean back slightly (10–15°). Pull bar down toward upper chest.','Lead with elbows driving down and back.','Squeeze lats hard when bar reaches chest.','Return bar slowly — feel full lat stretch at top.'],
    tip: 'Pull to your upper chest, not your chin. Leaning too far back turns it into a row.',
    cues: ['Slight lean back', 'Elbows down', 'Bar to chest', 'Full stretch up']
  },
  {
    id: 'seated_cable_row',
    name: 'Seated Cable Row',
    muscle: 'back', type: 'compound', equipment: 'cable',
    sets: '3', reps: '10–12', muscles: 'Lats, Rhomboids, Rear Delts, Biceps',
    steps: ['Sit upright at cable row station, feet on platform, slight knee bend.','Grip handle with both hands. Sit tall — no rounding.','Pull handle to lower abdomen, driving elbows back.','Squeeze shoulder blades together hard at peak.','Return with control, letting shoulders protract fully.'],
    tip: 'Don\'t use your lower back to row — it should be stable. All movement from the arms and shoulders.',
    cues: ['Sit tall', 'Elbows back', 'Squeeze blades', 'Control return']
  },
  {
    id: 'db_row',
    name: 'Dumbbell Single-Arm Row',
    muscle: 'back', type: 'compound', equipment: 'dumbbell',
    sets: '3', reps: '10–12 each', muscles: 'Lats, Rhomboids, Rear Delts',
    steps: ['Place one knee and hand on bench. Back parallel to floor.','Hang dumbbell at arm\'s length below shoulder.','Pull DB up and back — elbow drives to ceiling.','Squeeze lat hard at top.','Lower fully — full stretch at bottom.'],
    tip: 'Use a full range of motion. Most people short-change the bottom stretch — that\'s where the growth is.',
    cues: ['Back parallel', 'Elbow to ceiling', 'Full stretch', 'Squeeze lat']
  },

  // ── LEGS ───────────────────────────────────────────────
  {
    id: 'squat',
    name: 'Barbell Back Squat',
    muscle: 'legs', type: 'compound', equipment: 'barbell',
    sets: '4', reps: '6–10', muscles: 'Quadriceps, Glutes, Hamstrings, Erectors',
    steps: ['Set bar at upper-chest height. Step under, position across upper traps.','Unrack. Feet shoulder-width, toes 15–30° outward.','Big breath, brace core hard.','Push knees out over toes as you sit back and down.','Lower until hip crease is below knee top.','Drive through full foot, knees tracking toes.'],
    tip: 'Film from the side to check depth. Butt wink = go shallower until you build hip mobility.',
    cues: ['Knees out', 'Chest tall', 'Full breath', 'Drive through heel']
  },
  {
    id: 'rdl',
    name: 'Romanian Deadlift',
    muscle: 'legs', type: 'compound', equipment: 'barbell',
    sets: '3', reps: '10–12', muscles: 'Hamstrings, Glutes, Erectors',
    steps: ['Stand with feet hip-width, bar in overhand grip at hip height.','Hinge at hips — push hips backward, keep slight knee bend.','Lower bar along legs until deep hamstring stretch.','Stop before back rounds (typically mid-shin).','Drive hips forward to stand. Squeeze glutes at top.'],
    tip: 'If you feel it in lower back, you\'re bending knees too much. Think "hips back", not "knees bend".',
    cues: ['Hips back', 'Bar close to legs', 'Hamstring stretch', 'Squeeze glutes']
  },
  {
    id: 'leg_press',
    name: 'Leg Press',
    muscle: 'legs', type: 'compound', equipment: 'machine',
    sets: '4', reps: '10–15', muscles: 'Quadriceps, Glutes, Hamstrings',
    steps: ['Sit in machine, back and head against pad.','Place feet shoulder-width on platform — higher = more glutes, lower = more quads.','Release safety handles. Lower platform until knees reach 90°.','Press platform up — do NOT lock knees out completely.','Control the descent every rep.'],
    tip: 'Never lock out knees at the top — keeps tension on the muscle and protects your joints.',
    cues: ['Back flat', 'Knees track toes', 'No full lockout', 'Control down']
  },
  {
    id: 'leg_extension',
    name: 'Leg Extension',
    muscle: 'legs', type: 'isolation', equipment: 'machine',
    sets: '3', reps: '12–15', muscles: 'Quadriceps (all 4 heads)',
    steps: ['Sit in machine, back against pad. Adjust so knee joint aligns with machine pivot.','Hook ankles under pad.','Extend legs fully, squeezing quads hard at top.','Hold 1 second at peak contraction.','Lower slowly — 3 count down.'],
    tip: 'Best used as a finisher after compound leg work. Great quad isolation.',
    cues: ['Full extension', 'Squeeze at top', '3 count down', 'Knee aligned']
  },
  {
    id: 'leg_curl',
    name: 'Lying Leg Curl',
    muscle: 'legs', type: 'isolation', equipment: 'machine',
    sets: '3', reps: '12–15', muscles: 'Hamstrings (biceps femoris)',
    steps: ['Lie face down. Adjust so knees are at edge of pad, ankles hooked under roller.','Curl legs up toward glutes as far as possible.','Squeeze hamstrings hard at peak.','Lower slowly back to start — full extension.'],
    tip: 'Point toes slightly to increase hamstring activation. Avoid lifting hips off the pad.',
    cues: ['Hips down', 'Full curl', 'Squeeze hams', 'Slow descent']
  },
  {
    id: 'hip_thrust',
    name: 'Barbell Hip Thrust',
    muscle: 'legs', type: 'compound', equipment: 'barbell',
    sets: '3–4', reps: '10–15', muscles: 'Glutes (maximus), Hamstrings',
    steps: ['Sit against a bench, barbell across hips (use a pad).','Feet flat, shoulder-width, knees bent at 90°.','Drive hips upward by squeezing glutes — until body is flat.','Hold 1–2 seconds at top. Squeeze glutes maximally.','Lower hips back toward floor — don\'t touch.'],
    tip: 'Best glute exercise that exists. Add a resistance band around knees for extra activation.',
    cues: ['Drive hips up', 'Squeeze glutes', 'Body flat at top', 'Don\'t touch floor']
  },
  {
    id: 'calf_raise',
    name: 'Standing Calf Raise',
    muscle: 'legs', type: 'isolation', equipment: 'machine',
    sets: '4', reps: '15–20', muscles: 'Gastrocnemius, Soleus',
    steps: ['Stand on calf raise machine or step edge with balls of feet on platform.','Lower heels below platform — full stretch.','Rise up as high as possible on toes.','Hold peak contraction 1 second.','Lower slowly — 3 count down.'],
    tip: 'Calves respond best to high reps and slow tempo. Don\'t rush these.',
    cues: ['Full stretch down', 'High as possible', 'Hold at top', '3 count down']
  },

  // ── SHOULDERS ──────────────────────────────────────────
  {
    id: 'ohp',
    name: 'Overhead Press',
    muscle: 'shoulder', type: 'compound', equipment: 'barbell',
    sets: '4', reps: '6–10', muscles: 'Deltoids (all heads), Triceps, Upper Traps',
    steps: ['Stand feet shoulder-width. Bar at collar-bone, grip just outside shoulders.','Big breath and brace core. Glutes squeezed.','Press bar straight up — push head slightly forward as bar passes face.','Bar ends directly above ears, arms fully locked.','Lower bar back to collar with control.'],
    tip: 'Lower back arching = weak core. Brace harder and reduce weight.',
    cues: ['Core tight', 'Push head through', 'Vertical bar path', 'Full lockout']
  },
  {
    id: 'lateral',
    name: 'Lateral Raise',
    muscle: 'shoulder', type: 'isolation', equipment: 'dumbbell',
    sets: '3–4', reps: '12–20', muscles: 'Medial Deltoid',
    steps: ['Stand with light DBs at sides, slight elbow bend throughout.','Raise arms outward to shoulder height — lead with elbows.','Pinky side slightly higher at top ("pour water" cue).','Hold briefly. Lower slowly (3–4 counts).','Don\'t shrug or use momentum.'],
    tip: 'Use lighter than you think. Most people use far too heavy for laterals.',
    cues: ['Lead with elbows', 'Slow descent', 'No shrug', 'Pinky up']
  },
  {
    id: 'seated_db_press',
    name: 'Seated DB Shoulder Press',
    muscle: 'shoulder', type: 'compound', equipment: 'dumbbell',
    sets: '3–4', reps: '8–12', muscles: 'Anterior & Medial Deltoid, Triceps',
    steps: ['Sit on bench with back support. DBs at shoulder height, palms forward.','Press both DBs upward until nearly touching at top.','Do not fully lock elbows — keep tension.','Lower slowly back to shoulder level.'],
    tip: 'Seated version reduces lower back involvement — better for isolation.',
    cues: ['Back supported', 'Press overhead', 'Control descent', 'No full lockout']
  },
  {
    id: 'face_pull',
    name: 'Face Pull',
    muscle: 'shoulder', type: 'isolation', equipment: 'cable',
    sets: '3', reps: '15–20', muscles: 'Rear Delts, Rotator Cuff, Rhomboids',
    steps: ['Set cable at head height with rope attachment.','Grab rope with both hands, step back, arms extended.','Pull rope toward your face, hands going to either side of your head.','Elbows flare out wide — hands end at ear level.','Return slowly under control.'],
    tip: 'One of the best shoulder health exercises. Do these regularly to balance heavy pressing.',
    cues: ['Elbows high', 'Pull to face', 'External rotation', 'Slow return']
  },
  {
    id: 'reverse_fly',
    name: 'Reverse Pec Deck',
    muscle: 'shoulder', type: 'isolation', equipment: 'machine',
    sets: '3', reps: '12–15', muscles: 'Rear Deltoid, Rhomboids',
    steps: ['Sit facing machine pad. Grip handles at shoulder height.','Keep slight elbow bend. Reverse fly arms back and wide.','Squeeze rear delts and rhomboids at peak.','Return handles slowly — feel the stretch.'],
    tip: 'Rear delts are almost always undertrained. Prioritize this for shoulder balance and health.',
    cues: ['Slight elbow bend', 'Pull wide', 'Squeeze rear delts', 'Control return']
  },

  // ── ARMS ───────────────────────────────────────────────
  {
    id: 'curl',
    name: 'Barbell Curl',
    muscle: 'arms', type: 'isolation', equipment: 'barbell',
    sets: '3', reps: '10–12', muscles: 'Biceps Brachii, Brachialis',
    steps: ['Stand with barbell, underhand grip shoulder-width.','Pin elbows to sides — barely move.','Curl bar up by flexing elbow. No body swing.','Squeeze bicep hard at top for 1 second.','Lower with full control to complete extension.'],
    tip: 'Slow eccentrics (lowering) grow biceps faster. Count 3 seconds down every rep.',
    cues: ['Elbows pinned', 'Full range', 'Squeeze at top', '3 count down']
  },
  {
    id: 'tricep',
    name: 'Tricep Pushdown',
    muscle: 'arms', type: 'isolation', equipment: 'cable',
    sets: '3', reps: '12–15', muscles: 'Triceps Brachii (all 3 heads)',
    steps: ['Stand facing cable machine, rope or bar attachment at upper position.','Grip attachment, elbows at sides, upper arms vertical.','Push attachment downward until arms fully extended.','Flare wrists out at bottom (with rope) for full contraction.','Return slowly — elbows stay by your side.'],
    tip: 'Lean slightly forward and keep upper arms completely still.',
    cues: ['Elbows fixed', 'Full extension', 'Wrist flare', 'Control up']
  },
  {
    id: 'hammer_curl',
    name: 'Hammer Curl',
    muscle: 'arms', type: 'isolation', equipment: 'dumbbell',
    sets: '3', reps: '10–12', muscles: 'Brachialis, Brachioradialis, Biceps',
    steps: ['Stand with DBs at sides, palms facing each other (neutral grip).','Pin elbows to sides.','Curl both DBs upward — keep neutral grip throughout.','Squeeze at top. Lower slowly.'],
    tip: 'Targets brachialis under the bicep — makes your arms look thicker.',
    cues: ['Neutral grip', 'Elbows pinned', 'Squeeze at top', 'Slow descent']
  },
  {
    id: 'skull_crusher',
    name: 'Skull Crusher',
    muscle: 'arms', type: 'isolation', equipment: 'barbell',
    sets: '3', reps: '10–12', muscles: 'Triceps Brachii (long head)',
    steps: ['Lie on bench. Hold EZ bar or straight bar above chest, arms extended.','Keeping upper arms vertical, bend elbows to lower bar toward forehead.','Lower until bar is just above forehead.','Press back up to start — squeeze triceps at top.'],
    tip: 'Keep upper arms perfectly vertical — any drift forward turns this into a press.',
    cues: ['Upper arms vertical', 'Bar to forehead', 'Squeeze triceps', 'Control always']
  },
  {
    id: 'cable_curl',
    name: 'Cable Curl',
    muscle: 'arms', type: 'isolation', equipment: 'cable',
    sets: '3', reps: '12–15', muscles: 'Biceps Brachii, Brachialis',
    steps: ['Stand at cable machine, low pulley with straight or EZ bar attachment.','Grip bar underhand, elbows pinned to sides.','Curl bar upward — constant tension throughout.','Squeeze hard at top.','Lower slowly to full extension.'],
    tip: 'Cables provide constant tension unlike DBs — great for mind-muscle connection.',
    cues: ['Constant tension', 'Elbows pinned', 'Full range', 'Slow down']
  },

  // ── CORE ───────────────────────────────────────────────
  {
    id: 'plank',
    name: 'Plank',
    muscle: 'core', type: 'isolation', equipment: 'bodyweight',
    sets: '3', reps: '45–60s', muscles: 'Transverse Abdominis, Rectus Abdominis, Glutes',
    steps: ['Forearms on floor, elbows under shoulders. Up on toes.','Straight line from head to heels — no sagging hips.','Engage glutes and core hard. Tuck pelvis slightly.','Look at the floor. Breathe normally.','Hold target time without breaking form.'],
    tip: 'A 30-second perfect plank beats a 2-minute sagging one.',
    cues: ['Hips level', 'Glutes squeezed', 'Breathe', 'Head neutral']
  },
  {
    id: 'crunch',
    name: 'Cable Crunch',
    muscle: 'core', type: 'isolation', equipment: 'cable',
    sets: '3', reps: '15–20', muscles: 'Rectus Abdominis',
    steps: ['Kneel at cable machine with rope attachment at top.','Hold rope at sides of head. Hip hinge forward slightly.','Crunch down — drive elbows toward knees.','Round your spine — don\'t just bow forward.','Return slowly to starting position.'],
    tip: 'The key is rounding your spine (flexing the abs), not just bowing at the hips.',
    cues: ['Round spine', 'Elbows to knees', 'Slow return', 'Breathe out on crunch']
  },
  {
    id: 'ab_wheel',
    name: 'Ab Wheel Rollout',
    muscle: 'core', type: 'compound', equipment: 'bodyweight',
    sets: '3', reps: '8–12', muscles: 'Rectus Abdominis, Obliques, Lats',
    steps: ['Kneel on floor, hold ab wheel with both hands beneath shoulders.','Brace core extremely hard.','Roll wheel forward slowly — hips stay level, don\'t let lower back arch.','Extend as far as you can control.','Pull wheel back using abs — not hip flexors.'],
    tip: 'One of the hardest core exercises. Start with partial reps and build range of motion.',
    cues: ['Core braced', 'Hips level', 'Full extension', 'Pull with abs']
  },
  {
    id: 'hanging_leg_raise',
    name: 'Hanging Leg Raise',
    muscle: 'core', type: 'isolation', equipment: 'bodyweight',
    sets: '3', reps: '10–15', muscles: 'Lower Rectus Abdominis, Hip Flexors',
    steps: ['Hang from pull-up bar with dead hang.','Brace core. Raise legs by curling pelvis — NOT just lifting legs.','Bring knees or straight legs to parallel or higher.','Lower slowly — do not swing.'],
    tip: 'The key is posterior pelvic tilt — curl your pelvis up, don\'t just lift your legs.',
    cues: ['Curl pelvis', 'Slow down', 'No swing', 'Full hang']
  },

  // ── CALISTHENICS ───────────────────────────────────────
  {
    id: 'pushup',
    name: 'Push-up',
    muscle: 'calisthenics', type: 'compound', equipment: 'bodyweight',
    sets: '4', reps: '15–20', muscles: 'Pectoralis Major, Triceps, Front Delts',
    steps: ['High plank. Hands slightly wider than shoulders.','Keep body rigid — straight line head to heel.','Lower chest to floor, elbows at ~45°.','Push through full hand — base of palm.','Lock elbows at top. Squeeze chest.'],
    tip: 'Too easy? Elevate feet or add a weighted vest. Too hard? Start on knees.',
    cues: ['Rigid body', 'Elbows 45°', 'Full range', 'Squeeze chest']
  },
  {
    id: 'dips',
    name: 'Dips',
    muscle: 'calisthenics', type: 'compound', equipment: 'bodyweight',
    sets: '3–4', reps: '8–15', muscles: 'Triceps, Lower Pectoralis, Front Delts',
    steps: ['Support on parallel bars, arms locked out.','Lean slightly forward for chest, upright for triceps.','Lower until upper arms parallel to floor.','Drive back up to full lockout.','Control the descent — no dropping.'],
    tip: 'Leaning forward = more chest. Staying upright = more triceps.',
    cues: ['Control descent', 'Full lockout', 'Lean for chest', 'Elbows close']
  },
  {
    id: 'muscleup',
    name: 'Muscle-Up',
    muscle: 'calisthenics', type: 'compound', equipment: 'bodyweight',
    sets: '3', reps: '3–8', muscles: 'Lats, Chest, Triceps, Biceps',
    steps: ['Dead hang from bar. Generate slight body swing.','Explosively pull bar down toward hips.','As bar reaches chest, transition wrists over bar.','Push up into dip position to complete.','Lower under control.'],
    tip: 'Prerequisites: 15 strict pull-ups + 15 dips. Build those first.',
    cues: ['Explosive pull', 'Bar to hips', 'Fast transition', 'Push through']
  },
  {
    id: 'pistol',
    name: 'Pistol Squat',
    muscle: 'calisthenics', type: 'compound', equipment: 'bodyweight',
    sets: '3', reps: '5–10 each', muscles: 'Quadriceps, Glutes, Ankle Stability',
    steps: ['Stand on one foot, extend other leg forward.','Reach arms forward for balance.','Sit down on one leg as deep as possible — keep heel grounded.','Drive through heel to stand back up.','Switch legs.'],
    tip: 'Use a doorframe for balance assist. Build ankle mobility with daily assisted versions.',
    cues: ['Heel planted', 'Arms forward', 'Go deep', 'Drive through heel']
  },
  {
    id: 'lsit',
    name: 'L-Sit',
    muscle: 'calisthenics', type: 'isolation', equipment: 'bodyweight',
    sets: '3', reps: '10–30s', muscles: 'Hip Flexors, Core, Triceps',
    steps: ['Support on parallel bars or floor, arms locked.','Raise both legs parallel to floor.','Toes pointed, legs straight.','Hold position. Breathe normally.','Build time progressively.'],
    tip: 'Start with tucked L-sit (knees to chest), then one leg, then both extended.',
    cues: ['Arms locked', 'Legs parallel', 'Toes pointed', 'Breathe']
  },
  {
    id: 'handstand_pushup',
    name: 'Handstand Push-up',
    muscle: 'calisthenics', type: 'compound', equipment: 'bodyweight',
    sets: '3', reps: '5–10', muscles: 'Deltoids, Triceps, Upper Traps',
    steps: ['Kick up to handstand against wall. Hands shoulder-width.','Lower head slowly toward floor — control is everything.','Stop just before head touches or do full ROM.','Press back to full lockout.'],
    tip: 'Master pike push-ups first. Build shoulder strength progressively.',
    cues: ['Core tight', 'Slow descent', 'Press strong', 'Full lockout']
  },
]

export const pplProgram = {
  name: 'Push / Pull / Legs',
  days: [
    { day: 'Monday', type: 'Push', focus: 'Chest, Shoulders, Triceps', exercises: ['bench', 'incline', 'ohp', 'lateral', 'tricep'] },
    { day: 'Tuesday', type: 'Pull', focus: 'Back, Biceps, Rear Delts', exercises: ['deadlift', 'pullup', 'row', 'curl'] },
    { day: 'Wednesday', type: 'Legs', focus: 'Quads, Hamstrings, Calves', exercises: ['squat', 'rdl', 'leg_press', 'calf_raise'] },
    { day: 'Thursday', type: 'Rest', focus: 'Recovery', exercises: [] },
    { day: 'Friday', type: 'Push', focus: 'Chest, Shoulders, Triceps', exercises: ['bench', 'chest_fly', 'seated_db_press', 'lateral', 'skull_crusher'] },
    { day: 'Saturday', type: 'Pull', focus: 'Back, Biceps', exercises: ['lat_pulldown', 'seated_cable_row', 'db_row', 'hammer_curl'] },
    { day: 'Sunday', type: 'Rest', focus: 'Full Rest', exercises: [] },
  ]
}

export const calisthenicsProgram = {
  name: 'Calisthenics Fundamentals',
  days: [
    { day: 'Monday', type: 'Push', focus: 'Push Strength', exercises: ['pushup', 'dips', 'handstand_pushup'] },
    { day: 'Tuesday', type: 'Pull', focus: 'Pull Strength', exercises: ['pullup', 'muscleup'] },
    { day: 'Wednesday', type: 'Legs', focus: 'Lower Body', exercises: ['pistol', 'squat'] },
    { day: 'Thursday', type: 'Rest', focus: 'Active Recovery', exercises: [] },
    { day: 'Friday', type: 'Skills', focus: 'Skill Work', exercises: ['muscleup', 'lsit', 'handstand_pushup'] },
    { day: 'Saturday', type: 'Full', focus: 'Full Body', exercises: ['pushup', 'pullup', 'pistol', 'plank', 'ab_wheel'] },
    { day: 'Sunday', type: 'Rest', focus: 'Rest', exercises: [] },
  ]
}
