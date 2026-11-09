---
theme: oxrse
title: Linear algebra 2
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

# Why eigenvalues?

In lecture 12 we wrote systems of linear equations as $A\mathbf{x} = \mathbf{b}$, and solved them by inverting $A$, as long as $A$ is not singular.

In this lecture we look more closely at singular matrices, and then at the **eigenvalues** and **eigenvectors** of a matrix: the special directions that the matrix only stretches.

In lectures 14 to 16, eigenvalues let us solve systems of differential equations, and decide whether their steady states are stable.

---

# Using Python to calculate the inverse

To find $A^{-1}$ for

$$A = \left(\begin{matrix}3&0&2\\ 3&0&-3\\ 0&1&1\end{matrix}\right).$$

<v-click>

```python
A = np.array([[3, 0, 2], [3, 0, -3], [0, 1, 1]])
np.linalg.inv(A)
```

```text
array([[ 0.2       ,  0.13333333,  0.        ],
       [-0.2       ,  0.2       ,  1.        ],
       [ 0.2       , -0.2       , -0.        ]])
```

</v-click>

<v-click>

The $-0.$ is a tiny negative rounding error, like the ones in lecture 12: the exact value is $0$.

</v-click>

---

# Using SymPy to calculate the inverse

$$A = \left(\begin{matrix}3&0&2\\ 3&0&-3\\ 0&1&1\end{matrix}\right)$$

```python
A = sp.Matrix([[3, 0, 2], [3, 0, -3], [0, 1, 1]])
A.inv()
```

<v-click>

$$\def\arraystretch{1.8}\left[\begin{matrix}\frac{1}{5} & \frac{2}{15} & 0\\- \frac{1}{5} & \frac{1}{5} & 1\\\frac{1}{5} & - \frac{1}{5} & 0\end{matrix}\right]$$

</v-click>

---

# It doesn't always work

Consider the following system

$$
\begin{array}{cccccccc}
eq1: &  x & + & y & + & z & =  & a \\
eq2: & 2x & + & 5y & + &  2z &  = & b \\
eq3: & 7x & +&  10y  & + & 7z &  = &  c
\end{array}
$$

<v-click>

```python
A = np.array([[1, 1, 1], [2, 5, 2], [7, 10, 7]])
np.linalg.inv(A)
```

```text
numpy.linalg.LinAlgError: Singular matrix
```

</v-click>

<v-click>

The left-hand side of $eq3$ is $5\times eq1 + eq2$, so $eq3$ tells us nothing new: really there are only two equations for three unknowns.

</v-click>

---

# Singular matrices

The **rank** of an $n\times n$ matrix $A$ is the number of linearly independent rows in $A$ (rows that are not combinations of other rows).

When $\text{rank}(A) < n$:

<v-clicks at="+0">

- the system $A\mathbf{x} = \mathbf{b}$ has fewer _independent_ equations than unknowns
- the matrix is said to be singular
- $A$ has no inverse
- the determinant of $A$ is 0
- the equation $A\mathbf{u} = \mathbf{0}$ has non-trivial solutions (solutions where $\mathbf{u} \neq \mathbf{0}$)

</v-clicks>

---

# Singular matrix example

With too few independent equations, there may be **many solutions** or **no solutions**.

<v-click>

$$
\begin{aligned}
x+y &= 1,\\
2x+2y &= 2
\end{aligned}
$$

The second equation is twice the first: they are the same line, so there are infinitely many solutions (e.g. $x=0$, $y=1$, or $x=2$, $y=-1$).

</v-click>

<v-click>

$$
\begin{aligned}
x+y &= 1,\\
2x+2y &= 0
\end{aligned}
$$

The second equation is inconsistent with the first: they are parallel lines, so there are no solutions.

</v-click>

---

# Singular matrix example

Both examples use the matrix

$$\left(\begin{matrix}1&1\\ 2&2\end{matrix}\right),$$

which has rank 1, and determinant $1\times 2 - 1\times 2 = 0$.

<v-click>

Whether there are many solutions or none depends on the right-hand side, but there is never exactly one.

</v-click>

---

# Null space

When a matrix is singular we can find non-trivial solutions to $A\mathbf{u} = \mathbf{0}$.
These vectors form the **null space** of $A$.

