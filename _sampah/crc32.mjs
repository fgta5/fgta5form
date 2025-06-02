export default function crc32(input) {
    return generateCRC32(input).toString(16).padStart(8, '0')
}

function generateCRC32(input) {
    const table = new Uint32Array(256).map((_, k) => {
        let c = k;
        for (let i = 0; i < 8; i++) {
            c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
        }
        return c >>> 0;
    });

    let crc = 0xFFFFFFFF;
    for (let i = 0; i < input.length; i++) {
        const byte = input.charCodeAt(i);
        crc = table[(crc ^ byte) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
}