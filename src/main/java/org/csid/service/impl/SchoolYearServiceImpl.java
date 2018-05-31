package org.csid.service.impl;

import org.csid.service.SchoolYearService;
import org.csid.domain.SchoolYear;
import org.csid.repository.SchoolYearRepository;
import org.csid.service.dto.SchoolYearDTO;
import org.csid.service.mapper.SchoolYearMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SchoolYear.
 */
@Service
@Transactional
public class SchoolYearServiceImpl implements SchoolYearService {

    private final Logger log = LoggerFactory.getLogger(SchoolYearServiceImpl.class);

    private final SchoolYearRepository schoolYearRepository;

    private final SchoolYearMapper schoolYearMapper;

    public SchoolYearServiceImpl(SchoolYearRepository schoolYearRepository, SchoolYearMapper schoolYearMapper) {
        this.schoolYearRepository = schoolYearRepository;
        this.schoolYearMapper = schoolYearMapper;
    }

    /**
     * Save a schoolYear.
     *
     * @param schoolYearDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SchoolYearDTO save(SchoolYearDTO schoolYearDTO) {
        log.debug("Request to save SchoolYear : {}", schoolYearDTO);
        SchoolYear schoolYear = schoolYearMapper.toEntity(schoolYearDTO);
        schoolYear = schoolYearRepository.save(schoolYear);
        return schoolYearMapper.toDto(schoolYear);
    }

    /**
     * Get all the schoolYears.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SchoolYearDTO> findAll() {
        log.debug("Request to get all SchoolYears");
        return schoolYearRepository.findAll().stream()
            .map(schoolYearMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one schoolYear by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SchoolYearDTO findOne(Long id) {
        log.debug("Request to get SchoolYear : {}", id);
        SchoolYear schoolYear = schoolYearRepository.findOne(id);
        return schoolYearMapper.toDto(schoolYear);
    }

    /**
     * Delete the schoolYear by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SchoolYear : {}", id);
        schoolYearRepository.delete(id);
    }
}
