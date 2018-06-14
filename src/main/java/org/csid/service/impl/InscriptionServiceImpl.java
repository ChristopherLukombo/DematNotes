package org.csid.service.impl;

import org.csid.service.InscriptionService;
import org.csid.domain.Inscription;
import org.csid.repository.InscriptionRepository;
import org.csid.service.dto.InscriptionDTO;
import org.csid.service.mapper.InscriptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Inscription.
 */
@Service
@Transactional
public class InscriptionServiceImpl implements InscriptionService {

    private final Logger log = LoggerFactory.getLogger(InscriptionServiceImpl.class);

    private final InscriptionRepository inscriptionRepository;

    private final InscriptionMapper inscriptionMapper;

    public InscriptionServiceImpl(InscriptionRepository inscriptionRepository, InscriptionMapper inscriptionMapper) {
        this.inscriptionRepository = inscriptionRepository;
        this.inscriptionMapper = inscriptionMapper;
    }

    /**
     * Save a inscription.
     *
     * @param inscriptionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InscriptionDTO save(InscriptionDTO inscriptionDTO) {
        log.debug("Request to save Inscription : {}", inscriptionDTO);
        Inscription inscription = inscriptionMapper.toEntity(inscriptionDTO);
        inscription = inscriptionRepository.save(inscription);
        return inscriptionMapper.toDto(inscription);
    }

    /**
     * Get all the inscriptions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<InscriptionDTO> findAll() {
        log.debug("Request to get all Inscriptions");
        return inscriptionRepository.findAllWithEagerRelationships().stream()
            .map(inscriptionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one inscription by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public InscriptionDTO findOne(Long id) {
        log.debug("Request to get Inscription : {}", id);
        Inscription inscription = inscriptionRepository.findOneWithEagerRelationships(id);
        return inscriptionMapper.toDto(inscription);
    }

    /**
     * Delete the inscription by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Inscription : {}", id);
        inscriptionRepository.delete(id);
    }
}
