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

We often want to go between a formula and its graph, in either direction:

- Given a formula, what shape will its graph have?
  This is called _sketching_.
- Given some data, which formula describes them, and what are its parameters?
  We can often answer this by _linearising_ the data.

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
- The gradient is also known as the _rate of change_ of $y$ with respect to $x$ (more on this when we cover differentiation)
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

- To sketch this, we first find where $y=0$. It factorises as
  $$y = x(x+1)(x-1)(x+2)(x-2)$$
  so $y=0$ at $x = -2, -1, 0, 1, 2$
- For large $|x|$, the $x^5$ term dominates, so $y$ rises to the right and falls to the left
- It has degree 5, so it has at most 4 bends, just enough to pass through all five zeros
- Each zero comes from a single factor, so $y$ changes sign there

</v-clicks>

::right::

<PlotFigure v-click name="polynomial" />

---

# Sketching: a checklist

To sketch the graph of a function:

- Find where it is zero, positive and negative
- Look at which terms dominate as $x\to\pm\infty$
- Look at the limit behaviour as $x$ approaches any points where the function is undefined (e.g. $x\to 0$ for $y=1/x$), which may give an _asymptote_
- Work out how many bends it can have (more on this when we cover differentiation)

Then check your sketch by plotting the function in Python.

---

# From data to a model

Now for the other direction.
Given some data, which formula describes them, and what are its parameters?

<v-clicks>

- It is hard to tell by eye whether a curve is quadratic, exponential or something else.
- It is much easier to see whether points lie on a straight line, and a straight line is described by just two numbers, its gradient and intercept.
- If we wish to test visually whether some data fit a particular relationship, we can transform the data to plot something which should be linear if the relationship holds.

</v-clicks>

---

# Linearising: the recipe

1. Write down the model, e.g. $y = ax^2 + b$.
2. Rearrange it into the form $Y = mX + c$, where $X$ and $Y$ depend only on the data, and $m$ and $c$ only on the parameters.
   Here $Y = y$, $X = x^2$, $m = a$ and $c = b$.
3. Plot $Y$ against $X$.
   If the points lie on a straight line, the data are consistent with the model.
   If they curve, the model is wrong.
4. Read off the gradient and intercept, and work back to the parameters.

---

# Linearising: is this quadratic?

There's a definite curve, and we may suspect the trend is quadratic: $y = ax^2 + b$.

<PlotFigure v-click name="quadratic-original" :height="350" />

---

# Linearising: testing the model

If we plot $Y = y$ against $X = x^p$, the points only lie on a straight line when $p = 2$.

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

The rate at which a given enzyme can catalyse a reaction can be dependent upon the substrate concentration.
This is often modelled by the _Michaelis–Menten_ equation:

$$V = \frac{V_{\max}S}{K_m + S}$$

where $V$ is the rate of the reaction, $S$ is the substrate concentration, $V_{\max}$ is the maximum rate, and $K_m$ is the substrate concentration at which the rate is half its maximum.

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

- We can derive a straight line graph from the above formula by plotting $Y=1/V$ against $X=1/S$ (this is called the _Lineweaver–Burk_ plot)
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
- This means that $Y=3X+5$, so $V_{\max} = 1/c = 0.2$ and $K_m = m/c = 0.6$.
- So, $V$ and $S$ can be modelled by the equation $V = 0.2S/(0.6+S)$.

</v-clicks>

---

# Linearising in practice

<v-clicks>

- Note, transforming the data also transforms any noise in it. Taking $1/V$ magnifies the errors in small values of $V$, and these points then have the most influence on the trendline.
- In practice, it is usually better to fit the nonlinear model directly, e.g. using `scipy.optimize.curve_fit`.
- Plotting in straight-line form is still a good way to check a model visually, and you will see these plots in many papers (e.g. Lineweaver–Burk, Arrhenius).
- Logarithms, which we cover next, let us do the same for exponentials and power laws.

</v-clicks>
