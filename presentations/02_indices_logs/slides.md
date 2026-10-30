---
theme: oxrse
title: Indices, logs, and exponentials
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

# Indices

### (1) Multiplication.

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

$$a^m\times~a^n=a^{m+n} ~~~~~~~(Add)$$

</v-click>

---

# Indices

### (2) Division.

<v-click>

Let's look at:

$$\frac{5^3}{5^2} = \frac{5\times 5 \times 5}{5\times 5} = 5$$

</v-click>

<v-click>

By extension:

$${a^n\over a^m}=a^{n-m} ~~~~~~~~(Subtract)$$

</v-click>

---

# Indices

### (3) Powers.

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

$$(a^n)^m=a^{nm} ~~~~~~~~(Multiply)$$

</v-click>

---

# Indices

### (4) Negative Indices.

<v-click>

Let's look at:

$$ \frac{a^3}{a^5} = \frac{a\times a \times a}{a\times a \times a\times a\times a} = \frac{1}{a^2}$$

</v-click>

<v-click>

By the subtraction law:

$$ \frac{a^3}{a^5} = a^{3-5} = a^{-2} $$

</v-click>

<v-click>

By extension:

$$a^{-2}={1\over a^2}~~~~{\rm~and~in~general:}~~~~a^{-n} ={1\over a^n}$$

where $n$ is a positive integer

</v-click>

---

# Indices

### (5) Zero index.

<v-click>

A special case:

$$\frac{a^3}{a^3} = a^{3-3} = a^0 = 1$$

</v-click>

<v-click>

Anything to the power of zero equals one, except $0^0$ which is undefined.

</v-click>

---

# Indices

### (6) Fractional (rational) indices.

$$a^1 = a^{1/2} \times a^{1/2} {\rm ~~~~so~~~~}a^{1/2} = \sqrt{a} $$

$$a^{1\over n} = \sqrt[n]{a} $$

$$a^{n\over m} = \left(\sqrt[m]{a}\right)^n ~~~~~{\rm or}~~~\sqrt[m]{a^n}$$

$$a^{-{n\over m}} = {1\over {\left(\sqrt[m]{a}\right)^n}}~~~{\rm or}~~~~{1\over {\sqrt[m]{a^n}}}$$

---

# Indices

e.g.

$$a^{3\over 4}=\sqrt[4]{a^3} ~~~~~{\rm or}~~~\left(\sqrt[4]{a}\right)^3$$

---

# Indices

```python
a = 5.0
a**(3.0/4.0)
```

```text
>>> 3.34370152488211
```

```python
(a**3.0)**0.25
```

```text
>>> 3.34370152488211
```

```python
(a**0.25)**3.0
```

```text
>>> 3.34370152488211
```

<v-click>

i.e. For indices the order in which these mathematical operations are performed
does not
matter.

</v-click>

---

# Exercises. Simplify:

$$y=8^{1\over 6}\times 2^6 \times 2^{-{1\over 2}}=~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~$$

<v-click>

$$ y= {\left(p^{1\over 3}\right)^2 \times \left(p^2\right)^{1\over 3}\over \sqrt[3]{p}}=~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~$$

</v-click>

---

# Indices

### (7) Different bases, same index

<v-click>

$$(a\times b)^3 = (a\times b)\times (a\times b) \times (a\times b) = (a\times a \times a) \times (b\times b \times b) = a^3\times b^3$$

</v-click>

<v-click>

$$(a\times b)^x = a^x\times b^x\qquad {\rm and}\qquad\Bigl( {a\over b}\Bigr)^x={{\,a^x}\over{\,b^x}}$$

</v-click>

---

# Indices

### (8) Two Cautionary remarks:

1. Powers of sums are **not** pretty:  $(a+b)^x \ne a^x + b^x$
2. Powers of differences are **not** pretty: $(a-b)^x \ne a^x - b^x$

A useful formula for products of sums:
$(p+q)\cdot(s+t) = ps + pt+qs + qt$

Three important consequences:

1. $(a+b)^2=(a+b)(a+b)=a^2+2ba+b^2$
1. $(a-b)^2=(a-b)(a-b)=a^2-2ba+b^2$
1. $(a+b)(a-b)=a^2-b^2$

---

# Logarithms

1. If $y=a^x$, $\;x\;$ is the **power** to which the **base** $\;a\;$ must be raised to give
   $y$, OR
2. $\;x\;$ is the **logarithm** which, with **base** $\;a,\;$ gives $\;y\;$.

In general we write $\quad x = \log_a y \quad \Leftrightarrow \quad y=a^x$.

The base of a logarithm may be any number. Commonly, logarithms either have **base** 10 or **base** $e$.
It is almost always a good idea to explicitly state the base, e.g. $\;\log_3 9=2\;$ implies $\;3^2=9\;$.

---
layout: two-cols
---

# Getting a feel for logarithms.

Here's a graph of $y=\log_{10}x$:

::right::

<PlotFigure v-click name="log10" />

---

# Getting a feel for logarithms.

Some physical phenomena use log metrics due to their huge dynamic range:

- volume of sound (decibels)
- pitch (1 octave is doubling of frequency, 2 octaves is quadrupling of
  frequency)
