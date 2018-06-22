package org.csid.service.impl;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import org.csid.domain.Inscription;
import org.csid.domain.School;
import org.csid.domain.Student;
import org.csid.domain.User;
import org.csid.repository.InscriptionRepository;
import org.csid.repository.SchoolRepository;
import org.csid.repository.StudentRepository;
import org.csid.repository.UserRepository;
import org.csid.service.ISchoolReportService;
import org.csid.service.mapper.StudentMapper;
import org.csid.service.mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.time.LocalDate;
import java.util.List;
@Service("ISchoolReportService")
public class SchoolReportServiceImpl_ implements ISchoolReportService {
	
	private final Logger log = LoggerFactory.getLogger(SchoolReportServiceImpl_.class);
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private InscriptionRepository inscriptionRepository;
	@Autowired
	private SchoolRepository schoolRepository;
	
    @Override
    public File generateSchoolReport(Long idUser, LocalDate dateInscription) {
        File pdfFile = null;
        FileOutputStream fos = null;

        try {
            Document document = new Document(PageSize.A4, 20, 20, 20, 0);

            // create the file in memory
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, baos);
            Paragraph paragraph = new Paragraph();
            PdfPCell cell = new PdfPCell();
            Font fontTitle = new Font(FontFamily.HELVETICA, 14, Font.BOLD);
            Font fontContent = new Font(FontFamily.HELVETICA, 10);
            Font fontComment = new Font(FontFamily.HELVETICA, 6);
            
            User user = userRepository.findOne(idUser);
            Student student = studentRepository.findStudentByUser(user);
            List<Inscription> inscriptions = inscriptionRepository.findAllByCurrentSchoolYear(dateInscription);
            
            document.open();
            
            //Bloc 1 : School & Student --------------------------------------------------------
            PdfPTable table = initPdfPTable(9, 100);
            
            table.addCell(getPdfPCellCustomized("Lycée Jules Verne\n70 avenue Jean Jaurès\n93 000 Bobigny\n01 48 10 22 15 - 15 08 09 14 94", null, 4, 5.0f, "left", true));
            table.addCell(getPdfPCellCustomized("Nom - Prénom : "+user.getLastName()+" "+user.getFirstName()+"\nNé(e) le : "+student.getDateOfBirth()+"\nClasse : SIO 2\nAnnée scolaire : 2016 - 2017", null, 4, 5.0f, "left", true));
            
            //QR code
            Image img = Image.getInstance(this.generateQrCode());
            cell.setColspan(1);
            cell.setPadding(5.0f);
            table.addCell(img);
            document.add(table);
 
            //Entitled period
            paragraph = new Paragraph("Bulletin du 1er Semestre\n\n", fontTitle);
            paragraph.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraph);
            
            //Bloc 2 Moyennes ------------------------------------------------------------------
            table = initPdfPTable(9, 100);
            
            //Entilted Moyennes
            table.addCell(getPdfPCellCustomized("Matière\n\nNom du professeur", fontContent, 3, 5.0f, "left", true));
            table.addCell(getPdfPCellCustomized("\nMoyennes\n", fontContent, 1, 1.0f, "center", true));
            table.addCell(getPdfPCellCustomized("Apréciations générales", fontContent, 5, 10.0f, "center", true));
            
            //table moyennes
            for (int i = 0; i < 9; i++) {
            	table.addCell(getPdfPCellCustomized("MATHÉMATIQUES\n\nM. Louis", fontContent, 3, 5.0f, "left", true));
            	table.addCell(getPdfPCellCustomized("10.25", null, 1, 15.0f, "center", true));
            	table.addCell(getPdfPCellCustomized("\nAllons les enfants de la patriiiie. Le jour de gloireeee est arivéeeeee!!!\n\n", fontContent, 7, 5.0f, "left", true));
            }
            
