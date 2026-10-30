---
theme: oxrse
title: Differentiation 3
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

# Why exponentials and partial derivatives?

In this lecture we use the chain rule to differentiate the exponential and logarithmic functions from the lecture on indices and logs.
We need these whenever a quantity grows or decays (e.g. $e^{-kt}$).

We then look at functions of more than one variable (e.g. the temperature at each point on a plate).
We often want to know how such a function changes when just one of its variables changes.
This is called _partial differentiation_, and we will need it when we study systems of differential equations.

---
layout: exercise
---

# Warm-up exercise

Find $y' = dy/dx$ when $y$ is given by:

1. $y=5x^2$
2. $y=\sqrt[4]{x}$
3. $y=x+1/\sqrt{x^3}$
4. $y=\sqrt{6x^4+2}$
5. $y=x/(3x+2)$
6. $y=x^2\sin x$

---

# Applying the chain rule to the exponential function

**1.** $y=e^{-ax}$. Let $u=-ax$, so $du/dx=-a$. Thus $y=e^u$ and

$$\frac{dy}{du}=e^u \quad\Rightarrow\quad \frac{dy}{dx}=\frac{dy}{du}\times\frac{du}{dx}=e^u\times (-a)=-ae^{-ax}.$$

<v-click>

**2.** $y = e^{x^2}$. Then, letting $u = x^2$:

$$\frac{d}{dx}e^{x^2}=\frac{dy}{dx}=\frac{dy}{du}\times\frac{du}{dx}=e^u\cdot 2x = e^{x^2}\cdot 2x.$$

</v-click>

<v-click>

An important generalisation, for any function $f(x)$:

$$\frac{d}{dx}e^{f(x)}=e^{f(x)}f'(x)$$

</v-click>

---

# Example with the natural logarithm

$y=\ln\left((a-x)^2\right)=2\ln(a-x)=2\ln u$. Let $u=(a-x)$:

$$\Rightarrow \frac{du}{dx}=-1 \quad\text{and}\quad \frac{dy}{du}=\frac{2}{u} \quad\text{Thus}\quad \frac{dy}{dx}=\frac{2}{u}\times (-1)=\frac{-2}{a-x}$$

<v-click>

This also generalises:

$$\frac{d}{dx}\ln(f(x)) = \frac{f'(x)}{f(x)}$$

</v-click>

---

# The derivative of a to the power x

By the properties of logarithms and indices we have

$$a^x = \left(e^{\ln a}\right)^x=e^{\left(x\cdot\ln a\right)}.$$

Thus, as we saw above we have:

$$\frac{d}{dx}a^x = \frac{d}{dx}e^{\left(x\cdot\ln a\right)} = e^{\left(x\cdot\ln a\right)}\frac{d}{dx}\left(x\cdot\ln a\right) =a^x\cdot\ln a$$

<v-click>

Similarly, in general:

$$\frac{d}{dx}a^{f(x)} = a^{f(x)}\cdot \ln a\cdot f'(x)$$

</v-click>

---

# SymPy example

Let's try and use SymPy to check the rule:

$$\frac{d}{dx}a^{f(x)} = a^{f(x)}\cdot \ln a\cdot f'(x)$$

<v-click>

```python
x, a = sp.symbols('x a') # declare the variables x and a
f = sp.Function('f')     # declare a function dependent on another variable
sp.diff(a**f(x),x)       # write the expression we wish to evaluate
```

$$a^{f{\left(x \right)}} \log{\left(a \right)} \frac{d}{d x} f{\left(x \right)}$$

(SymPy writes $\log$ for the natural logarithm, $\ln$.)

</v-click>

---

# The derivative of log to base a

Recall the conversion formula $\log_a x = \ln x / \ln a$ and note that $\ln a$ is a constant. Thus:

$$ {1|1-2|1-3|1-4}
\begin{aligned}
\frac{d}{dx}\log_a x &= \frac{d}{dx}\left(\frac{1}{\ln a}\cdot\ln x\right) \\
&= \left(\frac{1}{\ln a}\right)\cdot\frac{d}{dx}\ln x \\
&= \left(\frac{1}{\ln a}\right)\cdot\frac{1}{x} \\
&= \frac{1}{x\cdot\ln a}
\end{aligned}
$$

<v-click>

In general:

$$\frac{d}{dx}\log_a f(x) = \frac{f'(x)}{f(x)(\ln a)}$$

</v-click>

---

# SymPy example

Let's try and use SymPy again to check the rule:

$$\frac{d}{dx}\log_a f(x) = \frac{f'(x)}{f(x)(\ln a)}$$

<v-click>

```python
sp.diff(sp.log(f(x),a),x)
```

$$\frac{\frac{d}{d x} f{\left(x \right)}}{f{\left(x \right)} \log{\left(a \right)}}$$

</v-click>

---

# Further examples

**1.** Product rule: let $y = x^2\,e^x$. Then:

$$\frac{dy}{dx}=\frac{d}{dx}x^2e^x=\frac{d}{dx}x^2\cdot e^x+x^2\cdot\frac{d}{dx}e^x = (2x + x^2)e^x$$

<v-click>

**2.** Quotient rule: let $y = e^x/x$. Then:

$$\frac{dy}{dx}=\frac{\frac{d}{dx}e^x\cdot x - e^x\cdot \frac{d}{dx}x}{x^2}=\frac{e^x\cdot x - e^x\cdot 1}{x^2}=\frac{x - 1}{x^2}e^x$$

</v-click>

---

# Further examples

**3.** Chain rule: $y = e^{x^2}$. Then, letting $f(x) = x^2$:

$$\frac{d}{dx}e^{x^2} = e^{f(x)}f'(x) = e^{x^2}\cdot 2x$$

<v-click>

**4.** $y=\ln (x^2 + 1)$. Then, letting $f(x) = x^2+1$:

$$\frac{d}{dx}\ln(x^2+1) = \frac{f'(x)}{f(x)} = \frac{2x}{x^2+1}$$

</v-click>

---

# Further examples

**5.**

$$\frac{d}{dx}2^{x^3}=2^{x^3}\cdot\ln 2\cdot 3x^2$$

<v-click>

**6.**

$$\frac{d}{dx}10^{x^2+1}=10^{x^2+1}\cdot\ln 10\cdot 2x$$

</v-click>

<v-click>

**7.**

$$\frac{d}{dx}\log_{10}(7x+5)=\frac{7}{(7x+5)\cdot \ln10}$$

</v-click>

<v-click>

**8.**

$$\frac{d}{dx}\log_2(3^x+x^4)=\frac{3^x\cdot\ln3 + 4x^3}{\ln 2\cdot(3^x+x^4)}$$

</v-click>

---

# Partial differentiation

Functions of several variables.

**Definition:** Given a function $z=f(x,y)$ of two variables $x$ and $y$, the **partial derivative of $z$ with respect to $x$** is the function obtained by differentiating $f(x,y)$ with respect to $x$, holding $y$ constant.

We denote this using $\partial$ (a "curly" d, sometimes pronounced "del") as shown below:

$$\frac{\partial z}{\partial x}=\frac{\partial}{\partial x}f(x,y) = f_x(x,y)$$

---

# Partial differentiation: example 1

$$f(x,y)=z=x^2-2y^2$$

$$f_x=\frac{\partial z}{\partial x}=2x\qquad\text{and}\qquad f_y=\frac{\partial z}{\partial y}=-4y$$

---

# Partial differentiation: example 2

Let $z=3x^2y+5xy^2$. Then the partial derivative of $z$ with respect to $x$, holding $y$ fixed, is:

$$ {1|1-2|1-3}
\begin{aligned}
\frac{\partial z}{\partial x}&=\frac{\partial}{\partial x}\,\left(3x^2y+5xy^2\right) \\
&=3y\cdot 2x + 5y^2\cdot 1 \\
&=6xy+5y^2
\end{aligned}
$$

<v-click>

while the partial of $z$ with respect to $y$ holding $x$ fixed is:

$$\frac{\partial z}{\partial y}=\frac{\partial}{\partial y}\,\left(3x^2y+5xy^2\right) =3x^2\cdot 1 + 5x\cdot 2y = 3x^2+10xy$$

</v-click>

---

# Partial differentiation: in SymPy

In the previous slide we had:

$$\frac{\partial}{\partial x}\,\left(3x^2y+5xy^2\right) = 6xy+5y^2$$

Let's redo this in SymPy:

<v-click>

```python
x, y = sp.symbols('x y')
sp.diff(3*x**2*y + 5*x*y**2,x)
```

$$6 x y + 5 y^{2}$$

</v-click>

---

# Higher-order partial derivatives

Given $z = f(x,y)$ there are now four distinct possibilities for the second-order partial derivatives.

<div class="grid grid-cols-2 gap-x-8">
<div>

**1.** With respect to $x$ twice:

$$\frac{\partial}{\partial x}\left(\frac{\partial z}{\partial x}\right) =\frac{\partial^2z}{\partial x^2} =z_{xx}$$

</div>
<div>

**2.** With respect to $y$ twice:

$$\frac{\partial}{\partial y}\left(\frac{\partial z}{\partial y}\right) =\frac{\partial^2z}{\partial y^2} =z_{yy}$$

</div>
<div>

**3.** First with respect to $x$, then with respect to $y$:

$$\frac{\partial}{\partial y}\left(\frac{\partial z}{\partial x}\right) =\frac{\partial^2z}{\partial y\partial x} =z_{xy}$$

</div>
<div>

**4.** First with respect to $y$, then with respect to $x$:

$$\frac{\partial}{\partial x}\left(\frac{\partial z}{\partial y}\right) =\frac{\partial^2z}{\partial x\partial y} =z_{yx}$$

</div>
</div>

---

# Example: Laplace's equation

(Laplace's Equation for Equilibrium Temperature Distribution on a Copper Plate.)

Let $T(x,y)$ give the temperature at the point $(x,y)$.

According to a result of the French mathematician Pierre-Simon Laplace (1749 - 1827), at every point $(x,y)$ the second-order partials of $T$ must satisfy the equation

$$T_{xx} + T_{yy} = 0$$

---

# Example: Laplace's equation

The function $T(x,y)=y^2-x^2$ satisfies Laplace's equation:

First with respect to $x$:

$$T_x(x,y)=0-2x=-2x\qquad\text{so}\qquad T_{xx}(x,y)=-2$$

<v-click>

Then with respect to $y$:

$$T_y(x,y)=2y-0=2y\qquad\text{so}\qquad T_{yy}(x,y)=2$$

</v-click>

<v-click>

Finally:

$$T_{xx}(x,y)+T_{yy}(x,y) = 2 + (-2) = 0$$

which proves the result.

</v-click>

---

# Example: Laplace's equation

The function $z=x^2y - xy^2$ does _not_ satisfy Laplace's equation (and so cannot be a model for thermal equilibrium).

First note that

$$ {1|1-2|1-3|1-4}
\begin{aligned}
z_x &= 2xy - y^2 \\
z_{xx} &= 2y \\
z_y &= x^2 - 2xy \\
z_{yy} &= -2x
\end{aligned}
$$

<v-click>

Therefore:

$$z_{xx}+z_{yy}=2y-2x\ne 0$$

</v-click>

---

# Example: Laplace's equation in SymPy

We can verify this in SymPy like so:

```python
T1 = y**2 - x**2
sp.diff(T1, x, x) + sp.diff(T1, y, y)
```

$$0$$

and for the second function:

```python
T2 = x**2*y - x*y**2
sp.diff(T2, x, x) + sp.diff(T2, y, y)
```

$$- 2 x + 2 y$$

---

# A note on the mixed partials

For almost any function you will meet, $f_{xy}=f_{yx}$, so it does not matter in which order we take the partial derivatives.

---

# Mixed partials: example

Let $z = x^2y^3+3x^2-2y^4$. Then $z_x=2xy^3+6x$ and $z_y = 3x^2y^2-8y^3$.

Taking the partial of $z_x$ with respect to $y$ we get

$$z_{xy}=\frac{\partial}{\partial y}\left(2xy^3+6x\right)=6xy^2$$

<v-click>

Taking the partial of $z_y$ with respect to $x$ we get the same thing:

$$z_{yx}=\frac{\partial}{\partial x}\left(3x^2y^2-8y^3\right)=6xy^2$$

</v-click>

---

# Mixed partials: example

So the operators $\partial/\partial x$ and $\partial/\partial y$ are **commutative**:

$$\text{i.e.} \qquad \frac{\partial}{\partial x}\left(\frac{\partial z}{\partial y}\right) = \frac{\partial}{\partial y}\left(\frac{\partial z}{\partial x}\right)$$
