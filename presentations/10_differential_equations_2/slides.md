---
theme: oxrse
title: Differential equations 2
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

# Why form differential equations from words?

In practice, nobody hands us the differential equation: we have a description of what makes a quantity change (e.g. a leaf gains water from its plant and loses it by evaporation).

Turning that description into an equation is the first step in building a model, and once we have the equation we can solve it, by hand or numerically.

In this lecture we form differential equations from words, solve them with the methods of lecture 9 and partial fractions, and meet our first second order equations.

---

# What does "proportional to" mean?

$y$ is **proportional to** $x$ if $y = kx$ for some constant $k$, called the _constant of proportionality_.
We write $y \propto x$.

<v-click>

e.g. if a leaf absorbs water at a rate proportional to its length $y$, then the rate is $k_1y$, for some constant $k_1$.

</v-click>

<v-click>

A quantity can also be proportional to a power of another, e.g. the area of a circle is proportional to the square of its radius: $A = \pi r^2$, so $A \propto r^2$.

</v-click>

<v-click>

If $y \propto w$, then their rates of change are proportional too:

$$y = kw \qquad\Rightarrow\qquad \frac{dy}{dt} = k\frac{dw}{dt}$$

</v-click>

---
layout: exercise
---

# Example 1: a growing leaf

The length $y$ cm of a leaf during the period of its growth is proportional to the amount of water it contains.
During this period the leaf retains a similar shape: that is, the ratio of its length to its width remains constant.
The leaf absorbs water from its plant at a rate proportional to $y$ and it loses water by evaporation at a rate proportional to the area of the leaf at the time when its length is $y$ cm.

Form a differential equation to describe the growth of the leaf.

::work::

---

# A growing leaf: forming the equation

<v-clicks at="+0">

1. Assume the length of the leaf is $y$ cm at time $t$ days after it was first observed.
2. Let the rate the leaf receives water be $k_1y$ where $k_1$ is a positive constant.
3. Area of leaf at time $t$ days is proportional to $y^2$ since it maintains its shape, so the leaf is losing water at a rate of $k_2y^2$ where $k_2$ is another positive constant.
4. The length is proportional to the amount of water, so the rate of growth, $dy/dt$, is proportional to the rate at which the leaf gains water, less the rate at which it loses it.

</v-clicks>

<v-click>

$$\frac{dy}{dt}=k_1y-k_2y^2=y(k_1-k_2y)$$

</v-click>

---
layout: exercise
---

# Example 2: solid tumour growth

An avascular tumour tends to grow in a spherical shape, depending on environmental restrictions.

Assuming that the growth rate of the tumour depends only on the availability of oxygen and nutrients, which enter the tumour solely by diffusing through its surface, derive a model for the change in tumour volume over time.

::work::

---

# Solid tumour growth: forming the equation

<v-clicks at="+0">

1. Denote the volume of the tumour at time $t$ by $V(t)$, and its radius by $R(t)$.
2. Since the tumour is a sphere, its volume $V$ is proportional to $R^3$ and its surface area to $R^2$, so the surface area is proportional to $V^{2/3}$.
3. The rate at which the tumour acquires nutrients, and hence the rate at which the volume increases, is thus proportional to $V^{2/3}$.

</v-clicks>

<v-click>

This gives us the equation:

$$\frac{dV}{dt} = kV^{2/3}$$

</v-click>

---

# Solid tumour growth: solution

$$\frac{dV}{dt} = kV^{2/3}$$

<v-click>

Solve by separation of variables:

$$ {1|1-2|1-3}
\begin{aligned}
\int V^{-2/3}\,dV &= \int k\,dt \\
3V^{1/3} &= kt + c \\
V &= \left(\frac{kt+c}{3}\right)^3
\end{aligned}
$$

</v-click>

<v-click>

where $c$ is a constant of integration, the value of which will depend upon the initial conditions.
If the volume at $t=0$ is $V_0$, then $c = 3V_0^{1/3}$.

</v-click>

---

# Solid tumour growth: solution

<PlotFigure name="tumour-volume" />

---

# The leaf equation: partial fractions

Let's return to, and solve, our leaf example:

$$\frac{dy}{dt}=k_1y-k_2y^2=y(k_1-k_2y)$$

<v-click>

This is a separable differential equation:

$$\int \frac{dy}{y(k_1-k_2y)} =\int dt.$$

</v-click>

<v-click>

To integrate the left-hand side, we split it into **partial fractions**, as in lecture 7:

$$\frac{1}{y(k_1-k_2y)}=\frac{A}{y}+\frac{B}{k_1-k_2y}$$

</v-click>

---

# The leaf equation: partial fractions

Multiply both sides by $y(k_1-k_2y)$ to get:

$$A(k_1-k_2y)+By=1 \qquad\text{so}\qquad Ak_1 + (B - Ak_2)y = 1$$

<v-click>

Equate the constant terms (coefficients of $y^0$):

$$Ak_1 = 1 \qquad\text{so}\qquad A=\frac{1}{k_1}$$

</v-click>

<v-click>

Equate coefficients of $y$:

