import type { Question } from '../types';

export const questionBank: Question[] = [
  // ========== COMPLEX SYSTEMS ==========
  {
    id: 'cs-mc-1',
    nodeId: 'complex-systems',
    type: 'multiple-choice',
    question: 'Which of the following best describes an emergent property?',
    options: [
      'A property that can be directly derived from the rules governing individual components',
      'A property of the system that cannot be predicted from the properties of individual components alone',
      'A property that only appears in deterministic models',
      'A property that is always observable at the microscopic level'
    ],
    correctIndex: 1,
    explanation: 'Emergent properties arise from the interactions between components and cannot be predicted just from individual component behaviour. Classic examples include consciousness from neurons, and traffic jams from individual cars.'
  },
  {
    id: 'cs-mc-2',
    nodeId: 'complex-systems',
    type: 'multiple-choice',
    question: 'A stochastic model differs from a deterministic model in that:',
    options: [
      'It always produces the same output for the same initial conditions',
      'It incorporates randomness, so outputs may differ between runs with the same inputs',
      'It is always more accurate than a deterministic model',
      'It can only model biological systems'
    ],
    correctIndex: 1,
    explanation: 'Stochastic models incorporate randomness (probability). The same initial conditions can lead to different outcomes. Deterministic models always give the same output for the same input.'
  },
  // ========== DYNAMICAL SYSTEMS ==========
  {
    id: 'ds-mc-1',
    nodeId: 'dynamical-systems',
    type: 'multiple-choice',
    question: 'A fixed point x* of the function g(x) is stable if:',
    options: [
      '|g\'(x*)| > 1',
      '|g\'(x*)| = 1',
      '|g\'(x*)| < 1',
      'g\'(x*) = 0'
    ],
    correctIndex: 2,
    explanation: 'A fixed point x* is stable (attracting) if |g\'(x*)| < 1. This means nearby points will converge to x* under iteration. If |g\'(x*)| > 1, the fixed point is unstable (repelling).'
  },
  {
    id: 'ds-calc-1',
    nodeId: 'dynamical-systems',
    type: 'calculation',
    question: 'For the logistic map x_{n+1} = rx_n(1 - x_n) with r = 2, find the non-zero fixed point x*.',
    correctAnswer: 0.5,
    tolerance: 0.001,
    explanation: 'At a fixed point: x* = rx*(1-x*). Dividing by x* (non-zero case): 1 = r(1-x*), so x* = 1 - 1/r = 1 - 1/2 = 0.5.'
  },
  // ========== NEWTON'S METHOD ==========
  {
    id: 'nm-mc-1',
    nodeId: 'newtons-method',
    type: 'multiple-choice',
    question: 'Newton\'s method for root finding uses the iteration:',
    options: [
      'x_{n+1} = x_n + f(x_n)/f\'(x_n)',
      'x_{n+1} = x_n - f(x_n)/f\'(x_n)',
      'x_{n+1} = x_n - f\'(x_n)/f(x_n)',
      'x_{n+1} = f(x_n) - x_n/f\'(x_n)'
    ],
    correctIndex: 1,
    explanation: 'Newton\'s method (Newton-Raphson) uses x_{n+1} = x_n - f(x_n)/f\'(x_n). This comes from the tangent line approximation: we find where the tangent at x_n crosses zero.'
  },
  {
    id: 'nm-calc-1',
    nodeId: 'newtons-method',
    type: 'calculation',
    question: 'Apply one step of Newton\'s method to find a root of f(x) = x² - 2, starting from x₀ = 1. Give x₁ to 4 decimal places.',
    correctAnswer: 1.5,
    tolerance: 0.0001,
    explanation: 'f(x) = x² - 2, f\'(x) = 2x. x₁ = x₀ - f(x₀)/f\'(x₀) = 1 - (1-2)/(2×1) = 1 - (-1)/2 = 1 + 0.5 = 1.5'
  },
  {
    id: 'nm-mc-2',
    nodeId: 'newtons-method',
    type: 'multiple-choice',
    question: 'Newton\'s method fails to converge when:',
    options: [
      'The function is continuous',
      'The starting point x₀ is a root of f\'(x) = 0 (i.e., f\'(x₀) = 0)',
      'The function has exactly one root',
      'The derivative is always positive'
    ],
    correctIndex: 1,
    explanation: 'Newton\'s method fails when f\'(x_n) = 0, because this would require dividing by zero. Geometrically, a horizontal tangent line never crosses the x-axis (or is the x-axis itself). Newton\'s method can also fail if the iteration cycles or diverges away from the root.'
  },
  // ========== EULER\'S METHOD ==========
  {
    id: 'em-mc-1',
    nodeId: 'euler-method',
    type: 'multiple-choice',
    question: 'Euler\'s method approximates the solution to dy/dt = f(t,y) using:',
    options: [
      'y_{n+1} = y_n - h·f(t_n, y_n)',
      'y_{n+1} = y_n + h·f(t_n, y_n)',
      'y_{n+1} = y_n + h·f(t_{n+1}, y_{n+1})',
      'y_{n+1} = y_n + (h/2)·[f(t_n, y_n) + f(t_{n+1}, y_{n+1})]'
    ],
    correctIndex: 1,
    explanation: 'Euler\'s forward method: y_{n+1} = y_n + h·f(t_n, y_n). The slope at the current point is used to step forward. Option C is the implicit (backward) Euler, option D is the trapezoidal method.'
  },
  {
    id: 'em-calc-1',
    nodeId: 'euler-method',
    type: 'calculation',
    question: 'Use Euler\'s method with h = 0.1 to approximate y(0.1), given dy/dt = y with y(0) = 1. Give your answer to 4 decimal places.',
    correctAnswer: 1.1,
    tolerance: 0.0001,
    explanation: 'y_{1} = y_0 + h·f(t_0, y_0) = 1 + 0.1 × 1 = 1.1. (The exact answer is e^0.1 ≈ 1.1052, showing Euler\'s method underestimates here.)'
  },
  // ========== RK4 ==========
  {
    id: 'rk4-mc-1',
    nodeId: 'rk4',
    type: 'multiple-choice',
    question: 'In RK4, the final update formula is y_{n+1} = y_n + (h/6)(k1 + 2k2 + 2k3 + k4). The weights (1, 2, 2, 1) are chosen because:',
    options: [
      'k1 and k4 are more accurate than k2 and k3',
      'This weighting gives a fourth-order method (global error O(h⁴)), analogous to Simpson\'s rule',
      'k2 and k3 cancel each other out',
      'The weights must sum to 6 for numerical stability'
    ],
    correctIndex: 1,
    explanation: 'The weights (1, 2, 2, 1)/6 are chosen so the Taylor series expansion matches up to the h⁴ term. This is analogous to Simpson\'s rule for numerical integration. The result is a fourth-order method with global error O(h⁴), much better than Euler\'s O(h).'
  },
  {
    id: 'rk4-mc-2',
    nodeId: 'rk4',
    type: 'multiple-choice',
    question: 'RK4 evaluates the derivative function f(t,y) how many times per step?',
    options: ['1 (like Euler)', '2', '3', '4'],
    correctIndex: 3,
    explanation: 'RK4 computes four slope estimates per step: k1 at the start, k2 at the midpoint using k1, k3 at the midpoint using k2, and k4 at the end using k3. This 4x evaluation cost is why RK4 is so much more accurate than Euler per step.'
  },
  // ========== NEEDLEMAN-WUNSCH ==========
  {
    id: 'nw-mc-1',
    nodeId: 'needleman-wunsch',
    type: 'multiple-choice',
    question: 'In Needleman-Wunsch, the recurrence F(i,j) = max of three terms corresponds to:',
    options: [
      'Match/mismatch (diagonal), gap in sequence A (left), gap in sequence B (up)',
      'Gap in sequence A (diagonal), match/mismatch (left), gap in sequence B (up)',
      'Match/mismatch (diagonal), gap in sequence B (left), gap in sequence A (up)',
      'All three represent matches, just from different directions'
    ],
    correctIndex: 2,
    explanation: 'F(i,j) = max of: F(i-1,j-1) + s(a_i, b_j) [diagonal = align the two characters, match or mismatch], F(i,j-1) + gap [left = gap in sequence B, advance in A], F(i-1,j) + gap [up = gap in sequence A, advance in B].'
  },
  {
    id: 'nw-mc-2',
    nodeId: 'needleman-wunsch',
    type: 'multiple-choice',
    question: 'In Needleman-Wunsch, the traceback starts at:',
    options: [
      'Cell F(0,0)',
      'The cell with the maximum score anywhere in the matrix',
      'Cell F(m,n) — the bottom-right corner',
      'The middle of the matrix'
    ],
    correctIndex: 2,
    explanation: 'In global alignment (Needleman-Wunsch), the traceback always starts at the bottom-right corner F(m,n) and follows pointers back to F(0,0). This ensures the full alignment of both sequences (global). Smith-Waterman (local) starts at the maximum cell instead.'
  },
  // ========== PROBABILITY PRIMER ==========
  {
    id: 'prob-mc-1',
    nodeId: 'probability-primer',
    type: 'multiple-choice',
    question: 'Bayes\' theorem states that P(A|B) = :',
    options: [
      'P(A) × P(B)',
      'P(B|A) × P(A) / P(B)',
      'P(A|B) × P(B) / P(A)',
      'P(A ∩ B) / P(A)'
    ],
    correctIndex: 1,
    explanation: 'Bayes\' theorem: P(A|B) = P(B|A)P(A)/P(B). The numerator P(B|A)P(A) = P(A∩B) from the definition of conditional probability. P(B) is the normalising constant (total probability of B).'
  },
  {
    id: 'prob-calc-1',
    nodeId: 'probability-primer',
    type: 'calculation',
    question: 'A test for a disease has sensitivity 99% (P(positive|disease) = 0.99) and specificity 95% (P(negative|no disease) = 0.95). The disease prevalence is 1% (P(disease) = 0.01). What is P(disease|positive test)? Give your answer to 3 decimal places.',
    correctAnswer: 0.166,
    tolerance: 0.005,
    explanation: 'Using Bayes\': P(D|+) = P(+|D)P(D) / P(+). P(+) = P(+|D)P(D) + P(+|no D)P(no D) = 0.99×0.01 + 0.05×0.99 = 0.0099 + 0.0495 = 0.0594. P(D|+) = 0.0099/0.0594 ≈ 0.1667. This is the base rate neglect problem — even with accurate tests, low prevalence means most positives are false positives!'
  },
  // ========== EXPONENTIAL DISTRIBUTION ==========
  {
    id: 'exp-mc-1',
    nodeId: 'exponential-distribution',
    type: 'multiple-choice',
    question: 'The memoryless property of the exponential distribution means:',
    options: [
      'P(T > s + t | T > s) = P(T > t)',
      'P(T > s + t | T > s) = P(T > s)',
      'The distribution has no parameters',
      'The variance equals the mean squared'
    ],
    correctIndex: 0,
    explanation: 'The memoryless property: P(T > s + t | T > s) = P(T > t). Given that you\'ve already waited s time, the remaining waiting time has the same distribution as the original. This is unique to the exponential distribution among continuous distributions.'
  },
  {
    id: 'exp-calc-1',
    nodeId: 'exponential-distribution',
    type: 'calculation',
    question: 'A Poisson process has rate λ = 3 events per hour. What is the expected waiting time until the next event (in hours)?',
    correctAnswer: 0.333,
    tolerance: 0.005,
    explanation: 'Inter-arrival times for a Poisson process with rate λ are Exp(λ). The mean of Exp(λ) is 1/λ = 1/3 ≈ 0.333 hours (20 minutes).'
  },
  // ========== MARKOV CHAINS ==========
  {
    id: 'mc-mc-1',
    nodeId: 'markov-chains',
    type: 'multiple-choice',
    question: 'The Markov property states that:',
    options: [
      'The future state depends on the entire history of states',
      'The future state depends only on the current state, not the history',
      'All states are equally probable',
      'The chain must eventually return to every state'
    ],
    correctIndex: 1,
    explanation: 'The Markov property (memoryless property): P(X_{n+1} = j | X_n = i, X_{n-1}, ..., X_0) = P(X_{n+1} = j | X_n = i). The future depends only on the present state, not how we got there.'
  },
  {
    id: 'mc-mc-2',
    nodeId: 'markov-chains',
    type: 'multiple-choice',
    question: 'For a stationary distribution π of a Markov chain with transition matrix P, which equation must hold?',
    options: [
      'πP = P',
      'πP = π',
      'Pπ = π',
      'π = P²'
    ],
    correctIndex: 1,
    explanation: 'The stationary distribution satisfies πP = π (and Σπ_i = 1). This means π is a left eigenvector of P with eigenvalue 1. In this state, the distribution doesn\'t change after one transition step.'
  },
  // ========== HMM ==========
  {
    id: 'hmm-mc-1',
    nodeId: 'hmm-definition',
    type: 'multiple-choice',
    question: 'In an HMM, the emission probability e_k(b) represents:',
    options: [
      'The probability of transitioning from state k to state b',
      'The probability of observing symbol b when in state k',
      'The probability of starting in state k',
      'The probability that the hidden state is k given observation b'
    ],
    correctIndex: 1,
    explanation: 'Emission probability e_k(b) = P(observation = b | hidden state = k). It captures how likely each observation is when the system is in a particular hidden state. This is NOT the posterior probability of the state (that would require Bayes\' theorem).'
  },
  // ========== VITERBI ==========
  {
    id: 'vit-mc-1',
    nodeId: 'viterbi',
    type: 'multiple-choice',
    question: 'The Viterbi algorithm solves which of the three HMM problems?',
    options: [
      'Learning: estimating model parameters from data',
      'Evaluation: computing P(observations | model)',
      'Decoding: finding the most likely hidden state sequence',
      'Sampling: generating a random sequence from the model'
    ],
    correctIndex: 2,
    explanation: 'Viterbi solves the decoding problem: given observations and model parameters, find the most likely hidden state sequence (the Viterbi path). The Forward algorithm solves evaluation (probability of observations), and Baum-Welch solves learning (parameter estimation).'
  },
  {
    id: 'vit-mc-2',
    nodeId: 'viterbi',
    type: 'multiple-choice',
    question: 'The Viterbi algorithm differs from the Forward algorithm in that it uses:',
    options: [
      'Addition instead of multiplication',
      'Max instead of sum over previous states',
      'Sum instead of max over previous states',
      'Multiplication instead of addition'
    ],
    correctIndex: 1,
    explanation: 'Viterbi uses max over previous states (finds the best single path), while Forward uses sum (computes total probability over all paths). This is sometimes called the "max-product" vs "sum-product" distinction. In log space: Viterbi does max+add, Forward does log-sum-exp.'
  },
  // ========== UPGMA ==========
  {
    id: 'upgma-mc-1',
    nodeId: 'upgma',
    type: 'multiple-choice',
    question: 'UPGMA assumes which property that limits its applicability?',
    options: [
      'All sequences have the same length',
      'The molecular clock — all lineages evolve at the same rate',
      'The tree must be unrooted',
      'Only binary trees are allowed'
    ],
    correctIndex: 1,
    explanation: 'UPGMA assumes a molecular clock: all lineages evolve at a constant and equal rate. This produces ultrametric trees where all leaves are equidistant from the root. When rates vary between lineages, UPGMA gives incorrect topologies. Neighbour-Joining relaxes this assumption.'
  },
  {
    id: 'upgma-sa-1',
    nodeId: 'upgma',
    type: 'short-answer',
    question: 'In UPGMA, after merging taxa i and j into cluster (ij), the distance from (ij) to any other taxon k is computed as the ________ of d(i,k) and d(j,k).',
    acceptableAnswers: ['average', 'arithmetic mean', 'mean', 'weighted average', 'unweighted average'],
    explanation: 'UPGMA uses the average (arithmetic mean) of distances: d((ij), k) = [n_i × d(i,k) + n_j × d(j,k)] / (n_i + n_j), where n_i and n_j are the number of sequences in each cluster. This is the "unweighted" averaging that gives UPGMA its name.'
  },
  // ========== NEIGHBOUR JOINING ==========
  {
    id: 'nj-mc-1',
    nodeId: 'neighbour-joining',
    type: 'multiple-choice',
    question: 'In Neighbour-Joining, the Q-matrix entry Q(i,j) is defined to find pairs that are close relatives after correcting for:',
    options: [
      'Sequence length differences',
      'Long branches attracting distant taxa (long branch attraction)',
      'Each taxon\'s average distance to all other taxa',
      'Gaps in the alignment'
    ],
    correctIndex: 2,
    explanation: 'Q(i,j) = (n-2)d(i,j) - Σ_k d(i,k) - Σ_k d(j,k). The subtracted terms correct for each taxon\'s total branch length to all others. This lets NJ find true neighbours even when the overall rate of evolution differs between lineages, unlike UPGMA.'
  },
  // ========== AFFINE GAPS ==========
  {
    id: 'ag-mc-1',
    nodeId: 'affine-gaps',
    type: 'multiple-choice',
    question: 'With affine gap penalties (gap open = d, gap extend = e), a gap of length k costs:',
    options: [
      'k × d',
      'd + k × e',
      'd + (k-1) × e',
      'k × e'
    ],
    correctIndex: 2,
    explanation: 'Affine gap penalty for a gap of length k: d + (k-1)×e. You pay the open penalty d once, then the extend penalty e for each additional gap character. This makes long gaps cheaper per residue than many short gaps, which is biologically realistic.'
  },
  // ========== POISSON PROCESS ==========
  {
    id: 'pp-mc-1',
    nodeId: 'poisson-process',
    type: 'multiple-choice',
    question: 'In a Poisson process with rate λ, the number of events in a time interval of length t follows:',
    options: [
      'Exponential(λt)',
      'Binomial(t, λ)',
      'Poisson(λt)',
      'Normal(λt, λt)'
    ],
    correctIndex: 2,
    explanation: 'The count of events N(t) in [0,t] follows a Poisson distribution with mean λt: P(N(t)=k) = (λt)^k × e^(-λt) / k!. The inter-arrival times follow Exponential(λ) — these are the two key facts about Poisson processes.'
  }
];
