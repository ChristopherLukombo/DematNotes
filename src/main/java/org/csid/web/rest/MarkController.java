package org.csid.web.rest;

import org.csid.domain.non.persistant.ChartData;
import org.csid.service.IMarkService;
import org.csid.service.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MarkController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MarkController.class);

    @Autowired
    private IMarkService markService;

    @RequestMapping(value = "/marks/displaySchools/{idUser}", method = RequestMethod.GET)
    public ResponseEntity<List<SchoolDTO>> getSchoolsByCurrentUserTeacher(@PathVariable final Long idUser) throws Exception {
        LOGGER.info("Call API Service displaySchools");

        List<SchoolDTO> schoolsDTOS;

        try {
            schoolsDTOS = markService.getSchoolsByCurrentTeacher(idUser);
        } catch (Exception e) {
            LOGGER.error("Error during schools collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during schools collecting");
        }

        return new ResponseEntity<>(schoolsDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/marks/displayClassrooms/{idUser}/{idSchool}", method = RequestMethod.GET)
    public ResponseEntity<List<ClassroomDTO>> getClassroomsByCurrentUserTeacher(@PathVariable final Long idUser,
                                                                                @PathVariable final Long idSchool) throws Exception {
        LOGGER.info("Call API Service displayClassrooms");

        List<ClassroomDTO> classroomDTOS;

        try {
            classroomDTOS = markService.getClassroomsByCurrentTeacher(idUser, idSchool);
        } catch (Exception e) {
            LOGGER.error("Error during classrooms collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during classrooms collecting");
        }

        return new ResponseEntity<>(classroomDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/marks/studentsList/{userId}/{schoolId}/{classroomId}", method = RequestMethod.GET)
    public ResponseEntity<StudentsList> getStudentsList(@PathVariable final Long userId,
                                                        @PathVariable final Long schoolId,
                                                        @PathVariable final Long classroomId) throws Exception {
        LOGGER.info("Call API Service getStudentsList");

        StudentsList studentsList;

        try {
            studentsList = markService.getStudentsByTeacher(userId, schoolId, classroomId);
        } catch (Exception e) {
            LOGGER.error("Error during students collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during students collecting");
        }

        return new ResponseEntity<>(studentsList, HttpStatus.OK);
    }


    @RequestMapping(value = "/marks/displayStudents/{idUser}/{idSchool}/{idClassroom}", method = RequestMethod.GET)
    public ResponseEntity<List<UserDTO>> getStudentsUserByCurrentUserTeacher(@PathVariable final Long idUser,
                                                                             @PathVariable final Long idSchool,
                                                                             @PathVariable final Long idClassroom) throws Exception {
        LOGGER.info("Call API Service displayStudents");

        List<UserDTO> userDTOS;

        try {
            userDTOS = markService.getStudentsByCurrentTeacher(idUser, idSchool, idClassroom);
        } catch (Exception e) {
            LOGGER.error("Error during students collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during students collecting");
        }

        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/marks/getStudentUser/{idUser}", method = RequestMethod.GET)
    public ResponseEntity<StudentDTO> getStudentByIdUser(@PathVariable final Long idUser) throws Exception {
        LOGGER.info("Call API Service getStudentByIdUser");

        StudentDTO studentDTO;

        try {
            studentDTO = markService.getStudentByIdUser(idUser);
        } catch (Exception e) {
            LOGGER.error("Error during student collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during student collecting");
        }

        return new ResponseEntity<>(studentDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/marks/getTeacherByIdUser/{idUser}", method = RequestMethod.GET)
    public ResponseEntity<TeacherDTO> getTeacherByIdUser(@PathVariable final Long idUser) throws Exception {
        LOGGER.info("Call API Service getTeacherByIdUser");

        TeacherDTO teacherDTO;

        try {
            teacherDTO = markService.getTeacherByIdUser(idUser);
        } catch (Exception e) {
            LOGGER.error("Error during teacher collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during teacher collecting");
        }

        return new ResponseEntity<>(teacherDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/marks/getData/{idSchool}/{idClassroom}", method = RequestMethod.GET)
    public ResponseEntity<List<ChartData>> getData(@PathVariable final Long idSchool, @PathVariable final Long idClassroom) throws Exception {
        LOGGER.info("Call API Service getData");

        List<ChartData> chartDatas;

        try {
            chartDatas = markService.getData(idSchool, idClassroom);
        } catch (Exception e) {
            LOGGER.error("Error during user collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during data collecting", e);
        }

        return new ResponseEntity<>(chartDatas, HttpStatus.OK);
    }

    @RequestMapping(value = "/marks/teacher/modules/{userId}/{schoolId}/{classroomId}", method = RequestMethod.GET)
    public ResponseEntity<ModulesList> getModules(@PathVariable final Long userId, @PathVariable final Long schoolId, @PathVariable final Long classroomId) throws Exception {
        LOGGER.info("Call API Service getModules");

        ModulesList modulesList;

        try {
            modulesList = markService.getModules(userId, schoolId, classroomId);
        } catch (Exception e) {
            LOGGER.error("Error during modules collecting : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during modules collecting");
        }

        return new ResponseEntity<>(modulesList, HttpStatus.OK);
    }

    @RequestMapping(value = "/marks/save/evaluations", method = RequestMethod.POST)
    public ResponseEntity<MarksListDTO> saveEvaluations(@RequestBody MarksListDTO marksListDTO) throws Exception {
        LOGGER.info("Call API service saveEvaluations ...");

        MarksListDTO marksListDTOResult;

        try {
            marksListDTOResult = markService.saveEvaluations(marksListDTO);
        } catch (Exception e) {
            LOGGER.error("Error during evaluations saving : ", e);
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during evaluations saving");
        }

        return new ResponseEntity<>(marksListDTOResult, HttpStatus.OK);
    }

}
