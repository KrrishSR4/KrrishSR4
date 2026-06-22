const fs = require("fs");

async function generateGalaxy() {
  const username = "KrrishSR4";

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
  );

  const repos = await response.json();

  const publicRepos = repos
    .filter((repo) => !repo.private)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12);

  const width = 1400;
  const height = 800;

  const centerX = width / 2;
  const centerY = height / 2;

  let svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs>

<radialGradient id="bg">
<stop offset="0%" stop-color="#161b22"/>
<stop offset="100%" stop-color="#0d1117"/>
</radialGradient>

<filter id="glow">
<feGaussianBlur stdDeviation="4" result="blur"/>
<feMerge>
<feMergeNode in="blur"/>
<feMergeNode in="SourceGraphic"/>
</feMerge>
</filter>

</defs>

<rect width="100%" height="100%" fill="url(#bg)"/>

<text
x="${centerX}"
y="70"
fill="#58a6ff"
font-size="42"
font-family="Segoe UI"
text-anchor="middle"
font-weight="bold">
Open Source Galaxy
</text>
`;

  const orbitGap = 95;

  publicRepos.forEach((repo, index) => {
    const angle =
      (Math.PI * 2 * index) / publicRepos.length;

    const orbit =
      orbitGap * (1 + Math.floor(index / 4));

    const x =
      centerX + orbit * Math.cos(angle);

    const y =
      centerY + orbit * Math.sin(angle);

    const stars = repo.stargazers_count;

    const radius =
      Math.max(10, Math.min(35, stars * 2 + 12));

    svg += `
    <line
      x1="${centerX}"
      y1="${centerY}"
      x2="${x}"
      y2="${y}"
      stroke="#30363d"
      stroke-width="1.5"
    />

    <circle
      cx="${x}"
      cy="${y}"
      r="${radius}"
      fill="#58a6ff"
      filter="url(#glow)"
    />

    <text
      x="${x}"
      y="${y + radius + 18}"
      fill="#c9d1d9"
      font-size="14"
      font-family="Segoe UI"
      text-anchor="middle">
      ${repo.name}
    </text>
    `;
  });

  svg += `
  <circle
    cx="${centerX}"
    cy="${centerY}"
    r="60"
    fill="#238636"
    filter="url(#glow)"
  />

  <text
    x="${centerX}"
    y="${centerY + 8}"
    fill="white"
    font-size="24"
    font-family="Segoe UI"
    text-anchor="middle"
    font-weight="bold">
    KrrishSR4
  </text>

</svg>
`;

  fs.mkdirSync("assets", {
    recursive: true,
  });

  fs.writeFileSync(
    "assets/galaxy.svg",
    svg
  );
}

generateGalaxy();
