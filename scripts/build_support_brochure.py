from pathlib import Path
from textwrap import shorten

from PIL import Image
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor, Color, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.graphics import renderPDF


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output/pdf/The-Dialogue-Platform-Partnership-Brochure.pdf"

LOGO = ROOT / "public/assets/logo.png"
PANEL = ROOT / "public/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-panel.jpg"
SPEAKER = ROOT / "public/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-speaker.jpg"
AUDIENCE_1 = ROOT / "public/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-audience-01.jpg"
AUDIENCE_2 = ROOT / "public/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-audience-02.jpg"

PAGE_W, PAGE_H = A4

NAVY = HexColor("#082F4C")
BLUE = HexColor("#0B3A5D")
MID_BLUE = HexColor("#1F5F7D")
ORANGE = HexColor("#F2A33A")
CREAM = HexColor("#F7F2E8")
INK = HexColor("#1F2A30")
MUTED = HexColor("#52616A")
LINE = HexColor("#D7D2C7")
PALE_BLUE = HexColor("#EAF2F6")
PALE_ORANGE = HexColor("#FFF1DB")


def draw_image_cover(c, image_path, x, y, width, height, anchor_x=0.5, anchor_y=0.5):
    with Image.open(image_path) as image:
        image_width, image_height = image.size
    scale = max(width / image_width, height / image_height)
    draw_width = image_width * scale
    draw_height = image_height * scale
    draw_x = x - (draw_width - width) * anchor_x
    draw_y = y - (draw_height - height) * anchor_y
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, width, height)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(str(image_path), draw_x, draw_y, draw_width, draw_height, mask="auto")
    c.restoreState()


