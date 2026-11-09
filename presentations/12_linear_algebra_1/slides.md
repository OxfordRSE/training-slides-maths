---
theme: oxrse
title: Linear algebra 1
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

# Why matrices?

Many problems give us several equations that must all hold at once, e.g. the steady state of a model with several interacting chemicals or species, or the currents in a circuit.

Matrices let us write any number of linear equations as a single equation, $A\mathbf{x} = \mathbf{b}$, and solve them all in the same way: by hand for small systems, and with Python for large ones.

In this lecture we learn how to add, multiply and invert matrices, and use them to solve simultaneous equations.

---

# Simultaneous equations

Consider 2 simultaneous equations:

$$
\begin{aligned}
a_1x+b_1y &= c_1, \quad (1)\\
a_2x+b_2y &= c_2, \quad (2)
\end{aligned}
$$

where the values $x$ and $y$ are to be found, and $a_1$, $b_1$, $a_2$, $b_2$, $c_1$ and $c_2$ are given constants.

<v-click>

$$ {1|1-2|1-3}
\begin{aligned}
(1) \times b_2: &\qquad b_2a_1x+b_2b_1y = b_2c_1, \quad (3)\\
(2) \times b_1: &\qquad b_1a_2x+b_1b_2y = b_1c_2, \quad (4)\\
(3) - (4): &\qquad (a_1b_2-a_2b_1)x = b_2c_1-b_1c_2.
\end{aligned}
$$

</v-click>

---

# Simultaneous equations

Thus:

$$x=\frac{b_2c_1-b_1c_2}{a_1b_2-a_2b_1},$$

<v-click>

and similarly:

$$y=\frac{a_1c_2-a_2c_1}{a_1b_2-a_2b_1}.$$

</v-click>

<v-click>

This works, provided that $a_1b_2-a_2b_1\neq 0$.

</v-click>

<v-click>

While the algebraic manipulation is straightforward when solving two equations, it can get really messy when solving large systems.
What we want is a way to be able to easily manipulate **linear** systems, regardless of how big they are.

</v-click>

---
layout: two-cols
---

# Two equations, two lines

Each equation is a straight line in the $(x, y)$ plane, and the solution is the point where the two lines cross.

<v-click>

e.g. $x + 5y = 11$ and $ax + 5y = 9$, for which $a_1b_2-a_2b_1 = 5 - 5a$.

</v-click>

<v-click>

When $a = 1$ this is zero: the lines are parallel and never cross, so there is no solution.
(If the two lines were the same, there would be infinitely many.)

</v-click>

::right::

<PlotFigure name="two-lines" :height="340" />

---

# The matrix

Matrices are a structure that allow us to more easily manipulate linear systems.

Consider the original system

$$
\begin{aligned}
a_1x+b_1y &= c_1, \\
a_2x+b_2y &= c_2.
\end{aligned}
$$

<v-click>

We collect the coefficients into a matrix, and the unknowns and the right-hand sides into columns:

$$\left(\begin{matrix}a_1&b_1\\ a_2&b_2\end{matrix}\right) \left(\begin{matrix}x\\y\end{matrix}\right) =\left(\begin{matrix}c_1\\ c_2 \end{matrix}\right).$$

</v-click>

<v-click>

We will see why this is the same system once we know how to multiply matrices.

</v-click>

---

# What is a matrix?

A matrix is a rectangular array of numbers, such as

$$A = \left(\begin{matrix}1&2&3\\ 4&5&6\end{matrix}\right).$$

<v-click>

A matrix with $m$ rows and $n$ columns has **size** $m\times n$, so $A$ is $2\times 3$.

</v-click>

<v-click>

The element in row $i$ and column $j$ of $A$ is written $a_{ij}$, e.g. $a_{23} = 6$.

</v-click>

<v-click>

A matrix with as many rows as columns is **square**, and an $n\times n$ matrix has **order** (dimension) $n$.

</v-click>

<v-click>