<v-click>

Any vector in the null space makes no difference to the effect that $A$ is having:

$$A(\mathbf{x} + \mathbf{u}) = A\mathbf{x} + A\mathbf{u} = A\mathbf{x} + \mathbf{0} = A\mathbf{x}.$$

</v-click>

<v-click>

Any combination or scaling of vectors in the null space is also in the null space: if $A\mathbf{u} = \mathbf{0}$ and $A\mathbf{v} = \mathbf{0}$ then $A(\alpha\mathbf{u} + \beta\mathbf{v}) = \mathbf{0}$.

</v-click>

<v-click>

The number of linearly independent vectors in the null space is denoted $\text{null}(A)$, and for an $n\times n$ matrix

$$\text{null}(A) + \text{rank}(A) = n.$$

</v-click>

---

# Null space example

Our singular system has

$$A = \left(\begin{matrix} 1& 1& 1\\ 2& 5& 2\\ 7& 10&7 \end{matrix}\right).$$

<v-click>

To find its null space, solve $A\mathbf{u} = \mathbf{0}$ with $\mathbf{u} = (x, y, z)^T$, using the first two rows (the third adds nothing new):

$$ {1|1-2|1-3}
\begin{aligned}
x + y + z &= 0, \qquad 2x + 5y + 2z = 0 \\
3y &= 0 \qquad \text{(second minus twice the first)} \\
y &= 0, \qquad x = -z
\end{aligned}
$$

</v-click>

<v-click>

So the null space is all the multiples of $(1, 0, -1)^T$: $\text{rank}(A) = 2$ and $\text{null}(A) = 1$.

</v-click>

---

# Null space example in Python

```python
A = np.array([[1, 1, 1], [2, 5, 2], [7, 10, 7]])
print(np.linalg.matrix_rank(A))
```

```text
2
```

<v-click>

```python
import scipy.linalg

scipy.linalg.null_space(A)
```

```text
array([[-7.07106781e-01],
       [-1.11022302e-16],
       [ 7.07106781e-01]])
```

</v-click>

<v-click>

This is $(-1, 0, 1)^T/\sqrt{2}$, a multiple of $(1, 0, -1)^T$ with length 1; the $-1.1\times 10^{-16}$ is rounding error.

</v-click>

---

# Null space example

Scaled vectors in the null space are also in the null space, so e.g. $x=-1000$, $y=0$, $z=1000$ is in it too.

Try it:

$$\left(\begin{matrix} 1& 1& 1\\ 2& 5& 2\\ 7& 10&7 \end{matrix}\right) \left(\begin{matrix} -1000\\ 0 \\ 1000 \end{matrix}\right) = \quad ?$$

<v-click>

```python
A @ np.array([-1000, 0, 1000])
```

```text
array([0, 0, 0])
```

</v-click>

---
layout: two-cols
---

# Eigenvectors: motivation

Multiplying a vector by a matrix usually changes its direction as well as its length.

<v-click>

Here $A = \left(\begin{matrix} 2& 1 \\ 1&2\end{matrix}\right)$: as $\mathbf{v}$ turns, $A\mathbf{v}$ mostly points a different way.

</v-click>

<v-click>

But along two special directions, $A\mathbf{v}$ is just a multiple of $\mathbf{v}$: these are the **eigenvectors** of $A$, and the multiples ($3$ and $1$) are its **eigenvalues**.

</v-click>

::right::

<PlotFigure name="eigen-directions" :height="370" />

---

# Eigenvectors: motivation

The eigenvalues and eigenvectors give an indication of how much effect the matrix has, and in what direction.

<v-click>

$$B=\left(\begin{matrix} 2& 0 \\ 0&\frac{1}{2}\end{matrix}\right)\qquad\text{doubles in } x \text{, but halves in } y\text{.}$$

Its eigenvectors are along the axes, with eigenvalues $2$ and $\frac{1}{2}$, and repeated applications of $B$ move points towards $(\pm\infty, 0)$.

</v-click>

<v-click>

$$R=\left(\begin{matrix} \cos 45^\circ&-\sin 45^\circ\\ \sin 45^\circ&\cos 45^\circ\end{matrix}\right)\qquad\text{rotates by } 45^\circ\text{.}$$

