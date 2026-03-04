import { ExamQuestion } from '../../../types';

export const examQuestions: ExamQuestion[] = [
  // ══════════════════════════════════════════════════════════════════
  // SECTION A – SHORT ANSWER (10 × 3 marks = 30 marks)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'eq_A1',
    section: 'A',
    marks: 3,
    topic: 'global_alignment',
    type: 'short',
    question:
      'Write the Needleman–Wunsch recurrence for filling cell F(i, j), given a linear gap penalty d and substitution score s(xᵢ, yⱼ). Define each term.',
    modelAnswer:
      'F(i,j) = max{ F(i−1,j−1) + s(xᵢ,yⱼ),  F(i−1,j) − d,  F(i,j−1) − d }.\n\n• F(i−1,j−1) + s(xᵢ,yⱼ): align xᵢ with yⱼ (match or mismatch).\n• F(i−1,j) − d: introduce a gap in sequence Y (delete from X).\n• F(i,j−1) − d: introduce a gap in sequence X (insert into X from Y).\nInitialisation: F(0,0)=0, F(i,0)=−id, F(0,j)=−jd. Traceback from F(m,n).',
    markingGuide: '1 mark: correct three-way max. 1 mark: correct initialisation. 1 mark: identifying traceback start.',
  },
  {
    id: 'eq_A2',
    section: 'A',
    marks: 3,
    topic: 'jukes_cantor',
    type: 'short',
    question:
      'Derive the Jukes–Cantor distance formula. State the key assumption and show how you correct for multiple hits.',
    modelAnswer:
      'JC assumes equal base frequencies and a single rate α for all substitutions.\nLet p = observed proportion of differing sites.\nThe expected proportion evolving under JC: p(t) = ¾(1 − e^{−4αt/3}).\nSolving for t (or equivalently d = 2αt per branch, total d = expected substitutions per site):\nd = −(3/4) ln(1 − 4p/3).\nAs p→3/4 the correction → ∞ (saturation). The log corrects for multiple hits at the same site.',
    markingGuide: '1 mark: stating JC assumptions. 1 mark: correct formula. 1 mark: interpreting saturation / multiple hits.',
  },
  {
    id: 'eq_A3',
    section: 'A',
    marks: 3,
    topic: 'hmm_basics',
    type: 'short',
    question:
      'Explain the difference between the Viterbi algorithm and the Forward algorithm for an HMM. When would you prefer each?',
    modelAnswer:
      'Viterbi: finds the single most probable hidden state sequence (Viterbi path) using max instead of sum. Runs in O(T·K²).\nForward: computes the total probability of the observation sequence P(O|λ) by summing over ALL hidden paths. Same complexity.\nUse Viterbi when you need the best annotation/segmentation (e.g. gene prediction).\nUse Forward (or Forward–Backward) when you need posterior state probabilities or to train with Baum–Welch.',
    markingGuide: '1 mark: max vs sum distinction. 1 mark: what each computes. 1 mark: appropriate use case for each.',
  },
  {
    id: 'eq_A4',
    section: 'A',
    marks: 3,
    topic: 'markov_chains',
    type: 'short',
    question:
      'Define the stationary distribution of a Markov chain. How is detailed balance (reversibility) related to stationarity?',
    modelAnswer:
      'A distribution π is stationary if πP = π (for row-vector π and transition matrix P).\nDetailed balance: πᵢ Pᵢⱼ = πⱼ Pⱼᵢ for all i,j. This is a stronger condition than stationarity.\nIf detailed balance holds, summing over j: Σⱼ πᵢ Pᵢⱼ = Σⱼ πⱼ Pⱼᵢ → πᵢ = (πP)ᵢ, so the chain is stationary.\nDetailed balance ⟹ stationarity; the converse is not generally true.\nTime-reversible substitution models (e.g. GTR) use detailed balance to guarantee stationarity.',
    markingGuide: '1 mark: correct πP=π. 1 mark: detailed balance equation. 1 mark: implication direction (DB⟹stationary, not vice versa).',
  },
  {
    id: 'eq_A5',
    section: 'A',
    marks: 3,
    topic: 'tree_concepts',
    type: 'short',
    question:
      'Explain why the number of possible unrooted tree topologies grows super-exponentially with the number of taxa, and give the formula.',
    modelAnswer:
      'Each new taxon can be attached to any of the existing branches. For n taxa, #unrooted bifurcating trees = (2n−5)!! = 1×3×5×…×(2n−5) for n≥3.\nn=4: 3 trees. n=10: 2,027,025. n=20: ~2.2×10²⁰.\nThis explosive growth means exhaustive search over topologies is infeasible for n≳10; heuristic search (SPR/TBR moves) is required.',
    markingGuide: '1 mark: correct formula (2n−5)!!. 1 mark: correct value for n=4 or n=5. 1 mark: heuristic implication.',
  },
  {
    id: 'eq_A6',
    section: 'A',
    marks: 3,
    topic: 'selection',
    type: 'short',
    question:
      'Define synonymous and non-synonymous substitutions. How is dN/dS (ω) used to detect positive selection?',
    modelAnswer:
      'Synonymous (dS): nucleotide change that does not alter the amino acid (silent). Non-synonymous (dN): changes the amino acid.\nω = dN/dS. Under neutrality ω=1. Purifying selection → ω<1 (amino-acid changes removed). Positive selection → ω>1 (changes favoured).\nTo detect positive selection: fit models M7 (β distribution, 0<ω<1) vs M8 (+ class with ω>1) using likelihood-ratio test. If M8 is significantly better and ω>1, positive selection is inferred.',
    markingGuide: '1 mark: correct definitions. 1 mark: ω interpretation. 1 mark: LRT or appropriate test.',
  },
  {
    id: 'eq_A7',
    section: 'A',
    marks: 3,
    topic: 'rna_structure',
    type: 'short',
    question:
      'Describe the Nussinov dynamic programming algorithm for RNA secondary structure prediction. What does it optimise, and what is its time complexity?',
    modelAnswer:
      'Nussinov maximises the number of base pairs.\nLet N(i,j) = max base pairs in subsequence [i,j].\nRecurrence:\n  N(i,j) = max{\n    N(i+1,j)        // i unpaired,\n    N(i,j−1)        // j unpaired,\n    N(i+1,j−1)+1   // i–j paired (if complementary),\n    max_{i<k<j} N(i,k) + N(k+1,j) // bifurcation\n  }\nBase case: N(i,i)=0, N(i,j)=0 for i>j.\nTime: O(n³), Space: O(n²). Limitation: no pseudoknots; free energy not considered.',
    markingGuide: '1 mark: correct objective. 1 mark: correct recurrence (at least 3 cases). 1 mark: O(n³) complexity.',
  },
  {
    id: 'eq_A8',
    section: 'A',
    marks: 3,
    topic: 'coalescent',
    type: 'short',
    question:
      'State the Kingman coalescent rate for k lineages in a population of effective size Nₑ. Derive the expected time to the most recent common ancestor (MRCA) starting from n lineages.',
    modelAnswer:
      'Rate for k lineages to coalesce: λₖ = C(k,2)/Nₑ = k(k−1)/(2Nₑ).\nExpected waiting time in state k: E[Tₖ] = 2Nₑ / [k(k−1)].\nExpected TMRCA = Σₖ₌₂ⁿ 2Nₑ/[k(k−1)] = 2Nₑ Σₖ₌₂ⁿ [1/(k−1) − 1/k] (telescoping) = 2Nₑ(1 − 1/n).\nAs n→∞, E[TMRCA] → 2Nₑ (twice the effective population size in generations).',
    markingGuide: '1 mark: correct λₖ. 1 mark: correct E[Tₖ]. 1 mark: correct TMRCA = 2Nₑ(1−1/n).',
  },
  {
    id: 'eq_A9',
    section: 'A',
    marks: 3,
    topic: 'db_search',
    type: 'short',
    question:
      'Explain how BLAST achieves speed compared to Smith–Waterman, and why this introduces sensitivity trade-offs.',
    modelAnswer:
      'BLAST uses a heuristic filter: (1) Index database k-mers; (2) Find high-scoring word pairs (seeds); (3) Extend seeds into high-scoring pairs (HSPs) without gaps; (4) Attempt gapped extension only for promising HSPs.\nSpeed: avoids full O(mn) DP for most sequences by only extending seeds above threshold T.\nTrade-off: short or divergent alignments may lack a high-scoring seed → missed (false negative). Reducing T increases sensitivity but also runtime. Gapless extension misses alignments requiring early gaps.',
    markingGuide: '1 mark: word/seed-based approach. 1 mark: extension heuristic. 1 mark: sensitivity trade-off.',
  },
  {
    id: 'eq_A10',
    section: 'A',
    marks: 3,
    topic: 'bayesian_phylo',
    type: 'short',
    question:
      'Compare Bayesian phylogenetic inference to maximum likelihood. What additional output does Bayesian analysis provide?',
    modelAnswer:
      'ML: finds the single tree topology+parameters maximising P(data|tree,params). Provides a point estimate + bootstrap support.\nBayesian (MCMC): samples trees from the posterior P(tree,params|data) ∝ P(data|tree,params)·P(tree,params).\nAdditional outputs: posterior probabilities on clades (often considered more calibrated than bootstrap), credible intervals on branch lengths and model parameters, marginal model likelihoods for Bayes-factor model selection.\nBayesian supports tend to be higher than bootstrap values for the same clade.',
    markingGuide: '1 mark: posterior vs likelihood distinction. 1 mark: MCMC sampling. 1 mark: posterior probability + credible intervals.',
  },

  // ══════════════════════════════════════════════════════════════════
  // SECTION B – CALCULATIONS (3 × 10 marks = 30 marks)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'eq_B1',
    section: 'B',
    marks: 10,
    topic: 'global_alignment',
    type: 'calculation',
    question:
      'Perform a complete Needleman–Wunsch alignment of sequences X = "ACGT" and Y = "ACT" using match=+1, mismatch=−1, linear gap penalty d=2. Show the full DP matrix, traceback, and state the optimal alignment and score.',
    modelAnswer:
      'Matrix (rows = X+gap, cols = Y+gap):\n     -   A   C   T\n-  [ 0  -2  -4  -6]\nA  [-2   1  -1  -3]\nC  [-4  -1   2   0]\nG  [-6  -3   0   1]\nT  [-8  -5  -2   1]\n\nTraceback from F(4,3)=1:\nF(4,3)←F(3,2)=2 via diagonal (T≠T? T=T: +1 → 2+1? No: F(3,2)+s(G,C)... let me restate)\n\nActual fill (match=+1, mm=−1, gap=−2):\nF(1,1)=max(0+1,−2−2,−2−2)=1\nF(1,2)=max(−2−1,1−2,−4−2)=max(−3,−1,−6)=−1\nF(1,3)=max(−4−1,−1−2,−6−2)=max(−5,−3,−8)=−3\nF(2,1)=max(−2−1,−4−2,1−2)=max(−3,−6,−1)=−1\nF(2,2)=max(1+1,−1−2,−1−2)=max(2,−3,−3)=2\nF(2,3)=max(−1−1,2−2,−3−2)=max(−2,0,−5)=0\nF(3,1)=max(−4−1,−6−2,−1−2)=max(−5,−8,−3)=−3\nF(3,2)=max(−1−1,−3−2,2−2)=max(−2,−5,0)=0\nF(3,3)=max(2−1,0−2,0−2)=max(1,−2,−2)=1\nF(4,1)=max(−6−1,−8−2,−3−2)=max(−7,−10,−5)=−5\nF(4,2)=max(−3−1,−5−2? no: F(3,1)−2=−5, F(4,0)−2=−10, F(3,2)−2? ... \nF(4,2)=max(F(3,1)+s(T,C), F(3,2)−2, F(4,1)−2)=max(−3−1,0−2,−5−2)=max(−4,−2,−7)=−2\nF(4,3)=max(F(3,2)+s(T,T), F(3,3)−2, F(4,2)−2)=max(0+1,1−2,−2−2)=max(1,−1,−4)=1\n\nOptimal score = 1.\nTraceback: F(4,3)←F(3,2)+1 (diag, T=T) ← F(2,1) (diag, C≠C→? C=C→ +1) ← F(1,0)\nAlignment:\nX: A C G T\nY: A C - T\nScore: 1+1−2+1=1 ✓',
    markingGuide: '3 marks: correct DP matrix. 3 marks: correct traceback path. 2 marks: correct alignment. 2 marks: correct score with working.',
  },
  {
    id: 'eq_B2',
    section: 'B',
    marks: 10,
    topic: 'distance_methods',
    type: 'calculation',
    question:
      'Given the following distance matrix for four taxa A, B, C, D, apply the Neighbour-Joining algorithm to construct a tree. Show all Q-matrix calculations and branch length computations.\n\nDistance matrix:\n       A    B    C    D\nA  [  0   5    9   9 ]\nB  [  5   0    10  10]\nC  [  9   10   0   8 ]\nD  [  9   10   8   0 ]',
    modelAnswer:
      'Step 1: n=4. Row sums: r(A)=23, r(B)=25, r(C)=27, r(D)=27.\nQ-matrix = (n−2)d(i,j) − r(i) − r(j):\nQ(A,B)=2×5−23−25=10−48=−38\nQ(A,C)=2×9−23−27=18−50=−32\nQ(A,D)=2×9−23−27=−32\nQ(B,C)=2×10−25−27=−32\nQ(B,D)=2×10−25−27=−32\nQ(C,D)=2×8−27−27=16−54=−38\n\nMinimum Q: Q(A,B)=Q(C,D)=−38. Join (A,B) (or (C,D); choose (A,B)).\n\nBranch lengths:\nd(A,u)=d(A,B)/2 + [r(A)−r(B)]/(2(n−2)) = 5/2 + (23−25)/4 = 2.5−0.5 = 2.0\nd(B,u)=5−2.0=3.0\n\nNew node u. New distances:\nd(u,C)=[d(A,C)+d(B,C)−d(A,B)]/2=[9+10−5]/2=7\nd(u,D)=[d(A,D)+d(B,D)−d(A,B)]/2=[9+10−5]/2=7\n\nStep 2: n=3, taxa {u,C,D}. d(u,C)=7, d(u,D)=7, d(C,D)=8.\nr(u)=14, r(C)=15, r(D)=15.\nQ(u,C)=1×7−14−15=−22; Q(u,D)=−22; Q(C,D)=1×8−15−15=−22. All equal; join (C,D).\nd(C,v)=8/2+(15−15)/2=4; d(D,v)=4. d(u,v)=[7+7−8]/2=3.\n\nFinal tree: ((A:2.0,B:3.0):3.0,(C:4.0,D:4.0));',
    markingGuide: '2 marks: correct Q-matrix. 2 marks: choosing correct pair. 2 marks: branch lengths for step 1. 2 marks: reduced matrix. 2 marks: final tree topology and branch lengths.',
  },
  {
    id: 'eq_B3',
    section: 'B',
    marks: 10,
    topic: 'hmm_basics',
    type: 'calculation',
    question:
      'A 2-state HMM has states F (fair coin) and L (loaded coin). Transition: P(F→F)=0.9, P(L→L)=0.8. Emissions: P(H|F)=0.5, P(H|L)=0.8. Initial: π(F)=π(L)=0.5. Observation: H, H, T.\n(a) Compute the Viterbi path and its probability. (b) Compute P(HHT | model) using the Forward algorithm.',
    modelAnswer:
      '(a) Viterbi (log or direct):\nt=1, H:\nδ₁(F)=0.5×0.5=0.25; δ₁(L)=0.5×0.8=0.4\nt=2, H:\nδ₂(F)=max(0.25×0.9, 0.4×0.2)×0.5=max(0.225,0.08)×0.5=0.225×0.5=0.1125\nδ₂(L)=max(0.25×0.1, 0.4×0.8)×0.8=max(0.025,0.32)×0.8=0.32×0.8=0.256\nt=3, T:\nδ₃(F)=max(0.1125×0.9,0.256×0.2)×0.5=max(0.10125,0.0512)×0.5=0.10125×0.5=0.050625\nδ₃(L)=max(0.1125×0.1,0.256×0.8)×0.2=max(0.01125,0.2048)×0.2=0.2048×0.2=0.04096\nViterbi path: F (best at t=3 is F with 0.050625). Traceback: t=3:F←t=2:F←t=1:F. Path: F,F,F. P=0.050625.\n\nWait — recheck t=3 F: came from t=2 F (0.10125>0.0512 ✓). t=2 F came from t=1 F (0.225>0.08 ✓). Path = F,F,F.\n\n(b) Forward:\nα₁(F)=0.25; α₁(L)=0.4\nα₂(F)=(0.25×0.9+0.4×0.2)×0.5=(0.225+0.08)×0.5=0.1525\nα₂(L)=(0.25×0.1+0.4×0.8)×0.8=(0.025+0.32)×0.8=0.276\nα₃(F)=(0.1525×0.9+0.276×0.2)×0.5=(0.13725+0.0552)×0.5=0.09623\nα₃(L)=(0.1525×0.1+0.276×0.8)×0.2=(0.01525+0.2208)×0.2=0.04721\nP(HHT|model)=0.09623+0.04721=0.14344',
    markingGuide: '2 marks: correct δ₁. 3 marks: correct δ₂,δ₃ and traceback. 2 marks: correct α₁,α₂. 2 marks: correct α₃. 1 mark: final sum.',
  },

  // ══════════════════════════════════════════════════════════════════
  // SECTION C – ESSAY (2 × 15 marks = 30 marks)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'eq_C1',
    section: 'C',
    marks: 15,
    topic: 'likelihood_phylo',
    type: 'essay',
    question:
      'Compare maximum parsimony, distance-based (Neighbour-Joining), and maximum likelihood approaches to phylogenetic reconstruction. Discuss the assumptions, strengths, weaknesses, and circumstances under which each is preferred. Your answer should demonstrate understanding of the algorithmic and statistical principles involved.',
    modelAnswer:
      'Introduction: Three major paradigms reconstruct evolutionary trees from molecular data.\n\n1. Maximum Parsimony (MP):\nAssumption: Fewest evolutionary changes is the best explanation (Occam\'s razor). No explicit model of evolution.\nAlgorithm: Fitch (unordered) or Sankoff (weighted) DP to count minimum changes per site; sum over parsimony-informative sites; search tree space.\nStrengths: Model-free, fast for small datasets, intuitive, consistent under some conditions.\nWeaknesses: Long-branch attraction (Felsenstein zone: fast-evolving lineages cluster artefactually); not statistically consistent under general models; ignores branch lengths.\nBest when: data are nearly identical, substitution rates are low, or you want a fast initial estimate.\n\n2. Neighbour-Joining (distance):\nAssumption: Converts sequences to pairwise distances using a substitution model; assumes additivity (tree metric).\nAlgorithm: Greedy Q-matrix minimisation O(n³); produces unrooted tree with branch lengths.\nStrengths: Very fast, works for hundreds of taxa, easy to implement, corrected distances improve accuracy.\nWeaknesses: Information loss in collapsing to pairwise distances; UPGMA requires clock; model misspecification in distance calculation propagates; cannot do model comparison.\nBest when: large datasets, quick tree needed, rough topology or guide tree for MSA.\n\n3. Maximum Likelihood (ML):\nAssumption: Explicit substitution model (GTR+Γ+I common); tree topology, branch lengths, and model parameters jointly optimised.\nAlgorithm: Felsenstein pruning computes P(data|tree,params); hill-climb over topology space (SPR/TBR moves); software: RAxML, IQ-TREE.\nStrengths: Statistically consistent and efficient; can incorporate complex models; supports model selection (AIC/BIC); gold standard for accuracy.\nWeaknesses: Computationally expensive O(n·k·L) per tree evaluation; model misspecification still possible; heuristic search may miss global optimum.\nBest when: accuracy is critical, moderate datasets (hundreds of taxa with fast software), hypothesis testing.\n\nConclusion: ML is theoretically optimal but costly; NJ is fast and practical for large data; MP is model-free but prone to LBA. Modern practice uses ML or Bayesian methods with NJ as a starting tree.',
    markingGuide: '5 marks MP (assumptions 1, algorithm 2, strengths/weaknesses 2). 5 marks NJ (same). 5 marks ML (same). Deduct for missing comparisons.',
  },
  {
    id: 'eq_C2',
    section: 'C',
    marks: 15,
    topic: 'hmm_training',
    type: 'essay',
    question:
      'Explain the architecture and training of Profile Hidden Markov Models (Profile HMMs) for protein family modelling. How are they constructed from a multiple sequence alignment, and how are they used for database searching? Compare their sensitivity and specificity to BLAST.',
    modelAnswer:
      'Profile HMMs model the conserved structure of a protein family as a probabilistic automaton.\n\nArchitecture:\n• Column-specific states: for each MSA column, three states: Match (Mₖ), Insert (Iₖ), Delete (Dₖ).\n• Match state Mₖ has a 20-dimensional emission distribution (amino acid frequencies at position k).\n• Insert states capture variable-length insertions; delete states allow skipping conserved positions.\n• Transitions between M/I/D encode the gap structure of the family.\n• Result: a left-to-right HMM with a "spine" of match states capturing the family\'s conserved positions.\n\nConstruction from MSA:\n1. Select MSA columns as match states (e.g., <50% gaps).\n2. Count observed amino acids at each column → emission counts.\n3. Add Dirichlet priors (pseudocounts) to handle sparse data and rare residues.\n4. Count transitions between states from alignment paths.\n5. Normalise to probabilities.\nOptionally: use Baum–Welch to refine on unaligned sequences.\n\nDatabase Searching (HMMER):\n• Each database sequence is scored against the profile using the Forward algorithm: log-odds score = log P(seq|profile) / P(seq|background).\n• E-values computed from extreme-value distribution of null model scores.\n• Significant hits are homologues; the profile captures position-specific conservation better than a single consensus.\n\nComparison to BLAST:\n• Sensitivity: Profile HMMs >> BLAST for distant homologues (below ~25% identity). The position-specific emission distributions encode evolutionary conservation far better than BLOSUM62 applied uniformly.\n• Specificity: HMMER achieves similar or better specificity at equivalent sensitivity.\n• Speed: BLAST is faster for single-sequence queries; HMMER3 with probabilistic banding is now competitive.\n• BLAST Profiles (PSI-BLAST) iterate BLAST to build a profile, approximating profile-HMM sensitivity but less principled.\nConclusion: Profile HMMs are the gold standard for protein family modelling, especially for remote homology detection.',
    markingGuide: '3 marks: architecture (M/I/D states). 3 marks: construction from MSA + priors. 3 marks: database search / scoring. 3 marks: BLAST comparison. 3 marks: sensitivity/specificity discussion with biological context.',
  },
];
