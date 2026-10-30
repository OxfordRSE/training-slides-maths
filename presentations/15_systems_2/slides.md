---
theme: oxrse
title: Systems of differential equations 2
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

# Recap

- So far we have looked at systems of **first order**, **linear** ODEs in **two dimensions**
  - Are you comfortable with the words in bold?
- These systems can be solved analytically
  - 3 methods of solving systems of first order ODEs
  - Diagonalisation extends to $N$-dimensional systems

---

# Plan for this lecture

- Aim to look at systems of **first order**, **nonlinear** ODEs in **more dimensions**
- How we go about modelling a problem
- Simplifying systems of ODEs
  - Reducing number of parameters
  - Reducing number of equations
- Phase plane analysis

---

# System simplification: rescaling

This predator-prey model is in dimensional terms and contains 5 parameters.

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

We substitute

- $N=\theta{n}$
- $P=\phi{p}$
- $T=\tau{t}$

where $n,p,t$ are nondimensional, and $\theta$ is a typical value for $N$ etc.

Note that

$$\frac{d}{dT} = \frac{d}{dt}\frac{dt}{dT} = \frac{1}{\tau} \frac{d}{dt}.$$

---

# Rescaling: the rescaled system

Original:

$$
\begin{aligned}
\frac{dN}{dT} &= rN\left(1-\frac{N}{K}\right) - bNP,\\
\frac{dP}{dT} &= ebNP - mP.
\end{aligned}
$$

<v-click>

Rescaled:

$$
\begin{aligned}
\frac{\theta}{\tau}\frac{dn}{dt} &= {\theta}rn\left(1-\frac{{\theta}n}{K}\right) - bnp{\theta}{\phi},\\
\frac{\phi}{\tau}\frac{dp}{dt} &= ebnp{\theta}{\phi} - mp{\phi}.
\end{aligned}
$$

Note that $\theta$, $\phi$ and $\tau$ are arbitrary values for scaling $N$, $P$ and $T$.

</v-click>

---

# Rescaling: choosing the scales

$$
\begin{aligned}
\frac{dn}{dt} &= \tau\left( rn\left(1-\frac{{\theta}n}{K}\right) - bnp{\phi}\right),\\
\frac{dp}{dt} &= \tau\left( ebnp{\theta} - mp\right).
\end{aligned}
$$

After rearranging we note that choosing $\theta=K$ will remove the parameter $K$ from the equations.
Choosing $\tau = 1/m$ (or $\tau = 1/r$) will remove a further parameter.

<v-click>

$$
\begin{aligned}
\dot{n} &= \left( \frac{r}{m}n(1-n) - \frac{b{\phi}}{m}np\right),\\
\dot{p} &= \left( \frac{ebpK}{m}n - p\right).
\end{aligned}
$$

</v-click>

---

# Rescaling: two parameters

$\phi=m/b$ gives the two parameter system

$$
\begin{aligned}
\dot{n} &= \left( \frac{r}{m}n(1-n) - np\right),\\
\dot{p} &= \left( \frac{ebpK}{m}n - p\right),
\end{aligned}
$$

where we have shifted the groups of parameters to only two places.

<v-click>

We could make it more obvious that there are only two "tuning dials" by writing it as

$$
\begin{aligned}
\dot{n} &= v_1 n(1-n) - np,\\
\dot{p} &= p(v_2 n - 1).
\end{aligned}
$$

</v-click>

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

This system can be written as a system of 4 ODEs for $s, e, c, p$ which describe the concentrations of $S, E, C$ and $P$:

$$
\begin{aligned}
\dot{s} &= -k_1 se + k_{-1}c, \\
\dot{e} &= -k_1 se + k_{-1}c + k_{2}c,\\
\dot{c} &= k_1 se - k_{-1}c - k_{2}c, \\
\dot{p} &= k_{2}c.
\end{aligned}
$$

---

# Conservation: eliminating $e$

However the enzyme is recycled: it is used in the complex and then released.
This means that $e + c = e_{\text{tot}}$ where $e_{\text{tot}}$ is constant.

<v-click>

Making the substitution $e = e_{\text{tot}} - c$ to eliminate $e$ we arrive at the 3 ODE system:

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

If this is the case then we can assume that the concentration of $C$ arrives at some level $c^*$ (a quasi-steady state) and then moves very slowly.

<v-click>

Solve the equation for $\dot{c}=0$:

$$
\begin{aligned}
\dot{c} &= k_1 s(e_{\text{tot}} - c) - k_{-1}c - k_{2}c = 0, \\
\implies
c^* &= \frac{k_1 e_{\text{tot}} s}{k_{-1} + k_2 + k_1 s},
\end{aligned}
$$

which is **not a steady state**: it moves slowly with $s$.

</v-click>

---

# Quasi-steady state: two equations

Substituting this quasi-steady state into the remaining equations gives an **approximate** system of 2 ODEs:

$$
\begin{aligned}
\dot{s} &= -\frac{k_1 k_2 e_{\text{tot}} s}{ k_{-1} + k_2 + k_1 s}, \\
\dot{p} &= \frac{k_1 k_2 e_{\text{tot}} s}{ k_{-1} + k_2 + k_1 s}.
\end{aligned}
$$

This means that we have used conservation and quasi-steady state to go from a 4-dimensional system $(s,e,c,p)$ to a two-dimensional approximation which captures some of the behaviour.

Two dimensions are good because we can plot their behaviour on a phase plane diagram...

---

# Phase planes and nullclines

A system of **nonlinear** ODEs may have more than one fixed point (or may have none).
Finding fixed points in two-dimensional systems is aided by **nullclines**.

An $x$-nullcline is a line where $\dot{x}=0$ and a $y$-nullcline is a line where $\dot{y}=0$.
(These are straight lines in the linear case.)

---
layout: two-cols
---

# Nullclines: example

$$
\begin{aligned}
\dot{x} &= x(1-x) -xy,\\
\dot{y} &= 2y\left(1-\frac{y}{2}\right) - 3xy,
\end{aligned}
$$

has $x$-nullclines (blue) at $x=0$ and $1-x-y=0$; and $y$-nullclines (orange) at $y=0$ and $2-3x-y=0$.

Nullcline intersections give us the fixed points.
Nullclines can be annotated to give the direction (and magnitude) of the non-zero derivative.

::right::

<PlotFigure v-click name="nullclines" :height="440" />

---

# Phase plane

<PlotFigure name="phase-plane" :height="440" />

---

# Summary

- Simplification
  - Rescaling to dimensionless quantities
  - Conservation
  - Quasi-steady state approximation
- Nullclines for finding steady states and phase flow
