import busio # type: ignore
import digitalio # type: ignore
import board # type: ignore

from adafruit_rgb_display import color565 # type: ignore
import adafruit_rgb_display.ili9341 as ili9341 # type: ignore

display_width=240
display_height=320

def init_display():
    #-- Pin configurations ---------------------
    cs = digitalio.DigitalInOut(board.D26)      # DO NOT USE OR CHANGE THIS IN SOFTWARE NOR USE THE HARDWARE PIN
    dc = digitalio.DigitalInOut(board.D25)      # GPIO25 on Pi
    dc.direction = digitalio.Direction.OUTPUT   # Set as output
    dc.value = False                            # Set initial value to LOW (0)

    rst = digitalio.DigitalInOut(board.D24)     # GPIO24 on Pi
    rst.direction = digitalio.Direction.OUTPUT  # Set as output
    rst.value = True                            # Set initial value to HIGH (1)

    sclk = board.SCLK                           # Identifies SPI0_SCLK on RPi (GPIO11)
    mosi = board.MOSI                           # Identifies SPI0_MOSI on RPI (GPIO10)
    #-------------------------------------------

    # Baudrate is set to 40MHz
    baudrate = 30000000

    # Setup SPI bus using hardware SPI:
    spi = busio.SPI(clock=sclk, MOSI=mosi)

    # Create the ILI9341 display:
    display = ili9341.ILI9341(
            spi, 
            dc=dc,
            cs=cs,
            baudrate=baudrate,
            rst=rst,
            width=display_width,      # Display width
            height=display_height,     # Display height
            rotation=270     # Rotate 270 degrees => Landscape Mode
    )
    return display