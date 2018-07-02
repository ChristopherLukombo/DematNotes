package org.csid.service.impl;

import org.csid.domain.*;
import org.csid.domain.non.persistant.ChartData;
import org.csid.domain.non.persistant.MarksList;
import org.csid.domain.non.persistant.ModulesView;
import org.csid.domain.non.persistant.StudentsView;
import org.csid.repository.*;
import org.csid.service.IMarkService;
import org.csid.service.ISchoolReportService;
import org.csid.service.dto.*;
import org.csid.service.mapper.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service("MarkService")
@Transactional
public class MarkServiceImpl implements IMarkService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MarkServiceImpl.class);

    private static final LocalDate currentDate = LocalDate.now();

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private TeacherMapper teacherMapper;

    @Autowired
    private SchoolMapper schoolMapper;

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Autowired
    private ClassroomMapper classroomMapper;

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private AssignmentModuleRepository assignmentModuleRepository;

    @Autowired
    private ModulesViewMapper modulesViewMapper;

    @Autowired
    private ISchoolReportService schoolReportService;

    @Autowired
    private AssignmentYearPeriodRepository assignmentYearPeriodRepository;

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private MarksListMapper marksListMapper;

    @Autowired
    private StudentsViewMapper studentsViewMapper;

    @Autowired
    private ModuleRepository moduleRepository;

    /**
     * Returns schools by idUser
     *
     * @param idUser
     * @return list of schools
     */
    @Override
    public List<SchoolDTO> getSchoolsByCurrentTeacher(final Long idUser) throws Exception {
        try {
            final List<AssignmentModule> assignmentModules = assignmentModuleRepository.findAllByCurrentSchoolYear(currentDate);
            final List<SchoolDTO> schoolDTOs = new ArrayList<>();
            final User user = userRepository.findOne(idUser);
            final Teacher teacher = teacherRepository.findByUser(user);

            for (final AssignmentModule assignmentModule : assignmentModules) {
                if (assignmentModule.getTeachers().contains(teacher) && !schoolDTOs.contains(schoolMapper.toDto(assignmentModule.getSchool()))) {
                    schoolDTOs.add(schoolMapper.toDto(assignmentModule.getSchool()));
                }
            }

            return schoolDTOs;
        } catch (Exception e) {
            LOGGER.error("Error during collecting of schools ", e);
            throw new Exception("Error during collecting of schools");
        }
    }

    /**
     * Returns classrooms for Teacher
     *
     * @param idUser
     * @param idSchool
     * @return list of entities
     */
    @Override
    public List<ClassroomDTO> getClassroomsByCurrentTeacher(final Long idUser, final Long idSchool) throws Exception {
        try {
            final List<AssignmentModule> assignmentModules = assignmentModuleRepository.findAllByCurrentSchoolYear(currentDate);
            final List<ClassroomDTO> classroomDTOs = new ArrayList<>();
            final User user = userRepository.findOne(idUser);
            final Teacher teacher = teacherRepository.findByUser(user);

            for (final AssignmentModule assignmentModule : assignmentModules) {
                if (assignmentModule.getTeachers().contains(teacher) && assignmentModule.getSchool().getId().equals(idSchool) && !classroomDTOs.contains(classroomMapper.toDto(assignmentModule.getClassroom()))) {
                    classroomDTOs.add(classroomMapper.toDto(assignmentModule.getClassroom()));
                }
            }

            return classroomDTOs;
        } catch (Exception e) {
            LOGGER.error("Error during collecting of classrooms ", e);
            throw new Exception("Error during collecting of classrooms");
        }
    }

    // TODO A supprimer

    /**
     * Returns students for teacher
     *
     * @param idUser
     * @param idSchool
     * @param idClassroom
     * @return list of entities
     */
    @Override
    public List<UserDTO> getStudentsByCurrentTeacher(final Long idUser, final Long idSchool, final Long idClassroom) throws Exception {
        try {
            final List<AssignmentModule> assignmentModules = assignmentModuleRepository.findAllByCurrentSchoolYear(currentDate);
            final List<UserDTO> userDTOs = new ArrayList<>();
            final User user = userRepository.findOne(idUser);
            final Teacher teacher = teacherRepository.findByUser(user);

            for (final AssignmentModule assignmentModule : assignmentModules) {
                if (assignmentModule.getTeachers().contains(teacher) &&
                    assignmentModule.getSchool().getId().equals(idSchool) &&
                    assignmentModule.getClassroom().getId().equals(idClassroom)) {
                    userDTOs.addAll(this.getUsersByTeacher(idSchool, idClassroom));
                    break;
                }
            }

            return userDTOs;
        } catch (Exception e) {
            LOGGER.error("Error during collecting of users ", e);
            throw new Exception("Error during collecting of users");
        }
    }

    /**
     * Returns the students according to the teacher
     *
     * @param userId
     * @param schoolId
     * @param classroomId
     * @return StudentsList
     * @throws Exception
     */
    public StudentsList getStudentsByTeacher(final Long userId, final Long schoolId, final Long classroomId) throws Exception {
        try {
            final List<AssignmentModule> assignmentModules = assignmentModuleRepository.findAllByCurrentSchoolYear(currentDate);
            final StudentsView studentsView = new StudentsView();
            final User user = userRepository.findOne(userId);
            final Teacher teacher = teacherRepository.findByUser(user);

            int i = 0;
            boolean found = false;

            if (assignmentModules == null || assignmentModules.isEmpty()) {
                return null;
            }

            while (i < assignmentModules.size() && !found) {
                if (assignmentModules.get(i).getTeachers().contains(teacher) &&
                    assignmentModules.get(i).getSchool().getId().equals(schoolId) &&
                    assignmentModules.get(i).getClassroom().getId().equals(classroomId)) {
                    studentsView.setStudents(this.getStudentsMapToUsers(schoolId, classroomId).entrySet().stream().map(s -> s.getKey()).collect(Collectors.toList()));
                    studentsView.setUser(this.getStudentsMapToUsers(schoolId, classroomId).entrySet().stream().map(s -> s.getValue()).collect(Collectors.toList()));
                    found = true;
                }
                i++;
            }

            return studentsViewMapper.mapToDTO(studentsView);
        } catch (Exception e) {
            LOGGER.error("Error during collecting of students ", e);
            throw new Exception("Error during collecting of students");
        }
    }

    private Map<Student, User> getStudentsMapToUsers(final Long schoolId, final Long classroomId) throws Exception {
        try {
            final List<Inscription> inscriptions = inscriptionRepository.findAllByCurrentSchoolYear(currentDate);
            final Map<Student, User> studentsMap = new HashMap<>();

            for (final Inscription inscription : inscriptions) {
                if (inscription.getSchool().getId().equals(schoolId) && inscription.getClassroom().getId().equals(classroomId)) {
                    for (Student student : inscription.getStudents()) {
                        studentsMap.put(student, student.getUser());
                    }
                }
            }

            return studentsMap;
        } catch (Exception e) {
            LOGGER.error("Error during collecting of students ", e);
            throw new Exception("Error during collecting of students");
        }
    }


    private List<UserDTO> getUsersByTeacher(final Long idSchool, final Long idClassroom) throws Exception { //TODO implémenter une nouvelle classe pour la méthode
        try {
            final List<Inscription> inscriptions = inscriptionRepository.findAllByCurrentSchoolYear(currentDate);
            final List<UserDTO> userDTOs = new ArrayList<>();

            for (final Inscription inscription : inscriptions) {
                if (inscription.getSchool().getId().equals(idSchool) &&
                    inscription.getClassroom().getId().equals(idClassroom)) {
                    userDTOs.addAll(inscription.getStudents().stream().
                        map(u -> userMapper.userToUserDTO(u.getUser())).
                        collect(Collectors.toList()));
                }
            }

            return userDTOs;
        } catch (Exception e) {
            LOGGER.error("Error during collecting of users ", e);
            throw new Exception("Error during collecting of users");
        }
    }


    /**
     * Returns student by idUser
     *
     * @param idUser
     * @return entity
     */
    @Override
    public StudentDTO getStudentByIdUser(final Long idUser) throws Exception {
        try {
            final User user = userRepository.findOne(idUser);
            return studentMapper.toDto(studentRepository.findStudentByUser(user));
        } catch (Exception e) {
            LOGGER.error("Error during getting of user " + e.getMessage());
            throw new Exception("Error during getting of user");
        }
    }

    /**
     * Returns User by IdUser
     *
     * @param idUser
     * @return list of entities
     */
    @Override
    public UserDTO getUserByIdUser(final Long idUser) throws Exception {
        try {
            return userMapper.userToUserDTO(userRepository.findOne(idUser));
        } catch (Exception e) {
            LOGGER.error("Error during getting of user ", e);
            throw new Exception("Error during getting of user");
        }
    }

    /**
     * Returns a list of chartdata
     *
     * @param idSchool
     * @param idClassroom
     * @return list of entities
     */
    @Override
    public List<ChartData> getData(final Long idSchool, final Long idClassroom) throws Exception {
        try {
            final List<ChartData> chartDatas = new ArrayList<>();
            final School school = schoolRepository.findOne(idSchool);
            final Classroom classroom = classroomRepository.findOne(idClassroom);
            final List<YearPeriod> yearPeriods = findAllYearPeriodForAveragesStudents(currentDate, school, classroom);

            for (final YearPeriod y : yearPeriods) {
                chartDatas.add(new ChartData(getAllAveragesBySchoolAndClassroomTest(idSchool, idClassroom, y.getStartDate().atStartOfDay(ZoneOffset.UTC), y.getEndDate().atStartOfDay(ZoneOffset.UTC)), y.getEntitled()));
            }

            return chartDatas;
        } catch (Exception e) {
            LOGGER.error("Error during collecting of datas " + e.getMessage());
            throw new Exception("Error during collecting of datas");
        }
    }

    private List<Double> getAllAveragesBySchoolAndClassroomTest(final Long idSchool, final Long idClassroom, ZonedDateTime start, ZonedDateTime end) throws Exception {
        try {
            final List<Double> averages = new ArrayList<>();

            for (final Inscription inscription : inscriptionRepository.findAllByCurrentSchoolYear(currentDate)) {
                if (inscription.getClassroom().getId().equals(idClassroom) && inscription.getSchool().getId().equals(idSchool)) {
                    for (Student s : inscription.getStudents()) {
                        double result = this.schoolReportService.getAverageFromEvaluationByStudentAndPeriod(s.getUser().getId(), start, end);
                        if (result != -1)
                            averages.add(result);
                    }
                }
            }

            return averages;
        } catch (Exception e) {
            LOGGER.error("Error during collecting of averages ", e);
            throw new Exception("Error during collecting of averages", e);
        }
    }

    private List<YearPeriod> findAllYearPeriodForAveragesStudents(LocalDate periodDate, School school, Classroom classroom) throws Exception {
        try {
            final List<AssignmentYearPeriod> assignmentYearPeriods = this.assignmentYearPeriodRepository.findAllWithEagerRelationships();
            final List<YearPeriod> yearPeriods = new ArrayList<>();

            for (AssignmentYearPeriod assignmentYearPeriod : assignmentYearPeriods) {
                if (assignmentYearPeriod.getSchool().equals(school)) {
                    if (assignmentYearPeriod.getClassrooms().contains(classroom)) {
                        for (YearPeriod y : assignmentYearPeriod.getYearPeriods()) {
                            if (y.getEndDate().isBefore(periodDate) || y.getEndDate().equals(periodDate) || y.getEndDate().isAfter(periodDate)) {
                                yearPeriods.add(y);
                            }
                        }

                    }
                }
            }

            return yearPeriods;
        } catch (Exception e) {
            LOGGER.error("Error during collecting of yearPeriod ", e);
            throw new Exception("Error during collecting of yearPeriod");
        }
    }

    /**
     * Returns Modules with coefficients by teacher
     *
     * @param userId
     * @param schoolId
     * @param classroomId
     * @return
     * @throws Exception
     */
    public ModulesList getModules(final Long userId, final Long schoolId, final Long classroomId) throws Exception {
        try {
            final List<AssignmentModule> assignmentModules = assignmentModuleRepository.findAllByCurrentSchoolYear(currentDate);
            ModulesView modulesView = new ModulesView();
            final User user = userRepository.findOne(userId);
            final Teacher teacher = teacherRepository.findByUser(user);

            for (final AssignmentModule assignmentModule : assignmentModules) {
                if (assignmentModule.getTeachers().contains(teacher)
                    && assignmentModule.getClassroom().getId().equals(classroomId)
                    && assignmentModule.getSchool().getId().equals(schoolId)) {
                    modulesView.setModules(assignmentModule.getModules()
                        .stream()
                        .filter(m -> m.equals(teacher.getSpecialModule()))
                        .distinct().collect(Collectors.toSet()));
                    Double coefficient = new Double(assignmentModule.getCoefficient());
                    modulesView.addCoefficient(coefficient);
                    break;
                }
            }

            return modulesViewMapper.mapToDTO(modulesView);
        } catch (Exception e) {
            LOGGER.error("Error during collecting of modules ", e);
            throw new Exception("Error during collecting of modules");
        }
    }

    /**
     * Saves evaluations by students
     *
     * @param marksListDTO
     * @return Boolean
     */
    @Override
    public MarksListDTO saveEvaluations(MarksListDTO marksListDTO) throws Exception {
        try {
            MarksList marksList = null;

            if (marksListDTO != null) {
                marksList = marksListMapper.mapToEntity(marksListDTO);
            }

            final List<Evaluation> evaluations = marksList.getEvaluations();

            for (Evaluation evaluation : evaluations) {
                if (evaluation.getAverage() != null) {
                    evaluation.setModule(moduleRepository.findOne(evaluation.getModule().getId()));
                    evaluation.setStudent(studentRepository.findOne(evaluation.getStudent().getId()));
                    evaluationRepository.save(evaluation);
                }
            }


            return marksListMapper.mapToDTO(marksList);
        } catch (Exception e) {
            LOGGER.error("Error during saving of evaluations ", e);
            throw new Exception("Error during saving of evaluations");
        }
    }

    /**
     * Returns TeacherByUser
     * @param idUser
     * @return Teacher
     */
    @Override
    public TeacherDTO getTeacherByIdUser(Long idUser) {
        User user = userRepository.findOne(idUser);
        return teacherMapper.toDto(teacherRepository.findByUser(user));
    }
}

