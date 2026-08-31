import { FormEvent, useMemo, useState } from "react";

type ViaCepData = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

type WeatherData = {
  weather: Array<{
    main: string;
    description: string;
  }>;
  main: {
    temp: number;
  };
};

type SavedSummary = {
  cidade: string;
  estado: string;
  rua: string;
  clima: string;
  temperatura: number;
  risco: "Sim" | "N\u00e3o";
};

const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<SavedSummary | null>(null);

  const airtableEndpoint = useMemo(() => {
    if (!AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) return "";
    return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME,
    )}`;
  }, []);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");

    if (loginUser === "unifecaf" && loginPassword === "fecaf123") {
      setIsAuthenticated(true);
      return;
    }

    setLoginError("Usuario ou senha incorretos.");
  }

  async function handleSearchAndSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSummary(null);

    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setError("Informe um CEP valido com 8 digitos.");
      return;
    }

    if (!email.trim()) {
      setError("Informe o email do cliente.");
      return;
    }

    if (!OPENWEATHER_KEY || !AIRTABLE_TOKEN || !airtableEndpoint) {
      setError(
        "Configure VITE_OPENWEATHER_KEY, VITE_AIRTABLE_TOKEN, VITE_AIRTABLE_BASE_ID e VITE_AIRTABLE_TABLE_NAME no ambiente.",
      );
      return;
    }

    setIsSaving(true);

    try {
      const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

      if (!viaCepResponse.ok) {
        throw new Error("Nao foi possivel consultar o CEP.");
      }

      const viaCepData = (await viaCepResponse.json()) as ViaCepData;

      if (viaCepData.erro) {
        throw new Error("CEP nao encontrado.");
      }

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          viaCepData.localidade,
        )},BR&appid=${OPENWEATHER_KEY}&units=metric&lang=pt_br`,
      );

      if (!weatherResponse.ok) {
        throw new Error("Nao foi possivel consultar o clima da cidade.");
      }

      const climaData = (await weatherResponse.json()) as WeatherData;
      const weather = climaData.weather[0];
      const risk = weather.main === "Rain" ? "Sim" : "N\u00e3o";

      const payload = {
        records: [
          {
            fields: {
              CEP: cleanCep,
              "Email do cliente": email.trim(),
              Rua: viaCepData.logradouro,
              Bairro: viaCepData.bairro,
              Cidade: viaCepData.localidade,
              Estado: viaCepData.uf,
              "Clima atual": weather.description,
              Temperatura: climaData.main.temp,
              "Risco de Atraso": risk,
            },
          },
        ],
      };

      const airtableResponse = await fetch(airtableEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!airtableResponse.ok) {
        throw new Error("Nao foi possivel salvar no Airtable.");
      }

      setSummary({
        cidade: viaCepData.localidade,
        estado: viaCepData.uf,
        rua: viaCepData.logradouro,
        clima: weather.description,
        temperatura: climaData.main.temp,
        risco: risk,
      });
      setMessage("Dados encontrados e salvos com sucesso.");
      setCep("");
      setEmail("");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Ocorreu um erro inesperado ao processar a solicitacao.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] px-6 py-8 text-stone-950">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-stone-500">Logistica Central</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <label className="block">
                <span className="text-sm font-medium text-stone-700">Usuario</span>
                <input
                  value={loginUser}
                  onChange={(event) => setLoginUser(event.target.value)}
                  className="mt-2 w-full border-b border-stone-300 bg-transparent px-0 py-3 text-lg outline-none transition focus:border-stone-950"
                  placeholder="joao"
                  autoComplete="username"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-stone-700">Senha</span>
                <input
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  className="mt-2 w-full border-b border-stone-300 bg-transparent px-0 py-3 text-lg outline-none transition focus:border-stone-950"
                  placeholder="******"
                  type="password"
                  autoComplete="current-password"
                />
              </label>

              {loginError ? <p className="text-sm text-red-700">{loginError}</p> : null}

              <button
                className="w-full bg-stone-950 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-stone-800"
                type="submit"
              >
                Entrar
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] px-6 py-8 text-stone-950">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-stone-500">Logística Central</p>
          <h1 className="mt-4 max-w-xl text-5xl font-semibold tracking-tight sm:text-6xl">Consulta de entrega</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-stone-600">
            Informe o CEP e o email do cliente. O sistema busca o endereco na API do ViaCEP, consulta o clima da cidade na API do Openweather e salva o registro no Airtable.
          </p>
        </div>

        <div className="w-full">
          <form className="space-y-6" onSubmit={handleSearchAndSave}>
            <label className="block">
              <span className="text-sm font-medium text-stone-700">CEP do cliente</span>
              <input
                value={cep}
                onChange={(event) => setCep(event.target.value)}
                className="mt-2 w-full border-b border-stone-300 bg-transparent px-0 py-4 text-2xl outline-none transition placeholder:text-stone-400 focus:border-stone-950"
                inputMode="numeric"
                maxLength={9}
                placeholder="00000-000"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-stone-700">Email do cliente</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full border-b border-stone-300 bg-transparent px-0 py-4 text-2xl outline-none transition placeholder:text-stone-400 focus:border-stone-950"
                placeholder="cliente@email.com"
                type="email"
              />
            </label>

            <button
              className="w-full bg-stone-950 px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? "Buscando e salvando..." : "Buscar e salvar"}
            </button>
          </form>

          <div className="mt-6 min-h-24" aria-live="polite">
            {error ? <p className="border-l-2 border-red-700 pl-4 text-sm leading-6 text-red-700">{error}</p> : null}
            {message ? <p className="border-l-2 border-green-800 pl-4 text-sm leading-6 text-green-800">{message}</p> : null}

            {summary ? (
              <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-stone-700">
                <div>
                  <dt className="font-medium text-stone-950">Cidade</dt>
                  <dd>{summary.cidade} - {summary.estado}</dd>
                </div>
                <div>
                  <dt className="font-medium text-stone-950">Clima</dt>
                  <dd>{summary.clima}, {Math.round(summary.temperatura)} C</dd>
                </div>
                <div>
                  <dt className="font-medium text-stone-950">Rua</dt>
                  <dd>{summary.rua || "Nao informado"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-stone-950">Risco de atraso</dt>
                  <dd>{summary.risco}</dd>
                </div>
              </dl>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
