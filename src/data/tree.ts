import type { TreeData, ExamQuestion } from '../types';

export const treeData: TreeData = {
  course: "COMPSCI 369",
  title: "Computational Science",
  version: "1.0",
  description: "Knowledge tree for COMPSCI 369 — covers numerical methods, sequence alignment, stochastic processes, HMMs, and phylogenetics.",
  tiers: [
    { id: "foundations", label: "Foundations", order: 0, color: "#6366f1" },
    { id: "core", label: "Core Methods", order: 1, color: "#8b5cf6" },
    { id: "advanced", label: "Advanced Topics", order: 2, color: "#a855f7" },
    { id: "applications", label: "Applications & Synthesis", order: 3, color: "#c084fc" }
  ],
  nodes: [
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
      id: "newtons-method",
      label: "Newton's Method",
      tier: "foundations",
      description: "Root finding via Newton-Raphson iteration. Derivation, convergence, cobweb analysis, failure modes.",
      topics: [
        "Newton-Raphson formula: x_{n+1} = x_n - f(x_n)/f'(x_n)",
        "Geometric interpretation",
        "Convergence analysis",
        "Cobweb diagrams for Newton's method",
        "When Newton's method fails"
      ],
      prerequisites: ["dynamical-systems"],
      source: "2024 Test Q1-Q2, 2025 Exam Q1-Q2",
      exam_questions: ["2024-test-Q1", "2024-test-Q2", "2025-exam-Q1", "2025-exam-Q2"]
    },
    {
      id: "euler-method",
      label: "Euler's Method",
      tier: "foundations",
      description: "Numerical solution of ODEs using Euler's forward method. Step size, local and global error, limitations.",
      topics: [
        "ODE initial value problems",
        "Euler's forward method derivation",
        "Step size and accuracy tradeoff",
        "Local truncation error O(h²)",
        "Global error O(h)",
        "Limitations of Euler's method"
      ],
      prerequisites: ["dynamical-systems"],
      source: "2024 Test Q3",
      exam_questions: ["2024-test-Q3"]
    },
    {
      id: "rk4",
      label: "Runge-Kutta (RK4) Method",
      tier: "core",
      description: "Fourth-order Runge-Kutta method for ODEs. The four slopes (k1-k4), weighting, accuracy comparison with Euler.",
      topics: [
        "Motivation: improving on Euler",
        "RK4 formula and the four slopes k1-k4",
        "Weighted average interpretation",
        "Step-by-step computation",
        "Global error O(h⁴)",
        "Comparison with Euler method"
      ],
      prerequisites: ["euler-method"],
      source: "2024 Test Q3, 2025 Exam Q3-Q4",
      exam_questions: ["2024-test-Q3", "2025-exam-Q3", "2025-exam-Q4"]
    },
    {
      id: "systems-of-odes",
      label: "Systems of ODEs",
      tier: "core",
      description: "Extending numerical methods to systems of coupled ODEs (e.g., predator-prey). Vector notation, applying RK4 to systems.",
      topics: [
        "Coupled ODE systems",
        "Vector form of ODE systems",
        "Applying RK4 to systems",
        "Lotka-Volterra (predator-prey) example",
        "Phase portraits"
      ],
      prerequisites: ["rk4"],
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
        "Mutations: substitution, insertion, deletion",
        "Why sequence comparison matters"
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
      id: "needleman-wunsch",
      label: "Needleman-Wunsch (Global Alignment)",
      tier: "core",
      description: "Dynamic programming algorithm for global sequence alignment. Recurrence relation, fill and traceback, optimal alignment.",
      topics: [
        "Dynamic programming principle",
        "Recurrence relation: F(i,j) = max of three cases",
        "Initialization (first row and column)",
        "Matrix fill (forward pass)",
        "Traceback (finding optimal alignment)",
        "Time and space complexity O(nm)"
      ],
      prerequisites: ["pairwise-alignment"],
      source: "Coursebook Ch2, 2024 Test Q6, 2025 Exam Q5-Q6",
      exam_questions: ["2024-test-Q6", "2025-exam-Q5", "2025-exam-Q6"]
    },
    {
      id: "smith-waterman",
      label: "Smith-Waterman (Local Alignment)",
      tier: "core",
      description: "Local alignment variant of Needleman-Wunsch. Modifications to recurrence and traceback for finding best local match.",
      topics: [
        "Motivation: finding conserved regions",
        "Modified recurrence (floor at 0)",
        "Modified traceback (start at max, stop at 0)",
        "Comparison with global alignment",
        "Biological applications (domain finding)"
      ],
      prerequisites: ["needleman-wunsch"],
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
        "Biological motivation (insertions tend to be contiguous)"
      ],
      prerequisites: ["needleman-wunsch"],
      source: "Coursebook Ch2, 2025 Exam Q7",
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
      description: "The exponential distribution — memoryless property, CDF, PDF, connection to Poisson process. Key for simulation.",
      topics: [
        "PDF and CDF of Exp(λ)",
        "Mean = 1/λ, Variance = 1/λ²",
        "Memoryless property",
        "Connection to waiting times",
        "Inversion sampling for exponential"
      ],
      prerequisites: ["probability-primer"],
      source: "Coursebook Ch5, 2025 Exam Q9",
      exam_questions: ["2025-exam-Q9"]
    },
    {
      id: "bayesian-inference",
      label: "Bayesian & Maximum Likelihood Inference",
      tier: "core",
      description: "Statistical inference foundations: likelihood functions, maximum likelihood estimation, Bayesian inference with priors and posteriors.",
      topics: [
        "Likelihood function L(θ|data)",
        "Maximum likelihood estimation (MLE)",
        "Log-likelihood",
        "Prior, likelihood, posterior (Bayes' theorem)",
        "Conjugate priors",
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
        "Pseudorandom number generators (LCG)",
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
        "Definition: events at constant rate λ",
        "Inter-arrival times are Exp(λ)",
        "Number of events in [0,t] is Poisson(λt)",
        "Simulating a Poisson process",
        "Superposition and thinning"
      ],
      prerequisites: ["exponential-distribution", "simulation-basics"],
      source: "Coursebook Ch7, 2025 Exam Q10",
      exam_questions: ["2025-exam-Q10"]
    },
    {
      id: "random-walk",
      label: "Random Walks",
      tier: "core",
      description: "Simple random walks on integers and in higher dimensions. Properties, simulation, connection to diffusion.",
      topics: [
        "Simple random walk on Z",
        "Expected position and variance",
        "Return to origin",
        "Random walks in higher dimensions",
        "Connection to Brownian motion / diffusion"
      ],
      prerequisites: ["simulation-basics"],
      source: "Coursebook Ch7"
    },
    {
      id: "markov-chains",
      label: "Markov Chains",
      tier: "core",
      description: "Discrete-time Markov chains: transition matrices, Chapman-Kolmogorov, stationary distributions, ergodicity.",
      topics: [
        "Markov property (memoryless)",
        "Transition probability matrix P",
        "n-step transitions: P^n",
        "Chapman-Kolmogorov equation",
        "Stationary (equilibrium) distribution π",
        "Finding π: solve πP = π",
        "Irreducibility and ergodicity",
        "Absorbing states"
      ],
      prerequisites: ["probability-primer"],
      source: "Coursebook Ch8"
    },
    {
      id: "hmm-definition",
      label: "Hidden Markov Models (Definition)",
      tier: "core",
      description: "HMM structure: hidden states, emissions, transition and emission probabilities. The three fundamental HMM problems.",
      topics: [
        "Hidden states vs observed emissions",
        "Transition probabilities a_ij",
        "Emission probabilities e_k(b)",
        "Initial state distribution π",
        "Three HMM problems: evaluation, decoding, learning",
        "HMM notation and diagrams"
      ],
      prerequisites: ["markov-chains"],
      source: "Coursebook Ch9"
    },
    {
      id: "viterbi",
      label: "Viterbi Algorithm (Decoding)",
      tier: "advanced",
      description: "Finding the most likely hidden state sequence given observations. Dynamic programming in log-space.",
      topics: [
        "The decoding problem: argmax P(path|observations)",
        "Viterbi recurrence: v_k(i) = e_k(x_i) * max_l(a_lk * v_l(i-1))",
        "Log-space computation",
        "Traceback for optimal path",
        "Time complexity O(K²n)",
        "Worked examples"
      ],
      prerequisites: ["hmm-definition"],
      source: "Coursebook Ch9, 2025 Exam Q11",
      exam_questions: ["2025-exam-Q11"]
    },
    {
      id: "forward-algorithm",
      label: "Forward Algorithm (Evaluation)",
      tier: "advanced",
      description: "Computing the total probability of an observed sequence under an HMM. Forward variables and their recurrence.",
      topics: [
        "The evaluation problem: P(observations|model)",
        "Forward variable f_k(i) = P(x_1...x_i, π_i=k)",
        "Forward recurrence: f_k(i) = e_k(x_i) * Σ_l(a_lk * f_l(i-1))",
        "Initialization and termination",
        "Summing over all paths (vs Viterbi max)",
        "Connection to Viterbi (sum vs max)"
      ],
      prerequisites: ["viterbi"],
      source: "Coursebook Ch9, 2025 Exam Q12",
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
      prerequisites: ["forward-algorithm", "bayesian-inference"],
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
      id: "upgma",
      label: "UPGMA Algorithm",
      tier: "core",
      description: "Unweighted Pair Group Method with Arithmetic mean. Hierarchical clustering for phylogenetic tree construction.",
      topics: [
        "UPGMA algorithm steps",
        "Average linkage criterion",
        "Ultrametric tree property",
        "Worked example: building a UPGMA tree",
        "Limitations: assumes molecular clock"
      ],
      prerequisites: ["distance-methods"],
      source: "Coursebook Ch11, 2024 Test Q8, 2025 Exam Q13",
      exam_questions: ["2024-test-Q8", "2025-exam-Q13"]
    },
    {
      id: "neighbour-joining",
      label: "Neighbour-Joining Algorithm",
      tier: "advanced",
      description: "Distance-based tree construction without assuming molecular clock. Q-matrix, star decomposition.",
      topics: [
        "Motivation: relaxing molecular clock assumption",
        "Q-matrix (corrected distances)",
        "Q(i,j) = (n-2)d(i,j) - Σd(i) - Σd(j)",
        "Finding and joining the minimum Q pair",
        "Updating distances after joining",
        "Unrooted tree output"
      ],
      prerequisites: ["upgma"],
      source: "Coursebook Ch11, 2025 Exam Q14",
      exam_questions: ["2025-exam-Q14"]
    },
    {
      id: "substitution-models",
      label: "Nucleotide Substitution Models",
      tier: "advanced",
      description: "Probabilistic models of DNA evolution: Jukes-Cantor, Kimura, GTR. Rate matrices and distance correction.",
      topics: [
        "Jukes-Cantor model",
        "Kimura 2-parameter model",
        "General time-reversible (GTR) model",
        "Rate matrix Q and transition probabilities P(t)",
        "Distance correction (corrected distances)",
        "Transition vs transversion"
      ],
      prerequisites: ["distance-methods", "markov-chains"],
      source: "Coursebook Ch11"
    },
    {
      id: "maximum-parsimony",
      label: "Maximum Parsimony",
      tier: "advanced",
      description: "Finding the tree topology requiring the fewest evolutionary changes. Fitch algorithm for parsimony score.",
      topics: [
        "Parsimony principle (Occam's razor for phylogenetics)",
        "Parsimony score = number of mutations required",
        "Fitch algorithm: downpass and uppass",
        "Informative vs uninformative sites",
        "NP-hard: heuristic search required",
        "Comparison with distance methods"
      ],
      prerequisites: ["distance-methods"],
      source: "Coursebook Ch12"
    },
    {
      id: "phylogenetics-synthesis",
      label: "Phylogenetics Synthesis & Applications",
      tier: "applications",
      description: "Bayesian phylogenetics, bootstrap support, interpreting trees, practical applications in evolutionary biology.",
      topics: [
        "Bayesian phylogenetics overview",
        "Bootstrap support values",
        "Reading and interpreting phylogenetic trees",
        "Applications: ancestral reconstruction, SARS-CoV-2 evolution",
        "Comparison of methods: distance vs parsimony vs Bayesian"
      ],
      prerequisites: ["upgma", "neighbour-joining", "maximum-parsimony"],
      source: "Coursebook Ch12"
    }
  ],
  edges: [
    { source: "complex-systems", target: "dynamical-systems" },
    { source: "complex-systems", target: "genetics-intro" },
    { source: "dynamical-systems", target: "newtons-method" },
    { source: "dynamical-systems", target: "euler-method" },
    { source: "euler-method", target: "rk4" },
    { source: "rk4", target: "systems-of-odes" },
    { source: "genetics-intro", target: "pairwise-alignment" },
    { source: "genetics-intro", target: "distance-methods" },
    { source: "pairwise-alignment", target: "needleman-wunsch" },
    { source: "needleman-wunsch", target: "smith-waterman" },
    { source: "needleman-wunsch", target: "affine-gaps" },
    { source: "needleman-wunsch", target: "multiple-sequence-alignment" },
    { source: "multiple-sequence-alignment", target: "progressive-alignment" },
    { source: "probability-primer", target: "exponential-distribution" },
    { source: "probability-primer", target: "bayesian-inference" },
    { source: "probability-primer", target: "simulation-basics" },
    { source: "probability-primer", target: "markov-chains" },
    { source: "exponential-distribution", target: "poisson-process" },
    { source: "simulation-basics", target: "poisson-process" },
    { source: "simulation-basics", target: "random-walk" },
    { source: "markov-chains", target: "hmm-definition" },
    { source: "hmm-definition", target: "viterbi" },
    { source: "viterbi", target: "forward-algorithm" },
    { source: "forward-algorithm", target: "backward-baum-welch" },
    { source: "bayesian-inference", target: "backward-baum-welch" },
    { source: "viterbi", target: "hmm-applications" },
    { source: "forward-algorithm", target: "hmm-applications" },
    { source: "distance-methods", target: "upgma" },
    { source: "upgma", target: "neighbour-joining" },
    { source: "upgma", target: "progressive-alignment" },
    { source: "distance-methods", target: "substitution-models" },
    { source: "markov-chains", target: "substitution-models" },
    { source: "distance-methods", target: "maximum-parsimony" },
    { source: "upgma", target: "phylogenetics-synthesis" },
    { source: "neighbour-joining", target: "phylogenetics-synthesis" },
    { source: "maximum-parsimony", target: "phylogenetics-synthesis" }
  ]
};

