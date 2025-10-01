import React, { useState } from "react";
import {
  Home,
  BriefcaseBusiness,
  PieChart,
  ClipboardList,
  MessageSquareMore,
  Grid3x3,
  SlidersHorizontal,
  Backpack,
} from "lucide-react";

const TOKENS = {
  containerMaxW: 1200,
  containerRadius: 30,
  bg: "#dfeaf6",
  border: "#e9eef6",
  blue: "#215fb9",
  blueLight: "#9ec4ff",
  progressTrack: "#d9e5f3",
  text: "#0f172a",
  shellShadow: "0 24px 60px rgba(15,23,42,0.12)",
  cardShadow: "0 16px 40px rgba(15,23,42,0.10)",
  cardRadius: 18,
  sidebarLeftOffset: -40,
  sidebarTop: 112,
  sidebarWidth: 62,
};

const clamp01 = (n) => Math.max(0, Math.min(100, n));

function Logo() {
  const size = 38;
  const thickness = 3;
  const gapDeg = 80;

  return (
    <div className="flex items-center">
      <span className="relative inline-block leading-none">
        <span className="relative z-10 font-extrabold text-[28px] text-black">
          e
        </span>

        <span
          aria-hidden
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            left: -8,
            top: -2,
            background: `conic-gradient(from 120deg, #000 0 ${
              360 - gapDeg
            }deg, transparent ${360 - gapDeg}deg 360deg)`,
            WebkitMask: `radial-gradient(closest-side, transparent calc(100% - ${thickness}px), #000 0)`,
            mask: `radial-gradient(closest-side, transparent calc(100% - ${thickness}px), #000 0)`,
          }}
        />
      </span>

      <span className="font-extrabold text-[28px] leading-none text-black">
        xcuseme
      </span>
    </div>
  );
}

function ProgressBarExact({ value = 75 }) {
  const pct = clamp01(value);
  return (
    <div className="mt-2">
      <div className="relative">
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: TOKENS.progressTrack }}
        >
          <div
            className="h-full"
            style={{ width: `${pct}%`, background: TOKENS.blue }}
          />
        </div>
        <div
          className="absolute -top-4"
          style={{ left: `calc(${pct}% - 10px)` }}
        >
          <div className="px-1.5 py-0.5 rounded-md bg-white text-[10px] font-semibold text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.18)] border border-slate-200">
            {pct}%
          </div>
        </div>
      </div>
    </div>
  );
}

function Donut({ value = 63, size = 86 }) {
  const pct = clamp01(value);
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  const cx = size / 2;
  const cy = size / 2;

  const labelOffset = 8;
  const thetaLabelDeg = -15;
  const thetaLabel = (thetaLabelDeg * Math.PI) / 180;

  const lx = cx + (r + labelOffset) * Math.cos(thetaLabel);
  const ly = cy + (r + labelOffset) * Math.sin(thetaLabel);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={TOKENS.border}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={TOKENS.blue}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>

      <div
        className="absolute"
        style={{ left: lx, top: ly, transform: "translate(-50%, -50%)" }}
      >
        <div className="relative">
          <div className="px-1.5 py-0.5 rounded-md bg-white text-[10px] font-semibold text-slate-700 border border-slate-200 shadow-[0_6px_16px_rgba(15,23,42,0.15)]">
            {pct}%
          </div>
        </div>
      </div>
    </div>
  );
}

function CardShell({ children, rightIcon }) {
  return (
    <div
      className="bg-white p-6 border"
      style={{
        borderColor: TOKENS.border,
        borderRadius: TOKENS.cardRadius,
        boxShadow: TOKENS.cardShadow,
      }}
    >
      <div className="flex items-start justify-between">
        {children[0]}
        <div className="text-slate-500">{rightIcon}</div>
      </div>
      {children.slice(1)}
    </div>
  );
}

function NewMessageCard() {
  return (
    <CardShell rightIcon={<MessageSquareMore className="w-5 h-5" />}>
      {/* header */}
      <div className="text-[16px] text-slate-700">New Message</div>
      {/* body */}
      <div
        className="mt-1 text-[44px] leading-none font-semibold"
        style={{ color: TOKENS.text }}
      >
        85
      </div>
      <div
        className="my-3 -mx-6"
        style={{ height: 1, background: TOKENS.border }}
      />
      <ProgressBarExact value={75} />
      <div className="mt-2 text-[13px] font-semibold text-slate-800">
        Response Rate
      </div>
    </CardShell>
  );
}

function LeadsCard() {
  return (
    <CardShell rightIcon={<Grid3x3 className="w-4 h-4" />}>
      {/* header */}
      <div className="text-[16px] text-slate-700">Leads</div>
      {/* body */}
      <div
        className="mt-1 text-[44px] leading-none font-semibold"
        style={{ color: TOKENS.text }}
      >
        85
      </div>
      <div className="mt-2 flex items-start gap-5">
        <div className="text-[13px] mt-1">
          <div>
            <span className="font-semibold">60%</span>{" "}
            <span className="text-black">Daily Goal</span>
          </div>
          <div>
            <span className="font-semibold text-xs ml-3">72</span>{" "}
            <span className="text-black">This week</span>
          </div>
        </div>
        <div className="-mt-3 ml-auto">
          <Donut value={63} />
        </div>
      </div>
    </CardShell>
  );
}

