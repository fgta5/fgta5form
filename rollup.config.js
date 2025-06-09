import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

const version = '1.0.0'

export default {
  input: "build.mjs", // File utama yang menjadi entry point
  output: {
    file: `dist/fgta5-v${version}-min.js`, // Lokasi output file hasil bundle
    format: "esm", // Format modul ECMAScript
	banner: `/*! Versi ${version} */`
  },
  plugins: [
    terser({
		compress: {
			drop_console: true, // Hapus console.log
		}	
	}),
	postcss({
		extract: `fgta5-v${version}-min.css`, // Nama file CSS yang diekstrak
		minimize: true, // Minifikasi CSS
		plugins: [require("cssnano")], // Gunakan cssnano untuk minifikasi
		banner: `/*! Versi ${version} */`
	  }),
  ],
};