A matrix with a single column is a **column vector**, e.g. $\mathbf{x} = \left(\begin{matrix}x\\y\end{matrix}\right)$ is $2\times 1$.

</v-click>

---

# Addition, subtraction, and scalar multiplication

We can add or subtract two matrices as long as they have the **same** size, by adding or subtracting the elements in the same positions:

$$\left(\begin{matrix} 2&1 \\ 3&-4 \end{matrix}\right) +\left(\begin{matrix} 6&-5 \\ 1&-7 \end{matrix}\right)= \left(\begin{matrix} 8&-4 \\ 4&-11\end{matrix}\right).$$

<v-click>

We can multiply a matrix by a scalar, by multiplying every element:

$$5\times\left(\begin{matrix} 2&1\\ 3&-4 \end{matrix}\right) =\left(\begin{matrix}10&5\\ 15&-20\end{matrix}\right).$$

</v-click>

---

# Matrix multiplication

To multiply two matrices, we multiply each **row** in the first matrix by each **column** in the second one, and put the results into a new matrix.

A row and column are multiplied by summing up each element in the row, multiplied by the corresponding element in the column.

<div v-click="1" class="grid">
<div v-click.hide="2" class="col-start-1 row-start-1">

$$\left(\begin{matrix} 1&2 \\ 3&4 \end{matrix}\right) \left(\begin{matrix} 5&6\\7&8\end{matrix}\right) = \left(\begin{matrix} 1 \times 5 + 2 \times 7 & 1 \times 6 + 2 \times 8 \\ 3 \times 5 + 4 \times 7 & 3 \times 6 + 4\times 8\end{matrix}\right) = \left(\begin{matrix} 19&22\\43&50\end{matrix}\right)$$

</div>
<div v-click="2" class="col-start-1 row-start-1">

