package org.csid.service.impl;

import org.csid.service.DelayStudentService;
import org.csid.domain.DelayStudent;
import org.csid.repository.DelayStudentRepository;
import org.csid.service.dto.DelayStudentDTO;
import org.csid.service.mapper.DelayStudentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing DelayStudent.
 */
@Service
@Transactional
public class DelayStudentServiceImpl implements DelayStudentService {

    private final Logger log = LoggerFactory.getLogger(DelayStudentServiceImpl.class);

    private final DelayStudentRepository delayStudentRepository;

    private final DelayStudentMapper delayStudentMapper;

    public DelayStudentServiceImpl(DelayStudentRepository delayStudentRepository, DelayStudentMapper delayStudentMapper) {
        this.delayStudentRepository = delayStudentRepository;
        this.delayStudentMapper = delayStudentMapper;
    }

    /**
     * Save a delayStudent.
     *
     * @param delayStudentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DelayStudentDTO save(DelayStudentDTO delayStudentDTO) {
        log.debug("Request to save DelayStudent : {}", delayStudentDTO);
        DelayStudent delayStudent = delayStudentMapper.toEntity(delayStudentDTO);
        delayStudent = delayStudentRepository.save(delayStudent);
        return delayStudentMapper.toDto(delayStudent);
    }

    /**
     * Get all the delayStudents.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DelayStudentDTO> findAll() {
        log.debug("Request to get all DelayStudents");
        return delayStudentRepository.findAll().stream()
            .map(delayStudentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one delayStudent by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DelayStudentDTO findOne(Long id) {
        log.debug("Request to get DelayStudent : {}", id);
        DelayStudent delayStudent = delayStudentRepository.findOne(id);
        return delayStudentMapper.toDto(delayStudent);
    }

    /**
     * Delete the delayStudent by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DelayStudent : {}", id);
        delayStudentRepository.delete(id);
    }
}
