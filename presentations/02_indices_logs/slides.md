---
theme: oxrse
title: Indices, logs, and exponentials
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

# Why indices and logs?

- The laws of indices let us simplify and rearrange expressions with powers in them.
  We will need them throughout the course (e.g. when we cover differentiation).
- _Taking the logarithm_ undoes _raising to a power_.
  This means that we can use logarithms to solve for an unknown power, to work with quantities that have a huge dynamic range (e.g. pH), and to turn power laws and exponentials into straight lines.
- We often want to describe growth and decay in biology, and for this we use the exponential function, $e^x$, and its inverse, the natural logarithm.

---

# Indices: multiplication

<v-click>

Let's look at:

$$5^3 = 5\times 5 \times 5 = 125$$

</v-click>

<v-click>

Then:

$$5^3 \times 5^2 = (5\times 5 \times 5) \times (5\times 5) = 5^5 = 3125$$

</v-click>

<v-click>

So by extension:

$$a^m\times a^n=a^{m+n} \qquad \text{(add)}$$

</v-click>

---

# Indices: division

<v-click>

Let's look at:

$$\frac{5^3}{5^2} = \frac{5\times 5 \times 5}{5\times 5} = 5$$

</v-click>

<v-click>

By extension:

$$\frac{a^n}{a^m}=a^{n-m} \qquad \text{(subtract)}$$

</v-click>

---

# Indices: powers

<v-click>

Let's look at:

$$(5^3)^4 = 5^3 \times 5^3 \times 5^3 \times 5^3$$

</v-click>

<v-click>

By the addition law:

$$5^3 \times 5^3 \times 5^3 \times 5^3 = 5^{3+3+3+3} = 5^{3\times 4}$$

</v-click>

<v-click>

By extension:

$$(a^n)^m=a^{nm} \qquad \text{(multiply)}$$

</v-click>

---

# Indices: negative indices

<v-click>

Let's look at:

$$\frac{a^3}{a^5} = \frac{a\times a \times a}{a\times a \times a\times a\times a} = \frac{1}{a^2}$$

</v-click>

<v-click>

By the subtraction law:

$$\frac{a^3}{a^5} = a^{3-5} = a^{-2}$$

</v-click>

<v-click>

By extension:

$$a^{-2}=\frac{1}{a^2} \quad \text{and in general:} \quad a^{-n} =\frac{1}{a^n}$$

where $n$ is a positive integer

</v-click>

---

# Indices: zero index

<v-click>

A special case:

$$\frac{a^3}{a^3} = a^{3-3} = a^0 = 1$$

</v-click>

<v-click>

Anything to the power of zero equals one, except $0^0$ which is undefined.

</v-click>

---

# Indices: fractional (rational) indices

$$a^1 = a^{1/2} \times a^{1/2} \quad \text{so} \quad a^{1/2} = \sqrt{a}$$

$$a^{\frac{1}{n}} = \sqrt[n]{a}$$

$$a^{\frac{n}{m}} = \left(\sqrt[m]{a}\right)^n \quad \text{or} \quad \sqrt[m]{a^n}$$

$$a^{-\frac{n}{m}} = \frac{1}{\left(\sqrt[m]{a}\right)^n} \quad \text{or} \quad \frac{1}{\sqrt[m]{a^n}}$$

<v-click>

e.g.

$$a^{\frac{3}{4}}=\sqrt[4]{a^3} \quad \text{or} \quad \left(\sqrt[4]{a}\right)^3$$

</v-click>

---

# Indices: fractional indices in Python

```python
a = 5.0
a**(3.0/4.0)
```

```text
3.34370152488211
```

```python
(a**3.0)**0.25
```

```text
3.34370152488211
```

```python
(a**0.25)**3.0
```

```text
3.34370152488211
```

<v-click>

i.e. For indices the order in which these mathematical operations are performed
does not
matter.

</v-click>

---

# Indices: different bases, same index

<v-click>

$$(a\times b)^3 = (a\times b)\times (a\times b) \times (a\times b) = (a\times a \times a) \times (b\times b \times b) = a^3\times b^3$$

</v-click>

<v-click>

$$(a\times b)^x = a^x\times b^x\qquad \text{and}\qquad\Bigl(\frac{a}{b}\Bigr)^x=\frac{a^x}{b^x}$$

</v-click>

---
layout: exercise
---

# Exercises: simplify

$$y=8^{\frac{1}{6}}\times 2^6 \times 2^{-\frac{1}{2}}=$$

<v-click>

$$y= \frac{\left(p^{\frac{1}{3}}\right)^2 \times \left(p^2\right)^{\frac{1}{3}}}{\sqrt[3]{p}}=$$

</v-click>

---

# Indices: two cautionary remarks

1. Powers of sums are **not** pretty:  $(a+b)^x \ne a^x + b^x$
2. Powers of differences are **not** pretty: $(a-b)^x \ne a^x - b^x$

