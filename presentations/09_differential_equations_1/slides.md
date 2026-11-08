---
theme: oxrse
title: Differential equations 1
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

# Why differential equations?

Many models in biology say how quickly something changes (e.g. a colony grows at a rate proportional to its size).

Such a model is a _differential equation_, and solving it tells us how the quantity itself changes over time.

In this lecture we solve the simplest differential equations by integration, and check our solutions numerically with Python.

---

# What is a differential equation?

If $y$ is a variable that depends on the variable $x$, then a **differential equation in $x$ and $y$** is one that relates $dy/dx$ to $x$, to $y$, or to both.

<v-click>

We write

$$\frac{dy}{dx}=f(x,y).$$

</v-click>

---

# Solving a differential equation

The simplest differential equations are very similar to integration.

$$\frac{dy}{dx} = x^3 + 5x^2 + 1$$

<v-click>

Put all the terms in $y$ (just the derivative in this case) on the left, and all the terms involving $x$ on the right.

$$dy = (x^3 + 5x^2 + 1) \,dx$$

</v-click>

<v-click>

Then we integrate both sides

$$\int dy = \int (x^3 + 5x^2 + 1) \,dx$$

</v-click>

---

# Solving a differential equation

The **general solution** to this equation is

$$y + A = \int (x^3 + 5x^2 + 1)\,dx = \frac{1}{4}x^4 + \frac{5}{3}x^3 + x + B$$

where $A$ and $B$ are arbitrary constants.

<v-click>

If we are given the **initial conditions**, say, $y=0$ when $x=0$ (often written as $y(0)=0$), we can determine the value for the constants.
In this example $A=B$.

</v-click>

---

# Separation of variables: example 1

This approach can be generalised into what is known as the **separation of variables method**.

$$\frac{dy}{dx} = 2x + c$$

<v-click>

The equation is already separated, with all terms in $y$ (just the derivative in this case) on the left, and terms involving $x$ on the right.

</v-click>

<v-click>

We then integrate both sides with respect to $x$:

$$ {1|1-2|1-3}
\begin{aligned}
\int \frac{dy}{dx}\,dx &= \int (2x + c)\, dx \\
y + k_1 &= x^2 + cx + k_2 \\
y &= x^2 + cx + A\qquad\text{with}\qquad A=k_2-k_1
\end{aligned}
$$

</v-click>

---
layout: exercise
---

# Separation of variables: initial conditions

$$y = x^2 + cx + A$$

If we are told that $y(1) = c$, can we calculate $A$?

---

# Initial conditions: solution

We have that

$$y = x^2 + cx + A\qquad\text{with}\qquad y(1) = c$$

<v-click>

so:

$$ {1|1-2}
\begin{aligned}
c &= 1^2 + c\cdot 1 + A \\
A &= -1
\end{aligned}
$$

</v-click>

<v-click>

Is this right?
We can check by solving the differential equation numerically.

</v-click>

---

# Euler's method

At the start, $x_0$, we know $y_0$, and the differential equation gives us the gradient there, $f(x_0, y_0)$.

<v-click>

Take a small step $h$ along the tangent:

$$x_1 = x_0 + h \qquad\qquad y_1 = y_0 + h\,f(x_0, y_0)$$

</v-click>

<v-click>

Then repeat from the new point, and so on:

$$y_{n+1} = y_n + h\,f(x_n, y_n)$$

</v-click>

<v-click>

Each step follows the tangent, so the answer drifts away from the true solution where the curve bends.
So, the smaller the step, the more accurate the answer (but the more steps we need).

</v-click>

---

# Euler's method in Python

```python
c = 1.0

def dydx(x, y):
    return 2*x + c

def euler(dydx, x0, y0, x1, h):
    n = round((x1 - x0) / h)  # number of steps
    x = x0 + h * np.arange(n + 1)
    y = np.zeros(n + 1)
    y[0] = y0
    for i in range(n):
        y[i + 1] = y[i] + h * dydx(x[i], y[i])
    return x, y
```

---

# Euler's method: smaller steps

We solve example 1 from $x = 1$ to $x = 10$, with smaller and smaller steps:

```python
for h in [1.0, 0.1, 0.01]:
    x, y = euler(dydx, 1.0, c, 10.0, h)
    print(f'h = {h}: y(10) is about {y[-1]:.2f}')
```

<v-click>

