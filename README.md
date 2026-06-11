# DBS Horizon

Prototype built for the La Salle Barcelona study-tour deliverable on DBS Bank Singapore. Team Mireia Albà, Daniel Puiggròs, Felipe Rentería, Neharika Aguilar plus two co-leads.

A single-page Next.js app that demonstrates a new client-facing AI feature for DBS, targeted at Singapore dual-track professionals aged 28-39 (salaried plus side-hustle or founder intent). Three surfaces: Mirror, Plan, Founder.

## Run locally

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a new GitHub repo.
2. On vercel.com, click New Project, Import this repo.
3. No env vars are required for the demo. The AI is mocked and deterministic.
4. Click Deploy. The first build takes about 60 seconds.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- No external API calls. All AI responses are mocked in `lib/ai.ts` and `lib/mockData.ts`.

If a real LLM is ever wanted, swap the two functions in `lib/ai.ts` for Anthropic SDK calls. Nothing else needs to change.

## Framework coverage

- Flower of Service (Lovelock and Wirtz): 8/8 petals covered across the three surfaces.
- AISAQUAL (Mishra et al.): 6/6 dimensions covered, tagged on every screen.

## Risk awareness baked into the UI

- Auto-execute, one-tap, biometric cards on the Plan timeline.
- 10-second cool-off on every biometric action.
- Freeze switch above the timeline kills every queued action.
- FEAT and AI Verify check made visible inside the Founder pipeline.
