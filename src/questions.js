export const questions = [
  {
    id: 1,
    problem: "Create a login form with 'username' and 'password' fields and a submit button.",
    validationScript: async (page) => {
      const usernameExists = await page.$('#username') !== null;
      const passwordExists = await page.$('#password') !== null;
      const buttonExists = await page.$('#submit') !== null;
      
      let score = 0;

      if (usernameExists) score += 25;
      if (passwordExists) score += 25;
      if (buttonExists) score += 50;
      
      if (score === 100) {
        await page.type('#username', 'testuser');
        await page.type('#password', 'password123');
        await page.click('#submit');
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        return `Test Passed: Form submitted successfully! You scored ${score} points.`;
      } else {
        return `Test Failed: Missing form elements. You scored ${score} points.`;
      }
    },
  },
  {
    id: 2,
    problem: "Create a To-Do list where the user can add tasks. Each task should have a checkbox to mark it as completed.",
    validationScript: async (page) => {
      const inputExists = await page.$('#task-input') !== null;
      const addButtonExists = await page.$('#add-task') !== null;
      let score = 0;

      if (inputExists) score += 25;
      if (addButtonExists) score += 25;

      const taskExists = await page.evaluate(() => {
        const task = document.querySelector('.task');
        return task && task.textContent.includes('Buy groceries');
      });

      if (taskExists) score += 50;

      return `Test Completed: You scored ${score} points.`;
    },
  }
];
