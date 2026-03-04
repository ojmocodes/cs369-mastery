import type { TreeData, ExamQuestion } from '../../../types';

export const treeData: TreeData = {
  course: "COMPSCI 369",
  title: "Computational Science",
  version: "2.0",
  description: "Knowledge tree for COMPSCI 369 — covers numerical methods, sequence alignment, stochastic processes, HMMs, and phylogenetics.",
  tiers: [
    { id: "foundations", label: "Foundations", order: 0, color: "#6366f1" },
    { id: "core", label: "Core Methods", order: 1, color: "#8b5cf6" },
    { id: "advanced", label: "Advanced Topics", order: 2, color: "#a855f7" },
    { id: "applications", label: "Applications & Synthesis", order: 3, color: "#c084fc" },
    { id: "expert", label: "Expert / Mastery", order: 4, color: "#e879f9" },
    { id: "synthesis", label: "Synthesis", order: 5, color: "#f0abfc" },
  ],
  nodes: [
    // ── FOUNDATIONS ───────────────────────────────────────────────
    {
      id: "complex-systems",
      label: "Complex Systems & Modelling",
      tier: "foundations",
      description: "What is computational science? Reductionism vs holism, emergent behaviour, why we model, types of models (deterministic vs stochastic, continuous vs discrete).",
      topics: [
        "Reductionism vs holism",
        "Emergent behaviour",
        "Why we model (prediction, understanding, data analysis)",
        "Deterministic vs stochastic models",
        "Continuous vs discrete models"
      ],
      prerequisites: [],
      source: "Lec2 slides, Coursebook Ch1"
    },
    {
      id: "dynamical-systems",
      label: "Dynamical Systems & Iteration",
      tier: "foundations",
      description: "Fixed points, cobweb diagrams, logistic map, stability analysis. Understanding how iterative systems converge or diverge.",
      topics: [
        "Fixed points of functions",
        "Cobweb diagrams",
        "Stable vs unstable fixed points",
        "Logistic map and chaos",
        "Iteration and convergence"
      ],
      prerequisites: ["complex-systems"],
      source: "2024 Test Q1-Q3",
      exam_questions: ["2024-test-Q1", "2024-test-Q2", "2024-test-Q3"]
    },
    {
      id: "fixed-points",
      label: "Fixed Point Theory",
      tier: "foundations",
      description: "Formal definition of fixed points, conditions for stability, and the derivative test |g'(x*)| < 1 for attracting fixed points.",
      topics: [
        "Definition: x* is a fixed point if g(x*) = x*",
        "Attracting fixed points: |g'(x*)| < 1",
        "Repelling fixed points: |g'(x*)| > 1",
        "Neutral fixed points: |g'(x*)| = 1",
        "Finding fixed points analytically"
      ],
      prerequisites: ["dynamical-systems"],
      source: "Coursebook Ch1",
      exam_questions: ["2024-test-Q1", "2024-test-Q2"]
    },
    {
      id: "cobweb-diagrams",
      label: "Cobweb Diagrams",
      tier: "foundations",
      description: "Graphical method for visualising iteration. Drawing the cobweb: alternating between curve y=g(x) and diagonal y=x.",
      topics: [
        "Drawing cobweb diagrams step by step",
        "Inward spiral \u2192 stable fixed point",
        "Outward spiral \u2192 unstable fixed point",
        "Staircase pattern (monotone approach)",
        "Oscillation pattern (alternating sides)"
      ],
      prerequisites: ["fixed-points"],
      source: "2024 Test Q1, 2025 Exam Q2",
      exam_questions: ["2024-test-Q1", "2025-exam-Q2"]
    },
    {
      id: "newtons-method",
      label: "Newton's Method",
      tier: "foundations",
      description: "Root finding via Newton-Raphson iteration. Derivation, convergence, cobweb analysis, failure modes.",
      topics: [
        "Newton-Raphson formula: x_{n+1} = x_n - f(x_n)/f'(x_n)",
        "Geometric interpretation (tangent line)",
        "Convergence rate",
        "When Newton's method fails",
        "Newton's method as fixed point iteration"
      ],
      prerequisites: ["fixed-points"],
      source: "2024 Test Q1-Q2, 2025 Exam Q1-Q2",
      exam_questions: ["2024-test-Q1", "2024-test-Q2", "2025-exam-Q1", "2025-exam-Q2"]
    },
    {
      id: "nm-derivation",
      label: "Newton's Method: Derivation",
      tier: "foundations",
      description: "Deriving Newton-Raphson from the tangent line approximation. Showing it is a fixed point iteration g(x) = x - f(x)/f'(x).",
      topics: [
        "Taylor series linearisation: f(x+h) \u2248 f(x) + hf'(x)",
        "Setting f(x_{n+1}) = 0 and solving for x_{n+1}",
        "Iteration function: g(x) = x - f(x)/f'(x)",
        "Fixed points of g(x) are roots of f(x)",
        "Geometric interpretation: tangent intersects x-axis"
      ],
      prerequisites: ["newtons-method"],
      source: "2024 Test Q2, 2025 Exam Q2",
      exam_questions: ["2024-test-Q2", "2025-exam-Q2"]
    },
    {
      id: "nm-convergence",
      label: "Newton's Method: Convergence",
      tier: "core",
      description: "Quadratic convergence of Newton's method. The error at step n+1 is proportional to the square of the error at step n.",
      topics: [
        "Order of convergence: quadratic (g'(x*) = 0)",
        "Error relation: |e_{n+1}| \u2248 C|e_n|\u00b2",
        "Number of correct digits doubles each step",
        "Convergence for double roots: linear",
        "Cobweb analysis of Newton's iteration"
      ],
      prerequisites: ["nm-derivation", "cobweb-diagrams"],
      source: "2024 Test Q1-Q2, 2025 Exam Q2",
      exam_questions: ["2024-test-Q1", "2025-exam-Q2"]
    },
    {
      id: "nm-failures",
      label: "Newton's Method: Failure Modes",
      tier: "core",
      description: "Cases where Newton's method diverges, cycles, or fails: zero derivative, poor initial guess, cycles, and chaos.",
      topics: [
        "Division by zero when f'(x_n) = 0",
        "Cycling between values",
        "Divergence to infinity",
        "Sensitive dependence on initial guess",
        "Example: f(x) = x\u00b3 - 2x + 2, x\u2080 = 0 \u2192 cycle"
      ],
      prerequisites: ["nm-convergence"],
      source: "Coursebook Ch2"
    },
    {
      id: "ode-basics",
      label: "ODE Initial Value Problems",
      tier: "foundations",
      description: "First-order ODEs as initial value problems. The fundamental problem: given dy/dx = f(x,y), y(x\u2080) = y\u2080, approximate y(x).",
      topics: [
        "Ordinary differential equation definition",
        "Initial value problem (IVP) formulation",
        "Why analytical solutions often don't exist",
        "Step-based numerical approach",
        "Local vs global error concepts"
      ],
      prerequisites: ["dynamical-systems"],
      source: "Coursebook Ch4"
    },
    {
      id: "euler-method",
      label: "Euler's Method",
      tier: "foundations",
      description: "Numerical solution of ODEs using Euler's forward method. Step size, local and global error, limitations.",
      topics: [
        "Euler's forward method: y_{n+1} = y_n + h\u00b7f(x_n, y_n)",
        "Step size h and accuracy tradeoff",
        "Local truncation error O(h\u00b2)",
        "Global error O(h)",
        "Limitations: stiffness, instability"
      ],
      prerequisites: ["ode-basics"],
      source: "2024 Test Q3",
      exam_questions: ["2024-test-Q3"]
    },
    {
      id: "euler-error",
      label: "Euler's Method: Error Analysis",
      tier: "core",
      description: "Local and global truncation error of Euler's method. Stability condition for exponential decay problems.",
      topics: [
        "Taylor series derivation of local error O(h\u00b2)",
        "Global error accumulation: O(h)",
        "Stability condition: |1 + h\u03bb| < 1",
        "Stiff equations and stability regions",
        "Comparison: halving h halves global error"
      ],
      prerequisites: ["euler-method"],
      source: "2024 Test Q3"
    },
    {
      id: "rk4",
      label: "Runge-Kutta (RK4) Method",
      tier: "core",
      description: "Fourth-order Runge-Kutta method for ODEs. The four slopes (k1-k4), weighting, accuracy comparison with Euler.",
      topics: [
        "Motivation: improving on Euler",
        "RK4 formula and the four slopes k1-k4",
        "Weighted average: (k1 + 2k2 + 2k3 + k4)/6",
        "Step-by-step computation",
        "Global error O(h\u2074)"
      ],
      prerequisites: ["euler-error"],
      source: "2024 Test Q3, 2025 Exam Q3-Q4",
      exam_questions: ["2024-test-Q3", "2025-exam-Q3", "2025-exam-Q4"]
    },
    {
      id: "rk4-slopes",
      label: "RK4: Four Slopes k1\u2013k4",
      tier: "core",
      description: "The definitions of k1, k2, k3, k4 in RK4 and their geometric interpretation as slope estimates at different points.",
      topics: [
        "k1 = f(xn, yn) \u2014 slope at left endpoint",
        "k2 = f(xn + h/2, yn + h\u00b7k1/2) \u2014 slope at midpoint using k1",
        "k3 = f(xn + h/2, yn + h\u00b7k2/2) \u2014 slope at midpoint using k2",
        "k4 = f(xn + h, yn + h\u00b7k3) \u2014 slope at right endpoint",
        "Why midpoint slopes get double weight (Simpson's rule)"
      ],
      prerequisites: ["rk4"],
      source: "2025 Exam Q3",
      exam_questions: ["2025-exam-Q3"]
    },
    {
      id: "systems-of-odes",
      label: "Systems of ODEs",
      tier: "core",
      description: "Extending numerical methods to systems of coupled ODEs (e.g., predator-prey). Vector notation, applying RK4 to systems.",
      topics: [
        "Coupled ODE systems: vector form",
        "Applying RK4 component-wise to vectors",
        "Lotka-Volterra (predator-prey) example",
        "Phase portraits",
        "Conservation laws as verification"
      ],
      prerequisites: ["rk4-slopes"],
      source: "2025 Exam Q4",
      exam_questions: ["2025-exam-Q4"]
    },
    {
      id: "genetics-intro",
      label: "Genetics & Molecular Biology Primer",
      tier: "foundations",
      description: "DNA, RNA, proteins, amino acids, codons, the central dogma. Why sequences matter for computational biology.",
      topics: [
        "DNA structure and base pairs (A,T,C,G)",
        "RNA and transcription",
        "Amino acids and the genetic code",
        "Central dogma of molecular biology",
        "Mutations: substitution, insertion, deletion"
      ],
      prerequisites: ["complex-systems"],
      source: "Coursebook Ch1"
    },
    {
      id: "pairwise-alignment",
      label: "Pairwise Sequence Alignment",
      tier: "core",
      description: "Edit distance, scoring schemes, substitution matrices. Setting up the alignment problem formally.",
      topics: [
        "Edit distance concept",
        "Scoring: matches, mismatches, gaps",
        "Substitution matrices (PAM, BLOSUM)",
        "Global vs local alignment",
        "Why brute force is infeasible"
      ],
      prerequisites: ["genetics-intro"],
      source: "Coursebook Ch2"
    },
    {
      id: "dp-principle",
      label: "Dynamic Programming Principle",
      tier: "core",
      description: "Optimal substructure and overlapping subproblems. How DP turns exponential search into polynomial computation.",
      topics: [
        "Optimal substructure property",
        "Overlapping subproblems",
        "Memoisation vs tabulation",
        "Time and space complexity improvement",
        "Building solutions bottom-up"
      ],
      prerequisites: ["pairwise-alignment"],
      source: "Coursebook Ch2"
    },
    {
      id: "needleman-wunsch",
      label: "Needleman-Wunsch (Global Alignment)",
      tier: "core",
      description: "Dynamic programming algorithm for global sequence alignment. Recurrence relation, fill and traceback, optimal alignment.",
      topics: [
        "Dynamic programming for alignment",
        "Recurrence relation: F(i,j) = max of three cases",
        "Initialization (first row and column)",
        "Matrix fill (forward pass)",
        "Traceback (finding optimal alignment)"
      ],
      prerequisites: ["dp-principle"],
      source: "Coursebook Ch2, 2024 Test Q6, 2025 Exam Q5-Q6",
      exam_questions: ["2024-test-Q6", "2025-exam-Q5", "2025-exam-Q6"]
    },
    {
      id: "nw-recurrence",
      label: "NW: Recurrence Relation",
      tier: "core",
      description: "The three-case recurrence at the heart of Needleman-Wunsch: diagonal (align), vertical (gap in B), horizontal (gap in A).",
      topics: [
        "F(i,j) = max { F(i-1,j-1)+s(ai,bj), F(i-1,j)+d, F(i,j-1)+d }",
        "Initialization: F(0,0)=0, F(i,0)=i\u00b7d, F(0,j)=j\u00b7d",
        "Scoring function s(ai, bj): match vs mismatch",
        "Gap penalty d (linear)",
        "Why only three predecessors suffice"
      ],
      prerequisites: ["needleman-wunsch"],
      source: "2024 Test Q6, 2025 Exam Q5",
      exam_questions: ["2024-test-Q6", "2025-exam-Q5"]
    },
    {
      id: "nw-traceback",
      label: "NW: Traceback & Optimal Alignment",
      tier: "core",
      description: "Reconstructing the optimal alignment by following pointers from bottom-right to top-left of the DP matrix.",
      topics: [
        "Traceback starts at F(n,m) \u2014 bottom-right",
        "Follow the predecessor that achieved the maximum",
        "Diagonal \u2192 match/mismatch, vertical \u2192 gap in B, horizontal \u2192 gap in A",
        "Multiple optimal alignments possible",
        "Time complexity O(nm) fill + O(n+m) traceback"
      ],
      prerequisites: ["nw-recurrence"],
      source: "2024 Test Q7, 2025 Exam Q6",
      exam_questions: ["2024-test-Q7", "2025-exam-Q6"]
    },
    {
      id: "smith-waterman",
      label: "Smith-Waterman (Local Alignment)",
      tier: "advanced",
      description: "Local alignment variant of Needleman-Wunsch. Modifications to recurrence and traceback for finding best local match.",
      topics: [
        "Modification: add 0 to recurrence (floor at 0)",
        "Traceback: start at maximum cell, stop when reaching 0",
        "Finds the best-scoring local alignment",
        "Comparison with global alignment",
        "Biological application: finding conserved domains"
      ],
      prerequisites: ["nw-traceback"],
      source: "Coursebook Ch2"
    },
    {
      id: "affine-gaps",
      label: "Affine Gap Penalties",
      tier: "advanced",
      description: "Realistic gap scoring with separate open and extend penalties. Three-matrix DP formulation.",
      topics: [
        "Linear vs affine gap penalties",
        "Gap open penalty (d) vs gap extend penalty (e)",
        "Three matrices: M, Ix, Iy",
        "Recurrence relations for each matrix",
        "Biological motivation: insertions tend to be contiguous"
      ],
      prerequisites: ["nw-traceback"],
      source: "Coursebook Ch2, 2025 Exam Q7",
      exam_questions: ["2025-exam-Q7"]
    },
    {
      id: "affine-recurrences",
      label: "Affine Gaps: Three-Matrix Recurrences",
      tier: "advanced",
      description: "The full recurrence relations for matrices M, Ix, Iy in affine gap alignment. Understanding gap opening vs extension.",
      topics: [
        "M(i,j): both residues aligned (diagonal from M, Ix, or Iy)",
        "Ix(i,j): gap in sequence X (extending or opening gap in X)",
        "Iy(i,j): gap in sequence Y (extending or opening gap in Y)",
        "Full recurrences for each matrix",
        "Traceback through three matrices"
      ],
      prerequisites: ["affine-gaps"],
      source: "2025 Exam Q7",
      exam_questions: ["2025-exam-Q7"]
    },
    {
      id: "multiple-sequence-alignment",
      label: "Multiple Sequence Alignment (MSA)",
      tier: "advanced",
      description: "Aligning more than two sequences simultaneously. Sum-of-pairs scoring, computational complexity.",
      topics: [
        "Why MSA matters (finding conserved regions, phylogeny)",
        "Sum-of-pairs (SP) scoring",
        "Exact MSA is NP-hard",
        "Extension of DP to k sequences: O(n^k)"
      ],
      prerequisites: ["needleman-wunsch"],
      source: "Coursebook Ch3"
    },
    {
      id: "progressive-alignment",
      label: "Progressive Alignment (Feng-Doolittle)",
      tier: "advanced",
      description: "Heuristic approach to MSA: build guide tree, then align sequences progressively along the tree.",
      topics: [
        "Distance matrix from pairwise alignments",
        "Guide tree construction (UPGMA)",
        "Progressive alignment along the tree",
        "Feng-Doolittle algorithm steps",
        "Once-a-gap-always-a-gap rule",
        "Limitations: greedy, sensitive to guide tree"
      ],
      prerequisites: ["multiple-sequence-alignment", "upgma"],
      source: "Coursebook Ch3, 2025 Exam Q8",
      exam_questions: ["2025-exam-Q8"]
    },
    {
      id: "probability-primer",
      label: "Probability Foundations",
      tier: "foundations",
      description: "Probability axioms, conditional probability, Bayes' theorem, independence, common distributions.",
      topics: [
        "Sample spaces and events",
        "Probability axioms",
        "Conditional probability P(A|B)",
        "Bayes' theorem",
        "Independence",
        "Expectation and variance",
        "Common distributions: Bernoulli, Binomial, Geometric, Poisson, Exponential, Normal"
      ],
      prerequisites: [],
      source: "Coursebook Ch5"
    },
    {
      id: "exponential-distribution",
      label: "Exponential Distribution",
      tier: "core",
      description: "The exponential distribution \u2014 memoryless property, CDF, PDF, connection to Poisson process. Key for simulation.",
      topics: [
        "PDF: f(x) = \u03bbe^{-\u03bbx} for x\u22650",
        "CDF: F(x) = 1 - e^{-\u03bbx}",
        "Mean = 1/\u03bb, Variance = 1/\u03bb\u00b2",
        "Memoryless property: P(X>s+t|X>s) = P(X>t)",
        "Inversion sampling: X = -ln(U)/\u03bb"
      ],
      prerequisites: ["probability-primer"],
      source: "Coursebook Ch5, 2025 Exam Q9",
      exam_questions: ["2025-exam-Q9"]
    },
    {
      id: "inversion-sampling",
      label: "Inversion Sampling",
      tier: "core",
      description: "The CDF inversion method for generating random variates. Deriving the exponential sampler and applying it generally.",
      topics: [
        "If U ~ Uniform(0,1), then F\u207b\u00b9(U) has CDF F",
        "Deriving CDF F(x) = 1 - e^{-\u03bbx} for exponential",
        "Inverting: X = F\u207b\u00b9(U) = -ln(1-U)/\u03bb \u2248 -ln(U)/\u03bb",
        "Why 1-U and U have the same distribution",
        "Applying to other distributions"
      ],
      prerequisites: ["exponential-distribution"],
      source: "2025 Exam Q9",
      exam_questions: ["2025-exam-Q9"]
    },
    {
      id: "bayesian-inference",
      label: "Bayesian & Maximum Likelihood Inference",
      tier: "core",
      description: "Statistical inference foundations: likelihood functions, maximum likelihood estimation, Bayesian inference with priors and posteriors.",
      topics: [
        "Likelihood function L(\u03b8|data)",
        "Maximum likelihood estimation (MLE)",
        "Log-likelihood",
        "Prior, likelihood, posterior (Bayes' theorem)",
        "MAP estimation vs MLE"
      ],
      prerequisites: ["probability-primer"],
      source: "Coursebook Ch6"
    },
    {
      id: "simulation-basics",
      label: "Simulation & Random Number Generation",
      tier: "core",
      description: "Pseudorandom number generation, Monte Carlo methods, inversion sampling, acceptance-rejection.",
      topics: [
        "Why simulate? (intractable models, stochastic systems)",
        "Pseudorandom number generators",
        "Uniform random variates",
        "Inversion sampling method",
        "Acceptance-rejection method"
      ],
      prerequisites: ["probability-primer"],
      source: "Coursebook Ch7"
    },
    {
      id: "poisson-process",
      label: "Poisson Process",
      tier: "core",
      description: "Poisson process as a model for random events in time. Inter-arrival times, simulation, counting process.",
      topics: [
        "Definition: events at constant rate \u03bb",
        "Inter-arrival times are Exp(\u03bb)",
        "Number of events in [0,t] is Poisson(\u03bbt)",
        "Simulating a Poisson process by sampling inter-arrivals",
        "Superposition and thinning"
      ],
      prerequisites: ["exponential-distribution", "simulation-basics"],
      source: "Coursebook Ch7, 2025 Exam Q10",
      exam_questions: ["2025-exam-Q10"]
    },
    {
      id: "poisson-simulation",
      label: "Poisson Process: Simulation Algorithm",
      tier: "core",
      description: "Step-by-step algorithm for simulating a Poisson process using inter-arrival time sampling. Computing arrival times.",
      topics: [
        "Algorithm: generate T_i = -ln(U_i)/\u03bb",
        "Arrival times S_n = T_1 + T_2 + ... + T_n",
        "Stop when S_n > t_max",
        "Count N(t) = number of arrivals by time t",
        "Verifying: E[N(t)] = \u03bbt"
      ],
      prerequisites: ["poisson-process", "inversion-sampling"],
      source: "2025 Exam Q10",
      exam_questions: ["2025-exam-Q10"]
    },
    {
      id: "random-walk",
      label: "Random Walks",
      tier: "core",
      description: "Simple random walks on integers and in higher dimensions. Properties, simulation, connection to diffusion.",
      topics: [
        "Simple random walk on Z: +1 or -1 with equal probability",
        "Expected position E[X_n] = 0",
        "Variance Var(X_n) = n",
        "Return to origin",
        "Connection to Brownian motion / diffusion"
      ],
      prerequisites: ["simulation-basics"],
      source: "Coursebook Ch7"
    },
    {
      id: "markov-property",
      label: "The Markov Property",
      tier: "core",
      description: "Formal statement of the Markov property: the future depends only on the present, not the past.",
      topics: [
        "P(X_{n+1}=j | X_n=i, X_{n-1}=i_{n-1}, ...) = P(X_{n+1}=j | X_n=i)",
        "Why memorylessness is a modelling assumption",
        "Homogeneous vs inhomogeneous chains",
        "Examples: random walks, weather models, gambler's ruin",
        "State space: finite vs countably infinite"
      ],
      prerequisites: ["probability-primer"],
      source: "Coursebook Ch8"
    },
    {
      id: "markov-chains",
      label: "Markov Chains",
      tier: "core",
      description: "Discrete-time Markov chains: transition matrices, Chapman-Kolmogorov, stationary distributions, ergodicity.",
      topics: [
        "Transition probability matrix P",
        "n-step transitions: P^n",
        "Chapman-Kolmogorov equation",
        "Stationary (equilibrium) distribution \u03c0",
        "Irreducibility and ergodicity",
        "Absorbing states"
      ],
      prerequisites: ["markov-property"],
      source: "Coursebook Ch8"
    },
    {
      id: "stationary-distribution",
      label: "Stationary Distributions",
      tier: "core",
      description: "Finding and interpreting the stationary distribution of a Markov chain. Solving \u03c0P = \u03c0.",
      topics: [
        "Definition: \u03c0 = \u03c0P with \u2211\u03c0_i = 1",
        "Solving linear system \u03c0P = \u03c0",
        "Interpretation: long-run proportion of time in each state",
        "Ergodic theorem: time average = space average",
        "Conditions for unique stationary distribution"
      ],
      prerequisites: ["markov-chains"],
      source: "Coursebook Ch8"
    },
    {
      id: "hmm-definition",
      label: "Hidden Markov Models (Definition)",
      tier: "core",
      description: "HMM structure: hidden states, emissions, transition and emission probabilities. The three fundamental HMM problems.",
      topics: [
        "Hidden states vs observed emissions",
        "Transition probabilities a_{ij}",
        "Emission probabilities e_k(b)",
        "Initial state distribution \u03c0",
        "Three HMM problems: evaluation, decoding, learning"
      ],
      prerequisites: ["stationary-distribution"],
      source: "Coursebook Ch9"
    },
    {
      id: "hmm-three-problems",
      label: "HMM: Three Fundamental Problems",
      tier: "core",
      description: "Evaluation (Forward), Decoding (Viterbi), and Learning (Baum-Welch). Why each problem matters and which algorithm solves it.",
      topics: [
        "Problem 1 \u2014 Evaluation: P(observations | model)? \u2192 Forward Algorithm",
        "Problem 2 \u2014 Decoding: best hidden path? \u2192 Viterbi Algorithm",
        "Problem 3 \u2014 Learning: estimate parameters from data? \u2192 Baum-Welch",
        "Connections between the three problems",
        "Applications: gene finding, speech recognition, CpG islands"
      ],
      prerequisites: ["hmm-definition"],
      source: "Coursebook Ch9"
    },
    {
      id: "viterbi",
      label: "Viterbi Algorithm (Decoding)",
      tier: "advanced",
      description: "Finding the most likely hidden state sequence given observations. Dynamic programming in log-space.",
      topics: [
        "Decoding problem: argmax_path P(path | observations)",
        "Viterbi variable: v_k(i) = max probability path to state k at position i",
        "Log-space computation to avoid underflow",
        "Traceback for optimal path",
        "Time complexity O(K\u00b2n)"
      ],
      prerequisites: ["hmm-three-problems"],
      source: "Coursebook Ch9, 2025 Exam Q11",
      exam_questions: ["2025-exam-Q11"]
    },
    {
      id: "viterbi-recurrence",
      label: "Viterbi: Recurrence & Traceback",
      tier: "advanced",
      description: "The Viterbi recurrence relation in detail and the traceback procedure for recovering the optimal path.",
      topics: [
        "Recurrence: v_k(i) = e_k(x_i) \u00b7 max_l { a_{lk} \u00b7 v_l(i-1) }",
        "Initialization: v_k(1) = e_k(x_1) \u00b7 \u03c0_k",
        "Termination: best score = max_k v_k(n)",
        "Pointer array ptr_k(i) for traceback",
        "Traceback from position n back to 1"
      ],
      prerequisites: ["viterbi"],
      source: "2025 Exam Q11",
      exam_questions: ["2025-exam-Q11"]
    },
    {
      id: "forward-algorithm",
      label: "Forward Algorithm (Evaluation)",
      tier: "advanced",
      description: "Computing the total probability of an observed sequence under an HMM. Forward variables and their recurrence.",
      topics: [
        "Evaluation problem: P(observations | model)",
        "Forward variable: f_k(i) = P(x_1...x_i, \u03c0_i=k)",
        "Forward recurrence: f_k(i) = e_k(x_i) \u00b7 \u03a3_l { a_{lk} \u00b7 f_l(i-1) }",
        "Initialization and termination",
        "Sum vs Max: forward vs Viterbi"
      ],
      prerequisites: ["viterbi-recurrence"],
      source: "Coursebook Ch9, 2025 Exam Q12",
      exam_questions: ["2025-exam-Q12"]
    },
    {
      id: "forward-termination",
      label: "Forward Algorithm: Termination",
      tier: "advanced",
      description: "Computing P(observations) as the sum over final states. Understanding what the forward variables represent.",
      topics: [
        "P(x_1...x_n) = \u03a3_k f_k(n)",
        "Why we sum over all final states",
        "Numerical underflow: log-sum-exp trick",
        "Comparing log-likelihoods of different models",
        "Relationship to Viterbi (sum vs max)"
      ],
      prerequisites: ["forward-algorithm"],
      source: "2025 Exam Q12",
      exam_questions: ["2025-exam-Q12"]
    },
    {
      id: "backward-baum-welch",
      label: "Backward Algorithm & Baum-Welch (Learning)",
      tier: "advanced",
      description: "Backward algorithm and Baum-Welch (EM) for estimating HMM parameters from data.",
      topics: [
        "Backward variable b_k(i)",
        "Backward recurrence",
        "Posterior decoding using forward-backward",
        "Baum-Welch as EM algorithm",
        "Re-estimation formulas",
        "Convergence properties"
      ],
      prerequisites: ["forward-termination", "bayesian-inference"],
      source: "Coursebook Ch9"
    },
    {
      id: "hmm-applications",
      label: "HMM Applications",
      tier: "applications",
      description: "Profile HMMs for protein families, gene finding with HMMs, CpG island detection.",
      topics: [
        "Profile HMMs for sequence families",
        "Match, insert, delete states",
        "Gene finding HMMs",
        "CpG island detection",
        "Casino example (fair vs loaded dice)"
      ],
      prerequisites: ["viterbi", "forward-algorithm"],
      source: "Coursebook Ch10"
    },
    {
      id: "distance-methods",
      label: "Distance-Based Tree Methods",
      tier: "core",
      description: "Constructing phylogenetic trees from distance matrices. Overview of distance-based approaches.",
      topics: [
        "Phylogenetic trees: rooted vs unrooted",
        "Distance matrices from sequence data",
        "Ultrametric vs additive trees",
        "Molecular clock assumption",
        "Number of possible tree topologies"
      ],
      prerequisites: ["genetics-intro"],
      source: "Coursebook Ch11"
    },
    {
      id: "upgma-algorithm",
      label: "UPGMA: Algorithm Steps",
      tier: "core",
      description: "Step-by-step UPGMA: find minimum distance pair, merge, update distances, repeat. Building the ultrametric tree.",
      topics: [
        "Step 1: Find minimum D(i,j) in distance matrix",
        "Step 2: Merge i and j into cluster (ij), branch length = D(i,j)/2",
        "Step 3: Update D((ij),k) = (|i|\u00b7D(i,k) + |j|\u00b7D(j,k)) / (|i|+|j|)",
        "Step 4: Remove rows/columns i and j, add (ij)",
        "Repeat until one cluster remains"
      ],
      prerequisites: ["distance-methods"],
      source: "2025 Exam Q13",
      exam_questions: ["2025-exam-Q13"]
    },
    {
      id: "upgma",
      label: "UPGMA Tree Construction",
      tier: "core",
      description: "Unweighted Pair Group Method with Arithmetic Mean \u2014 building ultrametric trees. Properties and limitations.",
      topics: [
        "UPGMA algorithm",
        "Ultrametric property (molecular clock)",
        "When UPGMA gives wrong topology",
        "Time complexity O(n\u00b2) per step",
        "Worked example from distance matrix"
      ],
      prerequisites: ["upgma-algorithm"],
      source: "Coursebook Ch11, 2025 Exam Q13-Q14",
      exam_questions: ["2025-exam-Q13", "2025-exam-Q14"]
    },
    {
      id: "neighbour-joining",
      label: "Neighbour Joining",
      tier: "advanced",
      description: "Neighbour joining algorithm for constructing additive (non-ultrametric) trees from distance data.",
      topics: [
        "Motivation: relaxing molecular clock assumption",
        "Q-matrix (net divergence correction): Q(i,j) = (n-2)D(i,j) - r_i - r_j",
        "NJ algorithm steps",
        "Branch length calculation",
        "Advantages and disadvantages vs UPGMA"
      ],
      prerequisites: ["upgma"],
      source: "Coursebook Ch11, 2025 Exam Q15",
      exam_questions: ["2025-exam-Q15"]
    },
    {
      id: "parsimony-sites",
      label: "Parsimony: Informative Sites",
      tier: "advanced",
      description: "Identifying parsimony-informative vs uninformative sites in a multiple alignment. Which sites contain phylogenetic signal.",
      topics: [
        "A site is parsimony-informative if \u22652 character states each appear \u22652 times",
        "Uninformative: invariant sites, or only one character appears multiple times",
        "How to check for informative sites in an alignment",
        "Worked examples with 4-taxon alignments",
        "Only informative sites affect parsimony tree choice"
      ],
      prerequisites: ["distance-methods", "multiple-sequence-alignment"],
      source: "2025 Exam Q16",
      exam_questions: ["2025-exam-Q16"]
    },
    {
      id: "parsimony",
      label: "Maximum Parsimony",
      tier: "advanced",
      description: "Character-based tree inference: minimising total mutations. Parsimony-informative sites, scoring trees, Fitch algorithm.",
      topics: [
        "Parsimony principle (Occam's razor)",
        "Scoring a tree: counting minimum mutations",
        "Fitch algorithm for parsimony score",
        "Enumerating tree topologies",
        "Why heuristics are needed (NP-hard)"
      ],
      prerequisites: ["parsimony-sites"],
      source: "Coursebook Ch11, 2025 Exam Q16",
      exam_questions: ["2025-exam-Q16"]
    },
    {
      id: "fitch-algorithm",
      label: "Fitch Algorithm",
      tier: "advanced",
      description: "Dynamic programming algorithm for computing the parsimony score of a given tree topology for a single site.",
      topics: [
        "Post-order traversal of the tree",
        "Intersection rule: if sets overlap, intersection + cost 0",
        "Union rule: if sets don't overlap, union + cost 1",
        "Parsimony score = number of union steps",
        "Pre-order traceback to assign ancestral states"
      ],
      prerequisites: ["parsimony"],
      source: "2025 Exam Q16",
      exam_questions: ["2025-exam-Q16"]
    },
    {
      id: "parsimony-search",
      label: "Parsimony: Tree Search Heuristics",
      tier: "applications",
      description: "Branch-and-bound and heuristic search strategies for finding the maximum parsimony tree.",
      topics: [
        "Number of unrooted topologies: (2n-5)!! for n taxa",
        "Branch and bound: prune search tree with lower bounds",
        "NNI: nearest-neighbour interchange",
        "SPR: subtree pruning and regrafting",
        "Why heuristics don't guarantee global optimum"
      ],
      prerequisites: ["fitch-algorithm"],
      source: "2025 Exam Q16d",
      exam_questions: ["2025-exam-Q16"]
    },
    {
      id: "evolutionary-models",
      label: "Statistical Models of Evolution",
      tier: "advanced",
      description: "Continuous-time Markov models of sequence evolution: rate matrices, substitution models (JC69, K80, GTR).",
      topics: [
        "Continuous-time Markov process for DNA",
        "Rate matrix Q (instantaneous rates)",
        "Transition probability matrix P(t) = e^{\u03bcQt}",
        "Jukes-Cantor model (JC69)",
        "Kimura 2-parameter model (K80)",
        "General time-reversible model (GTR)"
      ],
      prerequisites: ["stationary-distribution", "distance-methods"],
      source: "Coursebook Ch12, 2025 Exam Q17",
      exam_questions: ["2025-exam-Q17a"]
    },
    {
      id: "rate-matrix",
      label: "Rate Matrix Q & Transition Probabilities",
      tier: "advanced",
      description: "The instantaneous rate matrix Q and computing P(t) = exp(Qt). Calculating mutation probabilities over time.",
      topics: [
        "Off-diagonal entries Q_{ij}: rate of i\u2192j substitution",
        "Diagonal entries: Q_{ii} = -\u2211_{j\u2260i} Q_{ij}",
        "P(t) = e^{Qt} via matrix exponential",
        "For JC69: P(same|t) = 1/4 + 3/4 \u00b7 e^{-4\u03bct}",
        "Non-identifiability of rate \u00d7 time"
      ],
      prerequisites: ["evolutionary-models"],
      source: "2025 Exam Q17a,Q17b",
      exam_questions: ["2025-exam-Q17a", "2025-exam-Q17b"]
    },
    {
      id: "ml-trees",
      label: "Maximum Likelihood Trees",
      tier: "applications",
      description: "Likelihood-based phylogenetic inference: computing tree likelihood, why ML is preferred over parsimony, heuristic search.",
      topics: [
        "Likelihood of a tree given sequence data",
        "Felsenstein's pruning algorithm",
        "Relationship between rate and time (non-identifiability)",
        "Heuristic tree search (NNI, SPR, TBR)",
        "ML vs parsimony: advantages"
      ],
      prerequisites: ["evolutionary-models", "bayesian-inference", "parsimony"],
      source: "Coursebook Ch12, 2025 Exam Q17",
      exam_questions: ["2025-exam-Q17b", "2025-exam-Q17c"]
    },
    {
      id: "game-theory",
      label: "Evolutionary Game Theory",
      tier: "applications",
      description: "Hawk-Dove game, ESS, payoff matrices. Game-theoretic models in evolutionary biology.",
      topics: [
        "Payoff matrices",
        "Hawk-Dove game: resource V, cost C",
        "Expected payoffs for H vs H, H vs D, D vs D",
        "Evolutionarily Stable Strategy (ESS)",
        "Mixed strategy ESS: p = V/C"
      ],
      prerequisites: ["dynamical-systems"],
      source: "2024 Test Q4-Q5",
      exam_questions: ["2024-test-Q4", "2024-test-Q5"]
    },
    {
      id: "ess-analysis",
      label: "ESS Analysis",
      tier: "applications",
      description: "Determining which strategies are evolutionarily stable. Conditions for a strategy to be an ESS.",
      topics: [
        "ESS definition: a strategy resistant to invasion",
        "Condition: W(I, ESS) > W(J, ESS) for all J \u2260 I",
        "If W(H,H) > W(D,H): Hawk is ESS when V > C",
        "If V < C: neither pure strategy is ESS \u2192 mixed ESS",
        "Mixed ESS frequency: p* = V/C"
      ],
      prerequisites: ["game-theory"],
      source: "2024 Test Q5",
      exam_questions: ["2024-test-Q5"]
    }
  ],

  edges: [
    // \u2500\u2500 Dynamical systems cluster \u2500\u2500
    { from: "complex-systems", to: "dynamical-systems" },
    { from: "dynamical-systems", to: "fixed-points" },
    { from: "fixed-points", to: "cobweb-diagrams" },
    { from: "fixed-points", to: "newtons-method" },
    { from: "newtons-method", to: "nm-derivation" },
    { from: "nm-derivation", to: "nm-convergence" },
    { from: "cobweb-diagrams", to: "nm-convergence" },
    { from: "nm-convergence", to: "nm-failures" },
    // \u2500\u2500 ODE cluster \u2500\u2500
    { from: "dynamical-systems", to: "ode-basics" },
    { from: "ode-basics", to: "euler-method" },
    { from: "euler-method", to: "euler-error" },
    { from: "euler-error", to: "rk4" },
    { from: "rk4", to: "rk4-slopes" },
    { from: "rk4-slopes", to: "systems-of-odes" },
    // \u2500\u2500 Sequence alignment cluster \u2500\u2500
    { from: "complex-systems", to: "genetics-intro" },
    { from: "genetics-intro", to: "pairwise-alignment" },
    { from: "pairwise-alignment", to: "dp-principle" },
    { from: "dp-principle", to: "needleman-wunsch" },
    { from: "needleman-wunsch", to: "nw-recurrence" },
    { from: "nw-recurrence", to: "nw-traceback" },
    { from: "nw-traceback", to: "smith-waterman" },
    { from: "nw-traceback", to: "affine-gaps" },
    { from: "affine-gaps", to: "affine-recurrences" },
    { from: "needleman-wunsch", to: "multiple-sequence-alignment" },
    { from: "multiple-sequence-alignment", to: "progressive-alignment" },
    { from: "upgma", to: "progressive-alignment" },
    // \u2500\u2500 Probability / simulation cluster \u2500\u2500
    { from: "probability-primer", to: "exponential-distribution" },
    { from: "exponential-distribution", to: "inversion-sampling" },
    { from: "probability-primer", to: "bayesian-inference" },
    { from: "probability-primer", to: "simulation-basics" },
    { from: "probability-primer", to: "markov-property" },
    { from: "inversion-sampling", to: "poisson-process" },
    { from: "simulation-basics", to: "poisson-process" },
    { from: "poisson-process", to: "poisson-simulation" },
    { from: "inversion-sampling", to: "poisson-simulation" },
    { from: "simulation-basics", to: "random-walk" },
    // \u2500\u2500 Markov / HMM cluster \u2500\u2500
    { from: "markov-property", to: "markov-chains" },
    { from: "markov-chains", to: "stationary-distribution" },
    { from: "stationary-distribution", to: "hmm-definition" },
    { from: "hmm-definition", to: "hmm-three-problems" },
    { from: "hmm-three-problems", to: "viterbi" },
    { from: "viterbi", to: "viterbi-recurrence" },
    { from: "viterbi-recurrence", to: "forward-algorithm" },
    { from: "forward-algorithm", to: "forward-termination" },
    { from: "forward-termination", to: "backward-baum-welch" },
    { from: "bayesian-inference", to: "backward-baum-welch" },
    { from: "viterbi", to: "hmm-applications" },
    { from: "forward-algorithm", to: "hmm-applications" },
    // \u2500\u2500 Phylogenetics cluster \u2500\u2500
    { from: "genetics-intro", to: "distance-methods" },
    { from: "distance-methods", to: "upgma-algorithm" },
    { from: "upgma-algorithm", to: "upgma" },
    { from: "upgma", to: "neighbour-joining" },
    { from: "distance-methods", to: "parsimony-sites" },
    { from: "multiple-sequence-alignment", to: "parsimony-sites" },
    { from: "parsimony-sites", to: "parsimony" },
    { from: "parsimony", to: "fitch-algorithm" },
    { from: "fitch-algorithm", to: "parsimony-search" },
    { from: "stationary-distribution", to: "evolutionary-models" },
    { from: "distance-methods", to: "evolutionary-models" },
    { from: "evolutionary-models", to: "rate-matrix" },
    { from: "rate-matrix", to: "ml-trees" },
    { from: "bayesian-inference", to: "ml-trees" },
    { from: "parsimony", to: "ml-trees" },
    // \u2500\u2500 Game theory \u2500\u2500
    { from: "dynamical-systems", to: "game-theory" },
    { from: "game-theory", to: "ess-analysis" },
  ],

  exam_map: {
    "2024-test": {
      label: "2024 Mid-Semester Test (40 marks)",
      questions: [
        { id: "2024-test-Q1", label: "Q1: Newton's method cobweb", marks: 5, nodes: ["newtons-method", "dynamical-systems", "cobweb-diagrams"] },
        { id: "2024-test-Q2", label: "Q2: Newton's method derivation & fixed points", marks: 7, nodes: ["newtons-method", "nm-derivation", "fixed-points"] },
        { id: "2024-test-Q3", label: "Q3: Euler & RK4 for ODE", marks: 9, nodes: ["euler-method", "rk4", "rk4-slopes"] },
        { id: "2024-test-Q4", label: "Q4: Hawk-Dove game theory", marks: 5, nodes: ["game-theory"] },
        { id: "2024-test-Q5", label: "Q5: ESS and payoff analysis", marks: 6, nodes: ["game-theory", "ess-analysis"] },
        { id: "2024-test-Q6", label: "Q6: Needleman-Wunsch alignment", marks: 4, nodes: ["needleman-wunsch", "nw-recurrence"] },
        { id: "2024-test-Q7", label: "Q7: Alignment scoring & traceback", marks: 4, nodes: ["nw-traceback", "pairwise-alignment"] }
      ]
    },
    "2025-exam": {
      label: "2025 Final Exam (120 marks)",
      sections: [
        {
          id: "section-A",
          label: "Section A: Numerical Integration",
          marks: 30,
          questions: [
            { id: "2025-exam-Q1", label: "Q1: Newton's method iteration", marks: 5, nodes: ["newtons-method"] },
            { id: "2025-exam-Q2", label: "Q2: Newton's method convergence & cobweb", marks: 7, nodes: ["nm-convergence", "cobweb-diagrams"] },
            { id: "2025-exam-Q3", label: "Q3: RK4 single-step computation", marks: 10, nodes: ["rk4", "rk4-slopes"] },
            { id: "2025-exam-Q4", label: "Q4: RK4 for system of ODEs", marks: 8, nodes: ["rk4-slopes", "systems-of-odes"] }
          ]
        },
        {
          id: "section-B",
          label: "Section B: Sequence Alignment",
          marks: 18,
          questions: [
            { id: "2025-exam-Q5", label: "Q5: Global alignment DP matrix", marks: 5, nodes: ["needleman-wunsch", "nw-recurrence"] },
            { id: "2025-exam-Q6", label: "Q6: Traceback & scoring analysis", marks: 4, nodes: ["nw-traceback"] },
            { id: "2025-exam-Q7", label: "Q7: Affine gap penalties", marks: 4, nodes: ["affine-gaps", "affine-recurrences"] },
            { id: "2025-exam-Q8", label: "Q8: Feng-Doolittle progressive alignment", marks: 5, nodes: ["progressive-alignment", "multiple-sequence-alignment"] }
          ]
        },
        {
          id: "section-C",
          label: "Section C: Simulation and HMMs",
          marks: 39,
          questions: [
            { id: "2025-exam-Q9", label: "Q9: Exponential dist CDF & inversion sampling", marks: 8, nodes: ["exponential-distribution", "inversion-sampling"] },
            { id: "2025-exam-Q10", label: "Q10: Poisson process simulation", marks: 9, nodes: ["poisson-process", "poisson-simulation"] },
            { id: "2025-exam-Q11", label: "Q11: Viterbi algorithm", marks: 12, nodes: ["viterbi", "viterbi-recurrence"] },
            { id: "2025-exam-Q12", label: "Q12: Forward algorithm & probability", marks: 10, nodes: ["forward-algorithm", "forward-termination"] }
          ]
        },
        {
          id: "section-D",
          label: "Section D: Trees (Phylogenetics)",
          marks: 33,
          questions: [
            { id: "2025-exam-Q13", label: "Q13: UPGMA tree construction from distance matrix", marks: 5, nodes: ["upgma", "upgma-algorithm"] },
            { id: "2025-exam-Q14", label: "Q14: Non-ultrametric tree & UPGMA topology", marks: 2, nodes: ["upgma", "distance-methods"] },
            { id: "2025-exam-Q15", label: "Q15: NJ vs UPGMA comparison", marks: 2, nodes: ["neighbour-joining", "upgma"] },
            { id: "2025-exam-Q16", label: "Q16: Parsimony (informative sites, scoring, heuristics)", marks: 16, nodes: ["parsimony", "parsimony-sites", "fitch-algorithm", "parsimony-search"] },
            { id: "2025-exam-Q17a", label: "Q17a: Mutation probability from rate matrix", marks: 3, nodes: ["evolutionary-models", "rate-matrix"] },
            { id: "2025-exam-Q17b", label: "Q17b: Rate-time non-identifiability", marks: 2, nodes: ["rate-matrix", "ml-trees"] },
            { id: "2025-exam-Q17c", label: "Q17c: ML tree heuristic search", marks: 3, nodes: ["ml-trees"] }
          ]
        }
      ]
    }
  },

  stats: {
    total_nodes: 57,
    total_edges: 72,
    foundation_nodes: 9,
    core_nodes: 22,
    advanced_nodes: 16,
    application_nodes: 8,
    exam_questions_mapped: 24
  }
};

// \u2500\u2500 Helper lookups \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
export const nodeMap = new Map(treeData.nodes.map(n => [n.id, n]));
export const tierMap = new Map(treeData.tiers.map(t => [t.id, t]));

// Get all exam questions related to a node
export function getExamQuestionsForNode(nodeId: string): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  for (const exam of Object.values(treeData.exam_map)) {
    if (exam.questions) {
      for (const q of exam.questions) {
        if (q.nodes.includes(nodeId)) questions.push(q);
      }
    }
    if (exam.sections) {
      for (const section of exam.sections) {
        for (const q of section.questions) {
          if (q.nodes.includes(nodeId)) questions.push(q);
        }
      }
    }
  }
  return questions;
}

// Get children (nodes that list this as a prerequisite)
export function getChildren(nodeId: string): string[] {
  return treeData.nodes
    .filter(n => n.prerequisites.includes(nodeId))
    .map(n => n.id);
}
