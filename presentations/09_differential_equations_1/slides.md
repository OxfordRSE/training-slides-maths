---
theme: oxrse
title: Differential equations 1
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

# What is a differential equation?

If $y$ is a variable that depends on the variable $x$, then a **differential equation in $x$ and $y$** is one that relates $dy/dx$ to $x$, to $y$, or to both.

We write

$$\frac{dy}{dx}=f(x,y).$$

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

The general solution to this equation is

$$y + A = \int x^3 + 5x^2 + 1\,dx = \frac{1}{4}x^4 + \frac{5}{3}x^3 + x + B$$

where $A$ and $B$ are a arbitrary constants.

If we are given the **initial conditions**, say, $y=0$ when $x=0$ (often written as $y(0)=0$), we can determine the value for the constants; in this example $A=B$.

---

# Separation of variables: example 1

This approach can be generalised into what is known as the **separation of variables method**.

$$\frac{dy}{dx} = 2x + c$$

The equation is already separated, with all terms in $y$ (just the derivative in this case) on the left, and terms involving $x$ on the right.

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

# Separation of variables: initial conditions

$$y = x^2 + cx + A$$

If we are told that $y(1) = c$, can we calculate $A$?

<v-click>

We have that

$$y = x^2 + cx + A\qquad\text{with}\qquad y(1) = c$$

so:

$$
\begin{aligned}
c &= 1^2 + c\cdot 1 + A \\
A &= -1
\end{aligned}
$$

Is this right?

</v-click>

---
layout: two-cols
---

# Separation of variables: checking numerically

```python
c = 1.0
A = -1.0
x0 = 1.0
x1 = 10.0
x = np.linspace(x0,x1,100)
y_exact = x**2 + c*x + A

def dydx(y, x):
    return 2*x + c

y_numerical = scipy.integrate.odeint(dydx, c, x)
```

::right::

<PlotFigure name="example-1-check" />

---

# Separation of variables: example 2

$$\frac{dy}{dx} = 5 x^{\frac{3}{2}} y$$

Separate the variables so that all the terms in $x$ are on one side of the equation and all the terms in $y$ are on the other side:

$$\frac{1}{y}\frac{dy}{dx} = 5 x^{\frac{3}{2}}$$

<v-click>

Integrating both sides with respect to $x$:

$$\int \frac{1}{y}\frac{dy}{dx}\, dx = \int 5x^{\frac{3}{2}}\,dx \quad \Rightarrow\quad \int \frac{1}{y}\,dy = \int 5x^{\frac{3}{2}}\, dx$$

</v-click>

---

# Separation of variables: example 2

Now integrate on each side:

$$\ln y + A = \frac{5x^{\frac{5}{2}}}{5/2} + B = 2x^{\frac{5}{2}} + B$$

<v-click>

So:

$$\ln y = 2x^{\frac{5}{2}} + C \qquad \text{where} \qquad C=B-A$$

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

Now integrate by parts, $\Big(\int uv'\,dx = [uv]-\int u'v\,dx\Big)$, with $u=x$ and $v'=e^{-x}$:

$$ {1|1-2|1-3|1-4}
\begin{aligned}
\frac{y^2}{2} + c_1 &= -x e ^{-x} + \int e ^{-x}\,dx \\
&= -x e ^{-x} - e ^{-x} + c_2 \\
y^2 &= -2 e ^{-x}(1+x) + c_3 \\
y &= \pm\sqrt{-2 e^{-x} (1+x) + c_3}
\end{aligned}
$$

---

# Separation of variables: example 3

Let's check this answer: $y = \pm\sqrt{-2 e^{-x} (1+x) + c_3}$.

Substitute in initial conditions $y(0) = 0$ gives $c_3 = 2$

---
layout: two-cols
---

# Separation of variables: checking numerically

```python
c3 = 2.0
x0 = 0.0
x1 = 1.0
x = np.linspace(x0,x1,100)

y_exact = np.sqrt(-2*np.exp(-x)*(1 + x) + c3)

def dydx(y, x):
    return np.exp(-x) * x / y

# why 1e-8 instead of zero?
y_numerical = scipy.integrate.odeint(dydx, 1e-8, x)
```

::right::

<PlotFigure name="example-3-check" />

---

# Example 1: biochemistry

The Michaelis-Menten equation relates the rate of an enzyme reaction to its substrate concentration, and has the form (if there is a large quantity of enzyme):

$$\frac{ds}{dt}=-\frac{V.s}{K+s}$$

where $s=[S]$ is the substrate concentration, and $V$ and $K$ are constants.
By integration, we will derive expressions relating substrate concentration to time when

1. when $s\gg K$
2. when $s\ll K$

and sketch the graphs of $s$ against $t$ in each case.

---

# Biochemistry: case 1

When $s\gg K$, $K$ in the differential equation's denominator can be neglected:

$$\frac{ds}{dt} \approx -\frac{V.s}{s} = -V$$

The rate of change in concentration is a constant, so this is a **zeroth order process**.

We can integrate directly to obtain

$$s = \int -V\,dt = -Vt + c$$

where $c$ is a constant of integration.

