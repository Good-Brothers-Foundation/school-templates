export default function WaveDecoration() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none overflow-hidden h-[52px] -mt-px leading-none"
    >
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[52px] block"
      >
        <path
          d={[
            'M0,26',
            'C60,44 120,8 180,26',
            'C240,44 300,8 360,26',
            'C420,44 480,8 540,26',
            'C600,44 660,8 720,26',
            'C780,44 840,8 900,26',
            'C960,44 1020,8 1080,26',
            'C1140,44 1200,8 1260,26',
            'C1320,44 1380,8 1440,26',
            'L1440,52 L0,52 Z',
          ].join(' ')}
          fill="var(--wave-fill)"
        />
      </svg>
    </div>
  )
}