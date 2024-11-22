// Populate dropdown options for literals
const literals = ["x1", "NOT x1", "x2", "NOT x2", "x3", "NOT x3"];
document.querySelectorAll(".dropdown").forEach((dropdown) => {
  literals.forEach((literal) => {
    const option = document.createElement("option");
    option.value = literal;
    option.textContent = literal;
    dropdown.appendChild(option);
  });
});

// Start simulation
function startSimulation() {
  // Get 3CNF clauses
  const clause1 = [
    document.getElementById("c1l1").value,
    document.getElementById("c1l2").value,
    document.getElementById("c1l3").value,
  ];
  const clause2 = [
    document.getElementById("c2l1").value,
    document.getElementById("c2l2").value,
    document.getElementById("c2l3").value,
  ];

  // Get truth assignments
  const truthAssignment = {
    x1: document.getElementById("x1").value === "true",
    x2: document.getElementById("x2").value === "true",
    x3: document.getElementById("x3").value === "true",
  };

  // Generate simulation output
  const output = document.getElementById("output");
  output.innerHTML = ""; // Clear previous output

  // Simulate Mario's traversal
  let allClausesSatisfied = true;

  // Variable Gadgets
  Object.entries(truthAssignment).forEach(([variable, value]) => {
    appendOutput(`Mario enters variable gadget ${variable}`);
    appendOutput(`Mario exits variable gadget ${variable} with the ${value ? "TRUE" : "FALSE"} exit`);
  });

  // Clause Gadgets
  [clause1, clause2].forEach((clause, index) => {
    const clauseSatisfied = clause.some((literal) => evaluateLiteral(literal, truthAssignment));
    appendOutput(`Mario enters clause gadget l${index + 1}`);

    if (clauseSatisfied) {
      appendOutput("Mario turns on the switch");
      appendOutput(`Mario exits clause gadget l${index + 1}`);
    } else {
      appendOutput("The switch is OFF, Mario doesn't have access to the mushroom and dies");
      allClausesSatisfied = false;
    }
  });

  // End Gadget
  if (allClausesSatisfied) {
    appendOutput("Mario enters the end gadget");
    appendOutput("Mario passes the level");
  } else {
    appendOutput("Mario did not pass the level");
  }
}

// Helper: Evaluate a literal based on truth assignment
function evaluateLiteral(literal, truthAssignment) {
  const isNegated = literal.startsWith("NOT ");
  const variable = isNegated ? literal.slice(4) : literal;
  return isNegated ? !truthAssignment[variable] : truthAssignment[variable];
}

// Helper: Append output to simulation output
function appendOutput(text) {
  const output = document.getElementById("output");
  const line = document.createElement("p");
  line.textContent = text;
  output.appendChild(line);
}
