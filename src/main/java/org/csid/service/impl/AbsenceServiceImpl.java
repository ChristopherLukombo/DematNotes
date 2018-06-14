package org.csid.service.impl;

import org.csid.service.AbsenceService;
import org.csid.domain.Absence;
import org.csid.repository.AbsenceRepository;
import org.csid.service.dto.AbsenceDTO;
import org.csid.service.mapper.AbsenceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Absence.
 */
@Service
@Transactional
public class AbsenceServiceImpl implements AbsenceService {

    private final Logger log = LoggerFactory.getLogger(AbsenceServiceImpl.class);

    private final AbsenceRepository absenceRepository;

    private final AbsenceMapper absenceMapper;

    public AbsenceServiceImpl(AbsenceRepository absenceRepository, AbsenceMapper absenceMapper) {
        this.absenceRepository = absenceRepository;
        this.absenceMapper = absenceMapper;
    }

    /**
     * Save a absence.
     *
     * @param absenceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AbsenceDTO save(AbsenceDTO absenceDTO) {
        log.debug("Request to save Absence : {}", absenceDTO);
        Absence absence = absenceMapper.toEntity(absenceDTO);
        absence = absenceRepository.save(absence);
        return absenceMapper.toDto(absence);
    }

    /**
     * Get all the absences.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AbsenceDTO> findAll() {
        log.debug("Request to get all Absences");
        return absenceRepository.findAllWithEagerRelationships().stream()
            .map(absenceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one absence by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AbsenceDTO findOne(Long id) {
        log.debug("Request to get Absence : {}", id);
        Absence absence = absenceRepository.findOneWithEagerRelationships(id);
        return absenceMapper.toDto(absence);
    }

    /**
     * Delete the absence by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Absence : {}", id);
        absenceRepository.delete(id);
    }
}
