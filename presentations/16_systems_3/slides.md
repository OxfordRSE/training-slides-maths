---
theme: oxrse
title: Systems of differential equations 3
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

# Why stability?

In lecture 11 we decided whether a steady state $s^*$ of $ds/dt = f(s)$ is stable from the slope $f'(s^*)$.

In lecture 14 we saw that the solution of a linear system is a sum of eigenvectors, each growing or shrinking at a rate set by its eigenvalue.
In lecture 15 we found the fixed points of a nonlinear system from its nullclines.

In this lecture we put these together: close to a fixed point, a nonlinear system behaves like a linear one, so eigenvalues tell us whether each fixed point is stable, and so where the system ends up.

---
layout: two-cols
---

# The example from lecture 15

$$
\begin{aligned}
\dot{x} &= x(1-x) -xy,\\
\dot{y} &= y(2-y) - 3xy,
\end{aligned}
$$

where $y(2-y)$ is the same as lecture 15's $2y(1-y/2)$.

Its nullclines cross at four fixed points: $(0, 0)$, $(1, 0)$, $(0, 2)$ and $(1/2, 1/2)$.

Which of them do solutions settle at, and why?

::right::

<PlotFigure name="phase-plane" :height="420" :sliders="false" :params="{ stability: false, extra: false }" />

---

# Linear systems: decoupled

The decoupled ODE system

$$
\begin{aligned}
\dot{x} &= \lambda_1 x,\\
\dot{y} &= \lambda_2 y,
\end{aligned}
$$

has a **fixed point** or **steady state** where $\dot{x}=\dot{y}=0$, at the origin.

<v-click>

Solutions look like $x=Ae^{\lambda_1 t}$ and $y=Be^{\lambda_2 t}$, and thus grow exponentially or shrink exponentially depending on the signs of $\lambda_1$ and $\lambda_2$.

</v-click>

<v-click>

If $\lambda_1 < 0$ and $\lambda_2 < 0$, then all the flow is towards the fixed point.
If $\lambda_1$ or $\lambda_2$ is positive, then some flow will be driven away (towards infinity).

</v-click>

---

# Linear systems: shifting the fixed point

Adding in a constant (inhomogeneous) component shifts the fixed point away from the origin.
Where is the fixed point of

$$
\begin{aligned}
\dot{x} &= \lambda_1 x + 10,\\
\dot{y} &= \lambda_2 y + 10?
\end{aligned}
$$

<v-click>

At the fixed point $\dot{x} = \dot{y} = 0$, so it is at

$$x = -\frac{10}{\lambda_1}, \qquad y = -\frac{10}{\lambda_2}.$$

The solutions behave in the same way as before, but around this point instead of the origin.

</v-click>

---

# Linear systems: coupling

Coupling the system has the effect of altering the principal directions over which the exponential terms apply (**changing the basis**).
This means that the **homogeneous** linear system

$$
\begin{aligned}
\dot{x} &= a x + b y,\\
\dot{y} &= c x + d y,
\end{aligned}
$$

has a fixed point at the origin.

<v-click>

As in lecture 14, its solution is

$$\mathbf{x} = c_1\mathbf{v}_1 e^{\lambda_1 t} + c_2\mathbf{v}_2 e^{\lambda_2 t},$$

where $\lambda_1$, $\lambda_2$ and $\mathbf{v}_1$, $\mathbf{v}_2$ are the eigenvalues and eigenvectors of the matrix $A = \left(\begin{matrix} a & b \\ c & d \end{matrix}\right)$.
So the long-term growth or shrinkage of solutions over time is determined by the eigenvalues, along the eigenvectors.

</v-click>

---

# Linear systems: inhomogeneous

More generally, the **inhomogeneous** linear system

$$
\begin{aligned}
\dot{x} &= a x + b y + p,\\
\dot{y} &= c x + d y + q,
\end{aligned}
$$

can be written

$$
\left(\begin{matrix} \dot{x} \\ \dot{y} \end{matrix}\right)
=
\left(\begin{matrix} a & b \\ c & d \end{matrix}\right)
\left(\begin{matrix} x \\ y \end{matrix}\right)
+
\left(\begin{matrix} p \\ q \end{matrix}\right).
$$

<v-click>

It has a fixed point at

$$
\left(\begin{matrix} x \\ y \end{matrix}\right)
=
-\left(\begin{matrix} a & b \\ c & d \end{matrix}\right)^{-1}
\left(\begin{matrix} p \\ q \end{matrix}\right).
$$

The long-term growth or shrinkage of solutions over time is again determined by the eigenvalues of the matrix.

</v-click>

---

# Linear phase portraits

<div class="grid grid-cols-[2fr_3fr] gap-8">
<div>

