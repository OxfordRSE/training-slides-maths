// Helpers for a figure's `controls` (its sliders)

// A slider's value with as many decimals as its step, e.g. 4.90 for a step of 0.05,
// so that the number keeps its width as the slider moves
export function format(value, { step }) {
  return value.toFixed((String(step).split('.')[1] ?? '').length)
}
