
FROM node:20 AS development

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./


RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --prod=false

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["pnpm", "dev"]


FROM node:20 AS builder

WORKDIR /app
COPY --from=development /app .
RUN pnpm build


FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .

RUN npm install -g pnpm && \
    pnpm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["pnpm", "start"]