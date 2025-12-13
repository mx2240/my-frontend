// // import { defineConfig } from 'vite'
// // import tailwindcss from '@tailwindcss/vite'

// // export default defineConfig({
// //   server: {
// //     proxy: {
// //       "/api": {
// //         target: "https://express-js-on-vercel-mu-orpin.vercel.app/api",
// //         changeOrigin: true,
// //         secure: false,
// //       }
// //     }
// //   },
// //   plugins: [
// //     tailwindcss(),
// //   ],
// // })



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://express-js-on-vercel-mu-orpin.vercel.app/api",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
