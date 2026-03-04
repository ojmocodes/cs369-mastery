import type { ExamQuestionText } from '../../../types';

/**
 * Actual exam question texts for COMPSCI 369.
 * Keys are question IDs matching the exam_map in tree.ts.
 */
export const examQuestionTexts: Record<string, ExamQuestionText> = {
  // ── 2024 Mid-Semester Test ─────────────────────────────────────

  '2024-test-Q1': {
    source: '2024 Mid-Semester Test',
    marks: 5,
    text: `(a) Consider the function g(x) = x − f(x)/f′(x), which defines Newton's method as a fixed point iteration x_{n+1} = g(x_n).

For a specific f(x), suppose g(x₀) = x₁ and g(x₁) = x₀ — that is, Newton's method cycles between x₀ and x₁ without converging.

(i) Draw a cobweb diagram illustrating this cycle. Label the fixed points of g on your diagram. [3 marks]

(ii) What condition on |g′(x*)| at a fixed point x* of g determines whether Newton's method converges to or diverges from x*? [2 marks]`
  },

  '2024-test-Q2': {
    source: '2024 Mid-Semester Test',
    marks: 7,
    text: `(a) Derive Newton's method for solving f(x) = 0.

Starting from the Taylor series f(x_n + h) ≈ f(x_n) + h f′(x_n), derive the update formula x_{n+1} = x_n − f(x_n)/f′(x_n). [3 marks]

(b) Show that Newton's method is a fixed point iteration x_{n+1} = g(x_n) for a function g(x). What are the fixed points of g in terms of f? [2 marks]

(c) Find the fixed points of g(x) = x − (x² − 3)/(2x) and determine their stability. [2 marks]`
  },

  '2024-test-Q3': {
    source: '2024 Mid-Semester Test',
    marks: 9,
    text: `Consider the initial value problem:
    dy/dx = −2xy,    y(0) = 1

The exact solution is y(x) = e^{−x²}.

(a) Apply Euler's method with step size h = 0.25 to estimate y(0.25) and y(0.5). Show all calculations. [3 marks]

(b) Apply the fourth-order Runge-Kutta method (RK4) with step size h = 0.5 to estimate y(0.5). Show all four slopes k₁, k₂, k₃, k₄ and the final estimate. [5 marks]

(c) Compare the accuracy of Euler's method and RK4 for this problem. The exact value is y(0.5) = e^{−0.25} ≈ 0.7788. [1 mark]`
  },

  '2024-test-Q4': {
    source: '2024 Mid-Semester Test',
    marks: 5,
    text: `The Hawk-Dove game models animal conflict over a resource of value V = 6, with injury cost C = 10 for fights between two Hawks.

Payoff rules:
• Hawk vs Hawk: each gets (V − C)/2
• Hawk vs Dove: Hawk gets V, Dove gets 0
• Dove vs Dove: each gets V/2

(a) Write out the 2×2 payoff matrix for this game (rows = focal player, columns = opponent). [2 marks]

(b) Calculate the expected payoff W(H, p) for a Hawk in a population with fraction p of Hawks and (1−p) Doves, and W(D, p) for a Dove. [3 marks]`
  },

  '2024-test-Q5': {
    source: '2024 Mid-Semester Test',
    marks: 6,
    text: `Continuing from Q4 (V = 6, C = 10):

(a) Determine whether pure Hawk (p = 1) is an Evolutionarily Stable Strategy (ESS). Justify your answer using the ESS condition. [2 marks]

(b) Determine whether pure Dove (p = 0) is an ESS. [2 marks]

(c) Find the mixed ESS frequency p* of Hawks. Verify that at p* the payoffs to Hawks and Doves are equal. [2 marks]`
  },

  '2024-test-Q6': {
    source: '2024 Mid-Semester Test',
    marks: 4,
    text: `Use the Needleman-Wunsch algorithm to globally align the sequences:

    Sequence A:  A C G T
    Sequence B:  A G T

Using the scoring scheme: match = +1, mismatch = −1, gap penalty = −2.

(a) Fill in the complete DP matrix F(i, j), including initialisation. Show the full matrix. [3 marks]

(b) State the optimal global alignment score (the value at F(4, 3)). [1 mark]`
  },

  '2024-test-Q7': {
    source: '2024 Mid-Semester Test',
    marks: 4,
    text: `Continuing from Q6:

(a) Perform the traceback to find one optimal global alignment. Write out the aligned sequences with gaps (using − to denote a gap). [2 marks]

(b) Calculate the score of your alignment column by column and verify it matches F(4, 3). [1 mark]

(c) Explain briefly why the traceback starts at F(n, m) rather than at the maximum value in the matrix. [1 mark]`
  },

  // ── 2025 Final Exam — Section A: Numerical Integration ─────────

  '2025-exam-Q1': {
    source: '2025 Final Exam — Section A',
    marks: 5,
    text: `Apply Newton's method to find the positive root of f(x) = x³ − 2x − 5.

(a) Starting with x₀ = 2, perform 3 iterations of Newton's method. For each step, show f(x_n), f′(x_n), and x_{n+1}. Give answers to 4 decimal places. [4 marks]

(b) Confirm that your final iterate is close to the root by evaluating f(x₃). [1 mark]`
  },

  '2025-exam-Q2': {
    source: '2025 Final Exam — Section A',
    marks: 7,
    text: `Newton's method for f(x) = 0 is the iteration x_{n+1} = g(x_n) where g(x) = x − f(x)/f′(x).

(a) Show that g′(x*) = 0 at any simple root x* of f (where f(x*) = 0 and f′(x*) ≠ 0). Use the quotient rule to compute g′(x). [3 marks]

(b) What does g′(x*) = 0 imply for the rate of convergence of Newton's method? Compare with a first-order method. [2 marks]

(c) Sketch a cobweb diagram for Newton's method applied to f(x) = x² − 2, starting from x₀ = 2. Show at least 3 iterates and label the fixed point. Describe the qualitative behaviour. [2 marks]`
  },

  '2025-exam-Q3': {
    source: '2025 Final Exam — Section A',
    marks: 10,
    text: `Consider the IVP:  dy/dx = x² + y²,    y(0) = 0.5,    with step size h = 0.5.

Use the fourth-order Runge-Kutta (RK4) method to estimate y(0.5).

(a) Compute the four slopes:
    k₁ = f(x₀, y₀)
    k₂ = f(x₀ + h/2, y₀ + h·k₁/2)
    k₃ = f(x₀ + h/2, y₀ + h·k₂/2)
    k₄ = f(x₀ + h, y₀ + h·k₃)
Show all intermediate calculations. [6 marks]

(b) Compute y₁ = y₀ + (h/6)(k₁ + 2k₂ + 2k₃ + k₄). [2 marks]

(c) Explain why RK4 is preferred over Euler's method for this type of problem. What is the global error order of each method? [2 marks]`
  },

  '2025-exam-Q4': {
    source: '2025 Final Exam — Section A',
    marks: 8,
    text: `A simplified predator-prey system is:
    dx/dt = x(1 − y)     (prey x)
    dy/dt = y(x − 1)     (predator y)

with initial conditions x(0) = 2, y(0) = 2, and step size h = 0.5.

(a) Apply one step of RK4 to this system to estimate (x(0.5), y(0.5)). Compute k₁, k₂, k₃, k₄ for both x and y simultaneously. Show all working. [6 marks]

(b) At the equilibrium point (x*, y*) = (1, 1), what do the equations predict will happen? What does this mean for predator-prey dynamics near this point? [2 marks]`
  },

  // ── 2025 Final Exam — Section B: Sequence Alignment ────────────

  '2025-exam-Q5': {
    source: '2025 Final Exam — Section B',
    marks: 5,
    text: `Use the Needleman-Wunsch algorithm to globally align:

    Sequence A:  G A T T C A
    Sequence B:  G T T C

with scoring: match = +2, mismatch = −1, gap penalty = −2.

Fill in the complete DP matrix F(i, j). Initialise the first row and column correctly. Show the complete filled matrix. [5 marks]`
  },

  '2025-exam-Q6': {
    source: '2025 Final Exam — Section B',
    marks: 4,
    text: `Continuing from Q5:

(a) Perform the traceback to find one optimal global alignment. Write out the aligned sequences with gap characters. [2 marks]

(b) The scoring scheme rewards matches (+2) but penalises both mismatches (−1) and gaps (−2). Explain intuitively why the optimal alignment might introduce a gap rather than a mismatch. [2 marks]`
  },

  '2025-exam-Q7': {
    source: '2025 Final Exam — Section B',
    marks: 4,
    text: `Affine gap penalties use a gap-open cost d and a gap-extend cost e, with three matrices M, Ix, Iy.

(a) Write the recurrence relation for each of the three matrices M(i,j), Ix(i,j), Iy(i,j) in affine gap alignment. Define what each matrix represents. [3 marks]

(b) A linear gap penalty charges k·d for a gap of length k. An affine penalty charges d + (k−1)·e. For d = 5, e = 1, which is cheaper: one gap of length 4, or four gaps of length 1? Show your calculation. [1 mark]`
  },

  '2025-exam-Q8': {
    source: '2025 Final Exam — Section B',
    marks: 5,
    text: `Feng-Doolittle progressive alignment is a heuristic for multiple sequence alignment.

(a) Describe the Feng-Doolittle algorithm in 4 steps, starting from a set of k sequences. [3 marks]

(b) What is the "once-a-gap-always-a-gap" rule, and why is it used? [1 mark]

(c) Give one reason why progressive alignment may fail to give the optimal MSA. [1 mark]`
  },

  // ── 2025 Final Exam — Section C: Simulation & HMMs ─────────────

  '2025-exam-Q9': {
    source: '2025 Final Exam — Section C',
    marks: 8,
    text: `Let X ~ Exponential(λ) with PDF f(x) = λe^{−λx} for x ≥ 0.

(a) Derive the CDF F(x) = P(X ≤ x) by integrating the PDF. [2 marks]

(b) Use the inversion sampling method to show that if U ~ Uniform(0, 1), then
    X = −ln(U)/λ   follows an Exponential(λ) distribution.
Show your derivation clearly. [3 marks]

(c) State the memoryless property of the exponential distribution formally as a conditional probability equation. [1 mark]

(d) A Poisson process has rate λ = 2 events per minute. What is the probability that the first event occurs after 30 seconds (0.5 minutes)? [2 marks]`
  },

  '2025-exam-Q10': {
    source: '2025 Final Exam — Section C',
    marks: 9,
    text: `A Poisson process with rate λ = 3 events per hour models arrivals at a service desk.

(a) Describe an algorithm to simulate arrivals of this Poisson process over a 2-hour period using only a source of Uniform(0,1) random numbers. State clearly what each step computes. [4 marks]

(b) Using the random numbers U₁ = 0.8, U₂ = 0.3, U₃ = 0.6, U₄ = 0.2 (and λ = 3), compute the first four inter-arrival times T_i = −ln(U_i)/λ and the first four arrival times S_i = T₁ + ... + T_i. Give answers to 3 decimal places. [3 marks]

(c) What is the expected number of events in the 2-hour window? What distribution does N(2) follow? [2 marks]`
  },

  '2025-exam-Q11': {
    source: '2025 Final Exam — Section C',
    marks: 12,
    text: `An HMM has two hidden states {F (fair die), L (loaded die)} and observations {1, 2, 3, 4, 5, 6}.

Parameters:
• Initial: π_F = 0.5, π_L = 0.5
• Transitions: a_{FF} = 0.9, a_{FL} = 0.1, a_{LF} = 0.2, a_{LL} = 0.8
• Emissions (Fair): e_F(1) = e_F(2) = ... = e_F(6) = 1/6
• Emissions (Loaded): e_L(6) = 1/2, e_L(1) = e_L(2) = e_L(3) = e_L(4) = e_L(5) = 1/10

Observed sequence: x₁ = 3, x₂ = 6, x₃ = 6.

(a) Set up the Viterbi algorithm. Write the recurrence relation and define v_k(i). [2 marks]

(b) Fill in the Viterbi matrix v_k(i) for k ∈ {F, L} and i ∈ {1, 2, 3}. Work in probabilities (not log-space). Show all calculations. [7 marks]

(c) Perform the traceback to find the most likely hidden state sequence. [2 marks]

(d) What is the probability of the most likely path? [1 mark]`
  },

  '2025-exam-Q12': {
    source: '2025 Final Exam — Section C',
    marks: 10,
    text: `Using the same HMM as Q11 (Fair/Loaded dice model).

(a) Write the Forward recurrence relation and define f_k(i). How does it differ from the Viterbi recurrence? [2 marks]

(b) Fill in the Forward matrix f_k(i) for k ∈ {F, L} and i ∈ {1, 2, 3} for the sequence x₁ = 3, x₂ = 6, x₃ = 6. [6 marks]

(c) Compute P(x₁ = 3, x₂ = 6, x₃ = 6 | model) using the termination step of the Forward algorithm. [2 marks]`
  },

  // ── 2025 Final Exam — Section D: Trees (Phylogenetics) ──────────

  '2025-exam-Q13': {
    source: '2025 Final Exam — Section D',
    marks: 5,
    text: `Apply UPGMA to the following distance matrix to construct a phylogenetic tree:

         A    B    C    D
    A  [ 0    5    9   11 ]
    B  [ 5    0    8    8 ]
    C  [ 9    8    0    5 ]
    D  [11    8    5    0 ]

Show all merging steps: at each step identify the minimum distance pair, state the branch lengths, update the distance matrix, and sketch the partial tree. [5 marks]`
  },

  '2025-exam-Q14': {
    source: '2025 Final Exam — Section D',
    marks: 2,
    text: `(a) UPGMA assumes the molecular clock (ultrametric condition). Draw a 4-taxon unrooted tree with unequal branch lengths that is NOT ultrametric, but where UPGMA would still recover the correct unrooted topology. Briefly explain why UPGMA succeeds on this example. [2 marks]`
  },

  '2025-exam-Q15': {
    source: '2025 Final Exam — Section D',
    marks: 2,
    text: `Compare UPGMA and Neighbour Joining (NJ) for phylogenetic tree construction.

(a) Name one advantage of NJ over UPGMA. [1 mark]

(b) Name one disadvantage or limitation of NJ compared to model-based methods (such as maximum likelihood). [1 mark]`
  },

  '2025-exam-Q16': {
    source: '2025 Final Exam — Section D',
    marks: 16,
    text: `Consider 4 aligned sequences (taxa A, B, C, D) with 6 columns:

    Column:  1  2  3  4  5  6
    A:       G  A  C  T  G  A
    B:       G  A  C  T  G  G
    C:       A  G  T  C  G  A
    D:       A  G  T  C  G  G

(a) For each column, determine whether it is parsimony-informative or uninformative. Justify your answer. [3 marks]

(b) For column 1 only: draw a rooted tree with topology ((A,B),(C,D)) and use the Fitch algorithm to compute the parsimony score. Show the character sets at each internal node. Mark where mutations occur. [3 marks]

(c) There are 3 possible unrooted topologies for 4 taxa. For each topology, compute the total parsimony score over all informative sites. Which topology is the maximum parsimony tree? [5 marks]

(d) For larger datasets (say, 20 taxa), why do we resort to heuristic methods rather than exhaustive search? Give a quantitative justification. [2 marks]

(e) Give two reasons why maximum likelihood is generally preferred over maximum parsimony for phylogenetic inference. [3 marks]`
  },

  '2025-exam-Q17a': {
    source: '2025 Final Exam — Section D',
    marks: 3,
    text: `Under the Jukes-Cantor (JC69) model with rate parameter μ, the probability that a nucleotide remains unchanged after time t is:
    P(same | t) = 1/4 + (3/4)·e^{−4μt}

(a) Calculate P(T → C | t = 2, μ = 0.1) — the probability of a transition from T to any different base — and specifically P(T → C). Note: by symmetry in JC69, P(T → C) = P(T → A) = P(T → G) = (1 − P(same))/3. [3 marks]`
  },

  '2025-exam-Q17b': {
    source: '2025 Final Exam — Section D',
    marks: 2,
    text: `(b) In the JC69 model, the transition matrix P(t) = e^{μQt} depends on the rate μ and time t only through their product μt.

Show why it is impossible to estimate μ and t separately from a single pair of sequences, even with infinite data. What quantity can we estimate, and what is it called? [2 marks]`
  },

  '2025-exam-Q17c': {
    source: '2025 Final Exam — Section D',
    marks: 3,
    text: `(c) Describe one heuristic strategy used to search for the maximum likelihood (ML) phylogenetic tree.

Specifically:
• What is the search strategy? (Name it and describe one step.)
• Why does it not guarantee finding the global ML tree?
• What is NNI (nearest-neighbour interchange)? [3 marks]`
  },
};
