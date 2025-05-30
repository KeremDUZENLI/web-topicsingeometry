// Exercises 1.2.1 to 1.2.20
const questions_dot_product = [
    "Exercise 1.2.1: \nLet \\( \\mathbf{p} = (5, 5) \\) and \\( \\mathbf{q} = (1, -7) \\). <br> a. Determine \\( \\mathbf{p} + \\mathbf{q} \\) and \\( \\mathbf{p} - \\mathbf{q} \\). <br> b. Represent \\( \\mathbf{p}, \\mathbf{q}, \\mathbf{p} + \\mathbf{q}, \\) and \\( \\mathbf{p} - \\mathbf{q} \\) by arrows in a parallelogram. <br> c. Compute \\( |\\mathbf{p}|, |\\mathbf{q}|, |\\mathbf{p} + \\mathbf{q}|, \\) and \\( |\\mathbf{p} - \\mathbf{q}| \\). <br> d. Is \\( |\\mathbf{p} + \\mathbf{q}|^2 = |\\mathbf{p}|^2 + |\\mathbf{q}|^2 \\) ?",
    "Exercise 1.2.2: \nLet \\( \\mathbf{p} = (2, -2, 1) \\) and \\( \\mathbf{q} = (2, 3, 2) \\). <br> Show that \\( |\\mathbf{p} + \\mathbf{q}|^2 = |\\mathbf{p}|^2 + |\\mathbf{q}|^2 \\) and \\( |\\mathbf{p} - \\mathbf{q}|^2 = |\\mathbf{p}|^2 + |\\mathbf{q}|^2 \\). <br> Interpret geometrically.",
    "Exercise 1.2.3: \nLet \\( P, Q, \\) and \\( R \\) be the vertices of a triangle in \\( \\mathbb{R}^2 \\) or \\( \\mathbb{R}^3 \\). <br> Use vectors to show that the line segment joining the midpoints of any two sides of the triangle is parallel to and one half the length of the third side. (Note: two vectors are parallel if and only if one is a scalar multiple of the other.)",
    "Exercise 1.2.4: \nFind the angle between the vectors \\( \\mathbf{p} = (-2, 4) \\) and \\( \\mathbf{q} = (3, -5) \\).",
    "Exercise 1.2.5: \nFind the angle between the vectors \\( \\mathbf{p} = (1, -2, 4) \\) and \\( \\mathbf{q} = (3, 5, 2) \\).",
    "Exercise 1.2.6: \nFind six different nonobtuse angles between various nonparallel diagonals of the unit cube (defined in Exercise 1.1.4) and between its edges and diagonals.",
    "Exercise 1.2.7: \nThe line segments joining the centers of the faces of the unit cube form a regular octahedron. <br> Find the angles between its various edges, and try to draw it.",
    "Exercise 1.2.8: \nConsider a triangle in the \\( xy \\) plane with vertices \\( A = (1, 3), B = (2, 4), \\) and \\( C = (4, -1) \\). <br> a. the orthogonal projection of \\( \\mathbf{p} = \\overrightarrow{AB} \\) onto the line of \\( \\mathbf{q} = \\overrightarrow{BC} \\), <br> b. the distance of \\( A \\) from that line, and <br> c. the area of the triangle.",
    "Exercise 1.2.9: \nDecompose the vector \\( \\mathbf{p} = (2, -3, 1) \\) into components parallel and perpendicular to the vector \\( \\mathbf{q} = (12, 3, 4) \\).",
    "Exercise 1.2.10: \nProve the parallelogram law for the length: \\( |\\mathbf{p} + \\mathbf{q}|^2 + |\\mathbf{p} - \\mathbf{q}|^2 = 2|\\mathbf{p}|^2 + 2|\\mathbf{q}|^2 \\) for all vectors in \\( \\mathbb{R}^n \\). <br> Interpret geometrically!",
    "Exercise 1.2.11: \nUsing dot products, prove the Theorem of Thales: If we take a point \\( P \\) on a circle and form a triangle by joining it to the opposite ends of an arbitrary diameter, then the angle at \\( P \\) is a right angle.",
    "Exercise 1.2.12: \nFill in the details of the following, alternative proof of Cauchy’s inequality (Theorem 1.2.6) in \\( \\mathbb{R}^n \\) for any \\( n \\geq 2 \\): <br> By Part 1 of Theorem 1.2.1, \\( (\\mathbf{p} - \\lambda \\mathbf{q}) \\cdot (\\mathbf{p} - \\lambda \\mathbf{q}) \\geq 0 \\) for every scalar \\( \\lambda \\). <br> Expand the left-hand side to obtain a quadratic function of \\( \\lambda \\). <br> The graph of this function is a parabola above the \\( \\lambda \\)-axis. <br> Find the \\( \\lambda \\)-value of the lowest point in terms of \\( \\mathbf{p} \\) and \\( \\mathbf{q} \\), substitute it into the inequality, and simplify.",
    "Exercise 1.2.13: \na. Using result of Theorem 1.2.6 prove the triangle inequality (Part 3 of Theorem 1.2.1). <br> b. Prove that equality occurs in the triangle inequality if and only if the vectors are parallel and point in the same direction.",
    "Exercise 1.2.14: \na. Prove the inequality \\( ||\\mathbf{p}| - |\\mathbf{q}|| \\leq |\\mathbf{p} - \\mathbf{q}| \\) for all vectors in \\( \\mathbb{R}^n \\). <br> b. When do we have equality in Part (a)? Explain!",
    "Exercise 1.2.15: \nLet \\( \\mathbf{p} \\) be any nonzero vector in \\( \\mathbb{R}^2 \\) and \\( \\mathbf{u}_p \\) the unit vector in its direction. <br> a. Show that the vector \\( \\mathbf{p} \\) can be written as \\( \\mathbf{p} = |\\mathbf{p}| (\\cos \\phi, \\sin \\phi) \\), where \\( \\phi \\) is the angle from the positive \\( x \\)-axis to \\( \\mathbf{p} \\). <br> b. Show that \\( \\mathbf{u}_p = (\\cos \\phi, \\sin \\phi) \\).",
    "Exercise 1.2.16: \nLet \\( \\mathbf{p} \\) be any nonzero vector in \\( \\mathbb{R}^3 \\) and \\( \\mathbf{u}_p \\) the unit vector in its direction. <br> a. Show that the components \\( \\mathbf{u}_p \\cdot \\mathbf{i}, \\mathbf{u}_p \\cdot \\mathbf{j}, \\mathbf{u}_p \\cdot \\mathbf{k} \\) of \\( \\mathbf{u}_p \\) equal the cosines of the angles \\( \\alpha_1, \\alpha_2, \\alpha_3 \\) between \\( \\mathbf{p} \\) and the positive coordinate axes (these are called the direction cosines of \\( \\mathbf{p} \\)) <br> b. \\( \\cos^2 \\alpha_1 + \\cos^2 \\alpha_2 + \\cos^2 \\alpha_3 = 1 \\). <br> c. \\( \\mathbf{p} = |\\mathbf{p}| (\\cos \\alpha_1, \\cos \\alpha_2, \\cos \\alpha_3) \\).",
    "Exercise 1.2.17: \nFind the direction cosines (see Exercise 1.2.16) of \\( \\mathbf{p} = (3, -4, 12) \\), and the angles \\( \\alpha_1, \\alpha_2, \\alpha_3 \\).",
    "Exercise 1.2.18: \nProve the formula \\( \\cos (\\alpha - \\beta) = \\cos \\alpha \\cos \\beta + \\sin \\alpha \\sin \\beta \\) by considering the scalar product of two unit vectors \\( \\mathbf{e}_a = (\\cos \\alpha, \\sin \\alpha) \\) and \\( \\mathbf{e}_b = (\\cos \\beta, \\sin \\beta) \\).",
    "Exercise 1.2.19: \nShow that in \\( \\mathbb{R}^2 \\) an inner product may be defined by \\( \\mathbf{p} \\cdot \\mathbf{q} = 2 p_1 q_1 + p_2 q_2 \\). <br> Show that this product also satisfies the first three properties of Theorem 1.2.2. <br> What is the geometrical meaning of this product?",
    "Exercise 1.2.20: \nConsider an oblique coordinate system in the plane with axes labeled \\( \\xi \\) and \\( \\eta \\) as shown in Figure 1.21. <br> Given a vector \\( \\mathbf{p} \\), let \\( p_1 \\) and \\( p_2 \\) denote the orthogonal scalar components of \\( \\mathbf{p} \\), that is, the signed lengths of the orthogonal projections of \\( \\mathbf{p} \\) onto the axes, and let \\( p^1 \\) and \\( p^2 \\) denote the parallel scalar components of \\( \\mathbf{p} \\). <br> (Note that in \\( p^1 \\) and \\( p^2 \\) the 1 and 2 are superscripts, not exponents!) <br> a. Show that if \\( \\mathbf{p} \\cdot \\mathbf{q} = |\\mathbf{p}| |\\mathbf{q}| \\cos \\theta \\) as usual, then \\( \\mathbf{p} \\cdot \\mathbf{q} = p_1 q^1 + p_2 q^2 = p^1 q_1 + p^2 q_2 \\). <br> b. Express \\( \\mathbf{p} \\cdot \\mathbf{q} \\) in the form \\( \\sum_{ij} g_{ij} p^i q^j \\), that is, find appropriate constants \\( g_{ij} \\)."
  ];

