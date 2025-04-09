FROM python:3.11-slim as base
WORKDIR /app
COPY . .

FROM base AS dev
RUN pip install --no-cache-dir -r requirements.dev.txt
RUN pip install --no-cache-dir -r requirements.txt
CMD ["watchmedo", "auto-restart", "--directory=./", "--pattern=*.py", "--recursive", "--", "python", "-u", "core.py"]
