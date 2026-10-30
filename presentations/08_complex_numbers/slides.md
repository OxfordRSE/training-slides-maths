---
theme: oxrse
title: Complex numbers
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

# Imaginary numbers

**The imaginary number $i$:**

- The polynomial $x^2-1=0$ has two real roots: $1$ and $-1$
- The polynomial $x^2+1=0$ has **no** real roots.

Consider solving:

$$x^2 = 1\qquad\text{and}\qquad x^2 = -1$$

<v-click>

- We introduce an "imaginary" number $i$ so that there are two solutions to $x^2 = -1$: $i$ and $-i$. That is, $i$ is a number with the property that $i^2=-1$.

</v-click>

---

# Complex numbers

The complex numbers are the set of all expressions of the form $a + bi$ where $i^2=-1$ and $a$ and $b$ are real numbers:

$$\mathbb{C}=\left\{a + bi \;\vert\; a,\ b \in\mathbb{R}\right\}$$

<v-click>

For $z=a+bi\in\mathbb{C}$ we define the _real_ and _imaginary_ parts of $z$ to be $\Re(z) = a$ and $\Im(z)=b$.

The imaginary number $i$ has no home on the real number line.
Instead, we locate it on the **complex plane** at the point $(0,1)$.

</v-click>

---
layout: two-cols
---

# Complex numbers: the complex plane

- We can represent any complex number $z=a+bi$ as the point $(a,b)$ in the complex plane.
- The coordinates $(a,b)$ are usually called the _cartesian_ coordinates for $z$. (Named after the mathematician and philosopher Rene Descartes).
- In this plane, the real numbers lie on the horizontal axis. We usually refer to the horizontal axis of $\mathbb{C}$ as the **real axis**.

::right::

<PlotFigure name="complex-plane" />

---

# Complex conjugates

- The complex plane $\mathbb{C}$ contain **all** of the roots of **every** polynomial.

E.g.

$$x^2-8x+25 = 0 =ax^2 +bx +c \iff x= \frac{-b \pm\sqrt{b^2-4ac}}{2a}$$

<v-click>

$$=\frac{8\pm\sqrt{64-100}}{2}=\frac{8\pm\sqrt{-36}}{2}=\frac{8\pm 6i}{2}=4\pm3i$$

</v-click>

<v-click>

- Note that these two roots are reflections of one another through the real axis. They are _conjugates_ of one another.
- In general, let $z=a + bi$. The **conjugate** of $z$ is the complex number $\bar{z}=a-bi$.

</v-click>

---

# Complex conjugates in SymPy

We can also use Sympy's `solve` method to solve polynomials:

```python
x = sp.symbols('x')
sp.solve(x**2 - 8*x + 25)
```

$$\left[ 4 - 3 i, \  4 + 3 i\right]$$

---

# Modulus (size) of a complex number

- The distance to a point on the complex plane from 0 is called its **modulus**, and we find this by calculating the hypotenuse of the triange with base $\Re(z)$ and height $\Im(z)$:

E.g. The modulus of $4\pm3i$ is $\sqrt{3^2+4^2}=\sqrt{9+16}=\sqrt{25}=5$

<v-click>

- In general, the **modulus** of $z=a+bi$ is the real number $|z|=\sqrt{a^2+b^2}$.

</v-click>

<v-click>

- The **modulus** is connected to the **conjugate** by means of the formula $z\cdot \bar{z}=|z|^2$. Indeed:

$$
\begin{aligned}
z\cdot\bar{z}&=(a+bi)(a-bi)=a^2-(bi)^2=a^2-b^2\cdot i^2\\
&=a^2-b^2(-1)=a^2+b^2=|z|^2
\end{aligned}
$$

</v-click>

---

# Complex numbers in Python

```python
x = 1 + 2j
print(f'x = {x}     Re(x) = {x.real}     Im(x) = {x.imag}     |x| = {abs(x)}')
```

```text
x = (1+2j)     Re(x) = 1.0     Im(x) = 2.0     |x| = 2.23606797749979
```

