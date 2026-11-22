import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { portfolio } from './src/data/portfolio'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-metadata',
      transformIndexHtml(html) {
        const escape = (value: string) => value.replace(/[&<>"']/g, character => ({
          '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
        })[character] ?? character)

        return html
          .replace('<title></title>', `<title>${escape(portfolio.copy.es.title)}</title>`)
          .replace('name="description" content=""', `name="description" content="${escape(portfolio.copy.es.description)}"`)
      },
    },
  ],
})