$$\left(\begin{matrix} 1&2 \\ {\color{#D55E00}3}&{\color{#D55E00}4} \end{matrix}\right) \left(\begin{matrix} {\color{#0072B2}5}&6\\{\color{#0072B2}7}&8\end{matrix}\right) = \left(\begin{matrix} 1 \times 5 + 2 \times 7 & 1 \times 6 + 2 \times 8 \\ {\color{#D55E00}3} \times {\color{#0072B2}5} + {\color{#D55E00}4} \times {\color{#0072B2}7} & 3 \times 6 + 4\times 8\end{matrix}\right) = \left(\begin{matrix} 19&22\\{\color{#009E73}43}&50\end{matrix}\right)$$

</div>
</div>

<v-click at="2">

Row 2 of the first matrix times column 1 of the second gives the element in row 2, column 1.

</v-click>

<v-click at="3">

$$\left(\begin{matrix} 1&2&3&4\\ 5&6&7&8 \end{matrix}\right) \left(\begin{matrix} 1&2&3\\ 4&5&6\\ 7&8&9\\ 10&11&12 \end{matrix}\right) = \left(\begin{matrix} 70&80&90\\ 158&184&210 \end{matrix}\right)$$

</v-click>

---

# Matrix multiplication

$$\left(\begin{matrix} a & b & c \end{matrix}\right) \left(\begin{matrix} p & q \\ r & s \\ v & w \end{matrix}\right) = \left(\begin{matrix} ap+br+cv & aq+bs+cw \end{matrix}\right).$$

<v-click>

If the number of **columns** in the first matrix doesn't match the number of **rows** in the second, they **cannot** be multiplied.

$$\left(\begin{matrix} 2 & 3 & 1 \\ 2 & -1 & 3\end{matrix}\right)\left(\begin{matrix} 1 & 0 \\ -1 & -4\end{matrix}\right) =\;?\;?\;?$$

</v-click>

<v-click>

An $m\times n$ matrix times an $n\times p$ matrix gives an $m\times p$ matrix.

</v-click>

---

# Back to the matrix form

Now we can multiply out the matrix form of our two equations:

$$\left(\begin{matrix}a_1&b_1\\ a_2&b_2\end{matrix}\right) \left(\begin{matrix}x\\y\end{matrix}\right) = \left(\begin{matrix}a_1x+b_1y\\ a_2x+b_2y\end{matrix}\right)$$

<v-click>

Each row gives back the left-hand side of one equation, so $A\mathbf{x} = \mathbf{c}$ is exactly the original system, with

$$A = \left(\begin{matrix}a_1&b_1\\ a_2&b_2\end{matrix}\right), \qquad \mathbf{x} = \left(\begin{matrix}x\\y\end{matrix}\right), \qquad \mathbf{c} = \left(\begin{matrix}c_1\\ c_2 \end{matrix}\right).$$

</v-click>

---

# Matrix multiplication is not commutative

In general $AB \neq BA$: the order matters.

<v-click>

This can be easily seen from the fact that multiplying different sized matrices doesn't always work:

$$
\begin{aligned}
(3 \times 2 \text{ matrix}) \times (2 \times 2 \text{ matrix}) &= (3 \times 2 \text{ matrix}) \\
(2 \times 2 \text{ matrix}) \times (3 \times 2 \text{ matrix}) &= ???
\end{aligned}
$$

</v-click>

<v-click>

However, even when sizes match, the product is usually not the same:

$$\left(\begin{matrix} 1&2 \\ 3&4 \end{matrix}\right) \left(\begin{matrix} 0&1\\1&0\end{matrix}\right) = \left(\begin{matrix} 2&1\\4&3\end{matrix}\right) \qquad \left(\begin{matrix} 0&1\\1&0\end{matrix}\right) \left(\begin{matrix} 1&2 \\ 3&4 \end{matrix}\right) = \left(\begin{matrix} 3&4\\1&2\end{matrix}\right)$$

</v-click>

<v-click>

Multiplying on the right swaps the columns; multiplying on the left swaps the rows.

</v-click>

---
layout: exercise
---

# Example: show that

$$\left(\begin{matrix} 4 & 0 & 2 & 3 \\ 1 & 0 & 5 & 2\end{matrix}\right)\left(\begin{matrix} 6 & 0 \\ 2 & 1 \\ 3 & 0 \\ 3 & 10 \end{matrix}\right) \neq \left(\begin{matrix} 6 & 0 \\ 2 & 1 \\ 3 & 0 \\ 3 & 10 \end{matrix}\right)\left(\begin{matrix} 4 & 0 & 2 & 3 \\ 1 & 0 & 5 & 2\end{matrix}\right)$$

---

# Laws of matrix multiplication

Matrix multiplication is not commutative, but it does obey two laws we know from numbers (whenever the products are defined):

<v-clicks at="+0">

- it is **associative**: $(AB)C = A(BC)$
- it is **distributive**: $A(B+C) = AB + AC$ and $(A+B)C = AC + BC$

</v-clicks>

<v-click>

We need both forms of the distributive law, because $A(B+C)$ and $(B+C)A$ are not the same.

</v-click>

---

# The identity matrix

$I$ is the identity matrix, which has the property that

$$A I = I A = A$$

for a square matrix $A$ of the same size.
It is the matrix equivalent of multiplying by 1.

<v-click>

It has 1s on the leading diagonal (top left to bottom right) and 0s everywhere else:

$$I_2 = \left(\begin{matrix} 1 & 0 \\ 0 & 1 \end{matrix}\right), \qquad I_3 = \left(\begin{matrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{matrix}\right),$$

and so on for higher dimensions.

</v-click>

---

# The inverse of a matrix

For a number $a \neq 0$, its inverse $a^{-1}$ satisfies $a\,a^{-1} = 1$.

<v-click>

The matrix equivalent: if $AB = BA = I$, then $B$ is the **inverse** of $A$, written $A^{-1}$ (and $A$ is the inverse of $B$).

</v-click>

<v-click>

For a $2\times 2$ matrix

$$A = \left(\begin{matrix} p & q \\ r & s\end{matrix}\right), \qquad A^{-1} = \frac{1}{ps-qr} \left(\begin{matrix} s & -q \\ -r & p\end{matrix}\right).$$

</v-click>

<v-click>

You can check this by multiplying out $AA^{-1}$.

</v-click>

---

# The determinant

The formula for $A^{-1}$ only works if $ps-qr \neq 0$.
This number is the **determinant** of $A$:

$$|A| = \det A = ps-qr$$

That is, (top left $\times$ bottom right) $-$ (top right $\times$ bottom left).

<v-click>

If $|A| = 0$, $A$ is said to be **singular**: it has no inverse.

</v-click>

<v-click>

For our two equations, the determinant of the matrix of coefficients is $a_1b_2-a_2b_1$: the number we had to divide by at the start.
When it is zero, the two lines are parallel, and there is no single solution.

</v-click>

---
layout: aside
---

# Aside: the determinant as an area

<div class="grid grid-cols-[2fr_3fr] gap-8">
<div>

Multiplying by a $2\times 2$ matrix $A$ moves every point of the plane.

<v-click>

The unit square goes to a parallelogram, whose sides are the columns of $A$ (the arrows).

</v-click>

<v-click>

Its area is $\lvert\det A\rvert$, and a negative determinant flips the square over.

</v-click>

<v-click>

If $\det A = 0$, the square is squashed flat: different points end up in the same place, so the transformation can't be undone, and $A$ has no inverse.

</v-click>

</div>
<div>

<PlotFigure name="transformation" :height="395" />

</div>
</div>

---
layout: exercise
---

# Example: inverting a 2x2 matrix

Find the inverse of

$$A=\left(\begin{matrix}2&-3\\ -2&4\end{matrix}\right),$$

and check your answer by calculating $A^{-1}A$.

::work::

---

# Example: inverting a 2x2 matrix

$$A=\left(\begin{matrix}2&-3\\ -2&4\end{matrix}\right)$$

<v-click>

First, its determinant:

$$|A|=(2\times 4)-(-3\times-2)=8-6=2,$$

</v-click>

<v-click>

so

$$A^{-1}=\frac{1}{2}\left(\begin{matrix}4&3\\ 2&2\end{matrix}\right).$$

</v-click>

---

# Example: inverting a 2x2 matrix

As a check, calculate $A^{-1}A$:

$$ {1|1-2|1-3|1-4}
\begin{aligned}
A^{-1}A &= \frac{1}{2}\left(\begin{matrix}4&3\\ 2&2\end{matrix}\right)\left(\begin{matrix}2&-3\\ -2&4\end{matrix}\right) \\
&= \frac{1}{2}\left(\begin{matrix}2&0\\ 0&2\end{matrix}\right) \\
&= \left(\begin{matrix}1&0\\ 0&1\end{matrix}\right) \\
&=I_2.
\end{aligned}
$$

---

# The transpose of a matrix

$A^T$, the **transpose** of $A$, swaps the rows and columns: row $i$ of $A$ becomes column $i$ of $A^T$, so $(A^T)_{ij} = a_{ji}$.

<v-click>

This reflects the elements across the leading diagonal:

$$A=\left(\begin{matrix}2&1&2\\ 1&4&6\\ 1&-1&2\end{matrix}\right) \qquad A^T=\left(\begin{matrix}2&1&1\\ 1&4&-1\\ 2&6&2\end{matrix}\right)$$

</v-click>

---

# Solving a linear system using matrices

To solve $A\mathbf{x} = \mathbf{b}$ for $\mathbf{x}$, multiply both sides on the left by $A^{-1}$:

$$ {1|1-2}
\begin{aligned}
A^{-1}A\mathbf{x} &= A^{-1}\mathbf{b} \\
\mathbf{x} &= A^{-1}\mathbf{b}
\end{aligned}
$$

<v-click>

It must be on the left on both sides, because the order of multiplication matters.

</v-click>

<v-click>

To find $\mathbf{x}$:

</v-click>

<v-clicks at="+0">

- for a $2\times 2$ matrix, use the formula for $A^{-1}$
- for larger matrices by hand, use Gaussian elimination: the elimination we did at the start, done systematically (not in this course)
- in practice, use a linear algebra package such as NumPy or SymPy, which does this for us

</v-clicks>

---
layout: exercise
---

# Example: solving a 2x2 system

Write the system

$$
\begin{aligned}
x+5y &= 11, \\
-x+5y &= 9
\end{aligned}
$$

in the form $A\mathbf{x} = \mathbf{b}$, and solve it by finding $A^{-1}$.

::work::

---

# Example: solving a 2x2 system

In matrix form, this gives:

$$\left(\begin{matrix}1 &5\\ -1&5\end{matrix}\right) \left(\begin{matrix}x\\ y\end{matrix}\right) = \left(\begin{matrix}11\\ 9\end{matrix}\right)$$

<v-click>

$|A| = (1\times 5) - (5\times -1) = 10$, so

$$A^{-1}= \frac{1}{10} \left(\begin{matrix}5 &-5\\ 1&1 \end{matrix}\right)$$

</v-click>

<v-click>

Thus:

$$\left(\begin{matrix}x\\ y\end{matrix}\right) = \frac{1}{10}\left(\begin{matrix}5 &-5\\ 1&1\end{matrix}\right)\left(\begin{matrix}11\\ 9\end{matrix}\right) =\frac{1}{10} \left(\begin{matrix}10\\ 20\end{matrix}\right) =\left(\begin{matrix}1\\ 2\end{matrix}\right)$$

so $x=1$, $y=2$: the point where the two lines cross.

</v-click>

---

# Larger systems

This process seems like more effort than it's worth for small systems.

<v-click>

But it allows for a much more systematic approach when dealing with large systems.

</v-click>

<v-click>

As the size of the matrix grows, this process can be easily performed with Python (or other tools).

</v-click>

---

# Example: solving a 4x4 system in Python

$$
\begin{aligned}
x + 5y + 3z - w &= 5,\\
x - 2y + z + 4w &= 2,\\
-3x + y -z + 2w &= -5,\\
x + y + z &= 0.
\end{aligned}
$$

<v-click>

This gives

$$\left(\begin{matrix} 1 & 5 & 3 & -1 \\ 1 & -2 & 1 & 4 \\ -3 & 1 & -1 & 2\\ 1 & 1 & 1 & 0 \end{matrix}\right) \left(\begin{matrix} x \\ y \\ z \\ w\end{matrix}\right) = \left(\begin{matrix} 5 \\ 2 \\ -5 \\ 0\end{matrix}\right).$$

</v-click>

---

# Example: solving a 4x4 system in Python

```python
import numpy as np

A = np.array([[1, 5, 3, -1], [1, -2, 1, 4], [-3, 1, -1, 2], [1, 1, 1, 0]])
b = np.array([5, 2, -5, 0])

# Solve A x = b directly: faster and more accurate than finding A^-1
x = np.linalg.solve(A, b)
print(x)

# Check: A x should give back b
print(A @ x)
```

<v-click>

```text
[-5.94444444 -5.11111111 11.05555556 -3.33333333]
[ 5.0000000e+00  2.0000000e+00 -5.0000000e+00 -8.8817842e-16]
```

</v-click>

<v-click>

The last entry is $-8.9\times 10^{-16}$, not $0$: computers store numbers to about 16 significant figures, so tiny rounding errors appear.

</v-click>

---

# Example: solving a 4x4 system in SymPy

SymPy works with exact fractions instead:

```python
import sympy as sp

A = sp.Matrix([[1, 5, 3, -1], [1, -2, 1, 4], [-3, 1, -1, 2], [1, 1, 1, 0]])
b = sp.Matrix([5, 2, -5, 0])

A.solve(b)
```

<v-click>

$$\def\arraystretch{1.8}\left[\begin{matrix}- \frac{107}{18}\\- \frac{46}{9}\\\frac{199}{18}\\- \frac{10}{3}\end{matrix}\right]$$

</v-click>
