---
theme: oxrse
title: Differentiation 1
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

# Gradients

We often want to know about the _rate_ at which one quantity changes over time.
Examples:

1. The rate of disappearance of substrate with time in an enzyme reaction.
1. The rate of decay of a radioactive substance (how long will it have activity above a certain level?)
1. The rate of bacterial cell growth over time.
1. How quickly an epidemic is growing.

---

# Gradients

### Defining the gradient

- The **gradient of a curve** at a point $P$ is the slope of the tangent of the curve at that point.
- The **tangent** is the line that "just touches" (but doesn't cross) the curve.
- The gradient is also known as the **rate of change** or **derivative**, and the process of finding the gradient is called **differentiation**.
- The gradient of the curve $\;y = f(x)\;$ is denoted in a few different ways, the three most common are:

$$ y', \quad f'(x), \quad \frac{dy}{dx}. $$

---

# Gradients

## Example, $y = x^2$

<PlotFigure name="tangent-square" :height="340" />

---

# Gradients

## Example, $y = \log(x)$

<PlotFigure name="tangent-log" :height="340" />

---

# Gradients

### Algebraic example

If we want to find $y'(x)$ for $y = x^3 + 2$:

$$ \text{Gradient} = \frac{y_2 - y_1}{x_2-x_1} = \frac{\Delta y}{\Delta x}$$

Try with

$x_1 = 1.5,\;1.9,\;1.99,\;\ldots$

$x_2 = 2.5,\;2.1,\;2.01,\;\ldots$

---

# Gradients

```python
x_1 = 1.5; x_2 = 2.5
y_1 = x_1**3 + 2; y_2 = x_2**3 + 2
print((y_2-y_1)/(x_2-x_1))

>>> 12.25

x_1 = 1.9; x_2 = 2.1
y_1 = x_1**3 + 2; y_2 = x_2**3 + 2
print((y_2-y_1)/(x_2-x_1))

>>> 12.010000000000003

x_1 = 1.99; x_2 = 2.01
y_1 = x_1**3 + 2; y_2 = x_2**3 + 2
print((y_2-y_1)/(x_2-x_1))

>>> 12.00009999999997
```

---

# Gradients

As the difference between $x_1$ and $x_2$ gets smaller, the gradient stabilises. The value it converges to is the gradient at the midway point of $x_1$ and $x_2$.

---

# Calculating gradients exactly

$\text{Gradient} \approx \frac{\Delta y}{\Delta x} = \frac{f(x+h) - f(x)}{h}$

This is called a finite difference approximation to the gradient. The approximation becomes more accurate the smaller h is.

When using the approximation, we denote the changes as $\frac{\Delta y}{\Delta x}$, in the limit as h goes to 0, this becomes $\frac{dy}{dx}$.

In this way, $\frac{d}{dx}$ is an operator, acting on $y$.

Note, the $d$s cannot be cancelled out, as they aren't variables, they denote an infinitely small change.

---

# Calculating gradients exactly

<PlotFigure name="secant" />

---

# Calculating gradients exactly

### Example

Find the gradient of $y = f(x) = x^3 + 2$.

$\frac{dy}{dx} = \frac{f(x+h) - f(x)}{h}$

<v-click>

$\frac{dy}{dx} = \frac{(x+h)^3 + 2 - (x^3 + 2)}{h}$

$\frac{dy}{dx} = \frac{x^3 + 3x^2 h + 3xh^2 + h^3 + 2 - x^3 - 2}{h}$

</v-click>

<v-click>

$\frac{dy}{dx} = \frac{3x^2h + 3xh^2 + h^3}{h}$

$\frac{dy}{dx} = 3x^2 + 3xh + h^2$

</v-click>

<v-click>

Now this is only exactly right when $h \rightarrow 0$. So letting that happen, we have
$\frac{dy}{dx} = 3x^2$

</v-click>

---

# Derivative of polynomial functions

Using techniques like the one above (which is called differentiation from first principles), one can generalise the connection between powers of $x$ and their derivatives:

If $y = a x^n$, then its **derivative** is
$\frac{dy}{dx} = y'(x) = a n x^{n-1}$

---

# Derivative of polynomial functions

### Examples to try

1. $y = x^4$
2. $y = 7x^5$
3. $y = x^{-2} = \frac{1}{x^2}$
4. $y = \sqrt{1/x} = (1/x)^{1/2} = x^{-1/2}$

---

# Derivative of polynomial functions

## Summing and multiplying derivatives

### Summing

$(f(x) \pm g(x))' = f'(x) \pm g'(x)$

e.g.

$y = x^2 + x^3, \quad y' = 2x + 3x^2$

---

# Derivative of polynomial functions

### Multiplying (by a scalar)

$(a f(x))' = a f'(x)$

e.g.

$y = 6x^3, \quad y' = 6 \cdot 3x^2 = 18 x^2$

**This only works for scalars**.

In most circumstances $(f(x) g(x))' \neq f(x)' g(x)'$

e.g.

$y = x\cdot x = x^2, \quad y' \neq 1$

---

# Derivative of polynomial functions

## Higher-order derivatives

You can take a derivative of a function multiple times in a row. This is usually denoted either $y''(x),\;\;f''(x)\;$ or $\;\frac{d^2 y}{dx^2}\;$ for second-order derivatives (differentiating twice), and similar for higher orders.

e.g.

$y = x^3$

$y' = 3x^2$

$y'' = \frac{d^2 y}{dx^2} = 6 x$

---

# Interpreting derivatives:

The sign of the first derivative $\;f'(x)\;$ tells us how $\;f(x)\;$ is growing

<v-clicks>

- Positive gradient: If $\;y' > 0\;$ then $\;y\;$ is **increasing** at $\;x\;$
- Negative gradient: If $\;y' < 0\;$ then $\;y\;$ is **decreasing** at $\;x\;$
- Zero gradient: If $\;y' = 0\;$ then $\;y\;$ is not changing (flat) at $\;x\;$

</v-clicks>

---

# Interpreting derivatives:

### Extreme values (turning points and points of inflection)

(a) Local maximum: $\;\frac{dy}{dx} = 0,\;$ and $\;\frac{d^2y}{dx^2} < 0\;$

(b) Local minimum: $\;\frac{dy}{dx} = 0,\;$ and $\;\frac{d^2y}{dx^2} > 0\;$

\(c) Inflection: $\;\frac{d^2y}{dx^2} = 0\;$

---

# Interpreting derivatives:

### Example: Find the stationary points of $\;y = 2x^3 - 5x^2 - 4x\;$

To do this, we need to know both $\;y'(x)\;$ and $\;y''(x)\;$.

$y'(x) = 6x^2 - 10x - 4$

$y''(x) = 12x - 10$

<v-click>

Stationary points occur when $\;y'(x) = 0\;$

$6x^2 - 10x - 4 = 0$

$(3x + 1)(2x - 4) = 0$

$x = -1/3,\;2$

</v-click>

---

# Interpreting derivatives:

<v-click>

At $x = -1/3$

$y''(-1/3) = 12 \times -1/3 - 10 = -14 < 0$

So this point is a **maximum**.

</v-click>

<v-click>

At $x = 2$

$y''(2) = 12 \times 2 - 10 = 14 > 0$

So this point is a **mimimum**.

</v-click>

<v-click>

Inflection points occur whenever $y''(x) = 0$

$y''(x) = 12x - 10 = 0$

$x = \frac{10}{12} = \frac{5}{6}$

This is an **inflection point**

</v-click>

---

# Interpreting derivatives:

<PlotFigure name="stationary-points" />

---

# Interpreting derivatives:

**Note**: Points of inflection do not require that $\;y'(x) = 0\;$, only that $\;y''(x) = 0\;$.

Points of inflection are important in biology as they define conditions where a response (e.g. reaction rate) is most or least sensitive to a change in conditions (e.g. the concentration of a metabolite).

---

# Reminder on curve sketching

- Aim to evaluate and identify key values of the function (i.e. turning points, points of inflection)
- Look at the limit behaviour as $\;x \to \pm \infty\;$ and as $\;x\;$ approaches any points where the function is undefined (e.g. $\;x \to 0\;$ for $\;y = 1/x\;$).
- Determine the first and second order derivatives to find turning points and points of inflection.

---

# Real life example

The number $n$ (in thousands) of bacteria on an agar plate at time $t$ (in days) is given by the expression:

$n = 15.42 + 6t - t^2$

1. Find the time at which the greatest number of bacteria are present on the plate.
1. Find the number of bacteria on the plate at this time.

To do this we must find the turning points of the function.

---

# Real life example

##### 1. Find the time at which the greatest number of bacteria are present on the plate

- $n(t) = 15.42 + 6t - t^2$
- $n'(t) = 6 - 2t$
- $n'(t) = 0 \quad\implies\quad6-2t=0\quad\implies t=3$

<v-click>

To show this is a maximum, we need to check $n''(t)$

$n''(t) = -2$

Therefore, $n''(t)<0$, for $t = 3$. This means that a maximum occurs at $t = 3$ days.

</v-click>

<v-click>

##### 2. Find the number of bacteria on the plate at this time

$n(3) = 15.42 + 6 \times 3 - 3^2 = 24.42$

The greatest number of bacteria on the plate is **24,420**.

</v-click>

---

# Real life example 2

The growth rate $R$ of a cell colony with $N$ cells at time $t$ can be represented by the equation

$R = \frac{d N}{d t} = kN - bN^2$

For this example take the constants $k$ and $b$ as $k = 3.8$/hr, and $b = 0.01$/hr. This is called a **logistic** model.

(a) What is the equilibrium size of the population?

(b) What population size leads to the largest growth rate?

---

# Real life example 2

(a) The equilibrium will occur when the population stops changing, i.e. when $R = 0$. Meaning:

$R = 3.8 N - 0.01 N^2 = 0$

$N (3.8 - 0.01 N) = 0$

<v-click>

We can disregard the $N = 0$ solution, as it represents population extinction. This means that

$N = \frac{3.8}{0.01} = 380$.

</v-click>

---

# Real life example 2

(b) To find the largest growth rate, we want the maximal value of $R(N)$. This means we need to find $R'(N) = 0$.

$R(N) = 3.8 N - 0.01 N^2$

$R'(N) = 3.8 - 0.02 N$

<v-click>

If $R'(N) = 0$

$3.8 - 0.02N = 0$

$N = 190$

</v-click>

<v-click>

Since $R''(N) = -0.02 < 0$, we can be sure that this is a maximum.

</v-click>
