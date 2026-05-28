import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity, BarChart3, Brain, Dumbbell, MessageSquare, Target, Utensils, Zap, ArrowRight, CheckCircle2, ClipboardCheck, Trophy, Repeat, Scale, HeartPulse, Flame } from "lucide-react";
import rbptLogo from "./assets/rbpt-logo.png";
import coachimage from "./assets/headshot.png";
import screenDashboard from "./assets/screen-dashboard.png";
import screenWorkout from "./assets/screen-workout.png";
import screenNutrition from "./assets/screen-nutrition.png";
import screenMessaging from "./assets/screen-messaging.png";

const rbptLogoSrc = rbptLogo;
const coachImageSrc = coachimage;

const PHONE_W = 220;
const PHONE_H = 440;
const PHONE_DEPTH = 10;
const PHONE_RADIUS = 48;
const CAROUSEL_RADIUS = 240;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const systems = [
  { icon: Dumbbell, title: "Performance Programming", text: "Training plans built around progressive overload, exercise selection, and your current ability level." },
  { icon: Utensils, title: "Nutrition Strategy", text: "Clear calorie, protein, and habit targets without making nutrition impossible to follow." },
  { icon: Activity, title: "Recovery Optimization", text: "Training volume, sleep, soreness, and stress are considered so your plan stays productive." },
  { icon: BarChart3, title: "Performance Metrics", text: "Progress is tracked through body weight, photos, strength numbers, adherence, and weekly feedback." },
  { icon: MessageSquare, title: "Accountability System", text: "Consistent communication keeps you from guessing what to do next when progress slows down." },
  { icon: Brain, title: "Science Made Simple", text: "You get the why behind the plan without getting buried in complicated research terms." },
];

const appSteps = [
  { icon: Dumbbell, title: "Track Assigned Workouts", text: "Log sets, reps, weight, and rest times while following guided workouts directly inside the app." },
  { icon: Utensils, title: "In-App Nutrition Tracking", text: "Track calories and macros, scan barcodes, and monitor nutrition progress without needing separate apps." },
  { icon: ClipboardCheck, title: "Daily To-Do Lists", text: "Stay organized with scheduled tasks, habits, workouts, and weekly goals all in one dashboard." },
  { icon: MessageSquare, title: "Instant Messaging", text: "Direct messaging allows clients to ask questions, submit updates, and stay connected between check-ins." },
];

const coachingProcess = [
   "Submit your coaching application and provide details about your goals, training experience, lifestyle, and current challenges.",
  
  "RBPT will personally review your application and reach out to schedule a 1 on 1 video consultation to discuss your goals, expectations, and the best strategy moving forward.",
  
  "Get fully set up inside the RBPT App with your personalized training program, nutrition guidance, progress tracking tools, daily habits, and direct coach communication all organized in one place.",
  
  "Check in weekly, review progress, and make adjustments to training, nutrition, recovery, and habits based on your results and feedback.",
];

const testimonials = [
  {
    name: "Mike",
    result: "Confidence & Consistency",
    icon: Trophy,
    quote:
      "I used to be intimidated by the weight room. Unsure what to do and how to do it safely. I’ve been working with Ryan for a few months now and I couldn’t be happier with his help and support towards my goals and a healthier life. He keeps it fun and attainable yet challenging and encouraging. His well rounded knowledge from nutrition to exercise to general health allows for a tailored approach leading to consistent gains and progress. If you just need a little extra help to get on the right track or need the support, motivation, and accountability to stay on track Ryan is definitely your guy.",
  },
  {
    name: "Brad",
    result: "Strength & Confidence",
    icon: Dumbbell,
    quote:
      "I’ve gotten noticeably stronger, feel better day to day, and honestly have way more confidence in the gym now. The accountability and communication have probably been the biggest difference for me. Whether your goal is fat loss, building muscle, or just creating healthier habits, Ryan genuinely cares about helping you succeed.",
  },
  {
    name: "Linda",
    result: "Weight Loss & Lifestyle Change",
    icon: Scale,
    quote:
      "I always struggled with staying consistent. I’d be motivated for a few weeks, then completely fall off track. Working with Ryan helped me finally build a routine that fits my lifestyle and feels sustainable instead of overwhelming. He’s supportive without sugarcoating things and knows when to push you harder while still keeping everything realistic and manageable. I’ve learned more about training and nutrition in the last few months than I ever did trying to figure it out on my own. I’m down weight, stronger than I’ve been in years, and feel more confident overall.",
  },
  {
    name: "Chris",
    result: "Strength & Overall Health",
    icon: HeartPulse,
    quote:
      "As someone getting back into fitness after a long break, I was nervous about injuries and overdoing it. Ryan did an awesome job creating a program that met me where I was at while still helping me progress every week. What stands out most is how personalized everything feels. He actually listens, checks in consistently, and makes adjustments when needed. It never feels like you’re just another client. I’ve improved my strength, energy levels, and overall health more than I expected in such a short amount of time.",
  },
  {
    name: "Sarah",
    result: "Accountability & Sustainable Progress",
    icon: Repeat,
    quote:
      "I wanted more than just a workout plan. I needed accountability and someone who actually understood how to help me reach my goals without burning out. Ryan has been exactly that. His background and knowledge really show through in the way he explains training, recovery, and nutrition. Everything has a purpose, and it makes it easier to trust the process when you understand why you’re doing something. I’ve made more progress physically and mentally in the past few months than I had in years trying to do it alone.",
  },
  {
    name: "Amanda",
    result: "Body Recomposition",
    icon: Flame,
    quote:
      "I’ve worked with other trainers before, but this was the first time I felt like the coaching was truly individualized. Ryan pays attention to the details and makes adjustments based on your goals, schedule, and progress. He keeps you motivated while also making the process enjoyable and realistic. There’s no crash dieting or impossible routines, just a smart approach that actually works long term. I’m stronger, leaner, and feel healthier overall. Couldn’t recommend him enough.",
  },
];

