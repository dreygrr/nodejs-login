// Função para calcular a luminância de uma cor RGB
function luminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Função para converter hexadecimal para RGB
function hexToRgb(hex) {
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

// Função para verificar se o texto deve ser branco ou preto
function getTextColor(backgroundColor) {
  let [r, g, b] = hexToRgb(backgroundColor);
  let lum = luminance(r, g, b);
  return lum > 0.5 ? '#000000' : '#FFFFFF'; // Preto se o fundo for claro, branco se o fundo for escuro
}
