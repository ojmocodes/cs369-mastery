import { Node, Link } from '../../../types';

export const nodes: Node[] = [
  // ── FOUNDATIONS ──────────────────────────────────────────────────
  { id: 'prob_foundations',    label: 'Probability Foundations',      group: 'foundations',   mastered: false, description: 'Core probability theory: sample spaces, events, axioms, conditional probability, Bayes theorem, independence.' },
  { id: 'combinatorics',       label: 'Combinatorics & Counting',      group: 'foundations',   mastered: false, description: 'Permutations, combinations, multinomial coefficients — essential for sequence-space calculations.' },
  { id: 'linear_algebra',      label: 'Linear Algebra Essentials',     group: 'foundations',   mastered: false, description: 'Vectors, matrices, eigenvalues/eigenvectors, matrix exponentiation — backbone of substitution models and PCA.' },
  { id: 'calculus_optim',      label: 'Calculus & Optimisation',       group: 'foundations',   mastered: false, description: 'Derivatives, gradients, log-likelihood surfaces, Newton–Raphson, EM algorithm convergence.' },
  { id: 'stats_inference',     label: 'Statistical Inference',         group: 'foundations',   mastered: false, description: 'MLE, hypothesis testing, confidence intervals, p-values, likelihood-ratio tests, AIC/BIC model selection.' },

  // ── SEQUENCE ANALYSIS ─────────────────────────────────────────────
  { id: 'seq_representation',  label: 'Sequence Representation',       group: 'sequences',     mastered: false, description: 'DNA/RNA/protein alphabets, FASTA format, k-mers, one-hot encoding, sequence databases (GenBank, UniProt).' },
  { id: 'dotplots',            label: 'Dot Plots',                     group: 'sequences',     mastered: false, description: 'Visual pairwise comparison; self-similarity, repeats, inversions; noise filtering with window/stringency.' },
  { id: 'scoring_matrices',    label: 'Scoring Matrices',              group: 'sequences',     mastered: false, description: 'Match/mismatch scores, PAM & BLOSUM series derivation, log-odds rationale, gap penalties (linear vs affine).' },
  { id: 'global_alignment',    label: 'Global Alignment (NW)',         group: 'sequences',     mastered: false, description: 'Needleman–Wunsch DP: recurrence, traceback, time/space O(mn), end-gap treatment.' },
  { id: 'local_alignment',     label: 'Local Alignment (SW)',          group: 'sequences',     mastered: false, description: 'Smith–Waterman DP: zero-floor recurrence, multiple local alignments, sub-sequence matching.' },
  { id: 'affine_gaps',         label: 'Affine Gap Penalties',          group: 'sequences',     mastered: false, description: 'Three-matrix DP (M, Ix, Iy), gap-open vs gap-extend cost, biological justification.' },
  { id: 'db_search',           label: 'Database Search & BLAST',       group: 'sequences',     mastered: false, description: 'BLAST heuristic: words, seeds, HSPs, two-hit model, gapped extension, E-value, BLOSUM62 default.' },
  { id: 'multiple_alignment',  label: 'Multiple Sequence Alignment',   group: 'sequences',     mastered: false, description: 'Progressive (ClustalW, MUSCLE), iterative, consistency-based (T-Coffee), SP score, sum-of-pairs.' },

  // ── PROBABILISTIC SEQUENCE MODELS ────────────────────────────────
  { id: 'markov_chains',       label: 'Markov Chains',                 group: 'prob_models',   mastered: false, description: 'States, transition matrices, stationarity, detailed balance, mixing time, Chapman–Kolmogorov.' },
  { id: 'hmm_basics',          label: 'HMMs – Structure & Decoding',   group: 'prob_models',   mastered: false, description: 'Hidden states, emission/transition probs, Viterbi decoding (log-space), posterior decoding, forward–backward.' },
  { id: 'hmm_training',        label: 'HMMs – Training',               group: 'prob_models',   mastered: false, description: 'Baum–Welch (EM for HMMs), counting expected transitions/emissions, convergence, supervised vs unsupervised.' },
  { id: 'profile_hmm',         label: 'Profile HMMs',                  group: 'prob_models',   mastered: false, description: 'Match/insert/delete states, Dirichlet priors, HMMER architecture, MSA-to-profile construction.' },
  { id: 'seq_composition',     label: 'Sequence Composition Models',   group: 'prob_models',   mastered: false, description: 'Background nucleotide frequencies, CpG island detection, log-odds scoring with Markov background.' },

  // ── SUBSTITUTION MODELS ───────────────────────────────────────────
  { id: 'jukes_cantor',        label: 'Jukes–Cantor Model',            group: 'subst_models',  mastered: false, description: 'Simplest continuous-time model: equal rates α, closed-form distance d = −(3/4)ln(1−4p/3).' },
  { id: 'kimura',              label: 'Kimura 2-Parameter',            group: 'subst_models',  mastered: false, description: 'Transition (α) vs transversion (β) rates; distance formula; ti/tv ratio κ.' },
  { id: 'gtr_model',           label: 'GTR & Variants',                group: 'subst_models',  mastered: false, description: 'General time-reversible: 6 rate parameters + base frequencies, rate matrix Q, reversibility.' },
  { id: 'rate_variation',      label: 'Rate Variation Across Sites',   group: 'subst_models',  mastered: false, description: 'Gamma-distributed rates (shape α), invariant sites (+I), discrete approximation (Yang 1994).' },
  { id: 'matrix_exponent',     label: 'Matrix Exponentiation & Q',     group: 'subst_models',  mastered: false, description: 'Rate matrix Q, P(t)=e^{Qt}, eigendecomposition, detailed balance, stationary frequencies.' },

  // ── PHYLOGENETICS ─────────────────────────────────────────────────
  { id: 'tree_concepts',       label: 'Tree Concepts & Terminology',   group: 'phylogenetics', mastered: false, description: 'Rooted/unrooted, bifurcating, clade, outgroup, branch lengths, Newick format, #taxa → #topologies.' },
  { id: 'distance_methods',    label: 'Distance-Based Methods',        group: 'phylogenetics', mastered: false, description: 'UPGMA (ultrametric assumption), Neighbour-Joining (Saitou & Nei 1987), Q-matrix, minimum evolution.' },
  { id: 'parsimony',           label: 'Maximum Parsimony',             group: 'phylogenetics', mastered: false, description: 'Fitch algorithm (unordered), Sankoff algorithm (weighted), parsimony-informative sites, consistency index.' },
  { id: 'likelihood_phylo',    label: 'Maximum Likelihood Phylogeny',  group: 'phylogenetics', mastered: false, description: 'Felsenstein pruning algorithm, likelihood on tree, model+topology joint optimisation, RAxML/IQ-TREE.' },
  { id: 'bayesian_phylo',      label: 'Bayesian Phylogenetics',        group: 'phylogenetics', mastered: false, description: 'MCMC sampling (MrBayes/BEAST), posterior probability, priors on topology/branch lengths, burn-in.' },
  { id: 'bootstrap',           label: 'Bootstrap & Tree Support',      group: 'phylogenetics', mastered: false, description: 'Felsenstein bootstrap, 100–1000 replicates, jackknife, posterior probability vs bootstrap comparison.' },

  // ── MOLECULAR EVOLUTION ───────────────────────────────────────────
  { id: 'molecular_clock',     label: 'Molecular Clock',               group: 'mol_evolution', mastered: false, description: 'Strict vs relaxed clock, rate constancy test, Langley–Fitch, Bayesian divergence time estimation.' },
  { id: 'selection',           label: 'Natural Selection & dN/dS',     group: 'mol_evolution', mastered: false, description: 'Synonymous (dS) vs non-synonymous (dN) rates, ω = dN/dS, branch/site models, positive selection.' },
  { id: 'coalescent',          label: 'Coalescent Theory',             group: 'mol_evolution', mastered: false, description: 'Kingman coalescent, TMRCA, effective population size Ne, coalescent rate, genealogy vs phylogeny.' },
  { id: 'recombination',       label: 'Recombination & Horizontal GT', group: 'mol_evolution', mastered: false, description: 'Recombination detection, reticulate evolution, ARG, HGT in bacteria, network methods.' },

  // ── STRUCTURAL & FUNCTIONAL BIOINFORMATICS ────────────────────────
  { id: 'rna_structure',       label: 'RNA Secondary Structure',       group: 'struct_func',   mastered: false, description: 'Stem-loops, Nussinov algorithm (max base pairs), Zuker MFE folding, partition function, pseudoknots.' },
  { id: 'gene_finding',        label: 'Gene Finding',                  group: 'struct_func',   mastered: false, description: 'ORF detection, Kozak consensus, splice sites, GenScan HMM, ab initio vs comparative gene finding.' },
  { id: 'genome_assembly',     label: 'Genome Assembly',               group: 'struct_func',   mastered: false, description: 'OLC vs de Bruijn graph, k-mer graph, Eulerian path, contig/scaffold/chromosome, repeat challenges.' },
];

