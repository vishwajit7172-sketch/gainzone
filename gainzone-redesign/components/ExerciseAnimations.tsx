'use client'

// Each exercise returns a self-contained animated SVG
// 2s loop, smooth CSS animations, anatomically clear stick figure

const BASE_COLOR = '#9090c0'
const ACTIVE_COLOR = '#E0FF4F'
const BAR_COLOR = '#5dd8f5'
const JOINT = '#f0f0ff'

export function SquatAnimation() {
  return (
    <svg viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'180px'}}>
      <defs>
        <style>{`
          .sq-body { animation: sq-body 2s ease-in-out infinite; transform-origin: 80px 90px; }
          .sq-legs { animation: sq-legs 2s ease-in-out infinite; transform-origin: 80px 120px; }
          @keyframes sq-body { 0%,100%{transform:translateY(0)} 50%{transform:translateY(18px)} }
          @keyframes sq-legs { 0%,100%{d:path('M65 120 L50 160 M65 120 L80 160 M95 120 L80 160 M95 120 L110 160')} }
        `}</style>
      </defs>
      {/* Barbell on traps */}
      <rect x="20" y="58" width="120" height="7" rx="3.5" fill={BAR_COLOR} opacity="0.9"/>
      <rect x="14" y="54" width="12" height="16" rx="4" fill={BAR_COLOR} opacity="0.7"/>
      <rect x="134" y="54" width="12" height="16" rx="4" fill={BAR_COLOR} opacity="0.7"/>

      <g className="sq-body">
        {/* Head */}
        <circle cx="80" cy="38" r="12" fill="none" stroke={JOINT} strokeWidth="2.5"/>
        {/* Neck */}
        <line x1="80" y1="50" x2="80" y2="62" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
        {/* Torso */}
        <line x1="80" y1="62" x2="80" y2="105" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
        {/* Arms holding bar */}
        <line x1="80" y1="70" x2="48" y2="65" stroke={ACTIVE_COLOR} strokeWidth="3" strokeLinecap="round"/>
        <line x1="80" y1="70" x2="112" y2="65" stroke={ACTIVE_COLOR} strokeWidth="3" strokeLinecap="round"/>
        {/* Hip joints */}
        <circle cx="68" cy="105" r="4" fill={JOINT}/>
        <circle cx="92" cy="105" r="4" fill={JOINT}/>
      </g>

      {/* Legs - animate separately */}
      <g style={{animation:'sq-body 2s ease-in-out infinite',transformOrigin:'80px 105px'}}>
        {/* Left thigh */}
        <line x1="68" y1="105" x2="54" y2="138" stroke={ACTIVE_COLOR} strokeWidth="4" strokeLinecap="round"/>
        {/* Right thigh */}
        <line x1="92" y1="105" x2="106" y2="138" stroke={ACTIVE_COLOR} strokeWidth="4" strokeLinecap="round"/>
        {/* Knee joints */}
        <circle cx="54" cy="138" r="4" fill={JOINT}/>
        <circle cx="106" cy="138" r="4" fill={JOINT}/>
        {/* Left shin */}
        <line x1="54" y1="138" x2="46" y2="168" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
        {/* Right shin */}
        <line x1="106" y1="138" x2="114" y2="168" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
        {/* Feet */}
        <line x1="38" y1="168" x2="56" y2="168" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
        <line x1="104" y1="168" x2="122" y2="168" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      </g>

      {/* Labels */}
      <text x="80" y="178" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">SQUAT</text>
    </svg>
  )
}

