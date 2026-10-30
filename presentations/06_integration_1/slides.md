---
theme: oxrse
title: Integration 1
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
layout: exercise
---

# Warm-up exercise

$$\frac{d}{dx} 3x^3 =$$

$$\frac{d}{dx} \frac{4}{x^4} =$$

$$\frac{d}{dx} x^2\sin x =$$

$$\frac{d}{dt} \ln t =$$

$$\frac{d}{dt} e^{4t} =$$

---

# Integration: the area under a curve

**Calculating the area under a curve**

If we want to find the area under a curve, we can divide the area into strips, calculate the area of each strip, and sum these areas together.

e.g. find the area of

$$y = f(x) = x^2\qquad\text{between}\qquad x=1\text{ and }x=2$$

---

# Integration: one strip

<PlotFigure name="one-strip" :height="350" />

<v-click>

The area of the strip is $\delta A_i \approx y(x_i)\,\delta x$

</v-click>

---

# Integration: summing the strips

We can sum up all the strips between $x=1$ and $x=2$ to give an estimate for the total area:

$$A \approx \sum \delta A_i = \sum y(x_i)\,\delta x.$$

This becomes more accurate as $\delta x$ becomes smaller.
We can use the same trick as when differentiating: let $\delta x$ tend to $0$:

$$A = \lim_{\delta x \to 0}\sum y(x_i)\,\delta x = \int\limits^{2}_{1} y\,dx$$

$\int$ is the old English `S` and stands for the phrase "Sum Over".

This process is called **integration**.

---

# Integration: many strips

<PlotFigure name="many-strips" />

---

# Calculating the integral

Let us 'invent' a function $F(x)$ that gives the area from $0$ to $x$.
Then $A = F(2) - F(1)$.

With this (imagined) function, we can find the area of one of our tiny steps **exactly**, as

$$F(x + \delta x) - F(x)$$

Remember we approximated this as $y\,\delta x = f(x)\,\delta x$, so:

$$
\begin{aligned}
F(x + \delta x) - F(x) &\approx f(x)\delta x \\
f(x) &\approx \frac{F(x+\delta x)-F(x)}{\delta x}
\end{aligned}
$$

---

# Calculating the integral

The error in this approximation tends to $0$ as $\delta x\to 0$, so

$$f(x) = \lim_{\delta x\to 0} \frac{F(x+\delta x)-F(x)}{\delta x} = F'(x)$$

(recalling the definition of the derivative).

In other words, for our example,

$$A(x) = \int\limits^{x}_{1} y(t)\,dt\qquad\text{then}\qquad y(x) = A'(x)$$

**Integration reverses the process of differentiation**.

---

# Calculating integrals

We know that:

$$\frac{d \left(x^2\right)}{dx}= 2 x \qquad\Rightarrow\qquad \Big[x^2\Big]_{x_1}^{x_2} = \int_{x_1}^{x_2} 2 x\,dx$$

Likewise:

$$\frac{d\left(\frac{x^3}{3}\right)}{dx}= x^2 \qquad\Rightarrow\qquad \int_{x=1}^{x=2} x^2\,dx = \Big[\frac{1}{3}x^3\Big]_{x=1}^{x=2}=\frac{8}{3}-\frac{1}{3}= \frac{7}{3}$$

**In general:**

$$\frac{d\left(a\, x^{n+1}\right)}{dx}=(n+1)a\, x^n \qquad \Rightarrow \qquad \int_{x_1}^{x_2} a\, x^n\,dx = \Big[\frac{a}{n+1}\, x^{n+1}\Big]_{x_1}^{x_2}$$

---

# SymPy examples

$$\int_{x_1}^{x_2} x^6\,dx =$$

<v-click>

```python
x, x1, x2 = sp.symbols('x x_1 x_2')
sp.integrate(x**6,(x,x1,x2))
```

$$- \frac{x_{1}^{7}}{7} + \frac{x_{2}^{7}}{7}$$

</v-click>

<v-click>

$$\int_{x_1}^{x_2} x^{\frac{3}{2}}\,dx =$$

```python
sp.integrate(x**(sp.sympify(3)/2),(x,x1,x2))
```

$$- \frac{2 x_{1}^{\frac{5}{2}}}{5} + \frac{2 x_{2}^{\frac{5}{2}}}{5}$$

