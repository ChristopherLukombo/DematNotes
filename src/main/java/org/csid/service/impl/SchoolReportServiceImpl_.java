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
            Document document = new Document(PageSize.A4, 20, 20, 20, 20);

            // create the file in memory
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = PdfWriter.getInstance(document, baos);
            Paragraph paragraph = new Paragraph();
            Font fontTitle = new Font(FontFamily.HELVETICA, 16, Font.BOLD);
            //Font fontWord = new Font(FontFamily.HELVETICA, 12, Font.BOLD);
            Font fontContent = new Font(FontFamily.HELVETICA, 10);
            Font fontComment = new Font(FontFamily.HELVETICA, 6);
            
            User user = userRepository.findOne(idUser);
            Student student = studentRepository.findStudentByUser(user);
            List<Inscription> inscriptions = inscriptionRepository.findAllByCurrentSchoolYear(dateInscription);
            
            document.open();
            
            //Bloc 1 : School & Student
            PdfPTable table = new PdfPTable(9);
            PdfPCell cell = new PdfPCell();
            table.setWidthPercentage(100);
            table.getDefaultCell().setUseAscender(true);
            table.getDefaultCell().setUseDescender(true);
            
            table.addCell(getPdfPCellCustomized("\n70 avenue Jean Jaurès\n93 000 Bobigny\n01 48 10 22 15 - 15 08 09 14 94", null, 4, 10.0f, "left", true));
            
            table.addCell(getPdfPCellCustomized("Nom - Prénom : "+user.getLastName()+" "+user.getFirstName()+"\nNé(e) le : "+student.getDateOfBirth()+"\nClasse : TODO\nAnnée scolaire : TODO", null, 4, 10.0f, "left", true));
            
            Image img = Image.getInstance(this.generateQrCode());
            cell.setColspan(1);
            cell.setPadding(5.0f);
            table.addCell(img);
            document.add(table);
 
            //Entitled period
            paragraph = new Paragraph("Bulletin du 1er Semestre\n\n", fontTitle);
            paragraph.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraph);
            
            //Bloc 2 Moyennes
            table = initPdfPTable(9, 100);
            
            //Entilted Moyennes
            cell = new PdfPCell(new Phrase("Matière\nNom du professeur"));
        	cell.setColspan(3);
        	cell.setPadding(10.0f);
            table.addCell(cell);
            
            paragraph = new Paragraph("\nMoyennes\n");
            cell = new PdfPCell(paragraph);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        	cell.setColspan(1);
            table.addCell(cell);
            
            cell = new PdfPCell(new Paragraph("Apréciations générales"));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        	cell.setColspan(5);
        	cell.setPadding(10.0f);
            table.addCell(cell);
            
            //table moyennes
            for (int i = 0; i < 9; i++) {
            	cell = new PdfPCell(new Phrase("MATHÉMATIQUES\nM. Louis"));
            	cell.setColspan(3);
            	cell.setPadding(10.0f);
                table.addCell(cell);
                
                paragraph = new Paragraph("10.25");
                cell = new PdfPCell(paragraph);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            	cell.setColspan(1);
            	cell.setPadding(5.0f);
                table.addCell(cell);
                
                cell = new PdfPCell(new Paragraph("\nAllons les enfants de la patriiiie. Le jour de gloireeee est arivéeeeee!!!\n\n", fontContent));
            	cell.setColspan(7);
            	cell.setPadding(5.0f);
                table.addCell(cell);
            }
            cell = new PdfPCell(new Phrase("\nMoyenne générale\n"));
        	cell.setColspan(3);
        	cell.setPadding(5.0f);
            table.addCell(cell);
            
            paragraph = new Paragraph("12.65");
            cell = new PdfPCell(paragraph);
        	cell.setColspan(1);
        	cell.setPadding(5.0f);
        	cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            
            cell = new PdfPCell();
        	cell.setColspan(7);
            table.addCell(cell);
            
            document.add(table);
            
            //Bloc 3 : Vie scolaire
            table = new PdfPTable(9);
            table.setWidthPercentage(100);
            table.getDefaultCell().setUseAscender(true);
            table.getDefaultCell().setUseDescender(true);
            
            cell = new PdfPCell(new Paragraph("Vie scolaire\n\nMme Christine LUKOMBO"));
        	cell.setColspan(3);
        	cell.setPadding(5.0f);
            table.addCell(cell);
            
        	cell = new PdfPCell(new PdfPCell(new Paragraph("Abscence(s) :     15 Excusée(s).\n                             2 Non excusée(s).\n\nRetard(s) :            1")));
            cell.setColspan(6);
        	table.addCell(cell);
            
            document.add(table);
            
            //Bloc 4 : Result
            table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.getDefaultCell().setUseAscender(true);
            table.getDefaultCell().setUseDescender(true);
            
            //Entitled
            cell = new PdfPCell(new Paragraph("Observation du conseil de classe"));
            cell.setPadding(5.0f);
        	cell.setColspan(2);
            table.addCell(cell);
            
            cell = new PdfPCell(new Paragraph("Avis"));
            cell.setPadding(5.0f);
        	cell.setColspan(1);
            table.addCell(cell);
            
            cell = new PdfPCell(new Paragraph("Visa du chef d'Établissement"));
            cell.setPadding(5.0f);
        	cell.setColspan(1);
            table.addCell(cell);
            
            //Content
            cell = new PdfPCell(new Paragraph("C'est bien, continuez ainsi.", fontContent));
            cell.setPadding(5.0f);
        	cell.setColspan(2);
            table.addCell(cell);
            
            cell = new PdfPCell(new Paragraph("\nEncouragements.\n\n"));
            cell.setPadding(5.0f);
        	cell.setColspan(1);
            table.addCell(cell);
            
            cell = new PdfPCell(new Paragraph("\nM. KOK Junior\n\n"));
            cell.setPadding(5.0f);
        	cell.setColspan(1);
            table.addCell(cell);
            
            document.add(table);
            
            //Comment
            table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.getDefaultCell().setBorder(PdfPCell.NO_BORDER);
            
            table.addCell(new Phrase("Bulletin à conserver précieusement.", fontComment));
            cell = new PdfPCell(new Phrase("15/05/2018", fontComment));
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell.setBorder(PdfPCell.NO_BORDER);
            table.addCell(cell);
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
     * @param chain String Data.
     * @param colspan int cell to merge.
     * @param padding float content.
     * @param align String content.
     * @param border Boolean cell. FALSE for no border.
     * @return PdfPCell
     */
    public static PdfPCell getPdfPCellCustomized(String chain, Font font, int colspan, float padding, String align, boolean border) {
    	PdfPCell cell= new PdfPCell();
    	
    	if(font == null)
    		cell = new PdfPCell(new Paragraph(chain));
    	else
    		cell = new PdfPCell(new Paragraph(chain, font));
    	
        cell.setColspan(colspan);
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
