package org.csid.service.impl;

import org.csid.service.EvaluationService;
import org.csid.domain.Evaluation;
import org.csid.repository.EvaluationRepository;
import org.csid.service.dto.EvaluationDTO;
import org.csid.service.mapper.EvaluationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Evaluation.
 */
@Service
@Transactional
public class EvaluationServiceImpl implements EvaluationService {

    private final Logger log = LoggerFactory.getLogger(EvaluationServiceImpl.class);

    private final EvaluationRepository evaluationRepository;

    private final EvaluationMapper evaluationMapper;

    public EvaluationServiceImpl(EvaluationRepository evaluationRepository, EvaluationMapper evaluationMapper) {
        this.evaluationRepository = evaluationRepository;
        this.evaluationMapper = evaluationMapper;
    }

    /**
     * Save a evaluation.
     *
     * @param evaluationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EvaluationDTO save(EvaluationDTO evaluationDTO) {
        log.debug("Request to save Evaluation : {}", evaluationDTO);
        Evaluation evaluation = evaluationMapper.toEntity(evaluationDTO);
        evaluation = evaluationRepository.save(evaluation);
        return evaluationMapper.toDto(evaluation);
    }

    /**
     * Get all the evaluations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EvaluationDTO> findAll() {
        log.debug("Request to get all Evaluations");
        return evaluationRepository.findAll().stream()
            .map(evaluationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one evaluation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EvaluationDTO findOne(Long id) {
        log.debug("Request to get Evaluation : {}", id);
        Evaluation evaluation = evaluationRepository.findOne(id);
        return evaluationMapper.toDto(evaluation);
    }

    /**
     * Delete the evaluation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Evaluation : {}", id);
        evaluationRepository.delete(id);
    }
}
