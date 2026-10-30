---
theme: oxrse
title: Differential equations 3
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

# Steady-state solutions

- It is often useful to find the **steady state** of a system described by ordinary differential equations
- This occurs when all rates (i.e. derivatives) are zero
- A steady state may be **stable** or **unstable**, depending on whether or not small deviations from the steady state tend to be corrected or amplified
- We can evaluate the stability of a steady state by considering the sign of the derivative nearby

---
layout: two-cols
---

# Steady states: radioactive decay

Recall the radioactive decay equation

$$\frac{dN}{dt} = -\lambda N.$$

```python
t = np.linspace(0,6,100)
l = 1.0
N0 = 1.0
def dNdt(N, t):
    return -l * N
N = scipy.integrate.odeint(dNdt, N0, t)
```

::right::

<PlotFigure name="decay" />

---

# Steady states: radioactive decay

- Here the steady state occurs when $N=0$, and is 'reached' after infinite time.
- For small positive $N$ the derivative $dN/dt$ is negative, moving the system towards the steady state.
- Physical considerations show that negative $N$ is impossible, hence the steady state is stable as we would expect.

---

# Steady states: production and degradation

Consider a simple model of the production and degradation of a protein, shown by the reaction chain $\overset{v_1}{\rightarrow}S\overset{v_2}{\rightarrow}$ where $v_1$ and $v_2$ are reaction rates, and let $s=[S]$.

We can represent the change in concentration of the protein by

$$\frac{ds}{dt} = v_1 - v_2$$

so the steady state occurs when $v_1 = v_2$.

---
layout: two-cols
---

# Steady states: mass action

$$\overset{v_1}{\rightarrow}S\overset{v_2}{\rightarrow}$$

Suppose the reaction is governed by "mass action" kinetics, so $v_1=k_1$ (constant) and $v_2=k_2 s$.

The equation is then

$$\frac{ds}{dt} = k_1 - k_2 s.$$

The steady state is given by $s = k_1/k_2$, and it is stable:

::right::

<PlotFigure v-click name="mass-action" />

---

# Steady states: mass action

We can solve the differential equation by separation of variables.

$$
\begin{aligned}
\int \frac{1}{k_1 - k_2 s}\,ds &= \int dt \\
s(t) &= Be^{-k_2 t} + \frac{k_1}{k_2}
\end{aligned}
$$

Thus the concentration of $S$ relaxes exponentially to the steady state, no matter the initial condition.

If the initial concentration of $S$ is given by $s_0$ then

$$s(t) = s_0 e^{-k_2 t} + \frac{k_1}{k_2}\left(1-e^{-k_2 t}\right)$$

---

# Steady states: positive feedback

Suppose instead that $S$ enhances its own production (positive feedback) and the degradation rate is nonlinear, so $v_1=k_1 s$ and $v_2=k_2 s^2$:

$$\frac{ds}{dt} = k_1s - k_2 s^2$$

Then the system will be at steady state when $k_1 s = k_2 s^2$, i.e. $s=0$ or $s=k_1/k_2$.

---

# Steady states: positive feedback

We can plot $ds/dt$ versus $s$ to see if they are stable or unstable:

<PlotFigure v-click name="positive-feedback" :height="360" />

---

# Positive feedback: non-graphical method

$$\frac{ds}{dt} = k_1s - k_2 s^2$$

- When $s$ is small (and positive, since it is a concentration) $s\gg s^2$ so the derivative $k_1 s - k_2 s^2$ will be positive, making $s=0$ an unstable steady state.
- For the other steady state, consider small deviations by $\varepsilon$ from the steady state, e.g. $s=k_1/k_2 + \varepsilon$.

<v-click>

Then

$$s^2=\frac{k_1^2}{k_2^2} + 2 \varepsilon\frac{k_1}{k_2} + \varepsilon^2$$

and the derivative is $- k_1\varepsilon - k_2\varepsilon^2$.

It is, since $\varepsilon\gg\varepsilon^2$, negative, pushing $s$ back towards the steady state, hence it is a stable steady state.

</v-click>

