package org.csid.service.impl;

import org.csid.service.AssignmentManagerService;
import org.csid.domain.AssignmentManager;
import org.csid.repository.AssignmentManagerRepository;
import org.csid.service.dto.AssignmentManagerDTO;
import org.csid.service.mapper.AssignmentManagerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AssignmentManager.
 */
@Service
@Transactional
public class AssignmentManagerServiceImpl implements AssignmentManagerService {

    private final Logger log = LoggerFactory.getLogger(AssignmentManagerServiceImpl.class);

    private final AssignmentManagerRepository assignmentManagerRepository;

    private final AssignmentManagerMapper assignmentManagerMapper;

    public AssignmentManagerServiceImpl(AssignmentManagerRepository assignmentManagerRepository, AssignmentManagerMapper assignmentManagerMapper) {
        this.assignmentManagerRepository = assignmentManagerRepository;
        this.assignmentManagerMapper = assignmentManagerMapper;
    }

    /**
     * Save a assignmentManager.
     *
     * @param assignmentManagerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AssignmentManagerDTO save(AssignmentManagerDTO assignmentManagerDTO) {
        log.debug("Request to save AssignmentManager : {}", assignmentManagerDTO);
        AssignmentManager assignmentManager = assignmentManagerMapper.toEntity(assignmentManagerDTO);
        assignmentManager = assignmentManagerRepository.save(assignmentManager);
        return assignmentManagerMapper.toDto(assignmentManager);
    }

    /**
     * Get all the assignmentManagers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AssignmentManagerDTO> findAll() {
        log.debug("Request to get all AssignmentManagers");
        return assignmentManagerRepository.findAllWithEagerRelationships().stream()
            .map(assignmentManagerMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one assignmentManager by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AssignmentManagerDTO findOne(Long id) {
        log.debug("Request to get AssignmentManager : {}", id);
        AssignmentManager assignmentManager = assignmentManagerRepository.findOneWithEagerRelationships(id);
        return assignmentManagerMapper.toDto(assignmentManager);
    }

    /**
     * Delete the assignmentManager by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AssignmentManager : {}", id);
        assignmentManagerRepository.delete(id);
    }
}
