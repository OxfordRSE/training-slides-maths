---
theme: oxrse
title: Integration 2
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

# Why more methods?

Not every function can be integrated by reversing a standard derivative, or by substitution.

In this lecture we add two more methods: _integration by parts_, which reverses the product rule, and _partial fractions_, which splits a fraction into simpler ones.

We will need both when we solve differential equations.

---
layout: exercise
---

# Warm-up exercise

$$\int_1^2 x\,dx=$$

$$\int_1^{\sqrt[3]3} t^2\,dt =$$

$$\int_2^4 \frac{1}{\sqrt z}\,dz=$$

---

# Integration reverses differentiation

### In general

$$\frac{d(a\, x^{n+1})}{dx}=(n+1)a\, x^n \qquad \Rightarrow \qquad \int_{x_1}^{x_2} a\, x^n\,dx = \Big[\frac{a}{n+1}\, x^{n+1}\Big]_{x_1}^{x_2} \qquad (n\neq -1)$$

### Reminder: method 1, integration by substitution

This method can be thought of as an integral version of the chain rule.
Suppose we wish to integrate:

$$
\begin{aligned}
I &=\int f(g(x))\,dx= \int f(u)\,dx \\
I &=\int f(u)\frac{dx}{du}\,du
\end{aligned}
$$

---

# Method 2: integration by parts

Recall that:

$$\frac{d}{dx}f(x)\,g(x)=f(x)\,g'(x)+ g(x)\,f'(x)$$

Integrate and rearrange to get:

$$\int\limits_a^b f(x)\,g'(x)\,dx=\Big[f(x)\,g(x)\Big]_a^b-\int\limits_a^b g(x)\,f'(x)\,dx$$

This is known as the formula for **'integrating by parts'**

---

# Integration by parts

This can also be written:

$$\int\limits_a^b u\,\frac{dv}{dx}\,dx = \Big[uv\Big]^b_a-\int\limits_a^b v\,\frac{du}{dx}\,dx$$

or

$$\int\limits_a^b u\,v'\,dx = \Big[uv\Big]^b_a-\int\limits_a^b v\,u'\,dx$$

with $f(x) \equiv u$ and $g(x) \equiv v$

---

# Integration by parts: example 1

$$\int\limits_a^b x\,\sqrt{(x+1)}\,dx=\int\limits_a^b x\,(x+1)^{1/2}\,dx$$

<v-click>

Choose

$$u=x\qquad\text{and}\qquad v'=\sqrt{(x+1)}$$

so that:

$$u'=1\qquad\text{and}\qquad v=\frac{2}{3}(x+1)^{3/2}$$

</v-click>

---

# Integration by parts: example 1

$$u=x, \quad v'=\sqrt{(x+1)} \qquad\text{so that}\qquad u'=1, \quad v=\frac{2}{3}(x+1)^{3/2}$$

$$ {1|1-2}
\begin{aligned}
\int\limits_a^b x\,\sqrt{(x+1)}\,dx &=\Big[x\,\frac{2}{3}(x+1)^{3/2}\Big]_a^b - \int\limits_a^b 1 \times \frac{2}{3}(x+1)^{3/2}\,dx \\
&=\Big[\frac{2}{3}\,x\,(x+1)^{3/2}\Big]_a^b- \Big[\frac{2}{3}\cdot \frac{2}{5}(x+1)^{5/2}\Big]_a^b
\end{aligned}
$$

---

# Integration by parts: example 1

If we choose the other option for $u$ and $v'$, we get:

$$\Big[(x+1)^{1/2}\,\frac{x^2}{2}\Big]_a^b - \int\limits_a^b \frac{1}{2}\,\frac{1}{\sqrt{(x+1)}}\,\frac{x^2}{2}\,dx$$

The second term is **worse** than the integral we started with!
It's important to choose $u$ and $v$ carefully.
This comes with practice.

---

# Integration by parts: example 2

Let us calculate the indefinite integral,

$$\int \ln x\,dx$$

<v-click>

We can do a bit of a trick. Let:

$$u=\ln x \quad\Longrightarrow\quad u'=\frac{1}{x}\qquad\text{and}\qquad v'=1\quad\Longrightarrow\quad v=x$$

</v-click>

<v-click>

Putting these into our equation:

$$\int \ln x\,dx = \ln x \cdot x - \int x\,\frac{1}{x}\,dx = x \ln x - \int 1\, dx = x \ln x - x + C$$

</v-click>

---

# Integration by parts: example 2 in SymPy

```python
x = sp.symbols('x')
sp.integrate(sp.log(x),x)
```

$$x \log{\left(x \right)} - x$$

(SymPy writes $\log$ for the natural logarithm, $\ln$.)

---

# Integration by parts: example 3

$$\int\limits^{\infty}_0 x^3\,e^{-x}\,dx$$

$$\Big(\int u\, v'\, dx = [u\, v]-\int v\, u'\, dx\Big)$$

<v-click>

Choose

$$u=x^3\qquad\text{and}\qquad v'=e^{-x} \qquad\text{so that}\qquad u'=3x^2\qquad\text{and}\qquad v=-e^{-x}$$

</v-click>

<v-click>

$$\int\limits^{\infty}_0 x^3\,e^{-x}\,dx=-\Big[x^3\,e^{-x}\Big]^{\infty}_0 +\int\limits^{\infty}_0 3x^2\,e^{-x}\,dx$$

</v-click>

---

# Integration by parts: example 3

Now apply integration by parts to the right-hand side:

Choose

$$u=3x^2\qquad\text{and}\qquad v'=e^{-x} \qquad\text{so that}\qquad u'=6x\qquad\text{and}\qquad v=-e^{-x}$$

<v-click>

