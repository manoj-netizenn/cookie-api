feather.replace();

const goalAmountInput = document.getElementById("goal-amount");
const currentSavingsInput = document.getElementById("current-savings");
const monthlyContributionInput = document.getElementById(
  "monthly-contribution"
);

const calculateBtn = document.getElementById("calculate-btn");
const progressBar = document.getElementById("progress-bar");
const result = document.getElementById("result");

calculateBtn.addEventListener("click", () => {
  const goalAmount = parseFloat(goalAmountInput.value);
  const currentSavings = parseFloat(currentSavingsInput.value);
  const monthlyContribution = parseFloat(monthlyContributionInput.value);
  if (
    isNaN(goalAmount) ||
    isNaN(currentSavings) ||
    isNaN(monthlyContribution)
  ) {
    result.textContent = "Please enter valid numbers.";
    result.classList.add("show");
    return;
  }
  const remainingAmount = goalAmount - currentSavings;
  const monthsToGoal = Math.ceil(remainingAmount / monthlyContribution);
  const progressPercentage = (currentSavings / goalAmount) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  result.classList.remove("show");
  setTimeout(() => {
    if (currentSavings >= goalAmount) {
      result.innerHTML = `
      "🎉Congratulations! Your savings have bloomed to reach your goal!";
      `;
    } else {
      result.innerHTML = `🌿 Keep nurturing your savings! You'll reach your goal in ${monthsToGoal} months.`;
    }
    result.classList.add("show");

  }, 100);
});