$$B - Ak_2 = 0 \qquad\text{so}\qquad B=\frac{k_2}{k_1}$$

</v-click>

---

# The leaf equation: checking with SymPy

```python
y, k1, k2 = sp.symbols('y k_1 k_2')
sp.apart(1 / (y*(k1 - k2*y)), y)
```

$$- \frac{k_{2}}{k_{1} \left(- k_{1} + k_{2} y\right)} + \frac{1}{k_{1} y}$$

<v-click>

which agrees: $A=1/k_1$ and $B=k_2/k_1$.

</v-click>

---

# The leaf equation: integrating

$$\int \frac{dy}{y(k_1-k_2y)}=\int \frac{dy}{k_1y}+ \int \frac{k_2}{k_1(k_1-k_2y)}\,dy =\int dt$$

<v-click>

While the leaf is growing, $0 < y < k_1/k_2$, so both logarithms are of positive numbers:

$$\frac{1}{k_1}\ln y-\frac{1}{k_1}\ln(k_1-k_2y)=t + c$$

</v-click>

<v-click>

Try doing the algebraic manipulation of this to make $y$ the subject of the equation:

$$y=\frac{k_1 e^{k_1t+d}}{1+ k_2 e^{k_1t + d}}$$

where $d$ is a constant, which we can get from the initial condition.

</v-click>

<v-click>

This is the logistic equation from lecture 3, and we will meet it again in lecture 11.

</v-click>

---
layout: two-cols
---

# The leaf equation: checking with SciPy

```python
from scipy.integrate import solve_ivp

k1 = 1.0
k2 = 0.5
y0 = 0.1
t = np.linspace(0, 10, 100)
d = np.log(y0 / (k1 - k2*y0))
y_exact = (k1*np.exp(k1*t + d)
           / (1 + k2*np.exp(k1*t + d)))

def dydt(t, y):
    return k1*y - k2*y**2

solution = solve_ivp(dydt, [0, 10], [y0],
                     t_eval=t)
y_numerical = solution.y[0]
```

::right::

<PlotFigure v-click name="leaf-growth" />

---

# Second order differential equations

The **order** of a differential equation is the order of the highest derivative in it.

<v-click>

Example 3: solve the second order equation

$$\frac{d^2y}{dx^2} = \left(\frac{dy}{dx}\right)^2$$

</v-click>

<v-click>

We will use the substitution $z = dy/dx$.
This implies that

$$\frac{dz}{dx} = \frac{d^2y}{dx^2}.$$

</v-click>

---

# Second order differential equations

Substituting into the original equation, to eliminate $y$, gives

$$\frac{dz}{dx} = z^2$$

<v-click>

This is a separable equation:

$$\int z^{-2}\,dz = \int dx \qquad\Rightarrow\qquad -\frac{1}{z} = x + A \qquad\Rightarrow\qquad z = -\frac{1}{x+A}$$

where $A$ is an arbitrary constant.

</v-click>

---

# Second order differential equations

We can then replace $z$ using the original substitution to obtain a first order differential equation:

$$\frac{dy}{dx} = -\frac{1}{x+A}$$

<v-click>

This equation can be solved with a standard integral:

$$y = -\ln(x+A) + B$$

</v-click>

<v-click>

How do we determine $A$ and $B$?
There are two constants, so we need two pieces of information.

</v-click>

---

# Second order differential equations: case 1

Maybe we know that at $x=0$, $dy/dx = -1$ and $y=0$.

<v-click>

Substitute the first condition into $dy/dx = -1/(x+A)$:

$$-1 = -\frac{1}{0+A} \qquad\text{so}\qquad A=1$$

</v-click>

<v-click>

Then substitute $A=1$ and the second condition into $y = -\ln(x+A) + B$:

$$0 = -\ln 1 + B \qquad\text{so}\qquad B=0$$

</v-click>

<v-click>

So the solution is $y = -\ln(x+1)$.

</v-click>

---

# Second order differential equations: case 2

Maybe instead we know that $y(0)=0$ and $y(e-1)=-1$: two values of $y$, and no value of $dy/dx$.

<v-click>

This time both conditions go into the solution $y = -\ln(x+A) + B$.
The first, $y(0)=0$, gives:

$$0 = -\ln A + B \qquad\text{so}\qquad B=\ln A$$

</v-click>

<v-click>

Then substitute $B = \ln A$ and the second condition, $y(e-1)=-1$:

$$-1 = -\ln(e-1+A) + \ln A = \ln\left(\frac{A}{e-1+A}\right)$$

</v-click>

---

# Second order differential equations: case 2

We had

$$-1 = \ln\left(\frac{A}{e-1+A}\right)$$

<v-click>

Take the exponential of both sides, and solve for $A$:

$$ {1|1-2|1-3|1-4}
\begin{aligned}
e^{-1} &= \frac{A}{e-1+A} \\
e-1+A &= eA \\
e-1 &= (e-1)A \\
A &= 1
\end{aligned}
$$

</v-click>

<v-click>

So $B = \ln 1 = 0$, and $y = -\ln(x+1)$: the same solution as in case 1.

</v-click>
