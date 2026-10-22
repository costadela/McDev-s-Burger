import { useEffect, useState } from "react";

const TIMEZONE = "America/Sao_Paulo";
const OPEN_MINUTES = 18 * 60;
const CLOSE_MINUTES = 23 * 60 + 30;
const CLOSED_WEEKDAY = "Mon";

function isOpenNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value;

  const rawHour = Number(get("hour"));
  const hour = rawHour === 24 ? 0 : rawHour;
  const minutes = hour * 60 + Number(get("minute"));

  return (
    get("weekday") !== CLOSED_WEEKDAY &&
    minutes >= OPEN_MINUTES &&
    minutes < CLOSE_MINUTES
  );
}

const ADDRESS = "Rua do Localhost, 93 - Bairro Backend, Juiz de Fora - MG";
const REAL_LOCATION = "Centro, Juiz de Fora - MG";
const MAPS_QUERY = encodeURIComponent(REAL_LOCATION);
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const MAPS_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

const linkFocus =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#ffa41b] focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-black";

const Footer = () => {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(isOpenNow());
    const id = setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="w-full border-t border-neutral-800 bg-black text-neutral-400">
      <div className="mx-auto grid max-w-300 gap-10 px-6 py-10 md:grid-cols-[auto_auto] md:justify-center md:gap-48 md:px-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-white">McDev's Burger</p>
            <p className="max-w-xs text-sm text-neutral-400">
              O hambúrguer artesanal feito para dev.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-white">Horário</h2>
            <p className="text-sm">Terça a domingo, das 18:00 às 23:30</p>
            <p className="text-sm text-neutral-500">Fechado às segundas</p>

            {open !== null && (
              <p
                className="flex items-center gap-2 pt-1 text-sm"
                role="status"
                aria-live="polite"
              >
                <span
                  aria-hidden="true"
                  className={`inline-block h-2 w-2 rounded-full ${
                    open
                      ? "bg-green-500 motion-safe:animate-pulse"
                      : "bg-neutral-600"
                  }`}
                />
                <span className={open ? "text-green-400" : "text-neutral-400"}>
                  {open ? "Aberto agora" : "Fechado agora"}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="w-full space-y-3 md:w-96">
          <h2 className="text-sm font-semibold text-white">Onde estamos</h2>
          <address className="text-sm text-neutral-300 not-italic">
            {ADDRESS}
          </address>
          <iframe
            title={`Mapa: ${ADDRESS}`}
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-40 w-full rounded-lg border border-neutral-800"
          />
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block text-sm font-medium text-[#ffa41b] transition-colors hover:text-[#ff7a00] hover:underline ${linkFocus}`}
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>

      <div className="space-y-1 border-t border-neutral-800 py-4 text-center text-xs text-neutral-500">
        <p>
          © {new Date().getFullYear()} McDev's Burger. Todos os direitos
          reservados.
        </p>
        <p>
          Desenvolvido por{" "}
          <a
            href="https://vitorcostadela.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium text-[#ffa41b] transition-colors hover:text-[#ff7a00] hover:underline ${linkFocus}`}
          >
            Vitor Costadela
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