def wrap_text(text, font_name, font_size, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if stringWidth(candidate, font_name, font_size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_paragraph(c, text, x, y, max_width, font="Helvetica", size=10.5, leading=15, color=INK, max_lines=None):
    lines = wrap_text(text, font, size, max_width)
    if max_lines and len(lines) > max_lines:
        lines = lines[:max_lines]
        lines[-1] = shorten(lines[-1], width=max(10, len(lines[-1]) - 3), placeholder="...")
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_footer(c, page_number, dark=False):
    color = Color(1, 1, 1, alpha=0.66) if dark else MUTED
    c.setStrokeColor(Color(1, 1, 1, alpha=0.22) if dark else LINE)
    c.setLineWidth(0.6)
    c.line(42, 34, PAGE_W - 42, 34)
    c.setFillColor(color)
    c.setFont("Helvetica", 7.5)
    c.drawString(42, 20, "THEDIALOGUEPLATFORM.COM")
    c.drawRightString(PAGE_W - 42, 20, f"{page_number:02d}")


def draw_brand(c, x, y, light=False):
    c.saveState()
    c.setFillColor(white)
    c.roundRect(x, y - 42, 42, 42, 5, fill=1, stroke=0)
    c.drawImage(str(LOGO), x + 3, y - 39, 36, 36, mask="auto", preserveAspectRatio=True)
    c.setFillColor(white if light else NAVY)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(x + 52, y - 16, "THE DIALOGUE PLATFORM")
    c.setFont("Helvetica", 6.8)
    c.drawString(x + 52, y - 30, "TRUST AND PEACE THROUGH DIALOGUE")
    c.restoreState()


def draw_eyebrow(c, text, x, y, dark=False):
    font = "Helvetica-Bold"
    size = 7.5
    padding_x = 10
    width = stringWidth(text, font, size) + padding_x * 2
    c.setFillColor(Color(1, 1, 1, alpha=0.14) if dark else PALE_ORANGE)
    c.roundRect(x, y - 17, width, 20, 10, fill=1, stroke=0)
    c.setFillColor(white if dark else BLUE)
    c.setFont(font, size)
    c.drawString(x + padding_x, y - 11, text)


def draw_qr(c, value, x, y, size):
    widget = qr.QrCodeWidget(value)
    bounds = widget.getBounds()
    width = bounds[2] - bounds[0]
    height = bounds[3] - bounds[1]
    drawing = Drawing(size, size, transform=[size / width, 0, 0, size / height, 0, 0])
    drawing.add(widget)
    renderPDF.draw(drawing, c, x, y)


def page_cover(c):
    draw_image_cover(c, PANEL, 0, 0, PAGE_W, PAGE_H, anchor_y=0.45)
    c.setFillColor(Color(0.02, 0.12, 0.2, alpha=0.72))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(Color(0.95, 0.64, 0.23, alpha=0.88))
    c.rect(0, 0, 12, PAGE_H, fill=1, stroke=0)
    draw_brand(c, 44, PAGE_H - 46, light=True)
    draw_eyebrow(c, "PARTNERSHIP AND SUPPORT BROCHURE", 44, 505, dark=True)
    c.setFillColor(white)
    c.setFont("Times-Bold", 41)
    c.drawString(44, 440, "Dialogue belongs")
    c.drawString(44, 393, "to everyone.")
    c.setFillColor(ORANGE)
    c.rect(44, 365, 88, 5, fill=1, stroke=0)
    draw_paragraph(
        c,
        "A free, independent platform for every voice - without exclusion.",
        44,
        330,
        420,
        font="Helvetica-Bold",
        size=16,
        leading=22,
        color=white,
    )
    draw_paragraph(
        c,
        "Partner with us to protect open civic dialogue and create more places where people can listen, question, disagree, and build trust.",
        44,
        265,
        410,
        size=11,
        leading=17,
        color=Color(1, 1, 1, alpha=0.85),
    )
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(44, 73, "OSLO, NORWAY")
    c.drawRightString(PAGE_W - 44, 73, "DIALOG PLATTFORM | ORG. NO. 935 674 220")
    c.showPage()


def page_mission(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_brand(c, 42, PAGE_H - 38)
    draw_eyebrow(c, "WHY WE EXIST", 42, PAGE_H - 126)
    c.setFillColor(NAVY)
    c.setFont("Times-Bold", 31)
    c.drawString(42, PAGE_H - 180, "A public space for difficult truths")
    draw_paragraph(
        c,
        "The Dialogue Platform is a free and independent civic platform. We welcome different political, social, cultural, and generational perspectives, and we do not exclude people because their views are difficult or unfamiliar.",
        42,
        PAGE_H - 218,
        510,
        size=11,
        leading=17,
        color=INK,
    )

    draw_image_cover(c, SPEAKER, 322, 340, 231, 200, anchor_x=0.55, anchor_y=0.5)
    c.setStrokeColor(ORANGE)
    c.setLineWidth(4)
    c.line(322, 340, 553, 340)

    c.setFillColor(BLUE)
    c.roundRect(42, 340, 250, 200, 8, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(62, 511, "OUR PURPOSE")
    draw_paragraph(
        c,
        "To build trust and peace through structured dialogue that allows people to be heard with dignity, challenges ideas without dehumanising people, and searches for common ground without demanding uniformity.",
        62,
        480,
        210,
        size=11,
        leading=17,
        color=white,
    )

    facts = [
        ("OPEN", "All perspectives can enter the conversation."),
        ("INDEPENDENT", "No party or donor controls the platform's voice."),
        ("PUBLIC", "Dialogues and learning remain accessible to the community."),
    ]
    y = 286
    for label, description in facts:
        c.setFillColor(ORANGE)
        c.circle(50, y + 5, 4, fill=1, stroke=0)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(66, y, label)
        draw_paragraph(c, description, 160, y, 385, size=9.5, leading=13, color=MUTED)
        y -= 48
    draw_footer(c, 2)
    c.showPage()


def page_work(c):
    c.setFillColor(white)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_brand(c, 42, PAGE_H - 38)
    draw_eyebrow(c, "WHAT WE DO", 42, PAGE_H - 126)
    c.setFillColor(NAVY)
    c.setFont("Times-Bold", 33)
    c.drawString(42, PAGE_H - 180, "Dialogue with a public purpose")
    draw_paragraph(
        c,
        "We connect lived experience, public institutions, expertise, and community leadership in formats designed for careful listening and accountable discussion.",
        42,
        PAGE_H - 218,
        510,
        size=11,
        leading=17,
        color=MUTED,
    )

    items = [
        ("01", "PUBLIC DIALOGUES", "Independent sessions on Sudan, peace, citizenship, democracy, and social cohesion."),
        ("02", "FACILITATION", "Conflict-sensitive formats that make disagreement safer, clearer, and more constructive."),
        ("03", "DOCUMENTATION", "Video, photography, and summaries that extend access beyond the room."),
        ("04", "CIVIC CONNECTION", "Partnerships that connect community voices with institutions and practical pathways."),
    ]
    x_positions = [42, 304]
    y_positions = [470, 325]
    for index, (number, title, description) in enumerate(items):
        x = x_positions[index % 2]
        y = y_positions[index // 2]
        c.setFillColor(PALE_BLUE if index % 2 == 0 else PALE_ORANGE)
        c.roundRect(x, y, 249, 126, 8, fill=1, stroke=0)
        c.setFillColor(ORANGE if index % 2 == 0 else BLUE)
        c.setFont("Helvetica-Bold", 18)
        c.drawString(x + 18, y + 92, number)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(x + 18, y + 68, title)
        draw_paragraph(c, description, x + 18, y + 48, 210, size=9.2, leading=13, color=MUTED)

    draw_image_cover(c, AUDIENCE_1, 42, 72, 511, 220, anchor_y=0.52)
    c.setFillColor(Color(0.03, 0.18, 0.3, alpha=0.24))
    c.rect(42, 72, 511, 220, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(58, 94, "THE ROOM IS ONLY THE BEGINNING. THE CONVERSATION CONTINUES IN PUBLIC.")
    draw_footer(c, 3)
    c.showPage()


def page_independence(c):
    c.setFillColor(NAVY)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_brand(c, 42, PAGE_H - 38, light=True)
    draw_eyebrow(c, "WHY INDEPENDENCE MATTERS", 42, PAGE_H - 126, dark=True)
    c.setFillColor(white)
    c.setFont("Times-Bold", 34)
    c.drawString(42, PAGE_H - 186, "Freedom needs a foundation.")
    draw_paragraph(
        c,
        "For the platform to remain free for participants, it must remain independent in how it chooses topics, invites voices, facilitates disagreement, and publishes dialogue.",
        42,
        PAGE_H - 227,
        500,
        size=11.5,
        leading=18,
        color=Color(1, 1, 1, alpha=0.84),
    )

    c.setFillColor(ORANGE)
    c.rect(42, 505, 82, 5, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Times-Italic", 22)
    draw_paragraph(
        c,
        '"Support keeps the door open. It does not decide who may enter or what they may say."',
        42,
        470,
        500,
        font="Times-Italic",
        size=22,
        leading=29,
        color=white,
    )

    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(ORANGE)
    c.drawString(42, 330, "WHAT SUPPORT MAKES POSSIBLE")
    priorities = [
        ("Accessible venues and participation", 0.88),
        ("Professional facilitation and preparation", 0.76),
        ("Filming, editing, and public documentation", 0.68),
        ("Translation, digital access, and outreach", 0.61),
    ]
    y = 288
    for label, width_ratio in priorities:
        c.setFillColor(Color(1, 1, 1, alpha=0.15))
        c.roundRect(42, y - 5, 420, 10, 5, fill=1, stroke=0)
        c.setFillColor(ORANGE)
        c.roundRect(42, y - 5, 420 * width_ratio, 10, 5, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("Helvetica", 9.5)
        c.drawString(42, y + 15, label)
        y -= 53
    draw_footer(c, 4, dark=True)
    c.showPage()


def page_partnership(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_brand(c, 42, PAGE_H - 38)
    draw_eyebrow(c, "PARTNER WITH US", 42, PAGE_H - 126)
    c.setFillColor(NAVY)
    c.setFont("Times-Bold", 33)
    c.drawString(42, PAGE_H - 180, "Build the conditions")
    c.drawString(42, PAGE_H - 218, "for honest dialogue")
    draw_paragraph(
        c,
        "We welcome partners who respect editorial independence, participant dignity, and the right of different voices to be present.",
        42,
        PAGE_H - 254,
        510,
        size=11,
        leading=17,
        color=MUTED,
    )

    paths = [
        ("PROGRAM PARTNER", "Co-develop a dialogue series, civic learning programme, or public forum."),
        ("INSTITUTIONAL PARTNER", "Connect dialogue outcomes with municipalities, universities, civil society, or services."),
        ("MEDIA AND ACCESS PARTNER", "Help document, translate, distribute, or make events accessible to wider audiences."),
        ("PHILANTHROPIC PARTNER", "Provide flexible support that protects continuity and independence across the year."),
    ]
    y = 470
    for index, (title, description) in enumerate(paths):
        c.setFillColor(white)
        c.roundRect(42, y, 511, 78, 7, fill=1, stroke=0)
        c.setFillColor(ORANGE if index % 2 == 0 else MID_BLUE)
        c.rect(42, y, 6, 78, fill=1, stroke=0)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(66, y + 50, title)
        draw_paragraph(c, description, 66, y + 30, 458, size=9.3, leading=13, color=MUTED)
        y -= 92

    draw_image_cover(c, AUDIENCE_2, 42, 62, 511, 126, anchor_y=0.48)
    c.setFillColor(Color(0.03, 0.18, 0.3, alpha=0.52))
    c.rect(42, 62, 511, 126, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(58, 84, "PARTNERS CONTRIBUTE RESOURCES. THE PLATFORM RETAINS ITS INDEPENDENCE.")
    draw_footer(c, 5)
    c.showPage()


def page_support(c):
    c.setFillColor(BLUE)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(ORANGE)
    c.rect(0, PAGE_H - 12, PAGE_W, 12, fill=1, stroke=0)
    draw_brand(c, 42, PAGE_H - 38, light=True)
    draw_eyebrow(c, "KEEP DIALOGUE FREE", 42, PAGE_H - 126, dark=True)
    c.setFillColor(white)
    c.setFont("Times-Bold", 34)
    c.drawString(42, PAGE_H - 184, "Support an independent")
    c.drawString(42, PAGE_H - 222, "public space")
    draw_paragraph(
        c,
        "Every contribution helps us host more conversations, reach more people, and keep participation open. We welcome one-time gifts, ongoing support, and institutional contributions.",
        42,
        PAGE_H - 260,
        505,
        size=11.2,
        leading=17,
        color=Color(1, 1, 1, alpha=0.84),
    )

    options = [
        ("ONE-TIME GIFT", "Support a specific event or an immediate production need."),
        ("ONGOING SUPPORT", "Help sustain the platform's independent work across the year."),
        ("INSTITUTIONAL CONTRIBUTION", "Fund a programme while respecting editorial and facilitation independence."),
    ]
    y = 420
    for title, description in options:
        c.setFillColor(Color(1, 1, 1, alpha=0.1))
        c.roundRect(42, y, 330, 78, 8, fill=1, stroke=0)
        c.setFillColor(ORANGE)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(60, y + 50, title)
        draw_paragraph(c, description, 60, y + 30, 285, size=9.2, leading=13, color=white)
        y -= 92

    c.setFillColor(white)
    c.roundRect(405, 252, 148, 245, 9, fill=1, stroke=0)
    draw_qr(c, "https://www.thedialogueplatform.com/en/support", 425, 329, 108)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawCentredString(479, 304, "SCAN TO SUPPORT")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawCentredString(479, 288, "Partnership and giving options")

    c.setFillColor(ORANGE)
    c.rect(42, 182, 511, 4, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(42, 151, "START A CONVERSATION")
    c.setFont("Helvetica", 10.5)
    c.drawString(42, 128, "contact@thedialogueplatform.com")
    c.drawString(42, 108, "www.thedialogueplatform.com/en/support")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(Color(1, 1, 1, alpha=0.68))
    c.drawString(42, 82, "DIALOG PLATTFORM | Org. no. 935 674 220 | Registered in Norway")
    draw_footer(c, 6, dark=True)
    c.showPage()


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("The Dialogue Platform - Partnership and Support Brochure")
    c.setAuthor("The Dialogue Platform")
    c.setSubject("Partnership, independence, and support opportunities")
    page_cover(c)
    page_mission(c)
    page_work(c)
    page_independence(c)
    page_partnership(c)
    page_support(c)
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
