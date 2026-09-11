# Summon Member launch configuration

## Offer

- Name: `Summon Member`
- Price: `$5 USD/month`, recurring
- Allowance: `5 guided decision sessions/month`
- Checkout metadata: set `mode=subscription`; collect the purchaser email.

## Access mode

The current product defaults to signed-in testing access. Google sign-in is
required, but payment, membership lookup, browser credits, and monthly-session
consumption are bypassed while the guide experience is being validated.

To activate the paid offer, set this server environment variable and redeploy:

```text
SUMMON_ACCESS_MODE=paid
```

Leaving it unset, or setting any value other than `paid`, keeps testing access
active. This is deliberately fail-open for the testing phase; switch the
variable before announcing paid access.

## Required environment variables

```text
STRIPE_SUMMON_MEMBERSHIP_LINK=https://buy.stripe.com/...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Apply the new entitlement and OAuth tables before deploying the code:

```bash
npx prisma db push
```

Point the Stripe webhook at `https://summon.guide/api/webhook` and subscribe it to:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

The webhook grants membership by the purchaser email after checkout and maintains it from Stripe subscription events. Configure the endpoint secret before production. The endpoint refuses unverified events when `STRIPE_WEBHOOK_SECRET` is configured.

## MCP OAuth

Remote clients discover Summon OAuth at:

```text
https://summon.guide/.well-known/oauth-authorization-server
```

The authorization server supports dynamic client registration,
authorization-code flow with S256 PKCE, and rotating refresh tokens. In paid
mode, an active Summon membership is required at authorization and refresh. The
MCP endpoint remains:

```text
https://summon.guide/api/mcp
```
