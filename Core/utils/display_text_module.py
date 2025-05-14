from utils.display_init import display_height, display_width
from PIL import Image, ImageDraw, ImageFont
canvas_size = (display_height, display_width)

default_font_path = "/home/wakewise/lab environment/LCD GIT/Assets/default_font.ttf"

class Text: 
    size_map = {
        "small": 18,
        "medium": 22,
        "large": 28,
        "xlarge": 65
    }

    def __init__(
            self, 
            text, 
            font_path=default_font_path, 
            size_label="medium", 
            anchor="top-left", 
            offset=(0,0), 
            color=(255,255,255)
    ):
        if size_label not in self.size_map:
            raise ValueError(f"Invallid font size '{size_label}', must be one of {list(self.size_map)}")
        
        self.text = text
        self.font_path = default_font_path
        self.font_size = self.size_map[size_label]
        self.anchor = anchor
        self.offset = offset
        self.color = color
        self.font = ImageFont.truetype(self.font_path, self.font_size)

    def update_text(self, new_text):
        self.text = new_text

    def update_position(self, anchor=None, offset=None):
        if anchor: self.anchor = anchor
        if offset: self.offset = offset

    def update_font_size(self, size_label):
        if size_label not in self.size_map:
            raise ValueError(f"Invalid font size '{size_label}'")
        self.font_size = self.size_map[size_label]
        self.font = ImageFont.truetype(self.font_path, self.font_size)

    def get_text_size(self, draw):
        ascent, descent = self.font.getmetrics()
        width = self.font.getmask(self.text).getbbox()[2]  # getmask gives better width than textbbox sometimes
        height = ascent + descent
        return width, height

    def get_position(self, draw, canvas_size):
        text_width, text_height = self.get_text_size(draw)
        canvas_w, canvas_h = canvas_size

        anchors = {
            "top-left": (0, 0),
            "top-center": ((canvas_w - text_width) // 2, 0),
            "top-right": (canvas_w - text_width, 0),
            "center-left": (0, (canvas_h - text_height) // 2),
            "center": ((canvas_w - text_width) // 2, (canvas_h - text_height) // 2),
            "center-right": (canvas_w - text_width, (canvas_h - text_height) // 2),
            "bottom-left": (0, canvas_h - text_height),
            "bottom-center": ((canvas_w - text_width) // 2, canvas_h - text_height),
            "bottom-right": (canvas_w - text_width, canvas_h - text_height),
        }

        if self.anchor not in anchors:
            raise ValueError(f"Invalid anchor '{self.anchor}'")

        base_x, base_y = anchors[self.anchor]
        offset_x, offset_y = self.offset
        return (base_x + offset_x, base_y + offset_y)
    
    def draw(self, image):
        draw = ImageDraw.Draw(image)
        position = self.get_position(draw, image.size)
        draw.text(position, self.text, font=self.font, fill=self.color)
        return image