export function BenchAnimation() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'160px'}}>
      <defs>
        <style>{`
          .bp-arms { animation: bp-arms 2s ease-in-out infinite; transform-origin: 100px 75px; }
          @keyframes bp-arms { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
        `}</style>
      </defs>
      {/* Bench */}
      <rect x="30" y="105" width="140" height="10" rx="5" fill="#2a2a50"/>
      <line x1="50" y1="115" x2="50" y2="135" stroke="#2a2a50" strokeWidth="6" strokeLinecap="round"/>
      <line x1="150" y1="115" x2="150" y2="135" stroke="#2a2a50" strokeWidth="6" strokeLinecap="round"/>

      {/* Body lying down */}
      <line x1="45" y1="95" x2="155" y2="95" stroke={BASE_COLOR} strokeWidth="5" strokeLinecap="round"/>
      {/* Head */}
      <circle cx="38" cy="95" r="11" fill="none" stroke={JOINT} strokeWidth="2.5"/>
      {/* Hips/legs */}
      <line x1="150" y1="95" x2="165" y2="115" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="150" y1="95" x2="155" y2="115" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>

      {/* Animated arms + bar */}
      <g className="bp-arms">
        {/* Arms */}
        <line x1="90" y1="85" x2="70" y2="58" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="110" y1="85" x2="130" y2="58" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        {/* Bar */}
        <rect x="55" y="53" width="90" height="7" rx="3.5" fill={BAR_COLOR} opacity="0.9"/>
        <rect x="46" y="49" width="10" height="15" rx="3" fill={BAR_COLOR} opacity="0.7"/>
        <rect x="144" y="49" width="10" height="15" rx="3" fill={BAR_COLOR} opacity="0.7"/>
        {/* Hands */}
        <circle cx="70" cy="58" r="4" fill={JOINT}/>
        <circle cx="130" cy="58" r="4" fill={JOINT}/>
      </g>

      <text x="100" y="152" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">BENCH PRESS</text>
    </svg>
  )
}

export function PullupAnimation() {
  return (
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'200px'}}>
      <defs>
        <style>{`
          .pu-body { animation: pu-body 2.2s ease-in-out infinite; transform-origin: 80px 100px; }
          @keyframes pu-body { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-28px)} }
        `}</style>
      </defs>
      {/* Bar */}
      <rect x="15" y="18" width="130" height="8" rx="4" fill={BAR_COLOR} opacity="0.9"/>
      {/* Wall mounts */}
      <rect x="18" y="10" width="8" height="20" rx="3" fill="#2a2a50"/>
      <rect x="134" y="10" width="8" height="20" rx="3" fill="#2a2a50"/>

      <g className="pu-body">
        {/* Arms up to bar */}
        <line x1="62" y1="50" x2="50" y2="24" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="98" y1="50" x2="110" y2="24" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        {/* Hands on bar */}
        <circle cx="50" cy="24" r="5" fill={JOINT}/>
        <circle cx="110" cy="24" r="5" fill={JOINT}/>
        {/* Head */}
        <circle cx="80" cy="42" r="12" fill="none" stroke={JOINT} strokeWidth="2.5"/>
        {/* Torso */}
        <line x1="80" y1="54" x2="80" y2="108" stroke={BASE_COLOR} strokeWidth="4.5" strokeLinecap="round"/>
        {/* Shoulder joints */}
        <circle cx="62" cy="50" r="4" fill={JOINT}/>
        <circle cx="98" cy="50" r="4" fill={JOINT}/>
        {/* Hips */}
        <circle cx="68" cy="108" r="4" fill={JOINT}/>
        <circle cx="92" cy="108" r="4" fill={JOINT}/>
        {/* Left leg slightly bent */}
        <line x1="68" y1="108" x2="60" y2="148" stroke={BASE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="60" y1="148" x2="55" y2="178" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
        {/* Right leg */}
        <line x1="92" y1="108" x2="100" y2="148" stroke={BASE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="100" y1="148" x2="105" y2="178" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      </g>

      <text x="80" y="196" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">PULL-UP</text>
    </svg>
  )
}

