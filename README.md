# Learn2X Classes

Maths, Science, and English tuition for Classes 6–10, with special focus on Classes 9 and 10.

## Features

- Responsive website with course details, tutor introduction, FAQs, and contact links
- Demo registration with class, subject, learning goal, and adult consent
- Server-side validation and persistent Cloudflare D1 storage
- Email: learn2xclasses@gmail.com
- Phone: +91 9310429249

## Development

Requires Node.js 22.13+ and the pnpm version declared in package.json.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

## Hosting and data

The current website is hosted with ChatGPT Sites on Cloudflare Workers. `.openai/hosting.json` identifies this existing Site and its logical `DB` binding. Database schema is in `db/schema.ts`; schema migrations are in `drizzle/`. Production student records are not included in this repository.

The demo form requires a server and D1; GitHub Pages alone cannot run it. Publishing through Sites applies migrations and connects the production database. This GitHub repository is a source copy; GitHub pushes do not automatically deploy the Site.

The custom domain learn2x.in requires DNS validation before it becomes active. Website audience is managed separately in Sites settings.

## Requests

View saved requests in the Site settings database viewer, in the `demo_requests` table. The owner-only dashboard at `/admin` supports search, class/subject filters, request details, and contact links. Sign in with the owner’s ChatGPT account (amaan2982@gmail.com). The server rejects anonymous and other-account access before querying student records. Automatic email notifications are not enabled.
