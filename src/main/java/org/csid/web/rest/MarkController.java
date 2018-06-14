package org.csid.web.rest;

import org.csid.service.IMarkService;
import org.csid.service.dto.*;
import org.csid.service.persistent.ChartData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MarkController {
    @Autowired
    private IMarkService markService;

    @RequestMapping(value = "/marks/displaySchools/{idUser}", method = RequestMethod.GET)
    public List<SchoolDTO> getSchoolsByCurrentUserTeacher(@PathVariable final Long idUser) {
        return markService.getSchoolsByCurrentTeacher(idUser);
    }

    @RequestMapping(value = "/marks/displayClassrooms/{idUser}/{idSchool}", method = RequestMethod.GET)
    public List<ClassroomDTO> getClassroomsByCurrentUserTeacher(@PathVariable final Long idUser, @PathVariable final Long idSchool) {
        return markService.getClassroomsByCurrentTeacher(idUser, idSchool);
    }

    @RequestMapping(value = "/marks/displayStudents/{idUser}/{idSchool}/{idClassroom}", method = RequestMethod.GET)
    public List<UserDTO> getStudentsUserByCurrentUserTeacher(@PathVariable final Long idUser, @PathVariable final Long idSchool, @PathVariable final Long idClassroom) {
        return markService.getStudentsByCurrentTeacher(idUser, idSchool, idClassroom);
    }

    @RequestMapping(value = "/marks/getStudentUser/{idUser}", method = RequestMethod.GET)
    public StudentDTO getStudentByIdUser(@PathVariable final Long idUser) {
        return markService.getStudentByIdUser(idUser);
    }

    @RequestMapping(value = "/marks/getUser/{idUser}", method = RequestMethod.GET)
    public UserDTO getUserByIdUser(@PathVariable final Long idUser) {
        return markService.getUserByIdUser(idUser);
    }

    @RequestMapping(value = "/marks/getData/{idSchool}/{idClassroom}", method = RequestMethod.GET)
    public List<ChartData> getData(@PathVariable final Long idSchool, @PathVariable final Long idClassroom) {
        return markService.getData(idSchool, idClassroom);
    }

    @RequestMapping(value = "/marks/teacher/modules/{idUser}", method = RequestMethod.GET)
    public List<ModuleDTO> getModules(@PathVariable  final Long idUser) {
        return markService.getModules(idUser);
    }
}
