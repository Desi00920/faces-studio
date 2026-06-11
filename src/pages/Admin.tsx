// Stubbed — Admin functionality temporarily removed (Vercel 12-function limit).
// tRPC content endpoints are no-ops. Will be re-implemented on a different host
// (Daisy's Vercel Pro or self-hosted on a droplet).

export default function Admin() {
  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: 24 }}>
        <h1 style={{ fontWeight: 300, marginBottom: 12 }}>Admin — vorübergehend deaktiviert</h1>
        <p style={{ color: "#8c8c8c", lineHeight: 1.6 }}>
          Das Admin-Panel wird derzeit überarbeitet. Bitte kontaktiere Daisy
          direkt per E-Mail: <a href="mailto:hello@faces-studio.ch" style={{ color: "#ff5757" }}>hello@faces-studio.ch</a>
        </p>
      </div>
    </div>
  );
}
