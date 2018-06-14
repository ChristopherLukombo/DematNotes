package org.csid.service.impl;

import org.csid.service.AssignmentModuleService;
import org.csid.domain.AssignmentModule;
import org.csid.repository.AssignmentModuleRepository;
import org.csid.service.dto.AssignmentModuleDTO;
import org.csid.service.mapper.AssignmentModuleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AssignmentModule.
 */
@Service
@Transactional
public class AssignmentModuleServiceImpl implements AssignmentModuleService {

    private final Logger log = LoggerFactory.getLogger(AssignmentModuleServiceImpl.class);

    private final AssignmentModuleRepository assignmentModuleRepository;

    private final AssignmentModuleMapper assignmentModuleMapper;

    public AssignmentModuleServiceImpl(AssignmentModuleRepository assignmentModuleRepository, AssignmentModuleMapper assignmentModuleMapper) {
        this.assignmentModuleRepository = assignmentModuleRepository;
        this.assignmentModuleMapper = assignmentModuleMapper;
    }

    /**
     * Save a assignmentModule.
     *
     * @param assignmentModuleDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AssignmentModuleDTO save(AssignmentModuleDTO assignmentModuleDTO) {
        log.debug("Request to save AssignmentModule : {}", assignmentModuleDTO);
        AssignmentModule assignmentModule = assignmentModuleMapper.toEntity(assignmentModuleDTO);
        assignmentModule = assignmentModuleRepository.save(assignmentModule);
        return assignmentModuleMapper.toDto(assignmentModule);
    }

    /**
     * Get all the assignmentModules.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AssignmentModuleDTO> findAll() {
        log.debug("Request to get all AssignmentModules");
        return assignmentModuleRepository.findAllWithEagerRelationships().stream()
            .map(assignmentModuleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one assignmentModule by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AssignmentModuleDTO findOne(Long id) {
        log.debug("Request to get AssignmentModule : {}", id);
        AssignmentModule assignmentModule = assignmentModuleRepository.findOneWithEagerRelationships(id);
        return assignmentModuleMapper.toDto(assignmentModule);
    }

    /**
     * Delete the assignmentModule by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AssignmentModule : {}", id);
        assignmentModuleRepository.delete(id);
    }
}