export function DeadliftAnimation() {
  return (
    <svg viewBox="0 0 180 190" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'190px'}}>
      <defs>
        <style>{`
          .dl-up { animation: dl-up 2.2s ease-in-out infinite; transform-origin: 90px 130px; }
          @keyframes dl-up { 0%,100%{transform:rotate(0deg) translateY(0)} 50%{transform:rotate(35deg) translateY(8px)} }
        `}</style>
      </defs>
      {/* Barbell on floor */}
      <rect x="30" y="152" width="120" height="8" rx="4" fill={BAR_COLOR} opacity="0.9"/>
      <circle cx="35" cy="156" r="14" fill="none" stroke={BAR_COLOR} strokeWidth="3" opacity="0.7"/>
      <circle cx="145" cy="156" r="14" fill="none" stroke={BAR_COLOR} strokeWidth="3" opacity="0.7"/>

      {/* Standing figure - torso hinges */}
      <g className="dl-up">
        {/* Torso */}
        <line x1="90" y1="80" x2="90" y2="130" stroke={BASE_COLOR} strokeWidth="5" strokeLinecap="round"/>
        {/* Head */}
        <circle cx="90" cy="68" r="12" fill="none" stroke={JOINT} strokeWidth="2.5"/>
        {/* Arms down */}
        <line x1="78" y1="95" x2="55" y2="152" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="102" y1="95" x2="125" y2="152" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        {/* Hands gripping bar */}
        <circle cx="55" cy="152" r="5" fill={JOINT}/>
        <circle cx="125" cy="152" r="5" fill={JOINT}/>
      </g>

      {/* Legs static */}
      <circle cx="72" cy="132" r="4" fill={JOINT}/>
      <circle cx="108" cy="132" r="4" fill={JOINT}/>
      <line x1="72" y1="132" x2="62" y2="168" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="108" y1="132" x2="118" y2="168" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="48" y1="168" x2="72" y2="168" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      <line x1="108" y1="168" x2="132" y2="168" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>

      <text x="90" y="185" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">DEADLIFT</text>
    </svg>
  )
}

export function OHPAnimation() {
  return (
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'200px'}}>
      <defs>
        <style>{`
          .ohp-bar { animation: ohp-bar 2s ease-in-out infinite; transform-origin: 80px 90px; }
          @keyframes ohp-bar { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-28px)} }
        `}</style>
      </defs>
      {/* Standing figure */}
      <circle cx="80" cy="42" r="12" fill="none" stroke={JOINT} strokeWidth="2.5"/>
      <line x1="80" y1="54" x2="80" y2="115" stroke={BASE_COLOR} strokeWidth="5" strokeLinecap="round"/>
      {/* Legs */}
      <circle cx="68" cy="115" r="4" fill={JOINT}/>
      <circle cx="92" cy="115" r="4" fill={JOINT}/>
      <line x1="68" y1="115" x2="58" y2="155" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="92" y1="115" x2="102" y2="155" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="44" y1="155" x2="66" y2="155" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      <line x1="94" y1="155" x2="116" y2="155" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>

      {/* Animated arms + bar */}
      <g className="ohp-bar">
        <line x1="68" y1="82" x2="44" y2="95" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="92" y1="82" x2="116" y2="95" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="44" y1="95" x2="44" y2="72" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="116" y1="95" x2="116" y2="72" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <rect x="30" y="65" width="100" height="7" rx="3.5" fill={BAR_COLOR} opacity="0.9"/>
        <rect x="18" y="61" width="13" height="15" rx="4" fill={BAR_COLOR} opacity="0.7"/>
        <rect x="129" y="61" width="13" height="15" rx="4" fill={BAR_COLOR} opacity="0.7"/>
        <circle cx="44" cy="72" r="4" fill={JOINT}/>
        <circle cx="116" cy="72" r="4" fill={JOINT}/>
      </g>

      <text x="80" y="174" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">OVERHEAD PRESS</text>
    </svg>
  )
}