If $s(0)=s_0$, then $c=s_0$.

The graph thus has slope $-V$ and crosses the vertical axis at $s=s_0$.

---

# Biochemistry: case 2

When $s\ll K$, $s$ in the differential equation's denominator can be neglected:

$$\frac{ds}{dt} = -\frac{V.s}{K+s}\quad\text{becomes:}\quad\frac{ds}{dt} = -\frac{V.s}{K}$$

The rate of change in concentration depends on the concentration, so this is a **first order process**.

$$ {1|1-2|1-3}
\begin{aligned}
\int \frac{1}{s}\,ds &= -\int \frac{V}{K}\,dt \\
\Rightarrow\quad\ln s &= -\frac{V}{K}t + D\qquad\text{D is a constant} \\
\Rightarrow\quad s &= Be^{-V t/K}\qquad\text{B is a constant}
\end{aligned}
$$

On a graph $s$ crosses the vertical axis at $s=B$ and decreases with time exponentially.

---

# Biochemistry: solving numerically

Lets look at this numerically using the original equation:

$$\frac{ds}{dt}=-\frac{V.s}{K+s}$$

<PlotFigure name="michaelis-menten" :height="300" />

---

# Example 2: bacterial growth

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

We can solve this to obtain $\ln N = kt + c$. Using the $t=0$ condition, we have that $\ln N_0 = c$, so

$$\ln\frac{N}{N_0} = kt$$

We can use the data from $t=10$ to find $k$:

$$\ln\frac{3N_0}{N_0} = k 10 \qquad\Rightarrow\qquad k=\frac{\ln 3}{10}=0.11\text{ hr}^{-1}$$

To find $t$ when $N=11N_0$:

$$\ln\frac{11N_0}{N_0} = 0.11 t \qquad\Rightarrow\qquad t=\frac{\ln 11}{0.11}=21.8\text{ hours.}$$

---

# Example 3: radioactive decay

The rate at which a sample decays is proportional to the amount left, i.e.

$$\frac{dN}{dt} = -\lambda N$$

where $N$ is the mass of radioactive atoms at time $t$ and $\lambda$ is called the _decay constant_.

The element radium (atomic mass=226) has a decay constant of $13.6 \times 10^{-12}$ s$^{-1}$.

---

# Radioactive decay: solution

Solving the differential equation via separation of variables, we obtain the general solution

$$N = Be^{-\lambda t} \qquad \text{(1)}$$

Consider an arbitrary initial condition: at $t=t_0$, $N=N_0$. Then:

$$N_0 = Be^{-\lambda t_0} \qquad\Rightarrow\qquad B = N_0 e^{\lambda t_0}$$

Substituting in (1) gives the solution

$$N = N_0 e^{-\lambda(t-t_0)} \qquad \text{(2)}$$

---

# Radioactive decay: half-life

The **half-life**, $t_{1/2}$, is the time taken for $N$ to reduce by half.

Putting $N=N_0/2$ and $t=t_0+t_{1/2}$ in (2) we get

$$
\begin{aligned}
\ln \frac{N_0}{2N_0} &= -\lambda t_{1/2} \\
t_{1/2} &= \frac{\ln 2}{\lambda} \approx \frac{0.693}{\lambda}
\end{aligned}
$$

Note that this time is **independent** of the initial value $N_0$,

The half-life for radium is thus

$$t_{1/2}=\frac{\ln2}{13.6\times10^{-12}}=5.10\times10^{10}\,s,$$

or about 1600 years.

---

# Example 4: more biochemistry

The power to which the concentration of a species is raised in a rate law is the **order** of the process/reaction with respect to that species.
A reaction with the rate law

$$\frac{dX}{dt} = k_2\,[A]\,[B]$$

is first order in $A$ and first order in $B$.

The **overall order** of a process/reaction is the sum of the orders of all the components. This rate law is thus second-order overall.

Note that this is **different** from the order of an ODE, which is given by the highest derivative.
Both zeroth and first order _processes_ are modelled below by _first order differential equations_.

---

# Zeroth order processes

- rate of change is **independent** of concentration, i.e. the rate of change is proportional to concentration raised to power zero

$$
\begin{aligned}
\frac{dA}{dt} &= k \quad \text{(growth)} \\
\frac{dA}{dt} &= -k\quad \text{(decay)}
\end{aligned}
$$

General solutions:

$$
\begin{aligned}
A &= A_0 + k(t-t_0) \\
A &= A_0 - k(t-t_0)
\end{aligned}
$$

---

# First order processes

- rate of change depends on the concentration of one species, i.e. the rate of change is proportional to concentration raised to first power.
- Half-life is a constant, i.e. is INDEPENDENT of the amount there at the beginning.

$$
\begin{aligned}
\frac{dA}{dt} &= kA\quad\text{growth} \\
\frac{dA}{dt} &= -kA\quad\text{decay}
\end{aligned}
$$

General solutions:

$$
\begin{aligned}
A &= A_0 e^{k(t-t_0)} \\
A &= A_0 e^{-k(t-t_0)}
\end{aligned}
$$

---

# First order processes

<PlotFigure name="first-order" />
