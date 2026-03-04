import type { Question } from '../../../types';

export const questionBank: Question[] = [
  // ══════════════════════════════════════════════════════════════
  // complex-systems (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'cs-1',
    nodeId: 'complex-systems',
    type: 'multiple-choice',
    question: 'Which of the following is an example of emergent behaviour?',
    options: [
      'A single water molecule evaporating',
      'Flocking patterns in birds arising from simple local rules',
      'A ball rolling down a frictionless incline',
      'Solving a quadratic equation analytically'
    ],
    correctIndex: 1,
    explanation: 'Emergent behaviour arises from the interactions of components but is not a property of any individual component. Flocking in birds emerges from each bird following simple rules (separation, alignment, cohesion) — the formation is not programmed into any single bird.'
  },
  {
    id: 'cs-2',
    nodeId: 'complex-systems',
    type: 'multiple-choice',
    question: 'A model where the next state depends only on the current state and uses exact equations (no randomness) is best described as:',
    options: [
      'Stochastic and continuous',
      'Deterministic and discrete',
      'Deterministic and continuous',
      'Stochastic and discrete'
    ],
    correctIndex: 2,
    explanation: 'Deterministic means no randomness — the future is fully determined by the present state. Continuous means the state variables and time are real-valued rather than taking only discrete steps.'
  },
  {
    id: 'cs-3',
    nodeId: 'complex-systems',
    type: 'multiple-choice',
    question: 'In a directed network, the in-degree of a node is:',
    options: [
      'The number of edges leaving the node',
      'The total number of edges connected to the node',
      'The number of edges entering the node',
      'The shortest path length from the node to all others'
    ],
    correctIndex: 2,
    explanation: 'In a directed graph, edges have a direction. The in-degree counts how many edges point into the node, while the out-degree counts edges pointing out.'
  },

  // ══════════════════════════════════════════════════════════════
  // discrete-probability (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'dp-1',
    nodeId: 'discrete-probability',
    type: 'multiple-choice',
    question: 'Two fair six-sided dice are rolled. What is the probability that their sum equals 7?',
    options: [
      '1/6',
      '1/12',
      '7/36',
      '1/9'
    ],
    correctIndex: 0,
    explanation: 'There are 36 equally likely outcomes. Pairs that sum to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — that is 6 outcomes. So the probability is 6/36 = 1/6.'
  },
  {
    id: 'dp-2',
    nodeId: 'discrete-probability',
    type: 'multiple-choice',
    question: 'A bag contains 3 red and 5 blue balls. Two balls are drawn without replacement. What is the probability both are red?',
    options: [
      '9/64',
      '3/28',
      '3/8',
      '6/56'
    ],
    correctIndex: 1,
    explanation: 'P(first red) = 3/8. Given first is red, P(second red) = 2/7. Combined: (3/8)(2/7) = 6/56 = 3/28.'
  },
  {
    id: 'dp-3',
    nodeId: 'discrete-probability',
    type: 'multiple-choice',
    question: 'Which statement correctly describes mutually exclusive events A and B (both with positive probability)?',
    options: [
      'P(A ∩ B) = P(A)·P(B)',
      'P(A ∪ B) = P(A) + P(B)',
      'P(A | B) = P(A)',
      'A and B must also be independent'
    ],
    correctIndex: 1,
    explanation: 'Mutually exclusive means A and B cannot both occur, so P(A ∩ B) = 0. The addition rule therefore simplifies to P(A ∪ B) = P(A) + P(B). They cannot be independent because P(A|B) = 0 ≠ P(A).'
  },

  // ══════════════════════════════════════════════════════════════
  // random-variables (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'rv-1',
    nodeId: 'random-variables',
    type: 'multiple-choice',
    question: 'A discrete random variable X has P(X=1)=0.2, P(X=2)=0.5, P(X=3)=0.3. What is E[X]?',
    options: [
      '1.9',
      '2.0',
      '2.1',
      '2.2'
    ],
    correctIndex: 2,
    explanation: 'E[X] = 1(0.2) + 2(0.5) + 3(0.3) = 0.2 + 1.0 + 0.9 = 2.1.'
  },
  {
    id: 'rv-2',
    nodeId: 'random-variables',
    type: 'multiple-choice',
    question: 'If Var(X) = 4, what is the standard deviation of X?',
    options: [
      '16',
      '2',
      '8',
      '4'
    ],
    correctIndex: 1,
    explanation: 'Standard deviation is the square root of variance. √4 = 2.'
  },
  {
    id: 'rv-3',
    nodeId: 'random-variables',
    type: 'multiple-choice',
    question: 'For independent random variables X and Y, which identity is always true?',
    options: [
      'Var(X + Y) = Var(X) · Var(Y)',
      'E[XY] = E[X] + E[Y]',
      'Var(X + Y) = Var(X) + Var(Y)',
      'E[X + Y] = E[X] · E[Y]'
    ],
    correctIndex: 2,
    explanation: 'For independent X and Y, variances add: Var(X+Y) = Var(X) + Var(Y). Expectations always add (E[X+Y] = E[X]+E[Y]) regardless of independence, but variance addition requires independence.'
  },

  // ══════════════════════════════════════════════════════════════
  // named-distributions (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nd-1',
    nodeId: 'named-distributions',
    type: 'multiple-choice',
    question: 'X ~ Binomial(n=10, p=0.4). What is E[X]?',
    options: [
      '0.4',
      '4',
      '6',
      '2.4'
    ],
    correctIndex: 1,
    explanation: 'For a Binomial distribution, E[X] = np = 10 × 0.4 = 4.'
  },
  {
    id: 'nd-2',
    nodeId: 'named-distributions',
    type: 'multiple-choice',
    question: 'A Poisson random variable with λ=3 models the number of events in a fixed interval. What is the variance?',
    options: [
      '9',
      '√3',
      '3',
      '1/3'
    ],
    correctIndex: 2,
    explanation: 'For a Poisson distribution, both the mean and variance equal λ. So Var(X) = 3.'
  },
  {
    id: 'nd-3',
    nodeId: 'named-distributions',
    type: 'multiple-choice',
    question: 'The Geometric distribution with parameter p models:',
    options: [
      'The number of successes in n trials',
      'The number of trials until the first success',
      'The time between events in a Poisson process',
      'The number of events in a fixed time window'
    ],
    correctIndex: 1,
    explanation: 'The Geometric distribution counts the number of independent Bernoulli trials needed to get the first success. Its mean is 1/p.'
  },

  // ══════════════════════════════════════════════════════════════
  // continuous-distributions (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'cd-1',
    nodeId: 'continuous-distributions',
    type: 'multiple-choice',
    question: 'For a continuous random variable, P(X = c) for any specific constant c equals:',
    options: [
      'The value of the PDF at c',
      'The value of the CDF at c',
      '0',
      'It depends on the distribution'
    ],
    correctIndex: 2,
    explanation: 'For any continuous random variable, the probability of any single point is 0, because integrating the PDF over a zero-width interval gives 0.'
  },
  {
    id: 'cd-2',
    nodeId: 'continuous-distributions',
    type: 'multiple-choice',
    question: 'X ~ Uniform(0, 10). What is P(3 < X < 7)?',
    options: [
      '0.3',
      '0.7',
      '0.4',
      '4'
    ],
    correctIndex: 2,
    explanation: 'For Uniform(a,b), P(c < X < d) = (d−c)/(b−a) = (7−3)/(10−0) = 4/10 = 0.4.'
  },
  {
    id: 'cd-3',
    nodeId: 'continuous-distributions',
    type: 'multiple-choice',
    question: 'If X ~ Normal(μ=50, σ=5), approximately what percentage of values fall within one standard deviation of the mean?',
    options: [
      '50%',
      '68%',
      '95%',
      '99.7%'
    ],
    correctIndex: 1,
    explanation: 'The empirical (68-95-99.7) rule states that ~68% of values fall within ±1σ, ~95% within ±2σ, and ~99.7% within ±3σ for a normal distribution.'
  },

  // ══════════════════════════════════════════════════════════════
  // central-limit-theorem (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'clt-1',
    nodeId: 'central-limit-theorem',
    type: 'multiple-choice',
    question: 'The Central Limit Theorem states that the sampling distribution of the sample mean approaches normal as:',
    options: [
      'The population becomes normally distributed',
      'The variance of the population decreases',
      'The sample size increases',
      'The number of samples increases'
    ],
    correctIndex: 2,
    explanation: 'The CLT applies regardless of the population distribution. As the sample size n increases (typically n ≥ 30 is sufficient), the distribution of the sample mean X̄ approaches N(μ, σ²/n).'
  },
  {
    id: 'clt-2',
    nodeId: 'central-limit-theorem',
    type: 'multiple-choice',
    question: 'A population has mean μ=100 and σ=20. For samples of size n=100, the standard error of the mean is:',
    options: [
      '20',
      '2',
      '0.2',
      '200'
    ],
    correctIndex: 1,
    explanation: 'Standard error = σ/√n = 20/√100 = 20/10 = 2.'
  },
  {
    id: 'clt-3',
    nodeId: 'central-limit-theorem',
    type: 'multiple-choice',
    question: 'The CLT is particularly useful because it:',
    options: [
      'Tells us the exact distribution of any population',
      'Allows normal-based inference even when the population is not normal',
      'Guarantees that large samples are unbiased',
      'Eliminates sampling error for large samples'
    ],
    correctIndex: 1,
    explanation: 'The practical power of the CLT is that we can use z-tests and confidence intervals based on the normal distribution even when we do not know the population distribution, provided n is large enough.'
  },

  // ══════════════════════════════════════════════════════════════
  // statistical-inference (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'si-1',
    nodeId: 'statistical-inference',
    type: 'multiple-choice',
    question: 'A 95% confidence interval for a mean is (42, 58). Which interpretation is correct?',
    options: [
      'There is a 95% probability that the true mean lies in (42, 58)',
      'If we repeated the procedure many times, 95% of intervals would contain the true mean',
      '95% of data values lie between 42 and 58',
      'The sample mean is between 42 and 58 with probability 0.95'
    ],
    correctIndex: 1,
    explanation: 'A confidence interval is a procedure: 95% of intervals constructed this way will contain the true parameter. Any specific interval either contains the true mean or it does not — the 95% refers to the long-run frequency of the procedure.'
  },
  {
    id: 'si-2',
    nodeId: 'statistical-inference',
    type: 'multiple-choice',
    question: 'A hypothesis test yields p = 0.03. At significance level α = 0.05, you should:',
    options: [
      'Fail to reject H₀ because 0.03 < 0.05',
      'Reject H₀ because 0.03 < 0.05',
      'Accept H₀ because the p-value is small',
      'Reject H₁ because the p-value is small'
    ],
    correctIndex: 1,
    explanation: 'We reject H₀ when p ≤ α. Here 0.03 ≤ 0.05, so we reject H₀. Note: we never "accept" H₀ — we either reject it or fail to reject it.'
  },
  {
    id: 'si-3',
    nodeId: 'statistical-inference',
    type: 'multiple-choice',
    question: 'A Type II error occurs when:',
    options: [
      'We reject a true null hypothesis',
      'We fail to reject a false null hypothesis',
      'The p-value exceeds 1',
      'The sample size is too small to compute a test statistic'
    ],
    correctIndex: 1,
    explanation: 'Type I error: rejecting a true H₀ (false positive). Type II error: failing to reject a false H₀ (false negative). The probability of a Type II error is denoted β, and power = 1 − β.'
  },

  // ══════════════════════════════════════════════════════════════
  // markov-chains (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'mc-1',
    nodeId: 'markov-chains',
    type: 'multiple-choice',
    question: 'The Markov property states that:',
    options: [
      'The chain always converges to a uniform distribution',
      'Future states depend on the entire history of the chain',
      'The future state depends only on the current state, not the past',
      'Transition probabilities must be symmetric'
    ],
    correctIndex: 2,
    explanation: 'The Markov (memoryless) property: given the present state, the future is independent of the past. P(Xₙ₊₁ = j | Xₙ = i, Xₙ₋₁, …) = P(Xₙ₊₁ = j | Xₙ = i).'
  },
  {
    id: 'mc-2',
    nodeId: 'markov-chains',
    type: 'multiple-choice',
    question: 'A stationary distribution π of a Markov chain satisfies:',
    options: [
      'π = πP (where P is the transition matrix)',
      'πP = 0',
      'π = P²',
      'Pπ = I (the identity matrix)'
    ],
    correctIndex: 0,
    explanation: 'The stationary (steady-state) distribution satisfies π = πP, meaning that if the chain starts in distribution π it remains in π after any number of steps. The entries of π must also sum to 1.'
  },
  {
    id: 'mc-3',
    nodeId: 'markov-chains',
    type: 'multiple-choice',
    question: 'An irreducible, aperiodic Markov chain on a finite state space:',
    options: [
      'Has no stationary distribution',
      'Converges to a unique stationary distribution from any starting state',
      'Must have all transition probabilities equal',
      'Cannot return to its starting state'
    ],
    correctIndex: 1,
    explanation: 'By the fundamental theorem of Markov chains, an irreducible (all states communicate) and aperiodic chain on a finite state space converges to a unique stationary distribution π, regardless of the initial state.'
  },

  // ══════════════════════════════════════════════════════════════
  // linear-algebra-foundations (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'la-1',
    nodeId: 'linear-algebra-foundations',
    type: 'multiple-choice',
    question: 'Which of the following sets of vectors is linearly independent?',
    options: [
      '{(1,2), (2,4)}',
      '{(1,0), (0,1)}',
      '{(1,1), (2,2), (3,3)}',
      '{(0,0), (1,0)}'
    ],
    correctIndex: 1,
    explanation: 'The standard basis vectors (1,0) and (0,1) are linearly independent — neither is a scalar multiple of the other. Options A and C have vectors that are multiples of each other; option D contains the zero vector (which makes any set linearly dependent).'
  },
  {
    id: 'la-2',
    nodeId: 'linear-algebra-foundations',
    type: 'multiple-choice',
    question: 'If A is a 3×4 matrix, what is the maximum possible rank of A?',
    options: [
      '4',
      '12',
      '3',
      '7'
    ],
    correctIndex: 2,
    explanation: 'The rank of a matrix cannot exceed either its number of rows or columns. For a 3×4 matrix, rank ≤ min(3,4) = 3.'
  },
  {
    id: 'la-3',
    nodeId: 'linear-algebra-foundations',
    type: 'multiple-choice',
    question: 'The null space (kernel) of matrix A consists of:',
    options: [
      'All vectors b such that Ax = b has a solution',
      'All vectors x such that Ax = 0',
      'The set of rows of A',
      'All eigenvalues of A'
    ],
    correctIndex: 1,
    explanation: 'The null space (kernel) of A is {x : Ax = 0}. Its dimension is the nullity of A, and by the rank-nullity theorem: rank(A) + nullity(A) = number of columns.'
  },

  // ══════════════════════════════════════════════════════════════
  // matrix-operations (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'mo-1',
    nodeId: 'matrix-operations',
    type: 'multiple-choice',
    question: 'Given A = [[1,2],[3,4]] and B = [[5,6],[7,8]], what is the (1,1) entry (0-indexed row 0, col 0) of AB?',
    options: [
      '5',
      '19',
      '23',
      '26'
    ],
    correctIndex: 1,
    explanation: '(AB)₀₀ = A row 0 · B col 0 = (1)(5) + (2)(7) = 5 + 14 = 19.'
  },
  {
    id: 'mo-2',
    nodeId: 'matrix-operations',
    type: 'multiple-choice',
    question: 'The transpose of an m×n matrix A is:',
    options: [
      'An m×n matrix with rows and columns swapped',
      'An n×m matrix where (Aᵀ)ᵢⱼ = Aⱼᵢ',
      'The inverse of A',
      'A matrix where every entry is negated'
    ],
    correctIndex: 1,
    explanation: 'The transpose Aᵀ is n×m, and its (i,j) entry equals the (j,i) entry of A. In other words, rows become columns and columns become rows.'
  },
  {
    id: 'mo-3',
    nodeId: 'matrix-operations',
    type: 'multiple-choice',
    question: 'For square matrices A and B (both invertible), (AB)⁻¹ equals:',
    options: [
      'A⁻¹B⁻¹',
      'B⁻¹A⁻¹',
      '(BA)⁻¹',
      'AᵀBᵀ'
    ],
    correctIndex: 1,
    explanation: 'The inverse of a product reverses the order: (AB)⁻¹ = B⁻¹A⁻¹. This is analogous to putting on socks then shoes — you must remove shoes before socks.'
  },

  // ══════════════════════════════════════════════════════════════
  // eigenvalues-eigenvectors (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ev-1',
    nodeId: 'eigenvalues-eigenvectors',
    type: 'multiple-choice',
    question: 'A vector v is an eigenvector of matrix A if:',
    options: [
      'Av = 0',
      'Av = λv for some scalar λ',
      'Av = v for all scalars',
      'v is in the null space of A'
    ],
    correctIndex: 1,
    explanation: 'An eigenvector v (non-zero) satisfies Av = λv, meaning A only scales v by the eigenvalue λ without changing its direction.'
  },
  {
    id: 'ev-2',
    nodeId: 'eigenvalues-eigenvectors',
    type: 'multiple-choice',
    question: 'The eigenvalues of A = [[3,0],[0,5]] are:',
    options: [
      '3 and 5',
      '15 and 0',
      '8 and 2',
      '1 and 1'
    ],
    correctIndex: 0,
    explanation: 'For a diagonal matrix, the eigenvalues are the diagonal entries. Here λ₁ = 3 and λ₂ = 5, with eigenvectors (1,0) and (0,1) respectively.'
  },
  {
    id: 'ev-3',
    nodeId: 'eigenvalues-eigenvectors',
    type: 'multiple-choice',
    question: 'Which of the following is true about the eigenvalues of a real symmetric matrix?',
    options: [
      'They are always complex',
      'They are always real',
      'They are always positive',
      'They are always distinct'
    ],
    correctIndex: 1,
    explanation: 'By the spectral theorem, real symmetric matrices always have real eigenvalues. Their eigenvectors corresponding to distinct eigenvalues are also orthogonal.'
  },

  // ══════════════════════════════════════════════════════════════
  // differential-equations-intro (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'de-1',
    nodeId: 'differential-equations-intro',
    type: 'multiple-choice',
    question: 'The order of the ODE d³y/dx³ + 2(dy/dx) = x is:',
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    correctIndex: 2,
    explanation: 'The order of a differential equation is the order of the highest derivative present. Here the highest derivative is d³y/dx³ (third order), so the ODE is third order.'
  },
  {
    id: 'de-2',
    nodeId: 'differential-equations-intro',
    type: 'multiple-choice',
    question: 'The general solution of dy/dx = ky (k constant, k ≠ 0) is:',
    options: [
      'y = kx + C',
      'y = Ce^(kx)',
      'y = k·ln(x) + C',
      'y = x^k + C'
    ],
    correctIndex: 1,
    explanation: 'Separating: dy/y = k dx, integrating gives ln|y| = kx + C₀, so y = Ce^(kx). This models exponential growth (k>0) or decay (k<0).'
  },
  {
    id: 'de-3',
    nodeId: 'differential-equations-intro',
    type: 'multiple-choice',
    question: 'An equilibrium (fixed point) of the ODE dx/dt = f(x) satisfies:',
    options: [
      'x = 0',
      'f(x) = 1',
      'f(x) = 0',
      'dx/dt = x'
    ],
    correctIndex: 2,
    explanation: 'At an equilibrium, the state does not change over time, so dx/dt = 0. This means f(x*) = 0 at the equilibrium point x*.'
  },

  // ══════════════════════════════════════════════════════════════
  // linear-odes (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'lo-1',
    nodeId: 'linear-odes',
    type: 'multiple-choice',
    question: 'The ODE y\' + P(x)y = Q(x) is a first-order linear ODE. Its integrating factor is:',
    options: [
      'e^(∫Q(x)dx)',
      'e^(∫P(x)dx)',
      '1/P(x)',
      'P(x)/Q(x)'
    ],
    correctIndex: 1,
    explanation: 'Multiplying both sides by μ(x) = e^(∫P(x)dx) makes the left side an exact derivative: d/dx[μ(x)y] = μ(x)Q(x), which can then be integrated directly.'
  },
  {
    id: 'lo-2',
    nodeId: 'linear-odes',
    type: 'multiple-choice',
    question: 'The characteristic equation of y\'\' - 5y\' + 6y = 0 is:',
    options: [
      'r² - 5r + 6 = 0',
      'r² + 5r + 6 = 0',
      'r² - 5r - 6 = 0',
      'r - 5 + 6 = 0'
    ],
    correctIndex: 0,
    explanation: 'Substituting y = e^(rx) gives the characteristic equation r² - 5r + 6 = 0, which factors as (r-2)(r-3) = 0. The general solution is y = C₁e^(2x) + C₂e^(3x).'
  },
  {
    id: 'lo-3',
    nodeId: 'linear-odes',
    type: 'multiple-choice',
    question: 'For y\' + 2y = 0 with y(0) = 3, the solution is:',
    options: [
      'y = 3e^(2x)',
      'y = 2e^(-3x)',
      'y = 3e^(-2x)',
      'y = e^(-2x) + 3'
    ],
    correctIndex: 2,
    explanation: 'The general solution is y = Ce^(-2x). Applying y(0) = 3: 3 = Ce^0 = C. So y = 3e^(-2x).'
  },

  // ══════════════════════════════════════════════════════════════
  // systems-of-odes (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'so-1',
    nodeId: 'systems-of-odes',
    type: 'multiple-choice',
    question: 'For the linear system x\' = Ax, the nature of the equilibrium at the origin depends on:',
    options: [
      'The determinant of A only',
      'The trace of A only',
      'The eigenvalues of A',
      'The rank of A'
    ],
    correctIndex: 2,
    explanation: 'The stability and type of equilibrium (node, spiral, saddle, centre) are determined by the eigenvalues of A. Real parts determine growth/decay; imaginary parts indicate oscillation.'
  },
  {
    id: 'so-2',
    nodeId: 'systems-of-odes',
    type: 'multiple-choice',
    question: 'If the eigenvalues of A are λ₁ = -1 and λ₂ = -3 (both negative real), the equilibrium is a:',
    options: [
      'Unstable node',
      'Stable spiral',
      'Saddle point',
      'Stable node'
    ],
    correctIndex: 3,
    explanation: 'Both eigenvalues are real and negative, so trajectories decay to the origin — a stable node. A saddle requires eigenvalues of opposite sign; a spiral requires complex eigenvalues.'
  },
  {
    id: 'so-3',
    nodeId: 'systems-of-odes',
    type: 'multiple-choice',
    question: 'Eigenvalues λ = ±2i (purely imaginary) give an equilibrium that is a:',
    options: [
      'Stable spiral',
      'Unstable node',
      'Centre (neutrally stable)',
      'Saddle point'
    ],
    correctIndex: 2,
    explanation: 'Purely imaginary eigenvalues (zero real part) give closed elliptical orbits around the equilibrium — a centre. The system neither grows nor decays.'
  },

  // ══════════════════════════════════════════════════════════════
  // numerical-methods-odes (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nm-1',
    nodeId: 'numerical-methods-odes',
    type: 'multiple-choice',
    question: 'Euler\'s method approximates the solution of y\' = f(x,y) by:',
    options: [
      'yₙ₊₁ = yₙ + h·f(xₙ, yₙ)',
      'yₙ₊₁ = yₙ + h·f(xₙ₊₁, yₙ₊₁)',
      'yₙ₊₁ = yₙ·e^(hf)',
      'yₙ₊₁ = yₙ + (h/2)·(f(xₙ,yₙ) + f(xₙ₊₁,yₙ₊₁))'
    ],
    correctIndex: 0,
    explanation: 'Euler\'s (forward/explicit) method uses the tangent line at the current point: yₙ₊₁ = yₙ + h·f(xₙ,yₙ). It has local truncation error O(h²) and global error O(h).'
  },
  {
    id: 'nm-2',
    nodeId: 'numerical-methods-odes',
    type: 'multiple-choice',
    question: 'The Runge-Kutta RK4 method has global error of order:',
    options: [
      'O(h)',
      'O(h²)',
      'O(h³)',
      'O(h⁴)'
    ],
    correctIndex: 3,
    explanation: 'RK4 is a fourth-order method with global error O(h⁴). Halving the step size reduces the error by a factor of ~16, making it much more accurate than Euler\'s O(h) method.'
  },
  {
    id: 'nm-3',
    nodeId: 'numerical-methods-odes',
    type: 'multiple-choice',
    question: 'Reducing the step size h in Euler\'s method:',
    options: [
      'Always leads to exact solutions',
      'Has no effect on accuracy',
      'Improves accuracy but increases computation time',
      'Decreases accuracy due to more steps'
    ],
    correctIndex: 2,
    explanation: 'Smaller h gives a better linear approximation at each step, reducing accumulated error. However, more steps are needed to reach the same endpoint, increasing computation. Very small h can also accumulate floating-point rounding error.'
  },

  // ══════════════════════════════════════════════════════════════
  // optimisation-intro (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'oi-1',
    nodeId: 'optimisation-intro',
    type: 'multiple-choice',
    question: 'Gradient descent updates parameters by:',
    options: [
      'Moving in the direction of the gradient',
      'Moving opposite to the gradient, scaled by a learning rate',
      'Setting all parameters to zero',
      'Adding the Hessian to the parameters'
    ],
    correctIndex: 1,
    explanation: 'To minimise a function, gradient descent moves opposite to the gradient (steepest ascent direction): θ ← θ − α∇f(θ), where α is the learning rate.'
  },
  {
    id: 'oi-2',
    nodeId: 'optimisation-intro',
    type: 'multiple-choice',
    question: 'A necessary condition for x* to be a local minimum of a differentiable function f is:',
    options: [
      'f\'(x*) > 0',
      'f\'(x*) = 0',
      'f\'\' (x*) < 0',
      'f(x*) = 0'
    ],
    correctIndex: 1,
    explanation: 'At a local extremum of a differentiable function, the first derivative (gradient) must be zero. This is a necessary but not sufficient condition — it identifies critical points.'
  },
  {
    id: 'oi-3',
    nodeId: 'optimisation-intro',
    type: 'multiple-choice',
    question: 'The second derivative test says x* is a local minimum if:',
    options: [
      'f\'(x*) = 0 and f\'\' (x*) < 0',
      'f\'(x*) = 0 and f\'\' (x*) > 0',
      'f\'(x*) > 0 and f\'\' (x*) > 0',
      'f(x*) is the smallest value globally'
    ],
    correctIndex: 1,
    explanation: 'A critical point x* with f\'(x*)=0 is a local minimum when f\'\' (x*) > 0 (concave up). If f\'\' (x*) < 0 it is a local maximum; if f\'\' (x*) = 0 the test is inconclusive.'
  },

  // ══════════════════════════════════════════════════════════════
  // dynamic-programming (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'dyn-1',
    nodeId: 'dynamic-programming',
    type: 'multiple-choice',
    question: 'Dynamic programming is applicable when a problem exhibits:',
    options: [
      'No repeated sub-problems',
      'Optimal substructure and overlapping subproblems',
      'Only greedy choices',
      'Polynomial output size'
    ],
    correctIndex: 1,
    explanation: 'DP applies when: (1) optimal substructure — an optimal solution contains optimal solutions to subproblems, and (2) overlapping subproblems — the same subproblems recur, making memoisation worthwhile.'
  },
  {
    id: 'dyn-2',
    nodeId: 'dynamic-programming',
    type: 'multiple-choice',
    question: 'Memoisation in dynamic programming refers to:',
    options: [
      'Writing comments in code',
      'Storing and reusing results of previously solved subproblems',
      'Sorting the input before solving',
      'Splitting the problem into independent halves'
    ],
    correctIndex: 1,
    explanation: 'Memoisation (top-down DP) stores the result of each subproblem the first time it is solved, so subsequent calls return the cached value in O(1) instead of recomputing.'
  },
  {
    id: 'dyn-3',
    nodeId: 'dynamic-programming',
    type: 'multiple-choice',
    question: 'The Bellman equation expresses the value of a state as:',
    options: [
      'The average reward across all states',
      'The maximum reward achievable in one step',
      'The immediate reward plus the discounted value of the next state',
      'The transition probability times the reward'
    ],
    correctIndex: 2,
    explanation: 'The Bellman optimality equation: V*(s) = max_a [R(s,a) + γ · V*(s\')], which decomposes the value of a state into an immediate reward and the discounted value of successor states.'
  },

  // ══════════════════════════════════════════════════════════════
  // network-models (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'netm-1',
    nodeId: 'network-models',
    type: 'multiple-choice',
    question: 'In an Erdős–Rényi random graph G(n,p), each edge is included:',
    options: [
      'Exactly once with probability 1',
      'With probability p, independently of other edges',
      'Based on the degree of both endpoints',
      'Only if both endpoints have fewer than p neighbours'
    ],
    correctIndex: 1,
    explanation: 'The Erdős–Rényi model G(n,p) places an edge between each pair of vertices independently with probability p. The expected number of edges is p·n(n-1)/2.'
  },
  {
    id: 'netm-2',
    nodeId: 'network-models',
    type: 'multiple-choice',
    question: 'A scale-free network has a degree distribution that follows:',
    options: [
      'A Poisson distribution',
      'A uniform distribution',
      'A Gaussian (normal) distribution',
      'A power law P(k) ∝ k^(-γ)'
    ],
    correctIndex: 3,
    explanation: 'Scale-free networks (e.g. Barabási–Albert model) have a power-law degree distribution P(k) ∝ k^(-γ). This means a few hubs have very high degree while most nodes have low degree.'
  },
  {
    id: 'netm-3',
    nodeId: 'network-models',
    type: 'multiple-choice',
    question: 'Preferential attachment in the Barabási–Albert model means new nodes connect to existing nodes:',
    options: [
      'Uniformly at random',
      'With probability proportional to their current degree',
      'Only to nodes with the minimum degree',
      'Based on geographic proximity'
    ],
    correctIndex: 1,
    explanation: '"Rich get richer": in preferential attachment, a new node connects to node i with probability proportional to its degree kᵢ. This generates the power-law degree distribution characteristic of scale-free networks.'
  },

  // ══════════════════════════════════════════════════════════════
  // simulation-methods (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'sm-1',
    nodeId: 'simulation-methods',
    type: 'multiple-choice',
    question: 'Monte Carlo simulation estimates quantities by:',
    options: [
      'Solving equations symbolically',
      'Using repeated random sampling to approximate results',
      'Optimising a cost function numerically',
      'Running experiments on physical hardware'
    ],
    correctIndex: 1,
    explanation: 'Monte Carlo methods use random sampling to estimate mathematical quantities — for example, estimating π by sampling random points in a square and checking if they fall in an inscribed circle.'
  },
  {
    id: 'sm-2',
    nodeId: 'simulation-methods',
    type: 'multiple-choice',
    question: 'The Gillespie algorithm is used to simulate:',
    options: [
      'Deterministic continuous ODEs',
      'Stochastic discrete chemical or biological reaction systems',
      'Neural network training',
      'Graph shortest-path problems'
    ],
    correctIndex: 1,
    explanation: 'The Gillespie algorithm performs exact stochastic simulation of systems with discrete molecules and random reaction events — commonly used in systems biology and chemical kinetics.'
  },
  {
    id: 'sm-3',
    nodeId: 'simulation-methods',
    type: 'multiple-choice',
    question: 'In an agent-based model, the overall system behaviour emerges from:',
    options: [
      'A set of global differential equations',
      'The interaction of individual autonomous agents following local rules',
      'Random sampling of a known distribution',
      'Solving a large linear system'
    ],
    correctIndex: 1,
    explanation: 'Agent-based models (ABMs) simulate individual agents with their own states and rules. Macroscopic patterns — such as traffic jams, disease spread, or market dynamics — emerge from the agents\' interactions, without being explicitly programmed.'
  },

  // ══════════════════════════════════════════════════════════════
  // odes-and-biology (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ob-1',
    nodeId: 'odes-and-biology',
    type: 'multiple-choice',
    question: 'In the logistic growth model dN/dt = rN(1 - N/K), K represents:',
    options: [
      'The initial population size',
      'The intrinsic growth rate',
      'The carrying capacity of the environment',
      'The time to reach maximum growth'
    ],
    correctIndex: 2,
    explanation: 'K is the carrying capacity — the maximum population size the environment can support. As N → K, the growth rate dN/dt → 0, so the population stabilises at K.'
  },
  {
    id: 'ob-2',
    nodeId: 'odes-and-biology',
    type: 'multiple-choice',
    question: 'In the SIR model, the basic reproduction number R₀ is:',
    options: [
      'The initial number of infected individuals',
      'The average number of secondary infections caused by one infectious individual in a fully susceptible population',
      'The recovery rate',
      'The fraction of the population that is immune'
    ],
    correctIndex: 1,
    explanation: 'R₀ (pronounced "R-naught") quantifies disease spread. R₀ > 1 means an epidemic can grow; R₀ < 1 means it dies out. For the basic SIR model, R₀ = β/(γ) where β is transmission rate and γ is recovery rate.'
  },
  {
    id: 'ob-3',
    nodeId: 'odes-and-biology',
    type: 'multiple-choice',
    question: 'The Lotka-Volterra predator-prey model predicts:',
    options: [
      'Both populations grow exponentially',
      'Predator population grows while prey declines to extinction',
      'Oscillating cycles in both predator and prey populations',
      'Both populations converge to a fixed point immediately'
    ],
    correctIndex: 2,
    explanation: 'The Lotka-Volterra equations produce neutrally stable oscillations: when prey is abundant, predators increase; as predators increase, prey declines; fewer prey leads to predator decline; then prey recovers — forming a cycle.'
  },

  // ══════════════════════════════════════════════════════════════
  // linear-regression (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'lr-1',
    nodeId: 'linear-regression',
    type: 'multiple-choice',
    question: 'Ordinary Least Squares (OLS) regression minimises:',
    options: [
      'The sum of absolute residuals',
      'The maximum residual',
      'The sum of squared residuals',
      'The product of residuals'
    ],
    correctIndex: 2,
    explanation: 'OLS finds the line (or hyperplane) that minimises Σ(yᵢ − ŷᵢ)², the sum of squared differences between observed and predicted values. Squaring penalises large errors more than small ones.'
  },
  {
    id: 'lr-2',
    nodeId: 'linear-regression',
    type: 'multiple-choice',
    question: 'In simple linear regression ŷ = β₀ + β₁x, R² measures:',
    options: [
      'The slope of the regression line',
      'The proportion of variance in y explained by x',
      'The probability that the model is correct',
      'The number of data points required'
    ],
    correctIndex: 1,
    explanation: 'R² (coefficient of determination) = 1 − SS_res/SS_tot. It ranges from 0 to 1, representing the fraction of variance in y accounted for by the model. R² = 1 indicates a perfect fit.'
  },
  {
    id: 'lr-3',
    nodeId: 'linear-regression',
    type: 'multiple-choice',
    question: 'Multicollinearity in multiple regression refers to:',
    options: [
      'Having too many data points',
      'Predictor variables being highly correlated with each other',
      'The response variable being non-linear',
      'Residuals being non-normally distributed'
    ],
    correctIndex: 1,
    explanation: 'Multicollinearity occurs when predictor variables are highly correlated, making it difficult to isolate individual effects. It inflates standard errors of coefficients but does not necessarily bias predictions.'
  },

  // ══════════════════════════════════════════════════════════════
  // classification (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'cl-1',
    nodeId: 'classification',
    type: 'multiple-choice',
    question: 'Logistic regression outputs:',
    options: [
      'A continuous unbounded prediction',
      'A probability between 0 and 1 via the sigmoid function',
      'The class with the highest count in training data',
      'A decision tree structure'
    ],
    correctIndex: 1,
    explanation: 'Logistic regression applies the sigmoid function σ(z) = 1/(1+e^(-z)) to a linear combination of features, mapping any real value to (0,1), interpretable as a class probability.'
  },
  {
    id: 'cl-2',
    nodeId: 'classification',
    type: 'multiple-choice',
    question: 'A confusion matrix for a binary classifier has True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN). Precision is:',
    options: [
      'TP / (TP + FN)',
      'TP / (TP + FP)',
      '(TP + TN) / (TP + TN + FP + FN)',
      'FP / (FP + TN)'
    ],
    correctIndex: 1,
    explanation: 'Precision = TP/(TP+FP) — of all instances predicted positive, how many truly were? Recall = TP/(TP+FN). Accuracy = (TP+TN)/total. Precision and recall trade off against each other.'
  },
  {
    id: 'cl-3',
    nodeId: 'classification',
    type: 'multiple-choice',
    question: 'k-Nearest Neighbours (kNN) classifies a new point by:',
    options: [
      'Fitting a logistic curve to the nearest k points',
      'Finding the k closest training points and taking a majority vote of their labels',
      'Computing a decision boundary using k support vectors',
      'Splitting the feature space into k equal regions'
    ],
    correctIndex: 1,
    explanation: 'kNN is a non-parametric method: it finds the k training examples nearest to the query point (by Euclidean or other distance) and assigns the most common class label among them.'
  },

  // ══════════════════════════════════════════════════════════════
  // neural-networks-intro (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nn-1',
    nodeId: 'neural-networks-intro',
    type: 'multiple-choice',
    question: 'The purpose of an activation function in a neural network is to:',
    options: [
      'Normalise the input data',
      'Introduce non-linearity so the network can learn complex patterns',
      'Initialise the weights to small values',
      'Reduce the number of parameters'
    ],
    correctIndex: 1,
    explanation: 'Without non-linear activation functions, stacking multiple linear layers is equivalent to a single linear transformation. Non-linear activations (ReLU, sigmoid, tanh) allow networks to approximate arbitrary functions.'
  },
  {
    id: 'nn-2',
    nodeId: 'neural-networks-intro',
    type: 'multiple-choice',
    question: 'Backpropagation computes:',
    options: [
      'The forward pass output probabilities',
      'Gradients of the loss with respect to each weight using the chain rule',
      'The optimal learning rate automatically',
      'A new architecture with fewer layers'
    ],
    correctIndex: 1,
    explanation: 'Backpropagation applies the chain rule of calculus to efficiently compute ∂L/∂wᵢ for every weight in the network, enabling gradient descent to update all weights.'
  },
  {
    id: 'nn-3',
    nodeId: 'neural-networks-intro',
    type: 'multiple-choice',
    question: 'Dropout regularisation works by:',
    options: [
      'Removing neurons with the smallest weights',
      'Randomly setting a fraction of neuron outputs to zero during training',
      'Clipping the gradient norm to a maximum value',
      'Adding L2 penalty to the loss function'
    ],
    correctIndex: 1,
    explanation: 'Dropout randomly zeroes neuron outputs with probability p during training, forcing the network to learn redundant representations and reducing co-adaptation of neurons. At inference, all neurons are active and outputs are scaled.'
  },

  // ══════════════════════════════════════════════════════════════
  // fourier-analysis (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'fa-1',
    nodeId: 'fourier-analysis',
    type: 'multiple-choice',
    question: 'The Fourier Transform decomposes a signal into:',
    options: [
      'A sum of polynomial functions',
      'A sum of sinusoids of different frequencies',
      'A product of exponential functions',
      'A series of step functions'
    ],
    correctIndex: 1,
    explanation: 'The Fourier Transform expresses any (suitable) function as a superposition of complex exponentials (equivalently, sines and cosines) at different frequencies, transforming from the time domain to the frequency domain.'
  },
  {
    id: 'fa-2',
    nodeId: 'fourier-analysis',
    type: 'multiple-choice',
    question: 'The Nyquist–Shannon sampling theorem states that to reconstruct a signal with maximum frequency fₘₐₓ, the sampling rate must be:',
    options: [
      'At least fₘₐₓ',
      'At least 2fₘₐₓ',
      'Exactly fₘₐₓ',
      'At least fₘₐₓ/2'
    ],
    correctIndex: 1,
    explanation: 'The Nyquist rate is 2fₘₐₓ. Sampling below this rate causes aliasing — high-frequency components appear as lower frequencies, distorting the reconstructed signal.'
  },
  {
    id: 'fa-3',
    nodeId: 'fourier-analysis',
    type: 'multiple-choice',
    question: 'If a signal is multiplied by a window function before applying the DFT, the main purpose is to:',
    options: [
      'Increase the sampling rate',
      'Reduce spectral leakage caused by finite-length truncation',
      'Remove the DC component',
      'Double the frequency resolution'
    ],
    correctIndex: 1,
    explanation: 'Truncating a signal to a finite length is equivalent to multiplying by a rectangular window, which introduces spectral leakage. Smoother windows (Hann, Hamming) taper the signal to zero at the edges, reducing leakage at the cost of reduced frequency resolution.'
  },

  // ══════════════════════════════════════════════════════════════
  // graph-theory (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'gt-1',
    nodeId: 'graph-theory',
    type: 'multiple-choice',
    question: 'A connected graph with n vertices and exactly n-1 edges and no cycles is called:',
    options: [
      'A complete graph',
      'A bipartite graph',
      'A tree',
      'A DAG'
    ],
    correctIndex: 2,
    explanation: 'A tree is a connected acyclic graph. Any connected graph with n vertices and n-1 edges must be a tree (and vice versa). Trees have exactly one path between any two vertices.'
  },
  {
    id: 'gt-2',
    nodeId: 'graph-theory',
    type: 'multiple-choice',
    question: 'Dijkstra\'s algorithm finds shortest paths in a weighted graph. It requires:',
    options: [
      'All edge weights to be equal',
      'The graph to be a tree',
      'All edge weights to be non-negative',
      'The graph to be undirected'
    ],
    correctIndex: 2,
    explanation: 'Dijkstra\'s algorithm uses a greedy approach and fails with negative weights (use Bellman-Ford instead). It works on both directed and undirected graphs as long as all weights are ≥ 0.'
  },
  {
    id: 'gt-3',
    nodeId: 'graph-theory',
    type: 'multiple-choice',
    question: 'A bipartite graph G = (U ∪ V, E) has the property that:',
    options: [
      'Every vertex has the same degree',
      'All edges connect a vertex in U to a vertex in V',
      'There is a Hamiltonian cycle',
      'U and V have the same number of vertices'
    ],
    correctIndex: 1,
    explanation: 'In a bipartite graph, vertices are divided into two disjoint sets U and V, and every edge connects a vertex in U to a vertex in V (no edges within U or within V). Equivalently, the graph has no odd-length cycles.'
  },

  // ══════════════════════════════════════════════════════════════
  // information-theory (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'it-1',
    nodeId: 'information-theory',
    type: 'multiple-choice',
    question: 'The Shannon entropy H(X) = -Σ p(x) log₂ p(x) measures:',
    options: [
      'The maximum value of X',
      'The average amount of information (uncertainty) in X',
      'The number of possible values of X',
      'The probability of the most likely outcome'
    ],
    correctIndex: 1,
    explanation: 'Shannon entropy quantifies the average uncertainty or information content. A uniform distribution maximises entropy; a deterministic outcome has entropy 0.'
  },
  {
    id: 'it-2',
    nodeId: 'information-theory',
    type: 'multiple-choice',
    question: 'The KL divergence D_KL(P ‖ Q) measures:',
    options: [
      'The symmetric distance between two distributions',
      'How much one probability distribution differs from a reference distribution',
      'The maximum entropy between P and Q',
      'The mutual information of P and Q'
    ],
    correctIndex: 1,
    explanation: 'KL divergence D_KL(P‖Q) = Σ p(x) log(p(x)/q(x)) measures the extra bits needed to encode samples from P using a code designed for Q. It is not symmetric: D_KL(P‖Q) ≠ D_KL(Q‖P) in general.'
  },
  {
    id: 'it-3',
    nodeId: 'information-theory',
    type: 'multiple-choice',
    question: 'Mutual information I(X; Y) equals zero if and only if:',
    options: [
      'X and Y have the same distribution',
      'X and Y are independent',
      'X and Y are identical',
      'H(X) = H(Y)'
    ],
    correctIndex: 1,
    explanation: 'I(X;Y) = H(X) - H(X|Y) = 0 iff knowing Y gives no information about X, i.e., X and Y are statistically independent.'
  },

  // ══════════════════════════════════════════════════════════════
  // bayesian-inference (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bi-1',
    nodeId: 'bayesian-inference',
    type: 'multiple-choice',
    question: 'Bayes\' theorem relates the posterior P(H|D) to:',
    options: [
      'Only the likelihood P(D|H)',
      'The likelihood P(D|H) and the prior P(H), normalised by P(D)',
      'The sample size only',
      'The frequentist p-value'
    ],
    correctIndex: 1,
    explanation: 'Bayes\' theorem: P(H|D) = P(D|H)·P(H) / P(D). The posterior combines the likelihood (how well H explains D) with the prior (belief before seeing D), normalised by the marginal likelihood P(D).'
  },
  {
    id: 'bi-2',
    nodeId: 'bayesian-inference',
    type: 'multiple-choice',
    question: 'A conjugate prior is one where:',
    options: [
      'Prior and likelihood are from the same family',
      'The posterior is in the same distribution family as the prior',
      'The prior is uniform over all values',
      'The prior has zero variance'
    ],
    correctIndex: 1,
    explanation: 'A conjugate prior gives a posterior in the same parametric family, making updates analytically tractable. Example: a Beta prior with a Binomial likelihood yields a Beta posterior.'
  },
  {
    id: 'bi-3',
    nodeId: 'bayesian-inference',
    type: 'multiple-choice',
    question: 'Markov Chain Monte Carlo (MCMC) is used in Bayesian inference to:',
    options: [
      'Compute the prior distribution analytically',
      'Sample from the posterior distribution when it cannot be computed in closed form',
      'Maximise the likelihood function',
      'Select the best model by cross-validation'
    ],
    correctIndex: 1,
    explanation: 'MCMC (e.g. Metropolis-Hastings, NUTS) constructs a Markov chain whose stationary distribution is the target posterior. This enables sampling-based inference when the posterior is intractable.'
  },

  // ══════════════════════════════════════════════════════════════
  // stochastic-processes (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'sp-1',
    nodeId: 'stochastic-processes',
    type: 'multiple-choice',
    question: 'A Poisson process with rate λ has inter-arrival times that follow:',
    options: [
      'A normal distribution with mean 1/λ',
      'An exponential distribution with mean 1/λ',
      'A uniform distribution on (0, λ)',
      'A geometric distribution with parameter λ'
    ],
    correctIndex: 1,
    explanation: 'The Poisson process is the continuous-time counting process with exponentially distributed inter-arrival times (mean 1/λ). The number of arrivals in time t follows Poisson(λt).'
  },
  {
    id: 'sp-2',
    nodeId: 'stochastic-processes',
    type: 'multiple-choice',
    question: 'Standard Brownian motion W(t) has increments W(t) - W(s) (for t > s) that are:',
    options: [
      'Uniformly distributed on (-1, 1)',
      'Normally distributed with mean 0 and variance t - s',
      'Exponentially distributed with rate 1/(t-s)',
      'Poisson distributed with mean t - s'
    ],
    correctIndex: 1,
    explanation: 'Brownian motion (Wiener process) has independent, stationary Gaussian increments: W(t)-W(s) ~ N(0, t-s). Its paths are continuous but nowhere differentiable.'
  },
  {
    id: 'sp-3',
    nodeId: 'stochastic-processes',
    type: 'multiple-choice',
    question: 'A stationary stochastic process has statistical properties that:',
    options: [
      'Change exponentially over time',
      'Do not change over time (time-invariant)',
      'Depend on the starting state',
      'Must follow a Gaussian distribution'
    ],
    correctIndex: 1,
    explanation: '(Wide-sense) stationarity requires that the mean is constant and the autocovariance depends only on the lag τ, not on absolute time. This enables frequency-domain analysis via the power spectral density.'
  },

  // ══════════════════════════════════════════════════════════════
  // pca-and-svd (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'pca-1',
    nodeId: 'pca-and-svd',
    type: 'multiple-choice',
    question: 'Principal Component Analysis (PCA) finds directions that:',
    options: [
      'Minimise the variance of projected data',
      'Maximise the variance of projected data',
      'Maximise the correlation between components',
      'Minimise the number of features'
    ],
    correctIndex: 1,
    explanation: 'PCA finds orthogonal directions (principal components) that successively maximise variance. The first PC explains the most variance, the second (orthogonal to the first) explains the next most, and so on.'
  },
  {
    id: 'pca-2',
    nodeId: 'pca-and-svd',
    type: 'multiple-choice',
    question: 'In the SVD A = UΣVᵀ, the columns of U are:',
    options: [
      'The right singular vectors of A',
      'The singular values of A',
      'The left singular vectors of A',
      'The eigenvectors of A'
    ],
    correctIndex: 2,
    explanation: 'In A = UΣVᵀ: U contains the left singular vectors (orthonormal basis for the column space), Σ contains singular values (non-negative, on the diagonal), and V contains the right singular vectors.'
  },
  {
    id: 'pca-3',
    nodeId: 'pca-and-svd',
    type: 'multiple-choice',
    question: 'If we keep only the top k singular values in SVD, the resulting matrix is:',
    options: [
      'The exact matrix A',
      'The rank-k matrix that best approximates A in terms of Frobenius norm',
      'The inverse of A',
      'The transpose of A'
    ],
    correctIndex: 1,
    explanation: 'By the Eckart-Young theorem, the rank-k truncated SVD Aₖ = UₖΣₖVₖᵀ gives the best rank-k approximation of A (minimising both Frobenius and spectral norm error). This is the basis for dimensionality reduction and compression.'
  },

  // ══════════════════════════════════════════════════════════════
  // model-selection (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ms-1',
    nodeId: 'model-selection',
    type: 'multiple-choice',
    question: 'Overfitting occurs when a model:',
    options: [
      'Is too simple to capture patterns in the training data',
      'Learns noise in the training data and performs poorly on new data',
      'Has too few parameters to converge',
      'Has equal training and test error'
    ],
    correctIndex: 1,
    explanation: 'An overfit model has low training error but high test error — it has memorised the training data including noise, rather than learning the underlying pattern. Remedies include regularisation, dropout, more data, or simpler models.'
  },
  {
    id: 'ms-2',
    nodeId: 'model-selection',
    type: 'multiple-choice',
    question: 'k-fold cross-validation works by:',
    options: [
      'Training k separate models on different datasets',
      'Splitting data into k folds, training on k-1 and validating on the remaining fold, rotating k times',
      'Using k as the regularisation hyperparameter',
      'Repeating training k times with different random seeds'
    ],
    correctIndex: 1,
    explanation: 'k-fold CV partitions data into k equal folds. Each fold is used once as the validation set while the other k-1 folds form the training set. The k validation scores are averaged to estimate generalisation performance.'
  },
  {
    id: 'ms-3',
    nodeId: 'model-selection',
    type: 'multiple-choice',
    question: 'The Akaike Information Criterion (AIC) penalises models for:',
    options: [
      'Low training accuracy',
      'Having more parameters (complexity)',
      'Non-linear relationships',
      'Missing data'
    ],
    correctIndex: 1,
    explanation: 'AIC = 2k − 2ln(L̂), where k is the number of parameters and L̂ is the maximised likelihood. AIC balances goodness of fit against model complexity — lower AIC is preferred. BIC applies a stronger penalty for parameters.'
  }
];

export function getQuestionsByNode(nodeId: string): Question[] {
  return questionBank.filter(q => q.nodeId === nodeId);
}