const faqs = [
  { q: "Is this only for advanced lifters?", a: "No. RBPT is built for beginners, intermediate lifters, and experienced clients who want more structure." },
  { q: "Do I get a custom workout plan?", a: "Yes. Programming is built around your goals, schedule, equipment, training history, and recovery needs." },
  { q: "Do I have to follow a strict meal plan?", a: "Not necessarily. The goal is to build a nutrition strategy that fits your lifestyle while still moving you toward your goal." },
  { q: "What makes this different?", a: "The coaching combines exercise science, practical experience, accountability, and simple systems you can actually follow." },
];

function RBPTLogo({ className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-black ${className}`} aria-label="RBPT logo">
      <img
        src={rbptLogoSrc}
        alt="RBPT logo"
        className="h-full w-full object-contain"
        draggable={false}
        onError={(event) => { event.currentTarget.style.display = "none"; }}
      />
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "#coach", label: "Meet Your Coach" },
    { href: "#app", label: "App" },
    { href: "#process", label: "How It Works" },
    { href: "#results", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="relative z-50 mx-auto max-w-7xl px-4 py-5 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#1D6BFF]/40 bg-black p-2 shadow-[0_0_30px_rgba(29,107,255,0.25)]">
            <RBPTLogo className="h-full w-full" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold tracking-[0.25em] text-white">RBPT Coaching</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-[#AAB4C3] md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#apply" className="hidden rounded-full bg-[#1D6BFF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(29,107,255,0.45)] hover:bg-[#49A6FF] md:inline-flex">
          Apply Now
        </a>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-[#0E131B]/90 px-5 py-3 text-sm font-semibold text-[#AAB4C3] hover:border-[#1D6BFF]/50 hover:text-white"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          Menu
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <a href="#apply" className="inline-flex w-full items-center justify-center rounded-full bg-[#1D6BFF] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(29,107,255,0.45)] hover:bg-[#49A6FF]">
          Apply Now
        </a>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-4 top-full z-50 rounded-3xl border border-white/10 bg-[#05070B]/95 p-4 shadow-2xl md:hidden">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function HeroMetricSlider() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative z-0">
      <div className="relative mx-auto h-[430px] w-full max-w-[calc(100vw-2rem)] rounded-[2rem] border border-white/10 bg-[#0E131B]/80 p-3 shadow-2xl backdrop-blur sm:h-[520px] sm:max-w-[520px] sm:rounded-[2.5rem] sm:p-5">
        <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_20%,rgba(29,107,255,0.35),transparent_40%)]" />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070B] p-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:34px_34px] opacity-35" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#AAB4C3]">Live Progress</p>
              <p className="mt-1 text-xl font-bold">Body Metrics Dashboard</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1D6BFF]/40 bg-black shadow-[0_0_28px_rgba(29,107,255,0.35)]">
              <BarChart3 className="h-6 w-6 text-[#49A6FF]" />
            </div>
          </div>

          <div className="relative z-10 mt-5 flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
            <motion.div
              className="flex h-full w-[300%]"
              animate={{ x: ["0%", "0%", "-33.333%", "-33.333%", "-66.666%", "-66.666%", "0%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.34, 0.58, 0.67, 0.91, 1] }}
            >
              <WeightPanel />
              <MusclePanel />
              <HealthPanel />
            </motion.div>
          </div>

          <div className="relative z-10 mt-4 flex justify-center gap-2">
            <div className="h-2 w-8 rounded-full bg-[#49A6FF]" />
            <div className="h-2 w-2 rounded-full bg-white/25" />
            <div className="h-2 w-2 rounded-full bg-white/25" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WeightPanel() {
  return (
    <div className="h-full w-1/3 shrink-0 p-5 min-w-0">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#49A6FF]">Weight Loss</p><p className="mt-1 text-4xl font-black">-18.4 lb</p></div>
        <p className="rounded-full bg-[#1D6BFF]/15 px-3 py-1 text-xs font-bold text-[#49A6FF]">12 weeks</p>
      </div>
      <div className="mt-5 h-[190px] rounded-3xl border border-white/10 bg-[#05070B]/75 p-4">
        <svg viewBox="0 0 360 150" className="h-full w-full overflow-visible">
          <defs><linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#49A6FF" stopOpacity="0.35" /><stop offset="100%" stopColor="#49A6FF" stopOpacity="0" /></linearGradient></defs>
          <path d="M10 30 C55 45, 75 58, 115 61 C155 64, 165 87, 208 89 C245 91, 265 111, 350 122" fill="none" stroke="#49A6FF" strokeWidth="6" strokeLinecap="round" />
          <path d="M10 30 C55 45, 75 58, 115 61 C155 64, 165 87, 208 89 C245 91, 265 111, 350 122 L350 150 L10 150 Z" fill="url(#weightFill)" />
          {[10, 115, 208, 350].map((x, i) => <circle key={i} cx={x} cy={[30, 61, 89, 122][i]} r="6" fill="#F4F7FA" />)}
        </svg>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <MiniStat label="Start" value="214" />
        <MiniStat label="Current" value="195.6" />
        <MiniStat label="Trend" value="Down" accent />
      </div>
    </div>
  );
}

function MusclePanel() {
  return (
    <div className="h-full w-1/3 shrink-0 p-5 min-w-0">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#49A6FF]">Muscle Mass</p><p className="mt-1 text-4xl font-black">+4.7%</p></div>
        <p className="rounded-full bg-[#1D6BFF]/15 px-3 py-1 text-xs font-bold text-[#49A6FF]">Lean gain</p>
      </div>
      <div className="mt-5 grid h-[190px] grid-cols-5 items-end gap-4 rounded-3xl border border-white/10 bg-[#05070B]/75 p-4">
        {[42, 50, 58, 68, 79].map((height, i) => (
          <div key={i} className="flex h-full flex-col justify-end gap-2">
            <div className="rounded-t-2xl bg-gradient-to-t from-[#1D6BFF] to-[#49A6FF] shadow-[0_0_24px_rgba(29,107,255,0.45)]" style={{ height: `${height}%` }} />
            <p className="text-center text-[11px] text-[#AAB4C3]">W{i + 1}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-[#1D6BFF]/25 bg-[#1D6BFF]/10 p-4">
        <div className="flex items-center justify-between text-sm"><span className="text-[#AAB4C3]">Lean mass target</span><span className="font-bold text-[#49A6FF]">On pace</span></div>
      </div>
    </div>
  );
}

function HealthPanel() {
  const markers = [
    { label: "Sleep", value: "82%" },
    { label: "Steps", value: "91%" },
    { label: "Hydration", value: "76%" },
    { label: "Adherence", value: "94%" },
  ];

  return (
    <div className="h-full w-1/3 shrink-0 p-5 min-w-0">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#49A6FF]">Health Marker</p><p className="mt-1 text-4xl font-black">87%</p></div>
        <p className="rounded-full bg-[#1D6BFF]/15 px-3 py-1 text-xs font-bold text-[#49A6FF]">Recovery</p>
      </div>
      <div className="mt-5 rounded-3xl border border-white/10 bg-[#05070B]/75 p-4">
        {markers.map((item) => (
          <div key={item.label} className="mb-4 last:mb-0">
            <div className="mb-2 flex items-center justify-between text-sm"><span className="text-[#AAB4C3]">{item.label}</span><span className="font-bold">{item.value}</span></div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/10"><div className="h-2.5 rounded-full bg-[#49A6FF]" style={{ width: item.value }} /></div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3"><MiniStat label="Check-ins" value="12/12" /><MiniStat label="Status" value="Improving" accent /></div>
    </div>
  );
}

function MiniStat({ label, value, accent = false }) {
  return <div className="rounded-2xl bg-white/[0.05] p-3"><p className="text-[11px] text-[#AAB4C3]">{label}</p><p className={`text-sm font-black ${accent ? "text-[#49A6FF]" : ""}`}>{value}</p></div>;
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 xl:grid-cols-2 xl:pb-28 xl:pt-24">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1D6BFF]/30 bg-[#0E131B]/80 px-4 py-2 text-sm text-[#AAB4C3] backdrop-blur">
          <Zap className="h-4 w-4 text-[#49A6FF]" /> Evidence-based. Built for real life.
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="max-w-full break-words text-[2.35rem] font-black leading-[0.9] tracking-[-0.055em] min-[430px]:text-[3rem] sm:text-6xl xl:text-7xl"
        >
          YOUR COACH 
          IN YOUR POCKET.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-xl text-sm leading-7 text-[#AAB4C3] min-[430px]:text-base sm:text-lg sm:leading-8"
        >
          Built for people who want more than generic workout plans. RBPT combines performance focused training, practical nutrition, and real accountability to help you build strength, improve your physique, and perform at a higher level..
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
        >
          <a href="#apply" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1D6BFF] px-7 py-4 font-semibold text-white shadow-[0_0_34px_rgba(29,107,255,0.45)] hover:bg-[#49A6FF]">Apply For Coaching <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
          
        </motion.div>
      </motion.div>
      <HeroMetricSlider />
    </section>
  );
}

function CoachingSection() {
  return (
    <section id="coaching" className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeader eyebrow="The RBPT System" title="Simple systems. Serious results." text="RBPT combines structured training, practical nutrition, and consistent feedback so you know exactly what to do each week." />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {systems.map((item) => <FeatureCard key={item.title} {...item} />)}
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="min-w-0 rounded-[2rem] border border-white/10 bg-[#0E131B]/80 p-6 transition hover:border-[#1D6BFF]/50 hover:bg-[#111A28]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1D6BFF]/15 text-[#49A6FF]"><Icon className="h-6 w-6" /></div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-[#AAB4C3]">{text}</p>
    </motion.div>
  );
}

function AppSection() {
  return (
    <section id="app" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
        <div>
          <SectionHeader eyebrow="The RBPT App" title="Everything you need. All in one place." text="The RBPT app keeps training, nutrition, daily tasks, and coach communication organized so clients know exactly what to do each day." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">{appSteps.map((item) => <AppStep key={item.title} {...item} />)}</div>
        </div>
        <PhoneCarousel />
      </div>
    </section>
  );
}

function AppStep({ icon: Icon, title, text }) {
  return (
    <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1D6BFF]/15 text-[#49A6FF]"><Icon className="h-5 w-5" /></div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#AAB4C3]">{text}</p>
    </div>
  );
}

function PhoneCarousel() {
  const [activePhoneIndex, setActivePhoneIndex] = useState(0);
  const [carouselAngle, setCarouselAngle] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const dragStartX = useRef(0);
  const dragCurrentDelta = useRef(0);
  const activePointerId = useRef(null);

  const phoneScale =
    viewportWidth < 640
      ? Math.min(0.78, Math.max(0.66, viewportWidth / 580))
      : Math.min(0.86, Math.max(0.68, viewportWidth / 1040));
  const carouselRadius =
    viewportWidth < 640
      ? Math.min(178, Math.max(142, viewportWidth * 0.36))
      : Math.min(220, Math.max(168, viewportWidth * 0.24));
  const stageHeight =
    viewportWidth < 640
      ? Math.min(610, Math.max(540, viewportWidth * 1.25))
      : Math.min(635, Math.max(570, viewportWidth * 0.55));

  const phones = [
    {
      title: "Dashboard",
      label: "Dashboard",
      screen: screenDashboard,
      rotate: 0,
      bubbleTitle: "Dashboard",
      bubbleText: "View daily goals, progress, and client tasks in one place.",
    },
    {
      title: "Workouts",
      label: "Workouts",
      screen: screenWorkout,
      rotate: 90,
      bubbleTitle: "Workouts",
      bubbleText: "Follow assigned training with sets, reps, weight, and notes.",
    },
    {
      title: "Nutrition",
      label: "Nutrition",
      screen: screenNutrition,
      rotate: 180,
      bubbleTitle: "Nutrition",
      bubbleText: "Track calories, macros, habits, and nutrition consistency.",
    },
    {
      title: "Messaging",
      label: "Messaging",
      screen: screenMessaging,
      rotate: 270,
      bubbleTitle: "Messaging",
      bubbleText: "Stay connected with direct coaching support between check-ins.",
    },
  ];

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const interactiveAngle = carouselAngle + clamp(dragDelta * 0.22, -38, 38);

  const getClosestCarouselAngle = (currentAngle, targetIndex) => {
    const normalizedTarget = (targetIndex + phones.length) % phones.length;
    const baseAngle = -normalizedTarget * 90;
    const options = [baseAngle - 360, baseAngle, baseAngle + 360];

    return options.reduce((closest, option) =>
      Math.abs(option - currentAngle) < Math.abs(closest - currentAngle)
        ? option
        : closest
    );
  };

  const rotateToPhone = (direction) => {
    setHasInteracted(true);
    setDragDelta(0);

    setCarouselAngle((current) => current - direction * 90);
    setActivePhoneIndex((current) => {
      const nextIndex = current + direction;
      return (nextIndex + phones.length) % phones.length;
    });
  };

  const setPhoneIndex = (targetIndex) => {
    setHasInteracted(true);
    setDragDelta(0);

    const normalizedTarget = (targetIndex + phones.length) % phones.length;

    setCarouselAngle((current) => getClosestCarouselAngle(current, normalizedTarget));
    setActivePhoneIndex(normalizedTarget);
  };

  const nextPhone = () => {
    rotateToPhone(1);
  };

  const previousPhone = () => {
    rotateToPhone(-1);
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    activePointerId.current = event.pointerId;
    dragStartX.current = event.clientX;
    dragCurrentDelta.current = 0;
    setIsDragging(true);
    setHasInteracted(true);
    setDragDelta(0);

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const finishDrag = (finalDelta) => {
    const threshold = viewportWidth < 640 ? 34 : 48;

    setIsDragging(false);
    activePointerId.current = null;
    dragCurrentDelta.current = 0;
    setDragDelta(0);

    if (finalDelta > threshold) {
      rotateToPhone(-1);
    } else if (finalDelta < -threshold) {
      rotateToPhone(1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleWindowPointerMove = (event) => {
      if (activePointerId.current !== null && event.pointerId !== activePointerId.current) return;
      const nextDelta = event.clientX - dragStartX.current;
      dragCurrentDelta.current = nextDelta;
      setDragDelta(nextDelta);
    };

    const handleWindowPointerUp = (event) => {
      if (activePointerId.current !== null && event.pointerId !== activePointerId.current) return;
      finishDrag(dragCurrentDelta.current);
    };

    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);
    window.addEventListener("pointercancel", handleWindowPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
      window.removeEventListener("pointercancel", handleWindowPointerUp);
    };
  }, [isDragging, viewportWidth, activePhoneIndex]);

  return (
    <div
      className="relative mx-auto w-full max-w-[720px] overflow-visible"
      style={{ touchAction: "pan-y" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-visible rounded-[2rem] border border-[#1D6BFF]/25 bg-[#05070B]/95 p-3 shadow-[0_0_35px_rgba(29,107,255,0.12)] sm:rounded-[2.5rem] sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_58%,rgba(29,107,255,0.18),transparent_62%)] sm:rounded-[2.5rem]" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] border border-white/[0.035] sm:rounded-[calc(2.5rem-1px)]" />

        <div className="absolute left-1/2 top-4 z-30 hidden -translate-x-1/2 rounded-full border border-[#1D6BFF]/25 bg-[#07111F]/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#AAB4C3] shadow-[0_0_18px_rgba(29,107,255,0.12)] backdrop-blur sm:block">
          Drag to rotate
        </div>

        <button
          type="button"
          onClick={previousPhone}
          className="absolute left-3 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#1D6BFF]/25 bg-[#07111F]/85 text-white shadow-[0_0_24px_rgba(29,107,255,0.18)] backdrop-blur transition hover:border-[#49A6FF]/55 hover:bg-[#1D6BFF]/20 sm:left-5"
          aria-label="Previous app screen"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={nextPhone}
          className="absolute right-3 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#1D6BFF]/25 bg-[#07111F]/85 text-white shadow-[0_0_24px_rgba(29,107,255,0.18)] backdrop-blur transition hover:border-[#49A6FF]/55 hover:bg-[#1D6BFF]/20 sm:right-5"
          aria-label="Next app screen"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div
          className={`relative z-10 flex select-none items-center justify-center overflow-visible [perspective:1600px] ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ minHeight: stageHeight, touchAction: "none" }}
          onPointerDown={handlePointerDown}
        >
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-[#05070B] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-[#05070B] to-transparent sm:w-24" />

          <motion.div
            className="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-full border border-[#1D6BFF]/30 bg-[#07111F]/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D3DAE5] shadow-[0_0_20px_rgba(29,107,255,0.18)] backdrop-blur sm:hidden"
            animate={hasInteracted ? { opacity: 0, y: -8 } : { opacity: [0.7, 1, 0.7], y: [0, -3, 0] }}
            transition={hasInteracted ? { duration: 0.25 } : { duration: 1.8, repeat: Infinity }}
          >
            Swipe to explore
          </motion.div>

          <div
            className="relative [transform-style:preserve-3d] will-change-transform"
            style={{
              width: PHONE_W,
              height: PHONE_H,
              transform: `translateY(${viewportWidth < 640 ? -56 : -58}px) scale(${phoneScale}) rotateX(-7deg) rotateY(${interactiveAngle}deg)`,
              transformOrigin: "center center",
              transition: isDragging
                ? "none"
                : "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {phones.map((phone) => (
              <div
                key={phone.title}
                className="absolute inset-0 [transform-style:preserve-3d]"
                style={{
                  transform: `rotateY(${phone.rotate}deg) translateZ(${carouselRadius}px)`,
                }}
              >
                <Phone3D {...phone} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-20 mt-4 grid grid-cols-2 gap-2 pb-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
          {phones.map((phone, index) => (
            <button
              key={phone.title}
              type="button"
              onClick={() => setPhoneIndex(index)}
              className={`inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-center text-xs font-bold transition sm:w-auto ${
                activePhoneIndex === index
                  ? "bg-[#1D6BFF] text-white shadow-[0_0_20px_rgba(29,107,255,0.38)]"
                  : "border border-[#1D6BFF]/18 bg-[#07111F]/70 text-[#AAB4C3] hover:border-[#1D6BFF]/45 hover:bg-[#0B1524] hover:text-white"
              }`}
              aria-label={`Show ${phone.label} screen`}
            >
              {phone.label}
            </button>
          ))}
        </div>

      </motion.div>
    </div>
  );
}

function Phone3D({ title, label, screen, bubbleTitle, bubbleText }) {
  const halfDepth = PHONE_DEPTH / 2;

  return (
    <div
      className="relative [transform-style:preserve-3d]"
      style={{ width: PHONE_W, height: PHONE_H }}
      aria-label={`${title} app screen`}
    >
      {Array.from({ length: PHONE_DEPTH + 1 }).map((_, index) => {
        const z = index - halfDepth;
        const t = Math.abs(z) / halfDepth;
        const bevel = Math.max(0, t - (1 - 4 / halfDepth));
        const bevelT = bevel / (4 / halfDepth || 1);
        const inset = Math.round(Math.sin(bevelT * (Math.PI / 2)) * 2);
        const shade = 16 + Math.round(t * 24);

        return (
          <div
            key={index}
            className="absolute shadow-[0_12px_26px_rgba(0,0,0,0.32)]"
            style={{
              top: inset,
              left: inset,
              width: PHONE_W - inset * 2,
              height: PHONE_H - inset * 2,
              borderRadius: PHONE_RADIUS - inset,
              background: `rgb(${shade}, ${shade + 4}, ${shade + 10})`,
              transform: `translateZ(${z}px)`,
            }}
          />
        );
      })}

      <div
        className="absolute overflow-hidden"
        style={{
          inset: 4,
          borderRadius: PHONE_RADIUS - 4,
          transform: `translateZ(${-halfDepth}px) rotateY(180deg)`,
          background:
            "linear-gradient(145deg, #4B5565 0%, #232B36 45%, #0A0D12 100%)",
          boxShadow:
            "inset 0 0 10px rgba(255,255,255,0.04), inset 0 0 18px rgba(0,0,0,0.18)",
        }}
      >
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_30%,transparent_70%,rgba(255,255,255,0.06))]" />

        <div className="absolute left-4 top-4 h-[96px] w-[96px] rounded-[2rem] bg-[#161D27]/95 border border-white/10">
          <div className="absolute left-3 top-3 h-8 w-8 rounded-full bg-black border border-white/10 shadow-[inset_0_0_0_5px_#1B2534]" />
          <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-black border border-white/10 shadow-[inset_0_0_0_5px_#1B2534]" />
          <div className="absolute bottom-3 left-3 h-8 w-8 rounded-full bg-black border border-white/10 shadow-[inset_0_0_0_5px_#1B2534]" />
          <div className="absolute bottom-5 right-5 h-4 w-4 rounded-full bg-[#DCE6F5]" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={rbptLogoSrc}
            alt="RBPT"
            className="w-[120px] opacity-90 object-contain"
            draggable={false}
          />
        </div>
      </div>

      <div
        className="absolute bg-black p-[8px]"
        style={{
          inset: 4,
          borderRadius: PHONE_RADIUS - 4,
          transform: `translateZ(${halfDepth}px)`,
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 14px rgba(255,255,255,0.035)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden bg-black"
          style={{ borderRadius: PHONE_RADIUS - 13 }}
        >
          <img
            src={screen}
            alt={`${label} RBPT app screen`}
            className="h-full w-full object-cover object-top"
            draggable={false}
            decoding="async"
            loading="eager"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translate3d(0,0,1px) scale(1.0001)",
              WebkitTransform: "translate3d(0,0,1px) scale(1.0001)",
              WebkitFontSmoothing: "antialiased",
              imageRendering: "-webkit-optimize-contrast",
              filter: "contrast(1.04) saturate(1.04)",
              willChange: "transform",
            }}
          />

          <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[82px] -translate-x-1/2 rounded-full bg-black shadow-[0_2px_5px_rgba(0,0,0,0.45)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.14),transparent_24%,transparent_66%,rgba(255,255,255,0.06)_80%,transparent)] mix-blend-screen" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" style={{ borderRadius: PHONE_RADIUS - 13 }} />
        </div>
      </div>

      <div
        className="absolute top-[86px] h-12 w-[4px] rounded-full bg-[#7F8A9C]/70"
        style={{
          left: -3,
          transform: `translateZ(${halfDepth + 1}px)`,
        }}
      />
      <div
        className="absolute top-[112px] h-10 w-[4px] rounded-full bg-[#7F8A9C]/70"
        style={{
          right: -3,
          transform: `translateZ(${halfDepth + 1}px)`,
        }}
      />
      <div
        className="absolute top-[160px] h-10 w-[4px] rounded-full bg-[#7F8A9C]/70"
        style={{
          right: -3,
          transform: `translateZ(${halfDepth + 1}px)`,
        }}
      />

      <div
        className="absolute left-1/2 top-full mt-4 w-[220px] -translate-x-1/2 rounded-[1.15rem] border border-[#1D6BFF]/30 bg-[#07111F]/92 px-4 py-3 text-center shadow-[0_0_24px_rgba(29,107,255,0.20)] backdrop-blur-md"
        style={{
          transform: `translateX(-50%) translateZ(${halfDepth + 18}px)`,
          backfaceVisibility: "hidden",
        }}
      >
        <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-[#1D6BFF]/30 bg-[#07111F]/92" />
        <p className="relative text-xs font-black uppercase tracking-[0.18em] text-[#49A6FF]">
          {bubbleTitle}
        </p>
        <p className="relative mt-2 text-[11px] leading-4 text-[#D3DAE5]">
          {bubbleText}
        </p>
      </div>
    </div>
  );
}