$$\int\limits^{\infty}_0 3x^2\,e^{-x}\,dx=-\Big[3x^2\,e^{-x}\Big]^{\infty}_0 +\int\limits^{\infty}_0 6x\,e^{-x}\,dx$$

</v-click>

---

# Integration by parts: example 3

And, once more: choose

$$u=6x\qquad\text{and}\qquad v'=e^{-x} \qquad\text{so that}\qquad u'=6\qquad\text{and}\qquad v=-e^{-x}$$

<v-click>

$$\int\limits^{\infty}_0 6x\,e^{-x}\,dx =-\Big[6x\,e^{-x}\Big]^{\infty}_0 +\int\limits^{\infty}_0 6\,e^{-x}\,dx$$

</v-click>

<v-click>

$$\Longrightarrow \int\limits^{\infty}_0 6\,e^{-x}\,dx= -\Big[6\,e^{-x}\Big]^{\infty}_0=0+6e^0=6$$

(Since $e^{-x}\to 0$ as $x\to\infty$, and $e^0=1$)

</v-click>

---

# Integration by parts: example 3

The other terms are all zero, because $x^3e^{-x}$, $3x^2e^{-x}$ and $6x\,e^{-x}$ all tend to $0$ as $x\to\infty$ ($e^{-x}$ shrinks faster than any power of $x$ grows), and all are $0$ at $x=0$:

$$
\begin{aligned}
-\Big[x^3\,e^{-x}\Big]^{\infty}_0 &= 0 - 0 = 0 \\
-\Big[3x^2\,e^{-x}\Big]^{\infty}_0 &= 0 - 0 = 0 \\
-\Big[6x\,e^{-x}\Big]^{\infty}_0 &= 0 - 0 = 0
\end{aligned}
$$

<v-click>

So, to answer our original question:

$$\int\limits^{\infty}_0 x^3\,e^{-x}\,dx=6$$

</v-click>

---

# Integration by parts: example 3 in SymPy

```python
sp.integrate(x**3 * sp.exp(-x),(x,0,sp.oo))
```

$$6$$

<v-click>

and in general:

$$\int\limits^{\infty}_0 x^n\,e^{-x}\,dx=n! \qquad \text{for } n = 0, 1, 2, \ldots$$

</v-click>

---

# Integration by parts: example 4

Integrating trig functions by parts. Recall that:

$$
\begin{aligned}
\frac{d}{dx}(\sin x) &=\cos x \\
\frac{d}{dx}(\cos x) &=-\sin x
\end{aligned}
$$

Let's try to calculate:

$$\int\limits^b_a \cos x\,e^{-x}\,dx = I$$

---

# Integration by parts: example 4

Choose

$$u=\cos x\qquad\text{and}\qquad v'=e^{-x} \qquad\text{so that}\qquad u'=-\sin x\qquad\text{and}\qquad v=-e^{-x}$$

$$I =\Big[-\cos x\, e^{-x}\Big]^b_a -\int\limits^b_a (-)\sin x\,(-)e^{-x}\,dx$$

<v-click>

Choose

$$u=\sin x\qquad\text{and}\qquad v'=e^{-x} \qquad\text{so that}\qquad u'=\cos x\qquad\text{and}\qquad v=-e^{-x}$$

</v-click>

---

# Integration by parts: example 4

$$I =\Big[-\cos x\, e^{-x}\Big]^b_a - \Big[\sin x\,(-)e^{-x}\Big]^b_a + \int\limits^b_a \cos x\,(-)e^{-x}\,dx$$

<v-click>

The last term is the integral we started with:

$$\Longrightarrow \quad 2\int\limits^b_a \cos x\,e^{-x}\,dx = \Big[\sin x\, e^{-x}\Big]^b_a - \Big[\cos x\, e^{-x}\Big]^b_a$$

</v-click>

---

# Method 3: partial fractions

$$\int \frac{dx}{(2x+1)(x-5)} \qquad\text{Let}\qquad \frac{1}{(2x+1)(x-5)}=\frac{A}{2x+1} + \frac{B}{x-5}$$

Multiply both sides by $(2x+1)(x-5)$ to get:

$$A(x-5)+B(2x+1)=1 \qquad\text{so}\qquad Ax-5A+2Bx+B=1$$

<v-click>

Equate coefficients of $x$:

$$A+2B=0 \qquad\text{thus}\qquad A=-2B \qquad \text{(A)}$$

</v-click>

<v-click>

Equate the constant terms (coefficients of $x^0$):

$$-5A+B=1 \qquad\text{so from (A):}\qquad 10B+B=1, \quad B=\frac{1}{11}, \quad A=-\frac{2}{11}$$

</v-click>

---

# Partial fractions: example

Thus:

$$\int \frac{dx}{(2x+1)(x-5)}=-\int \frac{2\, dx}{11(2x+1)} + \int \frac{dx}{11(x-5)}$$

Now use method of substitution on this:

$u=2x+1$ and $du/dx=2$ so $dx/du=1/2$

$w=x-5$ so $dw/dx=1$ and $dx/dw=1$

<v-click>

$$
\begin{aligned}
-\int \frac{2\, du}{2 \times 11 \times u} + \int \frac{dw}{11w} &= -\frac{\ln |u|}{11} + \frac{\ln |w|}{11} \\
&=-\frac{\ln |2x+1|}{11} + \frac{\ln |x-5|}{11} + C
\end{aligned}
$$

</v-click>

---

# Partial fractions: example in SymPy

```python
sp.integrate(1/((2*x + 1)*(x - 5)),x) # answer seems different because of the arbitrary constant!
```

$$\frac{\log{\left(x - 5 \right)}}{11} - \frac{\log{\left(x + \frac{1}{2} \right)}}{11}$$
