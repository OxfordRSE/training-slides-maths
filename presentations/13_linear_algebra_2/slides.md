---
theme: oxrse
title: Linear algebra 2
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

# Recap from part I

- Matrix representation of simultaneous equations
- Matrix-vector multiplication
- Matrix-matrix multiplication
- Determinant ($2\times2$ matrices)
- Inverting matrices
- Transpose
- Python

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
       [ 0.2       , -0.2       ,  0.        ]])
```

</v-click>

<v-click>

```python
A = sp.Matrix([[3, 0, 2], [3, 0, -3], [0, 1, 1]])
A.inv()
```

$$\left[\begin{matrix}\frac{1}{5} & \frac{2}{15} & 0\\- \frac{1}{5} & \frac{1}{5} & 1\\\frac{1}{5} & - \frac{1}{5} & 0\end{matrix}\right]$$

</v-click>

---

# It doesn't always work

Consider the following system

$$\begin{array}{cccccccc}
eq1: &  x & + & y & + & z & =  & a \\
eq2: & 2x & + & 5y & + &  2z &  = & b \\
eq3: & 7x & +&  10y  & + & 7z &  = &  c
\end{array}$$

<v-click>

```python
A = np.array([[1, 1, 1], [2, 5, 2], [7, 10, 7]])
np.linalg.inv(A)
```

```text
LinAlgError: Singular matrix
```

</v-click>

---

# Singular matrices

The **rank** of an $n\times n$ matrix $A$ is the number of linearly independent rows in $A$ (rows not combinations of other rows).

When $\text{rank}(A) < n$ then

- The system $A\mathbf{x} = \mathbf{b}$ has _fewer_ equations than unknowns
- The matrix is said to be singular
- $A$ has no inverse
- The determinant of $A$ is 0
- The equation $A\mathbf{u} = \mathbf{0}$ has non-trivial solutions (solutions where $\mathbf{u} \neq \mathbf{0}$)

---

# Singular matrix example

An underdetermined system (fewer equations than unknowns) may mean that there are **many solutions** or that there are **no solutions**.

An example with many solutions is

$$
\begin{aligned}
x+y &= 1,\\
2x+2y &= 2,
\end{aligned}
$$

has infinitely many solutions (x=0, y=1; x=-89.3, y=90.3...)

<v-click>

An example with no solutions is

$$
\begin{aligned}
x+y &= 1,\\
2x+2y &= 0,
\end{aligned}
$$

where the second equation is inconsistent with the first.

</v-click>

---

# Singular matrix example

These examples use the matrix

$$\left(\begin{matrix}1&1\\ 2&2\end{matrix}\right),$$

which has rank 1.

---

# Null space

When a matrix is singular we can find non-trivial solutions to $A\mathbf{u} = \mathbf{0}$.

These are vectors which form the **null space** for $A$.

Any vector in the null space makes no difference to the effect that $A$ is having:

$$A(\mathbf{x} + \mathbf{u}) = A\mathbf{x} + A\mathbf{u} = A\mathbf{x} + \mathbf{0} = A\mathbf{x}.$$

<v-click>

Note that any combination or scaling of vectors in the null space is also in the null space.
That is, if $A\mathbf{u} = \mathbf{0}$ and $A\mathbf{v} = \mathbf{0}$ then

$$A(\alpha\mathbf{u} + \beta\mathbf{v}) = \mathbf{0}$$

The number of linearly independent vectors in the null space is denoted $\text{null}(A)$ and

$$\text{null}(A) + \text{rank}(A) = \text{order}(A).$$

</v-click>

---

# Null space example

Previous example of a singular system:

$$A = \left(\begin{matrix} 1& 1& 1\\ 2& 5& 2\\ 7& 10&7 \end{matrix}\right)$$

<v-click>

```python
A = np.array([[1, 1, 1], [2, 5, 2], [7, 10, 7]])
print(np.linalg.matrix_rank(A))
```

```text
2
```

</v-click>

<v-click>

```python
import scipy.linalg
scipy.linalg.null_space(A)
```

```text
array([[-7.07106781e-01],
       [ 0.00000000e+00],
       [ 7.07106781e-01]])
