---
theme: oxrse
title: Differential equations 3
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

# Why steady states?

Often we don't need the full solution of a differential equation: we want to know where the system ends up, and whether it goes back there if something nudges it.

These long-run states are the _steady states_, and we can find them, and decide whether they are stable, without solving the equation.

In this lecture we find the steady states of models from biology and chemistry, written down using the law of mass action, and recap how to solve equations numerically.

---

# Steady-state solutions

It is often useful to find the **steady state** of a system described by ordinary differential equations.
This occurs when all rates (i.e. derivatives) are zero.

<v-click>

A steady state may be **stable** or **unstable**, depending on whether or not small deviations from the steady state tend to be corrected or amplified.

</v-click>

<v-click>

We can evaluate the stability of a steady state by considering the sign of the derivative nearby.

</v-click>

---
layout: two-cols
---

# Steady states: radioactive decay

Recall the radioactive decay equation

$$\frac{dN}{dt} = -\lambda N.$$

```python
from scipy.integrate import solve_ivp

lam = 1.0
N0 = 1.0
t = np.linspace(0, 6, 100)

def dNdt(t, N):
    return -lam * N

solution = solve_ivp(dNdt, [0, 6], [N0],
                     t_eval=t)
N = solution.y[0]
```

::right::

<PlotFigure v-click name="decay" />

---

# Steady states: radioactive decay

<v-clicks at="+0">

- Here the steady state occurs when $N=0$, and is 'reached' after infinite time.
- If $N$ moves away from $0$, then $dN/dt = -\lambda N$ has the opposite sign to $N$: negative when $N$ is positive, and positive when $N$ is negative.
- So $N$ always moves back towards $0$, and the steady state is stable.

</v-clicks>

---

# Chemical reactions to equations: mass action

Under the law of mass action, we assume that:

<v-clicks>

- chemical reactions have uniform mixing
- rates are proportional to the product of the concentrations of the reactants
- predator/prey interactions, and epidemics, have similar rules

</v-clicks>

---

# Mass action: two reactants

A and B produce C. The reaction is governed by A meeting B:

$$A+B\underset{k}{\rightarrow} C$$

<v-click>

This gives the differential equations

$$
\begin{aligned}
\frac{d[A]}{dt} &= -k[A][B] \\
\frac{d[B]}{dt} &= -k[A][B] \\
\frac{d[C]}{dt} &= k[A][B]
\end{aligned}
$$

</v-click>

---

# Mass action: more examples

<v-clicks at="+0">

- Predation of R by W:

  $$R+W\underset{k}{\rightarrow} W \qquad\qquad \frac{dR}{dt} = -kRW$$

- Constant production (zeroth order):

  $$0 \underset{k}{\rightarrow} A \qquad\qquad \frac{d[A]}{dt} = k$$

- Degradation/death:

  $$C \underset{k}{\rightarrow} 0 \qquad\qquad \frac{d[C]}{dt} = -k[C]$$

</v-clicks>

---

# Steady states: production and degradation

Consider a simple model of the production and degradation of a protein, shown by the reaction chain $\overset{v_1}{\rightarrow}S\overset{v_2}{\rightarrow}$ where $v_1$ and $v_2$ are reaction rates, and let $s=[S]$.

<v-click>

We can represent the change in concentration of the protein by

$$\frac{ds}{dt} = v_1 - v_2$$

so the steady state occurs when $v_1 = v_2$.

</v-click>

<v-click>

Under mass action, constant production and degradation give $v_1=k_1$ and $v_2=k_2 s$, so

$$\frac{ds}{dt} = k_1 - k_2 s.$$

</v-click>

---
layout: two-cols
---

# Steady states: production and degradation

$$\frac{ds}{dt} = k_1 - k_2 s$$

The steady state is $s = k_1/k_2$, where $ds/dt = 0$.

<v-click at="2">

Below it, $ds/dt > 0$, so $s$ increases; above it, $ds/dt < 0$, so $s$ decreases.
Either way, $s$ moves back towards $k_1/k_2$ (the arrows), so the steady state is stable.

</v-click>

::right::

<PlotFigure v-click="1" name="mass-action" />

---

# Production and degradation: solution

We can solve the differential equation by separation of variables:

$$ {1|1-2|1-3|1-4}
\begin{aligned}
\int \frac{1}{k_1 - k_2 s}\,ds &= \int dt \\
-\frac{1}{k_2}\ln|k_1 - k_2 s| &= t + c \\
k_1 - k_2 s &= Ae^{-k_2 t} \\
s(t) &= Be^{-k_2 t} + \frac{k_1}{k_2}
\end{aligned}
$$

where $A = \pm e^{-k_2c}$ and $B = -A/k_2$ are constants.

<v-click>

If the initial concentration of $S$ is $s_0$, then $B = s_0 - k_1/k_2$, so

$$s(t) = s_0 e^{-k_2 t} + \frac{k_1}{k_2}\left(1-e^{-k_2 t}\right)$$

</v-click>

---

# Production and degradation: solution

Thus the concentration of $S$ relaxes exponentially to the steady state, no matter the initial condition:

<PlotFigure name="relaxation" :height="340" />

---

# Steady states: positive feedback

Suppose instead that $S$ enhances its own production (positive feedback) and the degradation rate is nonlinear, so $v_1=k_1 s$ and $v_2=k_2 s^2$:

$$\frac{ds}{dt} = k_1s - k_2 s^2$$

<v-click>

Then the system will be at steady state when $k_1 s = k_2 s^2$, i.e. $s=0$ or $s=k_1/k_2$.

