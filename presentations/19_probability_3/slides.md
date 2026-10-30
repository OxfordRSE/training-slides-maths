---
theme: oxrse
title: Probability 3
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

# Standard distributions

- Standard distributions, such as the Normal distribution, give succinct descriptions of commonly occurring kinds of variation, and hence have well known properties.
- But remember that any function summing/integrating to 1 can also describe a distribution.

<!--
Presentation notes: get the audience to think of examples for each distribution, and display histograms/pdfs in Matlab for different parameter values. Make sure to derive expectation & variance in each case.
% TODO: Write a Matlab script for the above!
-->

---

# Bernoulli

An outcome can be either $1$ ("success") or $0$ ("failure") with probabilities $\theta$ and $(1-\theta)$ respectively.

- The probability of observing a sequence of $n$ samples with $k$ 1s is $\theta^k(1-\theta)^{n-k}$.
- The expectation is $\theta$ and the variance is $\theta(1-\theta)$.

We write $X\sim\text{Bernoulli}(\theta)$ to say that $X$ has a Bernoulli distribution with parameter $\theta$.

---

# Binomial

$$X\sim B(n,\theta)$$

Often we don't care about the order in which "successes" or "failures" happen, just how many there are of each.

- The probability of $k$ successes in $n$ Bernoulli trials is given by the **Binomial** distribution.
- Each order has the same probability (given by the Bernoulli formula above), and the number of possible orderings is ${}_nC_k$, so

$$P(X=k|n,\theta) = {n\choose k}\theta^k(1-\theta)^{n-k} = \frac{n!}{(n-k)!k!}\theta^k(1-\theta)^{n-k}$$

- The expectation is $n\theta$ and the variance is $n\theta(1-\theta)$.

---

# Binomial distribution

<PlotFigure name="binomial" />

---

# Geometric

$$X\sim\text{Geom}(\theta)$$

- The probability of success in a Bernoulli trial is not influenced by (is independent of) previous trials; this is known as the **memory-less** property.
- The number of trials between subsequent successes, or equivalently the probability that the first success is on the $k^{\text{th}}$ trial, has the **Geometric** distribution.

$$P(X=k|\theta) = \theta(1-\theta)^{k-1}$$

- The expectation is $1/\theta$ and the variance is $(1-\theta)/\theta^2$.

---

# Geometric distribution

<PlotFigure name="geometric" />

---

# Poisson

$$X\sim\text{Pois}(\mu)$$

- This distribution models the number of times an event occurs in a fixed interval of time (and/or space) if these events occur with a known fixed average rate $\mu$ and independently of the time since the last event.
- It is is often used to model "rare" events, e.g. the number of deaths per year in a given age group.
- It can be derived as the limit of the Binomial distribution as the number of trials increases $(n\to\infty)$ but the expectation $\mu$ is fixed (so $\theta\to 0$).

$$P(X=k|\mu) = \frac{e^{-\mu} \mu^k}{k!}$$

- The expectation is $\mu$ and the variance is also $\mu$.

<!--
% TODO: Matlab script should compare Poisson(4) with Binomial(200,0.02) histograms
-->

---

# Poisson distribution

<PlotFigure name="poisson" />

---

# Comparing binomial and Poisson

<PlotFigure name="binomial-poisson" />

---

# Uniform

$$X\sim U(a,b)$$

- Here the random variable has the same probability across the whole domain.
- It is often used as a prior in _Bayesian inference_ to represent no special _a priori_ knowledge.
- The pdf and cdf for a uniform distribution between $a$ and $b$ are:

$$
f(x|a,b) = \begin{cases}
    \frac{1}{b-a} & \text{if } a < x \leq b \\
    0             & \text{otherwise}
\end{cases},
\qquad
F(x) = \begin{cases}
    \frac{x-a}{b-a} & \text{if } a < x \leq b \\
    0               & \text{if } x \leq a \\
    1               & \text{if } x > b
\end{cases}
$$

- The expectation is $(a+b)/2$ and the variance is $(b-a)^2/12$.

---

# Uniform distribution

<PlotFigure name="uniform" />

---

# Exponential

$$X\sim\text{Exp}(\lambda)$$

- This describes the time between events in a Poisson process, i.e. a process in which events occur continuously and independently at a constant average rate $\lambda$ (and multiple events cannot happen at the same instant).
- It can also be used for the distance between events in space under the corresponding assumptions.
- It is the continuous analogue of the Geometric distribution, and has the corresponding memory-less property. For continuous distributions, this is $f(x+t|X>t)=f(x)$.

---

# Exponential: pdf and cdf

The pdf and cdf are:

$$
f(x|\lambda) = \begin{cases}
    \lambda e^{-\lambda x} & \text{if } x \geq 0 \\
    0                   & \text{otherwise}
\end{cases},
\qquad
F(x) = \begin{cases}
    1-e^{-\lambda x} & \text{if } x \geq 0 \\
    0               & \text{if } x < 0
\end{cases}
$$

- The expectation is $1/\lambda$ and the variance is $1/\lambda^2$.

---

# Exponential distribution

<PlotFigure name="exponential" />

---

# Gamma

$$X\sim\text{Gamma}(\alpha, \beta)$$

- The gamma distribution arises as the sum of iid exponentially distributed random variables
- if $X_i\sim\text{Exp}(\lambda)$ and $S = X_1 + X_2 + \ldots + X_n$ then $S\sim\text{Gamma}(n,\lambda)$.

The pdf and cdf are:

$$
f(x|\alpha,\beta) = \begin{cases}
    \frac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x} & \text{if } x \geq 0 \\
    0                                                    & \text{otherwise}
\end{cases},
\quad
F(x) = \begin{cases}
    \frac{\gamma(\alpha,\beta x)}{\Gamma(\alpha)} & \text{if } x \geq 0 \\
    0                                             & \text{if } x < 0
\end{cases}
$$

where $\alpha = n$, $\beta = \lambda$, $\Gamma$ is the gamma function (an extension of the factorial function), and $\gamma$ is the lower incomplete gamma function.

- The expectation is $\alpha/\beta$ and the variance is $\alpha/\beta^2$.

---

# Gamma distribution

<PlotFigure name="gamma" />

---

# Comparing exponential and gamma

<PlotFigure name="exponential-gamma" />

---

# Normal

$$X\sim N(\mu, \sigma^2)$$

- This is a very commonly arising distribution in the natural world
- it is the limiting case of the Binomial and Poisson distributions with large means.
- This ubiquity is explained by the **central limit theorem**, which relates the normal to most distributions through the mean of a large number of samples.

$$f(x|\mu,\sigma^2) = \frac{1}{\sigma\sqrt{2\pi}} e^{-((x-\mu)^2/2\sigma^2)}$$

<!--
% TODO: Show Normal & Poisson on same plot in Matlab script
-->

---

# Normal distribution

<PlotFigure name="normal" />

---

# Comparing normal and Poisson distribution

<PlotFigure name="normal-poisson" />

---

# Cautionary Python

The parameterisations of the distributions in Python do not always match those above, so it is wise to check the documentation for each distribution.
