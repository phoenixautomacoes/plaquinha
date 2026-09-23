import { QrCode, Wifi } from "lucide-react";

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
        <div className="plate-color-line" />
        <div className="plate-inner">
          <div className="plate-business">
            <div className="plate-logo">
              {logo ? (
                <img
                  src={logo}
                  alt="Logotipo enviado para a prévia"
                  width="58"
                  height="58"
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
          <div className="plate-invitation">
            <span>Como foi sua experiência?</span>
            <strong>AVALIE NO</strong>
            <GoogleWordmark />
            <span
              className="plate-stars"
              aria-label="Ilustração de cinco estrelas"
            >
              ★★★★★
            </span>
          </div>
          <div className="plate-access">
            <div>
              <div className="plate-access-box">
                <QrCode aria-hidden="true" />
              </div>
              <span>Aponte a câmera</span>
            </div>
            <div>
              <div className="plate-access-box">
                <Wifi aria-hidden="true" />
                <strong>NFC</strong>
              </div>
              <span>Aproxime o celular</span>
            </div>
          </div>
          <span className="plate-signature">SUA OPINIÃO FAZ A DIFERENÇA</span>
        </div>
        <div className="plate-color-line" />
      </div>
      <div className="plate-foot" aria-hidden="true" />
    </div>
  );
}
