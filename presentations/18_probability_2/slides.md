---
theme: oxrse
title: Probability 2
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

# Philisophical conceptions of probability

- **Frequentist**: $P(A)$ describes the limiting frequency of an event $A$
  - there is a fixed value of $P(A)$ that must be calculated
  - e.g. proportion of heads from a fair coin toss will approach 0.5 after a large number of trials
- **Bayesian, or degrees of belief**: $P(A)$ is a measure of centainty, quantification of investigators belief that $A$ is true
  - a fixed value of $P(A)$ is not neccessary, nor desirable.
  - Pior information must be used to augment sample data

---

# Conditional probability

Generally, events of interest are not independent, and we want to reason about the effect one event has on another.

The **conditional probability** $P(A|B)$ is the probability that event $A$ occurs, given that (or knowing that) event $B$ has occurred.

$$P(A|B) = \frac{P(A \cap B)}{P(B)}.$$

if (and only if) the events $A$ and $B$ are independent:

$$P(A|B) = \frac{P(A)\times P(B)}{P(B)} = P(A).$$

Note that $P(A|B)$ is often quite different from $P(B|A)$.

---

# Conditional probability: Bayes' theorem

Can we determine $P(B|A)$ from $P(A|B)$ (or vice versa)?

<v-click>

Bayes' theorem, says that

$$P(B \cap A)=P(A \cap B)=P(A|B) \times P(B)=P(B|A) \times P(A)$$

therefore

$$P(B|A) = \frac{P(A|B)\times P(B)}{P(A)}$$

We can use this to make inferences about _the state a system is in_ $(B)$, from the observation of some event $(A)$.

</v-click>

---

# Conditional probability: a rare disease

As the classic example, consider a rare disease that affects 1 in 1000 people.
There is a test for the disease that is 99% accurate,

- For a random person who tests positive, how likely is it that they have the disease?
- Let A be the event "positive test" and B be the event "has the disease".
- We wish to determine P(B|A).

<v-click>

We know that $P(B)=0.001$, $P(A|B)=0.99$, and $P(A| \sim B)=0.01$.

Then

$$P(B|A) = \frac{P(A|B)\times P(B)}{P(A)} = \frac{0.99\times 0.001}{P(A)}.$$

</v-click>

---

# How do we determine P(A)?

We use the _partition rule_ for _mutually exclusive_ and _exhaustive_ events.

$$P(A) = \sum_{i=1}^n P(A\cap C_i) = \sum_{i=1}^n P(A|C_i)P(C_i).$$

<v-click>

For this particular case,

$$ {1|1-2|1-3}
\begin{aligned}
P(A) &= P(A|B)P(B) + P(A|\sim B)P(\sim B)\\
&= 0.99\times0.001 + 0.01\times0.999 \\
&= 0.01098
\end{aligned}
$$

</v-click>

<v-click>

so $P(B|A) = 0.00099/0.01098 \approx 0.09$ or 9%.

</v-click>

---

# A rare disease: intuitively

One can see this result more intuitively by thinking about testing 1000 people at random:

<v-clicks>

- 1 will be infected and probably have a positive test
- Of the 999 not infected, about 10 will also have a positive test result.

</v-clicks>

<v-click>

So only about 1 out of 11 positive tests are really due to the disease.

</v-click>

---

# Bertrand's box paradox

Suppose you have 3 boxes each containing 2 coins.
In one box both are gold, in another both are silver, and in the third there is one of each.
Choose a box at random and withdraw one coin (also at random).
If the coin taken out is gold, what is the probability that the other coin in the box is also gold?

<v-click>

**Answer:** we can label the boxes GG, GS, and SS, need to find P(GG|g).
Using Bayes' rule this is

$$ {1|1-2|1-3}
\begin{aligned}
P(\text{GG}|\text{g})
&= \frac{P(\text{g}|\text{GG})P(\text{GG})}{P(\text{g})}\\
&= \frac{1\times 1/3}{P(\text{g}|\text{GG})P(\text{GG}) + P(\text{g}|\text{GS})P(\text{GS}) + P(\text{g}|\text{SS})P(\text{SS})}\\
&= \frac{1/3}{1\times1/3+1/2\times1/3+0\times1/3}
= 2/3
\end{aligned}
$$

