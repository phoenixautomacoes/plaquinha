import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ImagePlus, Upload, X } from "lucide-react";
import { PlatePreview } from "./PlatePreview";
import { whatsappLink } from "./content";

export function PlateConfigurator({
  whatsappNumber,
}: {
  whatsappNumber: string;
}) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [filename, setFilename] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const readRef = useRef<FileReader | null>(null);
  const requestRef = useRef(0);
  useEffect(
    () => () => {
      requestRef.current++;
      readRef.current?.abort();
    },
    [],
  );

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";
    const request = ++requestRef.current;
    readRef.current?.abort();
    setLoading(false);
    setError("");
    if (
      !["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(
        file.type,
      )
    ) {
      setError("Escolha uma imagem PNG, JPG, WebP ou SVG.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5 MB.");
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    readRef.current = reader;
    const fail = () => {
      if (request === requestRef.current) {
        setError("Não foi possível abrir a imagem. Tente outro arquivo.");
        setLoading(false);
      }
    };
    reader.onerror = fail;
    reader.onload = () => {
      const data = reader.result as string;
      const image = new Image();
      image.onerror = fail;
      image.onload = () => {
        if (request !== requestRef.current) return;
        setLogo(data);
        setFilename(file.name);
        setLoading(false);
      };
      image.src = data;
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    requestRef.current++;
    readRef.current?.abort();
    setLogo(null);
    setFilename("");
    setError("");
    setLoading(false);
  };
  const complete = Boolean(name.trim() && logo && !loading);
  const message = `Olá! Fiz uma simulação da placa NFC da Phoenix para a empresa *${name.trim()}*. Gostaria de confirmar a arte, o pacote e a entrega. Vou anexar meu logotipo aqui na conversa!`;

  return (
    <div
      className="configurator"
      id="personalizar"
      aria-labelledby="configurator-title"
    >
      <div className="configurator-topline">
        <span>
          <span className="status-dot" /> PRÉVIA AO VIVO
        </span>
      </div>
      <div className="product-stage">
        <div className="product-orbit orbit-one" aria-hidden="true" />
        <div className="product-orbit orbit-two" aria-hidden="true" />
        <div className="product-plate">
          <PlatePreview name={name} logo={logo} />
        </div>
      </div>
      <div className="configurator-form">
        <div className="configurator-title-row">
          <div>
            <span className="mini-eyebrow">DO SEU JEITO</span>
            <h2 id="configurator-title">Veja a placa com a sua marca.</h2>
          </div>
          <ImagePlus aria-hidden="true" />
        </div>
        <div className="configurator-fields">
          <div>
            <label htmlFor="business-name">
              01. Nome da empresa <span>*</span>
            </label>
            <input
              id="business-name"
              name="organization"
              autoComplete="organization"
              placeholder="Ex.: Café da Esquina"
              maxLength={60}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="business-logo">
              02. Seu logotipo <span>*</span>
            </label>
            <input
              ref={inputRef}
              id="business-logo"
              className="visually-hidden"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={handleUpload}
              aria-describedby="logo-help"
            />
            <button
              className={`upload-button${logo ? " has-logo" : ""}`}
              type="button"
              onClick={() => inputRef.current?.click()}
            >
              {logo ? <Check size={16} /> : <Upload size={16} />}
              <span>
                {loading
                  ? "Abrindo imagem…"
                  : logo
                    ? filename
                    : "Enviar imagem"}
              </span>
            </button>
          </div>
        </div>
        <div className="upload-meta">
          <span id="logo-help">PNG, JPG, WebP ou SVG · até 5 MB</span>
          {logo && (
            <button onClick={removeLogo} type="button">
              <X size={12} /> Remover logo
            </button>
          )}
        </div>
        {error && (
          <p className="upload-error" role="alert">
            {error}
          </p>
        )}
        {complete ? (
          <a
            className="phx-button button-blue configurator-submit"
            href={whatsappLink(whatsappNumber, message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continuar no WhatsApp <ArrowUpRight size={18} />
          </a>
        ) : (
          <button
            className="phx-button configurator-submit"
            type="button"
            disabled
          >
            {loading
              ? "Preparando sua prévia…"
              : "Adicione nome e logo para continuar"}
            <ArrowUpRight size={18} />
          </button>
        )}
        <p className="configurator-note">
          Prévia ilustrativa. No WhatsApp, anexe seu logo e confirme a arte. O
          QR Code acima é demonstrativo.
        </p>
      </div>
    </div>
  );
}
