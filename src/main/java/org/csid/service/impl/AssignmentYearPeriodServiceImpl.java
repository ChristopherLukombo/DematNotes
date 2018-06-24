package org.csid.service.impl;

import org.csid.service.AssignmentYearPeriodService;
import org.csid.domain.AssignmentYearPeriod;
import org.csid.repository.AssignmentYearPeriodRepository;
import org.csid.service.dto.AssignmentYearPeriodDTO;
import org.csid.service.mapper.AssignmentYearPeriodMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AssignmentYearPeriod.
 */
@Service
@Transactional
public class AssignmentYearPeriodServiceImpl implements AssignmentYearPeriodService {

    private final Logger log = LoggerFactory.getLogger(AssignmentYearPeriodServiceImpl.class);

    private final AssignmentYearPeriodRepository assignmentYearPeriodRepository;

    private final AssignmentYearPeriodMapper assignmentYearPeriodMapper;

    public AssignmentYearPeriodServiceImpl(AssignmentYearPeriodRepository assignmentYearPeriodRepository, AssignmentYearPeriodMapper assignmentYearPeriodMapper) {
        this.assignmentYearPeriodRepository = assignmentYearPeriodRepository;
        this.assignmentYearPeriodMapper = assignmentYearPeriodMapper;
    }

    /**
     * Save a assignmentYearPeriod.
     *
     * @param assignmentYearPeriodDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AssignmentYearPeriodDTO save(AssignmentYearPeriodDTO assignmentYearPeriodDTO) {
        log.debug("Request to save AssignmentYearPeriod : {}", assignmentYearPeriodDTO);
        AssignmentYearPeriod assignmentYearPeriod = assignmentYearPeriodMapper.toEntity(assignmentYearPeriodDTO);
        assignmentYearPeriod = assignmentYearPeriodRepository.save(assignmentYearPeriod);
        return assignmentYearPeriodMapper.toDto(assignmentYearPeriod);
    }

    /**
     * Get all the assignmentYearPeriods.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AssignmentYearPeriodDTO> findAll() {
        log.debug("Request to get all AssignmentYearPeriods");
        return assignmentYearPeriodRepository.findAllWithEagerRelationships().stream()
            .map(assignmentYearPeriodMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one assignmentYearPeriod by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AssignmentYearPeriodDTO findOne(Long id) {
        log.debug("Request to get AssignmentYearPeriod : {}", id);
        AssignmentYearPeriod assignmentYearPeriod = assignmentYearPeriodRepository.findOneWithEagerRelationships(id);
        return assignmentYearPeriodMapper.toDto(assignmentYearPeriod);
    }

    /**
     * Delete the assignmentYearPeriod by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AssignmentYearPeriod : {}", id);
        assignmentYearPeriodRepository.delete(id);
    }
}
