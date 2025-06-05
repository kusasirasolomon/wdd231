const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 231", name: "Front-end Development I", credits: 3, completed: false },
  { code: "CSE 111", name: "Programming with Functions", credits: 4, completed: true },
  { code: "CSE 210", name: "Programming Structures", credits: 3, completed: false }
];

function displayCourses(filtered) {
  const container = document.getElementById("courseContainer");
  container.innerHTML = "";

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.className = "card";
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
    `;
    container.appendChild(card);
  });

  const totalCredits = filtered
    .filter(course => course.completed)
    .reduce((sum, course) => sum + course.credits, 0);

  document.getElementById("totalCredits").textContent = totalCredits;
}

function filterCourses(subject) {
  if (subject === "all") {
    displayCourses(courses);
  } else {
    const filtered = courses.filter(course => course.code.startsWith(subject));
    displayCourses(filtered);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayCourses(courses);
});