```text
h = 1.0: y(10) is about 100.00
h = 0.1: y(10) is about 108.10
h = 0.01: y(10) is about 108.91
```

</v-click>

<v-click>

The exact value is $y(10) = 10^2 + 10 - 1 = 109$, so a step 10 times smaller makes the error about 10 times smaller.

</v-click>

---

# Euler's method: the step size

<PlotFigure name="euler" />

---

# Solving numerically in practice

Euler's method needs very small steps to be accurate.

<v-click>

In practice we use more sophisticated methods, such as SciPy's `solve_ivp`, which take better steps and choose the step size for us.

</v-click>

<v-click>

`solve_ivp` takes a function of the independent variable and $y$ (in that order), the interval, and the initial value.
It returns the solution at the points we ask for with `t_eval`.

</v-click>

---
layout: two-cols
---

# Checking example 1 with SciPy

```python
from scipy.integrate import solve_ivp

c = 1.0
A = -1.0
x0 = 1.0
x1 = 10.0
x = np.linspace(x0, x1, 100)
y_exact = x**2 + c*x + A

def dydx(x, y):
    return 2*x + c

solution = solve_ivp(dydx, [x0, x1], [c],
                     t_eval=x)
y_numerical = solution.y[0]
```

::right::

<PlotFigure v-click name="example-1-check" />

---

# Separation of variables: example 2

$$\frac{dy}{dx} = 5 x^{\frac{3}{2}} y$$

<v-click>

Separate the variables so that all the terms in $x$ are on one side of the equation and all the terms in $y$ are on the other side:

$$\frac{1}{y}\frac{dy}{dx} = 5 x^{\frac{3}{2}}$$

</v-click>

<v-click>

Integrating both sides with respect to $x$:

$$\int \frac{1}{y}\frac{dy}{dx}\, dx = \int 5x^{\frac{3}{2}}\,dx \quad \Rightarrow\quad \int \frac{1}{y}\,dy = \int 5x^{\frac{3}{2}}\, dx$$

</v-click>

---

# Aside: why we can separate the variables

Suppose $dy/dx = f(x)\,g(y)$.
Divide by $g(y)$, and integrate both sides with respect to $x$:

$$\int \frac{1}{g(y)}\frac{dy}{dx}\,dx = \int f(x)\,dx$$

<v-click>

If $H$ is an antiderivative of $1/g$, so that $H'(y) = 1/g(y)$, then by the chain rule

$$\frac{d}{dx}H(y) = H'(y)\frac{dy}{dx} = \frac{1}{g(y)}\frac{dy}{dx}$$

</v-click>

<v-click>

So the left-hand side is just $H(y) + C$, i.e. the integral of $1/g(y)$ with respect to $y$ (this is integration by substitution):

$$\int \frac{1}{g(y)}\,dy = \int f(x)\,dx$$

</v-click>

<v-click>

This means that we can treat $dy/dx$ as if it were a fraction, and the chain rule makes sure we get the right answer.

</v-click>

---

# Separation of variables: example 2

Now integrate on each side:

$$\ln|y| + A = \frac{5x^{\frac{5}{2}}}{5/2} + B = 2x^{\frac{5}{2}} + B$$

<v-click>

So:

$$\ln|y| = 2x^{\frac{5}{2}} + C \qquad \text{where} \qquad C=B-A$$

</v-click>

<v-click>

Taking the exponential of both sides:

$$y = De^{2x^{\frac{5}{2}}} \qquad \text{where} \qquad D=\pm e^C$$

</v-click>

---

# Separation of variables: example 3

$$e^x \frac{dy}{dx} = \frac{x}{y}$$

<v-click>

Rearrange to get:

$$\int y\,dy = \int x e^{-x}\,dx$$

</v-click>

---

# Separation of variables: example 3

We have

$$\int y\,dy = \int x e^{-x}\,dx$$

<v-click>

Now integrate by parts, $\Big(\int uv'\,dx = [uv]-\int u'v\,dx\Big)$, with $u=x$ and $v'=e^{-x}$:

$$ {1|1-2|1-3|1-4}
\begin{aligned}
\frac{y^2}{2} + c_1 &= -x e ^{-x} + \int e ^{-x}\,dx \\
&= -x e ^{-x} - e ^{-x} + c_2 \\
y^2 &= -2 e ^{-x}(1+x) + c_3 \\
y &= \pm\sqrt{-2 e^{-x} (1+x) + c_3}
\end{aligned}
$$

