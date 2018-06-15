package org.csid.web.rest;

import org.csid.service.ISchoolReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.*;




@RestController
@RequestMapping("/api")
public class SchoolReportController {

    private final Logger log = LoggerFactory.getLogger(SchoolReportController.class);

    @Autowired
    private ISchoolReportService schoolReportService;


    @RequestMapping(value = "/schoolReport/export", method = RequestMethod.GET, produces = "application/pdf")
    public ResponseEntity<Object> downloadSchoolReport(final HttpServletResponse response) throws Exception {

        log.info("[API] Call API Service export");

        File fileSchoolReportPDF;

        try {
            fileSchoolReportPDF = schoolReportService.generateSchoolReport();
        } catch(final Exception e) {
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during retrieving file : " + e.getMessage());
        }

        response.setHeader("Content-Disposition", "attachment; filename=" + fileSchoolReportPDF);
        response.setHeader("Content-Length", String.valueOf(fileSchoolReportPDF.length()));
        response.setContentType("application/pdf");

        try (InputStream inputStream = new BufferedInputStream(new FileInputStream(fileSchoolReportPDF))) {
            FileCopyUtils.copy(inputStream, response.getOutputStream());
            response.getOutputStream().flush();
        } catch(final FileNotFoundException e) {
            log.error("File not found", fileSchoolReportPDF.getPath());
            throw new Exception(HttpStatus.NOT_FOUND.value() + " File not found " + fileSchoolReportPDF.getPath());
        } catch(final IOException e) {
            log.error("Error during file copy", fileSchoolReportPDF.getPath());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during copy " + fileSchoolReportPDF.getPath());
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
