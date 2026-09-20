import { GameProject, SkillNode, CodeSnippet } from '../types';

// Bundled permanent asset imports for reliable builds on GitHub, GitHub Pages, and production
import gtaCoverImg from '../assets/images/gta_tamil_nadu_cover_1789883932021.jpg';
import ghilliImg from '../assets/images/ghilli_game_screen_1789884255561.jpg';
import kadinamaaImg from '../assets/images/kadinamaa_iru_game_1789884274442.jpg';
import upcomingImg from '../assets/images/upcoming_projects_1789881397690.jpg';
import thalapathyImg from '../assets/images/thalapathy_the_game_1789884489796.jpg';
import muthu2dImg from '../assets/images/muthu_2d_game_1789884456852.jpg';
import checkpointImg from '../assets/images/checkpoint_impossible_1789883534222.jpg';
import goofygenImg from '../assets/images/goofygen_hat_game_1789884474296.jpg';
import leonProfileFallbackImg from '../assets/images/new_portrait.png';

export const LEON_PROFILE_IMAGE = "https://res.cloudinary.com/dwmgvszle/image/upload/v1789882695/IMG_20260920_110717_bcpgvt.png";
export const LEON_PROFILE_FALLBACK = leonProfileFallbackImg;

export const GAME_PROJECTS: GameProject[] = [
  {
    id: 'gta-tamil-nadu',
    title: 'GTA TAMIL NADU',
    subtitle: 'Cyberpunk South Indian Open World',
    category: 'Open World RPG',
    description: 'High-speed auto-rickshaw chases through neon-drenched streets across Tamil Nadu with traditional temple architecture.',
    longDescription: 'An ambitious open-world crime thriller set in a retro-futuristic Tamil Nadu. Navigate bustling tea stalls, majestic illuminated temple gopurams, coastal highways, and high-tech corporate zones. Featuring authentic Tamil voice lines, local driving physics, and custom mission storylines.',
    image: gtaCoverImg,
    tags: ['Open World', 'Action RPG', 'Godot 4', 'PC / Mobile'],
    engine: 'Godot Engine 4.2',
    platform: 'PC & Mobile',
    status: 'In Development',
    keyFeatures: [
      'Authentic yellow-green Auto-Rickshaw physics & turbo drifts',
      'Futuristic Dravidian temple cities & cyber streets',
      'Dynamic day/night weather with heavy monsoon rain shaders',
      'Original Indian synthwave and traditional percussion OST'
    ],
    specs: {
      genre: 'Third-Person Action / Open World',
      targetFps: '60 FPS (PC) / 45 FPS (Mobile)',
      resolution: '4K Ultra / Dynamic Scaling',
      physics: 'Custom Vehicle & Ragdoll Controller'
    }
  },
  {
    id: 'ghilli-the-game',
    title: 'GHILLI – THE GAME',
    subtitle: 'Iconic Action Thriller Game Adaptation',
    category: 'Action Thriller',
    description: 'Official action game adaptation. Relive high-voltage car getaways, thrilling rescues, intense kabaddi matches, and cinema showdowns.',
    longDescription: 'Based on the beloved mass blockbuster, Ghilli – The Game puts players in the driving seat of intense getaways and heart-stopping rescue missions. Navigate escape routes from Madurai to Chennai, protect Dhanalakshmi, overcome villain Muthupandi\'s henchmen, and unleash signature action hero combos with authentic cinema audio.',
    image: ghilliImg,
    tags: ['Movie Adaptation', 'Action Thriller', 'Ghilli', 'Kollywood', 'Story Rich'],
    engine: 'Unity / C#',
    platform: 'PC & Consoles',
    status: 'In Development',
    keyFeatures: [
      'Iconic car getaway and pursuit escape sequences',
      'Signature kabaddi moves and street brawler combat',
      'Velu & Dhanalakshmi narrative cutscenes and authentic soundtrack',
      'Dramatic boss encounters with villain henchmen'
    ],
    specs: {
      genre: 'Cinematic Action Adventure / Thriller',
      targetFps: '60 - 120 FPS',
      resolution: 'Native 4K HDR',
      physics: 'Dynamic Vehicle & Ragdoll Controller'
    }
  },
  {
    id: 'kisthenics-game',
    title: 'KADINAMAA IRU: THE GAME',
    subtitle: '2D Calisthenics Adventure & Biscuit Runner',
    category: '2D Platformer / Calisthenics',
    description: 'Run, jump, slide, and collect biscuits! High-octane 2D calisthenics action game inspired by the Kadinamaa Iru fitness movement.',
    longDescription: 'Inspired by the Kadinamaa Iru calisthenics mindset: push your limits, stay hard, and never give up! Play as the straw-hat athletic hero, dodging treacherous spike traps, leaping across brick platforms, sliding under obstacles, and gathering biscuits to fuel your calisthenics power and beat your high scores.',
    image: kadinamaaImg,
    tags: ['Playable', '2D Adventure', 'Calisthenics', 'Runner', 'Kadinamaa Iru', 'Leon_gx'],
    engine: 'Godot 4.3 / 2D Engine',
    platform: 'Android, Windows & Web',
    status: 'Playable',
    downloadUrl: 'https://drive.google.com/file/d/1Rq1g-wfgynjhcVoEDBI3TolLD3OjcOAt/view?usp=drive_link',
    keyFeatures: [
      'Run, jump, slide, and hurdle over treacherous spike hazards',
      'Collect biscuits & win to boost calisthenics stamina',
      'High-score challenge leaderboard & achievement ranks',
      'Cross-platform release: Available on Android, Windows & Web'
    ],
    specs: {
      genre: '2D Platformer / Calisthenics Runner',
      targetFps: '60 FPS Smooth Arc',
      resolution: 'Crisp HD / Retina Display',
      physics: 'Precision AABB Box Collision & Momentum Jump'
    }
  },
  {
    id: 'upcoming-projects',
    title: 'UPCOMING PROJECTS',
    subtitle: 'Cosmic Dimensional Rift RPG',
    category: 'Sci-Fi Fantasy',
    description: 'Classified next-generation exploration into glowing dimensional portals, floating crystal realms, and ancient mysteries.',
    longDescription: 'An unannounced procedural sci-fi action adventure taking players through cosmic voids and glowing gateways. Solve ancient celestial puzzles, manipulate gravity fields, and harness quantum artifacts in deep space.',
    image: upcomingImg,
    tags: ['In Development', 'Procedural', 'Next-Gen', 'Mystery'],
    engine: 'Unreal Engine 5 / C++',
    platform: 'PC / PS5 / Xbox',
    status: 'Concept',
    keyFeatures: [
      'Procedural floating crystal asteroid dimensions',
      'Zero-G gravitational portal mechanics',
      'Volumetric nebula lighting and celestial shader fx',
      'Non-linear narrative across multiple multiverse realities'
    ],
    specs: {
      genre: 'Cosmic Exploration / Puzzle RPG',
      targetFps: '60 FPS Ray-Traced',
      resolution: '4K Nanite & Lumen',
      physics: 'Dynamic Gravity Inversion'
    }
  },
  {
    id: 'thalapathy-game',
    title: 'THALAPATHY: THE GAME',
    subtitle: 'Mass Cinematic Action Tribute by Leon_gx',
    category: 'Action Brawler',
    description: 'Play online in your browser! Naripaddi power cut showdown. Play Story Mode or Wave Mode with punch, kick, and blaster combos.',
    longDescription: 'Naripaddi current kambam la fuse carrier moiyam ah thookitanga. Whole area power cut. Oru aalu mattum than ipo current\'ah thirumba kondu varuvaru! Step up as the hero to bring the power back. Features authentic Tamil mass action, Story Mode, Wave Mode, and mobile-friendly on-screen punch, kick, and blast controls.',
    image: thalapathyImg,
    tags: ['Play Online', 'Thalapathy', 'Mass Action', 'Story & Wave Mode', 'Leon_gx'],
    engine: 'HTML5 / Web Canvas',
    platform: 'Web Browser (PC & Mobile)',
    status: 'Playable',
    playUrl: 'https://muthukumar127.github.io/Thalapathy-The-Game-by-Leon_gx-/',
    keyFeatures: [
      'Instant in-browser playable game (No download required)',
      'Story Mode & intense Wave Mode survival battles',
      'On-screen touch controls: Punch, Kick, and Blaster attacks',
      'Authentic mass cinema background score and night city arena'
    ],
    specs: {
      genre: 'Cinematic Mass Action / Beat \'Em Up',
      targetFps: '60 FPS Web Canvas',
      resolution: 'Responsive Dynamic Screen',
      physics: 'Custom Action Hitbox & Combo System'
    }
  },
  {
    id: 'muthu-2d-game-mobile',
    title: '2D GAME FREE',
    subtitle: 'Created by Muthu // Mobile Arcade Platformer',
    category: '2D Platformer',
    description: '100% free web-playable 2D arcade platformer with UFO encounters, stone wall ruins, mountain vistas, and responsive jump controls.',
    longDescription: 'Created by Muthu. A vibrant side-scrolling 2D platformer engineered directly for mobile and desktop web browsers. Leap across lush grassy stone plateaus, navigate tricky obstacles, dodge alien UFOs, and climb the high-score counter.',
    image: muthu2dImg,
    tags: ['Free to Play', '2D Platformer', 'Created by Muthu', 'Mobile Friendly', 'Arcade'],
    engine: 'JavaScript / HTML5 2D',
    platform: 'Mobile & Web Browser',
    status: 'Playable',
    playUrl: 'https://muthugaming.github.io/Muthu-game-moblie/',
    keyFeatures: [
      'Free web playable without any install or purchase',
      'Touch & keyboard-optimized Start Game and Full Screen support',
      'Vibrant side-scrolling visuals with mountains, stone ruins & UFOs',
      'Smooth 60 FPS jump collision physics and real-time score tracking'
    ],
    specs: {
      genre: '2D Side-Scrolling Arcade Platformer',
      targetFps: '60 FPS WebGL / Canvas',
      resolution: 'Mobile & Desktop Responsive',
      physics: 'AABB Precision Box Collision'
    }
  },
  {
    id: 'checkpoint-impossible',
    title: 'CHECKPOINT IMPOSSIBLE',
    subtitle: 'Hardcore Precision Rage Platformer',
    category: 'Precision Platformer',
    description: 'Test your reflexes and patience in this notoriously unforgiving challenge game with relentless obstacles and instant respawns.',
    longDescription: 'Only the most determined players will survive. Checkpoint Impossible pushes precision platforming to its absolute limits with razor-sharp spike timings, deceptive trap triggers, and ruthless checkpoints. Download the build directly via Google Drive.',
    image: checkpointImg,
    tags: ['Rage Game', 'Precision', 'Hardcore', 'Direct Download'],
    engine: 'Godot / Unity Engine',
    platform: 'Android APK & PC',
    status: 'Playable',
    downloadUrl: 'https://drive.google.com/drive/mobile/folders/1-L9f7Jl3Ef7XQoXjqlUmqsHFcWJ_KlO1',
    keyFeatures: [
      'Brutal precision obstacle layouts and hidden traps',
      'Zero-latency instant respawn to keep you in the flow',
      'Satisfying mastery curve for speedrunners',
      'Direct Android APK download folder hosted on Google Drive'
    ],
    specs: {
      genre: 'Hardcore Precision Platformer',
      targetFps: '60 - 120 FPS High Refresh',
      resolution: 'Native Mobile & Full HD',
      physics: 'Sub-Pixel Velocity & Raycast Grounding'
    }
  },
  {
    id: 'goofygen-hat-game',
    title: 'GOOFYGEN HAT',
    subtitle: 'Goofygen (Kutty PR) vs Asro (Dubai Mama)',
    category: 'Arcade / Versus',
    description: 'Only one can win. The lucky hat decides everything! Retro neon synthwave arcade battle with Story Mode and Endless Mode.',
    longDescription: 'Goofygen (Kutty PR) vs Asro (Dubai Mama). Only one can win — the lucky hat decides everything! Dive into this electrifying retro pixel synthwave arcade game featuring Story Mode, Endless Mode, neon CRT visuals, and hilarious hat duels.',
    image: goofygenImg,
    tags: ['Play Online', 'Goofygen Hat', 'Kutty PR', 'Dubai Mama', 'Retro Arcade', 'Pixel Art'],
    engine: 'HTML5 Web Arcade',
    platform: 'Web Browser & Mobile',
    status: 'Playable',
    playUrl: 'https://muthukumar127.github.io/Goofygen-Hat-Game-/',
    keyFeatures: [
      'Story Mode & high-stakes Endless Mode challenges',
      'Electrifying retro neon synthwave pixel-art aesthetics & CRT scanlines',
      'Play instantly in your browser on PC or mobile',
      'Comical hat duel rivalry between Kutty PR & Dubai Mama'
    ],
    specs: {
      genre: 'Retro Neon Pixel Arcade / Versus',
      targetFps: '60 FPS Browser WebGL',
      resolution: 'CRT Pixel Scanline Display',
      physics: 'Arcade Collision & Versus State Engine'
    }
  },
];