export function RDLAnimation() {
  return (
    <svg viewBox="0 0 180 190" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'190px'}}>
      <defs>
        <style>{`
          .rdl-torso { animation: rdl-torso 2.2s ease-in-out infinite; transform-origin: 90px 118px; }
          @keyframes rdl-torso { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(44deg)} }
        `}</style>
      </defs>
      {/* Legs */}
      <circle cx="72" cy="120" r="4" fill={JOINT}/>
      <circle cx="108" cy="120" r="4" fill={JOINT}/>
      <line x1="72" y1="120" x2="62" y2="162" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="108" y1="120" x2="118" y2="162" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="46" y1="162" x2="72" y2="162" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      <line x1="108" y1="162" x2="134" y2="162" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>

      {/* Torso hinges */}
      <g className="rdl-torso">
        <line x1="90" y1="118" x2="90" y2="60" stroke={BASE_COLOR} strokeWidth="5" strokeLinecap="round"/>
        <circle cx="90" cy="48" r="12" fill="none" stroke={JOINT} strokeWidth="2.5"/>
        {/* Arms with bar */}
        <line x1="78" y1="85" x2="52" y2="108" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="102" y1="85" x2="128" y2="108" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <rect x="38" y="104" width="104" height="8" rx="4" fill={BAR_COLOR} opacity="0.9"/>
        <circle cx="38" cy="108" r="11" fill="none" stroke={BAR_COLOR} strokeWidth="2.5" opacity="0.7"/>
        <circle cx="142" cy="108" r="11" fill="none" stroke={BAR_COLOR} strokeWidth="2.5" opacity="0.7"/>
        {/* Hamstring highlight */}
        <line x1="90" y1="118" x2="72" y2="120" stroke={ACTIVE_COLOR} strokeWidth="2" strokeDasharray="3,3" opacity="0.5"/>
        <line x1="90" y1="118" x2="108" y2="120" stroke={ACTIVE_COLOR} strokeWidth="2" strokeDasharray="3,3" opacity="0.5"/>
      </g>

      <text x="90" y="184" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">ROMANIAN DEADLIFT</text>
    </svg>
  )
}

export function CurlAnimation() {
  return (
    <svg viewBox="0 0 160 190" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'190px'}}>
      <defs>
        <style>{`
          .curl-arm { animation: curl-arm 1.8s ease-in-out infinite; transform-origin: 58px 84px; }
          .curl-arm2 { animation: curl-arm2 1.8s ease-in-out infinite; transform-origin: 102px 84px; }
          @keyframes curl-arm { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-58deg)} }
          @keyframes curl-arm2 { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(58deg)} }
        `}</style>
      </defs>
      <circle cx="80" cy="40" r="12" fill="none" stroke={JOINT} strokeWidth="2.5"/>
      <line x1="80" y1="52" x2="80" y2="110" stroke={BASE_COLOR} strokeWidth="5" strokeLinecap="round"/>
      <circle cx="68" cy="84" r="4" fill={JOINT}/>
      <circle cx="92" cy="84" r="4" fill={JOINT}/>
      <circle cx="68" cy="110" r="4" fill={JOINT}/>
      <circle cx="92" cy="110" r="4" fill={JOINT}/>
      <line x1="68" y1="110" x2="58" y2="150" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="92" y1="110" x2="102" y2="150" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="42" y1="150" x2="66" y2="150" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      <line x1="94" y1="150" x2="118" y2="150" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>

      {/* Left arm curls */}
      <g className="curl-arm">
        <line x1="58" y1="84" x2="38" y2="118" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="38" cy="118" r="5" fill={JOINT}/>
      </g>
      {/* Right arm curls */}
      <g className="curl-arm2">
        <line x1="102" y1="84" x2="122" y2="118" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="122" cy="118" r="5" fill={JOINT}/>
      </g>

      {/* Barbell */}
      <rect x="28" y="113" width="104" height="7" rx="3.5" fill={BAR_COLOR} opacity="0.8" style={{animation:'curl-arm 1.8s ease-in-out infinite',transformOrigin:'80px 116px'}}/>

      <text x="80" y="170" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">BARBELL CURL</text>
    </svg>
  )
}