It leaves no direction unchanged, so it has no real eigenvectors: its eigenvalues are complex, and we will meet them again in lecture 16.

</v-click>

---

# Where eigenvalues are used

In lectures 14 to 16, eigenvalues and eigenvectors let us solve systems of linear differential equations, and decide whether the steady states of nonlinear ones are stable.

<v-click>

The long-term growth rate of a population with several age classes is the largest eigenvalue of its (Leslie) matrix.

</v-click>

<v-click>

The long-term state of a Markov chain, e.g. a model of a molecule switching between conformations, is an eigenvector of its matrix of transition probabilities.

</v-click>

<v-click>

Principal component analysis finds the directions of greatest variation in data, such as gene expression measurements, as eigenvectors.

</v-click>

---

# Eigenvectors and eigenvalues

$A$ is a square matrix, $\mathbf{v}$ is a **non-zero** vector, and $\lambda$ is a scalar.
If

$$A \mathbf{v} = \lambda \mathbf{v}$$

then $\mathbf{v}$ is called an **eigenvector** and $\lambda$ is the corresponding **eigenvalue**.

<v-click>

If $\mathbf{v}$ is an eigenvector, then so is any scaling $a\mathbf{v}$ (with $a \neq 0$):

$$A (a \mathbf{v}) = a A\mathbf{v} = a\lambda\mathbf{v} = \lambda (a \mathbf{v}).$$

</v-click>

---

# Finding eigenvalues

Rearranging $A \mathbf{v} = \lambda \mathbf{v}$:

$$ {1|1-2|1-3}
\begin{aligned}
A \mathbf{v} &= \lambda \mathbf{v},\\
A \mathbf{v} - \lambda I \mathbf{v} &= \mathbf{0},\\
(A - \lambda I) \mathbf{v} &= \mathbf{0}.
\end{aligned}
$$

<v-click>

If $A - \lambda I$ had an inverse, then $\mathbf{v} = (A - \lambda I)^{-1}\mathbf{0} = \mathbf{0}$; but $\mathbf{v} \neq \mathbf{0}$, so $A - \lambda I$ must be singular:

$$|A-\lambda I|=0.$$

</v-click>

<v-click>

This equation gives the eigenvalues. (In the picture from lecture 12, $A - \lambda I$ squashes the plane flat.)

</v-click>

---
layout: exercise
---

# Finding eigenvalues: example

What are the eigenvalues of this matrix?

$$A=\left(\begin{matrix}-2&-2\\ 1&-5\end{matrix}\right)$$

::work::

---

# Finding eigenvalues: example

$$A=\left(\begin{matrix}-2&-2\\ 1&-5\end{matrix}\right)$$

<v-click>

$$ {1|1-2|1-3}
\begin{aligned}
|A-\lambda I| &=\left\vert\begin{matrix}-2-\lambda&-2\\ 1&-5-\lambda\end{matrix}\right\vert=(-2-\lambda)(-5-\lambda)-(-2) \\
&=10+5\lambda+2\lambda+\lambda^2+2 \\
&=\lambda^2+7\lambda+12=(\lambda+3)(\lambda+4)=0
\end{aligned}
$$

</v-click>

<v-click>

So the eigenvalues are $\lambda_1=-3$ and $\lambda_2=-4$.

</v-click>

---

# Eigenvalues using Python

NumPy finds the eigenvalues and eigenvectors together:

```python
A = np.array([[-2, -2], [1, -5]])
eigenvalues, eigenvectors = np.linalg.eig(A)
eigenvalues
```

<v-click>

```text
array([-3.+0.j, -4.+0.j])
```

</v-click>

<v-click>

SymPy:

```python
A = sp.Matrix([[-2, -2], [1, -5]])
A.eigenvals()
```

$$\left\{ -4 : 1, \  -3 : 1\right\}$$

(each eigenvalue, and how many times it is repeated)

</v-click>

---
layout: exercise
---

# Finding eigenvectors: example

What are the eigenvectors of

$$A=\left(\begin{matrix}-2&-2\\ 1&-5\end{matrix}\right)?$$

The eigenvalues are $\lambda_1=-3$ and $\lambda_2=-4$.

::work::

---

# Finding eigenvectors: example