Complex numbers using `Sympy`:

```python
x = 1 + 2 * sp.I
print(f'x = {x}     Re(x) = {sp.re(x)}     Im(x) = {sp.im(x)}     |x| = {sp.Abs(x)}')
```

```text
x = 1 + 2*I     Re(x) = 1     Im(x) = 2     |x| = sqrt(5)
```

---

# Addition and subtraction

Addition and subtraction of complex numbers work as you would expect:

$$(a+bi)\pm(c+di)=(a\pm c) + (b\pm d)i$$

and

$$-(a+bi)=-a-bi$$

---
layout: exercise
---

# Try adding and subtracting

Try adding: $(5+6i)+(1-i)=$

<v-click>

```python
print((5 + 6j) + (1 - 1j))
```

```text
(6+5j)
```

</v-click>

Try subtracting: $(5+6i)-(1-i)=$

<v-click>

```python
print((5 + 6j) - (1 - 1j))
```

```text
(4+7j)
```

</v-click>

---

# Multiplication

Multiplication is not quite so convenient in cartesian coordinates:

$$
\begin{aligned}
(a+bi)(c+di)&=ac + adi + bci + bidi \\
&= ac + adi + bci -bd \\
&= (ac-bd)+(ad+bc)i
\end{aligned}
$$

---
layout: exercise
---

# Try multiplying

Try multiplying: $(5+6i)(1-i)=$

<v-click>

```python
print((5 + 6j) * (1 - 1j))
```

```text
(11+1j)
```

</v-click>

---

# Division

Division is even more awkward in cartesian coordinates: we have to multiply the numerator and the denominator by the complex conjugate of the denominator.

$$
\begin{aligned}
\frac{a+bi}{c+di}&=\frac{(a+bi)(c-di)}{(c+di)(c-di)}\\
&=\frac{(ac+bd)+(bc-ad)i}{c^2+d^2}=\left(\frac{ac+bd}{c^2+d^2}\right)+ \left(\frac{bc-ad}{c^2+d^2}\right)i
\end{aligned}
$$

---
layout: exercise
---

# Try dividing

Try dividing:

$$\frac{-4+7i}{2+3i}=$$

<v-click>

```python
print((-4 + 7*sp.I) / (2 + 3*sp.I))
```

```text
(-4 + 7*I)/(2 + 3*I)
```

</v-click>

---

# Polar coordinates

It's often convenient to represent the complex number $z = a + bi$ in terms of its polar coordinates $\langle r,\theta \rangle$.

- The angle $\theta$ is called the _argument_ of $z$.
- The real number $r=|z|$ is sometimes denoted mod$(z)$.

---
layout: two-cols
---

# Polar coordinates: cartesian and polar plots

<PlotFigure name="cartesian" />

::right::

<PlotFigure name="polar" />

---

# Connection between cartesian and polar

Let $z=x+iy$. If we are given the polar coordinates of $z$ and want to express the cartesian coordinates use

$$
\begin{gathered}
x=r\cos\theta\\
y=r\sin\theta\\
z=r\cos\theta + ri\sin\theta=r(\cos\theta + i\sin\theta)
\end{gathered}
$$

<v-click>

If we are given the cartesian coordinates and want to find the polar coordinates use:

$$r=\text{mod}(z)=|z|=\sqrt{x^2+y^2}$$

</v-click>

---

# Connection between cartesian and polar

$$
\theta=\text{arg}(z)=\tan^{-1}\frac{y}{x}=
\begin{cases}\pi/2, & \text{if } x=0,y>0 \\
-\pi/2, & \text{if } x=0,y<0 \\
\arctan\left(\frac{y}{x}\right), & \text{if } x>0\\
\arctan\left(\frac{y}{x}\right)+\pi, & \text{if } x<0, y\geq 0\\
\arctan\left(\frac{y}{x}\right)-\pi, & \text{if } x<0, y<0
\end{cases}
$$