function MeetCoachSection() {
  const credentials = [
    { icon: Brain, title: "Exercise Science Background", text: "Backed by a degree in Exercise Science with a focus on performance, biomechanics, and evidence-based training." },
    { icon: Activity, title: "Data-Driven Coaching", text: "Using performance data, progress tracking, and evidence-based strategies to deliver measurable client results." },
    { icon: Dumbbell, title: "Wide Range of Client Experience", text: "Experience working with clients from a wide range of backgrounds, including beginners, athletes, weight loss clients, and individuals focused on long-term health and performance." },
  ];

  return (
    <section id="coach" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
        <div className="relative mx-auto w-full max-w-[500px] overflow-hidden rounded-[2rem] border border-[#1D6BFF]/20 bg-[#0E131B] p-4 sm:rounded-[2.5rem] sm:p-5 xl:max-w-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(29,107,255,0.22),transparent_55%)]" />
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#111A28] via-[#05070B] to-black sm:rounded-[2rem] xl:max-w-none">
            <img src={coachImageSrc} alt="Ryan Barker coach portrait" className="absolute inset-0 h-full w-full object-cover object-center scale-[1.12] opacity-95 translate-y-[3%] sm:scale-[1.18] sm:translate-y-[1%]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/75 to-transparent" />
            <div className="absolute left-6 top-6 rounded-full border border-[#1D6BFF]/30 bg-[#1D6BFF]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#49A6FF] backdrop-blur">Meet Your Coach</div>
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
              <p className="text-3xl font-black tracking-[-0.05em] sm:text-4xl">Ryan Barker</p>
              <p className="mt-2 text-base text-[#AAB4C3] sm:text-lg">Health, Wellness & Performance Coach</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">{["Strength Training", "Nutrition", "Accountability", "Health & Longevity"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-white sm:px-4 sm:py-3 sm:text-sm">{item}</div>)}</div>
            </div>
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="Meet Your Coach" title="Results-driven coaching focused on strength, health, and long-term success." text="I help clients improve their health, performance, and confidence through personalized coaching focused on strength training, nutrition, accountability, and long-term wellness." />
          <div className="mt-8 space-y-4">{credentials.map((item) => <CredentialCard key={item.title} {...item} />)}</div>
        </div>
      </div>
    </section>
  );
}

