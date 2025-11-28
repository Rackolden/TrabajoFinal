import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      out: "build", // carpeta final para subir al servidor
      precompress: true,
    }),
  },
};

export default config;
