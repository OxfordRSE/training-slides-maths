---
theme: oxrse
title: Systems of differential equations 1
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

# Linear systems

Our aim is to solve systems of equations of the form

$$\frac{dy_i}{dt} = f_i(y_1,\ldots,y_n,t),$$

for $i=1,\ldots,n$.

Let us first consider the simplest form: a $2\times2$ **linear** system

$$
\begin{aligned}
\frac{dx}{dt} &= ax+by,\\
\frac{dy}{dt} &= cx+dy.
\end{aligned}
$$

---

# Motivation

- Lotka-Volterra (predator-prey)
- SIR model (epidemics)
- Chemical reaction networks
- Heart cell dynamics

In order to understand these systems, we must first understand coupled linear systems.

---

# Recap of eigenvalues

$$A = \left(\begin{matrix} 1 & 1\\2 & 0 \end{matrix}\right)$$

```python
A = sp.Matrix([[1, 1], [2, 0]])
A.eigenvals()
```

<v-click>

$$\left\{ -1 : 1, \  2 : 1\right\}$$

</v-click>

---

# Recap of eigenvectors

$$A = \left(\begin{matrix} 1 & 1\\2 & 0 \end{matrix}\right)$$

```python
A.eigenvects()
```

<v-click>

$$\def\arraystretch{1.8}\left[ \left( -1, \  1, \  \left[ \left[\begin{matrix}- \frac{1}{2}\\1\end{matrix}\right]\right]\right), \  \left( 2, \  1, \  \left[ \left[\begin{matrix}1\\1\end{matrix}\right]\right]\right)\right]$$

</v-click>

---

# Recap of diagonalisation

Recall that, for a matrix $A$ with **eigenvectors** $\mathbf{v}_1$ and $\mathbf{v}_2$, and **eigenvalues** $\lambda_1$ and $\lambda_2$, we can write a matrix of eigenvectors $P = \left(\begin{matrix} \mathbf{v}_1 & \mathbf{v}_2 \end{matrix}\right)$.
Then