<!--
N.B. All of the fuss about the value of theta in the formula above is to make
sure that z gets into the proper quadrant. Beware of the sign of this tangent:
depends on which quadrant you are in. The positive x axis is defined as having
theta=0 and positive theta goes in an anticlockwise sense around the xy plane.
-->

---

# Polar coordinates: example 1

- Find the cartesian coordinates for the complex number $z$ with polar coordinates $r=2$ and $\theta=\pi/6$.

<v-click>

$$
\begin{aligned}
\Re(z)&=x=r\cos\theta=2\cos(\pi/6)=2\left(\frac{\sqrt{3}}{2}\right)=\sqrt{3}\\
\Im(z)&=y=r\sin\theta=2\sin(\pi/6)=2\left(\frac{1}{2}\right)=1
\end{aligned}
$$

$$\text{Therefore } z = \sqrt{3} + i$$

</v-click>

<v-click>

```python
print(cmath.rect(2, np.pi/6))
```

```text
(1.7320508075688774+0.9999999999999999j)
```

</v-click>

---

# Polar coordinates: example 2

- Find the polar coordinates for the complex number $z= -3+4i$.

$$|z|=r =$$

<v-click>

$$\sqrt{(-3)^2+4^2}=\sqrt{25}=5$$

</v-click>

$$\text{arg}(z)=\theta=\arctan\left(\frac{y}{x}\right)=$$

<v-click>

$$-0.93+\pi \text{ radians}\approx 127^\circ$$

</v-click>

<v-click>

```python
print(cmath.polar(-3 + 4j))
```

```text
(5.0, 2.214297435588181)
```

</v-click>

---

# Polar coordinates: example 3

- Find the polar coordinates for the complex number $z= -2i$.

<v-click>

$$
\begin{aligned}
\text{mod}(z)&=r = |z|=2\\
\text{arg}(z)&=\theta=-\frac{\pi}{2}
\end{aligned}
$$

</v-click>

<v-click>

```python
print(cmath.polar(-2j))
```

```text
(2.0, -1.5707963267948966)
```

</v-click>

---

# Multiplication in polar coordinates

First a reminder of three useful and important identities:

$$
\begin{aligned}
\cos^2\theta + \sin^2\theta &= 1 \\
\cos(\theta_1+\theta_2)&=\cos\theta_1\cos \theta_2 - \sin\theta_1\sin\theta_2 \\
\sin(\theta_1+\theta_2)&=\sin\theta_1\cos \theta_2 + \sin\theta_2\cos\theta_1
\end{aligned}
$$

---

# Multiplication in polar coordinates

Now let $z_1=r_1\cos\theta_1+ir_1\sin\theta_1$ and $z_2=r_2\cos\theta_2+ir_2\sin\theta_2$.

We first compute the real part of the product $z_1\cdot z_2$:

$$ {1|1-2|1-3}
\begin{aligned}
\Re(z_1\cdot z_2) &= r_1\cos\theta_1\cdot r_2\cos\theta_2 - r_1\sin\theta_1\cdot r_2\sin\theta_2\\
&=r_1r_2(\cos\theta_1\cos\theta_2 - \sin\theta_1\sin\theta_2)\\
&=r_1r_2\cos(\theta_1 + \theta_2)
\end{aligned}
$$

<v-click>

Note that for the real part the moduli have been multiplied and the arguments added.

</v-click>

---

# Multiplication in polar coordinates

Now we compute the imaginary part of $z_1\cdot z_2$:

$$ {1|1-2|1-3}
\begin{aligned}
\Im(z_1\cdot z_2) &= r_1\sin\theta_1\cdot r_2\cos\theta_2 + r_2\sin\theta_2\cdot r_1\cos\theta_1\\
&=r_1r_2(\sin\theta_1\cos\theta_2 - \sin\theta_2\cos\theta_1)\\
&=r_1r_2\sin(\theta_1 + \theta_2)
\end{aligned}
$$

<v-click>

For the imaginary part too, the moduli multiply while the arguments add.

