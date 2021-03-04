const fs = require('fs')
const execSync = require('child_process').execSync
const path = require('path')
const chalk = require('chalk')

function exec(cmd) {
  execSync(cmd, { stdio: "inherit", env: process.env })
}

const proj = process.argv.slice(-1)[0]
const projsPath = path.resolve(__dirname, '../projects')

const projDirs = fs.readdirSync(projsPath)

if (!projDirs.includes(proj)) {
  console.log(chalk.red(`\nProject ${proj} not exist!\n`))
  process.exit(1)
}

if (proj === 'easy-popup') {
  process.chdir(path.join(projsPath, proj, 'example'))
  exec('yarn start')
} else {
  exec(`yarn workspace ${proj} run start`)
}