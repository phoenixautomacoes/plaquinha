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
  const trimmedName = name.trim();
  const hasCustomLogo = Boolean(logo);
  const hasCustomName = Boolean(trimmedName);

  return (
    <div className={`plate-object${compact ? " plate-compact" : ""}`}>
      <div className="plate-face">
        <img
          src="/template-google-avaliacoes-v2.png"
          alt="Placa Phoenix NFC para Avaliações no Google"
          className="plate-bg-art"
          width="650"
          height="922"
          loading={compact ? "lazy" : "eager"}
          fetchPriority={compact ? "auto" : "high"}
          decoding="async"
        />
        {hasCustomLogo && (
          <div className="plate-custom-logo-zone">
            <img
              src={logo!}
              alt="Logotipo enviado para a prévia"
              width="52"
              height="52"
            />
          </div>
        )}
        {hasCustomName && (
          <div className="plate-custom-name-zone">
            <span className="plate-business-name">{trimmedName}</span>
          </div>
        )}
      </div>
      <div className="plate-foot" aria-hidden="true" />
    </div>
  );
}
