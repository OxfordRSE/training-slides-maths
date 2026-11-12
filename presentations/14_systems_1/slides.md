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

# Why systems of differential equations?

In lectures 09 to 11 we solved differential equations for a single quantity, such as a population or a concentration.

Most biological systems have several quantities that change together, each affecting the others: predators and prey (Lotka-Volterra), the susceptible, infected and recovered in an epidemic (the SIR model), the species in a network of chemical reactions, or the ion channels in a heart cell.
These give **systems** of differential equations.

In order to understand these systems, we must first understand coupled linear systems.
In this lecture we solve them using the eigenvalues and eigenvectors from lecture 13, and in lectures 15 and 16 we use them to understand nonlinear systems.

---

# Recap: eigenvalues and eigenvectors

$$A = \left(\begin{matrix} 1 & 1\\2 & 0 \end{matrix}\right)$$

```python
A = sp.Matrix([[1, 1], [2, 0]])
A.eigenvals()
```

<v-click>

$$\left\{ -1 : 1, \  2 : 1\right\}$$

</v-click>

```python
A.eigenvects()
```

<v-click>

$$\def\arraystretch{1.8}\left[ \left( -1, \  1, \  \left[ \left[\begin{matrix}- \frac{1}{2}\\1\end{matrix}\right]\right]\right), \  \left( 2, \  1, \  \left[ \left[\begin{matrix}1\\1\end{matrix}\right]\right]\right)\right]$$

</v-click>

---

# Recap: diagonalisation

Recall that if a matrix $A$ has **eigenvectors** $\mathbf{v}_1$ and $\mathbf{v}_2$, with **eigenvalues** $\lambda_1$ and $\lambda_2$, then with the eigenvectors in the columns of $P$ and the eigenvalues on the diagonal of $D$,