function LineChart() {
  const w = TOKENS.containerMaxW - 80;
  const h = 300;
  const padL = 56;
  const padR = 24;
  const padT = 18;
  const padB = 28;
  const yMax = 1250;

  const xLabels = Array.from({ length: 11 }, () => "Text");
  const seriesDark = [560, 1000, 0, 520, 700, 300, 100, 820, 600, 450, 750];
  const seriesLight = [300, 340, 260, 230, 600, 450, 250, 720, 950, 1100, 1200];

  const X = (i) => padL + (i * (w - padL - padR)) / (xLabels.length - 1);
  const Y = (v) => padT + (yMax - v) * ((h - padT - padB) / yMax);

  const gridYs = [0, 250, 500, 750, 1000, 1250];

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[280px]">
        {gridYs.map((gy) => (
          <g key={gy}>
            <line
              x1={padL}
              y1={Y(gy)}
              x2={w - padR}
              y2={Y(gy)}
              stroke={TOKENS.border}
            />
            <text
              x={padL - 10}
              y={Y(gy)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-slate-400 text-[10px]"
            >
              {gy}
            </text>
          </g>
        ))}
        <polyline
          fill="none"
          stroke={TOKENS.blueLight}
          strokeWidth="4"
          points={seriesLight.map((v, i) => `${X(i)},${Y(v)}`).join(" ")}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {seriesLight.map((v, i) => (
          <circle key={`l-${i}`} cx={X(i)} cy={Y(v)} r={5} fill="#cfe0ff" />
        ))}
        <polyline
          fill="none"
          stroke={TOKENS.blue}
          strokeWidth="4"
          points={seriesDark.map((v, i) => `${X(i)},${Y(v)}`).join(" ")}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {seriesDark.map((v, i) => (
          <circle key={`d-${i}`} cx={X(i)} cy={Y(v)} r={6} fill={TOKENS.blue} />
        ))}
      </svg>
      <div
        className="mt-2 grid"
        style={{
          gridTemplateColumns: `repeat(${xLabels.length}, minmax(0,1fr))`,
          marginLeft: padL,
          marginRight: padR,
        }}
      >
        {xLabels.map((t, i) => (
          <div key={i} className="text-center text-[11px] text-slate-400">
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarPill() {
  return (
    <div
      className="hidden md:flex flex-col items-center absolute text-white"
      style={{
        left: TOKENS.sidebarLeftOffset,
        top: TOKENS.sidebarTop,
        width: TOKENS.sidebarWidth,
        background: "linear-gradient(180deg, #1f63b7 0%, #195ba9 100%)",
        borderRadius: 36,
        boxShadow: "0 26px 44px rgba(13,52,116,0.35)",
        padding: 14,
        gap: 26,
      }}
    >
      <div className="-mt-6">
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-white/18 blur-[6px]" />
        </div>
      </div>

      <div className="grid place-items-center w-12 h-12 rounded-full bg-[#2b74d5] ">
        <Home className="w-6 h-6 text-white" strokeWidth={2.4} />
      </div>
      <BriefcaseBusiness className="w-6 h-6 text-white/95" strokeWidth={2.2} />
      <PieChart className="w-6 h-6 text-white/95" strokeWidth={2.2} />
      <PieChart
        className="w-6 h-6 text-white/95"
        strokeWidth={2.2}
        style={{ transform: "rotate(25deg)" }}
      />
      <Backpack className="w-6 h-6 text-white/95 mb-1" strokeWidth={2.2} />
    </div>
  );
}

function PixelOverlay({ src, show }) {
  if (!src || !show) return null;
  return (
    <img
      src={src}
      alt="overlay"
      className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain"
      style={{ opacity: 0.25 }}
    />
  );
}

export default function ExcusemeDashboard({ overlaySrc }) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div
      className="min-h-screen w-full px-5 py-5"
      style={{ background: TOKENS.bg }}
    >
      <div
        className="relative mx-auto p-6 md:p-10 bg-white"
        style={{
          maxWidth: TOKENS.containerMaxW,
          borderRadius: TOKENS.containerRadius,
          boxShadow: TOKENS.shellShadow,
          border: `1px solid ${TOKENS.border}`,
        }}
      >
        <SidebarPill />

        <div className="flex items-center justify-between mb-8">
          <Logo />
          <div className="hidden md:flex items-center gap-10 text-black text-[15px]">
            <a className="hover:text-[#215fb9]" href="#">
              home
            </a>
            <a className="hover:text-[#215fb9]" href="#">
              support
            </a>
            <a className="hover:text-[#215fb9]" href="#">
              my account
            </a>
            <SlidersHorizontal className="w-5 h-5 text-slate-800" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-7 mb-10">
          <NewMessageCard />
          <LeadsCard />
          <NewMessageCard />
        </div>

        <div
          className="bg-white p-6"
          style={{
            borderRadius: 16,
            border: `1px solid ${TOKENS.border}`,
            boxShadow: TOKENS.cardShadow,
          }}
        >
          <LineChart />
        </div>

        <button
          onClick={() => setShowOverlay((s) => !s)}
          className="fixed bottom-5 right-5 bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs"
        >
          {showOverlay ? "Hide" : "Show"} overlay
        </button>
        <PixelOverlay src={overlaySrc} show={showOverlay} />
      </div>
    </div>
  );
}