export function PushupAnimation() {
  return (
    <svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'140px'}}>
      <defs>
        <style>{`
          .pup-body { animation: pup-body 2s ease-in-out infinite; transform-origin: 110px 80px; }
          @keyframes pup-body { 0%,100%{transform:translateY(0)} 50%{transform:translateY(16px)} }
        `}</style>
      </defs>
      {/* Floor */}
      <line x1="20" y1="118" x2="200" y2="118" stroke="#2a2a50" strokeWidth="2"/>

      <g className="pup-body">
        {/* Body plank */}
        <line x1="55" y1="88" x2="160" y2="80" stroke={BASE_COLOR} strokeWidth="5" strokeLinecap="round"/>
        {/* Head */}
        <circle cx="48" cy="83" r="10" fill="none" stroke={JOINT} strokeWidth="2.5"/>
        {/* Left arm */}
        <line x1="80" y1="82" x2="72" y2="112" stroke={ACTIVE_COLOR} strokeWidth="4" strokeLinecap="round"/>
        {/* Right arm */}
        <line x1="115" y1="80" x2="122" y2="112" stroke={ACTIVE_COLOR} strokeWidth="4" strokeLinecap="round"/>
        {/* Hands */}
        <circle cx="72" cy="112" r="4.5" fill={JOINT}/>
        <circle cx="122" cy="112" r="4.5" fill={JOINT}/>
      </g>

      {/* Legs static on floor */}
      <line x1="160" y1="80" x2="178" y2="115" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="160" y1="80" x2="185" y2="113" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="170" y1="115" x2="200" y2="115" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>

      <text x="110" y="133" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">PUSH-UP</text>
    </svg>
  )
}

export function LateralRaiseAnimation() {
  return (
    <svg viewBox="0 0 200 190" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'190px'}}>
      <defs>
        <style>{`
          .lat-larm { animation: lat-larm 2s ease-in-out infinite; transform-origin: 78px 85px; }
          .lat-rarm { animation: lat-rarm 2s ease-in-out infinite; transform-origin: 122px 85px; }
          @keyframes lat-larm { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-72deg)} }
          @keyframes lat-rarm { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(72deg)} }
        `}</style>
      </defs>
      <circle cx="100" cy="42" r="12" fill="none" stroke={JOINT} strokeWidth="2.5"/>
      <line x1="100" y1="54" x2="100" y2="115" stroke={BASE_COLOR} strokeWidth="5" strokeLinecap="round"/>
      <circle cx="78" cy="85" r="4" fill={JOINT}/>
      <circle cx="122" cy="85" r="4" fill={JOINT}/>
      <circle cx="80" cy="115" r="4" fill={JOINT}/>
      <circle cx="120" cy="115" r="4" fill={JOINT}/>
      <line x1="80" y1="115" x2="68" y2="155" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="120" y1="115" x2="132" y2="155" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="52" y1="155" x2="78" y2="155" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      <line x1="122" y1="155" x2="148" y2="155" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>

      {/* Left arm raises */}
      <g className="lat-larm">
        <line x1="78" y1="85" x2="36" y2="98" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="32" cy="100" r="6" fill="#ffc857"/>
      </g>
      {/* Right arm raises */}
      <g className="lat-rarm">
        <line x1="122" y1="85" x2="164" y2="98" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="168" cy="100" r="6" fill="#ffc857"/>
      </g>

      <text x="100" y="173" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">LATERAL RAISE</text>
    </svg>
  )
}