For each eigenvalue, substitute into $A \mathbf{v} = \lambda \mathbf{v}$, with $\mathbf{v} = (x, y)^T$.

<v-click>

$$ {1|1-2|1-3}
\begin{aligned}
\lambda_1 = -3: \qquad \left(\begin{matrix}-2&-2\\ 1&-5\end{matrix}\right) \left(\begin{matrix}x\\ y\end{matrix}\right) &= \left(\begin{matrix}-3x\\ -3y\end{matrix}\right) \\
-2x - 2y = -3x \quad &\Rightarrow \quad x = 2y \qquad \text{(the bottom row gives the same)} \\
\mathbf{v}_1 &= \left(\begin{matrix}2 \\ 1\end{matrix}\right), \left(\begin{matrix}1 \\ 0.5\end{matrix}\right), \left(\begin{matrix}-4.4 \\ -2.2\end{matrix}\right), \left(\begin{matrix}2\alpha \\ \alpha\end{matrix}\right)\ldots
\end{aligned}
$$

</v-click>

<v-click>

$$
\begin{aligned}
\lambda_2 = -4: \qquad -2x - 2y = -4x \quad &\Rightarrow \quad x = y \\
\mathbf{v}_2 &= \left(\begin{matrix}1 \\ 1\end{matrix}\right) \text{ or any multiple}
\end{aligned}
$$

</v-click>

---

# Normalised eigenvectors

The length (magnitude) of a vector $\mathbf{v} = (x, y, z)^T$ is

$$\lVert\mathbf{v}\rVert = \sqrt{x^2+y^2+z^2}.$$

<v-click>

Dividing by it gives the **normalised** vector, of length 1:

$$\frac{\mathbf{v}}{\lVert\mathbf{v}\rVert} = \frac{1}{\sqrt{x^2+y^2+z^2}}\left(\begin{matrix}x\\ y\\ z\end{matrix}\right)$$

</v-click>

<v-click>

e.g. $\mathbf{v}_1 = (2, 1)^T$ has length $\sqrt{5}$, so normalised it is $(2, 1)^T/\sqrt{5} = (0.894, 0.447)^T$.

</v-click>

---

# Eigenvectors in Python

NumPy gives the eigenvectors as the columns of a matrix, normalised:

```python
eigenvectors
```

```text
array([[0.89442719+0.j, 0.70710678+0.j],
       [0.4472136 +0.j, 0.70710678+0.j]])
```

<v-click>

These are $(2, 1)^T/\sqrt{5}$ and $(1, 1)^T/\sqrt{2}$, in the same order as the eigenvalues $-3$ and $-4$.

</v-click>

<v-click>

SymPy gives each eigenvalue, how many times it is repeated, and its eigenvectors:

```python
A.eigenvects()
```

$$\left[ \left( -4, \  1, \  \left[ \left[\begin{matrix}1\\1\end{matrix}\right]\right]\right), \  \left( -3, \  1, \  \left[ \left[\begin{matrix}2\\1\end{matrix}\right]\right]\right)\right]$$

</v-click>

---

# Diagonalising matrices

Suppose an $n\times n$ matrix $A$ has $n$ linearly independent eigenvectors $\mathbf{v}_1, \ldots, \mathbf{v}_n$, with eigenvalues $\lambda_1, \ldots, \lambda_n$.
Put the eigenvectors in the columns of a matrix $P$, and the eigenvalues on the diagonal of $D$. Then

$$A = P D P^{-1}.$$

<v-click>

For our example:

$$\left(\begin{matrix}-2&-2\\ 1&-5\end{matrix}\right) = \left(\begin{matrix}2&1\\ 1&1\end{matrix}\right) \left(\begin{matrix}-3&0\\ 0&-4\end{matrix}\right) \left(\begin{matrix}1&-1\\ -1&2\end{matrix}\right)$$

</v-click>

<v-click>

This separates how much effect the matrix has (the $\lambda_i$) from the directions it acts in (the $\mathbf{v}_i$).

</v-click>

---

# Why diagonalise?

Powers of $A$ become easy, because the $P^{-1}P$ in the middle cancel:

$$A^k = (PDP^{-1})(PDP^{-1})\cdots(PDP^{-1}) = PD^kP^{-1}, \qquad D^k = \left(\begin{matrix}\lambda_1^k&0\\ 0&\lambda_2^k\end{matrix}\right)$$

