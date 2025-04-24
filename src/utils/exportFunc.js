import { jsPDF } from 'jspdf';
import { formatDate, formatDateForFilename } from './validators';


export const exportFunc = (allInvoices, selectedIds) => {
  try {
    const invoicesToExport = allInvoices.filter(inv =>
      selectedIds.includes(inv._id)
    );

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yOffset = 20;


    const drawHeader = () => {
      doc.setFontSize(16);
      doc.text('YourBuisness — Invoices', pageWidth / 2, 10, { align: 'center' });
      yOffset = 20;
    };
    drawHeader();

    invoicesToExport.forEach((inv, idx) => {
      const rectX = 15;
      const rectY = yOffset;
      const rectW = pageWidth - 30;
      const innerM = 5;
      let textY = rectY + innerM;
      const textX = rectX + innerM;

      doc.setFontSize(12);
      doc.text(`Invoice ID: ${inv._id}`, textX, textY);
      textY += 6;
      doc.text(`Status: ${inv.status}`, textX, textY);
      textY += 6;
      doc.text(`Amount: Rs ${inv.amount.toFixed(2)}`, textX, textY);
      textY += 6;
      doc.text(
        `Due Date: ${new Date(inv.dueDate).toLocaleDateString()}`,
        textX,
        textY
      );
      textY += 8;

      if (inv.orders?.length) {
        doc.text('Order IDs:', textX, textY);
        textY += 6;
        inv.orders.forEach(orderId => {
          doc.text(`• ${orderId}`, textX + 4, textY);
          textY += 5;
        });
      }

      // border
      const rectH = textY - rectY + innerM;
      doc.setLineWidth(0.3);
      doc.rect(rectX, rectY, rectW, rectH);

      // advance, new page if needed
      yOffset = rectY + rectH + 12;
      if (yOffset > 270 && idx < invoicesToExport.length - 1) {
        doc.addPage();
        drawHeader();
      }
    });

    const curDate = new Date();
    const parts = formatDateForFilename(curDate);
    const name = parts.join('_') + '_invoice.pdf';


    doc.save(name);
  } catch (err) {
    if (err) throw new Error(err);
  }
};
