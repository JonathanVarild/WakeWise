FROM python:3.11-slim AS base
WORKDIR /app
COPY . .

FROM base AS dev

# Install system dependencies for PyAudio + Pygame + GPIO + rpi_ws281x
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    make \
    cmake \
    git \
    python3-dev \
    portaudio19-dev \
    libasound2-dev \
    libglib2.0-0 \
    libsdl2-2.0-0 \
    libsdl2-mixer-2.0-0 \
    libsmpeg0 \
    libogg0 \
    libvorbis0a \
    libvorbisfile3 \
    libflac12 \
    libmpg123-0 \
    build-essential \
    pkg-config \
    # Raspberry Pi / GPIO
    python3-rpi.gpio \
    i2c-tools \
    libgpiod2 \
    # För att säkerställa ws281x-kompilation
    libffi-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Python dependencies including GPIO, NeoPixel, and WS281x
RUN pip install --no-cache-dir \
    RPi.GPIO \
    rpi_ws281x \
    adafruit-circuitpython-neopixel \
    -r requirements.dev.txt \
    -r requirements.txt

# Use dummy audio driver in dev
#'ENV SDL_AUDIODRIVER=dummy

# Default command (auto-restart on code change in dev)
CMD ["watchmedo", "auto-restart", "--directory=./", "--pattern=*.py", "--recursive", "--", "python", "-u", "core.py"]