</v-click>

---

# Multiplication in polar coordinates

This gives a relatively compact and highly geometric result for the product:

$$z_1\cdot z_2 = r_1r_2(\cos(\theta_1 + \theta_2)+i\sin(\theta_1 + \theta_2))$$

<v-click>

It is **multiplicative** in the modulus and **additive** in the argument:

$$
\begin{aligned}
|z_1z_2|&= |z_1\cdot |z_2|\\
\arg(z_1z_2)&=\arg (z_1)+ \arg( z_2)
\end{aligned}
$$

This means that when we multiply by $z$, we are **rotating** through the angle $\arg(z)$ and **radially stretching** by a factor of $|z|$.

</v-click>

---

# A remarkable connection with exponentials

First, think of $z=\cos\theta + i\sin\theta$ as a function of $\theta$ and differentiate with respect to $\theta$:

$$\frac{dz}{d\theta}=\frac{d}{d\theta}\left(\cos\theta+i\sin\theta\right)=-\sin\theta+i\cos\theta \qquad \text{(1)}$$

<v-click>

Next notice that the right-hand side is just the product $iz$:

$$iz=i(\cos\theta+i\sin\theta)=i\cos\theta+i^2\sin\theta=-\sin\theta+i\cos\theta \qquad \text{(2)}$$

</v-click>

<v-click>

Thus from (1) and (2)

$$\frac{dz}{d\theta}=iz$$

</v-click>

---

# A remarkable connection with exponentials

This is a separable differential equation. Thus:

$$\int\frac{dz}{iz}=\int d\theta \qquad\Rightarrow\qquad \frac{1}{i}\ln z =\theta +c \qquad\Rightarrow\qquad \ln z =i\theta +ic$$

In exponential form:

$$z=e^{i\theta+ic} = e^{i\theta}\,e^{ic} = Ae^{i\theta} \qquad \text{with} \qquad A=e^{ic}$$

<v-click>

When $\theta=0$, $z=1$ giving $A=1$, so:

$$z=\cos\theta + i \sin\theta=e^{i\theta} \qquad \text{(1)}$$

</v-click>

<v-click>

Similarly we can show that:

$$z=\cos\theta - i \sin\theta=e^{-i\theta} \qquad \text{(2)}$$

</v-click>

---

# A remarkable connection with exponentials

Adding (1) and (2) and subtracting (1) and (2) gives:

$$\cos\theta =\frac{e^{i\theta}+ e^{-i\theta}}{2} \qquad\qquad \sin\theta =\frac{e^{i\theta}-e^{-i\theta}}{2i}$$

<v-click>

Thus **any complex number** can now be written:

$$z=x+iy=r(\cos\theta + i\sin\theta)=r\,e^{i\theta}$$

</v-click>

---

# A remarkable connection with exponentials

Several important consequences:

1. Any complex number can be written in the polar form $z = re^{i\theta}$ where $r=|z|$ and $\theta=\arg(z)$.
2. The unit circle in $\mathbb{C}$ consists exactly of those complex numbers with modulus equal to 1, that is the numbers $e^{i\theta}$.
3. Multiplication on the unit circle $r=1$ can be carried out by adding the angles:

   $$e^{i\theta_1}\cdot e^{i\theta_2} = e^{i(\theta_1+\theta_2)}$$

---

# A remarkable connection with exponentials

$$z=x+iy=r(\cos\theta + i\sin\theta)=r\,e^{i\theta}$$

Other important consequences:

**4.** Exponentiation on the unit circle $r=1$ can be done by multiplying the angle by the index:

$$\left(e^{i\theta}\right)^n = e^{i\theta n}=e^{i(n\theta)}$$

**5.** This result is known as **DeMoivre's Theorem**. It is usually stated in its cartesian form:

$$(\cos\theta + i\sin\theta)^n=\cos(n\theta) + i\sin(n\theta)$$

**6.** Finally, the famous identity by Leonhard Euler

$$e^{\pi i}+1=0$$
