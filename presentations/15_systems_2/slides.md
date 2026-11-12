---
theme: oxrse
title: Systems of differential equations 2
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

# Why simplify systems?

In lecture 14 we solved systems of **first order**, **linear** differential equations in **two dimensions** exactly.

Most models in biology are **nonlinear**, often with many variables and many parameters, and we usually can't solve them by hand.

In this lecture we look at two things we can still do.
First, we can **simplify** a system, so that it has fewer parameters or fewer equations.
Second, we can draw its **phase plane**, which shows how its solutions behave without solving it.
In lecture 16 we use eigenvalues to decide whether its steady states are stable.

---

# System simplification: rescaling

This predator-prey model is in dimensional terms and contains 5 parameters:

$$
\begin{aligned}
\frac{dN}{dT} &= rN\left(1-\frac{N}{K}\right) - bNP,\\
\frac{dP}{dT} &= ebNP - mP.
\end{aligned}
$$

- $r$: prey intrinsic growth rate
- $K$: prey carrying capacity (bound to logistic growth)
- $b$: predation rate
- $e$: conversion efficiency
- $m$: per capita predator mortality rate

---

# Rescaling: substitution

Rescaling tells us which combinations of the parameters really matter.
We substitute

$$N=\theta n, \qquad P=\phi p, \qquad T=\tau t,$$

where $n$, $p$ and $t$ are nondimensional, and $\theta$, $\phi$ and $\tau$ are constants: typical values of $N$, $P$ and $T$, which we will choose later.

<v-click>

Note that, by the chain rule,

$$\frac{d}{dT} = \frac{d}{dt}\frac{dt}{dT} = \frac{1}{\tau} \frac{d}{dt}.$$

</v-click>

---

# Rescaling: the rescaled system

Substituting into the original system gives

$$
\begin{aligned}
\frac{\theta}{\tau}\frac{dn}{dt} &= \theta rn\left(1-\frac{\theta n}{K}\right) - b\theta\phi np,\\
\frac{\phi}{\tau}\frac{dp}{dt} &= eb\theta\phi np - m\phi p.
\end{aligned}
$$

<v-click>

Then we divide the first equation by $\theta/\tau$ and the second by $\phi/\tau$:

$$
\begin{aligned}
\frac{dn}{dt} &= \tau\left( rn\left(1-\frac{\theta n}{K}\right) - b\phi np\right),\\
\frac{dp}{dt} &= \tau\left( eb\theta np - mp\right).
\end{aligned}
$$

</v-click>

---

# Rescaling: choosing the scales

Choosing $\theta=K$ will remove the parameter $K$ from the equations:

$$
\begin{aligned}
\frac{dn}{dt} &= \tau\left( rn(1-n) - b\phi np\right),\\
\frac{dp}{dt} &= \tau\left( ebK np - mp\right).
\end{aligned}
$$

<v-click>

Choosing $\tau = 1/m$ (or $\tau = 1/r$) will remove a further parameter:

$$
\begin{aligned}
\frac{dn}{dt} &= \frac{r}{m}n(1-n) - \frac{b\phi}{m}np,\\
\frac{dp}{dt} &= \frac{ebK}{m}np - p.
\end{aligned}
$$

</v-click>

---

# Rescaling: two parameters

Finally, $\phi=m/b$ gives the two parameter system

$$
\begin{aligned}
\dot{n} &= \frac{r}{m}n(1-n) - np,\\
\dot{p} &= \frac{ebK}{m}np - p,
\end{aligned}
$$

where $\dot{n}$ is short for $dn/dt$, and $\dot{p}$ for $dp/dt$.

<v-click>

We could make it more obvious that there are only two "tuning dials", $v_1 = r/m$ and $v_2 = ebK/m$, by writing it as

$$
\begin{aligned}
\dot{n} &= v_1 n(1-n) - np,\\
\dot{p} &= p(v_2 n - 1).
\end{aligned}
$$

</v-click>

---

# Rescaling: two tuning dials

Any choice of the five original parameters behaves like one of these: only $v_1$ and $v_2$ change the shape of the solutions.

<PlotFigure name="predator-prey" :height="320" />

---

# System simplification: conservation

Consider a chemical system where a product is formed from a substrate via an intermediate complex involving an enzyme.

$$
S + E
\overset{k_1}{\underset{k_{-1}}\rightleftharpoons}
C
\overset{k_2}\rightarrow
P + E
$$

<v-click>

By mass action (lecture 11), this system can be written as a system of 4 ODEs for $s, e, c, p$, which describe the concentrations of $S, E, C$ and $P$:

$$
\begin{aligned}
\dot{s} &= -k_1 se + k_{-1}c, \\
\dot{e} &= -k_1 se + k_{-1}c + k_{2}c,\\
\dot{c} &= k_1 se - k_{-1}c - k_{2}c, \\
\dot{p} &= k_{2}c.
\end{aligned}
$$

</v-click>

---

# Conservation: eliminating e

However, the enzyme is recycled: it is used in the complex and then released.
Adding the equations for $e$ and $c$,

$$\dot{e} + \dot{c} = 0,$$

so $e + c = e_{\text{tot}}$, where $e_{\text{tot}}$ is constant.

<v-click>

Making the substitution $e = e_{\text{tot}} - c$ to eliminate $e$, we arrive at the 3 ODE system:

$$
\begin{aligned}
\dot{s} &= -k_1 s(e_{\text{tot}} - c) + k_{-1}c, \\
\dot{c} &= k_1 s(e_{\text{tot}} - c) - k_{-1}c - k_{2}c, \\
\dot{p} &= k_{2}c.
\end{aligned}
$$

