// Which slide figures become which course-material images
// (UNIVERSE-HPC/course-material, scientific_computing/essential_maths/fig/),
// for scripts/export-figures.mjs. Each entry names the image, the deck and
// figure that draw it, and any parameters (slider values) to draw it with; an
// entry with `panels` draws several figures side by side in the one image.
// The names are course-material's existing ones, so its Markdown needs no
// changes, except for images that are new.

export default [
  { file: '01_01_graph.svg', deck: '01_graphs', figure: 'example-plot' },
  { file: '01_02_polynomial.svg', deck: '01_graphs', figure: 'polynomial' },
  { file: '01_03_nonlinear_trend.svg', deck: '01_graphs', figure: 'quadratic-original' },
  { file: '01_04_linear_trend.svg', deck: '01_graphs', figure: 'quadratic-power', params: { p: 2 } },
  { file: '01_05_linear_trend_with_trendline.svg', deck: '01_graphs', figure: 'quadratic-trendline' },
  { file: '01_06_original_data.svg', deck: '01_graphs', figure: 'enzyme-original' },
  { file: '01_07_linear_trend.svg', deck: '01_graphs', figure: 'enzyme-transformed' },
  { file: '01_08_linear_trend_with_trendline.svg', deck: '01_graphs', figure: 'enzyme-trendline' },
  { file: '01_09_straight_line.svg', deck: '01_graphs', figure: 'straight-line' },

  { file: '02_01_log.svg', deck: '02_indices_logs', figure: 'log10' },
  { file: '02_02_data.svg', deck: '02_indices_logs', figure: 'power-law' },
  { file: '02_03_data_straightened.svg', deck: '02_indices_logs', figure: 'power-law-logs' },
  { file: '02_04_exp.svg', deck: '02_indices_logs', figure: 'exponential' },
  { file: '02_05_growth_data.svg', deck: '02_indices_logs', figure: 'exponential-growth' },
  { file: '02_06_growth_data_straightened.svg', deck: '02_indices_logs', figure: 'exponential-growth-logs' },

  { file: '03_01_x2_1.svg', deck: '03_differentiation_1', figure: 'tangent-square', params: { x: 1 } },
  { file: '03_02_x2_2.svg', deck: '03_differentiation_1', figure: 'tangent-square', params: { x: -2 } },
  { file: '03_03_logx.svg', deck: '03_differentiation_1', figure: 'tangent-log', params: { x: 1 } },
  { file: '03_04_tangent_1.svg', deck: '03_differentiation_1', figure: 'secant', params: { h: 5 } },
  { file: '03_05_tangent_2.svg', deck: '03_differentiation_1', figure: 'secant', params: { h: 2 } },
  { file: '03_06_turning_points.svg', deck: '03_differentiation_1', figure: 'stationary-points' },

  { file: '04_01_sin_cos.svg', deck: '04_differentiation_2', figure: 'sin-cos' },

  { file: '05_01_a_to_the_x.svg', deck: '05_differentiation_3', figure: 'power-tangent', params: { a: 2 } },
  { file: '05_02_partial_slice.svg', deck: '05_differentiation_3', panels: ['partial-surface', 'partial-slice'], params: { y0: 1, x0: 1, turn: 30 } },
  { file: '05_03_laplace_plate.svg', deck: '05_differentiation_3', figure: 'laplace-plate' },

  { file: '06_01_single_rect.svg', deck: '06_integration_1', figure: 'one-strip' },
  { file: '06_02_coarse.svg', deck: '06_integration_1', figure: 'many-strips', params: { n: 5 } },
  { file: '06_03_fine.svg', deck: '06_integration_1', figure: 'many-strips', params: { n: 30 } },

  { file: '08_01_complex_number.svg', deck: '08_complex_numbers', figure: 'complex-plane', params: { a: 18, b: 12 } },
  { file: '08_02_polar.svg', deck: '08_complex_numbers', panels: ['cartesian', 'polar'] },

  { file: '09_01_solution.svg', deck: '09_differential_equations_1', figure: 'example-1-check' },
  { file: '09_02_solution.svg', deck: '09_differential_equations_1', figure: 'example-3-check' },
  { file: '09_03_k02.svg', deck: '09_differential_equations_1', figure: 'michaelis-menten', params: { Km: 0.2 } },
  { file: '09_04_k10.svg', deck: '09_differential_equations_1', figure: 'michaelis-menten', params: { Km: 1 } },
  { file: '09_05_k2.svg', deck: '09_differential_equations_1', figure: 'first-order', params: { k: 2 } },
  { file: '09_06_euler.svg', deck: '09_differential_equations_1', figure: 'euler', params: { h: 1 } },

  { file: '10_01_solution.svg', deck: '10_differential_equations_2', figure: 'leaf-growth' },
  { file: '10_02_solution.svg', deck: '10_differential_equations_2', figure: 'tumour-volume' },

  { file: '11_01_solution_vs_gradient.svg', deck: '11_differential_equations_3', figure: 'decay' },
  { file: '11_02_linear_ss.svg', deck: '11_differential_equations_3', figure: 'mass-action' },
  { file: '11_03_quadratic_ss.svg', deck: '11_differential_equations_3', figure: 'positive-feedback' },
  { file: '11_04_logistic_ss.svg', deck: '11_differential_equations_3', figure: 'logistic', params: { r: 1, K: 1 } },
  { file: '11_05_relaxation.svg', deck: '11_differential_equations_3', figure: 'relaxation', params: { k1: 1, k2: 1 } },
  { file: '11_06_logistic_solutions.svg', deck: '11_differential_equations_3', figure: 'logistic-solutions', params: { r: 1, K: 1 } },
]
