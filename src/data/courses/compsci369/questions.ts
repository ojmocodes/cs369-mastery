import { Question } from '../../../types';

export const questions: Question[] = [
  // ── PROBABILITY FOUNDATIONS ──────────────────────────────────────
  {
    id: 'q_prob_1',
    topic: 'prob_foundations',
    question: 'If P(A) = 0.4 and P(B) = 0.3 and A, B are independent, what is P(A ∩ B)?',
    options: ['0.7', '0.12', '0.1', '0.34'],
    answer: 1,
    explanation: 'For independent events: P(A ∩ B) = P(A) × P(B) = 0.4 × 0.3 = 0.12.',
  },
  {
    id: 'q_prob_2',
    topic: 'prob_foundations',
    question: 'Bayes theorem states P(A|B) equals:',
    options: ['P(B|A)·P(B) / P(A)', 'P(A)·P(B)', 'P(B|A)·P(A) / P(B)', 'P(A|B)·P(B)'],
    answer: 2,
    explanation: "Bayes' theorem: P(A|B) = P(B|A)·P(A) / P(B). The numerator is the joint probability P(A∩B) rewritten; P(B) normalises.",
  },
  {
    id: 'q_prob_3',
    topic: 'prob_foundations',
    question: 'The law of total probability states P(B) =',
    options: [
      'P(B|A) + P(B|Aᶜ)',
      'P(B|A)·P(A) + P(B|Aᶜ)·P(Aᶜ)',
      'P(A)·P(B)',
      'P(A|B)·P(B)',
    ],
    answer: 1,
    explanation: 'P(B) = Σᵢ P(B|Aᵢ)·P(Aᵢ) for any partition {Aᵢ} of the sample space.',
  },

  // ── SCORING MATRICES ─────────────────────────────────────────────
  {
    id: 'q_score_1',
    topic: 'scoring_matrices',
    question: 'BLOSUM62 was derived from protein alignments with what identity threshold?',
    options: ['45%', '62%', '80%', '30%'],
    answer: 1,
    explanation: 'BLOSUM62 uses blocks of aligned sequences with ≥62% identity. Higher BLOSUM numbers = closer sequences.',
  },
  {
    id: 'q_score_2',
    topic: 'scoring_matrices',
    question: 'A log-odds score s(a,b) in a substitution matrix is defined as:',
    options: [
      'log[ p(a)·p(b) / q(a,b) ]',
      'log[ q(a,b) / (p(a)·p(b)) ]',
      'q(a,b) - p(a)·p(b)',
      'p(a,b) × p(b,a)',
    ],
    answer: 1,
    explanation: 'Log-odds = log[ observed(a,b) / expected(a,b) ] = log[ q(a,b) / (p(a)·p(b)) ]. Positive means more common than random.',
  },

  // ── GLOBAL ALIGNMENT ─────────────────────────────────────────────
  {
    id: 'q_global_1',
    topic: 'global_alignment',
    question: 'The Needleman–Wunsch algorithm optimises:',
    options: [
      'A local sub-sequence alignment',
      'A full end-to-end alignment of both sequences',
      'Only the diagonal of the DP matrix',
      'Alignment with no gaps allowed',
    ],
    answer: 1,
    explanation: 'NW finds the globally optimal alignment spanning both sequences entirely, allowing gaps anywhere including ends.',
  },
  {
    id: 'q_global_2',
    topic: 'global_alignment',
    question: 'The Needleman–Wunsch recurrence for F(i,j) uses:',
    options: [
      'max of three: diagonal + score, left − gap, up − gap',
      'max of two: diagonal + score, left − gap',
      'min of three: diagonal, left, up',
      'max(0, diagonal + score, left − gap, up − gap)',
    ],
    answer: 0,
    explanation: 'F(i,j) = max{ F(i−1,j−1)+s(xᵢ,yⱼ), F(i−1,j)−d, F(i,j−1)−d }. Three choices: match/mismatch, delete, insert.',
  },

  // ── LOCAL ALIGNMENT ──────────────────────────────────────────────
  {
    id: 'q_local_1',
    topic: 'local_alignment',
    question: 'How does Smith–Waterman differ from Needleman–Wunsch?',
    options: [
      'SW uses a different scoring matrix',
      'SW adds a 0 floor to the recurrence and traces back from the maximum cell',
      'SW requires no gap penalty',
      'SW only works for DNA, not protein',
    ],
    answer: 1,
    explanation: 'SW adds max(..., 0) so sub-alignments can restart, and traceback starts from the highest-scoring cell rather than bottom-right.',
  },

  // ── AFFINE GAPS ──────────────────────────────────────────────────
  {
    id: 'q_affine_1',
    topic: 'affine_gaps',
    question: 'In affine gap penalties, the cost of a gap of length k is:',
    options: ['k × d', 'd + (k−1)×e', 'k × e', 'd × e × k'],
    answer: 1,
    explanation: 'Affine: gap_open (d) + gap_extend × (k−1) times (e). Opening is expensive; extensions are cheaper, reflecting biology.',
  },

  // ── DATABASE SEARCH / BLAST ───────────────────────────────────────
  {
    id: 'q_blast_1',
    topic: 'db_search',
    question: 'The BLAST E-value represents:',
    options: [
      'The probability the alignment is correct',
      'The expected number of alignments with that score or better by chance in the database',
      'The bit score normalised to database size',
      'The fraction of identical residues in the hit',
    ],
    answer: 1,
    explanation: 'E-value = expected # of hits with score ≥ S by chance. E = K·m·n·e^{−λS}. Lower E-value = more significant.',
  },
  {
    id: 'q_blast_2',
    topic: 'db_search',
    question: 'BLAST uses a word-based seeding approach. What is a "word" in protein BLAST (blastp)?',
    options: ['A single amino acid', 'A 3-residue k-mer with score above threshold T', 'An exact 11-nucleotide match', 'A gap-free segment pair'],
    answer: 1,
    explanation: 'Blastp finds 3-mer words in the query, then generates neighbourhood words scoring ≥ threshold T with BLOSUM62, for sensitive seeding.',
  },

  // ── MARKOV CHAINS ────────────────────────────────────────────────
  {
    id: 'q_markov_1',
    topic: 'markov_chains',
    question: 'A Markov chain has the property that future states depend:',
    options: [
      'On the entire history of states',
      'Only on the current state (memoryless)',
      'On the previous two states',
      'On external inputs only',
    ],
    answer: 1,
    explanation: 'The Markov property: P(Xₙ₊₁|X₀,...,Xₙ) = P(Xₙ₊₁|Xₙ). The chain is memoryless — only the present state matters.',
  },
  {
    id: 'q_markov_2',
    topic: 'markov_chains',
    question: 'A stationary distribution π of a Markov chain satisfies:',
    options: ['πP = 0', 'πP = π', 'Pπ = λπ for λ > 1', 'π = P⁻¹'],
    answer: 1,
    explanation: 'π is stationary when πP = π (row vector × transition matrix = same row vector). π represents long-run occupancy.',
  },

  // ── HMM BASICS ───────────────────────────────────────────────────
  {
    id: 'q_hmm_1',
    topic: 'hmm_basics',
    question: 'In the Viterbi algorithm for HMMs, what does the DP table store?',
    options: [
      'The total probability of all paths to each state',
      'The probability of the most likely path to each state at each time step',
      'The emission probabilities only',
      'The posterior probability of each state',
    ],
    answer: 1,
    explanation: 'Viterbi stores δₜ(i) = max probability of the best path ending in state i at time t. Traceback recovers the Viterbi path.',
  },
  {
    id: 'q_hmm_2',
    topic: 'hmm_basics',
    question: 'The Forward algorithm for HMMs computes:',
    options: [
      'The most likely hidden state sequence',
      'P(observations | model) by summing over all hidden paths',
      'The Viterbi path probability only',
      'The gradient of the log-likelihood',
    ],
    answer: 1,
    explanation: 'Forward computes αₜ(i) = P(o₁,...,oₜ, qₜ=i | λ). Summing over terminal states gives P(O|λ) — essential for Baum–Welch.',
  },

  // ── HMM TRAINING ─────────────────────────────────────────────────
  {
    id: 'q_hmm_train_1',
    topic: 'hmm_training',
    question: 'Baum–Welch is an instance of which general algorithm?',
    options: ['Newton–Raphson', 'Expectation–Maximisation (EM)', 'Simulated annealing', 'Gradient descent'],
    answer: 1,
    explanation: 'Baum–Welch = EM for HMMs. E-step: compute expected transition/emission counts using Forward–Backward. M-step: re-estimate parameters.',
  },

  // ── JUKES–CANTOR ─────────────────────────────────────────────────
  {
    id: 'q_jc_1',
    topic: 'jukes_cantor',
    question: 'Under the Jukes–Cantor model, the corrected distance d from observed proportion p of differences is:',
    options: [
      'd = −(3/4) ln(1 − 4p/3)',
      'd = −ln(1 − p)',
      'd = p / (1 − p)',
      'd = −(4/3) ln(1 − 3p/4)',
    ],
    answer: 0,
    explanation: 'd_JC = −(3/4) ln(1 − 4p/3). This corrects for multiple hits. As p → 3/4, d → ∞ (saturation).',
  },
  {
    id: 'q_jc_2',
    topic: 'jukes_cantor',
    question: 'The Jukes–Cantor model assumes:',
    options: [
      'Different rates for transitions and transversions',
      'All nucleotides equally frequent and all substitution rates equal',
      'Rate variation among sites following a Gamma distribution',
      'Context-dependent substitution rates',
    ],
    answer: 1,
    explanation: 'JC69 assumes equal base frequencies (0.25 each) and a single rate parameter α for all substitution types — the simplest model.',
  },

  // ── KIMURA 2P ────────────────────────────────────────────────────
  {
    id: 'q_k2p_1',
    topic: 'kimura',
    question: 'The Kimura 2-parameter model distinguishes:',
    options: [
      'Synonymous vs non-synonymous substitutions',
      'Transitions (purines↔purines or pyrimidines↔pyrimidines) vs transversions',
      'CpG vs non-CpG sites',
      'Codon position 1, 2, 3',
    ],
    answer: 1,
    explanation: 'K80 has rate α for transitions (A↔G, C↔T) and rate β for transversions (A↔C, A↔T, G↔C, G↔T). Captures ti/tv bias.',
  },

  // ── GTR ──────────────────────────────────────────────────────────
  {
    id: 'q_gtr_1',
    topic: 'gtr_model',
    question: 'GTR stands for General Time-Reversible. How many free rate parameters does it have?',
    options: ['4', '6', '12', '16'],
    answer: 1,
    explanation: 'GTR has 6 rate parameters (rAC, rAG, rAT, rCG, rCT, rGT) plus 4 base frequencies (3 free), giving a very general CTMC.',
  },

  // ── TREE CONCEPTS ────────────────────────────────────────────────
  {
    id: 'q_tree_1',
    topic: 'tree_concepts',
    question: 'For n taxa, how many unrooted bifurcating tree topologies are there?',
    options: [
      '(2n−3)!! = 1·3·5···(2n−3)',
      'n!',
      '2^n',
      '(n−1)!',
    ],
    answer: 0,
    explanation: 'Unrooted bifurcating: (2n−5)!! for n≥3, grown by adding each taxon to existing branches. For n=4: 3, n=5: 15, etc.',
  },
  {
    id: 'q_tree_2',
    topic: 'tree_concepts',
    question: 'A node in a phylogeny that contains all descendants of a common ancestor is called a:',
    options: ['Paraphyletic group', 'Polyphyletic group', 'Clade (monophyletic group)', 'Grade'],
    answer: 2,
    explanation: 'A clade = monophyletic group: an ancestor + all its descendants. Paraphyletic excludes some; polyphyletic lacks common ancestor.',
  },

  // ── DISTANCE METHODS ─────────────────────────────────────────────
  {
    id: 'q_dist_1',
    topic: 'distance_methods',
    question: 'Neighbour-Joining selects the pair (i,j) to join based on the Q-matrix entry:',
    options: [
      'Minimum dᵢⱼ (shortest distance)',
      'Minimum Qᵢⱼ = (n−2)dᵢⱼ − Σdᵢ − Σdⱼ',
      'Maximum Qᵢⱼ',
      'Minimum dᵢⱼ + dⱼₖ for all k',
    ],
    answer: 1,
    explanation: 'NJ minimises Q = (n−2)d(i,j) − r(i) − r(j) where r(i) = Σₖ d(i,k). This corrects for long-branch attraction vs simple minimum distance.',
  },
  {
    id: 'q_dist_2',
    topic: 'distance_methods',
    question: 'UPGMA assumes:',
    options: [
      'A molecular clock (ultrametric distances)',
      'Rate variation among lineages',
      'Minimum evolution principle',
      'Gamma-distributed rates',
    ],
    answer: 0,
    explanation: 'UPGMA assumes equal evolutionary rates in all lineages (ultrametric / clock-like). Violation leads to incorrect topologies.',
  },

  // ── MAXIMUM PARSIMONY ────────────────────────────────────────────
  {
    id: 'q_pars_1',
    topic: 'parsimony',
    question: 'In the Fitch parsimony algorithm, the parsimony score for a site is:',
    options: [
      'Number of internal nodes',
      'Number of times the intersection of child sets is empty (requiring a state change)',
      'Total branch length of the tree',
      'Number of leaves with derived state',
    ],
    answer: 1,
    explanation: 'Fitch: at each internal node, take intersection of children's state sets; if empty (disjoint), score +1 and take union. Sum over sites.',
  },

  // ── ML PHYLOGENY ─────────────────────────────────────────────────
  {
    id: 'q_ml_1',
    topic: 'likelihood_phylo',
    question: 'Felsenstein's pruning algorithm efficiently computes the phylogenetic likelihood by:',
    options: [
      'Enumerating all ancestral state combinations',
      'Recursively computing partial likelihoods from leaves to root',
      'Using parsimony scores as proxies',
      'Randomly sampling ancestral states',
    ],
    answer: 1,
    explanation: 'Pruning = post-order traversal. Partial likelihood L(v, s) = probability of subtree data given state s at v. Avoids exponential enumeration.',
  },

  // ── BOOTSTRAP ────────────────────────────────────────────────────
  {
    id: 'q_boot_1',
    topic: 'bootstrap',
    question: 'In phylogenetic bootstrapping, each replicate consists of:',
    options: [
      'A random subtree of the original taxa',
      'Resampling alignment columns with replacement to create a pseudoreplicate alignment',
      'Removing one taxon at a time (jackknife)',
      'Adding random noise to the distance matrix',
    ],
    answer: 1,
    explanation: 'Felsenstein (1985) bootstrap: resample columns of the MSA with replacement. Frequency of a clade across replicates = bootstrap support.',
  },

  // ── RNA STRUCTURE ────────────────────────────────────────────────
  {
    id: 'q_rna_1',
    topic: 'rna_structure',
    question: 'The Nussinov algorithm maximises:',
    options: [
      'Minimum free energy of the RNA fold',
      'Number of base pairs in the secondary structure',
      'GC content of stem regions',
      'Length of the longest stem-loop',
    ],
    answer: 1,
    explanation: 'Nussinov DP maximises base-pair count. Zuker's mfold/RNAfold instead minimises free energy — more biologically accurate.',
  },

  // ── GENOME ASSEMBLY ──────────────────────────────────────────────
  {
    id: 'q_assembly_1',
    topic: 'genome_assembly',
    question: 'In a de Bruijn graph for genome assembly, nodes represent:',
    options: [
      'Individual reads',
      'k-mers (subsequences of length k)',
      'Contigs',
      'Paired-end read pairs',
    ],
    answer: 1,
    explanation: 'De Bruijn graph: nodes = (k−1)-mers, edges = k-mers. An Eulerian path through the graph spells out the genome sequence.',
  },

  // ── COALESCENT ───────────────────────────────────────────────────
  {
    id: 'q_coal_1',
    topic: 'coalescent',
    question: 'Under the Kingman coalescent, the rate of coalescence for k lineages is:',
    options: [
      'k / (2Nₑ)',
      'k(k−1) / (2Nₑ)',
      'Nₑ / k',
      '1 / Nₑ',
    ],
    answer: 1,
    explanation: 'Rate = C(k,2) / Nₑ = k(k−1)/(2Nₑ). Each pair of lineages can coalesce independently at rate 1/Nₑ; there are C(k,2) pairs.',
  },

  // ── SELECTION / dN/dS ────────────────────────────────────────────
  {
    id: 'q_sel_1',
    topic: 'selection',
    question: 'An ω (dN/dS) value significantly greater than 1 indicates:',
    options: [
      'Purifying (negative) selection',
      'Neutral evolution',
      'Positive (Darwinian) selection',
      'Relaxed constraint only',
    ],
    answer: 2,
    explanation: 'ω > 1: non-synonymous substitutions fix faster than synonymous → amino-acid changes are adaptive → positive selection.',
  },

  // ── MOLECULAR CLOCK ──────────────────────────────────────────────
  {
    id: 'q_clock_1',
    topic: 'molecular_clock',
    question: 'A strict molecular clock assumes:',
    options: [
      'Rate varies freely among all branches',
      'Rate is constant across all lineages',
      'Rate follows a log-normal distribution',
      'Rate correlates with body size',
    ],
    answer: 1,
    explanation: 'Strict clock: one rate r for all branches; divergence time T = d/(2r). Violations detected by likelihood-ratio test vs unconstrained model.',
  },

  // ── MULTIPLE ALIGNMENT ───────────────────────────────────────────
  {
    id: 'q_msa_1',
    topic: 'multiple_alignment',
    question: 'Progressive multiple alignment builds the MSA by:',
    options: [
      'Aligning all pairs simultaneously',
      'Iteratively realigning all sequences',
      'Following a guide tree, aligning closest pairs first',
      'Randomly selecting sequence pairs',
    ],
    answer: 2,
    explanation: 'ClustalW/MUSCLE: compute pairwise distances → build NJ guide tree → align most similar pairs first → add sequences progressively.',
  },
];