```

</v-click>

---

# Null space example

Remember, scaled vectors in the null space are also in the null space, for example, $x=1, y=0, z=-1$ is in the null space.

Try it:

$$\left(\begin{matrix} 1& 1& 1\\ 2& 5& 2\\ 7& 11&7 \end{matrix}\right) \left(\begin{matrix} -1000\\ 0 \\ 1000 \end{matrix}\right) = \quad ?$$

<v-click>

```python
np.matmul(A,np.array([-1000,0,1000]))
```

```text
array([0, 0, 0])
```

</v-click>

---

# Eigenvectors: motivation

The **eigenvalues** and **eigenvectors** give an indication of how much effect the matrix has, and in what direction.

$$A=\left(\begin{matrix} \cos(45)&-\sin(45)\\ \sin(45)&\cos(45)\end{matrix}\right)\qquad\text{has no scaling effect.}$$

$$B=\left(\begin{matrix} 2& 0 \\ 0&\frac{1}{2}\end{matrix}\right)\qquad\qquad\text{doubles in } x \text{, but halves in } y\text{.}$$

Repeated applications of $A$ stay the same distance from the origin, but repeated applications of $B$ move towards $(\infty, 0).$

---

# Eigenvectors: motivation

- Transitions with probability
- Markov chains
- Designing bridges
- Solution of systems of linear ODEs
- Stability of systems of nonlinear ODEs

---

# Eigenvectors and eigenvalues

$A$ is a matrix, $\mathbf{v}$ is a **non-zero** vector, $\lambda$ is a scalar,

If

$$A \mathbf{v} = \lambda \mathbf{v}$$

then $\mathbf{v}$ is called an **eigenvector** and $\lambda$ is the corresponding **eigenvalue**.

Note that if $\mathbf{v}$ is a solution, then so is a scaling $a\mathbf{v}$:

$$A (a \mathbf{v}) = \lambda (a \mathbf{v}).$$

---

# Finding eigenvalues

Another way to write previous equation:

$$ {1|1-2|1-3}
\begin{aligned}
A \mathbf{v} &= \lambda \mathbf{v},\\
A \mathbf{v} - \lambda I \mathbf{v} &= \mathbf{0},\\
(A - \lambda I) \mathbf{v} &= \mathbf{0}.
\end{aligned}
$$

---

# Finding eigenvalues

Consider the equation $B\mathbf{x}=\mathbf{0}$, where $B$ is a matrix and $\mathbf{x}$ is a non-zero column vector.

Assume $B$ is nonsingular:

$$B^{-1}(B\mathbf{x})=B^{-1}\mathbf{0}=\mathbf{0}$$

<v-click>

But:

$$B^{-1}(B\mathbf{x})=(B^{-1}B)\mathbf{x}=I\mathbf{x}=\mathbf{x}$$

This means that:

$$B^{-1}(B\mathbf{x})=\mathbf{0}=\mathbf{x}$$

but we stated above that $\mathbf{x}\neq\mathbf{0}$ so our assumption that $B$ is nonsingular must be false: $B$ is singular.

</v-click>

---

# Finding eigenvalues

We can state that:

$$(A-\lambda I)\mathbf{v} = \mathbf{0} \quad \text{with} \quad \mathbf{v}\neq \mathbf{0},$$

so $(A-\lambda I)$ must be singular:

$$|A-\lambda I|=0.$$

---

# Finding eigenvalues: example

What are the eigenvalues for this matrix?

$$A=\left(\begin{matrix}-2&-2\\ 1&-5\end{matrix}\right)$$

<v-click>

$$ {1|1-2}
\begin{aligned}
|A-\lambda I| &=\left\vert\begin{matrix}-2-\lambda&-2\\ 1&-5-\lambda\end{matrix}\right\vert=(-2-\lambda)(-5-\lambda)-(-2) \\
&=10+5\lambda+\lambda^2+2\lambda+2=\lambda^2+7\lambda+12=(\lambda+3)(\lambda+4)=0
\end{aligned}
$$

</v-click>

<v-click>

So the eigenvalues are $\lambda_1=-3$ and $\lambda_2=-4$.

</v-click>

---

# Eigenvalues using Python

Numpy:

```python
A = np.array([[-2, -2], [1, -5]])
np.linalg.eig(A)[0]
```

```text
array([-3., -4.])
```

SymPy:

```python
A2 = sp.Matrix([[-2, -2], [1, -5]])
A2.eigenvals()
```

$$\left\{ -4 : 1, \  -3 : 1\right\}$$

---

# Finding eigenvectors

For an eigenvalue, the corresponding vector comes from substitution into $A \mathbf{v} = \lambda \mathbf{v}$:

### Example

What are the eigenvectors for

$$A=\left(\begin{matrix}-2&-2\\ 1&-5\end{matrix}\right)?$$

---

# Finding eigenvectors: example

The eigenvalues are $\lambda_1=-3$ and $\lambda_2=-4.$
The eigenvectors are $\mathbf{v}_1$ and $\mathbf{v}_2$ where:

$$A\mathbf{v}_1=\lambda_1 \mathbf{v}_1.$$

$$ {1|1-2|1-3}
\begin{aligned}
\left(\begin{matrix}-2&-2\\ 1&-5\end{matrix}\right) \left(\begin{matrix}u_1\\ v_1\end{matrix}\right) &= \left(\begin{matrix}-3u_1\\ -3v_1\end{matrix}\right),\\
u_1 &= 2v_1. \quad \text{(from the top or bottom equation)}\\
\left(\begin{matrix}u_1\\ v_1\end{matrix}\right) &= \left(\begin{matrix}2 \\ 1\end{matrix}\right), \left(\begin{matrix}1 \\ 0.5\end{matrix}\right), \left(\begin{matrix}-4.4 \\ -2.2\end{matrix}\right), \left(\begin{matrix}2\alpha \\ \alpha\end{matrix}\right)\ldots
\end{aligned}
$$

---

# Eigenvectors in Python

Numpy:

```python
A = np.array([[-2, -2], [1, -5]])
np.linalg.eig(A)[1]
```

```text
array([[0.89442719, 0.70710678],
       [0.4472136 , 0.70710678]])
