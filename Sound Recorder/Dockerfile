FROM python:3.11-slim AS base
WORKDIR /app
COPY . .

FROM base AS dev
RUN pip install --no-cache-dir -r requirements.dev.txt
CMD ["watchmedo", "auto-restart", "--directory=./", "--pattern=*.py", "--recursive", "--", "python", "-u", "sound_recorder.py"]
