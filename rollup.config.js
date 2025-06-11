import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";


const currentdate = (new Date()).toISOString().split('T')[0]
const version = '1.0.0'
const banner = `fgta5form ${version}
* https://github.com/fgta5/fgta5form 
* extending standard html form
*
* Agung Nugroho DW
* https://github.com/agungdhewe
*
* build at ${currentdate}
`

export default {
  input: "build.mjs", // File utama yang menjadi entry point
  output: {
    file: `dist/fgta5form-v${version}-min.js`, // Lokasi output file hasil bundle
    format: "esm", // Format modul ECMAScript
	banner: `/*! ${banner}*/`
  },
  
  plugins: [
	
    terser({
		compress: {
			drop_console: true, // Hapus console.log
		}	
	}),

	postcss({
		extract: `fgta5form-v${version}-min.css`, // Nama file CSS yang diekstrak
		minimize: true, // Minifikasi CSS
		plugins: [
			require("cssnano"), // Gunakan cssnano untuk minifikasi
		]
	}),
	
  ],
};