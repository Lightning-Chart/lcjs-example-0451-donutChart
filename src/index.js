/*
 * LightningChartJS example that shows the creation and styling of a donut chart.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    PieChartTypes,
    UIElementBuilders,
    UIDraggingModes,
    SliceLabelFormatters,
    UIOrigins,
    emptyFill,
    emptyLine,
    Themes,
} = lcjs

const donut = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .Pie({
        theme: (() => {
    const t = Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    const smallView = window.devicePixelRatio >= 2
    if (!window.__lcjsDebugOverlay) {
        window.__lcjsDebugOverlay = document.createElement('div')
        window.__lcjsDebugOverlay.style.cssText = 'position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);color:#fff;padding:4px 8px;z-index:99999;font:12px monospace;pointer-events:none'
        if (document.body) document.body.appendChild(window.__lcjsDebugOverlay)
        setInterval(() => {
            if (!window.__lcjsDebugOverlay.parentNode && document.body) document.body.appendChild(window.__lcjsDebugOverlay)
            window.__lcjsDebugOverlay.textContent = window.innerWidth + 'x' + window.innerHeight + ' dpr=' + window.devicePixelRatio + ' small=' + (window.devicePixelRatio >= 2)
        }, 500)
    }
    return t && smallView ? lcjs.scaleTheme(t, 0.5) : t
})(),
textRenderer: window.devicePixelRatio >= 2 ? lcjs.htmlTextRenderer : undefined,
        type: PieChartTypes.LabelsInsideSlices,
    })
    .setTitle('Inter Hotels - hotel visitors in June 2016')
    .setMultipleSliceExplosion(false)
    // Style as "Donut Chart"
    .setInnerRadius(60)

// ----- Static data -----
const data = {
    country: ['US', 'Canada', 'Greece', 'UK', 'Finland', 'Denmark'],
    values: [15000, 20030, 8237, 16790, 9842, 4300],
}
// Preparing data for each Slice
const processedData = []
let totalVisitor = 0
for (let i = 0; i < data.values.length; i++) {
    totalVisitor += data.values[i]
    processedData.push({ name: `${data.country[i]}`, value: data.values[i] })
}

// ----- Create Slices -----
processedData.map((item) => donut.addSlice(item.name, item.value))
donut.setLabelFormatter(SliceLabelFormatters.NamePlusValue)

// ----- Add TextBox -----
donut
    .addUIElement(UIElementBuilders.TextBox)
    .setPosition({ x: 50, y: 50 })
    .setOrigin(UIOrigins.CenterTop)
    .setDraggingMode(UIDraggingModes.notDraggable)
    .setMargin(5)
    .setTextFont((fontSettings) => fontSettings.setSize(25))
    .setText(`Total: ${totalVisitor} visitors`)
    .setBackground((background) => background.setFillStyle(emptyFill).setStrokeStyle(emptyLine))