</v-click>

---

# Steady states: positive feedback

We can plot $ds/dt$ versus $s$ to see if they are stable or unstable:

<PlotFigure v-click name="positive-feedback" :height="360" />

---

# Positive feedback: non-graphical method

$$\frac{ds}{dt} = k_1s - k_2 s^2$$

<v-clicks>

- When $s$ is small (and positive, since it is a concentration) $s\gg s^2$, so the derivative $k_1 s - k_2 s^2$ will be positive, making $s=0$ an unstable steady state.
- For the other steady state, consider small deviations by $\varepsilon$ from the steady state, e.g. $s=k_1/k_2 + \varepsilon$.

</v-clicks>

---

# Positive feedback: non-graphical method

Substituting $s=k_1/k_2 + \varepsilon$ into the equation:

$$ {1|1-2|1-3}
\begin{aligned}
\frac{ds}{dt} &= k_1\left(\frac{k_1}{k_2}+\varepsilon\right) - k_2\left(\frac{k_1}{k_2}+\varepsilon\right)^2 \\
&= \frac{k_1^2}{k_2} + k_1\varepsilon - \frac{k_1^2}{k_2} - 2k_1\varepsilon - k_2\varepsilon^2 \\
&= -k_1\varepsilon - k_2\varepsilon^2
\end{aligned}
$$

<v-click>

For small $\varepsilon$, $\varepsilon^2$ is much smaller than $\varepsilon$, so $ds/dt \approx -k_1\varepsilon$, which has the opposite sign to $\varepsilon$.
So $s$ moves back towards the steady state, and it is stable.

</v-click>

---
layout: aside
---

# Aside: the slope at a steady state

Suppose $ds/dt = f(s)$, with a steady state at $s^*$, so that $f(s^*) = 0$.

<v-click>

Close to $s^*$, the curve of $f$ is close to its tangent:

$$\frac{ds}{dt} = f(s) \approx f'(s^*)\,(s - s^*)$$

</v-click>

<v-click>

If $f'(s^*) < 0$, then $ds/dt$ has the opposite sign to $s - s^*$, so $s$ moves back: the steady state is stable.
If $f'(s^*) > 0$, then $s$ moves away: it is unstable.

</v-click>

<v-click>

e.g. for positive feedback, $f'(s) = k_1 - 2k_2 s$, so $f'(0) = k_1 > 0$ (unstable) and $f'(k_1/k_2) = -k_1 < 0$ (stable).

</v-click>

---
layout: exercise
---

# Steady states: the logistic equation

The growth of a cell colony can be modelled by the _logistic_ equation

$$\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)$$

where $N(t)$ is the number of cells at time $t$, and $r$ and $K$ are constant parameters (both positive).

::work::

Find the steady states of the logistic equation, and decide whether each one is stable.

---

# The logistic equation: steady states

The steady state for the system, or equilibrium population size, occurs when the growth rate is zero, i.e.

$$\frac{dN}{dt} = 0 \quad\Rightarrow\quad rN = \frac{r}{K}N^2 \quad\Rightarrow\quad N = 0 \text{ or } N = K.$$

<v-click>

This is positive feedback with $k_1 = r$ and $k_2 = r/K$: the same equation as lecture 10's leaf.

</v-click>

---

# The logistic equation: stability

<PlotFigure name="logistic" />

---

# The logistic equation: stability

<v-clicks at="+0">

- For small positive $N$, $rN>0$ and $N<K$, so $dN/dt>0$ and the population size will increase, meaning that $N=0$ is an unstable steady state.
- In fact the growth rate is positive for $0<N<K$ and negative for $N>K$, making $N=K$ a stable steady state.

</v-clicks>

---

# The logistic equation: solution

To see how the population approaches $K$, we can solve the differential equation.

<v-click>

It is lecture 10's leaf equation with $k_1 = r$ and $k_2 = r/K$, so the same partial fractions give, with the initial condition $N(0)=N_0$:

$$N(t) = \frac{K N_0 e^{rt}}{K + N_0(e^{rt}-1)}$$

</v-click>

---

# The logistic equation: solution

<PlotFigure name="logistic-solutions" />

---

# Numerically solving differential equations

What if we can't solve the differential equation?

$$\frac{dy}{dt} = \sin\left(\frac{y\ln(t\cos(y))}{\sqrt{1+y/e^t}}\right) + 3$$

<v-click>

(or we just don't want to)

</v-click>

---

# Euler's method: a recap

In lecture 9 we solved $dy/dt = f(t, y)$ numerically with Euler's method: from $y_0$ at $t_0$, take steps of size $h$ along the tangent,

$$y_{n+1} = y_n + h\,f(t_n, y_n)$$

<v-click>

The smaller the step, the more accurate the answer, but the more steps we need.

</v-click>

<v-click>

In practice we use SciPy's `solve_ivp`, which uses a more sophisticated method and chooses the step size for us.

</v-click>

---

# Summary of first order differential equations

To solve a differential equation:

1. Calculate the general solution: try to write it as a separable equation first.
   Other methods exist, such as integrating factors (see Extension problems 2 in the course material).
2. The general solution includes an arbitrary constant, which we can find from the initial condition (if we are given one).
3. Check the solution numerically with Python, or solve numerically if we can't solve by hand.

To find steady state (equilibrium) solutions, find points where all (first) derivatives are zero.

To determine the stability of these steady states, look at the sign of the first derivative in the vicinity of the steady state.
You can sketch the first derivative, or use Python to help with this.