---

# Steady states: the logistic equation

The growth of a cell colony can be modelled by the _logistic_ equation

$$\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)$$

where $N(t)$ is the number of cells at time $t$, and $r$ and $K$ are constant parameters (both positive).

The steady state for the system, or equilibrium population size, occurs when the growth rate is zero, i.e.

$$\frac{dN}{dt} = 0 \quad\Rightarrow\quad rN = \frac{r}{K}N^2 \quad\Rightarrow\quad N = 0 \text{ or } N = K.$$

---

# Steady states: the logistic equation

<PlotFigure name="positive-feedback-sliders" />

---

# Steady states: the logistic equation

- for small positive $N$, $rN>0$ and $N<K$ so $dN/dt>0$ and the population size will increase, meaning that $N=0$ is an unstable steady state.
- In fact the growth rate is positive for $0<N<K$ and negative for $N>K$, making $N=K$ a stable steady state.

<v-click>

We can solve the differential equation to examine the transient behaviour.
This is a separable equation, so

$$\int \frac{1}{rKN-rN^2}\,dN = \int \frac{1}{K}\,dt$$

Solve this, using partial fractions on the left hand side:

- With initial conditions $N(0)=N_0$ you get

$$N(t) = \frac{K N_0 e^{rt}}{K + N_0(e^{rt}-1)}$$

</v-click>

---

# Summary of first order differential equations

To solve a differential equation:

1. Calculate the general solution
   1. Try to write it as a separable equation first
   2. Other methods (e.g. integrating factors) not covered in this course
2. This general solution will include an arbitrary constant this may be eliminated using initial conditions (if these are given)
3. Can check your solution numerically using Python

To find steady state (equilibrium) solutions, find points where all (first) derivatives are zero.

To determine stability of these steady states, look at the behaviour of the first derivative in the vicinity of the steady state.
You can sketch the first derivative, or use Python to help with this.

---

# Chemical reactions to equations: mass action

- Chemical reactions assume uniform mixing
- Rates proportional to product of masses
- Predator/prey and epidemics have similar rules

<v-click>

**1.** A and B produce C. The reaction is governed by A meeting B:

$$A+B\underset{k}{\rightarrow} C$$

$$
\begin{aligned}
\frac{d[A]}{dt} &= -k[A][B] \\
\frac{d[B]}{dt} &= -k[A][B] \\
\frac{d[C]}{dt} &= k[A][B]
\end{aligned}
$$

</v-click>

---

# Chemical reactions to equations: mass action

**2.** Predation of R by W

$$R+W\underset{k}{\rightarrow} W \qquad\qquad \frac{dR}{dt} = -kRW$$

<v-click>

**3.** Constant production (zeroth order)

$$0 \underset{k}{\rightarrow} A \qquad\qquad \frac{d[A]}{dt} = k$$

</v-click>

<v-click>

**4.** Degradation/death

$$C \underset{k}{\rightarrow} 0 \qquad\qquad \frac{d[C]}{dt} = -k[C]$$

</v-click>

---

# Numerically solving differential equations

What if we can't solve the differential equation?

$$\frac{dy}{dt} = \sin\left(\frac{y\ln(t\cos(y))}{\sqrt{1+y/e^t}}\right) + 3$$

<v-click>

(or we just don't want to)

</v-click>

---

# Euler's method

Given a differential equation

$$\frac{dy}{dt} = f(y, t)$$

with initial state $y(t = t_0) = y_0$, we can _approximate_ the state at $t = t_0 + \delta{t}$ as:

$$y_1 = y(t + \delta{t}) \approx y_0 + f(y, t) \cdot \delta{t}$$

and the next state as

$$y_2 = y(t + 2\delta{t}) \approx y_1 + f(y, t) \cdot \delta{t}$$

and so on!

---

# Euler's method

This mean's we can estimate the _entire time course of $y(t)$_, provided:

1. We can calculate $f(y, t)$ (or approximate it with a computer)
2. We're patient enough to take really tiny steps $\delta{t}$

This is really simple with a computer! See the Python helpsheet for details.