</v-click>

---

# Bertrand's box paradox: wait, what?

$$P(\text{GG}|\text{g}) = 2/3$$

Wait, what?

It turns out that, if you get a gold coin from the first box, it's more likely to be the box with two golden coins than the box with one golden coin!

---

# Probability distributions

What do we do if the number of possible outcomes is very large or even infinite?

We look at a _probability distribution_

- The distribution as a whole tells us "what could happen".
- We can also _sample_ the distribution to obtain a single outcome, a _random sample_ or _observation_.
- A variable $X$ is a _random variable_ if its value is a _numerical_ sample from a distribution
- Often these arise as the outcomes of a _stochastic process_: the evolution of some system over time, where changes are subject to random variation.

---

# Describing distributions: discrete

- For **discrete** data, distributions are characterised by a **probability mass function**.
- This tells us $P(X=x)$ for each possible value (sample) $x$ of the random variable $X$.
- The vertical axis shows probability.

We must have that:

$$\sum_x P(X=x) = 1$$

---

# Describing distributions: continuous

- For **continuous** data distributions are characterised by a **probability density function**.
- By convention we use $f(x)$ for this, and the **area** under the curve tells us the probability of lying within a range of values:

$$P(a < X \leq b) = \int_a^b f(x)\,dx$$

- The vertical axis this time is **probability density**, not probability.

We must also have that:

$$\int_{-\infty}^\infty f(x)\,dx = 1$$

---

# Cumulative probability

Consider the probability that a random variable $X$ is no larger than some value $x$.

This **cumulative probability** of $x$ is well defined for both discrete and continuous distributions, and gives us the **cumulative distribution function**:

$$F(x) = P(X \leq x)$$

This function always starts at $0$, ends at $1$, and never decreases as $x$ increases.

$$P(a < X \leq b) = P(X \leq b) - P(X \leq a) = F(b) - F(a)$$

---

# Cumulative probability: discrete and continuous

Note that for a discrete random variable,

$$F(x) = \sum_{y \leq x} P(X=y).$$

For a continuous random variable,

$$F(X) = \int_{-\infty}^x f(y)\,dy.$$

Therefore,

$$f(x) = \frac{d}{dx} F(x).$$

From this we can interpret the height of the probability density function $f(x)$ as telling us the rate of increase in the probability of sampling near a point $x$.

---

# Notation conventions

- Random variables are written as upper case letters (e.g. $X$)
- Specific values (samples) of random variables are written in lower case (e.g. $x$)
- Probability density functions (pdfs) are written as $f(x)$
- Cumulative density functions (cdfs) are written as $F(x)$
- The parameters of a distribution are defined collectively as $\theta$, so we might write $P(X=x|\theta)$ for the probability that a random variable $X$ with parameters $\theta$ takes value $x$.

---

# Expectation and variance

The **expectation** of a distribution is the mean value of a random variable over a large number of samples.

$$E(X) = \sum_x x P(X=x) \qquad\text{or}\qquad \int_{-\infty}^\infty xf(x)\,dx.$$

$E(X)$ is often also written as $\mu$.

<v-click>

The _variance_ of a distribution, written $\sigma^2$ or $Var(X)$, is defined as the expectation of the squared difference between a sampled value and the mean $\mu$:

$$Var(X) = E\left((X-\mu)^2\right) = \sum_x (x-\mu)^2 P(X=x)$$

or

$$\int_{-\infty}^\infty (x-\mu)^2f(x)\,dx$$

</v-click>

---

# Combining random variables

The main rules, where $X$, $Y$ are iid (**independent and indentically distributed**) random variables and $a$, $b$ are constants, are:

$$
\begin{aligned}
E(X+Y) &= E(X) + E(Y) = 2E(X) \\
Var(X+Y) &= Var(X) + Var(Y) = 2Var(X) \\
E(aX+b) &= aE(X) + b \\
Var(aX+b) &= a^2 Var(X)
\end{aligned}
$$