export function RowAnimation() {
  return (
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'180px'}}>
      <defs>
        <style>{`
          .row-arms { animation: row-arms 2s ease-in-out infinite; transform-origin: 90px 90px; }
          @keyframes row-arms { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-18px)} }
        `}</style>
      </defs>
      {/* Hinge position - 45° */}
      {/* Legs */}
      <circle cx="82" cy="118" r="4" fill={JOINT}/>
      <circle cx="112" cy="118" r="4" fill={JOINT}/>
      <line x1="82" y1="118" x2="72" y2="155" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="112" y1="118" x2="118" y2="155" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="54" y1="155" x2="82" y2="155" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      <line x1="108" y1="155" x2="134" y2="155" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>

      {/* Torso at hinge */}
      <line x1="97" y1="118" x2="118" y2="68" stroke={BASE_COLOR} strokeWidth="5" strokeLinecap="round"/>
      <circle cx="122" cy="57" r="11" fill="none" stroke={JOINT} strokeWidth="2.5"/>

      {/* Arms pull back */}
      <g className="row-arms">
        <line x1="102" y1="88" x2="62" y2="108" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="102" y1="88" x2="58" y2="102" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        {/* Barbell */}
        <rect x="30" y="98" width="32" height="7" rx="3.5" fill={BAR_COLOR} opacity="0.9"/>
        <circle cx="30" cy="101" r="10" fill="none" stroke={BAR_COLOR} strokeWidth="2.5" opacity="0.7"/>
        <circle cx="50" cy="101" r="4" fill={JOINT}/>
      </g>

      <text x="100" y="172" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">BENT-OVER ROW</text>
    </svg>
  )
}

