package org.csid.service.impl;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.csid.domain.Evaluation;
import org.csid.domain.InscriptionModule;
import org.csid.domain.Intervention;
import org.csid.domain.Student;
import org.csid.domain.Teacher;
import org.csid.domain.User;
import org.csid.repository.EvaluationRepository;
import org.csid.repository.InscriptionModuleRepository;
import org.csid.repository.InterventionRepository;
import org.csid.repository.StudentRepository;
import org.csid.repository.TeacherRepository;
import org.csid.repository.UserRepository;
import org.csid.service.MarkService;
import org.csid.service.dto.ClassroomDTO;
import org.csid.service.dto.SchoolDTO;
import org.csid.service.dto.StudentDTO;
import org.csid.service.dto.UserDTO;
import org.csid.service.mapper.ClassroomMapper;
import org.csid.service.mapper.EvaluationMapper;
import org.csid.service.mapper.SchoolMapper;
import org.csid.service.mapper.StudentMapper;
import org.csid.service.mapper.UserMapper;
import org.csid.service.persistent.ChartData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("MarkService")
@Transactional
public class MarkServiceImpl implements MarkService {

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private StudentMapper studentMapper;

	@Autowired
	private InterventionRepository interventionRepository;

	@Autowired
	private TeacherRepository teacherRepository;

	@Autowired
	private SchoolMapper schoolMapper;

	@Autowired
	private InscriptionModuleRepository inscriptionModuleRepository;

	@Autowired
	private ClassroomMapper classroomMapper;

	@Autowired
	private EvaluationRepository evaluationRepository;

	@Autowired
	private EvaluationMapper evaluationMapper;


	/**
	 * Return schools by idUser
	 * @param idUser 
	 * @return list of schools
	 */
	@Override
	public List<SchoolDTO> getSchoolsByCurrentUserTeacher(final Long idUser) {
		final List<Teacher> teachers = teacherRepository.findByUserIsCurrentUser();

		final List<SchoolDTO> schoolDTOs = new ArrayList<>();

		final User user = userRepository.findOne(idUser);

		int i = 0;

		boolean found = false;

		if (user != null) {
			while (i < teachers.size() && !found) {
				if (teachers.get(i).getUser().equals(user)) {
					schoolDTOs.addAll(this.getSchoolsByUserTeacher(idUser));
					found = true;
				}
			}

		}

		return schoolDTOs;
	}

	private List<SchoolDTO> getSchoolsByUserTeacher(final Long idUser) {
		final ZonedDateTime pastDate = ZonedDateTime.now(ZoneId.of("Europe/Paris")).minusYears(1);

		final List<Intervention> interventions = interventionRepository.findInterventionByPeriod(pastDate);

		final List<SchoolDTO> schoolDTOs = new ArrayList<>();

		final User user = userRepository.findOne(idUser);

		for (final Intervention intervention : interventions) {
			if (intervention.getModule() != null && intervention.getTeacher().getUser().equals(user) && !schoolDTOs.contains(this.schoolMapper.toDto(intervention.getModule().getSchool()))) {
				schoolDTOs.add(this.schoolMapper.toDto(intervention.getModule().getSchool()));
			}
		}

		return schoolDTOs;
	}

	@Override
	public List<ClassroomDTO> getClassroomsByCurrentUserTeacher(final Long idUser, final Long idSchool) {
		final List<Teacher> teachers = teacherRepository.findByUserIsCurrentUser();

		final List<ClassroomDTO> classroomDTOs = new ArrayList<>();

		final User user = userRepository.findOne(idUser);

		int i = 0;

		if (user != null) {
			while (i < teachers.size()) {
				if (teachers.get(i).getUser().equals(user)) {
					for (Intervention in : teachers.get(i).getInterventions()) {
						if (idUser.equals(in.getTeacher().getUser().getId()) && idSchool.equals(in.getModule().getSchool().getId())) {
							classroomDTOs.addAll(getClassroomsByModule(in.getModule().getSchool().getId(), in.getModule().getId()));
						}

					}
				}
				i++;
			}
		}

		return classroomDTOs;
	}