$$A = PDP^{-1}, \qquad P = \left(\begin{matrix} \mathbf{v}_1 & \mathbf{v}_2 \end{matrix}\right), \qquad D = \left(\begin{matrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{matrix}\right).$$

(This is also true for general $n \times n$ matrices with a full set of eigenvectors.)

In our example,

$$P = \left(\begin{matrix} -\frac{1}{2} & 1 \\ 1 & 1 \end{matrix}\right),\qquad D = \left(\begin{matrix} -1 & 0 \\ 0 & 2 \end{matrix}\right).$$

---

# Coupled ODEs

A coupled system of first order linear differential equations has the form

$$
\begin{aligned}
\frac{dx}{dt} &= ax+by,\\
\frac{dy}{dt} &= cx+dy.
\end{aligned}
$$

<v-click>

We have three methods of analysing them mathematically:

</v-click>

<v-clicks at="+0">

1. Turn them into one second order equation
2. Divide one by the other, to get one equation independent of $t$
3. Perform matrix diagonalisation (extends to $n \times n$ problems)

</v-clicks>

---
class: centred
---

# Example

Solve the system on the left, subject to the initial conditions on the right:

<div class="text-2xl">

$$
\begin{aligned}
\frac{dx}{dt} &= x+y, &\qquad\qquad x(0) &= 0,\\
\frac{dy}{dt} &= 2x, & y(0) &= 3.
\end{aligned}
$$

</div>

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

Differentiate the first equation, and use the second to replace $dy/dt$:

$$
\frac{d^2x}{dt^2}
=
\frac{dx}{dt} + \frac{dy}{dt}
=
\frac{dx}{dt} + 2x.
$$

</v-click>

<v-click>

This is one second order equation for $x$ alone.
Once we have found $x$, the first equation gives $y = dx/dt - x$.

</v-click>

---
layout: aside
---

# Aside: solving the second order equation

In this equation, $x$ and its derivatives are only multiplied by constants, so we can try a solution of the form $x = e^{\lambda t}$.

<v-click>

Substitute it in, and divide by $e^{\lambda t}$ (which is never zero):

$$ {1|1-2|1-3}
\begin{aligned}
\lambda^2 e^{\lambda t} &= \lambda e^{\lambda t} + 2e^{\lambda t} \\
\lambda^2 - \lambda - 2 &= 0 \\
(\lambda + 1)(\lambda - 2) &= 0
\end{aligned}
$$

</v-click>

<v-click>

So $\lambda = -1$ or $\lambda = 2$.
These are the eigenvalues of $A$, because $|A - \lambda I| = 0$ is the same equation:

$$
|A - \lambda I| = \left|\begin{matrix} 1-\lambda & 1 \\ 2 & -\lambda \end{matrix}\right| = \lambda^2 - \lambda - 2.
$$

</v-click>

---
layout: aside
---

# Aside: solving the second order equation

Any sum of the two solutions is also a solution, so the general solution is

$$x = K_1 e^{-t} + K_2 e^{2t}.$$

<v-click>

Two constants need two conditions.
We have $x(0) = 0$, and from the first equation $dx/dt = x + y = 3$ at $t = 0$:

$$
K_1 + K_2 = 0, \qquad -K_1 + 2K_2 = 3,
$$

so $K_1 = -1$ and $K_2 = 1$.

</v-click>

<v-click>

So $x = e^{2t} - e^{-t}$, and $y = dx/dt - x = e^{2t} + 2e^{-t}$.

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

Then, dividing one by the other:

$$
\frac{dy}{dx}
=
\frac{dy/dt}{dx/dt}
\qquad\implies\qquad
\frac{dy}{dx}
=
\frac{2x}{x+y}.
$$

</v-click>

<v-click>

This one equation describes the paths that the solutions follow in the $(x, y)$ plane, but not how fast they move along them.

</v-click>

<v-click>

This method is most useful when the new equation is separable.
Here it is not (the course material shows how to solve it).

</v-click>

---
layout: exercise
---

# Exercise: eliminating t

Eliminate $t$ from the system

$$
\frac{dx}{dt} = -y, \qquad \frac{dy}{dt} = 4x,
$$

to find the paths that its solutions follow in the $(x, y)$ plane.

Which way round do they go?

::work::

---
layout: two-cols
---

# Eliminating t: ellipses

Dividing, $dy/dx = -4x/y$, which is separable:

$$ {1|1-2|1-3}
\begin{aligned}
\int y\,dy &= -\int 4x\,dx \\
\frac{1}{2}y^2 &= -2x^2 + c \\
4x^2 + y^2 &= C
\end{aligned}
$$

<v-click>

where $C = 2c$.
These are ellipses, one for each value of $C$.

</v-click>

<v-click>

At $(1, 0)$, $dy/dt = 4 > 0$, so the solutions go round anticlockwise.

</v-click>

::right::

<PlotFigure v-click name="ellipses" :height="420" />

---

# Method 3: diagonalisation

Let

$$\mathbf{x}=\left(\begin{matrix}x\\y\end{matrix}\right).$$

<v-click>

Then

$$
\frac{dx}{dt} = x+y,\quad
\frac{dy}{dt} = 2x \qquad\implies\qquad \frac{d\mathbf{x}}{dt} = A\mathbf{x},
$$

where $A$ is the matrix from the recap:

$$A = \left(\begin{matrix} 1 & 1\\2 & 0 \end{matrix}\right).$$

</v-click>

---

# Diagonalisation: substitution

Substitute $A = PDP^{-1}$:

$$\frac{d\mathbf{x}}{dt} = PDP^{-1}\mathbf{x}.$$

<v-click>

Multiply both sides on the left by $P^{-1}$:

$$P^{-1}\frac{d\mathbf{x}}{dt} = DP^{-1}\mathbf{x}.$$

</v-click>

<v-click>

$P^{-1}$ is a matrix of constants, so it can move inside the derivative:

$$\frac{d}{dt}\left(P^{-1}\mathbf{x}\right) = D\left(P^{-1}\mathbf{x}\right).$$

</v-click>

---

# Diagonalisation: uncoupling

We can now introduce a new variable $\mathbf{z} = P^{-1}\mathbf{x}$, so that

$$
\frac{d\mathbf{z}}{dt} = D\mathbf{z}, \qquad\text{or}\qquad
\frac{d}{dt}\left(\begin{matrix} z_1 \\ z_2\end{matrix}\right) = \left(\begin{matrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{matrix}\right) \left(\begin{matrix} z_1 \\ z_2\end{matrix}\right).
$$

<v-click>

But now, because the matrix is diagonal, the system is no longer coupled.
The first equation **only** involves $z_1$ and the second **only** involves $z_2$, so we can solve each one individually:

$$
\begin{aligned}
\frac{dz_1}{dt} &= \lambda_1 z_1 &&\implies\qquad z_1 = c_1 e^{\lambda_1 t},\\
\frac{dz_2}{dt} &= \lambda_2 z_2 &&\implies\qquad z_2 = c_2 e^{\lambda_2 t}.
\end{aligned}
$$

</v-click>

---

# Diagonalisation: back to x and y

Finally, we can substitute back to find the solution of the original coupled system.
Since $\mathbf{z} = P^{-1}\mathbf{x}$, we have $\mathbf{x} = P\mathbf{z}$, and the columns of $P$ are the eigenvectors:

$$ {1|1-2}
\begin{aligned}
\mathbf{x} = P\mathbf{z} &= \left(\begin{matrix} \mathbf{v}_1 & \mathbf{v}_2 \end{matrix}\right) \left(\begin{matrix} z_1 \\ z_2\end{matrix}\right) = z_1\mathbf{v}_1 + z_2\mathbf{v}_2 \\
&= c_1\mathbf{v}_1 e^{\lambda_1 t} + c_2\mathbf{v}_2 e^{\lambda_2 t}
\end{aligned}
$$

<v-click>

So the solution is a sum of the eigenvectors, each growing or shrinking at a rate set by its eigenvalue.
In our example,

$$
\def\arraystretch{1.4}\left(\begin{matrix} x \\ y \end{matrix}\right) = c_1\left(\begin{matrix} -\frac{1}{2} \\ 1 \end{matrix}\right) e^{-t} + c_2\left(\begin{matrix} 1 \\ 1 \end{matrix}\right) e^{2t}.
$$

</v-click>

---

# Diagonalisation: the solution

Using our initial conditions, $x(0)=0$ and $y(0)=3$, at $t = 0$:

$$
\def\arraystretch{1.4}\left(\begin{matrix} 0 \\ 3 \end{matrix}\right) = c_1\left(\begin{matrix} -\frac{1}{2} \\ 1 \end{matrix}\right) + c_2\left(\begin{matrix} 1 \\ 1 \end{matrix}\right).
$$

<v-click>

So $-c_1/2 + c_2 = 0$ and $c_1 + c_2 = 3$, which gives $c_1 = 2$ and $c_2 = 1$.

</v-click>

<v-click>

Finally, we have a solution:

$$
\begin{aligned}
x(t) &= -e^{-t} + e^{2t},\\
y(t) &= 2e^{-t} + e^{2t}.
\end{aligned}
$$

This is the same solution that method 1 gave.

</v-click>

---
layout: two-cols
---

# The solution in the (x, y) plane

The grey arrows show the direction of $(dx/dt, dy/dt)$ at each point, and the dashed lines are the directions of the two eigenvectors.

<v-click>

Going back in time, the $e^{-t}$ term is the largest, so the solution comes in along $\mathbf{v}_1$.

</v-click>

<v-click>

As $t$ grows, the $e^{2t}$ term takes over, and the solution heads out along $\mathbf{v}_2$.

</v-click>

::right::

<PlotFigure name="trajectories" :height="430" />

---

# Checking with SymPy

SymPy can solve the system, initial conditions included:

```python
t = sp.symbols('t')
x, y = sp.symbols('x y', cls=sp.Function)
eqs = [sp.Eq(x(t).diff(t), x(t) + y(t)), sp.Eq(y(t).diff(t), 2 * x(t))]
sp.dsolve(eqs, ics={x(0): 0, y(0): 3})
```

<v-click>

$$\left[ x{\left(t \right)} = e^{2 t} - e^{- t}, \  y{\left(t \right)} = e^{2 t} + 2 e^{- t}\right]$$

</v-click>

<v-click>

which agrees with our solution.

</v-click>

---

# Summary

1. A coupled system of linear first order differential equations can be solved by turning it into one second order equation, by eliminating $t$ (which gives the paths of the solutions, but not their timing), or by diagonalisation.
2. Diagonalisation extends to $n \times n$ systems, and gives the solution as a sum of the eigenvectors, $\mathbf{x} = c_1\mathbf{v}_1 e^{\lambda_1 t} + c_2\mathbf{v}_2 e^{\lambda_2 t}$, so the eigenvalues set how fast each part grows or shrinks.
3. The best method depends on the system and on what we need to ask about it.
4. In Python, SymPy's `dsolve` solves a system, and can check our answers.
