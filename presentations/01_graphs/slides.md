---
theme: oxrse
title: Graphs
addons:
  - ../addon
layout: cover
authors:
  - Fergus Cooper
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

# Why graphs?

A graph is where a model meets data.
We use graphs in two directions:

- **From formula to picture:** what shape does this model predict?
  This is _sketching_.
- **From picture to formula:** which model describes these data, and what are its parameters?
  This is _linearising_.

---

# Anatomy of a graph

Terminology:

- $Y$ or $y$ is the _dependent_ variable, sometimes called the _ordinate_,
  marked on the vertical axis
- $X$ or $x$ is the _independent_ variable, sometimes called the _abscissa_,
  marked on the horizontal axis
- The dependent variable is said to be graphed _against_ the independent
  variable

Essential features:

- Title
- Axis labels (and units if appropriate)

---

# Anatomy of a graph: an example

<PlotFigure name="example-plot" />

---

# Equation of a straight line

Defined by a gradient, $m$, and a $y$-axis intercept, $c$:

$$y = m x + c$$

Interpretation:

<v-clicks>

- The intercept of this line on the $y$ axis is given by $y=c$, since at $x=0$,
  $y = c$
- The gradient of this line (also called its "slope") is given by
  $$m = \frac{y_2-y_1}{x_2 - x_1}$$
  ("change in $y$ divided by change in $x$")
- The gradient is a _rate of change_: how much $y$ changes for each unit change in $x$
- The intercept of this line on the $x$ axis is given by $x = -c/m$,
  since at $y=0$ we must have $mx=-c$

</v-clicks>

---

# Graphs of polynomials

An expression involving higher powers of $x$ is called a _polynomial_ in $x$:

$$y = a_n x^n + a_{n-1} x^{n-1} + a_{n-2} x^{n-2}+\ldots+a_1 x^1 + a_0x^0$$

The highest power, $n$, is its _degree_.
The graph of a polynomial of degree $n$ has at most $n-1$ bends (turning points) in it.

---
layout: two-cols
---

# Sketching a polynomial

$$y=x^5-5x^3+4x$$

<v-clicks>

- **Zeros:** it factorises as
  $$y = x(x+1)(x-1)(x+2)(x-2)$$
  so $y=0$ at $x = -2, -1, 0, 1, 2$
- **Large $|x|$:** the $x^5$ term dominates, so $y$ rises to the right and falls to the left
- **Bends:** degree 5, so at most 4 bends, just enough to pass through all five zeros
- **Sign:** each zero comes from a single factor, so $y$ changes sign there

</v-clicks>

::right::

<PlotFigure v-click name="polynomial" />

---

# Sketching: a checklist

For any function, ask:

- Where is it zero? Where is it positive, and where negative?
- What happens as $x\to 0$, and as $x\to\pm\infty$? Which term dominates?
- Is it undefined anywhere, or does it blow up (an _asymptote_)?
- How many bends can it have? (Differentiation will find them exactly.)

Then check your sketch by plotting the function in Python.

---

# From data to a model

Going the other way: given some data, which model fits, and what are its parameters?

<v-clicks>

- Curves are hard to tell apart by eye: is a trend quadratic, exponential, or something else?
- Straight lines are easy: we see at once when points leave a line, and a line has just two numbers, its gradient and intercept.
- So transform the data so that, **if the model is right**, the points lie on a straight line.

</v-clicks>

---

# Linearising: the recipe

1. Write down the model, e.g. $y = ax^2 + b$.
2. Rearrange it into the form $Y = mX + c$, where $X$ and $Y$ depend only on the data, and $m$ and $c$ only on the parameters.
   Here $Y = y$, $X = x^2$, $m = a$ and $c = b$.
3. Plot $Y$ against $X$.
   A straight line supports the model; a systematic curve rules it out.
4. Read off the gradient and intercept, and work back to the parameters.

---

# Linearising: is this quadratic?

The trend is clearly curved. Is it a parabola, $y = ax^2 + b$?

<PlotFigure v-click name="quadratic-original" :height="350" />

---

# Linearising: testing the model

Plot $Y = y$ against $X = x^p$: the points lie on a straight line only when $p = 2$.

<PlotFigure name="quadratic-power" :height="380" />

---

# Linearising: gradient and intercept

We next add a trendline through these points which we can use to determine the gradient and intercept.

<PlotFigure v-click name="quadratic-trendline" :height="350" />

---

# Linearising: conclusion

<v-clicks>

- We find $(X,Y)$ lie along a straight line with slope 5 and $Y$-intercept 87.
- This means that $Y=5X+87$, so $a = 5$ and $b = 87$.
- So, $y$ and $x$ can be modelled by the polynomial equation $y=5x^2+87$.

</v-clicks>

---

# Example: enzyme kinetics

The _Michaelis–Menten_ model relates the rate, $V$, of an enzyme-catalysed reaction to the substrate concentration, $S$:

$$V = \frac{V_{\max}S}{K_m + S}$$

where $V_{\max}$ is the maximum rate, and $K_m$ is the substrate concentration at which the rate is half its maximum.

<v-click>

First, plot the original data, which are observations of $V$ given varying $S$:

</v-click>

---

# Enzyme kinetics: original data

<PlotFigure name="enzyme-original" />

---

# Enzyme kinetics: straight-line form

Take the reciprocal of both sides:

$$\frac{1}{V} = \frac{K_m + S}{V_{\max}S} = \frac{K_m}{V_{\max}}\cdot\frac{1}{S} + \frac{1}{V_{\max}}$$

<v-clicks>

- So plot $Y=1/V$ against $X=1/S$: this is the _Lineweaver–Burk_ plot
- It will have gradient $m = K_m/V_{\max}$ and ordinate intercept $c = 1/V_{\max}$

</v-clicks>

---

# Enzyme kinetics: transformed data

If the Michaelis–Menten model holds, plotting $Y=1/V$ against $X=1/S$ should result in a straight line.

<PlotFigure v-click name="enzyme-transformed" :height="350" />

---

# Enzyme kinetics: gradient and intercept

We next add a trendline through these points which we can use to determine the gradient and intercept.

<PlotFigure v-click name="enzyme-trendline" :height="350" />

---

# Enzyme kinetics: conclusion

<v-clicks>

- We find $(X,Y)$ lie along a straight line with slope 3 and $Y$-intercept 5.
- This means that $Y=3X+5$
- Working back, $V_{\max} = 1/c = 0.2$ and $K_m = m/c = 0.6$.
- So the data are modelled by $V = 0.2S/(0.6+S)$.

</v-clicks>

---

# Linearising in practice

<v-clicks>

- Transforming the data transforms its noise too: taking $1/V$ magnifies the errors in small values of $V$, and those points pull hardest on the line.
- So today we would usually fit the nonlinear model directly, e.g. with `scipy.optimize.curve_fit`.
- But a straight-line plot is still the clearest check that a model fits, and you'll meet them throughout the literature: Lineweaver–Burk, Arrhenius, semi-log growth curves.
- Next: logarithms, which straighten exponentials and power laws.

</v-clicks>
