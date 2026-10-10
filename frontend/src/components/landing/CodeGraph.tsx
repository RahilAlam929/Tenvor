export default function CodeGraph() {
  return (
    <div className="tv-graph-shell">
      <div className="tv-graph-top">
        <div className="tv-window-dots"><i/><i/><i/></div>
        <span className="tv-graph-title">repository / dependency-map</span>
        <span className="tv-graph-live"> GRAPH VIEW</span>
      </div>

      <div className="tv-graph-canvas">
        <svg viewBox="0 0 620 390" role="img" aria-label="Illustration of connected files, classes, functions and modules">
          <defs>
            <pattern id="tv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#d9d8cc"/>
            </pattern>
            <filter id="tv-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#28332f" floodOpacity=".09"/>
            </filter>
          </defs>
          <rect width="620" height="390" fill="url(#tv-grid)"/>

          <g fill="none" stroke="#8e9b8e" strokeWidth="1.4">
            <path d="M310 82 L170 145 L118 230"/>
            <path d="M310 82 L450 145 L493 230"/>
            <path d="M170 145 L280 205 L235 302"/>
            <path d="M450 145 L350 205 L392 302"/>
            <path d="M118 230 L235 302 L310 340"/>
            <path d="M493 230 L392 302 L310 340"/>
            <path d="M280 205 L350 205"/>
            <path d="M170 145 L280 205 L310 82"/>
            <path d="M450 145 L350 205 L310 82"/>
          </g>

          <g fill="#faf8f0" stroke="#28332f" strokeWidth="1.3" filter="url(#tv-shadow)">
            <rect x="236" y="43" width="148" height="48" rx="3"/>
            <rect x="87" y="122" width="166" height="46" rx="3"/>
            <rect x="367" y="122" width="166" height="46" rx="3"/>
            <rect x="43" y="210" width="150" height="42" rx="3"/>
            <rect x="235" y="184" width="150" height="42" rx="3"/>
            <rect x="423" y="210" width="150" height="42" rx="3"/>
            <rect x="164" y="282" width="145" height="42" rx="3"/>
            <rect x="330" y="282" width="145" height="42" rx="3"/>
          </g>

          <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" fill="#626b63">
            <text x="250" y="61">MODULE</text>
            <text x="101" y="139">FILE</text>
            <text x="381" y="139">FILE</text>
            <text x="56" y="226">FUNCTION</text>
            <text x="248" y="200">CORE CLASS</text>
            <text x="436" y="226">FUNCTION</text>
            <text x="177" y="298">DEPENDENCY</text>
            <text x="343" y="298">DEPENDENCY</text>
          </g>

          <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="12" fontWeight="600" fill="#28332f">
            <text x="250" y="78">src / core</text>
            <text x="101" y="157">parser.py</text>
            <text x="381" y="157">indexer.py</text>
            <text x="56" y="243">parse_file()</text>
            <text x="248" y="217">Repository</text>
            <text x="436" y="243">build_graph()</text>
            <text x="177" y="315">tree-sitter</text>
            <text x="343" y="315">graph-store</text>
          </g>

          <g fill="#d88c55" stroke="#faf8f0" strokeWidth="3">
            <circle cx="310" cy="82" r="5"/>
            <circle cx="170" cy="145" r="4"/>
            <circle cx="450" cy="145" r="4"/>
            <circle cx="118" cy="230" r="4"/>
            <circle cx="493" cy="230" r="4"/>
            <circle cx="280" cy="205" r="4"/>
            <circle cx="350" cy="205" r="4"/>
            <circle cx="235" cy="302" r="4"/>
            <circle cx="392" cy="302" r="4"/>
            <circle cx="310" cy="340" r="5"/>
          </g>

          <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" fill="#798178">
            <text x="20" y="24">FIG. 01 — STRUCTURAL RELATIONSHIPS</text>
            <text x="466" y="370">ILLUSTRATIVE GRAPH</text>
          </g>
        </svg>
      </div>

      <div className="tv-graph-legend">
        <span><i className="tv-legend-file"/> Files</span>
        <span><i className="tv-legend-function"/> Functions</span>
        <span><i className="tv-legend-class"/> Classes</span>
        <span><i className="tv-legend-edge"/> Relationships</span>
      </div>
      <div className="tv-graph-caption">
        <span>Structure, not just source code.</span>
        <span>CONCEPT PREVIEW · NOT LIVE REPOSITORY DATA</span>
      </div>
    </div>
  );
}