```

SymPy:

```python
c = sp.symbols('c')
A2 = sp.Matrix([[-2, c], [1, -5]])
A2.eigenvects()
```

$$\left[ \left( - \frac{\sqrt{4 c + 9}}{2} - \frac{7}{2}, \  1, \  \left[ \left[\begin{matrix}\frac{3}{2} - \frac{\sqrt{4 c + 9}}{2}\\1\end{matrix}\right]\right]\right), \  \left( \frac{\sqrt{4 c + 9}}{2} - \frac{7}{2}, \  1, \  \left[ \left[\begin{matrix}\frac{\sqrt{4 c + 9}}{2} + \frac{3}{2}\\1\end{matrix}\right]\right]\right)\right]$$

---

# Diagonalising matrices

Any nonsingular matrix $A$ can be rewritten as a product of eigenvectors and eigenvalues.

If $A$ has eigenvalues $\lambda_1$ and $\lambda_2$ with corresponding eigenvectors $(u_1, v_1)^T$ and $(u_2, v_2)^T$ then

$$A = \left(\begin{matrix}u_1 & u_2\\v_1 & v_2\end{matrix}\right) \left(\begin{matrix}\lambda_1 & 0\\0 & \lambda_2\end{matrix}\right) \left(\begin{matrix}u_1 & u_2\\v_1 & v_2\end{matrix}\right)^{-1}.$$

This is like a scaling surrounded by rotations and separates how much effect the matrix has $(\lambda_i)$ from the directions $(\mathbf{v}_i).$

---

# Diagonalising matrices: example

$$A=\left(\begin{matrix}-2&-2\\ 1&-5\end{matrix}\right)$$

```python
A = np.array([[-2, -2], [1, -5]])
w, v = np.linalg.eig(A)
inv_v = np.linalg.inv(v)

