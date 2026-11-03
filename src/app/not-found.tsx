export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#02040a", color: "white" }}>
      <div>
        <p>404</p>
        <h1>That page could not be found.</h1>
        <a href="/">Return home</a>
      </div>
    </main>
  );
}