</v-click>

---

# System simplification: quasi-steady state

In the previous example it may be known that the rate of conversion to complex (from $k_1$ and $k_{-1}$) is much faster than the degradation of complex into product (rate $k_2$).

If this is the case, then we can assume that the concentration of $C$ quickly arrives at some level $c^*$ (a quasi-steady state), and then moves very slowly.

<v-click>

Solve the equation for $\dot{c}=0$:

$$
\dot{c} = k_1 s(e_{\text{tot}} - c) - k_{-1}c - k_{2}c = 0
\qquad\implies\qquad
c^* = \frac{k_1 e_{\text{tot}} s}{k_{-1} + k_2 + k_1 s},
$$

which is **not a steady state**: it moves slowly with $s$.

</v-click>

---

# Quasi-steady state: Michaelis-Menten

Substituting this quasi-steady state into the remaining equations gives an **approximate** system of 2 ODEs:

$$
\dot{s} = -\frac{k_1 k_2 e_{\text{tot}} s}{ k_{-1} + k_2 + k_1 s}, \qquad
\dot{p} = \frac{k_1 k_2 e_{\text{tot}} s}{ k_{-1} + k_2 + k_1 s}.
$$

<v-click>

Dividing the top and bottom by $k_1$, the rate of the reaction is

$$\dot{p} = \frac{V_{\max}\, s}{K_m + s}, \qquad V_{\max} = k_2 e_{\text{tot}}, \qquad K_m = \frac{k_{-1} + k_2}{k_1}.$$

This is the Michaelis-Menten equation from lectures 01 and 09.

</v-click>

<v-click>

So, using conservation and quasi-steady state, we have gone from a 4-dimensional system $(s,e,c,p)$ to a two-dimensional approximation which captures some of the behaviour.

</v-click>

---

# Phase planes and nullclines

With two variables $x$ and $y$, we can draw the **phase plane**: the $(x, y)$ plane, with an arrow at each point showing the direction of $(\dot{x}, \dot{y})$.
Each solution follows a path through it, as in lecture 14.

<v-click>

A system of **nonlinear** ODEs may have more than one fixed point (or may have none).
Finding fixed points in two-dimensional systems is aided by **nullclines**.

</v-click>

<v-click>

An $x$-nullcline is a line where $\dot{x}=0$, and a $y$-nullcline is a line where $\dot{y}=0$.
(These are straight lines in the linear case.)

</v-click>

<v-click>

At a fixed point $\dot{x} = \dot{y} = 0$, so the fixed points are where an $x$-nullcline crosses a $y$-nullcline.

</v-click>

---
layout: exercise
---

# Exercise: nullclines

For the system

$$
\begin{aligned}
\dot{x} &= x(1-x) -xy,\\
\dot{y} &= 2y\left(1-\frac{y}{2}\right) - 3xy,
\end{aligned}
$$

find the $x$-nullclines, the $y$-nullclines and the fixed points.

::work::

---
layout: two-cols
---

# Nullclines: example

Factorising,

$$
\begin{aligned}
\dot{x} &= x(1-x-y),\\
\dot{y} &= y(2-y-3x).
\end{aligned}
$$

<v-click>

So the $x$-nullclines are $x=0$ and $y = 1-x$,

</v-click>

<v-click>

and the $y$-nullclines are $y=0$ and $y = 2-3x$.

</v-click>

<v-click>

The fixed points are $(0, 0)$, $(1, 0)$, $(0, 2)$ and $(1/2, 1/2)$.
Note that $(0, 1)$, where two $x$-nullclines meet, is not a fixed point.

</v-click>

::right::

<PlotFigure v-click="1" name="nullclines" :height="390" />

---
layout: two-cols
---

# Phase plane

The arrows can only cross the $x$-nullclines vertically, and the $y$-nullclines horizontally.

<v-click>

By following the arrows, we can sketch the behaviour of solutions (green lines, from the stars).

</v-click>

<v-click>

Move the sliders to start a solution from another point.
Almost every solution that starts with $x$ and $y$ both positive ends up at $(1, 0)$ or $(0, 2)$ (lecture 16 shows why).

</v-click>

::right::

<PlotFigure name="phase-plane" :height="400" />

---

# Phase planes in Python

```python
x, y = np.meshgrid(np.linspace(0, 1.1, 23), np.linspace(0, 2.1, 22))
dx = x * (1 - x) - x * y
dy = 2 * y * (1 - y / 2) - 3 * x * y
plt.streamplot(x, y, dx, dy, color='lightgray')

xs = np.linspace(0, 1.1, 100)
plt.plot(xs, 1 - xs, color='C0', label='x-nullclines')
plt.axvline(0, color='C0')
plt.plot(xs, 2 - 3 * xs, color='C1', label='y-nullclines')
plt.axhline(0, color='C1')
plt.ylim(0, 2.1)
plt.legend()
```

<v-click>

`streamplot` draws the paths of the solutions through a grid of arrows, and the nullclines go on top.
The course material also shows how to add solutions from chosen starting points with `solve_ivp`.

</v-click>

---

# Summary

1. Rescaling to dimensionless quantities shows which combinations of parameters matter, and can reduce their number.
2. Conservation (e.g. a total amount of enzyme) can remove an equation.
3. The quasi-steady state approximation removes an equation that relaxes quickly, e.g. giving the Michaelis-Menten equation.
4. Nullclines are a powerful way of finding fixed points, and of sketching the phase plane.
