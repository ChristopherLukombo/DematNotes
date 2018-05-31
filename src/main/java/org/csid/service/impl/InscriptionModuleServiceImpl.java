package org.csid.service.impl;

import org.csid.service.InscriptionModuleService;
import org.csid.domain.InscriptionModule;
import org.csid.repository.InscriptionModuleRepository;
import org.csid.service.dto.InscriptionModuleDTO;
import org.csid.service.mapper.InscriptionModuleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing InscriptionModule.
 */
@Service
@Transactional
public class InscriptionModuleServiceImpl implements InscriptionModuleService {

    private final Logger log = LoggerFactory.getLogger(InscriptionModuleServiceImpl.class);

    private final InscriptionModuleRepository inscriptionModuleRepository;

    private final InscriptionModuleMapper inscriptionModuleMapper;

    public InscriptionModuleServiceImpl(InscriptionModuleRepository inscriptionModuleRepository, InscriptionModuleMapper inscriptionModuleMapper) {
        this.inscriptionModuleRepository = inscriptionModuleRepository;
        this.inscriptionModuleMapper = inscriptionModuleMapper;
    }

    /**
     * Save a inscriptionModule.
     *
     * @param inscriptionModuleDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InscriptionModuleDTO save(InscriptionModuleDTO inscriptionModuleDTO) {
        log.debug("Request to save InscriptionModule : {}", inscriptionModuleDTO);
        InscriptionModule inscriptionModule = inscriptionModuleMapper.toEntity(inscriptionModuleDTO);
        inscriptionModule = inscriptionModuleRepository.save(inscriptionModule);
        return inscriptionModuleMapper.toDto(inscriptionModule);
    }

    /**
     * Get all the inscriptionModules.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<InscriptionModuleDTO> findAll() {
        log.debug("Request to get all InscriptionModules");
        return inscriptionModuleRepository.findAll().stream()
            .map(inscriptionModuleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one inscriptionModule by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public InscriptionModuleDTO findOne(Long id) {
        log.debug("Request to get InscriptionModule : {}", id);
        InscriptionModule inscriptionModule = inscriptionModuleRepository.findOne(id);
        return inscriptionModuleMapper.toDto(inscriptionModule);
    }

    /**
     * Delete the inscriptionModule by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete InscriptionModule : {}", id);
        inscriptionModuleRepository.delete(id);
    }
}
