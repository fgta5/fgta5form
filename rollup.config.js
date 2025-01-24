import { terser } from "rollup-plugin-terser";

export default {
  input: "src/main.mjs", // File utama yang menjadi entry point
  output: {
    file: "dist/fgta5.min.js", // Lokasi output file hasil bundle
    format: "esm", // Format modul ECMAScript
  },
  plugins: [
    terser({
		compress: {
			drop_console: true, // Hapus console.log
		}	
	})
  ],
};