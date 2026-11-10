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

In this lecture we find the steady states of models from biology and chemistry, written down using the law of mass action.

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

Here the steady state occurs when $N=0$, and is 'reached' after infinite time.

<v-click>

If $N$ moves away from $0$, then $dN/dt = -\lambda N$ has the opposite sign to $N$: negative when $N$ is positive, and positive when $N$ is negative.

</v-click>

<v-click>

So $N$ always moves back towards $0$, and the steady state is stable.

</v-click>

---

# Steady states: production and degradation

Radioactive decay only loses $N$, but most quantities in biology are also produced.
Consider a simple model of the production and degradation of a protein $S$, with concentration $s=[S]$:

$$\xrightarrow{\;v_1\;} S \xrightarrow{\;v_2\;}$$

where $v_1$ and $v_2$ are the rates of production and degradation.

<v-click>

We can represent the change in concentration of the protein by

$$\frac{ds}{dt} = v_1 - v_2$$

so the steady state occurs when $v_1 = v_2$.

</v-click>

<v-click>

To go further, we need to know how $v_1$ and $v_2$ depend on the concentrations.

</v-click>

---

# Chemical reactions to equations: mass action

The law of mass action tells us how to write down the rates of reactions.
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

Predation of R by W:

$$R+W\underset{k}{\rightarrow} W \qquad\qquad \frac{dR}{dt} = -kRW$$

<v-click>

Constant production (zeroth order):

$$0 \underset{k}{\rightarrow} A \qquad\qquad \frac{d[A]}{dt} = k$$

</v-click>

<v-click>

Degradation/death:

$$C \underset{k}{\rightarrow} 0 \qquad\qquad \frac{d[C]}{dt} = -k[C]$$

</v-click>

---

# Steady states: production and degradation

Back to our protein: with constant production and degradation,

$$\xrightarrow{\;k_1\;} S \xrightarrow{\;k_2\;}$$

<v-click>

mass action gives $v_1=k_1$ and $v_2=k_2 s$, so

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

</v-click>

<v-click at="3">

Either way, $s$ moves back towards $k_1/k_2$ (the arrows), so the steady state is stable.

</v-click>

::right::

<PlotFigure v-click="1" name="mass-action" :params="{ arrows: $clicks >= 3 }" />

---

# Production and degradation: solution

We can solve the differential equation by separation of variables:

$$ {1|1-2|1-3|1-4}
\begin{aligned}
\int \frac{1}{k_1 - k_2 s}\,ds &= \int dt \\
-\frac{1}{k_2}\ln|k_1 - k_2 s| &= t + c \\
k_1 - k_2 s &= Ae^{-k_2 t} &&\text{where } A = \pm e^{-k_2c} \\
s(t) &= Be^{-k_2 t} + \frac{k_1}{k_2} &&\text{where } B = -A/k_2
\end{aligned}
$$

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

<PlotFigure v-click="1" name="positive-feedback" :height="360" :params="{ arrows: $clicks >= 2 }" />

<!-- The arrows appear on this click, once the class has had a go -->
<div v-click="2" />


---

# Positive feedback: non-graphical method

$$\frac{ds}{dt} = k_1s - k_2 s^2$$

<v-click>

When $s$ is small (and positive, since it is a concentration) $s\gg s^2$, so the derivative $k_1 s - k_2 s^2$ will be positive, making $s=0$ an unstable steady state.

</v-click>

<v-click>

For the other steady state, consider small deviations by $\varepsilon$ from the steady state, e.g. $s=k_1/k_2 + \varepsilon$.

</v-click>

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

<PlotFigure name="logistic" :params="{ arrows: $clicks >= 1 }" />

<!-- The arrows appear on this click, once the class has had a go -->
<div v-click="1" />

---

# The logistic equation: stability

For small positive $N$, $rN>0$ and $N<K$, so $dN/dt>0$ and the population size will increase, meaning that $N=0$ is an unstable steady state.

<v-click>

In fact the growth rate is positive for $0<N<K$ and negative for $N>K$, making $N=K$ a stable steady state.

</v-click>

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

# Summary of first order differential equations

To solve a differential equation:

1. Calculate the general solution: try to write it as a separable equation first.
   Other methods exist, such as integrating factors (see Extension problems 2 in the course material).
2. The general solution includes an arbitrary constant, which we can find from the initial condition (if we are given one).
3. Check the solution numerically with Python, or solve numerically if we can't solve by hand.

To find steady state (equilibrium) solutions, find points where all (first) derivatives are zero.

To determine the stability of these steady states, look at the sign of the first derivative in the vicinity of the steady state.
You can sketch the first derivative, or use Python to help with this.
