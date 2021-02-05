const form = document.querySelector('form');

form.addEventListener('submit', event =>{
    event.preventDefault();
    calculateSalaryHandler();
})

calculateSalary = (
  employeeName,
  grossPay,
  incomeTax,
  employeeInsurance,
  cpp,
  additions
) => {
  const totalDeductions =
    parseInt((grossPay * incomeTax) / 100) +
    parseInt((grossPay * employeeInsurance) / 100) +
    parseInt((grossPay * cpp) / 100);
  const finalSalary = grossPay - totalDeductions + additions;

  const salaryObj = {
    employeeName,
    grossPay,
    totalDeductions,
    additions,
    finalSalary
  };

  generateSalarySlip(salaryObj);
};

calculateSalaryHandler = () => {
  const employeeName = document.getElementById("emp-name").value;
  let grossPay = parseInt(document.getElementById("gross-pay").value);
  const bonus = document.getElementById("bonus").value;
  const allowance = document.getElementById("allowance").value;
  let incomeTax = document.getElementById("income-tax").value;
  const employeeInsurance = document.getElementById("emp-insurance").value;
  const cpp = document.getElementById("cpp").value;
  const empGender = document.getElementById("male");
  const gender = empGender.checked ? "male" : "female";
  const dependencies = document.querySelector(".dependency-checkbox:checked")
    .value;
  const additions = parseInt(bonus) + parseInt(allowance);

  if (gender === "female" && dependencies != 2) {
    incomeTax = dependencies == 3 ? incomeTax - 4 : incomeTax - 6;
  } else if (gender === "female" && dependencies == 2) {
    incomeTax = incomeTax - 2;
  } else if (gender === "male" && dependencies != 2) {
    incomeTax = dependencies == 3 ? incomeTax - 2 : incomeTax - 4;
  }

  calculateSalary(
    employeeName,
    grossPay,
    incomeTax,
    employeeInsurance,
    cpp,
    additions
  );
};

generateSalarySlip = (salaryObj) => {
    const {employeeName,grossPay,totalDeductions,additions,finalSalary} = salaryObj;
  document.getElementById("salary-calculator").style.display = "none";
  document.getElementById("salary-slip").style.display = "block";

  document.getElementById("employee-name").innerHTML = employeeName;
  document.getElementById("gross-salary").innerHTML = grossPay;
  document.getElementById("total-deduction").innerHTML =
    totalDeductions;
  document.getElementById("total-addition").innerHTML = additions;
  document.getElementById("final-salary").innerHTML = finalSalary;
};

