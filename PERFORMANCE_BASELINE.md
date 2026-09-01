# Performance Baseline - RAJ-884

## Measurement Date
2026-09-01

## Baseline Score (from DIIB 25 Aug–1 Sep 2026)
**Live URL**: https://asimov-ai.org/
**Mobile Performance**: 49/100 (was 43 on 4–11 Aug)

## Identified Issues
1. **Oversized images**: rajiv-abeysinghe.png is 451KB displayed at 128x128px
2. **Render-blocking fonts**: Multiple Google Fonts (Geist, Hanken Grotesk, JetBrains Mono, Material Symbols)
3. **Synchronous third-party scripts**: Facebook Pixel & Google Analytics in head
4. **YouTube iframes**: Two embedded videos not lazy-loaded

## Optimization Plan
1. Convert images to WebP format with appropriate sizes
2. Implement font-display: swap and preload critical fonts
3. Defer third-party tracking scripts
4. Lazy load YouTube embeds
5. Add resource hints (dns-prefetch, preconnect)