Move the sliders to change the entries of

$$A = \left(\begin{matrix} a & b \\ c & d \end{matrix}\right).$$

<v-click>

When the eigenvalues are real, the dashed lines are the eigenvector directions, and solutions grow or shrink along them.

</v-click>

<v-click>

When they are complex, the solutions turn around the fixed point: they spiral in if the real part is negative, and out if it is positive.

</v-click>

<v-click>

It starts at lecture 14's matrix, and the buttons show other examples.

</v-click>

</div>
<div>

<PlotFigure name="linear-portrait" :height="440" />

</div>
</div>

---

# Nonlinear systems: linearisation

A more general two-dimensional nonlinear system is

$$
\begin{aligned}
\dot{x} &= f(x,y),\\
\dot{y} &= g(x,y),
\end{aligned}
$$

where $f$ and $g$ can be any functions whatever.

<v-click>

We can write a polynomial (Taylor) expansion for the system when it is close to a fixed point $(x^*, y^*)$, with the partial derivatives evaluated at $(x^*, y^*)$:

$$
\begin{aligned}
\dot{x} &= f(x^*,y^*) + \frac{\partial f}{\partial x}(x-x^*) + \frac{\partial f}{\partial y}(y-y^*) + \ldots,\\
\dot{y} &= g(x^*,y^*) + \frac{\partial g}{\partial x}(x-x^*) + \frac{\partial g}{\partial y}(y-y^*) + \ldots
\end{aligned}
$$

</v-click>

<v-click>

At a fixed point $f(x^*,y^*)=g(x^*,y^*)=0$, so the first terms drop out.

</v-click>

---

# Nonlinear systems: the Jacobian

So, close to the fixed point:

$$
\def\arraystretch{1.8}\left(\begin{matrix} \dot{x} \\ \dot{y} \end{matrix}\right)
\approx
\left(\begin{matrix} \frac{\partial f}{\partial x} & \frac{\partial f}{\partial y} \\ \frac{\partial g}{\partial x} & \frac{\partial g}{\partial y} \end{matrix}\right)
\left(\begin{matrix} x-x^* \\ y-y^* \end{matrix}\right).
$$

<v-click>

This means that (really close to the fixed point) we can approximate with a linear system.
The eigenvalues $\lambda_1$, $\lambda_2$ of the **Jacobian** matrix

$$
\def\arraystretch{1.8}J = \left(\begin{matrix} \frac{\partial f}{\partial x} & \frac{\partial f}{\partial y} \\ \frac{\partial g}{\partial x} & \frac{\partial g}{\partial y} \end{matrix}\right)
$$

will determine if a small perturbation away from $(x^*, y^*)$ will decay or grow.

</v-click>

<v-click>

$J$ plays the part that the slope $f'(s^*)$ played in lecture 11.

</v-click>

---

# Steady state classification

A fixed point is **stable** if every eigenvalue of $J$ has a negative real part, and **unstable** if any has a positive real part.

- $\lambda_1<\lambda_2<0$: stable node
- $\lambda_1=\lambda_2<0$: stable star if $J$ is a multiple of $I$, otherwise a stable degenerate node
- $\lambda_1>\lambda_2>0$: unstable node
- $\lambda_1=\lambda_2>0$: unstable star or unstable degenerate node
- $\lambda_1<0<\lambda_2$: saddle (or hyperbolic) point, unstable
- Complex $\lambda$: spiral (with the real part determining stability)
- Imaginary $\lambda$: centre (solutions cycle round the fixed point)

---

# Steady state classification: eigenvalues of J

$$
\def\arraystretch{1.8}|J-\lambda I| = \left|
\begin{matrix} \frac{\partial f}{\partial x}-\lambda & \frac{\partial f}{\partial y} \\ \frac{\partial g}{\partial x} & \frac{\partial g}{\partial y}-\lambda \end{matrix}\right|
= \left(\frac{\partial f}{\partial x}-\lambda\right)\left(\frac{\partial g}{\partial y}-\lambda\right)-\frac{\partial f}{\partial y}\frac{\partial g}{\partial x}
$$

<v-click>

So eigenvalues $\lambda$ satisfy

$$
\lambda^2 - \lambda\left(\frac{\partial f}{\partial x} + \frac{\partial g}{\partial y}\right) + \frac{\partial f}{\partial x}\frac{\partial g}{\partial y} - \frac{\partial f}{\partial y}\frac{\partial g}{\partial x} = 0,
$$

</v-click>

<v-click>

or

$$
\lambda^2 - \tau\lambda + \Delta = 0, \quad \text{where} \quad \tau=\text{tr}(J) \quad \text{and} \quad \Delta = \det(J)
$$

(this $\tau$ is not the time scale from lecture 15).