// Exercises 6.3.1 to 6.3.10
const questions_cross_product = [
    "Exercise 6.3.1: \nFind the cross product of the vectors \\( \\mathbf{u} = (1, -1, 0)^T \\) and \\( \\mathbf{v} = (1, 2, 0)^T \\). <br> Verify by elementary geometry that \\( |\\mathbf{u} \\times \\mathbf{v}| \\) equals the area of the parallelogram spanned by \\( \\mathbf{u} \\) and \\( \\mathbf{v} \\).",
    "Exercise 6.3.2: \nUse the cross product to find an equation of the plane \\( S \\) through the three points \\( A = (1, -1, 2) \\), \\( B = (0, -1, 3) \\), \\( C = (3, 0, 2) \\).",
    "Exercise 6.3.3: \nVerify Statements 11, 12, and 13 of Theorem 6.3.1 for the vectors \\( \\mathbf{u} = (1, -1, 0)^T \\), \\( \\mathbf{v} = (1, 2, 0)^T \\), and \\( \\mathbf{w} = (1, 0, 3)^T \\).",
    "Exercise 6.3.4: \nProve Statement 11 of Theorem 6.3.1.",
    "Exercise 6.3.5: \nThe expression \\( \\mathbf{u} \\cdot (\\mathbf{v} \\times \\mathbf{w}) \\) of Statement 11 of Theorem 6.3.1 is called the triple product of these vectors. <br> Show geometrically that its absolute value equals the volume of the parallelepiped spanned by the vectors \\( \\mathbf{u} \\), \\( \\mathbf{v} \\), and \\( \\mathbf{w} \\).",
    "Exercise 6.3.6: \nLet \\( \\mathbf{n}_1, \\mathbf{n}_2, \\mathbf{n}_3, \\mathbf{n}_4 \\) denote the outward pointing area vectors of a tetrahedron. <br> Prove that their sum equals 0. <br> (Hint: Let \\( \\mathbf{a}_1, \\ldots, \\mathbf{a}_6 \\) denote the edge vectors, write each area vector as a cross product of these, and apply the appropriate properties from Theorem 6.3.1 to the sum.)",
    "Exercise 6.3.7: \nProve that for all vectors \\( \\mathbf{a}, \\mathbf{b}, \\mathbf{c}, \\mathbf{d} \\) of \\( \\mathbb{R}^3 \\) we have <br> \\( (\\mathbf{a} \\times \\mathbf{b}) \\cdot (\\mathbf{c} \\times \\mathbf{d}) = (\\mathbf{a} \\cdot \\mathbf{c})(\\mathbf{b} \\cdot \\mathbf{d}) - (\\mathbf{a} \\cdot \\mathbf{d})(\\mathbf{b} \\cdot \\mathbf{c}) \\).",
    "Exercise 6.3.8: \nProve that for all vectors \\( \\mathbf{a}, \\mathbf{b}, \\mathbf{c}, \\mathbf{d} \\) of \\( \\mathbb{R}^3 \\) we have <br> \\( (\\mathbf{a} \\times \\mathbf{b}) \\times (\\mathbf{c} \\times \\mathbf{d}) = [\\operatorname{det}(\\mathbf{a}, \\mathbf{c}, \\mathbf{d})] \\mathbf{b} - [\\operatorname{det}(\\mathbf{b}, \\mathbf{c}, \\mathbf{d})] \\mathbf{a} \\) and <br> \\( (\\mathbf{a} \\times \\mathbf{b}) \\times (\\mathbf{c} \\times \\mathbf{d}) = [\\operatorname{det}(\\mathbf{a}, \\mathbf{b}, \\mathbf{d})] \\mathbf{c} - [\\operatorname{det}(\\mathbf{a}, \\mathbf{b}, \\mathbf{c})] \\mathbf{d} \\).",
    "Exercise 6.3.9: \nLet \\( \\mathbf{a} \\) be any fixed nonzero vector of \\( \\mathbb{R}^3 \\). <br> Define the transformation \\( T: \\mathbb{R}^3 \\rightarrow \\mathbb{R}^3 \\) by \\( T(\\mathbf{x}) = \\mathbf{a} \\times \\mathbf{x} \\). <br> a. Show that \\( T \\) is linear. <br> b. Find the matrix \\( [T] \\) that represents \\( T \\) relative to the standard basis. <br> c. Find the null space of the matrix \\( [T] \\), and describe it geometrically. <br> d. What is the rank of \\( [T] \\)?",
    "Exercise 6.3.10: \nExplain, using Equation 6.110, why in the northern hemisphere the circulation of hurricanes must be counterclockwise. <br> What is it in the southern hemisphere and why?"
  ];

const questions_learning_outcome = [
  "",
  "",
  "",
  "",
  "",
  "",
]

function updateQuestion(pageNum, questions) {
    const questionTextDiv = document.getElementById('question-text');

    if (pageNum <= questions.length) {
        const [exerciseNumber, ...questionParts] = questions[pageNum - 1].split(':');
        const questionText = questionParts.join(':').trim();
        questionTextDiv.innerHTML = `<h3>${exerciseNumber}</h3><p>${questionText}</p>`;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, questionTextDiv]);
    } else {
        questionTextDiv.innerHTML = "<p>No question available for this page.</p>";
    }
}