$$A = P \left(\begin{matrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{matrix}\right) P^{-1}.$$

(This is also true for general $n \times n$ matrices.)

In our example,

$$P = \left(\begin{matrix} -\frac{1}{2} & 1 \\ 1 & 1 \end{matrix}\right),\qquad\lambda_1 = -1,\qquad\lambda_2=2.$$

---

# Coupled ODEs

For a coupled system of first order linear differential equations of the form

$$
\begin{aligned}
\frac{dx}{dt} &= ax+by,\\
\frac{dy}{dt} &= cx+dy,
\end{aligned}
$$

we have three methods of analysing them mathematically:

1. Turn them into one second order equation (if we can solve second order!)
2. Divide one by the other, to get one equation independent of $t$
3. Perform matrix diagonalisation (extends to $n \times n$ problems)

---

# Example

Solve

$$
\begin{aligned}
\frac{dx}{dt} &= x+y,\\
\frac{dy}{dt} &= 2x,
\end{aligned}
$$

subject to

$$
\begin{aligned}
x(0) &= 0,\\
y(0) &= 3.
\end{aligned}
$$

---

# Method 1: second order

We start with

$$
\begin{aligned}
\frac{dx}{dt} &= x+y,\\
\frac{dy}{dt} &= 2x.
\end{aligned}
$$

<v-click>

We can convert that into a second order equation:

$$
\frac{d^2x}{dt^2}
=
\frac{dx}{dt} + \frac{dy}{dt}
=
\frac{dx}{dt} + 2x
\qquad\implies\qquad
\boxed{\frac{d^2x}{dt^2}
=
\frac{dx}{dt} + 2x}
$$

</v-click>

---

# Method 2: eliminate t

We start with

$$
\begin{aligned}
\frac{dx}{dt} &= x+y,\\
\frac{dy}{dt} &= 2x.
\end{aligned}
$$

<v-click>

Then, dividing:

$$
\frac{dy}{dx}
=
\frac{dy/dt}{dx/dt}
\qquad\implies\qquad
\boxed{\frac{dy}{dx}
=
\frac{2x}{x+y}}
$$

</v-click>

---

# Method 3: diagonalisation

Let

$$\mathbf{v}=\left(\begin{matrix}x\\y\end{matrix}\right),$$

then

$$
\frac{dx}{dt} = x+y,\quad
\frac{dy}{dt} = 2x \qquad\implies\qquad \boxed{\frac{d\mathbf{v}}{dt} = A\mathbf{v},}
$$

where

$$A = \left(\begin{matrix} 1 & 1\\2 & 0 \end{matrix}\right).$$

---

# Diagonalisation: substitution

Substitute

$$A = P \left(\begin{matrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{matrix}\right) P^{-1},$$

<v-click>

then

$$\frac{d\mathbf{v}}{dt} = P \left(\begin{matrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{matrix}\right) \left( P^{-1}\mathbf{v} \right)$$

</v-click>

<v-click>

or

$$\frac{d}{dt}(P^{-1} \mathbf{v}) = \left(\begin{matrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{matrix}\right) \left( P^{-1}\mathbf{v} \right).$$

</v-click>

---

# Diagonalisation: uncoupling

We can now introduce a new variable

$$\mathbf{z} = \left(\begin{matrix} z_1 \\ z_2\end{matrix}\right) = P^{-1} \mathbf{v}$$

so that

$$\frac{d\mathbf{z}}{dt} = \left(\begin{matrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{matrix}\right) \mathbf{z}.$$

<v-click>

But now, because the matrix is diagonal, the system is no longer coupled.
The first equation **only** involves $z_1$ and the second **only** involves $z_2$, so we can solve each one individually:

$$\frac{dz_1}{dt} = \lambda_1 z_1 \qquad\implies\qquad z_1(t) = A\,e^{\lambda_1 t}$$

$$\frac{dz_2}{dt} = \lambda_2 z_2 \qquad\implies\qquad z_2(t) = B\,e^{\lambda_2 t}$$

</v-click>

---

# Diagonalisation: back to x and y

Finally, we can substitute $z_1$ and $z_2$ back in terms of $x$ and $y$ to find the solution to the original coupled system.
We have

$$\mathbf{z} = \left(\begin{matrix} z_1 \\ z_2\end{matrix}\right) = P^{-1} \mathbf{v} = \frac{1}{3}\left(\begin{matrix} -2 & 2 \\ 2 & 1 \end{matrix}\right) \left(\begin{matrix} x \\ y\end{matrix}\right) = \left(\begin{matrix} A\,e^{\lambda_1 t} \\ B\,e^{\lambda_2 t}\end{matrix}\right)$$

<v-click>

Rearranging, we now have two equations relating $x$ and $y$:

$$
\begin{aligned}
-2x + 2y &= C\,e^{\lambda_1 t},\\
2x + y &= D\,e^{\lambda_2 t},
\end{aligned}
$$

where $C=3A$ and $D=3B$.

</v-click>

---

# Diagonalisation: the solution

$$
\begin{aligned}
-2x + 2y &= C\,e^{\lambda_1 t},\\
2x + y &= D\,e^{\lambda_2 t}.
\end{aligned}
$$

Using our initial conditions, $x(0)=0$ and $y(0)=3$, we find $C=6$ and $D=3$.

<v-click>

Finally, solving the simultaneous equations, we have a solution:

$$
\begin{aligned}
x(t) &= -e^{\lambda_1 t} + e^{\lambda_2 t},\\
y(t) &= 2e^{\lambda_1 t} + e^{\lambda_2 t}.
\end{aligned}
$$

</v-click>

---

# Summary

- Three methods to analytically solve systems of linear first order ODEs
- Best method depends on the system and what you need to ask about it