</v-click>

---

# SymPy examples

$$\int_{x_1}^{x_2} x^{-\frac{1}{2}}\,dx =$$

<v-click>

```python
sp.integrate(x**(-sp.sympify(1)/2),(x,x1,x2))
```

$$- 2 \sqrt{x_{1}} + 2 \sqrt{x_{2}}$$

</v-click>

---

# Indefinite integrals

Consider now the functions:

$$
\begin{aligned}
y&=x^2+7 &&\text{(3)} \\
y&=x^2-100 &&\text{(4)}
\end{aligned}
$$

Differentiating (3):

$$\frac{dy}{dx}=2x$$

Differentiating (4):

$$\frac{dy}{dx}=2x$$

---

# Indefinite integrals

This implies that the integral:

$$y=\int 2x\,dx=x^2 + \kappa \qquad \text{where } \kappa \text{ is an unknown constant}$$

An integral without limits is called an **indefinite integral**.

---

# Indefinite integrals in SymPy

```python
x = sp.symbols('x')
sp.integrate(2*x,x)
```

$$x^{2}$$

---

# Other integrals

Recall that:

$$\frac{d}{dx}\ln x=\frac{1}{x} \qquad\Rightarrow\qquad \int\frac{1}{x}\,dx=\ln x + \kappa$$

This constant $\kappa$ can be written as:

$$\kappa=\ln B$$

where $B$ is another constant. Thus:

$$\int \frac{1}{x}\,dx = \ln x + \kappa=\ln x +\ln B =\ln (B x)$$

---

# Integrating trigonometric functions

Recall that:

$$\frac{d}{dx}\Big(\sin x\Big)= \cos x \qquad\text{and}\qquad \frac{d}{dx}\Big(\cos x\Big)= -\sin x$$

Example 1:

$$\int_{0}^{\pi/2} \cos x \, dx =$$

<v-click>

```python
sp.integrate(sp.cos(x),(x,0,sp.pi/2))
```

$$1$$

</v-click>

---

# Integrating trigonometric functions

Example 2:

$$\int_{0}^{\pi/2} \sin x \, dx =$$

<v-click>

```python
sp.integrate(sp.sin(x),(x,0,sp.pi/2))
```

$$1$$

</v-click>

---

# Integrating trigonometric functions

Recall that:

$$\frac{d}{dx}\Big(\sin x\Big)= \cos x \qquad\text{and}\qquad \frac{d}{dx}\Big(\cos x\Big)= -\sin x$$

Example 1:

$$\int_{0}^{\pi/2} \cos x \, dx = \Big[\sin x \Big]_0^{\pi/2}=1-0=1$$

Example 2:

$$\int_{0}^{\pi/2} \sin x \, dx = \Big[-\cos x \Big]_0^{\pi/2}=0-(-1)=1$$

---

# Summary of integration formulae

$$
\begin{aligned}
\int a\,dx &= ax+C \\
\int ax\,dx &= \frac{1}{2}ax^2+C \\
\int ax^n\,dx &= \frac{1}{n+1}ax^{n+1}+C \qquad\text{for all } n \text{ except } n=-1 \\
\int x^{-1}\,dx &= \int \frac{1}{x}\,dx = \ln \vert x\vert +C
\end{aligned}
$$

---

# Application

Recall that $f'(t)$ gives the rate at which $f(t)$ changes at time $t$. Integrating the derivative $f'(t)$, we see:

$$\int_a^b f'(t) \, dt = \Big[f(t)\Big]_a^b = f(b)-f(a)$$

Therefore, the definite integral from $a$ to $b$ of $f'(t)$ with respect to $t$ will always give the **net** change that $f(t)$ has undergone as the parameter $t$ moves from $a$ to $b$.

---

# Application: example

A chemical process produces NaCl at the rate of $3\sqrt{t}$ grams per minute. We ask three questions:

1. What is the rate of production one minute into the process?
2. What is the quantity of NaCl produced over the next three minutes?
3. What is the mean rate of NaCl production over this interval?

---

# Application: solution

Let $f(t)$ denote the grams of NaCl produced after $t$ minutes. Then $f'(t)= 3\sqrt{t}$.