export function PlankAnimation() {
  return (
    <svg viewBox="0 0 240 130" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'130px'}}>
      <defs>
        <style>{`
          .plank-glow { animation: plank-glow 2s ease-in-out infinite; }
          @keyframes plank-glow { 0%,100%{opacity:0.4} 50%{opacity:1} }
        `}</style>
      </defs>
      <line x1="20" y1="108" x2="220" y2="108" stroke="#2a2a50" strokeWidth="2"/>
      {/* Body in plank */}
      <line x1="55" y1="78" x2="180" y2="75" stroke={BASE_COLOR} strokeWidth="6" strokeLinecap="round"/>
      <circle cx="46" cy="75" r="11" fill="none" stroke={JOINT} strokeWidth="2.5"/>
      {/* Forearms on ground */}
      <line x1="82" y1="75" x2="78" y2="105" stroke={ACTIVE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="115" y1="74" x2="118" y2="105" stroke={ACTIVE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="62" y1="105" x2="92" y2="105" stroke={ACTIVE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      <line x1="102" y1="105" x2="132" y2="105" stroke={ACTIVE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      {/* Legs */}
      <line x1="180" y1="75" x2="200" y2="105" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="185" y1="75" x2="210" y2="103" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="190" y1="105" x2="218" y2="103" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>

      {/* Core glow pulse */}
      <rect x="80" y="70" width="95" height="12" rx="6" fill="none" stroke={ACTIVE_COLOR} strokeWidth="1.5" strokeDasharray="4,3" className="plank-glow"/>

      <text x="120" y="122" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">PLANK</text>
    </svg>
  )
}

export function DipsAnimation() {
  return (
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'200px'}}>
      <defs>
        <style>{`
          .dip-body { animation: dip-body 2s ease-in-out infinite; transform-origin: 90px 100px; }
          @keyframes dip-body { 0%,100%{transform:translateY(0)} 50%{transform:translateY(22px)} }
        `}</style>
      </defs>
      {/* Parallel bars */}
      <line x1="30" y1="68" x2="70" y2="68" stroke={BAR_COLOR} strokeWidth="7" strokeLinecap="round"/>
      <line x1="110" y1="68" x2="150" y2="68" stroke={BAR_COLOR} strokeWidth="7" strokeLinecap="round"/>
      <line x1="38" y1="68" x2="38" y2="100" stroke="#2a2a50" strokeWidth="5" strokeLinecap="round"/>
      <line x1="142" y1="68" x2="142" y2="100" stroke="#2a2a50" strokeWidth="5" strokeLinecap="round"/>

      <g className="dip-body">
        {/* Head */}
        <circle cx="90" cy="52" r="12" fill="none" stroke={JOINT} strokeWidth="2.5"/>
        {/* Torso */}
        <line x1="90" y1="64" x2="90" y2="115" stroke={BASE_COLOR} strokeWidth="5" strokeLinecap="round"/>
        {/* Arms down to bars */}
        <line x1="76" y1="75" x2="50" y2="68" stroke={ACTIVE_COLOR} strokeWidth="4" strokeLinecap="round"/>
        <line x1="104" y1="75" x2="130" y2="68" stroke={ACTIVE_COLOR} strokeWidth="4" strokeLinecap="round"/>
        {/* Hands */}
        <circle cx="50" cy="68" r="5" fill={JOINT}/>
        <circle cx="130" cy="68" r="5" fill={JOINT}/>
        {/* Legs hanging */}
        <circle cx="76" cy="115" r="4" fill={JOINT}/>
        <circle cx="104" cy="115" r="4" fill={JOINT}/>
        <line x1="76" y1="115" x2="68" y2="155" stroke={BASE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="104" y1="115" x2="112" y2="155" stroke={BASE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="60" y1="155" x2="78" y2="152" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
        <line x1="102" y1="152" x2="120" y2="155" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      </g>

      <text x="90" y="178" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">DIPS</text>
    </svg>
  )
}

export function TricepAnimation() {
  return (
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',maxHeight:'200px'}}>
      <defs>
        <style>{`
          .tri-arms { animation: tri-arms 1.8s ease-in-out infinite; transform-origin: 80px 95px; }
          @keyframes tri-arms { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(22px) rotate(3deg)} }
        `}</style>
      </defs>
      {/* Cable machine */}
      <rect x="125" y="20" width="20" height="80" rx="5" fill="#2a2a50"/>
      <circle cx="135" cy="22" r="5" fill="#3a3a60"/>
      <line x1="135" y1="27" x2="118" y2="62" stroke="#3a3a60" strokeWidth="2.5"/>

      <circle cx="80" cy="42" r="12" fill="none" stroke={JOINT} strokeWidth="2.5"/>
      <line x1="80" y1="54" x2="80" y2="115" stroke={BASE_COLOR} strokeWidth="5" strokeLinecap="round"/>
      <circle cx="68" cy="115" r="4" fill={JOINT}/>
      <circle cx="92" cy="115" r="4" fill={JOINT}/>
      <line x1="68" y1="115" x2="58" y2="155" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="92" y1="115" x2="102" y2="155" stroke={BASE_COLOR} strokeWidth="4" strokeLinecap="round"/>
      <line x1="42" y1="155" x2="68" y2="155" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
      <line x1="92" y1="155" x2="118" y2="155" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>

      {/* Arms pushing down */}
      <g className="tri-arms">
        <line x1="68" y1="78" x2="55" y2="62" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
        <line x1="92" y1="78" x2="118" y2="62" stroke={BASE_COLOR} strokeWidth="3" strokeLinecap="round"/>
        <line x1="55" y1="62" x2="48" y2="96" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="118" y1="62" x2="112" y2="96" stroke={ACTIVE_COLOR} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="44" y1="96" x2="116" y2="96" stroke={BAR_COLOR} strokeWidth="4" strokeLinecap="round"/>
        <circle cx="44" cy="96" r="4" fill={JOINT}/>
        <circle cx="116" cy="96" r="4" fill={JOINT}/>
      </g>

      <text x="80" y="172" textAnchor="middle" fontSize="9" fill={BASE_COLOR} fontFamily="Plus Jakarta Sans,sans-serif">TRICEP PUSHDOWN</text>
    </svg>
  )
}

// Map exercise ID → animation component
export const exerciseAnimations: Record<string, React.ComponentType> = {
  squat: SquatAnimation,
  bench: BenchAnimation,
  incline: BenchAnimation,
  pullup: PullupAnimation,
  deadlift: DeadliftAnimation,
  ohp: OHPAnimation,
  rdl: RDLAnimation,
  row: RowAnimation,
  curl: CurlAnimation,
  pushup: PushupAnimation,
  lateral: LateralRaiseAnimation,
  plank: PlankAnimation,
  dips: DipsAnimation,
  tricep: TricepAnimation,
  muscleup: PullupAnimation,
  pistol: SquatAnimation,
  lsit: PlankAnimation,
  calf: OHPAnimation,
}