export const links: Link[] = [
  // Foundations → Sequences
  { source: 'prob_foundations',   target: 'scoring_matrices',  strength: 0.9 },
  { source: 'combinatorics',      target: 'seq_representation', strength: 0.7 },
  { source: 'stats_inference',    target: 'db_search',          strength: 0.8 },
  { source: 'stats_inference',    target: 'scoring_matrices',   strength: 0.8 },

  // Foundations → Prob Models
  { source: 'prob_foundations',   target: 'markov_chains',      strength: 0.95 },
  { source: 'prob_foundations',   target: 'hmm_basics',         strength: 0.9 },
  { source: 'calculus_optim',     target: 'hmm_training',       strength: 0.85 },
  { source: 'stats_inference',    target: 'hmm_training',       strength: 0.8 },

  // Foundations → Substitution Models
  { source: 'prob_foundations',   target: 'jukes_cantor',       strength: 0.85 },
  { source: 'linear_algebra',     target: 'matrix_exponent',    strength: 0.95 },
  { source: 'calculus_optim',     target: 'matrix_exponent',    strength: 0.8 },
  { source: 'stats_inference',    target: 'gtr_model',          strength: 0.75 },

  // Foundations → Phylogenetics
  { source: 'stats_inference',    target: 'likelihood_phylo',   strength: 0.9 },
  { source: 'prob_foundations',   target: 'bayesian_phylo',     strength: 0.85 },
  { source: 'calculus_optim',     target: 'likelihood_phylo',   strength: 0.8 },

  // Sequence analysis chain
  { source: 'seq_representation', target: 'dotplots',           strength: 0.8 },
  { source: 'seq_representation', target: 'scoring_matrices',   strength: 0.85 },
  { source: 'scoring_matrices',   target: 'global_alignment',   strength: 0.9 },
  { source: 'scoring_matrices',   target: 'local_alignment',    strength: 0.9 },
  { source: 'global_alignment',   target: 'affine_gaps',        strength: 0.85 },
  { source: 'local_alignment',    target: 'affine_gaps',        strength: 0.85 },
  { source: 'local_alignment',    target: 'db_search',          strength: 0.9 },
  { source: 'affine_gaps',        target: 'db_search',          strength: 0.8 },
  { source: 'global_alignment',   target: 'multiple_alignment', strength: 0.85 },
  { source: 'db_search',          target: 'multiple_alignment', strength: 0.75 },

  // Prob models chain
  { source: 'markov_chains',      target: 'hmm_basics',         strength: 0.95 },
  { source: 'hmm_basics',         target: 'hmm_training',       strength: 0.9 },
  { source: 'hmm_training',       target: 'profile_hmm',        strength: 0.85 },
  { source: 'markov_chains',      target: 'seq_composition',    strength: 0.85 },
  { source: 'hmm_basics',         target: 'gene_finding',       strength: 0.8 },
  { source: 'profile_hmm',        target: 'multiple_alignment', strength: 0.75 },

  // Substitution models chain
  { source: 'jukes_cantor',       target: 'kimura',             strength: 0.9 },
  { source: 'kimura',             target: 'gtr_model',          strength: 0.85 },
  { source: 'gtr_model',          target: 'rate_variation',     strength: 0.85 },
  { source: 'matrix_exponent',    target: 'jukes_cantor',       strength: 0.8 },
  { source: 'matrix_exponent',    target: 'gtr_model',          strength: 0.85 },

  // Subst models → Phylogenetics
  { source: 'jukes_cantor',       target: 'distance_methods',   strength: 0.85 },
  { source: 'kimura',             target: 'distance_methods',   strength: 0.85 },
  { source: 'gtr_model',          target: 'likelihood_phylo',   strength: 0.9 },
  { source: 'rate_variation',     target: 'likelihood_phylo',   strength: 0.8 },

  // Phylogenetics chain
  { source: 'tree_concepts',      target: 'distance_methods',   strength: 0.9 },
  { source: 'tree_concepts',      target: 'parsimony',          strength: 0.85 },
  { source: 'tree_concepts',      target: 'likelihood_phylo',   strength: 0.9 },
  { source: 'tree_concepts',      target: 'bayesian_phylo',     strength: 0.85 },
  { source: 'distance_methods',   target: 'bootstrap',          strength: 0.75 },
  { source: 'parsimony',          target: 'bootstrap',          strength: 0.75 },
  { source: 'likelihood_phylo',   target: 'bootstrap',          strength: 0.85 },
  { source: 'likelihood_phylo',   target: 'bayesian_phylo',     strength: 0.8 },
  { source: 'multiple_alignment', target: 'likelihood_phylo',   strength: 0.8 },
  { source: 'multiple_alignment', target: 'parsimony',          strength: 0.8 },

  // Mol evolution
  { source: 'likelihood_phylo',   target: 'molecular_clock',    strength: 0.85 },
  { source: 'bayesian_phylo',     target: 'molecular_clock',    strength: 0.85 },
  { source: 'gtr_model',          target: 'selection',          strength: 0.8 },
  { source: 'likelihood_phylo',   target: 'selection',          strength: 0.85 },
  { source: 'prob_foundations',   target: 'coalescent',         strength: 0.8 },
  { source: 'markov_chains',      target: 'coalescent',         strength: 0.8 },
  { source: 'coalescent',         target: 'recombination',      strength: 0.75 },

  // Structural/Functional
  { source: 'markov_chains',      target: 'rna_structure',      strength: 0.7 },
  { source: 'calculus_optim',     target: 'rna_structure',      strength: 0.75 },
  { source: 'hmm_basics',         target: 'gene_finding',       strength: 0.85 },
  { source: 'seq_representation', target: 'genome_assembly',    strength: 0.8 },
  { source: 'prob_foundations',   target: 'genome_assembly',    strength: 0.7 },
  { source: 'multiple_alignment', target: 'gene_finding',       strength: 0.7 },
];
