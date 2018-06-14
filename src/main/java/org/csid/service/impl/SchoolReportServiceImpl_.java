package org.csid.service.impl;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.csid.service.ISchoolReportService;
import org.springframework.stereotype.Service;

import java.io.*;
@Service("ISchoolReportService")
public class SchoolReportServiceImpl_ implements ISchoolReportService {

    @Override
    public File generateSchoolReport() {
        File pdfFile = null;
        FileOutputStream fos = null;

        try {
            Document document = new Document();

            // create the file in memory
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, baos);

            document.open();

            document.add(new Paragraph("Hello World!"));

            document.close();

            pdfFile = File.createTempFile("bulletin", ".pdf");

            fos = new FileOutputStream(pdfFile);
            fos.write(baos.toByteArray());

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return pdfFile;
    }

}
