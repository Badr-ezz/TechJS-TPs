document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const numberOfPages = Number(
    document.getElementById("numberOfPages").value
  );
  const status = document.getElementById("status").value;
  const price = Number(document.getElementById("price").value);
  const pagesRead = Number(document.getElementById("pagesRead").value || "0");
  const format = document.getElementById("format").value;
  const suggestedBy = document.getElementById("suggestedBy").value;

  const payload = {
    title,
    author,
    numberOfPages,
    status,
    price,
    pagesRead,
    format,
    suggestedBy
  };

  const res = await fetch("/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    alert("Book added successfully");
    (e.target).reset();
  } else {
    alert("Error while adding book");
  }
});