np.matmul( np.matmul(v, np.diag(w)) , inv_v )
```

```text
array([[-2., -2.],
       [ 1., -5.]])
```

---

# Orthogonal eigenvectors

If $\mathbf{x}_1$ and $\mathbf{x}_2$ are perpendicular or **orthogonal** vectors, then the scalar/dot product is zero.

$$\mathbf{x}_1.\mathbf{x}_2=0$$

e.g.

$$\mathbf{x}_1.\mathbf{x}_2=\left(\begin{matrix}2\\ -1\\ 3\end{matrix}\right).\left(\begin{matrix}2\\ 7\\ 1\end{matrix}\right)=2\times 2+(-1\times 7)+(3\times1)=4-7+3=0.$$

Since this dot product is zero, the vectors $\mathbf{x}_1$ and $\mathbf{x}_2$ are orthogonal.

---

# Symmetric matricies

Symmetric matricies have orthogonal eigenvectors, e.g.

$$A=\left(\begin{matrix}19&20&-16\\ 20&13&4 \\ -16&4&31\end{matrix}\right)$$

---

# Symmetric matricies

```python
A = np.array([[19, 20, -16], [20, 13, 4], [-16, 4, 31]])
w, v = np.linalg.eig(A)
print(v)
print('\ndot products of eigenvectors:\n')
print(np.dot(v[:,0],v[:,1]))
print(np.dot(v[:,0],v[:,2]))
print(np.dot(v[:,1],v[:,2]))
```

```text
[[ 0.66666667 -0.33333333  0.66666667]
 [ 0.33333333  0.66666667 -0.66666667]
 [-0.66666667  0.66666667  0.33333333]]

dot products of eigenvectors:

0.0
0.0
0.0
```

---

# Normalised eigenvectors

If

$$\left(\begin{matrix}x\\ y\\ z\end{matrix}\right),$$

is an eigenvector, then

$$\left(\begin{matrix}\frac{x}{\sqrt{x^2+y^2+z^2}}\\ \frac{y}{\sqrt{x^2+y^2+z^2} }\\ \frac{z}{\sqrt{x^2+y^2+z^2} }\end{matrix}\right)$$

is the corresponding normalised vector: a vector of unit length (magnitude).

---

# Orthogonal matrices

A matrix is orthogonal if its columns are normalised orthogonal vectors.
One can prove that if $M$ is orthogonal then:

$$M^TM=I\qquad M^T=M^{-1}$$

Note that if the eigenvectors are written in orthogonal form then the diagonalising equation is simplified:

$$
\begin{aligned}
A &= \left(\begin{matrix}u_1 & u_2\\v_1 & v_2\end{matrix}\right) \left(\begin{matrix}\lambda_1 & 0\\0 & \lambda_2\end{matrix}\right) \left(\begin{matrix}u_1 & u_2\\v_1 & v_2\end{matrix}\right)^{-1} \\
&= \left(\begin{matrix}u_1 & u_2\\v_1 & v_2\end{matrix}\right) \left(\begin{matrix}\lambda_1 & 0\\0 & \lambda_2\end{matrix}\right) \left(\begin{matrix}u_1 & v_1\\u_2 & v_2\end{matrix}\right).
\end{aligned}
$$

---

# Summary

- Matrix representation of simultaneous equations
- Matrix-vector and matrix-matrix multiplication
- Determinant, inverse and transpose
- Null space of singular matrices
- Finding eigenvalues and eigenvectors
- Python for solving systems, finding inverse, null space and eigenvalues/vectors
- Diagonalising matrices (we will use this for systems of differential equations)
