
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Puzzle Answer</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <main class="container">
    <!-- Loading message -->
    <div id="loading" class="muted">Loading…</div>

    <!-- Gate section: shown if user hasn't submitted name/email yet -->
    <section id="gate" class="card" style="display:none;">
      <h2>One-time check</h2>
      <p>Please enter your name and email once to reveal answers on this device.</p>

      https://formspree.io/f/xrbljyyn

      <p class="muted small">We use this one-time check to reduce spoilers and track engagement.</p>
    </section>

    <!-- Answer section: shown after user is verified -->
    <section id="answer" class="card" style="display:none;">
      <h2 id="answer-title">Puzzle Answer</h2>
      <p id="answer-body"></p>
      <details class="muted small">
        <summary>Privacy &amp; reset</summary>
        <p>Your name &amp; email are stored only in this browser (localStorage).
        <button id="forget" class="btn btn-text" type="button">Forget me on this device</button></p>
      </details>
    </section>

    <!-- Not found section: shown if invalid puzzle ID or a load error -->
    <section id="not-found" class="card danger" style="display:none;">
      <h2>Not found</h2>
      <p>We couldn’t find that puzzle. Please scan a valid QR code from the book.</p>
    </section>
  </main>

  <script src="./app.js"></script>
</body>
</html>
