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


function startSimulation() {
    console.log("Start simulation triggered");
  
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
    const clauses = [clause1, clause2];
  
    // Get truth assignments
    const truthAssignment = {
      x1: document.getElementById("x1").value === "true",
      x2: document.getElementById("x2").value === "true",
      x3: document.getElementById("x3").value === "true",
    };
  
    const output = document.getElementById("output");
    output.innerHTML = ""; // Clear previous output
  
    appendOutput("Mario enters the start gadget");
  
    // Process each variable gadget
    ["x1", "x2", "x3"].forEach((variable, index) => {
      appendOutput(`Mario enters variable gadget ${variable}`);
      const path = truthAssignment[variable] ? "TRUE" : "FALSE";
      appendOutput(`Mario exits variable gadget ${variable} with the ${path} exit`);
  
      // Visit clause gadgets affected by the current variable
      clauses.forEach((clause, clauseIndex) => {
        // Determine whether to visit based on truth assignment
        const literal = truthAssignment[variable] ? variable : `NOT ${variable}`;
        if (clause.includes(literal)) {
          appendOutput(
            `Mario enters clause gadget l${clauseIndex + 1} through ${literal}`
          );
          appendOutput(`Mario turns on the switch in clause gadget l${clauseIndex + 1}`);
        }
      });
    });
  
    // Traverse clause gadgets from the left entrance
    let allClausesSatisfied = true;
    clauses.forEach((clause, index) => {
      appendOutput(`Mario enters clause gadget l${index + 1} from the left entrance`);
      const clauseSatisfied = clause.some((literal) => evaluateLiteral(literal, truthAssignment));
      if (clauseSatisfied) {
        appendOutput("The switch is ON, Mario has access to the mushroom and passes through the fire bars");
      } else {
        appendOutput("The switch is OFF, Mario doesn't have access to the mushroom and dies");
        allClausesSatisfied = false;
      }
    });
  
    // End gadget
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