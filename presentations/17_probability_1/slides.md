---
theme: oxrse
title: Probability 1
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
layout: two-cols
---

# Deterministic models

- E.g. the growth of a cell colony can be modelled by the _logistic_ equation

$$\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)$$

- Only uses non-random variables, same initial contitions and parameters with give the _same results_

::right::

<PlotFigure name="logistic" />

---
layout: two-cols
---

# Probabilistic models

- E.g. logistic equation plus random variations

$$\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right) + \epsilon$$

- $t$ is still deterministic. $N$ is a combination of deterministic and random components

::right::

<PlotFigure name="logistic" :params="{ ep: 0.01 }" />

---

# Probability

- Biological systems governed by deterministic physical laws, but randomness (and chaos) omnipresent
- Probabilitiy gives a formal mathematical system for quantifying variation and reasoning with uncertainty.
- Answer questions like:
  - "where should I plant my crops to give the highest probability of seed germination?"
  - "what is the most likely scenario of climate change in the next 100 years?"

---

# Terminology

- **Sample point, outcome**: the outcome of a single random experiment.
- **Event**: an outcome (or collection of outcomes) that are of interest.
- **Sample space**: all possible outcomes of the experiment.

e.g. a single 6-sided die:

- event $R_1$: thow a one
- event $R_2$: thow a two, etc.
- sample space $S = \{R_1, R_2, R_3, R_4, R_5, R_6\}$. This set of events is _exhaustive_, i.e. at least one of these events must occur

---

# Terminology: probability

- We represent the probability that an event $A$ occurs by $P(A)$
- Think of it as the fraction of possible outcomes making up the event, assuming all outcomes are equally likely.
- For any event $A$, $0 \le P(A) \le 1$.
- $P(A)=0$ means $A$ is impossible; $P(A)=1$ means $A$ is certain.

---

# A single 6-sided die

- The sample space $S = \{R_1, R_2, R_3, R_4, R_5, R_6\}$.
- If event $A_1 = \{\text{top face is even}\}$, $P(A_1)=3/6=1/2$.
- If event $A_2 = \{\text{top face greater than 4}\}$, $P(A_2)=2/6=1/3$.
- **Union:** $P(A_1\cup A_2)=4/6$.
- **Intersection:** $P(A_1\cap A_2)=1/6$.
- **Complement:** $P(\sim A_1)= P\left(A_1^C\right)=3/6$.

---

# Laws of probability

Let us compute probabilities for complex events.
They build on basic _axioms_ that define the ground rules.

1. $0\le P(A)\le1$
2. $P(\{\})=0$
3. $P(S)=1$
4. If $A_1, \ldots, A_n$ are _mutually exclusive_ events, then $P(A_1\cup\ldots\cup A_n)=P(A_1)+\ldots+P(A_n)$

These imply:

- From (3) and (4), $P(A^C) = 1-P(A)$.
- Addition rule: $P(A\cup B) = P(A) + P(B) - P(A\cap B)$

---

# Example: six-sided die

- event $A_1 = \{\text{top face is even}\} = \{R_2, R_4, R_6 \}$
- event $A_2 = \{\text{top face greater than 4}\}= \{R_5, R_6 \}$.

<v-click>

$$P(A_1\cup A_2) = P(A_1)+P(A_2)-P(A_1\cap A_2)=3/6+2/6-1/6=4/6.$$

</v-click>

---

# Inclusion-exclusion principle

This generalises to the inclusion-exclusion principle:

$$
\begin{aligned}
P(A_1\cup\ldots\cup A_n) = &\sum_{i=1}^nP(A_i) - \sum_{1\le i<j\le n} P(A_i\cap A_j) \\
&+\sum_{1\le i<j<k\le n} P(A_i\cap A_j\cap A_k)\\
&+ \ldots + (-1)^{n-1} P(A_1\cap\ldots\cap A_n)
\end{aligned}
$$

---

# Disjoint events

Two events are _disjoint_ if they cannot exist simultaineously.

e.g.

