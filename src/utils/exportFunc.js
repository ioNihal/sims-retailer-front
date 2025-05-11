
import { jsPDF } from 'jspdf';
import { capitalize, formatDateForFilename } from './validators';

export const exportFunc = (allInvoices, selectedIds) => {
  const invoicesToExport = allInvoices.filter(inv =>
    selectedIds.includes(inv._id)
  );
  if (!invoicesToExport.length) return;

  const user = JSON.parse(localStorage.getItem('user'));
  const doc = new jsPDF({ unit: 'pt', format: 'A4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const usableWidth = pageWidth - margin * 2;

  invoicesToExport.forEach((inv, idx) => {
    //HEADER 
    doc.setFontSize(18);
    doc.text('YourBusiness Name', margin, 50);
    doc.setFontSize(10);
    doc.text('123 Business Street, City, Country', margin, 65);
    doc.text('Phone: +1 234 5678   Email: info@yourbusiness.com', margin, 80);

    // INVOICE METADATA & PAYMENT INFO
    doc.setFontSize(16);
    doc.text('INVOICE', pageWidth - margin, 50, { align: 'right' });
    doc.setFontSize(10);
    const metaY = 70;
    doc.text(`Invoice #: ${inv._id}`, pageWidth - margin, metaY, { align: 'right' });
    doc.text(`Date: ${new Date(inv.createdAt).toLocaleDateString()}`, pageWidth - margin, metaY + 14, { align: 'right' });
    doc.text(`Due: ${new Date(inv.dueDate).toLocaleDateString()}`, pageWidth - margin, metaY + 28, { align: 'right' });

    // new payment fields
    doc.text(`Payment Method: ${inv.method.toUpperCase() || 'N/A'}`, pageWidth - margin, metaY + 42, { align: 'right' });
    doc.text(`Transaction ID: ${inv.transactionId || 'N/A'}`, pageWidth - margin, metaY + 56, { align: 'right' });
    doc.text(
      `Transaction Date: ${inv.transactionDate ? new Date(inv.transactionDate).toLocaleDateString() : 'N/A'}`,
      pageWidth - margin,
      metaY + 70,
      { align: 'right' }
    );

    // draw a horizontal line below metadata
    const lineY = metaY + 85;
    doc.setLineWidth(1);
    doc.line(margin, lineY, pageWidth - margin, lineY);

    // BILL TO / CUSTOMER INFO 
    doc.setFontSize(12);
    doc.text('Bill To:', margin, lineY + 20);
    if (user) {
      const { name, email, phone, address } = user;
      doc.setFontSize(10);
      doc.text(name, margin, lineY + 36);
      doc.text(`+91 ${phone}`, margin, lineY + 50);
      doc.text(email, margin, lineY + 64);
      doc.text(address, margin, lineY + 78);
    }

    //  LINE ITEMS TABLE 
    const tableTop = lineY + 100;
    const colWidths = [usableWidth * 0.5, usableWidth * 0.15, usableWidth * 0.15, usableWidth * 0.2];
    const cols = ['Description', 'Qty', 'Unit Price', 'Line Total'];

    // header row
    doc.setFontSize(11);
    let x = margin, y = tableTop;
    cols.forEach((col, i) => {
      doc.text(col, x + 2, y);
      x += colWidths[i];
    });
    // underline header
    doc.setLineWidth(0.5);
    doc.line(margin, y + 4, pageWidth - margin, y + 4);

    // items
    y += 20;
    doc.setFontSize(10);
    (Array.isArray(inv.orders) ? inv.orders : []).forEach(order => {
      const items = typeof order === 'object' && order.orderProducts ? order.orderProducts : [];
      items.forEach(prod => {
        x = margin;
        const lineTotal = prod.quantity * prod.price;
        const row = [
          capitalize(prod.name),
          prod.quantity.toString(),
          `Rs ${prod.price.toFixed(2)}`,
          `Rs ${lineTotal.toFixed(2)}`
        ];
        row.forEach((text, i) => {
          doc.text(text, x + 2, y);
          x += colWidths[i];
        });
        y += 16;
        if (y > doc.internal.pageSize.getHeight() - margin - 100) {
          doc.addPage();
          y = margin;
        }
      });
    });

    //  TOTALS SUMMARY 
    const summaryY = y + 30;              
    const labelX = margin + colWidths[0] + colWidths[1];
    const valueRightX = pageWidth - margin;  

    doc.setFontSize(11);
    doc.text('Subtotal:', labelX, summaryY);
    doc.text(
      `Rs ${inv.amount.toFixed(2)}`,
      valueRightX,
      summaryY,
      { align: 'right' }
    );

    doc.text('Status:', labelX, summaryY + 16);
    doc.text(
      capitalize(inv.status),
      valueRightX,
      summaryY + 16,
      { align: 'right' }
    );

    //  FOOTER 
    const footerY = doc.internal.pageSize.getHeight() - margin;
    const centerX = pageWidth / 2;
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 20, pageWidth - margin, footerY - 20);
    doc.setFontSize(9);
    const firstLine = inv.status === 'paid'
      ? 'Thank you for your order!'
      : 'Thank you for your order! Please remit payment by the due date.';

    const secondLine = 'YourBusiness — www.yourbusiness.com — support@yourbusiness.com';

    // set font
    doc.setFontSize(9);

    // draw the two lines, centered
    doc.text(
      [firstLine, secondLine],
      centerX,
      footerY - 10,
      { align: 'center' }
    );

    if (idx < invoicesToExport.length - 1) {
      doc.addPage();
    }
  });

  const filename = formatDateForFilename(new Date()).join('_') + '_invoice.pdf';
  doc.save(filename);
};
