package org.csid.service.impl;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
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

            Image img = Image.getInstance(this.generateQrCode());
            document.add(img);

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

    private String generateQrCode() {
        String img = null;

        try{
            String data = "Je suis Thierry et je suis gentil.";
            int size = 50;

            // encode
            BitMatrix bitMatrix = generateMatrix(data, size);
            //create a temp file
            final File temp = File.createTempFile("temp-file-name", ".tmp");
            String imageFormat = "png";
            //Get tempropary file path
            String absolutePath = temp.getAbsolutePath();
            String tempFilePath = absolutePath.substring(0,absolutePath.lastIndexOf(File.separator));

            img = tempFilePath + "/" +  "qrcode-01."  + imageFormat;

            writeImage(img, imageFormat, bitMatrix);
        }catch(IOException e){
            e.printStackTrace();
        }

        return img;
    }

    private void writeImage(String outputFileName, String imageFormat, BitMatrix bitMatrix)  {
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(new File(outputFileName));
            MatrixToImageWriter.writeToStream(bitMatrix, imageFormat, fileOutputStream);
            fileOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private BitMatrix generateMatrix(String data, int size) {
        BitMatrix bitMatrix = null;
        try {
            bitMatrix = new QRCodeWriter().encode(data, BarcodeFormat.QR_CODE, size, size);
            return bitMatrix;
        } catch (WriterException e) {
            e.printStackTrace();
        }
        return bitMatrix;
    }

}