- event $A_1 = \{\text{top face is even}\} = \{R_2, R_4, R_6 \}$
- event $A_3 = \{\text{top face is odd}\} = \{R_1, R_3, R_5 \}$

This means that:

- $P(A_1\cap A_3) = 0$
- $P(A_1\cup A_3) = P(A_1)+P(A_2)$

---

# Independent events

Two events are _independent_ if one does not affect the outcome of another.

For independent events $A$ and $B$, the _joint probability_ of both occurring is given by multiplying:

$$P(A\cap B)=P(A)\times P(B)$$

---

# Example: two coin tosses

The joint probability of the events $\{\text{first is tails}\}$ and $\{\text{second is tails}\}$ is

$$P\left(\text{both tails}\right) = 0.5 \times 0.5 = 0.25$$

<v-click>

This can also be used as a test for independence.
Consider the previous example:

$$P(A_1\cap A_2)=1/6=1/2\times 1/3=P(A_1)\times P( A_2)$$

</v-click>

---

# Counting

When computing probabilities, often the sample points are all equally likely.
If all sample points are equally likely, the probability of an event $A$ is

$$P(A) = \frac{\#\text{ points in } A}{\#\text{ points in sample space}} = \frac{|A|}{|S|}.$$

The problem is how to count up the points in the event of interest.
This brings us to the next topic.

---

# Permutations and combinations

- A permutation is way of selecting and ordering several objects from a group of objects.
- A combination is a way of selecting several objects out of a group of objects, where (unlike permutations) order does not matter.
- _"with replacement"_: use the objects in the group as many times as we like
- _"without replacement"_: once we have used the object, it can not be used again.
- _"repetition"_: are objects indistinguishable from each other?

<!--
The reason we use the terminology replacement is because often we are thinking about selecting balls from an urn (as in the national lottery). In some situations the balls will be put back in the urn (with replacement) and in some cases they will not (without replacement).
-->

---

# Example: the lottery

Is the lottery sampled with or without replacement?

<v-click>

**Answer:** Since the balls are not put back the lottery is a sample _without_ replacement.

</v-click>

---

# Permutations with replacement

If we have $n$ distinct objects to choose from and we want to choose $r$ of them then we can do this in

$$\underbrace{n\times n\times \dots \times n}_{(r\text{ times})} = n^r$$

ways.

---

# Permutations with replacement: example

The litter size for domestic dogs ranges from 6 to 10 pups.
How many different litter combinations (combinations of male and female pups) are possible for a litter of 6?
How about 10?

<v-click>

```python
n = 2
r = 6
print('number of possible combinations for a litter of 6 =',n**r)
r = 10
print('number of possible combinations for a litter of 10 =',n**r)
```

```text
number of possible combinations for a litter of 6 = 64
number of possible combinations for a litter of 10 = 1024
```

</v-click>

---

# Permutations without replacement

For example, picking (numbered) pool balls from a bag.

If we were to choose all $n$ balls (i.e. $r=n$) then we could do this in

$$n\times (n-1)\times (n-2)\times \dots 3\times 2\times 1=n!$$

ways.

<v-click>

However, if we are only choosing the first $r<n$ balls:

$$n\times (n-1)\times (n-2)\times\dots (n-r+1) = {}_nP_r = n!/(n-r)!$$

ways.

- ${}_nP_r$ is the notation we use for permuting $r$ objects from a possible $n$
- It is often pronounced "$n$ perm $r$"

</v-click>

---

# Permutations without replacement: example

There are 16 numbered pool balls in a bag (including the cue ball which can be thought of as number 0).
How many distinct ways can you choose three balls if they are not returned to the bag.

<v-click>

```python
n = 16
r = 3
print('number of distinct ways to choose 3 pool balls from a bag of 16 = %d' % (math.factorial(n)/math.factorial(n-r)))
```

```text
number of distinct ways to choose 3 pool balls from a bag of 16 = 3360
```

</v-click>

---

# Permutations with repetition

In this context repetition means that some of the objects we are arranging are identical.

### Example

How many distinct ways are there of arranging the letters of the word TOMATO?

<v-click>

**Answer:** $n=6$, $r=6$.

- If there were no repetitions then there would be $n!/(n-r)!=6!/0!=6!$
- However, since we have 2 Ts and 2 Os, some of our combinations will be redundant.
- number of ways we can arrange 2 Ts ($2!$) and the number of ways we can arrange 2 Os ($2!$).
- So the number of redundant arrangements is $2!\times2!$.
- So the number of distinct arrangements of the word TOMATO is $6!/(2!\times2!)=180$.

</v-click>

---

# Combinations without replacement

Number of combinations of size $r$ from $n$ distinct objects (which is often written ${}_nC_r$ and pronounced "$n$ choose $r$")

- The number of permutations of size $r$ from $n$ objects is given by ${}_nP_r=n!/(n-r)!$,
- but now that we don't care about order. We need to divide this number by $r!$ to find the number of combinations:

$${}_nC_r=\frac{n!}{(n-r)!r!}.$$

${}_nC_r$ is often written using "big bracket" notation, also known as the binomial coefficient:

$${{n}\choose{r}}$$

---

# Combinations without replacement: example 1

From a bag of 16 pool balls, how many combinations of 3 balls are there?
How many combinations of 13 balls are there?

$${}_nC_r=\frac{n!}{(n-r)!r!}.$$

<v-click>

```python
n = 16
r = 3
print('number of combinations of 3 balls = %d' % (math.factorial(n)/math.factorial(n-r)/math.factorial(r)))
r = 13
print('number of combinations of 13 balls = %d' % (math.factorial(n)/math.factorial(n-r)/math.factorial(r)))
```

```text
number of combinations of 3 balls = 560
number of combinations of 13 balls = 560
```

</v-click>

---

# Combinations without replacement: example 2

How many litters of 5 puppies can you have with 2 female?

<v-click>

```python
n = 5
r = n-2
print('number of litters = %d' % (math.factorial(n)/math.factorial(n-r)/math.factorial(r)))
#or
r = 2
print('number of litters = %d' % (math.factorial(n)/math.factorial(n-r)/math.factorial(r)))
```

```text
number of litters = 10
number of litters = 10
```

</v-click>

---

# Combinations with replacement

(FYI, not in the exercise sheet)

This time we are trying to select $r$ objects from a possible $n$ distinct objects, but now we can select each object more than once.

<v-clicks>

- We can reformulate this problem and imagine that we have $r$ identical balls to place in $n$ distinct boxes.
- We let 0s represent putting a ball in a box and 1s represent moving from one box to the next then we can represent any such combination as a series of $r$ 0s and $n-1$ 1s. Note we have $n-1$ 1s since we only have to move $n-1$ times to get between the $n$ boxes.
- Essentially we have reduced the problem to one of choosing how to position the 0s in our series of 0s and 1s.

</v-clicks>

---

# Combinations with replacement: example

You're choosing dessert at a restaurant.
You've decided on ice cream.
There are five flavours of ice cream: banana, chocolate, lemon, strawberry and vanilla.
You can have three scoops.
How many possible deserts can you choose from?

- $\{B, C, L, S, V\}$
- We represent $\{C,C,C\}$ as $\{1, 0, 0, 0, 1, 1, 1\}$
- We represent $\{C,C,S\}$ as $\{1, 0, 0, 1, 1, 0, 1\}$

So we simply need to choose $r$ 0s from a list of length $r+n-1$.

---

# Combinations with replacement: example

This is the problem of permuting $n+r-1$ objects (the total number of 0s and 1s) of two different types: $r$ 0s and $n-1$ 1s.

Recalling the formula:

$${}_{n+r-1}C_r = {{r + n - 1}\choose{r}} = \frac{(n+r-1)!}{r!(n-1)!}$$

Again since this formula is symmetric we realise that the problem of choosing which balls to put into which boxes (i.e. the positioning of the 0s) is the same as the problem of deciding when to move between boxes (i.e. positioning the 1s).

<v-click>

**Answer:** ${}_{5+3-1}C_3=7!/(3!\times4!)=35$.

</v-click>
