package org.csid.service.impl;

import org.csid.service.ClassroomService;
import org.csid.domain.Classroom;
import org.csid.repository.ClassroomRepository;
import org.csid.service.dto.ClassroomDTO;
import org.csid.service.mapper.ClassroomMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Classroom.
 */
@Service
@Transactional
public class ClassroomServiceImpl implements ClassroomService {

    private final Logger log = LoggerFactory.getLogger(ClassroomServiceImpl.class);

    private final ClassroomRepository classroomRepository;

    private final ClassroomMapper classroomMapper;

    public ClassroomServiceImpl(ClassroomRepository classroomRepository, ClassroomMapper classroomMapper) {
        this.classroomRepository = classroomRepository;
        this.classroomMapper = classroomMapper;
    }

    /**
     * Save a classroom.
     *
     * @param classroomDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ClassroomDTO save(ClassroomDTO classroomDTO) {
        log.debug("Request to save Classroom : {}", classroomDTO);
        Classroom classroom = classroomMapper.toEntity(classroomDTO);
        classroom = classroomRepository.save(classroom);
        return classroomMapper.toDto(classroom);
    }

    /**
     * Get all the classrooms.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ClassroomDTO> findAll() {
        log.debug("Request to get all Classrooms");
        return classroomRepository.findAll().stream()
            .map(classroomMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one classroom by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ClassroomDTO findOne(Long id) {
        log.debug("Request to get Classroom : {}", id);
        Classroom classroom = classroomRepository.findOne(id);
        return classroomMapper.toDto(classroom);
    }

    /**
     * Delete the classroom by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Classroom : {}", id);
        classroomRepository.delete(id);
    }
}