	private List<ClassroomDTO> getClassroomsByModule(final Long idSchool, final Long idModule) {
		final List<ClassroomDTO> classroomsDTOs = new ArrayList<>();

		final LocalDate pastDate = LocalDate.now().minusYears(1);

		final List<InscriptionModule> inscriptionModules = inscriptionModuleRepository.findAll();
		// Vérifier si le teacher est dans le module
		for (InscriptionModule inscriptionModule : inscriptionModules) { 
			if (inscriptionModule.getStudent().getSchool().getId().equals(idSchool) && inscriptionModule.getModule().getId().equals(idModule) &&
					!classroomsDTOs.contains(classroomMapper.toDto(inscriptionModule.getStudent().getClassroom())) && inscriptionModule.getInscriptionDate().isAfter(pastDate)) {
				classroomsDTOs.add(classroomMapper.toDto(inscriptionModule.getStudent().getClassroom()));
			}
		}

		return classroomsDTOs;
	}


	@Override
	public List<UserDTO> getStudentsUserByCurrentUserTeacher(final Long idUser, final Long idSchool, final Long idClassroom) {
		final List<Teacher> teachers = teacherRepository.findByUserIsCurrentUser();

		final List<UserDTO> userDTOs = new ArrayList<>();

		final User user = userRepository.findOne(idUser);

		int i = 0;

		if (user != null) {
			while (i < teachers.size()) {
				if (teachers.get(i).getUser().equals(user)) {
					for (Intervention in : teachers.get(i).getInterventions()) {
						if (idUser.equals(in.getTeacher().getUser().getId()) && idSchool.equals(in.getModule().getSchool().getId())) {
							userDTOs.addAll(getStudentsUserByModule(in.getModule().getSchool().getId(), in.getModule().getId(), idClassroom));
						}

					}
				}
				i++;
			}
		}

		return userDTOs;
	}

	private List<UserDTO> getStudentsUserByModule(final Long idSchool, final Long idModule, final Long idClassroom) {
		final List<UserDTO> usersDTOs = new ArrayList<>();

		final LocalDate pastDate = LocalDate.now().minusYears(1);

		final List<InscriptionModule> inscriptionModules = inscriptionModuleRepository.findAll();
		// Vérifier si le teacher est dans le module
		for (InscriptionModule inscriptionModule : inscriptionModules) { 
			if (inscriptionModule.getStudent().getSchool().getId().equals(idSchool) && inscriptionModule.getModule().getId().equals(idModule) &&
					!usersDTOs.contains(userMapper.userToUserDTO(inscriptionModule.getStudent().getUser())) &&
					idClassroom.equals(inscriptionModule.getStudent().getClassroom().getId()) && inscriptionModule.getInscriptionDate().isAfter(pastDate)) {
				usersDTOs.add(userMapper.userToUserDTO(inscriptionModule.getStudent().getUser()));
			}
		}

		return usersDTOs;
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
		
		final List<Student> students = studentRepository.findAll();
		
		for (final Student student : students) {
			if (student.getSchool().getId().equals(idSchool) && student.getClassroom().getId().equals(idClassroom)) {
				averages.add(this.getAverageForStudent(student));
			}
		}

		return averages;
	}


	private double getAverageForStudent(final Student s) {
		final List<Evaluation> evaluations = evaluationRepository.findAllByStudent(s);

		double sumAverages = 0;
		double sumCoefficients = 0;

		final DecimalFormat decimalFormat = new DecimalFormat("#.#");

		for (final Evaluation evaluation : evaluations) {
				sumAverages += (evaluation.getAverage() * evaluation.getCoefficient());
				sumCoefficients += evaluation.getCoefficient();
		}
		
		return Double.parseDouble(decimalFormat.format(sumAverages / sumCoefficients).replaceAll(",", "."));
	}

}
