import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// path/to/your/vault/root
const dirs = []
let vaultRoots
try {
  vaultRoots =  (await import('./dir.js')).dirs
} catch (error) {
  vaultRoots = dirs
}
console.log(`choose ${vaultRoots.length} vaults`)

vaultRoots.forEach(root => {
  let themeRoot = resolve(root, '.obsidian', 'themes', 'Maple')

  !existsSync(themeRoot) && mkdirSync(themeRoot, { recursive: true })

  copyFileSync('theme.css', resolve(themeRoot, 'theme.css'))
  copyFileSync('manifest.json', resolve(themeRoot, 'manifest.json'))

  console.log(`✨ ${root}`)
})
