export function GoogleWordmark() {
  return (
    <span className="google-wordmark" aria-label="Google">
      <span>G</span>
      <span>o</span>
      <span>o</span>
      <span>g</span>
      <span>l</span>
      <span>e</span>
    </span>
  );
}

export function PlatePreview({
  name = "",
  logo = null,
  compact = false,
}: {
  name?: string;
  logo?: string | null;
  compact?: boolean;
}) {
  return (
    <div className={`plate-object${compact ? " plate-compact" : ""}`}>
      <div className="plate-face">
        <img
          src="/template-google-avaliacoes-2.png"
          alt="Placa Phoenix NFC para Avaliações no Google"
          className="plate-bg-art"
          width="1410"
          height="2000"
          loading="lazy"
        />
        <div className="plate-custom-overlay">
          <div className="plate-business">
            <div className="plate-logo">
              {logo ? (
                <img
                  src={logo}
                  alt="Logotipo enviado para a prévia"
                  width="48"
                  height="48"
                />
              ) : (
                <span className="google-g" aria-hidden="true">
                  G
                </span>
              )}
            </div>
            <span className="plate-business-name">
              {name.trim() || "Sua empresa"}
            </span>
          </div>
        </div>
      </div>
      <div className="plate-foot" aria-hidden="true" />
    </div>
  );
}