export const examQuestions: ExamQuestion[] = [
  { id: "2024-test-Q1", label: "2024 Test Q1", description: "Newton's method and dynamical systems" },
  { id: "2024-test-Q2", label: "2024 Test Q2", description: "Newton's method cobweb diagram" },
  { id: "2024-test-Q3", label: "2024 Test Q3", description: "Euler and RK4 numerical methods" },
  { id: "2024-test-Q6", label: "2024 Test Q6", description: "Needleman-Wunsch global alignment" },
  { id: "2024-test-Q8", label: "2024 Test Q8", description: "UPGMA tree construction" },
  { id: "2025-exam-Q1", label: "2025 Exam Q1", description: "Newton's method application" },
  { id: "2025-exam-Q2", label: "2025 Exam Q2", description: "Newton's method convergence" },
  { id: "2025-exam-Q3", label: "2025 Exam Q3", description: "RK4 method" },
  { id: "2025-exam-Q4", label: "2025 Exam Q4", description: "RK4 for systems of ODEs" },
  { id: "2025-exam-Q5", label: "2025 Exam Q5", description: "Needleman-Wunsch alignment" },
  { id: "2025-exam-Q6", label: "2025 Exam Q6", description: "Needleman-Wunsch traceback" },
  { id: "2025-exam-Q7", label: "2025 Exam Q7", description: "Affine gap penalties" },
  { id: "2025-exam-Q8", label: "2025 Exam Q8", description: "Progressive alignment" },
  { id: "2025-exam-Q9", label: "2025 Exam Q9", description: "Exponential distribution" },
  { id: "2025-exam-Q10", label: "2025 Exam Q10", description: "Poisson process" },
  { id: "2025-exam-Q11", label: "2025 Exam Q11", description: "Viterbi algorithm" },
  { id: "2025-exam-Q12", label: "2025 Exam Q12", description: "Forward algorithm" },
  { id: "2025-exam-Q13", label: "2025 Exam Q13", description: "UPGMA algorithm" },
  { id: "2025-exam-Q14", label: "2025 Exam Q14", description: "Neighbour-joining algorithm" }
];
