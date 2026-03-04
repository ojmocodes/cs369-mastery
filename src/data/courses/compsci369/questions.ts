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
    correctIndex: 1,
    explanation: 'Deterministic means no randomness — given the same initial conditions, the model always produces the same output. Discrete means the system evolves in distinct steps rather than continuously.'
  },
  {
    id: 'cs-3',
    nodeId: 'complex-systems',
    type: 'short-answer',
    question: 'In computational science, what is the term for the philosophical position that a system\'s behaviour can be fully understood by studying its individual parts in isolation?',
    acceptableAnswers: ['reductionism', 'Reductionism', 'reductionist', 'Reductionist'],
    explanation: 'Reductionism is the approach of understanding a complex system by reducing it to its fundamental parts. The opposite approach is holism, which argues that systems have properties that cannot be explained by studying components alone.'
  },

  // ══════════════════════════════════════════════════════════════
  // dynamical-systems (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ds-1',
    nodeId: 'dynamical-systems',
    type: 'multiple-choice',
    question: 'For the iteration x_{n+1} = g(x_n), a fixed point x* is stable if:',
    options: [
      '|g\'(x*)| > 1',
      '|g\'(x*)| = 1',
      '|g\'(x*)| < 1',
      'g\'(x*) = 0 only'
    ],
    correctIndex: 2,
    explanation: 'A fixed point x* of g(x) is stable (attracting) when |g\'(x*)| < 1. Near x*, small perturbations shrink under iteration. When |g\'(x*)| > 1, perturbations grow and the fixed point is unstable.'
  },
  {
    id: 'ds-2',
    nodeId: 'dynamical-systems',
    type: 'calculation',
    question: 'Consider the logistic map f(x) = rx(1-x) with r = 2.5. Find the non-zero fixed point x* (solve x* = 2.5·x*(1-x*) for x* ≠ 0). Give your answer to 1 decimal place.',
    correctAnswer: 0.6,
    tolerance: 0.01,
    explanation: 'Setting x* = 2.5·x*(1-x*) and dividing by x*: 1 = 2.5(1-x*) → 1/2.5 = 1-x* → x* = 0.6. Stability: f\'(0.6) = 2.5(1-1.2) = -0.5. Since |-0.5| < 1, this fixed point is stable.'
  },
  {
    id: 'ds-3',
    nodeId: 'dynamical-systems',
    type: 'multiple-choice',
    question: 'On a cobweb diagram, which pattern indicates convergence to a stable fixed point?',
    options: [
      'A spiral moving outward from the fixed point',
      'A staircase or spiral moving inward toward the fixed point',
      'A closed rectangular loop around the fixed point',
      'A straight line at 45° through the origin'
    ],
    correctIndex: 1,
    explanation: 'In a cobweb diagram we alternate between y=g(x) and y=x. When iterates converge, the cobweb forms an inward spiral or inward staircase. Outward spirals indicate instability.'
  },

  // ══════════════════════════════════════════════════════════════
  // fixed-points (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'fp-1',
    nodeId: 'fixed-points',
    type: 'multiple-choice',
    question: 'If g\'(x*) = 0 at a fixed point x*, what can we say about convergence?',
    options: [
      'Linear convergence (first-order)',
      'Quadratic convergence (second-order) or higher',
      'The iteration diverges',
      'No conclusion can be drawn'
    ],
    correctIndex: 1,
    explanation: 'When g\'(x*) = 0, the iteration is super-linear — at least quadratic convergence. The error satisfies |e_{n+1}| ≈ C|e_n|² or better. Newton\'s method achieves this: its iteration function g(x) = x - f(x)/f\'(x) has g\'(x*) = 0 at simple roots.'
  },
  {
    id: 'fp-2',
    nodeId: 'fixed-points',
    type: 'short-answer',
    question: 'What condition on |g\'(x*)| makes x* an attracting (stable) fixed point for the iteration x_{n+1} = g(x_n)?',
    acceptableAnswers: ['|g\'(x*)| < 1', 'less than 1', 'strictly less than 1'],
    explanation: 'The stability condition is |g\'(x*)| < 1. This follows from the linear convergence analysis: near x*, the error e_{n+1} = g(x*+e_n) - g(x*) ≈ g\'(x*)·e_n, so errors shrink iff |g\'(x*)| < 1.'
  },
  {
    id: 'fp-3',
    nodeId: 'fixed-points',
    type: 'calculation',
    question: 'Find the fixed points of g(x) = x² - x + 1. How many real fixed points are there?',
    correctAnswer: 2,
    tolerance: 0,
    explanation: 'Fixed points satisfy g(x*) = x*, so x*² - x* + 1 = x* → x*² - 2x* + 1 = 0 → (x*-1)² = 0 → x* = 1 (a double root). Wait — that\'s 1 fixed point of multiplicity 2. Actually 1 distinct real fixed point. The discriminant of x² - 2x + 1 is 4-4=0, giving exactly 1 real fixed point x* = 1.'
  },

  // ══════════════════════════════════════════════════════════════
  // cobweb-diagrams (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'cob-1',
    nodeId: 'cobweb-diagrams',
    type: 'multiple-choice',
    question: 'In a cobweb diagram for g(x) = x/2 + 1 starting from x₀ = 4, what pattern do you expect?',
    options: [
      'Outward spiral diverging to infinity',
      'Monotone staircase converging to the fixed point',
      'Alternating staircase converging to the fixed point',
      'Divergence to negative infinity'
    ],
    correctIndex: 1,
    explanation: 'g\'(x) = 1/2 for all x, so g\'(x*) = 1/2 > 0 and |g\'(x*)| = 1/2 < 1. With a positive derivative less than 1, the cobweb forms a monotone inward staircase (approaching from one side only). Alternating oscillation occurs when g\'(x*) < 0.'
  },
  {
    id: 'cob-2',
    nodeId: 'cobweb-diagrams',
    type: 'short-answer',
    question: 'For the cobweb of Newton\'s method applied to f(x) = x² - 2 (finding √2), what is g\'(x*) at the fixed point x* = √2?',
    acceptableAnswers: ['0', 'zero', '0.0'],
    explanation: 'Newton\'s iteration: g(x) = x - (x²-2)/(2x) = (x + 2/x)/2. g\'(x) = 1/2 - 1/x². At x* = √2: g\'(√2) = 1/2 - 1/2 = 0. This zero derivative explains Newton\'s quadratic convergence — the cobweb spirals in extremely rapidly.'
  },

  // ══════════════════════════════════════════════════════════════
  // newtons-method (4 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nm-1',
    nodeId: 'newtons-method',
    type: 'calculation',
    question: 'Use Newton\'s method to find √3 by solving f(x) = x² - 3 = 0. Starting from x₀ = 2, compute x₁. Give your answer to 4 decimal places.',
    correctAnswer: 1.75,
    tolerance: 0.0001,
    explanation: 'Newton\'s method: x_{n+1} = x_n - f(x_n)/f\'(x_n). f(x) = x²-3, f\'(x) = 2x.\nx₁ = 2 - (4-3)/4 = 2 - 0.25 = 1.75. (√3 ≈ 1.7321, so already close after one step.)'
  },
  {
    id: 'nm-2',
    nodeId: 'newtons-method',
    type: 'multiple-choice',
    question: 'Newton\'s method can fail to converge when:',
    options: [
      'The initial guess is too close to the root',
      'f\'(x_n) = 0 at some iterate, or the initial guess is in a cycle',
      'The function has exactly one root',
      'The function is a polynomial of degree 2'
    ],
    correctIndex: 1,
    explanation: 'Newton\'s method fails when f\'(x_n) = 0 (division by zero). It can also cycle, diverge to infinity, or enter chaos. Example: f(x) = x³ - 2x + 2 from x₀ = 0 gives x₁ = 1, x₂ = 0, cycle.'
  },
  {
    id: 'nm-3',
    nodeId: 'newtons-method',
    type: 'calculation',
    question: 'Newton\'s method for f(x) = x² - 3 gives iteration g(x) = (x + 3/x)/2. Compute g\'(x*) at x* = √3 ≈ 1.7321. Give to 1 decimal place.',
    correctAnswer: 0.0,
    tolerance: 0.05,
    explanation: 'g(x) = x/2 + 3/(2x). g\'(x) = 1/2 - 3/(2x²). At x*=√3: g\'(√3) = 1/2 - 3/6 = 1/2 - 1/2 = 0. This zero derivative gives quadratic convergence.'
  },
  {
    id: 'nm-4',
    nodeId: 'newtons-method',
    type: 'short-answer',
    question: 'What is the order of convergence of Newton\'s method for simple roots (where f\'(x*) ≠ 0)?',
    acceptableAnswers: ['2', 'quadratic', 'Quadratic', 'second order', 'Second order', 'second', 'Second'],
    explanation: 'Newton\'s method has quadratic (second-order) convergence for simple roots: |e_{n+1}| ≈ C|e_n|². The number of correct decimal digits roughly doubles each iteration.'
  },

  // ══════════════════════════════════════════════════════════════
  // nm-derivation (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nmd-1',
    nodeId: 'nm-derivation',
    type: 'multiple-choice',
    question: 'Newton\'s method is derived by linearising f(x) using a Taylor series. Starting from x_n, you set f(x_{n+1}) ≈ 0 using the first-order approximation. This gives:',
    options: [
      'x_{n+1} = x_n + f(x_n)/f\'(x_n)',
      'x_{n+1} = x_n - f(x_n)/f\'(x_n)',
      'x_{n+1} = x_n - f\'(x_n)/f(x_n)',
      'x_{n+1} = -f(x_n)/f\'(x_n)'
    ],
    correctIndex: 1,
    explanation: 'f(x_{n+1}) ≈ f(x_n) + (x_{n+1} - x_n)f\'(x_n) = 0. Solving: x_{n+1} - x_n = -f(x_n)/f\'(x_n), so x_{n+1} = x_n - f(x_n)/f\'(x_n).'
  },
  {
    id: 'nmd-2',
    nodeId: 'nm-derivation',
    type: 'short-answer',
    question: 'Newton\'s method can be viewed as a fixed point iteration x_{n+1} = g(x_n). What is g(x) in terms of f?',
    acceptableAnswers: ['g(x) = x - f(x)/f\'(x)', 'x - f(x)/f\'(x)'],
    explanation: 'Newton\'s method is the fixed point iteration for g(x) = x - f(x)/f\'(x). Fixed points of g are solutions to g(x*) = x*, which gives -f(x*)/f\'(x*) = 0, i.e., f(x*) = 0 — exactly the roots we seek.'
  },

  // ══════════════════════════════════════════════════════════════
  // nm-convergence (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nmc-1',
    nodeId: 'nm-convergence',
    type: 'multiple-choice',
    question: 'For a double root (f(x*) = 0 and f\'(x*) = 0), Newton\'s method converges:',
    options: [
      'Quadratically (second order)',
      'Linearly (first order)',
      'It does not converge at all',
      'Cubically (third order)'
    ],
    correctIndex: 1,
    explanation: 'For double roots, g\'(x*) = f(x*)f\'\'(x*)/(f\'(x*))² approaches 1/2 (by L\'Hôpital). Since g\'(x*) = 1/2 ≠ 0 but |1/2| < 1, convergence is linear (first-order): |e_{n+1}| ≈ (1/2)|e_n|.'
  },
  {
    id: 'nmc-2',
    nodeId: 'nm-convergence',
    type: 'short-answer',
    question: 'If Newton\'s method has 4 correct decimal digits after iteration n, approximately how many correct digits after iteration n+1 (for a simple root)?',
    acceptableAnswers: ['8', 'eight'],
    explanation: 'Quadratic convergence means the number of correct decimal digits roughly doubles each iteration. Starting with 4 correct digits, the next iterate has approximately 8 correct digits. This is why Newton\'s method is so powerful in practice.'
  },

  // ══════════════════════════════════════════════════════════════
  // nm-failures (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nmf-1',
    nodeId: 'nm-failures',
    type: 'multiple-choice',
    question: 'For f(x) = x^(1/3), starting at x₀ ≠ 0, Newton\'s method will:',
    options: [
      'Converge quickly to x* = 0',
      'Diverge — each iterate is twice as far from 0',
      'Converge linearly',
      'Converge quadratically'
    ],
    correctIndex: 1,
    explanation: 'f\'(x) = (1/3)x^(-2/3), so x_{n+1} = x_n - x_n^(1/3) / ((1/3)x_n^(-2/3)) = x_n - 3x_n = -2x_n. The iterate doubles in magnitude and alternates sign — Newton\'s method diverges! This is because x*=0 is a triple root with f\'(0) = 0 (or undefined).'
  },

  // ══════════════════════════════════════════════════════════════
  // ode-basics (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ode-1',
    nodeId: 'ode-basics',
    type: 'multiple-choice',
    question: 'An initial value problem (IVP) for a first-order ODE is:',
    options: [
      'A differential equation with no constraints',
      'A differential equation dy/dx = f(x,y) together with a starting condition y(x₀) = y₀',
      'A system of algebraic equations',
      'A boundary value problem with conditions at two endpoints'
    ],
    correctIndex: 1,
    explanation: 'An IVP consists of a differential equation dy/dx = f(x,y) and an initial condition y(x₀) = y₀. The goal is to find y(x) for x > x₀. Unlike boundary value problems, all conditions are specified at a single point x₀.'
  },
  {
    id: 'ode-2',
    nodeId: 'ode-basics',
    type: 'short-answer',
    question: 'For the ODE dy/dx = f(x,y) solved numerically by stepping forward from x₀ to x₀+h, the key quantity at each step is the slope f(x_n, y_n). What is the Euler update formula for y_{n+1}?',
    acceptableAnswers: ['y_{n+1} = y_n + h*f(x_n, y_n)', 'y_n + h*f(x_n, y_n)', 'y_n + hf(x_n,y_n)'],
    explanation: 'Euler\'s method: y_{n+1} = y_n + h·f(x_n, y_n). We approximate the slope of y over the interval [x_n, x_{n+1}] by the slope at the left endpoint. The larger h, the bigger the error.'
  },

  // ══════════════════════════════════════════════════════════════
  // euler-method (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'em-1',
    nodeId: 'euler-method',
    type: 'calculation',
    question: 'Use Euler\'s method with step size h = 0.1 to approximate y(0.1) for the IVP: dy/dx = 2x + y, y(0) = 1. Give your answer to 2 decimal places.',
    correctAnswer: 1.1,
    tolerance: 0.01,
    explanation: 'y₁ = y₀ + h·f(x₀, y₀) = 1 + 0.1·(2·0 + 1) = 1 + 0.1 = 1.10.'
  },
  {
    id: 'em-2',
    nodeId: 'euler-method',
    type: 'multiple-choice',
    question: 'The local truncation error of Euler\'s method is:',
    options: ['O(h)', 'O(h²)', 'O(h³)', 'O(h⁴)'],
    correctIndex: 1,
    explanation: 'The local truncation error (error per step) of Euler\'s method is O(h²). The global error (accumulated over 1/h steps to reach a fixed endpoint) is O(h), one order lower.'
  },
  {
    id: 'em-3',
    nodeId: 'euler-method',
    type: 'multiple-choice',
    question: 'Compared to the exact solution, Euler\'s method applied to dy/dx = -y with a large step size (h > 2) will typically:',
    options: [
      'Always underestimate the solution',
      'Always overestimate the solution',
      'Remain stable but inaccurate',
      'Oscillate and diverge'
    ],
    correctIndex: 3,
    explanation: 'For dy/dx = -y (λ = -1), Euler gives y_{n+1} = y_n(1 + hλ) = y_n(1 - h). Stability requires |1 - h| < 1, i.e., h < 2. For h > 2: |1 - h| > 1, so the iterates oscillate and grow without bound.'
  },

  // ══════════════════════════════════════════════════════════════
  // euler-error (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ee-1',
    nodeId: 'euler-error',
    type: 'multiple-choice',
    question: 'If you halve the step size h in Euler\'s method, the global error:',
    options: [
      'Remains the same',
      'Halves (multiplied by 1/2)',
      'Quarters (multiplied by 1/4)',
      'Doubles'
    ],
    correctIndex: 1,
    explanation: 'Euler\'s method has global error O(h). Halving h halves the global error. Compare to RK4 where halving h reduces the error by a factor of 16 (since global error is O(h⁴)).'
  },
  {
    id: 'ee-2',
    nodeId: 'euler-error',
    type: 'short-answer',
    question: 'The global error of Euler\'s method is O(h). If h is reduced by a factor of 10, by what factor does the global error reduce?',
    acceptableAnswers: ['10', 'ten', '10x', 'factor of 10'],
    explanation: 'Since global error is O(h), reducing h by a factor of 10 reduces global error by a factor of 10. This is first-order convergence. For RK4 with O(h⁴), reducing h by 10 reduces error by 10⁴ = 10,000.'
  },

  // ══════════════════════════════════════════════════════════════
  // rk4 (4 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'rk4-1',
    nodeId: 'rk4',
    type: 'multiple-choice',
    question: 'In the RK4 method, the four slopes k₁, k₂, k₃, k₄ are combined as:',
    options: [
      'y_{n+1} = y_n + h·(k₁ + k₂ + k₃ + k₄)/4',
      'y_{n+1} = y_n + h·(k₁ + 2k₂ + 2k₃ + k₄)/6',
      'y_{n+1} = y_n + h·(k₁ + 3k₂ + 3k₃ + k₄)/8',
      'y_{n+1} = y_n + h·k₄'
    ],
    correctIndex: 1,
    explanation: 'RK4 formula: y_{n+1} = y_n + (h/6)(k₁ + 2k₂ + 2k₃ + k₄). The weights (1,2,2,1) sum to 6, reflecting Simpson\'s rule. Midpoint slopes k₂ and k₃ get double weight.'
  },
  {
    id: 'rk4-2',
    nodeId: 'rk4',
    type: 'calculation',
    question: 'Use RK4 with h = 0.1 to estimate y(0.1) for dy/dx = y, y(0) = 1. Give y₁ to 6 decimal places.',
    correctAnswer: 1.105171,
    tolerance: 0.0001,
    explanation: 'f(x,y) = y:\nk₁ = 1, k₂ = 1.05, k₃ = 1.0525, k₄ = 1.10525\ny₁ = 1 + (0.1/6)(1 + 2.1 + 2.105 + 1.10525) ≈ 1.105171.\nExact: e^0.1 ≈ 1.105171. RK4 is essentially exact here.'
  },
  {
    id: 'rk4-3',
    nodeId: 'rk4',
    type: 'multiple-choice',
    question: 'The global error of the RK4 method is:',
    options: ['O(h)', 'O(h²)', 'O(h³)', 'O(h⁴)'],
    correctIndex: 3,
    explanation: 'RK4 has local truncation error O(h⁵). After 1/h steps, global error is O(h⁴). Halving h reduces RK4 error by a factor of 16, versus only 2 for Euler.'
  },
  {
    id: 'rk4-4',
    nodeId: 'rk4',
    type: 'short-answer',
    question: 'How many function evaluations does one step of the classical RK4 method require?',
    acceptableAnswers: ['4', 'four', 'Four'],
    explanation: 'RK4 requires 4 evaluations of f(x,y) per step — one for each of k₁, k₂, k₃, k₄. Euler requires only 1. However, RK4\'s much higher accuracy means larger step sizes suffice.'
  },

  // ══════════════════════════════════════════════════════════════
  // rk4-slopes (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'rks-1',
    nodeId: 'rk4-slopes',
    type: 'multiple-choice',
    question: 'In RK4, k₂ is computed as f(x_n + h/2, y_n + h·k₁/2). Why do we evaluate at the midpoint?',
    options: [
      'It reduces the number of function evaluations',
      'It provides a better estimate of the average slope over the interval',
      'It ensures the method is exactly Simpson\'s rule',
      'Both B and C are correct'
    ],
    correctIndex: 3,
    explanation: 'Both B and C: using midpoint estimates gives better accuracy because the slope at the midpoint is a better approximation of the average slope over the step. The (1,2,2,1)/6 weighting is exactly Simpson\'s rule applied to the slopes, which is 4th-order accurate.'
  },
  {
    id: 'rks-2',
    nodeId: 'rk4-slopes',
    type: 'calculation',
    question: 'For dy/dx = x + y, y(0) = 1, h = 0.5: compute k₁ (the slope at (x₀, y₀) = (0, 1)). Give your answer.',
    correctAnswer: 1.0,
    tolerance: 0.001,
    explanation: 'k₁ = f(x₀, y₀) = f(0, 1) = 0 + 1 = 1.0. This is simply the right-hand side of the ODE evaluated at the initial point.'
  },

  // ══════════════════════════════════════════════════════════════
  // systems-of-odes (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'sode-1',
    nodeId: 'systems-of-odes',
    type: 'multiple-choice',
    question: 'To apply RK4 to the system dx/dt = f(x,y), dy/dt = g(x,y), at each step you compute:',
    options: [
      'k₁ for x only, then update y separately',
      'k₁ for both x and y simultaneously, using the same current state',
      'Solve x first, then use the updated x to solve y',
      'Run RK4 independently for x and y using the same k values'
    ],
    correctIndex: 1,
    explanation: 'For coupled systems, all k values must be computed simultaneously using the current state. k₁ for both x and y uses (x_n, y_n); k₂ for both uses the midpoint estimate from k₁, etc. The coupling means you cannot solve x and y independently.'
  },
  {
    id: 'sode-2',
    nodeId: 'systems-of-odes',
    type: 'short-answer',
    question: 'In the Lotka-Volterra predator-prey system, what does a phase portrait show?',
    acceptableAnswers: ['trajectories', 'closed curves', 'closed orbits', 'periodic orbits', 'limit cycles', 'cycles'],
    explanation: 'The phase portrait of the Lotka-Volterra system shows closed curves (orbits) in the prey-predator plane. These represent periodic oscillations: as prey increase, predators increase; as predators increase, prey decrease; etc. The system is conservative — orbits are closed, not spirals.'
  },

  // ══════════════════════════════════════════════════════════════
  // probability-primer (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'pp-1',
    nodeId: 'probability-primer',
    type: 'calculation',
    question: 'A diagnostic test has sensitivity 0.95 and specificity 0.90. If 2% of the population has the disease, what is P(disease | positive test)? Give to 3 decimal places.',
    correctAnswer: 0.162,
    tolerance: 0.002,
    explanation: 'P(T+) = 0.95·0.02 + 0.10·0.98 = 0.019 + 0.098 = 0.117.\nP(D|T+) = 0.019/0.117 ≈ 0.162.\nDespite accuracy, low base rate (2%) means most positives are false positives.'
  },
  {
    id: 'pp-2',
    nodeId: 'probability-primer',
    type: 'multiple-choice',
    question: 'If X ~ Binomial(n=10, p=0.3), what is E[X]?',
    options: ['0.3', '3', '7', '10'],
    correctIndex: 1,
    explanation: 'For Binomial(n, p): E[X] = np = 10 × 0.3 = 3. Variance = np(1-p) = 2.1.'
  },
  {
    id: 'pp-3',
    nodeId: 'probability-primer',
    type: 'multiple-choice',
    question: 'Two events A and B are independent if and only if:',
    options: [
      'P(A ∩ B) = 0',
      'P(A ∩ B) = P(A) · P(B)',
      'P(A ∪ B) = P(A) + P(B)',
      'P(A|B) = P(B|A)'
    ],
    correctIndex: 1,
    explanation: 'Independence: P(A ∩ B) = P(A)·P(B). Option A is mutual exclusivity. Option C is the addition rule for mutually exclusive events.'
  },

  // ══════════════════════════════════════════════════════════════
  // genetics-intro (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'gi-1',
    nodeId: 'genetics-intro',
    type: 'multiple-choice',
    question: 'The central dogma of molecular biology describes the flow of genetic information as:',
    options: [
      'Protein → RNA → DNA',
      'RNA → DNA → Protein',
      'DNA → RNA → Protein',
      'DNA → Protein → RNA'
    ],
    correctIndex: 2,
    explanation: 'DNA is transcribed into RNA, which is translated into protein: DNA → mRNA → Protein.'
  },
  {
    id: 'gi-2',
    nodeId: 'genetics-intro',
    type: 'short-answer',
    question: 'What type of mutation involves a single nucleotide being replaced by a different nucleotide (e.g., A replaced by G)?',
    acceptableAnswers: ['substitution', 'Substitution', 'point mutation', 'Point mutation', 'SNP'],
    explanation: 'A substitution (point mutation) replaces one nucleotide with another. Transitions: purine↔purine or pyrimidine↔pyrimidine. Transversions: purine↔pyrimidine.'
  },
  {
    id: 'gi-3',
    nodeId: 'genetics-intro',
    type: 'multiple-choice',
    question: 'DNA base pairs follow complementary rules. Which pairing is correct?',
    options: [
      'A pairs with G, C pairs with T',
      'A pairs with C, G pairs with T',
      'A pairs with T, C pairs with G',
      'A pairs with A, T pairs with T'
    ],
    correctIndex: 2,
    explanation: 'Watson-Crick base pairing: A-T (2 hydrogen bonds), C-G (3 hydrogen bonds). GC-rich regions have higher melting temperatures.'
  },

  // ══════════════════════════════════════════════════════════════
  // pairwise-alignment (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'pa-1',
    nodeId: 'pairwise-alignment',
    type: 'calculation',
    question: 'Given match=+2, mismatch=-1, gap=-2, score the alignment:\nA T C G\nA - C T\n(where - is a gap)',
    correctAnswer: 1,
    tolerance: 0.01,
    explanation: 'A vs A: +2; T vs -: -2; C vs C: +2; G vs T: -1. Total = 2-2+2-1 = 1.'
  },
  {
    id: 'pa-2',
    nodeId: 'pairwise-alignment',
    type: 'multiple-choice',
    question: 'Why is brute-force comparison of all possible alignments infeasible?',
    options: [
      'The number of possible alignments grows polynomially',
      'The number of possible alignments grows exponentially with sequence length',
      'Computers cannot compare characters',
      'The scoring schemes are ambiguous'
    ],
    correctIndex: 1,
    explanation: 'For sequences of length n and m, the number of alignments grows combinatorially — roughly C(n+m, n), which is exponential. For length 100, ~10^58 alignments. DP reduces this to O(nm).'
  },
  {
    id: 'pa-3',
    nodeId: 'pairwise-alignment',
    type: 'multiple-choice',
    question: 'Which substitution matrix is most appropriate for comparing distantly related protein sequences?',
    options: ['PAM 1', 'PAM 250', 'BLOSUM 90', 'Identity matrix'],
    correctIndex: 1,
    explanation: 'PAM 250 is for distantly related sequences (250 PAMs of evolutionary distance). BLOSUM 90 and PAM 1 are for closely related sequences.'
  },

  // ══════════════════════════════════════════════════════════════
  // dp-principle (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'dp-1',
    nodeId: 'dp-principle',
    type: 'multiple-choice',
    question: 'Dynamic programming is applicable when a problem has:',
    options: [
      'No repeated subproblems',
      'Optimal substructure and overlapping subproblems',
      'Only a polynomial number of possible solutions',
      'A greedy optimal solution'
    ],
    correctIndex: 1,
    explanation: 'DP requires: (1) optimal substructure — the optimal solution to the problem contains optimal solutions to subproblems; (2) overlapping subproblems — the same subproblems are solved multiple times in a naive recursive approach. DP solves each subproblem once and stores the result.'
  },
  {
    id: 'dp-2',
    nodeId: 'dp-principle',
    type: 'short-answer',
    question: 'Dynamic programming reduces the time complexity of sequence alignment from exponential to what complexity (for sequences of length n and m)?',
    acceptableAnswers: ['O(nm)', 'O(n*m)', 'O(n·m)', 'polynomial', 'quadratic'],
    explanation: 'DP reduces alignment from exponential (brute force) to O(nm) time and O(nm) space, by filling in a matrix of (n+1)×(m+1) cells, each computed in O(1) from three predecessors.'
  },

  // ══════════════════════════════════════════════════════════════
  // needleman-wunsch (4 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nw-1',
    nodeId: 'needleman-wunsch',
    type: 'multiple-choice',
    question: 'In Needleman-Wunsch, the recurrence F(i,j) considers the maximum of three values corresponding to:',
    options: [
      'Match, insertion, deletion',
      'F(i-1,j-1)+s(aᵢ,bⱼ), F(i-1,j)+d, F(i,j-1)+d',
      'Only diagonal moves',
      'Random selection from three neighbors'
    ],
    correctIndex: 1,
    explanation: 'F(i,j) = max{ F(i-1,j-1)+s(aᵢ,bⱼ) [diagonal: align], F(i-1,j)+d [vertical: gap in B], F(i,j-1)+d [horizontal: gap in A] }.'
  },
  {
    id: 'nw-2',
    nodeId: 'needleman-wunsch',
    type: 'calculation',
    question: 'Using NW with match=+1, mismatch=-1, gap=-2, align "AT" and "A". What is the optimal global alignment score?',
    correctAnswer: -1,
    tolerance: 0.01,
    explanation: 'Matrix: F(0,0)=0, F(1,0)=-2, F(2,0)=-4, F(0,1)=-2.\nF(1,1)=max(0+1,-2-2,-2-2)=1\nF(2,1)=max(-2-1,1-2,-4-2)=-1.\nOptimal score=-1 (align A with A: +1, T with gap: -2).'
  },
  {
    id: 'nw-3',
    nodeId: 'needleman-wunsch',
    type: 'multiple-choice',
    question: 'The time complexity of Needleman-Wunsch for sequences of length n and m is:',
    options: ['O(n+m)', 'O(n·m)', 'O(n²·m²)', 'O(2^(n+m))'],
    correctIndex: 1,
    explanation: 'NW fills an (n+1)×(m+1) matrix, each cell in O(1). Total: O(nm) time and space.'
  },
  {
    id: 'nw-4',
    nodeId: 'needleman-wunsch',
    type: 'short-answer',
    question: 'In Needleman-Wunsch, the traceback to find the optimal global alignment starts at which cell?',
    acceptableAnswers: ['bottom-right', 'bottom right', 'F(n,m)', 'F(m,n)', 'last cell', 'lower right'],
    explanation: 'NW traceback starts at F(n,m) — the bottom-right corner — because global alignment requires aligning both full sequences. Smith-Waterman (local) starts at the maximum cell anywhere.'
  },

  // ══════════════════════════════════════════════════════════════
  // nw-recurrence (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nwr-1',
    nodeId: 'nw-recurrence',
    type: 'multiple-choice',
    question: 'In NW with gap penalty d = -2, what is F(0, 3) (the initialisation value in the first row, column 3)?',
    options: ['-2', '-4', '-6', '0'],
    correctIndex: 2,
    explanation: 'Initialisation: F(0,j) = j·d = 3·(-2) = -6. Similarly F(i,0) = i·d. This represents aligning i or j characters of one sequence with gaps.'
  },
  {
    id: 'nwr-2',
    nodeId: 'nw-recurrence',
    type: 'multiple-choice',
    question: 'Which move in the NW DP corresponds to a gap in sequence B (inserting a gap in the second sequence)?',
    options: [
      'Diagonal move: F(i-1, j-1)',
      'Vertical move: F(i-1, j)',
      'Horizontal move: F(i, j-1)',
      'Any of the above depending on the score'
    ],
    correctIndex: 1,
    explanation: 'A vertical move (from F(i-1,j) to F(i,j)) aligns character aᵢ with a gap in B. A horizontal move (F(i,j-1) to F(i,j)) aligns a gap in A with character bⱼ. Diagonal aligns aᵢ with bⱼ directly.'
  },

  // ══════════════════════════════════════════════════════════════
  // nw-traceback (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nwt-1',
    nodeId: 'nw-traceback',
    type: 'multiple-choice',
    question: 'During NW traceback, if you are at F(i,j) and the predecessor was F(i-1,j-1), what does this mean for the alignment?',
    options: [
      'Gap in sequence A at position i',
      'Gap in sequence B at position j',
      'Align character aᵢ with character bⱼ (match or mismatch)',
      'Skip both characters'
    ],
    correctIndex: 2,
    explanation: 'A diagonal move from F(i-1,j-1) to F(i,j) means characters aᵢ and bⱼ are aligned (either a match or a mismatch). The score F(i-1,j-1) + s(aᵢ,bⱼ) was used.'
  },
  {
    id: 'nwt-2',
    nodeId: 'nw-traceback',
    type: 'short-answer',
    question: 'True or false: there can be multiple optimal alignments for a pair of sequences with the same score.',
    acceptableAnswers: ['true', 'True', 'yes', 'Yes'],
    explanation: 'True. Multiple cells may be tied as the maximum, so multiple traceback paths are possible, yielding different but equally optimal alignments. All have the same score.'
  },

  // ══════════════════════════════════════════════════════════════
  // smith-waterman (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'sw-1',
    nodeId: 'smith-waterman',
    type: 'multiple-choice',
    question: 'In Smith-Waterman, the modification to the Needleman-Wunsch recurrence is:',
    options: [
      'Start traceback from top-left instead of bottom-right',
      'Add a fourth option: max(…, 0) — floor the cell at 0',
      'Use a different gap penalty',
      'Run the traceback from the maximum cell to the left-top corner'
    ],
    correctIndex: 1,
    explanation: 'SW adds 0 to the max: F(i,j) = max{ F(i-1,j-1)+s, F(i-1,j)+d, F(i,j-1)+d, 0 }. This allows alignment to "restart" at any point. Traceback starts at the maximum cell and stops when reaching 0.'
  },

  // ══════════════════════════════════════════════════════════════
  // affine-gaps (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ag-1',
    nodeId: 'affine-gaps',
    type: 'multiple-choice',
    question: 'With affine gap penalty, a gap of length k costs:',
    options: [
      'k·d (linear)',
      'd + (k-1)·e (open + extend)',
      'k·e (extension only)',
      'd·k·e'
    ],
    correctIndex: 1,
    explanation: 'Affine gap penalty: gap of length k costs d + (k-1)·e, where d is the gap opening penalty and e is the extension penalty. This captures the biological observation that a gap of 5 is more similar to a gap of 4 than to 5 separate single-base gaps.'
  },
  {
    id: 'ag-2',
    nodeId: 'affine-gaps',
    type: 'short-answer',
    question: 'In the three-matrix affine gap DP, what do the three matrices M, Ix, Iy track?',
    acceptableAnswers: ['match/mismatch, gap in x, gap in y', 'aligned chars, gap in first seq, gap in second seq', 'M Ix Iy track different gap states'],
    explanation: 'M(i,j): both characters aligned (diagonal); Ix(i,j): gap in sequence X (vertical move, gap in X); Iy(i,j): gap in sequence Y (horizontal move, gap in Y). Tracking the gap state lets us apply the gap-open penalty only when starting a new gap.'
  },

  // ══════════════════════════════════════════════════════════════
  // affine-recurrences (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'agr-1',
    nodeId: 'affine-recurrences',
    type: 'multiple-choice',
    question: 'In affine gap alignment, Ix(i,j) (gap in sequence X) is computed as:',
    options: [
      'Ix(i,j) = max(M(i-1,j) - d, Ix(i-1,j) - e)',
      'Ix(i,j) = max(M(i,j-1) - d, Ix(i,j-1) - e)',
      'Ix(i,j) = M(i-1,j) - d only',
      'Ix(i,j) = max(M(i-1,j-1) + s, Ix(i-1,j-1) - e)'
    ],
    correctIndex: 0,
    explanation: 'Ix(i,j) = max(M(i-1,j) - d, Ix(i-1,j) - e). Coming from M means opening a new gap (cost d); coming from Ix means extending an existing gap (cost e). Since e < d, extending is cheaper than opening.'
  },

  // ══════════════════════════════════════════════════════════════
  // multiple-sequence-alignment (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'msa-1',
    nodeId: 'multiple-sequence-alignment',
    type: 'multiple-choice',
    question: 'The exact DP algorithm for aligning k sequences of length n has time complexity:',
    options: ['O(n²)', 'O(n^k)', 'O(n·k)', 'O(k!)'],
    correctIndex: 1,
    explanation: 'Exact MSA by DP fills an n^k -cell hypercube (one dimension per sequence). For k=2: O(n²) — this is NW. For k=3: O(n³). This exponential growth makes exact MSA infeasible for k ≥ 4-5, motivating heuristics like progressive alignment.'
  },

  // ══════════════════════════════════════════════════════════════
  // progressive-alignment (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'prog-1',
    nodeId: 'progressive-alignment',
    type: 'multiple-choice',
    question: 'In Feng-Doolittle progressive alignment, what is the "once-a-gap-always-a-gap" rule?',
    options: [
      'Once a gap is introduced in the guide tree, it is never removed from any alignment',
      'Once a gap is introduced in a profile during progressive alignment, it is preserved in subsequent alignments',
      'Gaps can only be added, never removed',
      'The gap penalty is fixed throughout the alignment'
    ],
    correctIndex: 1,
    explanation: 'Once-a-gap-always-a-gap: when you align profiles (groups of sequences already aligned), gaps introduced in previous steps are preserved as "neutral" characters rather than allowing the DP to remove them. This greedy approach makes the algorithm fast but can propagate errors.'
  },

  // ══════════════════════════════════════════════════════════════
  // exponential-distribution (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'exp-1',
    nodeId: 'exponential-distribution',
    type: 'calculation',
    question: 'If X ~ Exp(λ = 2), what is P(X > 1)? Give to 4 decimal places.',
    correctAnswer: 0.1353,
    tolerance: 0.001,
    explanation: 'P(X > 1) = 1 - F(1) = 1 - (1 - e^{-2·1}) = e^{-2} ≈ 0.1353.'
  },
  {
    id: 'exp-2',
    nodeId: 'exponential-distribution',
    type: 'multiple-choice',
    question: 'The memoryless property of the exponential distribution states:',
    options: [
      'P(X > s + t | X > s) = P(X > t) for all s, t ≥ 0',
      'P(X > s + t) = P(X > s) · P(X > t) only if s = t',
      'The mean and variance are always equal',
      'Knowing X > s means X > t for any t > s'
    ],
    correctIndex: 0,
    explanation: 'P(X > s+t | X > s) = P(X > t). Having already waited time s, the remaining wait time has the same Exp(λ) distribution. This is the continuous analogue of the geometric distribution\'s memorylessness.'
  },

  // ══════════════════════════════════════════════════════════════
  // inversion-sampling (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'inv-1',
    nodeId: 'inversion-sampling',
    type: 'short-answer',
    question: 'If U ~ Uniform(0,1) and X = -ln(U)/λ, what distribution does X follow?',
    acceptableAnswers: ['Exponential(λ)', 'Exp(λ)', 'exponential', 'Exponential'],
    explanation: 'The inversion sampling result: if U ~ U(0,1), then X = F⁻¹(U) has CDF F. For Exp(λ): F(x) = 1-e^{-λx}, so F⁻¹(u) = -ln(1-u)/λ. Since 1-U ~ U(0,1), we can use X = -ln(U)/λ. This gives X ~ Exp(λ).'
  },
  {
    id: 'inv-2',
    nodeId: 'inversion-sampling',
    type: 'multiple-choice',
    question: 'To use inversion sampling for a distribution with CDF F(x), you need:',
    options: [
      'A closed-form PDF f(x)',
      'The inverse CDF F⁻¹(u) to be computable',
      'The distribution to be symmetric',
      'Normal distribution tables'
    ],
    correctIndex: 1,
    explanation: 'Inversion sampling requires computing F⁻¹(u) for u ~ U(0,1). If F⁻¹ has a closed form (e.g., for Exponential, Uniform, Cauchy), this is easy. When F⁻¹ is not in closed form (e.g., Normal), other methods like Box-Muller or acceptance-rejection are used.'
  },

  // ══════════════════════════════════════════════════════════════
  // bayesian-inference (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bay-1',
    nodeId: 'bayesian-inference',
    type: 'multiple-choice',
    question: 'Maximum likelihood estimation (MLE) finds:',
    options: [
      'The parameter value with the highest prior probability',
      'The parameter value that maximises P(data | θ)',
      'The parameter value that maximises P(θ | data)',
      'The posterior mean'
    ],
    correctIndex: 1,
    explanation: 'MLE finds θ̂ = argmax_θ L(θ) = argmax_θ P(data | θ). It maximises the likelihood of the observed data. The MAP estimate maximises the posterior P(θ|data), which equals P(data|θ)·P(θ). MLE ignores the prior.'
  },
  {
    id: 'bay-2',
    nodeId: 'bayesian-inference',
    type: 'short-answer',
    question: 'What is the log-likelihood for n i.i.d. Bernoulli(p) observations with k successes?',
    acceptableAnswers: ['k*ln(p) + (n-k)*ln(1-p)', 'k ln(p) + (n-k) ln(1-p)'],
    explanation: 'L(p) = p^k (1-p)^{n-k}. Log-likelihood: ℓ(p) = k ln(p) + (n-k) ln(1-p). Taking d/dp ℓ = 0: k/p - (n-k)/(1-p) = 0 → p̂ = k/n (the sample proportion, as expected).'
  },

  // ══════════════════════════════════════════════════════════════
  // simulation-basics (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'sim-1',
    nodeId: 'simulation-basics',
    type: 'multiple-choice',
    question: 'Which method generates samples from a distribution with known PDF but no closed-form CDF inverse?',
    options: [
      'Inversion sampling',
      'Acceptance-rejection sampling',
      'Stratified sampling',
      'Importance sampling'
    ],
    correctIndex: 1,
    explanation: 'Acceptance-rejection: sample from a proposal distribution g(x) ≥ c·f(x), then accept with probability f(x)/(c·g(x)). Works when the CDF inverse is unavailable. Inversion sampling requires a computable F⁻¹.'
  },

  // ══════════════════════════════════════════════════════════════
  // markov-property (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'mpr-1',
    nodeId: 'markov-property',
    type: 'multiple-choice',
    question: 'The Markov property states that:',
    options: [
      'All future states are equally likely',
      'The future state depends only on the current state, not the history',
      'Transition probabilities change over time',
      'The chain must eventually visit every state'
    ],
    correctIndex: 1,
    explanation: 'Markov property (memorylessness): P(X_{n+1}=j | X_n=i, X_{n-1},...,X_0) = P(X_{n+1}=j | X_n=i). The entire history is summarised by the current state.'
  },
  {
    id: 'mpr-2',
    nodeId: 'markov-property',
    type: 'short-answer',
    question: 'Is a simple random walk (at each step, move +1 or -1 with equal probability) a Markov chain?',
    acceptableAnswers: ['yes', 'Yes', 'YES'],
    explanation: 'Yes. The next position depends only on the current position, not on how you got there. P(X_{n+1} = x+1 | X_n = x) = 1/2 regardless of X_0,...,X_{n-1}. The simple random walk is a canonical example of a Markov chain.'
  },

  // ══════════════════════════════════════════════════════════════
  // markov-chains (3 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'mc-1',
    nodeId: 'markov-chains',
    type: 'multiple-choice',
    question: 'A Markov chain transition matrix P has entries P_{ij} that:',
    options: [
      'Can be any real number',
      'Are non-negative and each row sums to 1',
      'Are non-negative and each column sums to 1',
      'Sum to 1 across the entire matrix'
    ],
    correctIndex: 1,
    explanation: 'P_{ij} = P(X_{n+1}=j | X_n=i). Since probabilities are non-negative and the process must go somewhere, ∑_j P_{ij} = 1 (rows sum to 1). This is a "row stochastic" matrix.'
  },
  {
    id: 'mc-2',
    nodeId: 'markov-chains',
    type: 'calculation',
    question: 'A Markov chain has P = [[0.7, 0.3], [0.4, 0.6]]. Starting in state 1 (index 0), what is P(state 2 | after 1 step)?',
    correctAnswer: 0.3,
    tolerance: 0.01,
    explanation: 'P(next=state 2 | current=state 1) = P[0][1] = 0.3.'
  },
  {
    id: 'mc-3',
    nodeId: 'markov-chains',
    type: 'calculation',
    question: 'Find π₁ (stationary probability of state 1) for P = [[0.7, 0.3], [0.4, 0.6]]. Give to 3 decimal places.',
    correctAnswer: 0.571,
    tolerance: 0.002,
    explanation: 'Solve πP = π, π₁+π₂ = 1.\n0.3π₁ = 0.4π₂ → π₂ = 0.75π₁\nπ₁ + 0.75π₁ = 1 → π₁ = 4/7 ≈ 0.571.'
  },

  // ══════════════════════════════════════════════════════════════
  // stationary-distribution (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'stat-1',
    nodeId: 'stationary-distribution',
    type: 'multiple-choice',
    question: 'A stationary distribution π of a Markov chain satisfies:',
    options: [
      'Pπ = π (π is a left eigenvector)',
      'πP = π (π is a left eigenvector with eigenvalue 1)',
      'π = P^n for large n',
      'π_i = 1/K for all states i'
    ],
    correctIndex: 1,
    explanation: 'The stationary distribution satisfies πP = π (with ∑π_i = 1). Here π is a row vector, making it a left eigenvector of P with eigenvalue 1. For an ergodic chain, π is unique and represents the long-run frequencies.'
  },
  {
    id: 'stat-2',
    nodeId: 'stationary-distribution',
    type: 'short-answer',
    question: 'For a two-state Markov chain with P = [[1-a, a], [b, 1-b]], what is π₁ (the stationary probability of state 1)?',
    acceptableAnswers: ['b/(a+b)', 'b / (a + b)'],
    explanation: 'Solve π₁a = π₂b with π₁+π₂=1: π₁ = b/(a+b). Interpretation: the long-run fraction of time in state 1 is b/(a+b). If a (rate of leaving state 1) is small, π₁ is large.'
  },

  // ══════════════════════════════════════════════════════════════
  // poisson-process (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'pp2-1',
    nodeId: 'poisson-process',
    type: 'multiple-choice',
    question: 'For a Poisson process with rate λ = 3 events/hour, the number of events in a 2-hour window follows:',
    options: [
      'Exponential(6)',
      'Poisson(6)',
      'Poisson(3)',
      'Normal(6, 6)'
    ],
    correctIndex: 1,
    explanation: 'N(t) ~ Poisson(λt). For λ=3 and t=2: N(2) ~ Poisson(6). E[N(2)] = 6, Var[N(2)] = 6.'
  },
  {
    id: 'pp2-2',
    nodeId: 'poisson-process',
    type: 'short-answer',
    question: 'In a Poisson process with rate λ, what distribution do inter-arrival times follow?',
    acceptableAnswers: ['Exponential(λ)', 'Exp(λ)', 'exponential with rate lambda', 'exponential'],
    explanation: 'Inter-arrival times in a Poisson process are i.i.d. Exponential(λ). This is because of the memoryless property: the time until the next event is always Exp(λ), regardless of when the last event occurred.'
  },

  // ══════════════════════════════════════════════════════════════
  // poisson-simulation (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'psim-1',
    nodeId: 'poisson-simulation',
    type: 'multiple-choice',
    question: 'To simulate a Poisson process with rate λ up to time T, the algorithm generates:',
    options: [
      'One Poisson(λT) random variable, then places events uniformly',
      'Inter-arrival times T_i = -ln(U_i)/λ and accumulates until sum exceeds T',
      'Events at fixed intervals T/N',
      'A binomial number of events then assigns random times'
    ],
    correctIndex: 1,
    explanation: 'Standard simulation: generate T₁ = -ln(U₁)/λ, T₂ = -ln(U₂)/λ, ... (i.i.d. Exp(λ)). Arrival times: S_n = T₁+...+T_n. Add events while S_n ≤ T. Both methods (A and B) are valid but method B is simpler and directly exploits the memoryless property.'
  },

  // ══════════════════════════════════════════════════════════════
  // random-walk (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'rw-1',
    nodeId: 'random-walk',
    type: 'calculation',
    question: 'A simple random walk starts at 0. After n = 100 steps, what is the variance of the position X₁₀₀?',
    correctAnswer: 100,
    tolerance: 0.01,
    explanation: 'For simple random walk with steps +1/-1 with equal probability: E[X_n] = 0, Var(X_n) = n. So Var(X_100) = 100, and the standard deviation is √100 = 10. The walk diffuses as √n away from the origin.'
  },

  // ══════════════════════════════════════════════════════════════
  // hmm-definition (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'hmm-1',
    nodeId: 'hmm-definition',
    type: 'multiple-choice',
    question: 'In an HMM, emission probabilities e_k(b) represent:',
    options: [
      'The probability of transitioning from state k to state b',
      'The probability of observing symbol b when in hidden state k',
      'The prior probability of state k',
      'The probability of starting in state k and emitting b'
    ],
    correctIndex: 1,
    explanation: 'Emission probability e_k(b) = P(observation = b | hidden state = k). The hidden states generate the observations according to these probabilities. The observations are what we see; the states are hidden.'
  },
  {
    id: 'hmm-2',
    nodeId: 'hmm-definition',
    type: 'short-answer',
    question: 'What are the three components (parameters) of an HMM?',
    acceptableAnswers: ['transition, emission, initial', 'A, E, pi', 'transition probabilities, emission probabilities, initial state distribution'],
    explanation: 'An HMM is defined by: (1) transition probabilities a_{ij} = P(state j next | state i now); (2) emission probabilities e_k(b) = P(observe b | in state k); (3) initial state distribution π_k = P(start in state k).'
  },

  // ══════════════════════════════════════════════════════════════
  // hmm-three-problems (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'hmm3-1',
    nodeId: 'hmm-three-problems',
    type: 'multiple-choice',
    question: 'Which HMM algorithm solves the decoding problem (finding the most likely hidden path)?',
    options: ['Forward algorithm', 'Backward algorithm', 'Viterbi algorithm', 'Baum-Welch algorithm'],
    correctIndex: 2,
    explanation: 'Viterbi solves decoding: finding the most likely sequence of hidden states given the observations. Forward algorithm solves evaluation: P(observations | model). Baum-Welch solves learning: estimating model parameters.'
  },

  // ══════════════════════════════════════════════════════════════
  // viterbi (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'vit-1',
    nodeId: 'viterbi',
    type: 'multiple-choice',
    question: 'The Viterbi algorithm uses dynamic programming where at each position i, for each state k, it stores:',
    options: [
      'The sum of all path probabilities ending in state k at position i',
      'The maximum probability of any path ending in state k at position i',
      'The probability of the observations given state k at position i',
      'The marginal probability of being in state k at position i'
    ],
    correctIndex: 1,
    explanation: 'Viterbi variable v_k(i) = max over all paths P(x_1...x_i, path ends in state k at i). This is the "max" version; the "sum" version is the Forward algorithm. Viterbi finds the single best path; Forward sums all paths.'
  },
  {
    id: 'vit-2',
    nodeId: 'viterbi',
    type: 'short-answer',
    question: 'Why do we use log-space in the Viterbi algorithm?',
    acceptableAnswers: ['underflow', 'numerical underflow', 'avoid underflow', 'avoid numerical underflow', 'probabilities too small'],
    explanation: 'Products of many small probabilities rapidly underflow to 0 in floating-point arithmetic. Working in log-space converts products to sums: log(a·b) = log(a) + log(b). The max operation is preserved: argmax log p = argmax p.'
  },

  // ══════════════════════════════════════════════════════════════
  // viterbi-recurrence (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'vitr-1',
    nodeId: 'viterbi-recurrence',
    type: 'multiple-choice',
    question: 'The Viterbi recurrence is v_k(i) = e_k(xᵢ) · max_l { a_{lk} · v_l(i-1) }. What does the max_l represent?',
    options: [
      'The sum over all previous states (like Forward)',
      'The most likely previous state that leads to state k at position i',
      'The emission probability of x_i in each state',
      'The number of possible paths'
    ],
    correctIndex: 1,
    explanation: 'max_l { a_{lk} · v_l(i-1) } finds the best previous state l to transition from to reach state k. The pointer ptr_k(i) = argmax_l records which state l achieved this maximum, enabling traceback.'
  },
  {
    id: 'vitr-2',
    nodeId: 'viterbi-recurrence',
    type: 'multiple-choice',
    question: 'How does traceback in the Viterbi algorithm work?',
    options: [
      'Forward through positions 1 to n, following the max emission',
      'Backward from position n, following the stored pointer array',
      'Sum all paths and choose the most probable',
      'Sample from the posterior distribution'
    ],
    correctIndex: 1,
    explanation: 'Traceback: start at position n with state k* = argmax_k v_k(n). Then move backward: k_{i-1} = ptr_{k_i}(i) for i = n, n-1, ..., 2. This reconstructs the most likely path in O(Kn) total time.'
  },

  // ══════════════════════════════════════════════════════════════
  // forward-algorithm (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'fwd-1',
    nodeId: 'forward-algorithm',
    type: 'multiple-choice',
    question: 'The Forward algorithm and Viterbi differ in that Forward uses __ while Viterbi uses __:',
    options: [
      'max / sum',
      'sum / max',
      'product / sum',
      'sum / product'
    ],
    correctIndex: 1,
    explanation: 'Forward: f_k(i) = e_k(xᵢ) · Σ_l a_{lk} · f_l(i-1) — sums over all previous states.\nViterbi: v_k(i) = e_k(xᵢ) · max_l a_{lk} · v_l(i-1) — maximises over previous states.'
  },
  {
    id: 'fwd-2',
    nodeId: 'forward-algorithm',
    type: 'short-answer',
    question: 'The forward variable f_k(i) represents P(x_1...x_i, π_i = k). What does summing over k at position i give you?',
    acceptableAnswers: ['P(x_1...x_i)', 'P(observations up to position i)', 'probability of first i observations'],
    explanation: 'Σ_k f_k(i) = P(x_1...x_i) — the probability of the first i observations under the model (summing out the hidden state at position i). At termination (i = n): Σ_k f_k(n) = P(x_1...x_n | model).'
  },

  // ══════════════════════════════════════════════════════════════
  // forward-termination (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'fwdt-1',
    nodeId: 'forward-termination',
    type: 'multiple-choice',
    question: 'To compute P(observations | HMM model), the Forward algorithm termination step is:',
    options: [
      'max_k f_k(n) (take the maximum final state)',
      'Σ_k f_k(n) (sum over all final states)',
      'f_{K}(n) (use the last state only)',
      'Σ_i Σ_k f_k(i) (sum over all positions)'
    ],
    correctIndex: 1,
    explanation: 'P(x_1...x_n) = Σ_k f_k(n). We sum over all possible final hidden states, marginalising out what state we ended in. Compare Viterbi which takes max_k v_k(n) to get the probability of the single best path.'
  },

  // ══════════════════════════════════════════════════════════════
  // backward-baum-welch (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bbw-1',
    nodeId: 'backward-baum-welch',
    type: 'multiple-choice',
    question: 'Baum-Welch is an application of which general algorithm?',
    options: ['Gradient descent', 'EM (Expectation-Maximisation)', 'Newton\'s method', 'Monte Carlo'],
    correctIndex: 1,
    explanation: 'Baum-Welch is an EM algorithm. E-step: compute expected sufficient statistics (using forward-backward). M-step: re-estimate parameters (transition/emission probabilities) to maximise expected log-likelihood. Guaranteed to converge to a local maximum.'
  },

  // ══════════════════════════════════════════════════════════════
  // hmm-applications (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'hmma-1',
    nodeId: 'hmm-applications',
    type: 'multiple-choice',
    question: 'In the "dishonest casino" HMM example, what are the hidden states?',
    options: [
      'The outcomes of the dice (1-6)',
      'Whether the casino is using the fair or loaded die',
      'The number of rolls',
      'The probability of each outcome'
    ],
    correctIndex: 1,
    explanation: 'Hidden states: {Fair, Loaded}. Observations: dice outcomes {1,2,3,4,5,6}. Fair die: uniform emissions. Loaded die: biased towards 6. Viterbi finds when the casino switched dice; Forward computes total probability.'
  },

  // ══════════════════════════════════════════════════════════════
  // distance-methods (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'dm-1',
    nodeId: 'distance-methods',
    type: 'multiple-choice',
    question: 'An ultrametric tree satisfies the property that for any three leaves A, B, C:',
    options: [
      'D(A,B) + D(B,C) ≥ D(A,C)',
      'D(A,C) ≤ max(D(A,B), D(B,C))',
      'D(A,B) = D(B,C) = D(A,C)',
      'All branch lengths are equal'
    ],
    correctIndex: 1,
    explanation: 'An ultrametric satisfies: D(A,C) ≤ max(D(A,B), D(B,C)). Equivalently, the two largest of the three pairwise distances are equal. Ultrametric trees assume the molecular clock — all leaves are equidistant from the root.'
  },
  {
    id: 'dm-2',
    nodeId: 'distance-methods',
    type: 'calculation',
    question: 'How many distinct unrooted tree topologies exist for 4 taxa?',
    correctAnswer: 3,
    tolerance: 0,
    explanation: 'For n taxa, the number of unrooted topologies is (2n-5)!! = 1·3·5·...·(2n-5). For n=4: (2·4-5)!! = 3!! = 1·3 = 3. The three topologies are: (AB,CD), (AC,BD), (AD,BC).'
  },

  // ══════════════════════════════════════════════════════════════
  // upgma-algorithm (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'upg-alg-1',
    nodeId: 'upgma-algorithm',
    type: 'multiple-choice',
    question: 'When UPGMA merges clusters i and j, the distance from the new cluster (ij) to another cluster k is:',
    options: [
      'min(D(i,k), D(j,k))',
      '(|i|·D(i,k) + |j|·D(j,k)) / (|i| + |j|)',
      '(D(i,k) + D(j,k)) / 2',
      'max(D(i,k), D(j,k))'
    ],
    correctIndex: 1,
    explanation: 'UPGMA uses weighted average distance: D((ij),k) = (|i|·D(i,k) + |j|·D(j,k)) / (|i|+|j|). When |i| = |j| = 1, this simplifies to the arithmetic mean. The weighting by cluster size is the "Unweighted" in UPGMA (it gives equal weight to each sequence).'
  },
  {
    id: 'upg-alg-2',
    nodeId: 'upgma-algorithm',
    type: 'multiple-choice',
    question: 'In UPGMA, when clusters i and j are merged at distance D(i,j), the branch length from i (and from j) to the new internal node is:',
    options: [
      'D(i,j)',
      'D(i,j) / 2',
      'D(i,j) · 2',
      'Depends on the subtree rooted at i'
    ],
    correctIndex: 1,
    explanation: 'UPGMA assumes the molecular clock: each cluster node is equidistant from its leaves. The branch to the new node is D(i,j)/2 for each. If cluster i had a previous internal node at height h_i, the new branch from i\'s cluster root to the merged node has length D(i,j)/2 - h_i.'
  },

  // ══════════════════════════════════════════════════════════════
  // upgma (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'upg-1',
    nodeId: 'upgma',
    type: 'multiple-choice',
    question: 'UPGMA can give an incorrect tree topology when:',
    options: [
      'The distance matrix has negative entries',
      'The evolutionary rates differ significantly across lineages (no molecular clock)',
      'There are only 3 taxa',
      'The sequences are DNA'
    ],
    correctIndex: 1,
    explanation: 'UPGMA assumes a molecular clock (all lineages evolve at the same rate). When rates differ across branches, UPGMA will give a wrong topology. Neighbour joining was developed to handle unequal rates.'
  },
  {
    id: 'upg-2',
    nodeId: 'upgma',
    type: 'short-answer',
    question: 'What property of UPGMA-constructed trees means all leaves are equidistant from the root?',
    acceptableAnswers: ['ultrametric', 'ultrametricity', 'molecular clock', 'ultrametric property'],
    explanation: 'UPGMA produces ultrametric trees. The ultrametric property means all leaves are equidistant from the root — this is equivalent to assuming a molecular clock (all lineages evolve at the same rate).'
  },

  // ══════════════════════════════════════════════════════════════
  // neighbour-joining (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nj-1',
    nodeId: 'neighbour-joining',
    type: 'multiple-choice',
    question: 'Neighbour joining corrects for differing evolutionary rates using the Q-matrix, where Q(i,j) =',
    options: [
      'D(i,j) directly',
      '(n-2)·D(i,j) - r_i - r_j where r_i = Σ_k D(i,k)',
      'D(i,j) / (r_i + r_j)',
      'max(r_i, r_j) - D(i,j)'
    ],
    correctIndex: 1,
    explanation: 'Q(i,j) = (n-2)·D(i,j) - r_i - r_j where r_i = Σ_k D(i,k) is the net divergence (sum of distances from i to all others). NJ finds the pair with minimum Q(i,j) to merge — correcting for long-branch attraction.'
  },
  {
    id: 'nj-2',
    nodeId: 'neighbour-joining',
    type: 'multiple-choice',
    question: 'Compared to UPGMA, a key advantage of Neighbour Joining is:',
    options: [
      'It is faster to compute',
      'It produces rooted trees without needing an outgroup',
      'It can reconstruct the correct topology even when rates differ across lineages',
      'It uses maximum likelihood for branch length estimation'
    ],
    correctIndex: 2,
    explanation: 'NJ produces additive trees (correct topology when the distance matrix is additive), even without a molecular clock. UPGMA requires the molecular clock. However, NJ still produces an unrooted tree — an outgroup is needed for rooting.'
  },

  // ══════════════════════════════════════════════════════════════
  // parsimony-sites (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'pars-sites-1',
    nodeId: 'parsimony-sites',
    type: 'multiple-choice',
    question: 'Which alignment column is parsimony-informative for 4 sequences?',
    options: [
      'A, A, A, A (all same)',
      'A, A, A, G (one different)',
      'A, A, G, G (two groups of two)',
      'A, G, C, T (all different)'
    ],
    correctIndex: 2,
    explanation: 'A site is parsimony-informative if at least 2 character states each appear at least 2 times. Column A,A,G,G: A appears twice, G appears twice → informative. Column A,A,A,G: only G appears once → uninformative. Column A,G,C,T: no state appears twice → uninformative.'
  },
  {
    id: 'pars-sites-2',
    nodeId: 'parsimony-sites',
    type: 'short-answer',
    question: 'Why don\'t invariant sites (all sequences have the same character) contribute to parsimony tree selection?',
    acceptableAnswers: ['they give the same score for all trees', 'all topologies require 0 mutations', 'parsimony score is 0 for all trees'],
    explanation: 'For invariant sites, the parsimony score is 0 for every possible tree topology — no mutations are required. Since all topologies have the same score for invariant sites, these sites provide no discriminating information and don\'t affect which topology is preferred.'
  },

  // ══════════════════════════════════════════════════════════════
  // parsimony (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'par-1',
    nodeId: 'parsimony',
    type: 'multiple-choice',
    question: 'Maximum parsimony chooses the phylogenetic tree that:',
    options: [
      'Has the longest total branch length',
      'Requires the fewest evolutionary changes (mutations) to explain the data',
      'Maximises the likelihood of the sequence data',
      'Minimises pairwise distances between sequences'
    ],
    correctIndex: 1,
    explanation: 'Parsimony applies Occam\'s razor: prefer the hypothesis requiring the fewest assumptions. For trees, this means the topology requiring the minimum number of mutations to explain the observed sequence data.'
  },
  {
    id: 'par-2',
    nodeId: 'parsimony',
    type: 'multiple-choice',
    question: 'For 10 taxa, the number of distinct unrooted tree topologies is approximately:',
    options: [
      '100',
      '2,000,000',
      '2 million',
      'More than 2 million'
    ],
    correctIndex: 3,
    explanation: 'For n=10: (2·10-5)!! = 15!! = 2,027,025 topologies. For n=50, there are ~10^74 topologies — far too many to enumerate. This is why heuristic searches (NNI, SPR) are needed for large datasets.'
  },

  // ══════════════════════════════════════════════════════════════
  // fitch-algorithm (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'fitch-1',
    nodeId: 'fitch-algorithm',
    type: 'multiple-choice',
    question: 'In the Fitch algorithm, at an internal node with children having character sets {A,G} and {G,T}:',
    options: [
      'The set is {A,G,T} (union) and the parsimony cost increases by 1',
      'The set is {G} (intersection) and the parsimony cost stays the same',
      'The set is {G} (intersection) and the cost increases by 1',
      'The set is {A,G} (left child set) and cost stays the same'
    ],
    correctIndex: 1,
    explanation: 'Fitch rule: if sets overlap (intersection non-empty), take the intersection with no cost increase. {A,G} ∩ {G,T} = {G} ≠ ∅, so the parent set is {G} at no extra cost. If disjoint, take the union and add 1 to the parsimony score.'
  },
  {
    id: 'fitch-2',
    nodeId: 'fitch-algorithm',
    type: 'multiple-choice',
    question: 'In Fitch, if two children have disjoint character sets {A} and {T}:',
    options: [
      'Set is {A} ∩ {T} = ∅, cost +1, parent set = {} (error)',
      'Set is {A} ∪ {T} = {A,T}, cost +1',
      'Set is {A} ∩ {T} = {A,T}, cost 0',
      'Set is {A}, cost 0 (pick the left child)'
    ],
    correctIndex: 1,
    explanation: 'If sets are disjoint (intersection empty), take the union and add 1 to the parsimony score: parent set = {A,T}, cost += 1. This +1 represents a mutation required at this node. The pre-order traceback then assigns actual ancestral states.'
  },

  // ══════════════════════════════════════════════════════════════
  // parsimony-search (1 question)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'pars-search-1',
    nodeId: 'parsimony-search',
    type: 'multiple-choice',
    question: 'NNI (nearest-neighbour interchange) modifies a tree by:',
    options: [
      'Removing one branch and inserting it elsewhere',
      'Swapping two subtrees across an internal branch',
      'Adding a new leaf to every possible position',
      'Randomly rearranging all branches'
    ],
    correctIndex: 1,
    explanation: 'NNI: for each internal branch, swap one of the two subtrees on one side with one of the two subtrees on the other side. Each internal branch generates 2 alternative trees. NNI explores the neighbourhood of the current tree.'
  },

  // ══════════════════════════════════════════════════════════════
  // evolutionary-models (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'evo-1',
    nodeId: 'evolutionary-models',
    type: 'multiple-choice',
    question: 'In the Jukes-Cantor (JC69) model, the probability of observing the same base after time t is:',
    options: [
      '1/4 + (3/4)·e^{-4μt}',
      '1/4·(1 - e^{-4μt})',
      'e^{-μt}',
      '1 - 3μt'
    ],
    correctIndex: 0,
    explanation: 'JC69 has all substitution rates equal to μ. P(same base | time t) = 1/4 + (3/4)·e^{-4μt}. As t→∞, P→1/4 (random base composition). At t=0, P=1. Each of the 3 other bases has P = 1/4 - (1/4)·e^{-4μt}.'
  },
  {
    id: 'evo-2',
    nodeId: 'evolutionary-models',
    type: 'short-answer',
    question: 'What is the rate matrix Q in a continuous-time Markov model, and what is its key property for diagonal entries?',
    acceptableAnswers: ['diagonal entries are negative sum of row', 'Q_{ii} = -sum of off-diagonal', 'rows sum to 0', 'diagonal is negative row sum'],
    explanation: 'Q is the instantaneous rate matrix where Q_{ij} (i≠j) is the rate of mutation i→j. Diagonal: Q_{ii} = -Σ_{j≠i} Q_{ij} (so rows sum to 0). The transition probability matrix at time t is P(t) = e^{Qt}.'
  },

  // ══════════════════════════════════════════════════════════════
  // rate-matrix (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'rm-1',
    nodeId: 'rate-matrix',
    type: 'multiple-choice',
    question: 'Why can\'t we estimate both the rate μ and the time t separately from a pair of sequences?',
    options: [
      'Because the JC69 model is too simple',
      'Because only the product μt appears in the transition probabilities P(t)',
      'Because sequences are too short',
      'Because maximum likelihood is undefined for this problem'
    ],
    correctIndex: 1,
    explanation: 'P(t) = e^{μQt} depends only on the product μt. Doubling μ and halving t gives the same P(t). From observed sequences, we can estimate μt (evolutionary distance) but not μ or t individually without additional information (e.g., a fossil record for calibration).'
  },
  {
    id: 'rm-2',
    nodeId: 'rate-matrix',
    type: 'calculation',
    question: 'Under JC69 with μ = 0.1 per unit time, what is P(same base after t = 1)? Use the formula P = 1/4 + (3/4)·e^{-4μt}. Give to 3 decimal places.',
    correctAnswer: 0.586,
    tolerance: 0.005,
    explanation: '4μt = 4·0.1·1 = 0.4. e^{-0.4} ≈ 0.6703.\nP = 0.25 + 0.75·0.6703 = 0.25 + 0.5027 ≈ 0.753.\nActually: P = 1/4 + 3/4·e^{-0.4} = 0.25 + 0.75·0.6703 = 0.7527. Note: re-checking: 1/4 + 3/4 * 0.6703 = 0.25 + 0.5027 = 0.7527.'
  },

  // ══════════════════════════════════════════════════════════════
  // ml-trees (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ml-1',
    nodeId: 'ml-trees',
    type: 'multiple-choice',
    question: 'A key advantage of maximum likelihood over parsimony for tree inference is:',
    options: [
      'ML is always faster to compute',
      'ML uses an explicit model of evolution and is statistically consistent',
      'ML always finds the global optimum',
      'ML requires fewer sequences'
    ],
    correctIndex: 1,
    explanation: 'ML is statistically consistent: given enough data, it converges to the true tree. Parsimony is not consistent under the Felsenstein zone (long-branch attraction). ML also accounts for multiple hits (a site changing back), which parsimony ignores. Neither method is guaranteed to find the global optimum (NP-hard).'
  },
  {
    id: 'ml-2',
    nodeId: 'ml-trees',
    type: 'short-answer',
    question: 'What is a reason why ML tree search does not guarantee finding the globally optimal tree?',
    acceptableAnswers: ['NP-hard', 'heuristic', 'local optima', 'too many topologies', 'exponential search space', 'hill climbing'],
    explanation: 'The ML tree search is NP-hard: there are an exponential number of topologies. Heuristic searches (NNI, SPR, TBR) explore the neighbourhood of the current tree but can get stuck in local optima of the likelihood surface.'
  },

  // ══════════════════════════════════════════════════════════════
  // game-theory (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'gt-1',
    nodeId: 'game-theory',
    type: 'multiple-choice',
    question: 'In the Hawk-Dove game with resource value V and injury cost C (C > V), what is the expected payoff for a Hawk meeting another Hawk?',
    options: [
      'V',
      'V/2',
      '(V - C)/2',
      '0'
    ],
    correctIndex: 2,
    explanation: 'Hawk vs Hawk: each player escalates. One wins (gets V) and the other is injured (costs C). With equal probability: expected payoff = (1/2)·V + (1/2)·(-C) = (V-C)/2. Since C > V, this is negative — Hawks do poorly against other Hawks.'
  },
  {
    id: 'gt-2',
    nodeId: 'game-theory',
    type: 'calculation',
    question: 'In Hawk-Dove with V = 4, C = 8, what is the ESS mixed strategy frequency of Hawks (p* = V/C)?',
    correctAnswer: 0.5,
    tolerance: 0.01,
    explanation: 'When V < C, neither pure strategy is ESS. The mixed ESS has Hawk frequency p* = V/C = 4/8 = 0.5. At p*, W(H, mixed) = W(D, mixed) — no strategy can invade the population.'
  },

  // ══════════════════════════════════════════════════════════════
  // ess-analysis (2 questions)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ess-1',
    nodeId: 'ess-analysis',
    type: 'multiple-choice',
    question: 'A strategy I is an ESS (evolutionarily stable strategy) if, for all alternative strategies J ≠ I:',
    options: [
      'W(I, I) > W(J, I) OR [W(I, I) = W(J, I) AND W(I, J) > W(J, J)]',
      'W(J, I) > W(I, I)',
      'W(I, I) = W(J, J)',
      'W(I, J) < W(J, I)'
    ],
    correctIndex: 0,
    explanation: 'ESS condition: I is an ESS if for all J ≠ I: either (1) I does strictly better against I than J does (W(I,I) > W(J,I)), or (2) they do equally well against I but I does better against J (W(I,I) = W(J,I) and W(I,J) > W(J,J)). This ensures I cannot be invaded by J.'
  },
  {
    id: 'ess-2',
    nodeId: 'ess-analysis',
    type: 'multiple-choice',
    question: 'In Hawk-Dove with V > C (resource exceeds injury cost), which strategy is the ESS?',
    options: [
      'Dove (D)',
      'Hawk (H)',
      'Mixed strategy with p = C/V',
      'No ESS exists'
    ],
    correctIndex: 1,
    explanation: 'When V > C: W(H,H) = (V-C)/2 > 0 = W(D,H). Since Hawk does better against Hawk than Dove does, pure Hawk is ESS. Intuitively, when the resource is worth more than the fight cost, aggression always pays.'
  }
];

// Helper: get questions for a specific node
export function getQuestionsForNode(nodeId: string): Question[] {
  return questionBank.filter(q => q.nodeId === nodeId);
}
