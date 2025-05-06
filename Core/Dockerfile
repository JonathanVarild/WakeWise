FROM python:3.11-slim as base
WORKDIR /app
COPY . .

FROM base AS dev
RUN pip install --no-cache-dir -r requirements.dev.txt
RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libsdl2-2.0-0 \
    libsdl2-mixer-2.0-0 \
    libsmpeg0 \
    libogg0 \
    libvorbis0a \
    libvorbisfile3 \
    libflac12 \
    libmpg123-0 \
    && rm -rf /var/lib/apt/lists/*

ENV SDL_AUDIODRIVER=dummy

CMD ["watchmedo", "auto-restart", "--directory=./", "--pattern=*.py", "--recursive", "--", "python", "-u", "core.py"]
