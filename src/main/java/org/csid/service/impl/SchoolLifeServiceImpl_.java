package org.csid.service.impl;

import org.csid.domain.Absence;
import org.csid.domain.DelayStudent;
import org.csid.domain.Document;
import org.csid.domain.Student;
import org.csid.repository.AbsenceRepository;
import org.csid.repository.DelayStudentRepository;
import org.csid.repository.DocumentRepository;
import org.csid.repository.StudentRepository;
import org.csid.service.ISchoolLifeService;
import org.csid.service.dto.AbsenceDTO;
import org.csid.service.dto.DelayStudentDTO;
import org.csid.service.dto.DocumentDTO;
import org.csid.service.mapper.AbsenceMapper;
import org.csid.service.mapper.DelayStudentMapper;
import org.csid.service.mapper.DocumentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("ISchoolLifeService")
@Transactional
public class SchoolLifeServiceImpl_ implements ISchoolLifeService {
    @Autowired
    private AbsenceRepository absenceRepository;

    @Autowired
    private AbsenceMapper absenceMapper;

    @Autowired
    private DelayStudentRepository delayStudentRepository;

    @Autowired
    private DelayStudentMapper delayStudentMapper;

    @Value("${path.upload}")
    private String path;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private DocumentMapper documentMapper;

    @Autowired
    private StudentRepository studentRepository;

    /**
     * Return Absences for idStudent
     * @param idStudent to search
     * @return the list of entities
     */
    public List<AbsenceDTO> getAbsencesByStudent(final Long idStudent) {
        final ZonedDateTime currentDate = ZonedDateTime.now(ZoneId.systemDefault());

        final List<Absence> absences = absenceRepository.findAllWithEagerRelationships();

        final List<AbsenceDTO> absenceDTOs = new ArrayList<>();

        for (final Absence absence : absences) {
            for (final Student student : absence.getStudents()) {
                if (student.getId().equals(idStudent) && !absenceDTOs.contains(absenceMapper.toDto(absence))) {
                    absenceDTOs.add(absenceMapper.toDto(absence));
                }
            }
        }

        return absenceDTOs;
    }

    @Override
    public List<DelayStudentDTO> getDelayStudentsByStudent(final Long idStudent) {
        final ZonedDateTime currentDate = ZonedDateTime.now(ZoneId.systemDefault());

        final List<DelayStudent> delayStudents = delayStudentRepository.findAllWithEagerRelationships();

        final List<DelayStudentDTO> delayStudentDTOs = new ArrayList<>();

        for (final DelayStudent delayStudent : delayStudents) {
            for (final Student student : delayStudent.getStudents()) {
                if (student.getId().equals(idStudent) && !delayStudentDTOs.contains(delayStudentMapper.toDto(delayStudent))) {
                    delayStudentDTOs.add(delayStudentMapper.toDto(delayStudent));
                }
            }
        }

        return delayStudentDTOs;
    }

    public void store(MultipartFile file, Long idStudent) {
        final Path rootLocation = Paths.get(path);
        if (!new File(rootLocation + "").exists()) {
            new File(rootLocation + "").mkdir();
        }

        final File fileTmp = new File(rootLocation + "/" + file.getOriginalFilename());
        if(fileTmp.exists()) {
            fileTmp.delete();
        }

        try {
            Files.copy(file.getInputStream(),rootLocation.resolve(file.getOriginalFilename()));

            final Student student = studentRepository.findOne(idStudent);

            Document document = new Document();
            document.setStudent(student);
            document.setEntitled(file.getName());
            document.setUrl(rootLocation + "/" + file.getOriginalFilename());
            document.setVisible(true);
            document.setType(file.getContentType());

            documentRepository.save(document);

        } catch (Exception e) {
            throw new RuntimeException("FAIL!");
        }
    }

    public List<DocumentDTO> getAllFiles(final Long idStudent) {
        final Student student = studentRepository.findOne(idStudent);
        return documentRepository.findAllByStudent(student).
            stream().
            map(d -> documentMapper.toDto(d)).collect(Collectors.toList());
    }

}
