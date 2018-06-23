package org.csid.web.rest;

import org.csid.service.ISchoolLifeService;
import org.csid.service.dto.*;
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

    private static final Logger LOGGER = LoggerFactory.getLogger(SchoolLifeController.class);

    @Autowired
    private ISchoolLifeService schoolLifeService;

    @RequestMapping(value="schoolLife/absences/{accountCode}", method = RequestMethod.GET)
    public ResponseEntity<List<AbsenceDTO>> getAbsences(@PathVariable final Long accountCode) throws Exception {
        LOGGER.info("Call API service getAbsences ...");

        List<AbsenceDTO> absenceDTOS;
        try {
            absenceDTOS = schoolLifeService.getAbsences(accountCode);
        } catch (Exception e) {
            LOGGER.error("Error during absences collecting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during absences collecting");
        }

        if (absenceDTOS == null) {
            LOGGER.info("Call API getAbsences : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }

        return new ResponseEntity<>(absenceDTOS, HttpStatus.OK);
    }

    @RequestMapping(value="schoolLife/delayStudents/{accountCode}", method = RequestMethod.GET)
    public ResponseEntity<List<DelayStudentDTO>> getDelayStudents(@PathVariable final Long accountCode)
        throws Exception {
        LOGGER.info("Call API service getDelayStudents ...");

        List<DelayStudentDTO> delayStudentDTOS;
        try {
            delayStudentDTOS = schoolLifeService.getDelayStudents(accountCode);
        } catch (Exception e) {
            LOGGER.error("Error during delays collecting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during delays collecting");
        }

        if (delayStudentDTOS == null) {
            LOGGER.info("Call API getDelayStudents : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }

        return new ResponseEntity<>(delayStudentDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "schoolLife/modules/{accountCode}/{idClassroom}", method = RequestMethod.GET)
    public ResponseEntity<List<ModuleDTO>> getModules(@PathVariable final Long accountCode,
                                                      @PathVariable final Long idClassroom) throws Exception {
        LOGGER.info("Call API service getModules ...");

        List<ModuleDTO> moduleDTOS;

        try {
            moduleDTOS = schoolLifeService.getModules(accountCode, idClassroom);
        } catch (Exception e) {
            LOGGER.error("Error during modules collecting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during modules collecting");
        }

        if (moduleDTOS == null) {
            LOGGER.info("Call API getModules : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }

        return new ResponseEntity<>(moduleDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "schoolLife/AbsencesModules", method = RequestMethod.POST)
    public ResponseEntity<Object> saveAbsencesModules(@RequestBody AbsenceSearchDTO absenceSearchDTO) throws Exception {
        LOGGER.info("Call API service saveAbsencesModules ...");

        AbsenceDTO absenceDTO;

        try{
            absenceDTO = schoolLifeService.saveAbsencesModules(absenceSearchDTO);
        } catch (Exception e) {
            LOGGER.error("Error during modules saving : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during modules saving");
        }

        return new ResponseEntity<>(absenceDTO, HttpStatus.OK);
    }

    /**
     * Upload a file for student according to accountCode
     * @param file
     * @param accountCode
     */
    @RequestMapping(value = "/schoolLife/upload/{accountCode}", method = RequestMethod.POST)
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @PathVariable("accountCode") Long accountCode) {
        LOGGER.info("Call API service uploadFile ...");
        final String message;

        try {
            this.schoolLifeService.store(file, accountCode);
            message = "Successfully uploaded " + file.getOriginalFilename() + "!";
        } catch (Exception e) {
            LOGGER.error(HttpStatus.INTERNAL_SERVER_ERROR + " FAIL to upload " + file.getOriginalFilename() + "!" + e.getMessage());
            throw new RuntimeException(HttpStatus.INTERNAL_SERVER_ERROR + " FAIL to upload " + file.getOriginalFilename() + "!" + e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @RequestMapping(value = "/schoolLife/getAllFiles/{accountCode}", method = RequestMethod.GET)
    public ResponseEntity<List<DocumentDTO>> getAllFiles(@PathVariable("accountCode") final Long accountCode) throws Exception {
        LOGGER.info("Call API service uploadFile ...");

        List<DocumentDTO> documentDTOS;

        try {
            documentDTOS = this.schoolLifeService.getAllFiles(accountCode);
        } catch (Exception e) {
            LOGGER.error("Error during files uploading : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during files uploading");
        }

        return new ResponseEntity<>(documentDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolLife/download/{idDocument}", method = RequestMethod.GET)
    public ResponseEntity<Object> downloadDocument(final HttpServletResponse response,
                                                   @PathVariable("idDocument")  final Long idDocument) throws Exception {

        LOGGER.info("Call API Service downloadDocument ...");

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
            LOGGER.error("File not found", file.getPath());
            throw new Exception(HttpStatus.NOT_FOUND.value() + " File not found " + file.getPath());
        } catch(final IOException e) {
            LOGGER.error("Error during file copy", file.getPath());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during copy " + file.getPath());
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolLife/delete/{idDocument}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteFile(@PathVariable final Long idDocument) throws Exception {
        LOGGER.info("Call API Service deleteDocument");

        Boolean isDeleted;

        try {
            isDeleted = schoolLifeService.deleteFile(idDocument);
        } catch (Exception e) {
            LOGGER.error("Error during file deleting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during file deleting");
        }

        return new ResponseEntity<>(isDeleted, HttpStatus.OK);
    }

}