- earth quakes (Richter scale)
- pH ($[H^+]$ ion concentration)
- Used a lot in computer programming to improve the speed and/or accuracy of calculations.

---

# The laws of logarithms

### (1) Using the same base $a$ for both operations:

- _Taking the logarithm_ undoes _raising to a power_:

$$\log_a\,a^r=r$$

- _Raising to a power_ undoes _taking the logarithm_:

$$a^{\log_a\,b}=b$$

---

# The laws of logarithms

### (2) Multiplication.

$$\log_a (bc) = \log_a b + \log_a c ~~~~~(Add) $$

### (3) Division. In a similar way to multiplication,

$$\log_a \left({b \over c}\right) = \log_a b - \log_a c ~~~~~(Subtract)$$

---

# The laws of logarithms

### (4) Powers.

$$\log_a b^n = n \log_a b  ~~~~~~ (Multiply)$$

### (5) Changing the base of  a logarithm:

$$\log_a c = {\log_b c\over \log_b a}$$

### (6) Special case: if $b$ and $c$ are the same, (5) reduces to

$$ \log_a b ={\log_b b\over \log_b a}={1\over \log_b a}$$

---

# The laws of logarithms

### (7) The log of any number to the base itself is 1:

$$\log_a a =1 $$

### (8) The log of 1 is 0 (unless a=0, in which case it is undefined):

$$\log_a 1 = 0 \quad{\rm since~~~}\quad a^0=1$$

---

# The laws of logarithms

### (9) Inverse operation:

$$\log_a a^x = x$$

### (10) Or,

$$a^{\log_a x}=x$$

### (11) Negative logs.

$$\log_a {1\over x} = \log_a1-\log_ax= 0 - \log_a x =-\log_ax$$

---

# The laws of logarithms

### (12)  Two cautionary remarks:

1. $\;\log_a (x + y)\;$ and $\;\log_a (x-y)\;$ cannot be simplified any further, and should be left as they are.

2. Neither can $\;\log_a\,x \cdot \log_a\,y\;$ or $\;\displaystyle{{\log_a\,x}\over {\log_a\,y}}.\;$ Leave them as they are.

---
layout: two-cols
---

# Example 1: graphs

Can the data below be fitted to the form: $y=Ax^n$?

::right::

<PlotFigure v-click name="power-law" />

---
layout: two-cols
---

# Example 1: graphs

- Take logs of both sides: This is the equation of a straight line (compare to $y=mx+c$)

$$\log y =\log Ax^n = \log A + \log x^n= \log A + n \log x$$

::right::

<PlotFigure v-click name="power-law-logs" />

---

# Example 1: graphs

```python
gradient = (Z[-1] - Z[0])/(W[-1] - W[0])
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

---

# Example 2: pH

1\. What is the pH of a 0.011M solution of HCl?

$$pH = -\log_{10}[H^+]$$

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

# Example 2: pH

2\. What is the H$^+$ concentration of a solution of HCl with a pH of 3?

<v-click>

$$pH = -\log [H^+] = 3~~~~{\rm~so~~~}$$

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

# Example 3: Simplifying logs

Write an expression for $x$ without using logarithms

$$\log(x) = \log(p) + 2 \log(q) - \log(k) -3$$

$$\log(x) =~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~$$

$$x=~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~$$

1. Use the laws of logarithms (above) to put all terms on the right hand side
   **within** the logarithm. This means we have to rewrite $\;3\;$ as $\;3\log(10)\;$.
1. Raise both sides to the (same) power which will **undo** the logarithm function. (i.e. raise both sides to the power of 10)

---
layout: two-cols
---

# The exponential function and the real number e

### Definition of the Real Number $e$:

The real number $e$, also known as Euler's number, is that base for which the graph $y=e^x$
passes through the point $\;(0, 1)\;$ with gradient exactly equal to $\;1$.

::right::

<PlotFigure v-click name="exponential" />

---

# The exponential function and the real number e

So for the function (called the **exponential function**):

$$y=e^x ~~~{\rm the~gradient~at~(0,1)~is~~}1 = e^0.$$

This turns out to be true at **any** point on the curve.
The function $y=e^x$ is the **only** function that is unchanged when differentiated (more tomorrow).

$e$ has been found to arise in many branches of mathematics. It is also used as a **base** for logarithms. e.g.:

$$y=\log_e10=\ln 10 {\rm~~and~~~} y=\log_ex=\ln x$$

Logs to base $e$ are called **natural logarithms**.

---

# Definition of the natural logarithm:

The **natural logarithm** of a number is the logarithm of that number taken using the base $\;e\;$.
We usually write $\;\ln(x)\;$ for $\log_e(x)$.  Here are some examples:

- $\ln(e)=\log_e(e)=1$
- $\ln(10)=\log_e(10)$ = "The power I need to raise $e$ to in order to get 10"
- $\ln(10)\approx 2.303$. Which means that $e^{2.303}\approx 10$
- $\ln(\exp(b)) = \ln e^b  =\log_e e^b = b$
- $\exp(\ln(b))=e^{\ln(b)}=e^{\log_e b}=b$

Note that examples (d) and (e) confirm the property that
the functions  "$\exp$"  and "$\ln$"  are _functional
inverses_ of one another.
