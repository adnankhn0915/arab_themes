def _p(primary, accent, background, surface, dark, soft, navbar_text="#FFFFFF"):
    return {
        "primary_color": primary,
        "accent_color": accent,
        "body_bg": background,
        "sidebar_bg": surface,
        "dark_color": dark,
        "soft_color": soft,
        "navbar_bg": primary,
        "navbar_text": navbar_text,
    }


PALETTES = {
    "Royal Purple": _p("#5B21B6", "#A855F7", "#F8F5FE", "#F3EEFD", "#3B0F7A", "#E4D8FA"),
    "Ocean Teal": _p("#0F766E", "#14B8A6", "#F4FAF9", "#E6F6F4", "#0B4F4A", "#CDEDE9"),
    "Dark Blue": _p("#0B3D91", "#2563EB", "#F1F5FB", "#EAF0FA", "#082A66", "#D3E0F7"),
    "Rose Pink": _p("#BE185D", "#F43F5E", "#FFF6FA", "#FDECF3", "#86104A", "#F9D3E3"),
    "Coffee Brown": _p("#6F4E37", "#B07D56", "#FBF7F3", "#F3EAE2", "#4A3425", "#E6D5C7"),
    "Indigo Night": _p("#312E81", "#6366F1", "#F5F5FD", "#ECEBFA", "#1E1B5E", "#D9D7F5"),
    "Dark Green": _p("#166534", "#22C55E", "#F4FAF6", "#E8F5EC", "#0E4222", "#CFE9D7"),
    "Crimson Red": _p("#991B1B", "#EF4444", "#FFF7F7", "#FBECEC", "#6B1212", "#F6D0D0"),
    "Sunset Orange": _p("#C2410C", "#F97316", "#FFF8F3", "#FDEFE6", "#8A2E08", "#F9D9C4"),
    "Sky Blue": _p("#0369A1", "#0EA5E9", "#F3F9FD", "#E6F3FA", "#024B73", "#CBE5F4"),
    "Charcoal Grey": _p("#374151", "#6B7280", "#F6F7F8", "#EEF0F2", "#1F2937", "#DADDE2"),
    "Lime Fresh": _p("#4D7C0F", "#84CC16", "#F8FBF2", "#F0F7E4", "#365A0A", "#DDEBC4"),
}
