export interface TechnicalHighlight {
  title: string
  description: string
}

export interface Screenshot {
  filename: string
  caption: string
}

export interface AppModule {
  name: string
  description: string
}

export interface Video {
  label: string
  url: string
}

export interface Closing {
  heading: string
  body: string
  linkLabel: string
  linkUrl: string
}

export interface TryIt {
  heading: string
  body: string
  liveUrl: string
  liveLabel?: string
  githubUrl: string
}

export interface AlgorithmStep {
  step: string
  description: string
}

export interface Reflection {
  heading: string
  body: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  thesisUrl?: string
  overview: string
  context?: string
  problem?: string
  solution?: string
  technicalHighlights: TechnicalHighlight[]
  lessonsLearned?: string
  // Optional rich content
  screenshots?: Screenshot[]
  modules?: AppModule[]
  modulesHeading?: string
  algorithmSteps?: AlgorithmStep[]
  features?: TechnicalHighlight[]
  featuresHeading?: string
  reflection?: Reflection
  videos?: Video[]
  techStack?: string[]
  closing?: Closing
  tryIt?: TryIt
}

export const projects: Project[] = [
  {
    slug: 'awy',
    title: 'AWY — Always With You',
    tagline: 'A personal command centre that lives in your browser',
    tags: ['React', 'TypeScript', 'Supabase', 'Vite'],
    liveUrl: 'https://fveskrna.github.io/Awy/',
    githubUrl: 'https://github.com/FVeskrna/Awy',

    screenshots: [
      {
        filename: 'awy-dashboard.png',
        caption: 'Command Center — customisable widget dashboard',
      },
      {
        filename: 'awy-toolbox.png',
        caption: 'Toolbox — JWT Debugger and 18 other developer utilities',
      },
      {
        filename: 'awy-applibrary.png',
        caption: 'App Library — browse and pin modules to your dock',
      },
      {
        filename: 'awy-commandpalette.png',
        caption: '⌘K command palette — navigate anywhere instantly',
      },
    ],

    overview:
      'AWY is a personal workspace app with 12 modules and 19 developer utilities, all in one browser tab. It covers tasks, notes, habits, focus timers, code snippets, developer tools, and more. Data is saved locally for instant offline access and synced to the cloud via Supabase. The app is fully responsive with different layouts for desktop and mobile.',

    modules: [
      { name: 'Tasks', description: 'To-do list with priorities, due dates, and pinning' },
      { name: 'Checklist', description: 'Daily habits tracker with streak counters' },
      { name: 'Capacity', description: 'Cognitive energy log with focus trend visualisation' },
      { name: 'Deep Work', description: 'Full-screen focus timer with distraction blocking' },
      { name: 'Notes', description: 'Rich text editor with folders and markdown support' },
      { name: 'Navigator', description: 'Multi-timezone clock with working hours overlay' },
      { name: 'Snippet Storage', description: 'Code and text snippet library with pinning' },
      { name: 'Toolbox', description: '19 developer utilities accessible instantly in-browser' },
      { name: 'Soundscape', description: 'Ambient audio mixer for focus sessions' },
      { name: 'Health', description: 'Network latency monitor and custom status page checker' },
      { name: 'Smart Asset', description: 'Warranty and receipt tracker with OCR scanning' },
      { name: 'Worklog Stream', description: 'Manual work log formatted for Jira time tracking' },
    ],

    problem:
      "Constant tab switching. As a developer you end up with a task manager in one tab, notes somewhere else, a JSON formatter bookmarked somewhere, a timer in another window. The cognitive cost of switching context between tools adds up. AWY was built to eliminate that — one tab for everything a developer and a normal person needs day to day.",

    solution:
      'A modular dashboard where you choose which tools are visible. Each module is self-contained and the dashboard is a fully customisable grid of widgets showing live summaries. Everything writes to localStorage instantly for offline capability, then syncs to Supabase in the background. The app is deployed as a static site on GitHub Pages with no server required.',

    technicalHighlights: [
      {
        title: 'Offline-first architecture',
        description:
          'Every write goes to localStorage immediately, giving instant feedback with no loading states. Supabase sync happens asynchronously in the background. The app works fully without an internet connection.',
      },
      {
        title: '⌘K command palette',
        description:
          'A keyboard-driven command palette accessible from anywhere in the app via ⌘K (or Ctrl+K on Windows). Commands are categorised — Navigation, Focus, Utility — each with keyboard shortcut hints displayed inline. Built entirely in-house without a library, it supports search across all modules and tools. The fastest way to navigate a 12-module app without touching the mouse.',
      },
      {
        title: 'Smart Asset module with OCR',
        description:
          'The Smart Asset module lets users upload receipts and warranty documents. It uses Tesseract.js to run OCR directly in the browser — no server, no API call, no cost. The extracted text pre-fills the form fields automatically.',
      },
      {
        title: 'Technology choices',
        description:
          'Built on React 19 with TypeScript for type safety across all 12 modules and 19 tools. Vite as the build tool for fast development and optimised production builds. Supabase handles both authentication and cloud sync, chosen for its generous free tier and real-time capabilities. Deployed as a static site on GitHub Pages — no server, no hosting cost, no infrastructure to maintain.',
      },
      {
        title: 'Module system',
        description:
          "Each module is a ModuleManifest object with an ID, name, icon, app component, widget component, and optional quick action. Code splitting via React.lazy() ensures only the active module's code loads. Adding a new module means adding one manifest object — nothing else.",
      },
      {
        title: 'Custom session security',
        description:
          'Implemented a Safe Session Policy with a 72-hour maximum session age, automatic 401 interception that logs the user out, and full localStorage cleanup on sign-out. Authentication uses Supabase OAuth (Google) and email/password.',
      },
    ],

    tryIt: {
      heading: 'Try it yourself',
      body: 'AWY is live and free to use. Sign up with Google or email.',
      liveUrl: 'https://fveskrna.github.io/Awy/',
      githubUrl: 'https://github.com/FVeskrna/Awy',
    },
  },

  {
    slug: 'vr-workshop',
    title: 'VR Workshop',
    tagline: 'An interactive virtual reality simulation of a home workshop',
    tags: ['Unity', 'C#', 'VR', 'Oculus Rift S', 'XR Interaction Toolkit'],
    githubUrl: 'https://github.com/FVeskrna/VR-Workshop',
    thesisUrl: 'https://www.vut.cz/en/students/final-thesis/detail/132854',

    context:
      'This project was developed as my Bachelor\'s thesis at Brno University of Technology, submitted in 2021. It represents around four months of solo development in Unity — my first large-scale software project — and earned a Red Diploma grade. The goal was to design and build a fully interactive VR workshop environment that could serve as a foundation for training simulations, assembly visualisation, or engineering education.',

    overview:
      'The VR Workshop is an immersive virtual reality application built in Unity for the Oculus Rift S. Users can move freely through a realistically modelled workshop using 6 degrees of freedom, pick up and interact with tools, cut materials with a table saw, assemble components using nails and screws, and complete guided construction tasks through a blueprint system. The application was designed to be modular and extensible, with every interactive system built from scratch in C#.',

    modules: [
      {
        name: 'Material assembly',
        description:
          'Connect wooden and metallic components using nails and screws into rigid structures with a custom parenting system',
      },
      {
        name: 'Blueprint system',
        description:
          'Guided construction tasks with semi-transparent outlines that snap correct components into place',
      },
      {
        name: 'Table saw',
        description:
          'Cuts objects into two separate meshes using the open-source EzySlice framework',
      },
      {
        name: 'Tool interactions',
        description:
          'Drill, hammer, nail gun, and vise with realistic physics-based behaviour and sound effects',
      },
      {
        name: 'Object spawner',
        description:
          'Unlimited supply of materials via a custom XR base interactor extension',
      },
      {
        name: 'VR locomotion',
        description:
          'Smooth movement and snap turning via XR Interaction Toolkit with Oculus Rift S support',
      },
      {
        name: 'In-world UI',
        description:
          'Laser pointer-controlled panel for instructions and spawning materials',
      },
      {
        name: 'Autonomous robot',
        description:
          'Assembled robot moves between waypoints after blueprint completion',
      },
    ],
    modulesHeading: 'Interactive systems',

    technicalHighlights: [
      {
        title: 'Custom Offset Grab system',
        description:
          "The XR Interaction Toolkit's default grab snaps objects to the controller origin. A custom OffsetGrab script extending XRGrabInteractable captures the controller's exact position and rotation at the moment of grabbing and sets that as the attach transform — so objects are held exactly where you pick them up, not teleported to your hand.",
      },
      {
        title: 'Dynamic assembly via parenting',
        description:
          "When a nail or screw makes contact with a wooden component, a custom script checks whether that component belongs to an existing assembly. If not, it becomes the root parent. Subsequent components are added as children, inheriting physics from the root's single Rigidbody. The Collider on the root updates dynamically as new parts are added, always representing the full assembled shape.",
      },
      {
        title: 'Mesh slicing with EzySlice',
        description:
          'The table saw uses the open-source EzySlice framework. An invisible plane object detects contact with cuttable materials, removes the original mesh, and invokes SlicedHull() which generates two new GameObjects with correctly capped cross-section geometry. The resulting pieces inherit all original physics components.',
      },
      {
        title: 'Blueprint socket system',
        description:
          "A custom NameSocket class extending XRSocketInteractor overrides CanSelect() to accept only objects with a specific name. When the correct component is inserted, it snaps to a predefined transform, its MeshRenderer is disabled (the ghost disappears), and a completion flag is set. When all sockets are filled, the blueprint collapses into a single grabbable physics object.",
      },
      {
        title: 'XR Base Interactor spawner',
        description:
          "Instead of placing finite copies of materials around the scene, a custom class extending XRBaseInteractable overrides OnSelectEntered(). When the user attempts to grab a spawner object, it instantiates a fresh copy of the target prefab and immediately calls ForceSelect() — so the user seamlessly picks up a new object rather than the spawner itself.",
      },
      {
        title: 'Academic context — built from scratch',
        description:
          "Every system in this application was written from scratch rather than using paid Asset Store solutions. This was a deliberate choice to build deep understanding of Unity's XR architecture and C# scripting patterns. The result was significantly more development time, but complete control over every system — and a thorough understanding of how each component works internally.",
      },
    ],

    videos: [
      { label: 'Overall presentation', url: 'https://www.youtube.com/watch?v=mCSK3DLpQEs' },
      { label: 'Blueprint system', url: 'https://www.youtube.com/watch?v=9GYik95y-_8' },
      { label: 'Table saw and interactables', url: 'https://www.youtube.com/watch?v=3f_6qNRiwsQ' },
      { label: 'Material assembly', url: 'https://www.youtube.com/watch?v=LREtUKK41Nk' },
      { label: 'Guided completion', url: 'https://www.youtube.com/watch?v=uxSaMIw7nYI' },
    ],

    techStack: [
      'Unity 2019.4 LTS',
      'C#',
      'XR Interaction Toolkit',
      'Oculus SDK',
      'ProBuilder',
      'ProGrids',
      'EzySlice',
      'Visual Studio',
    ],

    closing: {
      heading: 'Learn more',
      body: "This project was submitted as a Bachelor's thesis at Brno University of Technology in 2021 and awarded a Red Diploma grade. The full thesis document is available through the university's thesis portal.",
      linkLabel: 'Read the full thesis',
      linkUrl: 'https://www.vut.cz/en/students/final-thesis/detail/132854',
    },
  },

  {
    slug: 'vr-meetingroom',
    title: 'VR Meetingroom',
    tagline:
      'A multi-user virtual reality collaboration platform with industrial simulation environments',
    tags: ['Unity', 'C#', 'VR', 'Photon PUN2', 'XR Interaction Toolkit'],
    githubUrl: '',
    thesisUrl: 'https://www.vut.cz/studenti/zav-prace/detail/149729',

    context:
      "This project was developed as my Master's thesis at Brno University of Technology, submitted in 2023. Building on my earlier Bachelor's thesis (the VR Workshop), this project explored how virtual reality can serve the needs of Industry 4.0 — specifically enabling multi-user collaboration, remote presentation, and industrial simulation in a shared virtual environment. The application supports both VR headset and desktop (keyboard + mouse) connections simultaneously, making it accessible without specialist hardware.",

    overview:
      'VR Meetingroom is a cross-platform Unity application that connects multiple users inside a shared virtual space. Participants can join via a VR headset or a standard PC, and are represented by avatars whose head and hand positions are tracked in real time. The application offers three distinct environments — a conference room, a school classroom, and an industrial workshop hall — each with its own set of interactive features. Networking is handled via Photon PUN2 with a dedicated server, and voice communication between users runs on a separate Photon Voice server.',

    modules: [
      {
        name: 'Meeting Room',
        description:
          'A virtual conference table for up to six users with a shared whiteboard and slide presentation system',
      },
      {
        name: 'Classroom',
        description:
          'An unlimited-user lecture environment with a multi-page virtual whiteboard and interactive 3D model presentations',
      },
      {
        name: 'Workshop',
        description:
          'An industrial hall for demonstrating and operating digital twin assemblies, including a vehicle parts inspection robot and a modular conveyor sorting line',
      },
    ],
    modulesHeading: 'Three environments',

    features: [
      {
        title: 'Cross-platform multiplayer',
        description:
          'Users connect via VR headset or desktop PC in the same session. A unique room ID system secures each session. The session founder controls scene switching — all connected users are moved together. Platform selection happens at login; VR users get full 6DOF movement and hand tracking while desktop users navigate with keyboard and mouse.',
      },
      {
        title: 'Avatar representation',
        description:
          'VR users are represented by a humanoid avatar whose torso, head, and hands mirror real controller and headset positions, updated using inverse kinematics. Desktop users are shown as animated characters that follow their position and gaze direction. Name tags float above each participant.',
      },
      {
        title: 'Virtual whiteboard and presentation',
        description:
          'The whiteboard supports freehand drawing in VR and synchronises the canvas texture across all connected users via RPC calls. The classroom version adds multi-page support and one-tap clearing. A slide presentation system lets the session host upload and advance slides visible to everyone, with a full-screen mode for desktop viewers.',
      },
      {
        title: 'Interactive 3D model showcase',
        description:
          'The classroom scene supports importing and presenting any 3D model as a floating interactive object. The demo includes a robotic arm (inverse kinematics, grabbable end effector) and a conveyor belt assembly. Models can defy gravity and be inspected from any angle — useful for explaining mechanisms that would be impossible to demonstrate with a physical object.',
      },
      {
        title: 'Industrial digital twin — vehicle parts inspector',
        description:
          'The Workshop scene includes a fully scripted five-stage quality control robot for automotive parts. The operator loads a part, closes the safety flap, and presses two simultaneous buttons to start the cycle. The central rotating platform advances the part through three stations: a two-arm processing robot, an airtightness tester, and a linear ejector that sends approved parts to a conveyor. Rejected parts are returned to the operator. The entire control script was written to be reusable for programming the physical machine.',
      },
      {
        title: 'Modular conveyor sorting line',
        description:
          'A second Workshop demo features a physics-accurate conveyor system that sorts incoming packages of three sizes into separate destinations. Belt motion is achieved by alternating RigidBody.Position and MovePosition in the same render frame, so packages slide naturally without jitter. Sensors trigger diverters based on package name tags. Oversized packages are handed off to a robotic arm that palletises them using Unity\'s Two Bone IK Constraint. A real-time load graph tracks belt weight over time.',
      },
    ],

    technicalHighlights: [
      {
        title: 'Photon PUN2 networking architecture',
        description:
          'All scene objects that need synchronisation carry a PhotonView component with a unique ID. Position and rotation sync uses PhotonTransformView; fast-moving physics objects use PhotonRigidbodyView for smooth interpolation. Ownership transfer is set to "takeover", so only one user can manipulate an object at a time. Scene changes are triggered by the master client and automatically replicated to all peers.',
      },
      {
        title: 'RPC-based whiteboard sync',
        description:
          'Rather than streaming continuous state, the whiteboard encodes its canvas texture to a PNG byte array and broadcasts it to all other clients via a Photon RPC at a fixed interval. Each recipient decodes the bytes and applies the texture to the board\'s material. This approach keeps bandwidth low while keeping content visually consistent across all users.',
      },
      {
        title: 'VR UI without screen-space overlay',
        description:
          "Displaying UI directly on the VR headset screen causes motion sickness and makes interaction awkward. Instead, all controls are presented on a virtual tablet held in the user's off-hand, interactable with the other controller. The tablet's contents change per scene and can host buttons, sliders, or a virtual keyboard — mirroring the same feature set as the desktop side panel.",
      },
      {
        title: 'XR Input System with dual-device bindings',
        description:
          "Movement, grabbing, and UI selection all use Unity's Input System package with named actions rather than hardware-specific bindings. Each action accepts both a VR controller input and a keyboard/mouse equivalent, so the same codebase drives both platforms without branching logic. The OpenXR plugin provides automatic binding remapping per connected headset.",
      },
      {
        title: 'Physics-accurate conveyor belt',
        description:
          "The belt simulation avoids kinematic animation in favour of Unity's physics engine. On each FixedUpdate frame, the belt's RigidBody position is teleported one step forward (invisible to the renderer), then immediately moved back via MovePosition — dragging any objects in contact with it. Speed is controlled by adjusting step size and call frequency. Packages respond correctly to mass, friction, and collisions without any manual force calculations.",
      },
      {
        title: 'Inverse kinematics for avatars and robots',
        description:
          "Both the humanoid avatar upper body and the workshop robotic arm use Unity's Two Bone IK Constraint. For the avatar, hand IK targets follow controller positions and the head target follows the HMD, with shoulder/elbow positions solved automatically. For the robot, a separate script tracks the base rotation toward the current IK target, producing convincing arm motion without manual joint angle calculation.",
      },
    ],

    videos: [
      { label: 'Full demonstration', url: 'https://www.youtube.com/watch?v=Jr5A3RzWvPA' },
    ],

    techStack: [
      'Unity 2021 LTS',
      'C#',
      'Photon PUN2',
      'Photon Voice',
      'XR Interaction Toolkit',
      'OpenXR',
      'ProBuilder',
      'Visual Studio',
    ],

    closing: {
      heading: 'Learn more',
      body: "This project was submitted as a Master's thesis at Brno University of Technology in 2023. The full thesis document (in Czech with English abstract) is available through the university's thesis portal.",
      linkLabel: 'Read the full thesis',
      linkUrl: 'https://www.vut.cz/studenti/zav-prace/detail/149729',
    },
  },

  {
    slug: 'mimimatch',
    title: 'MimiMatch',
    tagline: 'A Tinder-style baby name picker built as a mobile-first web app',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'localStorage'],
    liveUrl: 'https://fveskrna.github.io/MimiMatch/',
    githubUrl: 'https://github.com/FVeskrna/MimiMatch',

    screenshots: [
      { filename: 'mimimatch-mainscreen.jpeg', caption: 'Main screen — swipe to like or dislike a name' },
      { filename: 'mimimatch-action.jpeg', caption: 'Swipe action in progress' },
      { filename: 'mimimatch-selection.jpeg', caption: 'Matched names selection view' },
      { filename: 'mimimatch-settings.jpeg', caption: 'Settings — filter names by origin and gender' },
    ],

    context:
      'MimiMatch is a small personal project built to solve a real problem: picking a baby name is hard, and most tools make it harder. The idea was simple — take the Tinder swipe mechanic, apply it to a curated list of Czech baby names, and let couples swipe through names independently before comparing their shortlists. The app is entirely client-side, requires no account or backend, and deploys as a static site on GitHub Pages.',

    overview:
      'MimiMatch presents names one at a time on a swipeable card. Each card shows the name in two typefaces — a classic serif and a handwritten script — alongside the family surname so parents can hear how the full name sounds. A short cultural or historical fact appears below each name. Users swipe right (or tap the heart) to save a name to their shortlist, or swipe left (or tap X) to skip it. Preferences and progress are saved to localStorage so the session persists across page refreshes and browser restarts.',

    modules: [
      {
        name: 'Swipe-to-decide',
        description:
          'Drag the card left or right with touch gestures; visual LÍBÍ / DALŠÍ stamps appear as you drag past the threshold',
      },
      {
        name: 'Gender filter',
        description: 'Switch between boy names, girl names, or both from the settings screen',
      },
      {
        name: 'Surname preview',
        description:
          'Enter your family surname once; it appears alongside every name on the card so you can judge the full combination',
      },
      {
        name: 'Shortlist',
        description:
          'All liked names are saved to a persistent list with copy-to-clipboard and native Web Share API support',
      },
      {
        name: 'Progress tracking',
        description:
          'A counter in the nav shows how many names you have seen out of the total filtered set',
      },
      {
        name: 'Persistent state',
        description:
          'Settings, liked names, and seen names all survive page reloads via localStorage; nothing is lost between sessions',
      },
    ],
    modulesHeading: "What's inside",

    technicalHighlights: [
      {
        title: 'Touch gesture handling without a library',
        description:
          'Swipe detection is implemented from scratch using React touch event handlers (onTouchStart, onTouchMove, onTouchEnd). The delta from the initial touch position drives a live CSS transform — translateX and a proportional rotation — applied inline while dragging. Once the finger lifts, if the displacement exceeds a 100px threshold the like or discard action fires; otherwise the card springs back. This avoids any gesture library dependency while giving native-feeling drag behaviour.',
      },
      {
        title: 'Animated card exit',
        description:
          'When a swipe is confirmed, a CSS class (card-exit-left or card-exit-right) is applied to the card to trigger a fly-off animation. A 400ms setTimeout then actually advances the dataset, so the animation plays out fully before the next card mounts. The swipeDirection state flag also blocks rapid double-firing during the animation window.',
      },
      {
        title: 'Filtered and shuffled dataset via useMemo',
        description:
          'The full name dataset is filtered by gender setting and then passed through a Fisher-Yates shuffle, both wrapped in useMemo. The shuffle only reruns when the gender preference changes, so names appear in a different random order each session without recalculating on every render. A second derived value computes only the unseen names, giving the current card without any index management.',
      },
      {
        title: 'Three-view navigation with a single state variable',
        description:
          "The entire app fits in one component tree with a view state of type 'discovery' | 'shortlist' | 'settings'. There is no router — view switches are instant and stateless. Each view mounts with a Tailwind animate-in / slide-in-from-bottom transition for a smooth feel without animation libraries.",
      },
      {
        title: 'localStorage persistence',
        description:
          'Three independent keys store settings (gender, surname), liked names (array), and seen names (serialised Set). Each is initialised via a lazy useState initialiser that reads from localStorage on first mount. Separate useEffect hooks write each slice back whenever it changes. Removing a name from the shortlist also removes it from the seen set so it can reappear in the discovery queue.',
      },
      {
        title: 'Web Share API with clipboard fallback',
        description:
          "The shortlist share button calls navigator.share() on devices that support it, passing the full name list as plain text. On desktop browsers that do not support the Share API it falls back silently to navigator.clipboard.writeText(). AbortError (user cancels the share sheet) is caught and swallowed so no error surfaces to the user.",
      },
    ],

    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'lucide-react',
      'GitHub Pages',
    ],

    tryIt: {
      heading: 'Try it',
      body: 'MimiMatch is deployed as a static site on GitHub Pages and works on any mobile browser — no install required.',
      liveUrl: 'https://fveskrna.github.io/MimiMatch/',
      liveLabel: 'Open MimiMatch',
      githubUrl: 'https://github.com/FVeskrna/MimiMatch',
    },
  },

  {
    slug: 'reddit-bot',
    title: 'Reddit Video Compilation Bot',
    tagline:
      'A Python automation pipeline that scrapes Reddit, compiles vertical videos, and uploads to YouTube',
    tags: ['Python', 'PRAW', 'MoviePy', 'YouTube Data API', 'FFmpeg'],
    githubUrl: 'https://github.com/FVeskrna/Reddit-Video-Compilation-Bot',

    context:
      'This is a personal automation project built to remove the manual work from running a short-form video compilation channel. The idea was to fully automate the pipeline from source content to published video — scraping trending clips from Reddit, filtering them to a consistent format, merging them into a single compilation, and uploading the result directly to YouTube. The project is split into three independent scripts that can be run separately or chained together into a single end-to-end run.',

    overview:
      'The bot connects to Reddit via the PRAW API and pulls top posts from configurable subreddits over a chosen time window. It filters for vertical (9:16) video posts that fall within a per-clip duration limit, downloads them, and merges them into a 1080p compilation using MoviePy and FFmpeg. Previous output files are automatically archived before each new run. When the compilation is ready, a separate upload script authenticates with the YouTube Data API v3 via OAuth2 and publishes the video with a title, description, and privacy status — all without any manual browser interaction. Credentials refresh automatically between runs so the bot can operate unattended on a schedule.',

    modules: [
      {
        name: 'Download',
        description:
          'Scrapes Reddit, filters clips by aspect ratio and duration, downloads and merges them into a single final_video.mp4',
      },
      {
        name: 'Upload',
        description:
          'Authenticates with YouTube via OAuth2 and publishes any prepared .mp4 with a title, description, and category',
      },
      {
        name: 'Full pipeline',
        description:
          'Runs download and upload back-to-back in a single execution for fully automated end-to-end operation',
      },
    ],
    modulesHeading: 'Three-script pipeline',

    features: [
      {
        title: 'Subreddit scraping with duration and format filtering',
        description:
          'The bot pulls top posts over a configurable time window (daily, weekly, etc.) from one or more subreddits via PRAW. Each post is checked for three conditions before downloading: it must be a video post, its duration must fall within a per-subreddit cap (e.g. max 10 seconds per clip), and it must be in vertical 9:16 aspect ratio. Posts failing any check are skipped and their temporary files cleaned up immediately.',
      },
      {
        title: 'Aspect ratio detection',
        description:
          'Orientation is verified by loading each downloaded file with MoviePy and checking the pixel dimensions. The check enforces exact 9:16 ratio as well as height > width, discarding any landscape or square clips before they reach the merge stage. This keeps the output consistently formatted for short-form platforms.',
      },
      {
        title: 'Clip ordering and randomisation',
        description:
          'The first five clips — assumed to be the highest-quality picks — are sorted by file creation time to appear first in the compilation. All remaining clips are randomly shuffled. This gives the opening of each video a reliable hook while keeping the rest varied between runs.',
      },
      {
        title: 'Video merging with MoviePy and FFmpeg',
        description:
          'Accepted clips are loaded as VideoFileClip objects, resized to 1280px height while preserving aspect ratio, concatenated in order, and exported as a single 1080p H.264 file at 24fps via FFmpeg. File handles are explicitly closed and gc.collect() is called after processing to avoid MoviePy\'s known handle-leak issues on Windows.',
      },
      {
        title: 'Automatic archiving',
        description:
          'Before each new download run, any existing final_video.mp4 in the output folder is renamed with a timestamp (DD_MM_YYYYHHMM.mp4) and moved to an Archive subfolder. This means no previous output is ever silently overwritten and every compilation is preserved.',
      },
      {
        title: 'YouTube upload with OAuth2 and token refresh',
        description:
          'The upload script authenticates using the YouTube Data API v3 with an OAuth2 InstalledAppFlow. Credentials are stored as a JSON token file after the first browser login. On every subsequent run the script checks whether the token is still valid — if expired, it refreshes automatically using the stored refresh token without requiring any user interaction. The video is uploaded with title, description, category ID, and privacy status all set programmatically.',
      },
    ],

    technicalHighlights: [
      {
        title: 'Environment variable credential management',
        description:
          'All sensitive values — Reddit client ID and secret, user agent string, YouTube token filename, and client secret filename — are read exclusively from environment variables via os.getenv(). No credentials appear anywhere in the source code, making the scripts safe to commit and share publicly.',
      },
      {
        title: 'Robust Reddit video URL extraction',
        description:
          "Reddit's media object structure is not consistent across posts. The download script uses a regex against the fallback_url field to extract the v.redd.it video ID and reconstruct a clean direct-download URL in the format https://v.redd.it/{id}/{quality}.mp4. Posts with missing, malformed, or non-video media objects are caught and skipped at each check point without crashing the run.",
      },
      {
        title: 'Total duration budget per subreddit',
        description:
          'Each subreddit call accepts a max_total_duration parameter. The bot accumulates video_duration values from the Reddit API (without downloading first) and stops fetching once the budget is exceeded. This controls the approximate length of the final compilation without needing to load or inspect the actual video files.',
      },
      {
        title: 'Memory and file handle management',
        description:
          "MoviePy holds file handles open for the lifetime of a VideoFileClip object. The script explicitly calls clip.close() on every clip after the merge and calls gc.collect() at strategic points to force handle release on Windows, where open handles block os.remove(). Individual rejected clips are deleted immediately after the orientation check rather than accumulating on disk.",
      },
      {
        title: 'Modular three-script architecture',
        description:
          'Download, upload, and combined pipeline are kept in separate files. Each script can be run independently — useful for re-uploading a manually edited compilation, or for running the scraper on a schedule and uploading later. The full pipeline script wires them together for unattended operation while keeping each concern isolated and testable on its own.',
      },
      {
        title: 'Automatic OAuth2 token persistence and refresh',
        description:
          'After the initial browser-based OAuth login, credentials are serialised to a JSON token file containing the access token, refresh token, token URI, client ID, and client secret. On every subsequent run the script loads this file, constructs a Credentials object, and calls credentials.refresh(Request()) if the access token has expired — all without opening a browser. This makes the upload step fully headless once the initial login has been completed.',
      },
    ],

    techStack: [
      'Python 3.9+',
      'PRAW',
      'redvid',
      'MoviePy',
      'FFmpeg',
      'YouTube Data API v3',
      'Google Auth OAuth2',
      'pydub',
      'tqdm',
    ],

    closing: {
      heading: 'View the source',
      body: 'The full source is available on GitHub. Credentials are managed entirely via environment variables — no API keys are present in the repository.',
      linkLabel: 'View on GitHub',
      linkUrl: 'https://github.com/FVeskrna/Reddit-Video-Compilation-Bot',
    },
  },

  {
    slug: 'sudoku-solver',
    title: 'Sudoku Solver',
    tagline: 'A Unity app that solves any Sudoku puzzle using a backtracking algorithm',
    tags: ['Unity', 'C#', 'Algorithms', 'Backtracking'],
    githubUrl: 'https://github.com/FVeskrna/Unity3D---Sudoku-solver',

    screenshots: [
      { filename: 'sudokuSolver-unsolved.png', caption: 'Puzzle loaded — ready to solve' },
      { filename: 'sudokuSolver-solved.png', caption: 'Solved state after backtracking completes' },
    ],

    context:
      'This is a focused algorithmic project built to explore how a classic constraint-satisfaction problem can be implemented cleanly inside Unity. Rather than using a game engine for a game, the idea was to use Unity as an interactive UI host for a pure algorithm — a pattern that appears often in engineering tooling and simulation work. The project keeps the scope tight: a correct, readable backtracking solver, a clear grid UI, and a clean separation between the solving logic and the rendering layer.',

    overview:
      'The application displays a 9×9 Sudoku grid pre-loaded with a puzzle. Clicking Solve runs the backtracking algorithm against the current board state and renders the completed grid when a solution is found. Clicking Reset restores the board to its original unsolved state. The solver is deterministic — given the same input it always produces the same solution — and fast enough for all human-grade puzzles without any perceptible delay.',

    algorithmSteps: [
      {
        step: 'Find the next empty cell',
        description:
          'Scan the 9×9 board in row-major order and return the coordinates of the first cell containing zero.',
      },
      {
        step: 'Try each candidate digit 1–9',
        description:
          'For the empty cell found, iterate through digits 1 to 9 as candidate values.',
      },
      {
        step: 'Check row, column and box constraints',
        description:
          'Before placing a digit, verify it does not already appear in the same row, the same column, or the same 3×3 subgrid — the three Sudoku constraints.',
      },
      {
        step: 'Place and recurse',
        description:
          'If the digit passes all three checks, write it into the board and recursively call the solver on the next empty cell.',
      },
      {
        step: 'Backtrack on dead ends',
        description:
          'If no digit from 1–9 is valid for a cell, reset the cell to zero and return false — triggering the previous recursive call to try its next candidate.',
      },
      {
        step: 'Terminate on success',
        description:
          'When no empty cells remain, all 81 cells satisfy the constraints and the solution is complete; the algorithm returns true and the UI renders the result.',
      },
    ],

    features: [
      {
        title: 'Clean grid UI',
        description:
          'A high-contrast 9×9 grid renders clearly in the Unity UI, with pre-filled clue cells visually distinct from solver-placed values. The board is fully readable at a glance without any visual noise.',
      },
      {
        title: 'Solve and Reset controls',
        description:
          'Two buttons give full control over the solver: Solve runs the backtracking algorithm and fills in the solution, Reset restores the board to its initial puzzle state. Both operate instantly.',
      },
      {
        title: 'Separated solver and rendering layers',
        description:
          'The backtracking logic operates entirely on a plain 9×9 integer array and has no dependency on Unity UI components. The rendering layer reads the board state and updates the grid display independently. This separation makes the solver logic easy to read, test, and extend in isolation.',
      },
      {
        title: 'Constraint validation',
        description:
          'Before placing any digit the solver checks all three Sudoku constraints — row uniqueness, column uniqueness, and 3×3 subgrid uniqueness — in a single validation pass. Any violation skips the candidate immediately without modifying the board.',
      },
    ],
    featuresHeading: 'Features',

    technicalHighlights: [
      {
        title: 'Depth-first search with implicit call stack',
        description:
          'The backtracking algorithm uses C# recursion rather than an explicit stack data structure. Each recursive call represents one tentative digit placement. The call stack itself acts as the backtrack history — returning false from any level automatically undoes that placement and resumes the parent call\'s candidate loop. This keeps the implementation concise and directly mirrors the logical structure of the algorithm.',
      },
      {
        title: 'In-place board mutation',
        description:
          'The solver works directly on a single 9×9 integer array rather than copying the board at each step. A digit is written into the array on the way down the recursion tree and set back to zero on the way back up. Because each recursive path either succeeds completely or fully unwinds its changes, the board is always in a consistent state with no auxiliary memory needed beyond the call stack.',
      },
      {
        title: 'Early termination on first solution',
        description:
          'The recursion returns true as soon as all cells are filled, immediately propagating the success up every pending call frame and halting all further candidate iteration. For typical well-formed Sudoku puzzles this means the solver finds the unique solution without exhausting the full search space.',
      },
      {
        title: 'Clean UI / logic separation',
        description:
          'The board model is a plain C# integer array with no Unity dependencies. The solver class operates entirely on this array and is independently testable without a scene. A separate Unity MonoBehaviour is responsible for reading the array and updating the UI text components. This boundary means the algorithm can be ported, benchmarked, or unit tested without touching any engine code.',
      },
    ],

    reflection: {
      heading: 'Limitations and possible extensions',
      body: 'The solver uses pure backtracking without human-style heuristics such as most-constrained cell selection or candidate elimination. For typical published puzzles this is fast enough to be imperceptible, but pathological inputs designed to defeat backtracking could produce slower runs. The project also does not detect puzzles with multiple solutions or report unsatisfiable inputs — it assumes a valid single-solution board. Natural extensions would include step-by-step visualisation of the search process, pencil-mark overlays, constraint propagation (AC-3), and import/export of puzzles from text or image.',
    },

    techStack: ['Unity', 'C#', 'Unity UI'],

    closing: {
      heading: 'View the source',
      body: 'The full source including the solver logic and Unity project files is available on GitHub.',
      linkLabel: 'View on GitHub',
      linkUrl: 'https://github.com/FVeskrna/Unity3D---Sudoku-solver',
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