**1.** The rate of production one minute into the process is $f'(1) = 3\sqrt{1} = 3$ grams per minute.

<v-click>

**2.** The quantity of NaCl produced over the next three minutes is

$$f(4)-f(1) = \int_1^4\,f'(t)\,dt = \int_1^4\,3\sqrt{t}\,dt = \phantom{\left[2t^{3/2}\right]_1^4 = 2\times(8-1) = 14}$$

</v-click>

<v-click>

```python
t = sp.Symbol('t')
sp.integrate(3*sp.sqrt(t),(t,1,4))
```

$$14$$

</v-click>

---

# Application: solution

**3.** The mean rate is the constant rate which would give the same overall effect:

$$\frac{1}{b-a}\int_a^b\,f'(t)\,dt = \frac{1}{4-1}\int_1^4\,3\sqrt{t}\,dt = \phantom{\frac{14}{3}}$$

<v-click>

```python
sp.integrate(3*sp.sqrt(t),(t,1,4))/(4-1)
```

$$\frac{14}{3}$$

</v-click>

---

# Substitution method

Suppose we wish to integrate:

$$I=\int f(g(x))\,dx \qquad \text{e.g.} \quad \int_{a}^{b} (3-4x)^{-5}\,dx$$

In general, for $g(x)=u$, we can write:

$$\int_{x_1}^{x_2} f(g(x))\,dx = \int_{u_1}^{u_2} f(u) \frac{dx}{du}\, du$$

Integral version of the chain rule.

---

# Substitution: example 1

Consider:

$$\int_{a}^{b} (2x + 3)^4\,dx \qquad \text{(7)}$$

Multiplying this out and then integrating it would be very tedious.
Try a substitution instead:

<v-click>

$$u=2x+3 \quad\Longleftrightarrow\quad x=\frac{1}{2}(u-3)=\frac{u}{2}-\frac{3}{2} \quad\Longleftrightarrow\quad \frac{dx}{du}=\frac{1}{2}$$

</v-click>

<v-click>

Substitute into equation (7) above:

$$
\begin{aligned}
\int_{u(a)}^{u(b)} u^4 \times \frac{1}{2}\,du &= \frac{1}{2}\int_{u(a)}^{u(b)} u^4\,du \\
&= \frac{1}{2}\Big[\frac{1}{5}u^5\Big]_{u(a)}^{u(b)} = \frac{1}{2}\Big[\frac{1}{5}(2x+3)^5\Big]_a^b
\end{aligned}
$$

</v-click>

---

# Substitution: example 1 in SymPy

```python
a, b = sp.symbols('a b')
sp.integrate((2*x + 3)**4,(x,a,b))
```

$$
\begin{aligned}
&- \frac{16 a^{5}}{5} - 24 a^{4} - 72 a^{3} - 108 a^{2} - 81 a \\
&+ \frac{16 b^{5}}{5} + 24 b^{4} + 72 b^{3} + 108 b^{2} + 81 b
\end{aligned}
$$

---

# Substitution: example 2

$$\int_{a}^{b} (3-4x)^{-5}\,dx \qquad \text{(8)}$$

<v-click>

Let:

$$u=3-4x \quad\Longleftrightarrow\quad x=\frac{1}{4}(3-u)=\frac{3}{4}-\frac{u}{4} \quad\Longleftrightarrow\quad \frac{dx}{du}=-\frac{1}{4}$$

</v-click>

<v-click>

Substitute into equation (8) above:

$$
\begin{aligned}
\int_{u(a)}^{u(b)} u^{-5} \times \frac{-1}{4}\,du = -\frac{1}{4}\int_{u(a)}^{u(b)} u^{-5}\,du &= -\frac{1}{4}\Big[\frac{1}{-4}u^{-4}\Big]_{u(a)}^{u(b)} \\
&= \frac{1}{16}\Big[(3-4x)^{-4}\Big]_a^b
\end{aligned}
$$

</v-click>

---

# Substitution: example 2 in SymPy

```python
sp.integrate((3 - 4*x)**(-5),(x,a,b))
```

$$\frac{1}{4096 b^{4} - 12288 b^{3} + 13824 b^{2} - 6912 b + 1296} - \frac{1}{4096 a^{4} - 12288 a^{3} + 13824 a^{2} - 6912 a + 1296}$$