<v-click>

In lecture 14 the same idea uncouples a system of differential equations into separate equations we can solve one at a time.

</v-click>

<v-click>

Not every matrix can be diagonalised: e.g. $\left(\begin{matrix}1&1\\ 0&1\end{matrix}\right)$ has only one eigenvector direction, $(1, 0)^T$.

</v-click>

---

# Diagonalising in Python

```python
P = eigenvectors
D = np.diag(eigenvalues)
P @ D @ np.linalg.inv(P)
```

<v-click>

```text
array([[-2.+0.j, -2.+0.j],
       [ 1.+0.j, -5.+0.j]])
```

</v-click>

<v-click>

This gives back $A$. NumPy's $P$ has normalised columns, so it is not the same as our $P$, but any scaling of the eigenvectors works.

</v-click>

---

# Orthogonal vectors

The **dot** (or scalar) product of two vectors multiplies them element by element and adds up the results:

$$\mathbf{x}_1\cdot\mathbf{x}_2=\left(\begin{matrix}2\\ -1\\ 3\end{matrix}\right)\cdot\left(\begin{matrix}2\\ 7\\ 1\end{matrix}\right)=2\times 2+(-1\times 7)+(3\times1)=4-7+3=0.$$

<v-click>

If the dot product is zero, the vectors are perpendicular, or **orthogonal**: so $\mathbf{x}_1$ and $\mathbf{x}_2$ are orthogonal.

</v-click>

<v-click>

The dot product of a vector with itself is its length squared: $\mathbf{v}\cdot\mathbf{v} = \lVert\mathbf{v}\rVert^2$.

</v-click>

---

# Symmetric matrices

A matrix is **symmetric** if $A^T = A$.

<v-click>

Symmetric matrices have real eigenvalues, and orthogonal eigenvectors, e.g.

$$A=\left(\begin{matrix}19&20&-16\\ 20&13&4 \\ -16&4&31\end{matrix}\right)$$

</v-click>

<v-click>

For a symmetric matrix, NumPy has `np.linalg.eigh`, which is faster and more accurate than `eig`, and gives the eigenvalues in increasing order.

</v-click>

---

# Symmetric matrices in Python

```python
A = np.array([[19, 20, -16], [20, 13, 4], [-16, 4, 31]])
eigenvalues, P = np.linalg.eigh(A)
print(eigenvalues)
print(P)

# The eigenvectors are orthogonal and normalised, so P^T P = I
print(np.round(P.T @ P, 12))
```

<v-click>

```text
[-9. 27. 45.]
[[ 0.66666667 -0.33333333  0.66666667]
 [-0.66666667 -0.66666667  0.33333333]
 [ 0.33333333 -0.66666667 -0.66666667]]
[[1. 0. 0.]
 [0. 1. 0.]
 [0. 0. 1.]]
```

</v-click>

---

# Orthogonal matrices

A matrix is **orthogonal** if its columns are normalised, orthogonal vectors.
Then $M^TM=I$, so

$$M^{-1} = M^T.$$

<v-click>

For a symmetric matrix, we can choose normalised eigenvectors, so $P$ is orthogonal, and the diagonalising equation is simplified:

$$A = PDP^{-1} = PDP^T.$$

</v-click>

---

# Summary

<v-clicks at="+0">

1. A singular matrix has rank less than its size: some equations are combinations of others, and $A\mathbf{x} = \mathbf{b}$ has many solutions or none.
2. The null space of $A$ is the set of solutions of $A\mathbf{u} = \mathbf{0}$.
3. An eigenvector of $A$ is a non-zero vector with $A\mathbf{v} = \lambda\mathbf{v}$: find the eigenvalues from $|A - \lambda I| = 0$, then each eigenvector by substitution.
4. A matrix with a full set of eigenvectors can be diagonalised, $A = PDP^{-1}$; we will use this for systems of differential equations.
5. Symmetric matrices have orthogonal eigenvectors, and $A = PDP^T$.
6. In Python: `np.linalg.inv`, `matrix_rank`, `scipy.linalg.null_space`, `np.linalg.eig` and `eigh`, and SymPy's `inv`, `eigenvals` and `eigenvects`.

</v-clicks>
