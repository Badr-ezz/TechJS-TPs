async function loadBooks() {
  const res = await fetch("/api/books");
  if (!res.ok) {
    alert("Failed to load books");
    return;
  }

  const data = await res.json();

  const statsDiv = document.getElementById("stats");
  statsDiv.innerHTML = `
    <h2>Global Statistics</h2>
    <p>Total books: ${data.stats.totalBooks}</p>
    <p>Total pages: ${data.stats.totalPages}</p>
  `;

  const list = document.getElementById("bookList");
  list.innerHTML = "";

  data.books.forEach((b) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <h4>${b.title}</h4>
      <p><strong>Author:</strong> ${b.author}</p>
      <p><strong>Status:</strong> ${b.status}</p>
      <p><strong>Format:</strong> ${b.format}</p>
      <p><strong>Reading:</strong> ${b.pagesRead} / ${b.numberOfPages}</p>
      <p><strong>Progress:</strong> ${b.percentage}%</p>
      <p><strong>Finished:</strong> ${b.finished ? "Yes" : "No"}</p>
    `;
    list.appendChild(card);
  });
}

loadBooks();