function CredentialCard({ icon: Icon, title, text }) {
  return <div className="flex gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1D6BFF]/15 text-[#49A6FF]"><Icon className="h-6 w-6" /></div><div><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 leading-7 text-[#AAB4C3]">{text}</p></div></div>;
}

function ScienceSection() {
  return (
    <section id="science" className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <SectionHeader eyebrow="Science Based" title="Backed by science. Explained like a coach." text="The goal is not to overwhelm you with complicated terms. The goal is to use exercise science in a way that makes your training more effective and easier to understand." />
          <div className="grid gap-4 sm:grid-cols-2">{["Progressive overload", "Recovery management", "Nutrition adherence", "Exercise selection", "Weekly feedback", "Long-term consistency"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#05070B]/70 p-4"><CheckCircle2 className="h-5 w-5 text-[#49A6FF]" /><span className="text-sm font-medium text-[#F4F7FA]">{item}</span></div>)}</div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const testimonial = testimonials[activeIndex];
  const GoalIcon = testimonial.icon;

  return (
    <section id="results" className="relative overflow-hidden px-6 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#49A6FF]">
            Testimonials
          </p>
          <h2 className="mt-4 max-w-full break-words text-3xl font-black leading-[1] tracking-[-0.04em] sm:text-5xl xl:text-6xl">
            Real people. Real progress.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#AAB4C3]">
            Personalized coaching focused on sustainable progress, accountability, and long term results.
          </p>
        </div>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0E131B]/90 p-7 shadow-[0_0_40px_rgba(29,107,255,0.10)] backdrop-blur-sm md:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(29,107,255,0.16),transparent_45%)]" />

          <div className="relative">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-3xl font-black text-white">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#49A6FF]">
                  {testimonial.result}
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#1D6BFF]/20 bg-[#1D6BFF]/10 text-[#49A6FF]">
                <GoalIcon className="h-7 w-7" />
              </div>
            </div>

            <p className="text-base leading-8 text-[#AAB4C3] md:text-lg md:leading-9">
              “{testimonial.quote}”
            </p>

            <div className="mt-8 flex flex-col items-center justify-between gap-5 sm:flex-row">
              <button
                type="button"
                onClick={prevSlide}
                className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-[#1D6BFF]/50 hover:bg-[#1D6BFF]/10 sm:w-auto"
              >
                Previous
              </button>

              <div className="flex items-center justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeIndex === index
                        ? "w-8 bg-[#49A6FF]"
                        : "w-2.5 bg-white/25 hover:bg-white/40"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                className="w-full rounded-full bg-[#1D6BFF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#49A6FF] sm:w-auto"
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader eyebrow="How It Works" title="From application to execution." />
        <div className="space-y-4">{coachingProcess.map((item, index) => <div key={item} className="flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1D6BFF] font-black">{index + 1}</div><h3 className="font-bold">{item}</h3></div>)}</div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center"><p className="text-sm font-bold uppercase tracking-[0.35em] text-[#49A6FF]">FAQ</p><h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">Common questions.</h2></div>
      <div className="mt-10 space-y-4">{faqs.map((item) => <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"><h3 className="font-bold">{item.q}</h3><p className="mt-2 leading-7 text-[#AAB4C3]">{item.a}</p></div>)}</div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="apply" className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[#1D6BFF]/30 bg-[#1D6BFF]/10 p-8 text-center md:p-16">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(73,166,255,0.30),transparent_50%)]" />

        <div className="relative mx-auto max-w-3xl">

          <Target className="mx-auto mb-6 h-12 w-12 text-[#49A6FF]" />

          <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
            Ready to take control of your fitness journey?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D3DAE5]">
            Apply for RBPT coaching and get a plan built around your goals,
            schedule, training level, and lifestyle.
          </p>

          <a
            href="https://form.typeform.com/to/Fs5TFRQF"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#05070B] transition hover:bg-[#DCE6F5]"
          >
            Start Application
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>
      </div>
    </section>
  );
}


function Footer() {
  return <footer className="relative z-10 border-t border-white/10 px-6 py-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-[#AAB4C3] md:flex-row md:items-center"><div className="flex items-center gap-3"><RBPTLogo className="h-10 w-10" /><p>© 2026 RBPT Coaching</p></div><div className="flex gap-6"><a href="#coach" className="hover:text-white">Meet Your Coach</a><a href="#app" className="hover:text-white">App</a><a href="#apply" className="hover:text-white">Apply</a></div></div></footer>;
}


function SectionHeader({ eyebrow, title, text }) {
  return <div className="max-w-3xl"><p className="text-sm sm:text-base font-bold uppercase tracking-[0.35em] text-[#49A6FF]">{eyebrow}</p><h2 className="mt-4 max-w-full break-words text-3xl font-black leading-[1] tracking-[-0.04em] sm:text-5xl xl:text-6xl">{title}</h2>{text && <p className="mt-5 text-base leading-7 text-[#AAB4C3] sm:text-lg sm:leading-8">{text}</p>}</div>;
}

export default function RBPTWebsite() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070B] text-[#F4F7FA]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-180px] right-[-180px] h-[460px] w-[460px] rounded-full bg-[#1D6BFF]/25 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-160px] h-[315px] w-[315px] rounded-full bg-[#49A6FF]/10 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_top,black,transparent_70%)]" />
      </div>
      <Header />
      <main className="relative z-10">
        <Hero />
        <MeetCoachSection />
        <AppSection />
        <ProcessSection />
        <ResultsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
