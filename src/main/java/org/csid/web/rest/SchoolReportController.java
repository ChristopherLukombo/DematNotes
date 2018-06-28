package org.csid.web.rest;

import com.itextpdf.text.pdf.qrcode.ByteArray;
import org.csid.service.ISchoolReportService;
import org.csid.service.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/api")
public class SchoolReportController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchoolReportController.class);

    @Autowired
    private ISchoolReportService schoolReportService;


    @RequestMapping(value = "/schoolReport/export/{accountCode}", method = RequestMethod.GET, produces = "application/pdf")
    public ResponseEntity<byte[]> downloadSchoolReport(final HttpServletResponse response, @PathVariable final Long accountCode) throws Exception {

        LOGGER.info("Call API Service export");

        byte[] pdfData;
        try {
            pdfData = schoolReportService.generateSchoolReport(accountCode);
        } catch(final Exception e) {
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during retrieving file : " + e.getMessage());
        }

        response.setHeader("Content-Disposition", "attachment; filename=" + "toto.pdf");
        response.setContentType("application/pdf");


        return new ResponseEntity<>(pdfData, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolReport/schools/{accountCode}", method = RequestMethod.GET)
    public ResponseEntity<List<SchoolDTO>> getSchoolsByManager(@PathVariable final Long accountCode) throws Exception {
        LOGGER.info("Call API service getSchoolsByManager ...");

        List<SchoolDTO> schools;

        try {
            schools = schoolReportService.getSchoolsByManager(accountCode);
        } catch (Exception e) {
            LOGGER.error("Error during schools collecting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during schools collecting");
        }

        if (schools == null) {
            LOGGER.info("Call API getSchoolsByManager : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }

        return new ResponseEntity<>(schools, HttpStatus.OK);
    }


    @RequestMapping(value = "/schoolReport/classrooms/{accountCode}/{idSchool}", method = RequestMethod.GET)
    public ResponseEntity<List<ClassroomDTO>> getClassroomsByManager(@PathVariable final Long accountCode,
                                                                  @PathVariable final Long idSchool) throws Exception {
        LOGGER.info("Call API service getClassroomsByManager ...");

        List<ClassroomDTO> classrooms;

        try {
            classrooms = schoolReportService.getClassroomsByManager(accountCode, idSchool);
        } catch (Exception e) {
            LOGGER.error("Error during classrooms collecting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during classrooms collecting");
        }

        if (classrooms == null) {
            LOGGER.info("Call API getClassroomsByManager : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }

        return new ResponseEntity<>(classrooms, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolReport/students/{accountCode}/{idSchool}/{idClassroom}", method = RequestMethod.GET)
    public ResponseEntity<List<UserDTO>> getStudentsByManager(@PathVariable final Long accountCode,
                                                              @PathVariable final Long idSchool,
                                                              @PathVariable final Long idClassroom) throws Exception {
        LOGGER.info("Call API service getStudentsByManager ...");

        List<UserDTO> userDTOS;

        try {
            userDTOS = schoolReportService.getStudentsByManager(accountCode, idSchool, idClassroom);
        } catch (Exception e) {
            LOGGER.error("Error during students collecting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during students collecting");
        }

        if (userDTOS == null) {
            LOGGER.info("Call API getStudentsByManager : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }

        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolReport/student/{accountCode}")
    public ResponseEntity<UserDTO> getStudentByManager(@PathVariable final Long accountCode) throws Exception {
        LOGGER.info("Call API service getStudentByManager ...");

        UserDTO userDTO;

        try {
            userDTO = schoolReportService.getStudentByManager(accountCode);
        } catch (Exception e) {
            LOGGER.error("Error during students collecting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during student collecting");
        }

        if (userDTO == null) {
            LOGGER.info("Call API getStudentByManager : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }

        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolReport/save", method = RequestMethod.POST)
    public ResponseEntity<SchoolReportDTO> saveSchoolReport(@RequestBody final SchoolReportDTO schoolReportDTO) throws Exception {
        LOGGER.info("Call API service saveSchoolReport ...");

        SchoolReportDTO schoolReport;

        try {
            schoolReport = schoolReportService.saveSchoolReport(schoolReportDTO);
        } catch (Exception e) {
            LOGGER.error("Error during schoolReport saving : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during schoolReport saving");
        }

        if (schoolReport == null) {
            LOGGER.info("Call API saveSchoolReport : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }

        return new ResponseEntity<>(schoolReport, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolReport/evaluations/{accountCode}", method = RequestMethod.GET)
    public ResponseEntity<Set<EvaluationDTO>> getEvaluationsByStudent(@PathVariable Long accountCode) throws Exception {
        LOGGER.info("Call API service getEvaluationByStudent ...");

        Set<EvaluationDTO> evaluationDTOS;

        try {
            evaluationDTOS = schoolReportService.getEvaluationsByStudent(accountCode);
        } catch (Exception e) {
            LOGGER.error("Error during Evaluations collecting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during Evaluations collecting");
        }

        if (evaluationDTOS == null) {
            LOGGER.info("Call API getEvaluationByStudent : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }

        return new ResponseEntity<>(evaluationDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolReport/manager", method = RequestMethod.POST)
    public ResponseEntity<ManagerDTO> findByUser(@RequestBody UserDTO userDTO) throws Exception {
        LOGGER.info("Call API service findByUser ...");

        ManagerDTO managerDTO;

        try {
            managerDTO = this.schoolReportService.findByUser(userDTO);
        } catch (Exception e) {
            LOGGER.error("Error during collecting of manager " + e.getMessage());
            throw new Exception("Error during collecting of manager");
        }


        if (managerDTO == null) {
            LOGGER.info("Call API findByUser : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }

        return new ResponseEntity<>(managerDTO, HttpStatus.OK);
    }

}
