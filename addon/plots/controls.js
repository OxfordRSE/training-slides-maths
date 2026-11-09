// Helpers for a figure's `controls` (its sliders)

// A slider's value with as many decimals as its step, e.g. 4.90 for a step of 0.05,
// so that the number keeps its width as the slider moves. A control can give its
// own `format: value => text` instead, e.g. to show an angle as a fraction of pi.
export function format(value, { step, format: custom }) {
  if (custom) return custom(value)
  return value.toFixed((String(step).split('.')[1] ?? '').length)
}

// k pi / n as a reduced fraction of pi, e.g. piFraction(18, 24) = '3pi/4' (with
// the Greek letter), piFraction(0, 24) = '0', piFraction(24, 24) = 'pi'
export function piFraction(k, n) {
  if (k === 0) return '0'
  const gcd = (a, b) => (b ? gcd(b, a % b) : a)
  const g = gcd(Math.abs(k), n)
  const [num, den] = [k / g, n / g]
  const pi = 'π'
  const top = num === 1 ? pi : num === -1 ? `-${pi}` : `${num}${pi}`
  return den === 1 ? top : `${top}/${den}`
}
