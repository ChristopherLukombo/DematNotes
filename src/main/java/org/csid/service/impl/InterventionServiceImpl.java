package org.csid.service.impl;

import org.csid.service.InterventionService;
import org.csid.domain.Intervention;
import org.csid.repository.InterventionRepository;
import org.csid.service.dto.InterventionDTO;
import org.csid.service.mapper.InterventionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Intervention.
 */
@Service
@Transactional
public class InterventionServiceImpl implements InterventionService {

    private final Logger log = LoggerFactory.getLogger(InterventionServiceImpl.class);

    private final InterventionRepository interventionRepository;

    private final InterventionMapper interventionMapper;

    public InterventionServiceImpl(InterventionRepository interventionRepository, InterventionMapper interventionMapper) {
        this.interventionRepository = interventionRepository;
        this.interventionMapper = interventionMapper;
    }

    /**
     * Save a intervention.
     *
     * @param interventionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InterventionDTO save(InterventionDTO interventionDTO) {
        log.debug("Request to save Intervention : {}", interventionDTO);
        Intervention intervention = interventionMapper.toEntity(interventionDTO);
        intervention = interventionRepository.save(intervention);
        return interventionMapper.toDto(intervention);
    }

    /**
     * Get all the interventions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<InterventionDTO> findAll() {
        log.debug("Request to get all Interventions");
        return interventionRepository.findAll().stream()
            .map(interventionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one intervention by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public InterventionDTO findOne(Long id) {
        log.debug("Request to get Intervention : {}", id);
        Intervention intervention = interventionRepository.findOne(id);
        return interventionMapper.toDto(intervention);
    }

    /**
     * Delete the intervention by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Intervention : {}", id);
        interventionRepository.delete(id);
    }
}
