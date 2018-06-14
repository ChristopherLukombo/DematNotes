package org.csid.service.impl;

import org.csid.domain.*;
import org.csid.repository.*;
import org.csid.service.IMarkService;
import org.csid.service.dto.*;
import org.csid.service.mapper.*;
import org.csid.service.persistent.ChartData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service("MarkService")
@Transactional
public class MarkServiceImpl implements IMarkService {

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
    private ModuleMapper moduleMapper;

	/**
	 * Return schools by idUser
	 * @param idUser
	 * @return list of schools
	 */
	@Override
	public List<SchoolDTO> getSchoolsByCurrentTeacher(final Long idUser) {
        final LocalDate currentDate = LocalDate.now();

		final List<AssignmentModule> assignmentModules = assignmentModuleRepository.findAllByCurrentSchoolYear(currentDate);

        final List<SchoolDTO> schoolDTOs = new ArrayList<>();

        final User user = userRepository.findOne(idUser);

        final Teacher teacher = teacherRepository.findByUser(user);

		for(final AssignmentModule assignmentModule : assignmentModules) {
		   if (assignmentModule.getTeachers().contains(teacher)) {
		       schoolDTOs.add(schoolMapper.toDto(assignmentModule.getSchool()));
           }
        }

		return schoolDTOs;
	}

	@Override
	public List<ClassroomDTO> getClassroomsByCurrentTeacher(final Long idUser, final Long idSchool) {
        final LocalDate currentDate = LocalDate.now();

        final List<AssignmentModule> assignmentModules = assignmentModuleRepository.findAllByCurrentSchoolYear(currentDate);

        final List<ClassroomDTO> classroomDTOs = new ArrayList<>();

        final User user = userRepository.findOne(idUser);

        final Teacher teacher = teacherRepository.findByUser(user);

        for(final AssignmentModule assignmentModule : assignmentModules) {
            if (assignmentModule.getTeachers().contains(teacher) && assignmentModule.getSchool().getId().equals(idSchool)) {
                classroomDTOs.add(classroomMapper.toDto(assignmentModule.getClassroom()));
            }
        }

		return classroomDTOs;
	}

	@Override
	public List<UserDTO> getStudentsByCurrentTeacher(final Long idUser, final Long idSchool, final Long idClassroom) {
        final LocalDate currentDate = LocalDate.now();

        final List<AssignmentModule> assignmentModules = assignmentModuleRepository.findAllByCurrentSchoolYear(currentDate);

        final List<UserDTO> userDTOs = new ArrayList<>();

        final User user = userRepository.findOne(idUser);

        final Teacher teacher = teacherRepository.findByUser(user);

        for(final AssignmentModule assignmentModule : assignmentModules) {
            if (assignmentModule.getTeachers().contains(teacher) &&
                assignmentModule.getSchool().getId().equals(idSchool) &&
                assignmentModule.getClassroom().getId().equals(idClassroom)) {
                userDTOs.addAll(getUsersByTeacher(idSchool, idClassroom));
                break;
            }
        }

		return userDTOs;
	}

	private List<UserDTO> getUsersByTeacher(final Long idSchool, final Long idClassroom) {
        final LocalDate currentDate = LocalDate.now();

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
    }


	@Override
	public StudentDTO getStudentByIdUser(final Long idUser) {
		final User user = userRepository.findOne(idUser);
		return studentMapper.toDto(studentRepository.findStudentByUser(user));
	}

	@Override
	public UserDTO getUserByIdUser(final Long idUser) {
		return userMapper.userToUserDTO(userRepository.findOne(idUser));
	}

	@Override
	public List<ChartData> getData(final Long idSchool, final Long idClassroom) {
		final List<ChartData> chartDatas = new ArrayList<>();

		final ZonedDateTime pastDate = ZonedDateTime.now(ZoneId.of("Europe/Paris"));

		chartDatas.add(new ChartData(getAllAveragesBySchoolAndClassroom(idSchool, idClassroom), pastDate.getMonth().toString()));

		return chartDatas;
	}

	private List<Double> getAllAveragesBySchoolAndClassroom(final Long idSchool, final Long idClassroom) {
		final List<Double> averages = new ArrayList<>();

		final List<Evaluation> evaluations = evaluationRepository.findAll();

        final DecimalFormat decimalFormat = new DecimalFormat("#.#");

		for (final Evaluation evaluation : evaluations) {
		        if (null != getStudentRegistered(idSchool, idClassroom, evaluation.getStudent().getId())) {
                    averages.add(new Double(Double.parseDouble(decimalFormat.format(evaluation.getAverage()).replaceAll(",", "."))));
                }
        }

		return averages;
	}

	private StudentDTO getStudentRegistered(final Long idSchool, final Long idClassroom, final Long idStudent) {
        final List<Inscription> inscriptions = inscriptionRepository.findAll();

        StudentDTO student = null;

        for (final Inscription inscription : inscriptions) {
            if (inscription.getSchool().getId().equals(idSchool) &&
                inscription.getClassroom().getId().equals(idClassroom)) {
                student = studentMapper.toDto(inscription.getStudents().stream().filter(s -> s.getId().equals(idStudent)).collect(Collectors.toList()).get(0));
                break;
            }
        }

        return student;
    }

    public List<ModuleDTO> getModules(final Long idUser) {
        final LocalDate currentDate = LocalDate.now();

        final List<AssignmentModule> assignmentModules = assignmentModuleRepository.findAllByCurrentSchoolYear(currentDate);

        final List<ModuleDTO> modulesDTOs = new ArrayList<>();

        final User user = userRepository.findOne(idUser);

        final Teacher teacher = teacherRepository.findByUser(user);

        for(final AssignmentModule assignmentModule : assignmentModules) {
            if (assignmentModule.getTeachers().contains(teacher)) {
                modulesDTOs.addAll(assignmentModule.getModules().stream().filter(m -> m.equals(teacher.getSpecialModule())).
                    distinct().map(m -> moduleMapper.toDto(m)).collect(Collectors.toList()));
            }
        }

        return modulesDTOs;
    }

}
