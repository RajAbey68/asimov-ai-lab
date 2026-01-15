const IterativeCycleDiagram = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-auto">
        {/* Define arrow marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="white" />
          </marker>
        </defs>

        {/* Concept Arrow (Top) */}
        <g>
          <path
            d="M 140 60 L 240 60 L 280 80 L 240 100 L 140 100 Z"
            fill="hsl(var(--primary))"
            opacity="0.9"
          />
          <text
            x="190"
            y="85"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            CONCEPT
          </text>
        </g>

        {/* Develop Arrow (Right) */}
        <g>
          <path
            d="M 280 140 L 360 180 L 360 220 L 280 260 L 240 240 L 280 220 L 280 180 L 240 160 Z"
            fill="hsl(var(--primary))"
            opacity="0.75"
          />
          <text
            x="300"
            y="210"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            transform="rotate(90 300 210)"
          >
            DEVELOP
          </text>
        </g>

        {/* Validate Arrow (Bottom Right) */}
        <g>
          <path
            d="M 260 300 L 280 340 L 240 360 L 140 340 L 160 300 L 200 320 Z"
            fill="hsl(var(--primary))"
            opacity="0.65"
          />
          <text
            x="200"
            y="330"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            transform="rotate(-30 200 330)"
          >
            VALIDATE
          </text>
        </g>

        {/* Monitor Arrow (Bottom Left) */}
        <g>
          <path
            d="M 120 340 L 80 360 L 40 340 L 60 300 L 40 260 L 80 240 L 120 260 L 100 300 Z"
            fill="hsl(var(--primary))"
            opacity="0.8"
          />
          <text
            x="80"
            y="310"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            transform="rotate(-90 80 310)"
          >
            MONITOR
          </text>
        </g>

        {/* Deploy Arrow (Left) */}
        <g>
          <path
            d="M 60 240 L 40 220 L 40 180 L 60 160 L 120 140 L 160 160 L 120 180 L 120 220 L 160 240 Z"
            fill="hsl(var(--primary))"
            opacity="0.7"
          />
          <text
            x="100"
            y="200"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            transform="rotate(90 100 200)"
          >
            DEPLOY
          </text>
        </g>

        {/* Center Text */}
        <text
          x="200"
          y="205"
          textAnchor="middle"
          fill="currentColor"
          fontSize="32"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          ITERATIVE
        </text>
      </svg>
    </div>
  );
};

export default IterativeCycleDiagram;
