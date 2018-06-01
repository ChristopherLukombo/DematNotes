package org.csid.web.rest;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;



@RestController
@RequestMapping("/api")
public class SchoolReportController {

	private final Logger log = LoggerFactory.getLogger(SchoolReportController.class);

	@RequestMapping(value = "/schoolReport/export", method = RequestMethod.GET)
	public ResponseEntity<Object> exportSchoolReport(final HttpServletResponse response) throws Exception {

		log.info("[API] Call API Service export");

		File exportSchoolReportPDF;

		try {
			exportSchoolReportPDF = new File("/home/christopher/Téléchargements/test.txt");
		} catch(final Exception e) {
			throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during retrieving file : " + e.getMessage());
		}

		response.setHeader("Content-Disposition", "attachment; filename=" + exportSchoolReportPDF.getName());
		response.setHeader("Content-Length", String.valueOf(exportSchoolReportPDF.length()));
		response.setContentType("text/pdf");

		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("/home/christopher/Téléchargements/test.pdf"));
		document.open();
		document.add(new Paragraph("Hello World!"));
		document.close();

		try (InputStream inputStream = new BufferedInputStream(new FileInputStream(exportSchoolReportPDF))) {
			FileCopyUtils.copy(inputStream, response.getOutputStream());
			response.getOutputStream().flush();


		} catch(final FileNotFoundException e) {
			log.error("File not found", exportSchoolReportPDF.getPath());
			throw new Exception(HttpStatus.NOT_FOUND.value() + " File not found " + exportSchoolReportPDF.getPath());
		} catch(final IOException e) {
			log.error("Error during file copy", exportSchoolReportPDF.getPath());
			throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during copy " + exportSchoolReportPDF.getPath());
		}

		return new ResponseEntity<>(HttpStatus.OK);
	}
}
