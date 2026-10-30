---
theme: oxrse
title: Differentiation 2
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

When $y = ax^n$, $y' = a n x^{n-1}$. So find $y'(x)$, when:

1. $y = 6$
2. $y = x$
3. $y = 13x -1$
4. $y = \sqrt{x^7}$
5. $y = -2/x$

---

# Linear approximation and the derivative

By definition, the derivative of a function $f(x)$ is

$$f'(x) = \lim_{h \rightarrow 0} \frac{f(x+h) - f(x)}{h}$$

This means that for small $h$, this expression approximates the derivative. By rearranging this, we have

$$f(x + h) \approx f(x) + h f'(x)$$

In other words, $f(x+h)$ can be approximated by starting at $f(x)$ and moving a distance $h$ along the tangent $f'(x)$.

---

# Linear approximation: example

Estimate $\sqrt{5218}$

To do this, we first need an $f(x)$ that is easy to calculate, and close to 5218. For this we can take that $70^2 = 4900$.

To calculate the approximation, we need $f'(x)$, where $f(x) = \sqrt{x}$.

$$f'(x) = \frac{1}{2 \sqrt{x}}$$

---

# Linear approximation: example

$$f'(x) = \frac{1}{2 \sqrt{x}}$$

Since 5218 = 4900 + 318, we can set $x = 4900$ and $h = 318$.

Using the approximation, we have:

$$
\begin{aligned}
f(5218) &\approx f(4900) + 318 \times f'(4900) \\
f(5218) &\approx 70 + 318 \times \frac{1}{140} \approx 72.27
\end{aligned}
$$

<v-click>

$\sqrt{5218} = 72.2357252$ - not a bad appriximation!

</v-click>

---

# Standard derivatives

It's useful to know the derivatives of all the standard functions, and some basic rules.

$$
\begin{aligned}
\frac{d}{dx} (x^n) &= n x^{n-1} \\
\frac{d}{dx} (\sin x) &= \cos x \\
\frac{d}{dx} (\cos x) &= -\sin x \\
\frac{d}{dx} (e^x) &= e^x
\end{aligned}
$$

To understand the derivative of sin and cos, consider their graphs, and when they are changing positively (increasing), negatively (decreasing) or not at all (no rate of change).

---

# Standard derivatives: sin and cos

<PlotFigure name="sin-cos" />

---

# Differentiation of sums and scalar multiples

$$
\begin{aligned}
(f(x) \pm g(x))' &= f'(x) \pm g'(x) \\
(a f(x))' &= a f'(x)
\end{aligned}
$$

---

# Differentiation of products

While differentiating sums, and scalar multiples is straightforward, differentiating products is more complex

$$(f(x) g(x) )' \neq f'(x) g'(x)$$

$$(f(x) g(x) )' = f'(x) g(x) + g'(x) f(x)$$

---

# Differentiation of products: example

To illustrate that this works, consider $y = (2x^3 - 1)(3x^3 + 2x)$

If we expand this out, we have that $y = 6x^6 + 4x^4 - 3x^3 - 2x$

From this, clearly, $y' = 36 x^5 + 16x^3 - 9 x^2 - 2$

---

# Differentiation of products: example

To use the product rule, instead we say $y = f \times g$, where $f = 2x^3 - 1$, and $g = 3x^3 + 2x$. Therefore

$$ {1|1-2|1-3|1-4}
\begin{aligned}
f'(x) &= 6x^2 \\
g'(x) &= 9x^2 + 2 \\
y' &= f'g + g'f = 6x^2 (3x^3 + 2x) + (9x^2 + 2)(2x^3 - 1) \\
y' &= 18x^5 + 12x^3 + 18x^5 + 4x^3 - 9x^2 - 2 = 36x^5 + 16x^3 - 9x^2 - 2
\end{aligned}
$$

<v-click>

So both rules produce the same result. While for simple examples the product rule requires more work, as functions get more complex it saves a lot of time.

</v-click>

---

# The chain rule: a function of a function

One of the most useful rules is differentiating a function that has another function inside it, $y = f(g(x))$. For this we use the chain rule:

$$
\begin{aligned}
y &= f(g(x)) \\
y'(x) &= f'(g(x))\; g'(x) = \frac{df}{dg} \frac{dg}{dx}
\end{aligned}
$$

---

# The chain rule: example 1

$$y = (5x^2 + 2)^4$$

We can write this as $y = g^4$, where $g = 5x^2 + 2$. Given this, we have that

$$ {1|1-2|1-3}
\begin{aligned}
\frac{dy}{dg} &= 4g^3 = 4(5x^2 + 2)^3 \\
\frac{dg}{dx} &= 10x \\
\frac{dy}{dx} &= \frac{dy}{dg} \frac{dg}{dx} = 4 (5x^2 + 2)^3 10 x = 40 x (5x^2 + 2)^3
\end{aligned}
$$

