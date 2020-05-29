/*
 * LightningChartJS example that shows the creation and styling of a donut chart.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    PieChartTypes,
    SolidLine,
    UIElementBuilders,
    LegendBoxBuilders,
    SolidFill,
    ColorRGBA,
    UIDraggingModes,
    SolidFillPalette,
    SliceLabelFormatters,
    UIOrigins
} = lcjs

const donut = lightningChart().Pie({ type: PieChartTypes.LabelsInsideSlices })
    .setTitle('Inter Hotels - hotel visitors in June 2016')
    .setPadding({ top: 40 })
    .setAnimationsEnabled(true)
    .setMultipleSliceExplosion(false)
    // Style as "Donut Chart"
    .setInnerRadius(60)

// ----- Cache stroke style used for Slice borders. -----
const customStrokeStyle = new SolidLine({ fillStyle: new SolidFill({ color: ColorRGBA(50, 70, 80) }), thickness: 5 })

// ----- Static data -----
const data = {
    country: ['US', 'Canada', 'Greece', 'UK', 'Finland', 'Denmark'],
    values: [15000, 20030, 8237, 16790, 9842, 4300]
}
// Preparing data for each Slice
const processedData = []
let totalVisitor = 0
for (let i = 0; i < data.values.length; i++) {
    totalVisitor += data.values[i]
    processedData.push({ name: `${data.country[i]}`, value: data.values[i] })
}

// ----- Create custom Palette for Donut (defines color of Slice filling) ----
const colorArray = [
    ColorRGBA(219, 155, 36, 255),
    ColorRGBA(219, 102, 36, 255),
    ColorRGBA(173, 21, 74, 255),
    ColorRGBA(173, 168, 21, 255),
    ColorRGBA(223, 64, 64, 255),
    ColorRGBA(173, 100, 21, 255)
]

// The color palette should be a function that returns a specific color - in this case, just return a color from a specific index in the array
const colorPalette = (length) => (index) => {
    return colorArray[index]
}

// Use the SolidFillPalette to create a fillStyle palette which the chart can use to easily assign fillStyles using colors from the given color palette
const fillStylePalette = SolidFillPalette(colorPalette, data.values.length)
// Set the custom fillStyle for the Donut Chart
donut.setSliceFillStyle(fillStylePalette)

// ----- Create Slices -----
processedData.map((item) => donut.addSlice(item.name, item.value))
donut.setLabelFormatter(SliceLabelFormatters.NamePlusValue).setSliceStrokeStyle(customStrokeStyle)
// ----- Add LegendBox -----
donut.addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
    .setPosition({ x: 1, y: 99 })
    .setOrigin(UIOrigins.LeftTop)
    .setMargin(5)
    .add(donut)

// ----- Add TextBox -----
donut.addUIElement(UIElementBuilders.TextBox.addStyler(
    textBox =>
        textBox.setFont(fontSettings => fontSettings.setSize(25)).setText(`Total: ${totalVisitor} visitors`)
))
    .setPosition({ x: 50, y: 50 })
    .setOrigin(UIOrigins.CenterTop)
    .setDraggingMode(UIDraggingModes.notDraggable)
    .setMargin(5)
