---
theme: oxrse
title: Complex numbers (bonus)
addons:
  - ../addon
layout: cover
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
fonts:
  sans: Noto Sans Variable
  mono: JetBrains Mono Variable
  provider: none
---

---

# Polynomials on the complex plane

<PlotFigure name="polynomial-roots" :height="420" :max-width="400" />

---

# Simplifying with SymPy

```python
x = sp.symbols('x')
sp.simplify((x**3-1)/(x-1))
```

$$x^{2} + x + 1$$