</v-click>

---

# Separation of variables: example 3

Let's check this answer: $y = \pm\sqrt{-2 e^{-x} (1+x) + c_3}$.

<v-click>

Substituting the initial condition $y(0) = 0$ gives $0 = -2 + c_3$, so $c_3 = 2$ and

$$y = \pm\sqrt{2 - 2 e^{-x} (1+x)}$$

</v-click>

---
layout: two-cols
---

# Checking example 3 with SciPy

```python
c3 = 2.0
x0 = 0.0
x1 = 1.0
x = np.linspace(x0, x1, 100)

y_exact = np.sqrt(-2*np.exp(-x)*(1 + x) + c3)

def dydx(x, y):
    return np.exp(-x) * x / y

# why 1e-8 instead of zero?
solution = solve_ivp(dydx, [x0, x1], [1e-8],
                     t_eval=x, rtol=1e-8)
y_numerical = solution.y[0]
```

::right::

<PlotFigure v-click name="example-3-check" />

<!--
Why 1e-8: dydx divides by y, so it is undefined at y = 0, and solve_ivp cannot start there. Starting just above zero avoids this. rtol asks for a more accurate solution than the default.
-->

---
layout: exercise
---

# Application: bacterial growth

Suppose the growth rate of a bacterial colony is proportional to its size, and that we observe that the colony triples in size after 10 hours.
How long will it take to reach 11 times its original size?

Let $N$ represent the number of bacteria, and suppose there are $N_0$ at time $t=0$.

<v-click>

We are given that when $t=10$ hours, $N=3N_0$, and need to find the time at which $N=11N_0$.
The equation of growth is:

$$\frac{dN}{dt} = kN$$

</v-click>

---

# Bacterial growth: solution

We can solve this to obtain $\ln N = kt + c$.
Using the $t=0$ condition, we have that $\ln N_0 = c$, so

$$\ln\frac{N}{N_0} = kt$$

<v-click>

We can use the data from $t=10$ to find $k$:

$$\ln\frac{3N_0}{N_0} = 10k \qquad\Rightarrow\qquad k=\frac{\ln 3}{10}\approx 0.11\text{ hr}^{-1}$$

</v-click>

<v-click>

To find $t$ when $N=11N_0$:

$$\ln\frac{11N_0}{N_0} = kt \qquad\Rightarrow\qquad t=\frac{\ln 11}{k} = \frac{10\ln 11}{\ln 3}\approx 21.8\text{ hours}$$

</v-click>

---

# Application: radioactive decay

The rate at which a sample decays is proportional to the amount left, i.e.

$$\frac{dN}{dt} = -\lambda N$$

where $N$ is the mass of radioactive atoms at time $t$ and $\lambda$ is called the _decay constant_.

<v-click>

The element radium (atomic mass 226) has a decay constant of $13.6 \times 10^{-12}\text{ s}^{-1}$.

</v-click>

---

# Radioactive decay: solution

Solving the differential equation via separation of variables, we obtain the general solution

$$N = Be^{-\lambda t} \qquad \text{(1)}$$

<v-click>

Consider an arbitrary initial condition: at $t=t_0$, $N=N_0$.
Then:

$$N_0 = Be^{-\lambda t_0} \qquad\Rightarrow\qquad B = N_0 e^{\lambda t_0}$$

</v-click>

<v-click>

Substituting in (1) gives the solution

$$N = N_0 e^{-\lambda(t-t_0)} \qquad \text{(2)}$$

</v-click>

---

# Radioactive decay: half-life

The **half-life**, $t_{1/2}$, is the time taken for $N$ to reduce by half.

<v-click>

Putting $N=N_0/2$ and $t=t_0+t_{1/2}$ in (2) we get

$$ {1|1-2|1-3}
\begin{aligned}
\frac{N_0}{2} &= N_0 e^{-\lambda t_{1/2}} \\
\ln \frac{1}{2} &= -\lambda t_{1/2} \\
t_{1/2} &= \frac{\ln 2}{\lambda} \approx \frac{0.693}{\lambda}
\end{aligned}
$$

</v-click>

<v-click>

Note that this time is **independent** of the initial value $N_0$.

</v-click>

<v-click>

The half-life for radium is thus

$$t_{1/2}=\frac{\ln2}{13.6\times10^{-12}}\approx 5.10\times10^{10}\text{ s},$$

