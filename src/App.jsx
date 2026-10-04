import { useEffect, useState } from "react";

function App() {
  const [apiState, setApiState] = useState({
    status: "loading",
    message: "Connecting to the backend...",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadBackendMessage() {
      try {
        const response = await fetch("/api/message", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Backend returned HTTP ${response.status}`);
        }

        const data = await response.json();
        if (typeof data.message !== "string") {
          throw new Error("Backend response did not include a message");
        }

        setApiState({ status: "ready", message: data.message });
      } catch (error) {
        if (error.name !== "AbortError") {
          setApiState({
            status: "error",
            message:
              error instanceof Error
                ? `Backend connection failed: ${error.message}`
                : "Backend connection failed.",
          });
        }
      }
    }

    loadBackendMessage();
    return () => controller.abort();
  }, []);

  return (
    <main className="page">
      <section className="card" aria-labelledby="title">
        <div className="mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">Your inbox, in focus</p>
        <h1 id="title">Meet your smarter inbox.</h1>
        <p className="description">
          SmartInbox AI brings the messages that matter into focus, so you can
          spend less time sorting and more time moving forward.
        </p>
        <div
          className={`status status-${apiState.status}`}
          role="status"
          aria-live="polite"
        >
          <span className="status-dot" />
          {apiState.message}
        </div>
      </section>
    </main>
  );
}

export default App;
