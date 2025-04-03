// scripts/postbuild.js
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

// Create a specialized 404.html file for GitHub Pages SPA
const create404Html = () => {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CloudCostNavigator</title>
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    var pathSegmentsToKeep = 1;

    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.split('/').slice(1 + pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
  Redirecting...
</body>
</html>`;

  const dest = join("docs", "404.html");
  try {
    writeFileSync(dest, html);
    console.log("✅ Created specialized 404.html for GitHub Pages SPA routing");
  } catch (err) {
    console.error("❌ Failed to create 404.html", err);
    process.exit(1);
  }
};

// Update the index.html with the SPA redirect script
const updateIndexHtml = () => {
  const indexPath = join("docs", "index.html");
  try {
    let indexContent = readFileSync(indexPath, 'utf8');

    // Check if the script is already added
    if (!indexContent.includes("Single Page Apps for GitHub Pages")) {
      // Find the head tag to insert our script
      const headEndIndex = indexContent.indexOf('</head>');
      if (headEndIndex !== -1) {
        const redirectScript = `
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) {
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>`;

        indexContent = indexContent.slice(0, headEndIndex) + redirectScript + indexContent.slice(headEndIndex);
        writeFileSync(indexPath, indexContent);
        console.log("✅ Added SPA redirect script to index.html");
      }
    } else {
      console.log("⚠️ SPA redirect script already exists in index.html");
    }
  } catch (err) {
    console.error("❌ Failed to update index.html", err);
    process.exit(1);
  }
};

// Execute our functions
create404Html();
updateIndexHtml();

console.log("✅ Post-build processing completed successfully");