A useful formula for products of sums:

$$(p+q)\cdot(s+t) = ps + pt+qs + qt$$

Three important consequences:

1. $(a+b)^2=(a+b)(a+b)=a^2+2ab+b^2$
2. $(a-b)^2=(a-b)(a-b)=a^2-2ab+b^2$
3. $(a+b)(a-b)=a^2-b^2$

---

# Logarithms

1. If $y=a^x$, $x$ is the **power** to which the **base** $a$ must be raised to give
   $y$, OR
2. $x$ is the **logarithm** which, with **base** $a$, gives $y$.

In general we write $\quad x = \log_a y \quad \Leftrightarrow \quad y=a^x$.

The base of a logarithm may be any positive number other than 1. Commonly, logarithms either have **base** 10 or **base** $e$.
It is almost always a good idea to explicitly state the base, e.g. $\log_3 9=2$ implies $3^2=9$.
In this course we always write the base, e.g. $\log_{10}$, except for base $e$ (more on this below).

---

# Getting a feel for logarithms

Here's a graph of $y=\log_{10}x$:

<PlotFigure v-click name="log10" :height="360" />

---

# Getting a feel for logarithms

Some physical phenomena use log metrics due to their huge dynamic range:

- volume of sound (decibels)
- pitch (1 octave is doubling of frequency, 2 octaves is quadrupling of
  frequency)
- earthquakes (Richter scale)
- pH ($[H^+]$ ion concentration)

---

# Laws of logarithms: the same base

Using the same base $a$ for both operations:

- _Taking the logarithm_ undoes _raising to a power_:

$$\log_a\,a^r=r$$

- _Raising to a power_ undoes _taking the logarithm_:

$$a^{\log_a\,b}=b$$

---

# Laws of logarithms: from the laws of indices

Each law of logarithms comes from a law of indices.
If $b=a^m$ and $c=a^n$, then $\log_a b = m$ and $\log_a c = n$, so:

|                | Indices                     | Logarithms                                      |
| -------------- | --------------------------- | ----------------------------------------------- |
| Multiplication | $a^m\times a^n=a^{m+n}$     | $\log_a (bc) = \log_a b + \log_a c$ (add)       |
| Division       | $a^m/a^n=a^{m-n}$           | $\log_a (b/c) = \log_a b - \log_a c$ (subtract) |
| Powers         | $\left(a^m\right)^r=a^{mr}$ | $\log_a b^r = r \log_a b$ (multiply)            |

<v-click>

This means that the laws of logarithms are the laws of indices written in terms of the powers, with the same (add), (subtract) and (multiply).

</v-click>

---

# Laws of logarithms

### Changing the base of a logarithm

$$\log_a c = \frac{\log_b c}{\log_b a}$$

### Special case

If $b$ and $c$ are the same, the change of base reduces to

$$\log_a b =\frac{\log_b b}{\log_b a}=\frac{1}{\log_b a}$$

---

# Laws of logarithms

### The log of any number to the base itself is 1

$$\log_a a =1$$

### The log of 1 is 0

$$\log_a 1 = 0 \quad \text{since} \quad a^0=1$$

### Negative logs

$$\log_a \frac{1}{x} = \log_a1-\log_ax= 0 - \log_a x =-\log_ax$$

---

# Laws of logarithms: two cautionary remarks

1. $\log_a (x + y)$ and $\log_a (x-y)$ cannot be simplified any further, and should be left as they are.

2. Neither can $\log_a x \cdot \log_a y$ or $\dfrac{\log_a x}{\log_a y}$. Leave them as they are.

---
layout: two-cols
---

# The exponential function: definition of e

The real number $e$, also known as Euler's number, is that base for which the graph $y=e^x$
passes through the point $(0, 1)$ with gradient exactly equal to $1$.

::right::

<PlotFigure v-click name="exponential" />

---

# The exponential function

So for the function (called the **exponential function**):

$$y=e^x \quad \text{the gradient at } (0,1) \text{ is } 1 = e^0.$$

This turns out to be true at **any** point on the curve, i.e. the gradient of $y=e^x$ at any point is equal to the value of $e^x$ there.
This means that the function $y=e^x$ is unchanged when differentiated (more on this when we cover differentiation).

$e$ has been found to arise in many branches of mathematics. It is also used as a **base** for logarithms. e.g.:

$$y=\log_e10=\ln 10 \quad \text{and} \quad y=\log_ex=\ln x$$

Logs to base $e$ are called **natural logarithms**.

---

# Definition of the natural logarithm

The **natural logarithm** of a number is the logarithm of that number taken using the base $e$.
We usually write $\ln(x)$ for $\log_e(x)$.  Here are some examples:

- $\ln(e)=\log_e(e)=1$
- $\ln(10)=\log_e(10)$ = "The power I need to raise $e$ to in order to get 10"
- $\ln(10)\approx 2.303$. Which means that $e^{2.303}\approx 10$
- $\ln(\exp(b)) = \ln e^b  =\log_e e^b = b$
- $\exp(\ln(b))=e^{\ln(b)}=e^{\log_e b}=b$

Note that the last two examples confirm the property that
the functions  "$\exp$"  and "$\ln$"  are _functional
inverses_ of one another.

---

# Logarithms in Python

In numpy, `np.log` is the natural logarithm, $\ln$.
For base 10 and base 2 there are `np.log10` and `np.log2`:

```python
print(np.log(10))
print(np.log10(1000))
print(np.log2(8))
```

```text
2.302585092994046
3.0
3.0
```

<v-click>

For any other base, use the change of base formula, e.g. $\log_3 81 = \ln 81 / \ln 3$:

```python
print(np.log(81)/np.log(3))
```

```text
4.0
```

</v-click>

---

# Example 1: power laws

Can the data below be fitted to the form: $y=Ax^n$?

<PlotFigure v-click name="power-law" :height="360" />

---

# Example 1: power laws

Take logs of both sides:

$$\log_{10} y =\log_{10} Ax^n = \log_{10} A + \log_{10} x^n= \log_{10} A + n \log_{10} x$$

This is the equation of a straight line, $Y=mX+c$, with $Y=\log_{10} y$, $X=\log_{10} x$, $m=n$ and $c=\log_{10} A$.

<PlotFigure v-click name="power-law-logs" :height="280" />

---

# Example 1: power laws

```python
gradient = (Y[-1] - Y[0])/(X[-1] - X[0])
print('gradient =',gradient)
```

<v-click>

```text
gradient = 0.5
```

</v-click>

<v-click>

Gradient = 0.5 = $n$

Intercept = $0.48 = \log_{10}A$ so $A=3.0$

- Data fit curve of the form:

$$y=3.0\times  x^{0.5}$$

</v-click>

<v-click>

Plotting $\log_{10} y$ against $\log_{10} x$ is the same as plotting $y$ against $x$ on logarithmic axes (called a _log-log_ plot).

</v-click>

---

# Example 2: exponential growth

We often want to know how quickly a population grows.
Here, a population of bacteria is counted every hour.
Can the data below be fitted to the form: $N=N_0e^{kt}$?

<PlotFigure v-click name="exponential-growth" :height="360" />

---

# Example 2: exponential growth

Take the natural log of both sides:

$$\ln N = \ln N_0e^{kt} = \ln N_0 + \ln e^{kt} = \ln N_0 + kt$$

This is the equation of a straight line, with $Y=\ln N$, $X=t$, $m=k$ and $c=\ln N_0$.
Only the $N$ axis is on a log scale, so this is called a _semi-log_ plot.

<PlotFigure v-click name="exponential-growth-logs" :height="280" />

---

# Example 2: exponential growth

```python
gradient = (Y[-1] - Y[0])/(t[-1] - t[0])
intercept = Y[0]
print('gradient =',gradient)
print('intercept =',intercept)
```

<v-click>

```text
gradient = 0.3465735902799727
intercept = 5.298317366548036
```

</v-click>

<v-click>

Gradient = 0.35 = $k$ (per hour)

Intercept = $5.3 = \ln N_0$ (the first count is at $t=0$) so $N_0 = e^{5.3} \approx 200$

- Data fit curve of the form:

$$N=200\,e^{0.35t}$$

</v-click>

<v-click>

The population doubles when $e^{kt}=2$, i.e. when $t=\ln 2/k\approx 2$ hours.

</v-click>

---

# Example 3: pH, part 1

What is the pH of a 0.011 M solution of HCl?

$$\text{pH} = -\log_{10}[H^+]$$

<v-click>

```python
pH = -np.log10(0.011)
print('pH =',pH)
```

</v-click>

<v-click>

```text
pH = 1.958607314841775
```

</v-click>

---

# Example 3: pH, part 2

What is the H$^+$ concentration of a solution of HCl with a pH of 3?

<v-click>

$$\text{pH} = -\log_{10} [H^+] = 3 \quad \text{so} \quad [H^+] = 10^{-3}$$

</v-click>

<v-click>

```python
hydrogen = 10**(-3)
print('[H+] =',hydrogen,'M')
```

</v-click>

<v-click>

```text
[H+] = 0.001 M
```

</v-click>

---
layout: exercise
---

# Example 4: simplifying logs

Write an expression for $x$ without using logarithms

$$\log_{10}(x) = \log_{10}(p) + 2 \log_{10}(q) - \log_{10}(k) -3$$

1. Use the laws of logarithms (above) to put all terms on the right hand side
   **within** the logarithm. This means we have to rewrite $3$ as $3\log_{10}(10)$.
2. Raise 10 to the power of each side, which will **undo** the logarithm function.

::work::

$$\log_{10}(x) =$$

$$x=$$
