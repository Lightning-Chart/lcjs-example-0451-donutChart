/*
 * LightningChartJS example that shows the creation and styling of a donut chart.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    PieChartTypes,
    UIElementBuilders,
    LegendBoxBuilders,
    UIDraggingModes,
    SliceLabelFormatters,
    UIOrigins,
    emptyFill,
    emptyLine,
    Themes,
} = lcjs

const donut = lightningChart()
    .Pie({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
        type: PieChartTypes.LabelsInsideSlices,
    })
    .setTitle('Inter Hotels - hotel visitors in June 2016')
    .setPadding({ top: 40 })
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
// ----- Add LegendBox -----
donut
    .addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
    // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
    .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.8,
    })
    .add(donut)

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