            table.addCell(getPdfPCellCustomized("\nMoyenne générale\n\n\n", fontContent, 3, 5.0f, "", true));
            table.addCell(getPdfPCellCustomized("\n12.23\n", null, 1, 5.0f, "center", true));
            table.addCell(getPdfPCellCustomized(null, null, 7, 0, "", true));
            
            document.add(table);
            
            //Bloc 3 : Vie scolaire ------------------------------------------------------------
            table = initPdfPTable(9, 100);
            
            table.addCell(getPdfPCellCustomized("Vie scolaire\n\nMme Christine LUKOMBO", fontContent, 3, 5.0f, "left", true));
            table.addCell(getPdfPCellCustomized("Abscence(s) :     15 Excusée(s).\n                             2 Non excusée(s).\n\nRetard(s) :            1", fontContent, 6, 3.0f, "left", true));
            
            document.add(table);
            
            //Bloc 4 : Result ------------------------------------------------------------------
            table = initPdfPTable(4, 100);
            
            //Entitled
            table.addCell(getPdfPCellCustomized("Observation du conseil de classe", fontContent, 2, 5.0f, "left", true));
            table.addCell(getPdfPCellCustomized("Avis", fontContent, 1, 5.0f, "left", true));
            table.addCell(getPdfPCellCustomized("Visa du chef d'Établissement", fontContent, 1, 5.0f, "left", true));
            
            //Content
            table.addCell(getPdfPCellCustomized("C'est bien, continuez ainsi.", fontContent, 2, 5.0f, "left", true));
            
            //NOTE : Félicitation / Encouragements/ Avertissement de travail
            table.addCell(getPdfPCellCustomized("\nEncouragements.\n\n", fontContent, 1, 5.0f, "left", true));
            
            table.addCell(getPdfPCellCustomized("\nM. KOK Junior\n\n", fontContent, 1 , 5.0f, "left,", true));
            document.add(table);
            
            //Bloc 5 : Comment --------------------------------------------------------------
            table = initPdfPTable(2, 100);
            
            table.addCell(getPdfPCellCustomized("Bulletin à conserver précieusement.", fontComment, 1, 5.0f, "left", false));
            table.addCell(getPdfPCellCustomized("15/05/2017", fontComment, 1, 5.0f, "right", false));
            document.add(table);
            
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
    
    /**
     * Create a PdfPCell object
     * @param chain String   Content to show.
     * @param colspan int    Number of cells to merge.
     * @param padding float  Padding element content.
     * @param align String   Align element content.
     * @param border Boolean To show border cell
     * @return PdfPCell
     */
    public static PdfPCell getPdfPCellCustomized(String chain, Font font, int colspan, float padding, String align, boolean border) {
    	PdfPCell cell = new PdfPCell();
    	
    	if(font == null)
    		cell = new PdfPCell(new Paragraph(chain));
    	else
    		cell = new PdfPCell(new Paragraph(chain, font));
    	
    	if(colspan >= 0)
    		cell.setColspan(colspan);
    	
    	if(padding >= 0)
    		cell.setPadding(padding);
        
        switch(align) {
	        case "left":cell.setHorizontalAlignment(Element.ALIGN_LEFT);break;
	        case "right":cell.setHorizontalAlignment(Element.ALIGN_RIGHT);break;
	        case "center":cell.setHorizontalAlignment(Element.ALIGN_CENTER);break;
	        default:break;
        }
        
        if(!border) {
        	cell.setBorder(PdfPCell.NO_BORDER);
        }
        
        return cell;
    }
    
    /**
     * Initialize a PdfPTable object
     * @param colums int The number of colums of the table
     * @param widthPercentage int The width of the table in percentage
     * @return PdfPTable
     */
    public PdfPTable initPdfPTable(int colums, int widthPercentage) {
    	PdfPTable table = new PdfPTable(colums);
    	table.setWidthPercentage(widthPercentage);
    	table.getDefaultCell().setUseAscender(true);
    	table.getDefaultCell().setUseDescender(true);
    	
    	return table;
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
