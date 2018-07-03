package org.csid.web.rest;

import org.csid.service.ISchoolReportService;
import org.csid.service.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
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
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during retrieving file : ", e);
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
            LOGGER.error("Error during schools collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during schools collecting");
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
            LOGGER.error("Error during classrooms collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during classrooms collecting");
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
            LOGGER.error("Error during students collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during students collecting");
        }

        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolReport/save", method = RequestMethod.POST)
    public ResponseEntity<SchoolReportDTO> saveSchoolReport(@RequestBody final SchoolReportDTO schoolReportDTO) throws Exception {
        LOGGER.info("Call API service saveSchoolReport ...");

        SchoolReportDTO schoolReport;

        try {
            schoolReport = schoolReportService.saveSchoolReport(schoolReportDTO);
        } catch (Exception e) {
            LOGGER.error("Error during schoolReport saving : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during schoolReport saving");
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
            LOGGER.error("Error during Evaluations collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during Evaluations collecting");
        }

        return new ResponseEntity<>(evaluationDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolReport/schoolReportsList/{accountCode}", method = RequestMethod.GET)
    public ResponseEntity<SchoolReportList> getSchoolReportsByStudent(@PathVariable Long accountCode) throws Exception {
        LOGGER.info("Call API service getSchoolReportsByStudent ...");

        SchoolReportList schoolReportList;

        try {
            schoolReportList = schoolReportService.getSchoolReportsByStudent(accountCode);
        } catch (Exception e) {
            LOGGER.error("Error during schoolReportsList collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during schoolReportsList collecting");
        }

        return new ResponseEntity<>(schoolReportList, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolReport/manager", method = RequestMethod.POST)
    public ResponseEntity<ManagerDTO> findManagerByUser(@RequestBody UserDTO userDTO) throws Exception {
        LOGGER.info("Call API service findByUser ...");

        ManagerDTO managerDTO;

        try {
            managerDTO = this.schoolReportService.findByUser(userDTO);
        } catch (Exception e) {
            LOGGER.error("Error during collecting of manager ", e);
            throw new Exception("Error during collecting of manager");
        }

        return new ResponseEntity<>(managerDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/schoolReport/isAvailable/{userId}", method = RequestMethod.GET)
    public ResponseEntity<Boolean> isAvailable(@PathVariable Long userId) {
        LOGGER.info("Call API service isAvailable ...");

        boolean isAvailable = this.schoolReportService.schoolReportIsAvailable(userId);

        return new ResponseEntity<>(isAvailable, HttpStatus.OK);
    }


}