or about 1600 years.

</v-click>

---

# Order of a reaction

The power to which the concentration of a species is raised in a rate law is the **order** of the process/reaction with respect to that species.

<v-click>

A reaction with the rate law

$$\frac{dX}{dt} = k_2\,[A]\,[B]$$

is first order in $A$ and first order in $B$.

</v-click>

<v-click>

The **overall order** of a process/reaction is the sum of the orders of all the components.
This rate law is thus second order overall.

</v-click>

<v-click>

Note that this is **different** from the order of a differential equation, which is given by the highest derivative.
Both zeroth and first order _processes_ are modelled below by _first order differential equations_.

</v-click>

---

# Zeroth order processes

The rate of change is **independent** of concentration, i.e. the rate of change is proportional to concentration raised to power zero.

<v-click>

$$
\begin{aligned}
\frac{dA}{dt} &= k \quad \text{(growth)} \\
\frac{dA}{dt} &= -k\quad \text{(decay)}
\end{aligned}
$$

</v-click>

<v-click>

General solutions:

$$
\begin{aligned}
A &= A_0 + k(t-t_0) \\
A &= A_0 - k(t-t_0)
\end{aligned}
$$

</v-click>

---

# First order processes

The rate of change depends on the concentration of one species, i.e. the rate of change is proportional to concentration raised to first power.

<v-click>

$$
\begin{aligned}
\frac{dA}{dt} &= kA\quad\text{(growth)} \\
\frac{dA}{dt} &= -kA\quad\text{(decay)}
\end{aligned}
$$

</v-click>

<v-click>

General solutions:

$$
\begin{aligned}
A &= A_0 e^{k(t-t_0)} \\
A &= A_0 e^{-k(t-t_0)}
\end{aligned}
$$

</v-click>

<v-click>

For decay, the half-life is a constant, i.e. it is independent of the amount there at the beginning.

</v-click>

---

# First order processes

<PlotFigure name="first-order" />

---

# Application: enzyme kinetics

In lecture 1 we met the Michaelis-Menten equation for the rate of an enzyme reaction.
The rate is how quickly the substrate is used up, so

$$\frac{ds}{dt}=-\frac{V_{\max}s}{K_m+s}$$

where $s=[S]$ is the substrate concentration, and $V_{\max}$ and $K_m$ are constants.

<v-click>

By integration, we will derive expressions relating substrate concentration to time

1. when $s\gg K_m$
2. when $s\ll K_m$

and sketch the graphs of $s$ against $t$ in each case.

</v-click>

---

# Michaelis-Menten: large s

When $s\gg K_m$, $K_m$ in the differential equation's denominator can be neglected:

$$\frac{ds}{dt} \approx -\frac{V_{\max}s}{s} = -V_{\max}$$

<v-click>

The rate of change in concentration is a constant, so this is a **zeroth order process**.

</v-click>

<v-click>

We can integrate directly to obtain

$$s = \int -V_{\max}\,dt = -V_{\max}t + c$$

where $c$ is a constant of integration.

</v-click>

<v-click>

If $s(0)=s_0$, then $c=s_0$.
The graph thus has slope $-V_{\max}$ and crosses the vertical axis at $s=s_0$.

</v-click>

---

# Michaelis-Menten: small s

When $s\ll K_m$, $s$ in the differential equation's denominator can be neglected:

$$\frac{ds}{dt} \approx -\frac{V_{\max}s}{K_m}$$

<v-click>

The rate of change in concentration depends on the concentration, so this is a **first order process**.

</v-click>

<v-click>

$$ {1|1-2|1-3}
\begin{aligned}
\int \frac{1}{s}\,ds &= -\int \frac{V_{\max}}{K_m}\,dt \\
\ln s &= -\frac{V_{\max}}{K_m}t + D\qquad\text{where } D \text{ is a constant} \\
s &= Be^{-V_{\max}t/K_m}\qquad\text{where } B = e^D
\end{aligned}
$$

</v-click>

<v-click>

On a graph $s$ crosses the vertical axis at $s=B$ and decreases with time exponentially.

</v-click>

---

# Michaelis-Menten: solving numerically

Let's look at this numerically using the original equation, with $V_{\max} = 1$ and $s(0) = 1$:

$$\frac{ds}{dt}=-\frac{V_{\max}s}{K_m+s}$$

<PlotFigure name="michaelis-menten" :height="300" />
