import { jsPDF } from 'jspdf';

export const exportFunc = (allInvoices, selectedIds) => {
  // filter out only those you actually ticked
  const invoicesToExport = allInvoices.filter(inv =>
    selectedIds.includes(inv.id)
  );

  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yOffset = 20;

  // … your header drawing code …

  invoicesToExport.forEach((invoice, index) => {
    const rectX = 20;
    const rectY = yOffset;
    const rectWidth = pageWidth - 40;
    const innerMargin = 5;
    let textY = rectY + innerMargin;
    const textX = rectX + innerMargin;

    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, textX, textY);
    textY += 7;
    doc.text(`Order Details:`, textX, textY);
    textY += 7;

    // wrap long details
    const lines = doc.splitTextToSize(
      invoice.orderDetails,
      rectWidth - 2 * innerMargin
    );
    doc.text(lines, textX, textY);
    textY += lines.length * 7;

    doc.text(`Total Amount: $${invoice.total.toFixed(2)}`, textX, textY);
    textY += 7;

    // draw border around the block
    const rectHeight = textY - rectY + innerMargin;
    doc.setLineWidth(0.3);
    doc.rect(rectX, rectY, rectWidth, rectHeight);

    // move yOffset for next invoice
    yOffset = rectY + rectHeight + 15;

    // if space runs out, add new page + redraw header
    if (yOffset > 250 && index < invoicesToExport.length - 1) {
      doc.addPage();
      yOffset = 20;
      // … redraw header on new page …
    }
  });

  doc.save('invoices.pdf');
};
