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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

}
