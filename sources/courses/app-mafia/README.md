# App Mafia course intake

This directory is the private intake point for App Mafia course material the
summon.guide operator owns or is licensed to process.

## Accepted inputs

- exported lesson transcripts
- personal notes
- licensed PDFs or worksheets
- links to videos the operator is authorized to process

Keep source material private. Do not copy gated lessons into
`content/distilled/` or `content/knowledge/`.

## Publishing path

1. Put authorized raw material under `_raw/`.
2. Create original lesson syntheses under `content/knowledge/app-mafia-course/`.
3. Preserve lesson titles and source references so chat answers can cite them.
4. Register the source corpus only after the syntheses exist.
5. Run `npm run corpus:build` and verify chat citations.

The public preview already lives at
`content/distilled/app-mafia-course.md`. Its chat action remains disabled until
an authorized, synthesized corpus exists.
