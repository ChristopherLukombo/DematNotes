package org.csid.service.impl;

import org.csid.service.YearPeriodService;
import org.csid.domain.YearPeriod;
import org.csid.repository.YearPeriodRepository;
import org.csid.service.dto.YearPeriodDTO;
import org.csid.service.mapper.YearPeriodMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing YearPeriod.
 */
@Service
@Transactional
public class YearPeriodServiceImpl implements YearPeriodService {

    private final Logger log = LoggerFactory.getLogger(YearPeriodServiceImpl.class);

    private final YearPeriodRepository yearPeriodRepository;

    private final YearPeriodMapper yearPeriodMapper;

    public YearPeriodServiceImpl(YearPeriodRepository yearPeriodRepository, YearPeriodMapper yearPeriodMapper) {
        this.yearPeriodRepository = yearPeriodRepository;
        this.yearPeriodMapper = yearPeriodMapper;
    }

    /**
     * Save a yearPeriod.
     *
     * @param yearPeriodDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public YearPeriodDTO save(YearPeriodDTO yearPeriodDTO) {
        log.debug("Request to save YearPeriod : {}", yearPeriodDTO);
        YearPeriod yearPeriod = yearPeriodMapper.toEntity(yearPeriodDTO);
        yearPeriod = yearPeriodRepository.save(yearPeriod);
        return yearPeriodMapper.toDto(yearPeriod);
    }

    /**
     * Get all the yearPeriods.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<YearPeriodDTO> findAll() {
        log.debug("Request to get all YearPeriods");
        return yearPeriodRepository.findAll().stream()
            .map(yearPeriodMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one yearPeriod by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public YearPeriodDTO findOne(Long id) {
        log.debug("Request to get YearPeriod : {}", id);
        YearPeriod yearPeriod = yearPeriodRepository.findOne(id);
        return yearPeriodMapper.toDto(yearPeriod);
    }

    /**
     * Delete the yearPeriod by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete YearPeriod : {}", id);
        yearPeriodRepository.delete(id);
    }
}
