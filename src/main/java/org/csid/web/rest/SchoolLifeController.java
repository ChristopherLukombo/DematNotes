package org.csid.web.rest;

import org.csid.service.ISchoolLifeService;
import org.csid.service.dto.AbsenceDTO;
import org.csid.service.dto.DelayStudentDTO;
import org.csid.service.dto.DocumentDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SchoolLifeController {

    private final Logger log = LoggerFactory.getLogger(SchoolReportController.class);

    @Autowired
    private ISchoolLifeService schoolLifeService;

    @RequestMapping(value="schoolLife/absences/{idStudent}", method = RequestMethod.GET)
    public List<AbsenceDTO> getAbsencesByStudent(@PathVariable final Long idStudent) {
        return schoolLifeService.getAbsencesByStudent(idStudent);
    }

    @RequestMapping(value="schoolLife/delayStudent/{idStudent}", method = RequestMethod.GET)
    public List<DelayStudentDTO> getDelayStudentsByStudent(@PathVariable final Long idStudent) {
        return schoolLifeService.getDelayStudentsByStudent(idStudent);
    }

    @RequestMapping(value = "/schoolLife/upload/{idStudent}", method = RequestMethod.POST)
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("idStudent") Long idStudent) {
        final String message;

        try {
            this.schoolLifeService.store(file, idStudent);
            message = "You successfully uploaded " + file.getOriginalFilename() + "!";
        } catch (Exception e) {
            throw new RuntimeException(HttpStatus.INTERNAL_SERVER_ERROR + " FAIL to upload " + file.getOriginalFilename() + "!" + e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @RequestMapping(value = "/schoolLife/getAllFiles/{idStudent}", method = RequestMethod.GET)
    public List<DocumentDTO> getAllFiles(@PathVariable("idStudent") final Long idStudent) {
        return this.schoolLifeService.getAllFiles(idStudent);
    }

    @RequestMapping(value = "/schoolLife/download/{idDocument}", method = RequestMethod.GET)
    public ResponseEntity<Object> downloadDocument(final HttpServletResponse response, @PathVariable("idDocument")  final Long idDocument) throws Exception {

        log.info("[API] Call API Service downloadDocument");

        File file;
        final String contentType;

        try {
            final Map.Entry<String,File> entry = schoolLifeService.getFile(idDocument).entrySet().iterator().next();
            contentType = entry.getKey(); // Type of File
            file =  entry.getValue(); // File

        } catch(final Exception e) {
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during retrieving file : " + e.getMessage());
        }

        response.setHeader("Content-Disposition", "attachment; filename=" + file);
        response.setHeader("Content-Length", String.valueOf(file.length()));

        response.setContentType(contentType);

        try (InputStream inputStream = new BufferedInputStream(new FileInputStream(file))) {
            FileCopyUtils.copy(inputStream, response.getOutputStream());
            response.getOutputStream().flush();
        } catch(final FileNotFoundException e) {
            log.error("File not found", file.getPath());
            throw new Exception(HttpStatus.NOT_FOUND.value() + " File not found " + file.getPath());
        } catch(final IOException e) {
            log.error("Error during file copy", file.getPath());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during copy " + file.getPath());
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolLife/delete/{idDocument}", method = RequestMethod.DELETE)
    public Boolean deleteFile(@PathVariable final Long idDocument) {
        log.info("[API] Call API Service deleteDocument");

        return schoolLifeService.deleteFile(idDocument);
    }

}
