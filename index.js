const fs = require('fs')

const getDirectories = async source =>
  (await fs.promises.readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))
    .map(dirent => dirent.name)

async function getContents() {
  const dirs = await getDirectories(__dirname);
  const contents = dirs.map(dirName => `- [${dirName}](${dirName}/README.md)`).join('\n');
  return contents;
}

async function getTableOfContents() {
  const contents = await getContents();
  const header = `# cooking
for recording those delicious that I and my honey xiao discovered`;
  return `${header}\n\n${contents}`;
}

async function updateTableOfContents() {
  const content = await getTableOfContents();
  try {
    fs.writeFileSync('./README.md', content);
    //file written successfully
    console.log('table of contents updated successfully!');
  } catch (err) {
    console.error(`table of contents updated failed: ${err.message}`);
  }
}

updateTableOfContents();