export const SKILL_NODES: SkillNode[] = [
  { name: 'GDScript / Godot 4', category: 'Programming', level: 96, icon: 'Terminal' },
  { name: 'C# & Unity Engine', category: 'Programming', level: 94, icon: 'Code' },
  { name: '3D Modeling & Rigging', category: '3D & Art', level: 88, icon: 'Box' },
  { name: 'Custom Shaders (GLSL)', category: '3D & Art', level: 85, icon: 'Sparkles' },
  { name: 'Game Physics & Ragdoll', category: 'Engine', level: 92, icon: 'Activity' },
  { name: 'Level & World Design', category: 'Game Design', level: 98, icon: 'Layers' },
  { name: 'Sound FX & Audio Synth', category: 'Game Design', level: 86, icon: 'Volume2' },
  { name: 'Performance Optimization', category: 'Engine', level: 91, icon: 'Cpu' }
];

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    title: 'GOSCRIPT (GDScript 4)',
    lang: 'gdscript',
    filename: 'PlayerController.gd',
    code: `extends CharacterBody3D

@export var SPEED : float = 9.5
@export var JUMP_VELOCITY : float = 6.2
var gravity = ProjectSettings.get_setting("physics/3d/default_gravity")

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y -= gravity * delta
    
    var input_dir := Input.get_vector("left", "right", "forward", "back")
    var direction := (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()
    
    if direction:
        velocity.x = direction.x * SPEED
        velocity.z = direction.z * SPEED
        $Model.rotation.y = lerp_angle($Model.rotation.y, atan2(-direction.x, -direction.z), 0.15)
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)
        velocity.z = move_toward(velocity.z, 0, SPEED)
        
    move_and_slide()`
  },
  {
    title: 'C# Velocity Physics',
    lang: 'csharp',
    filename: 'VehicleMovement.cs',
    code: `using UnityEngine;

public class VehicleMovement : MonoBehaviour 
{
    [SerializeField] private float acceleration = 450f;
    [SerializeField] private float dampingFactor = 0.88f;
    private Rigidbody rb;

    void FixedUpdate() 
    {
        float steer = Input.GetAxis("Horizontal");
        float accel = Input.GetAxis("Vertical");
        
        Vector3 forwardVelocity = transform.forward * Vector3.Dot(rb.linearVelocity, transform.forward);
        Vector3 rightVelocity = transform.right * Vector3.Dot(rb.linearVelocity, transform.right);
        rb.linearVelocity = forwardVelocity + (rightVelocity * dampingFactor);
        
        rb.AddForce(transform.forward * (accel * acceleration));
        transform.Rotate(Vector3.up * (steer * 60f * Time.fixedDeltaTime));
    }
}`
  }
];
