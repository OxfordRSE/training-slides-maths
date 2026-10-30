---
theme: oxrse
title: Differential equations 2
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

# Forming a differential equation from words

The length $y$ cm of a leaf during the period of its growth is proportional to the amount of water it contains.
During this period the leaf retains a similar shape: that is, the ratio of its length to its width remains constant.
The leaf absorbs water from its plant at a rate proportional to $y$ and it loses water by evaporation at a rate proportional to the area of the leaf at the time when its length is $y$ cm.

- Form a differential equation to describe the growth of the leaf.

---

# Forming a differential equation from words

<v-clicks>

1. Assume the length of the leaf is $y$ cm at time $t$ days after it was first observed.
2. Let the rate the leaf receives water be $k_1y$ where $k_1$ is a positive constant.
3. Area of leaf at time $t$ days is proportional to $y^2$ since it maintains its shape, so the leaf is losing water at a rate of $k_2y^2$ where $k_2$ is another positive constant.
4. Rate of growth is given by $dy/dt$, which is the rate of change of its length.

</v-clicks>

<v-click>

$$\frac{dy}{dt}=k_1y-k_2y^2=y(k_1-k_2y)$$

</v-click>

---
layout: two-cols
---

# The leaf: solving numerically

```python
x = np.linspace(0,10,100)
def dydt(y,t):
    return k1*y - k2*y**2
y = scipy.integrate.odeint(dydt,0.1,x)
```

::right::

<PlotFigure name="leaf-growth" />

---

# Example 2: solid tumour growth

An avascular tumour tends to grow in a spherical shape, depending on environmental restrictions.

Assuming that the growth rate of the tumour depends only on the availability of oxygen and nutrients, which enter the tumour solely by diffusing through its surface, derive a model for the change in tumour volume over time.

---

# Solid tumour growth

<v-clicks>

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

Solve by separation of variables:

$$
\begin{aligned}
\int V^{-2/3}\,dV &= \int k\,dt \\
V &= \left(\frac{kt+c}{3}\right)^3
\end{aligned}
$$

where $c$ is a constant of integration, the value of which will depend upon the initial conditions.

---

# Solid tumour growth: solution

<PlotFigure name="tumour-volume" />

---

# Second order differential equations

**Example: solve**

$$\frac{d^2y}{dx^2} = \left(\frac{dy}{dx}\right)^2$$

<v-click>

We will use the substitution

$$z = \frac{dy}{dx}.$$

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

$$\frac{dy}{dx} = -\frac{1}{x+A} \qquad \text{(9)}$$

<v-click>

This equation can be solved with a standard integral:

$$y = -\ln(x+A) + B$$

(how do we determine $A$ and $B$?)

</v-click>

---

# Second order differential equations: example

**1.** At $x=0$, $dy/dx = -1$ and $y=0$.

<v-click>

We substitute the first condition into

$$\frac{dy}{dx} = -\frac{1}{x+A}$$

to obtain $A=1$.

</v-click>

<v-click>

Then substitute $A$ and the second condition into the eventual solution to find $B=0$.

</v-click>

---

# Second order differential equations: example

**2.** $y(0)=0$ and $y(e-1)=-1$.

<v-click>

This time both conditions can be substituted into the solution:

$$
\begin{aligned}
y(0)=0 &\Rightarrow 0=B-\ln(A) \Rightarrow B=\ln(A) \\
y(e-1)=-1 &\Rightarrow -1=\ln(A)-\ln{e-1+A} \Rightarrow A=1
\end{aligned}
$$

</v-click>

---

# More tricks to do integration

Let's return to and solve our leaf example:

$$\frac{dy}{dt}=k_1y-k_2y^2=y(k_1-k_2y)$$

<v-click>

This is a separable differential equation:

$$\int \frac{dy}{y(k_1-k_2y)} =\int dt.$$

</v-click>

<v-click>

We can split apart the integral on the RHS using **partial fractions** in SymPy. We want

$$\frac{1}{y(k_1-k_2y)}=\frac{A}{y}+\frac{B}{k_1-k_2y}$$

</v-click>

---

# More tricks to do integration

```python
y, k1, k2 = sp.symbols('y k_1 k_2')
sp.apart(1 / (y*(k1 - k2*y)),y)
```

$$- \frac{k_{2}}{k_{1} \left(- k_{1} + k_{2} y\right)} + \frac{1}{k_{1} y}$$

So $A=1/k_1$ and $B=k_2/k_1$.

<v-click>

$$\text{Thus,} \qquad \int \frac{dy}{y(k_1-k_2y)}=\int \frac{dy}{k_1y}+ \int \frac{k_2}{k_1(k_1-k_2y)}\,dy =\int dt$$

</v-click>

<v-click>

$$\text{Thus} \qquad \frac{1}{k_1}\ln y-\frac{k_2}{k_1k_2}\ln(k_1-k_2y)=t + c$$

</v-click>

---

# More tricks to do integration

We can get $c$ from initial conditions.
Try doing the algebraic manipulation of this to make $y$ the subject of the equation:

$$y=\frac{k_1\exp (k_1t+d)}{1+ k_2 \exp(k_1t + d)}$$

where $d$ is a constant.
