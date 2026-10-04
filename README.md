# Red Velvet Live Club

Piattaforma web adulta 18+ per live room, community, gioco narrativo e benessere sessuale consensuale. Il progetto conserva il codice originale di VelvetHub e include il **Radar della fiducia** con ruoli di fiction, confini dichiarati, patto di scena facoltativo e revoca immediata.

## DSN su Polygon

Il frontend legge in sola lettura il pair Polygon indicato nel pannello DSN tramite l’API pubblica DexScreener. Il pannello non custodisce token, non chiede seed phrase o chiavi private e non firma trasferimenti, swap, staking o altre transazioni. Prezzo, liquidità e volume sono dati variabili e non costituiscono consulenza finanziaria.

## Sviluppo locale

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm dev
```

Il server applicativo usa la porta `3000`. Per autenticazione, messaggi, Live Hub, database e funzioni private servono le variabili server già previste dal progetto. Non inserire segreti nelle variabili `VITE_*`: tutto ciò che inizia con `VITE_` finisce nel bundle browser.

## GitHub Pages

Il workflow `.github/workflows/pages.yml` compila solo il frontend Vite e pubblica `dist/public` su GitHub Pages. Il percorso predefinito del repository è `/VelvetHub/`. Nel repository GitHub, in **Settings → Pages**, selezionare **GitHub Actions**.

Impostare come **Repository variables** soltanto valori pubblici:

- `VITE_API_BASE_URL`: URL HTTPS del backend già ospitato, senza slash finale;
- `VITE_OAUTH_PORTAL_URL`: URL pubblico del portale OAuth;
- `VITE_APP_ID`: identificativo pubblico dell’app;
- facoltative: `VITE_ANALYTICS_ENDPOINT`, `VITE_ANALYTICS_WEBSITE_ID`.

Il backend deve consentire CORS e cookie per l’origine Pages e deve esporre `/api/trpc` e `/api/oauth/callback` sull’URL configurato. GitHub Pages non esegue Node, API, database, webhook o nodi Polygon.

## Sicurezza del prodotto adulto

Tutti i partecipanti devono essere maggiorenni. Mistress/guida e sub/esploratore sono ruoli di fiction o relazione consensuale, mai schiavitù reale o obblighi legali. Il patto è facoltativo, non esclusivo e revocabile. Nessun numero di telefono, posizione o contatto esterno è necessario. Report, blocco e uscita dalla scena devono rimanere sempre disponibili.