---

# Combining random variables: variance

We can derive what is often a simpler form for the variance,

$$ {1|1-2}
\begin{aligned}
Var(X) &= E((X-\mu)^2) = E(X^2 - 2\mu X + \mu^2) = E(X^2) -2\mu E(X) + \mu^2 \\
&= E(X^2) - \mu^2
\end{aligned}
$$

<v-click>

So for a continuous random variable,

$$Var(X) = \int_{-\infty}^\infty x^2f(x)\,dx - \mu^2.$$

</v-click>

---

# Normal distribution

$$X\sim N\left(\mu, \sigma^2\right)$$

- This is a very commonly arising distribution in the natural world
- This ubiquity is explained by the **central limit theorem**, which relates the normal to most distributions through the mean of a large number of samples.

$$f\left(x\,|\,\mu,\sigma^2\right) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

---

# Evaluating a normal distribution

Often we convert to a **standard normal** variable

$$Z = \frac{X-\mu}{\sigma}$$

which has pdf and cdf

$$
f(z) = \frac{1}{\sqrt{2\pi}}e^{-z^2/2}
\qquad\text{and}\qquad
F(z) = \Phi(z) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^z e^{-x^2/2}\,dx.
$$

Tables of $\Phi(z)$ may be consulted to calculate normal probabilities, or you can ask Python (or other software).

---

# Normal tables

see https://en.wikipedia.org/wiki/Standard_normal_table

---

# Normal distribution in Python

```python
from scipy.stats import norm

z = np.linspace(norm.ppf(0.01), norm.ppf(0.99), 100)  # ppf - Percent point function (inverse of cdf - percentiles).

f, (ax1, ax2) = plt.subplots(1,2,figsize=(12,4))
ax1.plot(z, norm.pdf(z))                              # pdf - Probability distribution function
r = norm.rvs(size=1000)                               # rvs - generate samples
ax1.hist(r, density=True, histtype='stepfilled', alpha=0.2)
ax1.set_xlabel('$z$')
ax1.set_ylabel('$f(z)$');

ax2.plot(z, norm.cdf(z))                              # cdf - Cumulative distribution function
ax2.set_xlabel('$z$')
ax2.set_ylabel('$F(z)$');
```

---
layout: two-cols
---

# Normal distribution in Python: pdf and cdf

<PlotFigure name="normal-pdf" />

::right::

<PlotFigure name="normal-cdf" />

---

# Non-standard normal distribution

The `norm` probability density function is defined in the "standard" form.
To shift and/or scale the distribution use the `loc` and `scale` parameters, which are equivilent to $\mu$ and $\sigma$ respectivly.

For example, $X$, $Y$ and $Z$ are distributed normally with mean 80 and standard deviation 5.

**1.** What is the probability that $P(X \le 82)$?

<v-click>

```python
X_loc = 80.0
X_scale = 5.0
norm.cdf(82.0, loc=X_loc, scale=X_scale)
```

```text
np.float64(0.6554217416103242)
```

</v-click>

---

# Non-standard normal distribution: examples

**2.** What is the probability that $P(X \ge 90)$?

<v-click>

```python
1.0 - norm.cdf(90.0, loc=X_loc, scale=X_scale)
```

```text
np.float64(0.02275013194817921)
```

</v-click>

**3.** What is the probability that $P(74 \le X \le 82)$?

<v-click>

```python
norm.cdf(82.0, loc=X_loc, scale=X_scale) - norm.cdf(74.0, loc=X_loc, scale=X_scale)
```

```text
np.float64(0.540352071388616)
```

</v-click>

---

# Non-standard normal distribution: examples

**4.** What is the probability that

$$P\left(\frac{X+Y+Z}{3} \le 82\right)?$$

<v-click>

```python
XYZ_loc = 3.0 * X_loc / 3.0
XYZ_scale = np.sqrt(3.0) * X_scale / 3.0
norm.cdf(82.0, loc=XYZ_loc, scale=XYZ_scale)
```

```text
np.float64(0.7557888416887032)
```

</v-click>

---

# More distributions

Next lecture: more distributions!