</v-click>

---

# Steady state classification: trace and determinant

Solving the quadratic,

$$\lambda = \frac{\tau \pm \sqrt{\tau^2 - 4\Delta}}{2}.$$

<v-click>

So, from the trace and determinant alone:

</v-click>

<v-clicks at="+0">

- $\Delta < 0$: the eigenvalues have opposite signs, a saddle
- $\Delta > 0$ and $\tau < 0$: stable
- $\Delta > 0$ and $\tau > 0$: unstable
- $\tau^2 < 4\Delta$: complex $\lambda$, a spiral

</v-clicks>

---

# Steady state classification: the trace-determinant plane

<PlotFigure name="trace-determinant" :height="430" />

---

# Example: the Jacobian

$$
\begin{aligned}
\dot{x} &= x(1-x) -xy &&= f(x, y),\\
\dot{y} &= y(2-y) - 3xy &&= g(x, y).
\end{aligned}
$$

<v-click>

Differentiating each with respect to $x$ and $y$:

$$
\def\arraystretch{1.8}J = \left(\begin{matrix} \frac{\partial f}{\partial x} & \frac{\partial f}{\partial y} \\ \frac{\partial g}{\partial x} & \frac{\partial g}{\partial y} \end{matrix}\right) = \left(\begin{matrix} 1-2x-y & -x \\ -3y & 2-3x-2y \end{matrix}\right)
$$

</v-click>

<v-click>

Now we evaluate $J$ at each fixed point in turn.

</v-click>

---

# Example: the fixed points (0, 0) and (1/2, 1/2)

At $(0,0)$:

$$
J_{(0,0)} = \left(\begin{matrix} 1 & 0 \\ 0 & 2 \end{matrix}\right), \qquad \tau = 3, \quad \Delta = 2
\quad\implies\quad \lambda_1 = 1, \quad \lambda_2 = 2 \qquad\text{(unstable node)}
$$

<v-click>

At $(1/2,1/2)$:

$$
\def\arraystretch{1.8}J_{(1/2,1/2)} = \left(\begin{matrix} -\frac{1}{2} & -\frac{1}{2} \\ -\frac{3}{2} & -\frac{1}{2} \end{matrix}\right), \qquad \tau = -1, \quad \Delta = -\frac{1}{2}
$$

</v-click>

<v-click>

$\Delta < 0$, so this is a saddle.
Solving $\lambda^2 + \lambda - 1/2 = 0$,

$$\lambda_\pm = -\frac{1}{2} \pm \frac{\sqrt{3}}{2}.$$

</v-click>

---
layout: exercise
---

# Exercise: stability

Using

$$
J = \left(\begin{matrix} 1-2x-y & -x \\ -3y & 2-3x-2y \end{matrix}\right),
$$

find the stability of the fixed points $(1, 0)$ and $(0, 2)$.

::work::

---

# Example: the fixed points (1, 0) and (0, 2)

At $(1,0)$:

$$
J_{(1,0)} = \left(\begin{matrix} -1 & -1 \\ 0 & -1 \end{matrix}\right), \qquad \tau = -2, \quad \Delta = 1
\quad\implies\quad \lambda_1 = \lambda_2 = -1
$$

<v-click>

This is stable.
$J$ is not a multiple of $I$ (it has only one eigenvector direction), so it is a stable degenerate node.

</v-click>

<v-click>

At $(0,2)$:

$$
J_{(0,2)} = \left(\begin{matrix} -1 & 0 \\ -6 & -2 \end{matrix}\right), \qquad \tau = -3, \quad \Delta = 2
\quad\implies\quad \lambda_1 = -1, \quad \lambda_2 = -2 \qquad\text{(stable node)}
$$

</v-click>

---
layout: two-cols
---

# Example: the phase plane

The stable fixed points $(1, 0)$ and $(0, 2)$ are filled, and the unstable ones are open.

<v-click>

The dashed line is the **separatrix**: the solutions that come into the saddle along its stable eigenvector, $(1, \sqrt{3})$.

</v-click>

<v-click>

Solutions that start on one side of it go to $(1, 0)$, and on the other side to $(0, 2)$.
Move the sliders to try starting points close to it.

</v-click>

::right::

<PlotFigure name="phase-plane" :height="400" />

---

# Summary

1. Linear systems: the eigenvalues of $A$ decide whether solutions grow or shrink, along its eigenvectors.
2. Nonlinear systems: close to a fixed point, the system behaves like a linear one with matrix $J$, the Jacobian, evaluated at the fixed point.
3. A fixed point is stable if every eigenvalue of $J$ has a negative real part, and the trace and determinant of $J$ give its type quickly.
4. The stable fixed points, and the separatrices between them, tell us where a system ends up.