<v-click>

This extends infinitely to nested functions, meaning

$$\frac{d}{dx}(a(b(c)) = \frac{d a}{d b} \frac{d}{dx} (b(c)) = \frac{d a}{db} \frac{d b}{dc}\frac{dc}{dx}$$

</v-click>

---

# The quotient rule: the ratio of two functions

If $y(x) = f(x)/g(x)$, then by using the product rule, and setting $h(x) = (g(x))^{-1}$, we can show that

$$y'(x) = \frac{f'g - g'f}{g^2}$$

---

# The quotient rule: example

$$y = \frac{3x-1}{4x + 2}$$

$$ {1|1-2|1-3|1-4}
\begin{aligned}
f &= 3x - 1, \rightarrow f' = 3 \\
g &= 4x + 2, \rightarrow g' = 4 \\
y' &= \frac{f'g - g'f}{g^2} = \frac{3(4x+2) - 4(3x-1)}{(4x+2)^2} \\
y' &= \frac{12x + 6 - 12 x + 4}{(4x+2)^2} = \frac{10}{(4x+2)^2}
\end{aligned}
$$

---

# Implicit differentiation

For any function $y = f(x)$, with a well defined inverse $f^{-1}(x)$ (not to be confused with $(f(x))^{-1})$), we have by definition that

$$x = f^{-1}(f(x)) = f^{-1}(y).$$

This means that we can apply the chain rule

$$\frac{d}{dx}(x) = \frac{d}{dx}(f^{-1}(y)) = \frac{d}{dy}(f^{-1}(y)) \frac{dy}{dx}$$

<v-click>

But since $d(x)/dx = 1$

$$\frac{d}{dy}(f^{-1}(y)) = \frac{1}{\frac{dy}{dx}}$$

</v-click>

---

# Implicit differentiation: example

$$y = \ln(x)$$

If $y = \ln(x)$, this means that $f^{-1}(y) = e^y = x$

By definition ($f^{-1}(y))' = e^y$, as $e^y$ doesn't change under differentiation. This means that

$$\frac{d}{dx}(\ln(x)) = \frac{1}{\frac{d}{dy}(f^{-1}(y))} = \frac{1}{e^y}$$

<v-click>

But since $y = \ln(x)$:

$$\frac{d}{dx}(\ln(x)) = \frac{1}{e^{\ln(x)}} = \frac{1}{x}$$

</v-click>

---

# Example: differentiating using sympy

In Python, there is a special package for calculating derivatives symbolically, called sympy.

This can quickly and easily calculate derivatives (as well as do all sorts of other analytic calculations).

---

# Example: differentiating using sympy

```python
import sympy as sp

x = sp.symbols('x') #This creates a variable x, which is symbolically represented as the string x.

# Calculate the derivative of x^2
sp.diff(x**2, x)
```

$$2 x$$

<v-click>

```python
sp.diff(sp.cos(x), x)
```

$$- \sin{\left(x \right)}$$

</v-click>

<v-click>

```python
f = (x+1)**3 * sp.cos(x**2 - 5)
sp.diff(f,x)
```

$$- 2 x \left(x + 1\right)^{3} \sin{\left(x^{2} - 5 \right)} + 3 \left(x + 1\right)^{2} \cos{\left(x^{2} - 5 \right)}$$

</v-click>

---

# Example: differentiating using sympy

```python
f = (x+1)**3 * (x-2)**2 * (x**2 + 4*x + 1)**4
sp.diff(f, x)
```

$$
\begin{aligned}
&\left(x - 2\right)^{2} \left(x + 1\right)^{3} \left(8 x + 16\right) \left(x^{2} + 4 x + 1\right)^{3} \\
&+ 3 \left(x - 2\right)^{2} \left(x + 1\right)^{2} \left(x^{2} + 4 x + 1\right)^{4} \\
&+ \left(x + 1\right)^{3} \left(2 x - 4\right) \left(x^{2} + 4 x + 1\right)^{4}
\end{aligned}
$$

<v-click>

```python
sp.expand(sp.diff(f, x)) # expand out in polynomial form
```

$$
\begin{aligned}
&13 x^{12} + 180 x^{11} + 869 x^{10} + 1250 x^{9} - 2934 x^{8} - 11504 x^{7} - 9142 x^{6} \\
&+ 10092 x^{5} + 23185 x^{4} + 17068 x^{3} + 6081 x^{2} + 1058 x + 72
\end{aligned}
$$

</v-click>

---

# Example: differentiating using sympy

You can look at the documentation for Sympy to see many other possibilities (e.g. we will use Sympy to do symbolic integration later on in this course)

- <https://docs.sympy.org/latest/index.html>

Try out Sympy to verify your pen & paper answers to the problem sheets
