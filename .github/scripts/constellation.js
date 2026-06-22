const fs = require("fs");

async function generate() {
  const username = "KrrishSR4";

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );

  const repos = await res.json();

  const width = 1200;
  const height = 600;

  let svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="#0d1117"/>

  <text x="50%" y="50"
        fill="white"
        font-size="34"
        text-anchor="middle">
        GitHub Constellation
  </text>
`;

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 25)
    .forEach((repo, index) => {
      const x = Math.random() * 1100 + 50;
      const y = Math.random() * 500 + 50;

      const size = Math.max(
        4,
        repo.stargazers_count * 2 + 6
      );

      svg += `
      <circle
        cx="${x}"
        cy="${y}"
        r="${size}"
        fill="#58a6ff"
      />

      <text
        x="${x + 12}"
        y="${y}"
        fill="white"
        font-size="12">
        ${repo.name}
      </text>
      `;
    });

  svg += `</svg>`;

  fs.mkdirSync("assets", { recursive: true });

  fs.writeFileSync(
    "assets/constellation.svg",
    svg
  );
}

generate();
